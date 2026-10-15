import './index.css' // the entry owns the stylesheet: vite.config.js inlines it into <head>
import { CONTACT_READY, ISLAND } from './islands'

/**
 * Entry chunk. Deliberately tiny and React-free: it is the only script fetched before first
 * paint, and Lighthouse's throttled simulation charges every byte in flight before FCP against
 * FCP and LCP. React and the two islands live in src/hydrate.jsx, loaded behind import() once
 * the page has painted (see schedule below), so ~67 KB of runtime leaves the first wave.
 */

/**
 * Runs `fn` once the page has loaded and the browser has reported painting it. Every caller shares
 * one wait (one load listener, one observer, one timer).
 *
 * Not at `load` alone: with the CSS inlined, load can fire before the first frame is painted,
 * and Lighthouse charges every request started before the observed paint to FCP and LCP. So this
 * waits for the browser's own report that it painted: an LCP entry where there is one, else
 * first-contentful-paint (Safari), with a timer in case neither arrives (a tab loaded in the
 * background paints nothing until it is shown). A frame callback is not enough: LCP is timed
 * when the frame reaches the screen, and a fetch queued behind requestAnimationFrame was measured
 * starting 30-40 ms before that.
 */
let painted
function whenPainted(fn) {
  painted ??= new Promise(resolve => {
    const afterPaint = () => {
      const types = window.PerformanceObserver?.supportedEntryTypes || []
      const type = ['largest-contentful-paint', 'paint'].find(t => types.includes(t))
      if (!type) return resolve()
      const done = () => { observer.disconnect(); clearTimeout(timer); resolve() }
      // A `paint` observer also delivers first-paint (background only), which can come before any
      // content is on screen; Firefox before 122 takes this path. Wait for the contentful one.
      const observer = new PerformanceObserver(list => {
        if (type === 'paint' && !list.getEntries().some(e => e.name === 'first-contentful-paint')) return
        done()
      })
      const timer = setTimeout(done, 3000)
      observer.observe({ type, buffered: true })
    }
    if (document.readyState === 'complete') afterPaint()
    else addEventListener('load', afterPaint, { once: true })
  })
  painted.then(fn)
}

// The build prerenders the whole page (scripts/prerender.js). Only the two components with
// state hydrate; the rest is static HTML and never enters this bundle.
const prerendered = document.getElementById(ISLAND.header)?.hasChildNodes()

if (prerendered) {
  // Hydrate at the first sign the user wants to interact, or shortly after the page has loaded
  // and painted (whenPainted) — whichever comes first. Nothing above the fold needs React: only
  // the contact form does.
  //
  // The idle timeout after that is deliberately short. Between first paint and hydration the
  // contact form has no handler (the header's index works without React: it is a popover driven
  // by a script in index.html), so that window has to be bounded by the runtime download rather
  // than by how long the browser feels like staying idle. A submit inside it is held, not lost:
  // see `held` below.
  const triggers = ['pointerdown', 'touchstart', 'keydown', 'focusin', 'scroll', 'mousemove']
  const listen = fn => { for (const type of triggers) fn(type, hydrate, { capture: true, passive: true }) }
  let hydrating = false
  let ready = false
  let held = null

  // A submit before React attaches would go out natively: a GET to this page with the visitor's
  // details in the URL, and nothing sent. Hold it instead, hydrate, and submit again once the
  // contact island says its handlers are attached. Not when hydrateRoot returns: hydration
  // finishes asynchronously, and a submit resent then was measured going unhandled.
  addEventListener('submit', e => {
    if (ready || !e.target.closest?.(`#${ISLAND.contact}`)) return
    e.preventDefault()
    held = e.target
    hydrate()
  }, { capture: true })
  addEventListener(CONTACT_READY, () => {
    ready = true
    const form = held
    held = null
    form?.requestSubmit()
  }, { once: true })

  function hydrate() {
    if (hydrating) return
    hydrating = true
    listen(removeEventListener)
    import('./hydrate.jsx')
      .then(({ hydrateIslands }) => hydrateIslands())
      .catch(err => {
        // The chunk can fail to load: a tab left open across a deploy no longer has its hashed
        // asset, or the network dropped. Re-arm rather than leaving the menu and the contact
        // form inert for the life of the page.
        console.error('[islands] hydration chunk failed; retrying on next interaction', err)
        hydrating = false
        listen(addEventListener)
      })
  }

  listen(addEventListener)
  const soon = () => ('requestIdleCallback' in window ? requestIdleCallback(hydrate, { timeout: 200 }) : setTimeout(hydrate, 0))
  whenPainted(soon)
} else if (import.meta.env.DEV) {
  // The dev server has no prerendered markup: render the full app client-side. Guarded so the
  // production bundle contains neither this branch nor an App chunk.
  import('./hydrate.jsx').then(({ renderDev }) => renderDev())
}

// Cloudflare Web Analytics, loaded here rather than injected at the edge. The injected beacon
// reports on `load`, and when the first frame comes after load (it does in PageSpeed's runs), the
// chain HTML -> beacon (a new origin) -> report lands before first paint and was measured costing
// ~0.6 s of FCP. Loaded after paint, it reports after it. The cost: a visit that leaves before
// then is not counted.
//
// It waits for an idle period after paint, and is scheduled after hydration's own idle callback
// (callbacks run in order), so the runtime download starts first and the beacon does not stretch
// the window in which the contact form has no handler.
//
// Only on the production host (VITE_SITE_HOST, from SITE_URL in vite.config.js), so preview
// deploys and local runs don't report into the site's analytics. Edge injection must be off in the
// Cloudflare dashboard (Web Analytics -> site -> automatic setup). If it is back on, its tag is
// already in the page: this adds nothing and says so, since the FCP cost returns with it.
const BEACON_TOKEN = 'bf6b6e685f124401b038cd3d47040a76'
if (location.hostname === import.meta.env.VITE_SITE_HOST) {
  const idle = fn => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 2000 }) : setTimeout(fn, 0))
  whenPainted(() => idle(() => {
    if (document.querySelector('script[data-cf-beacon]')) {
      console.warn('[analytics] Cloudflare edge-injected beacon found: turn off automatic setup in Web Analytics, it costs ~0.6 s of FCP')
      return
    }
    const beacon = document.createElement('script')
    beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js'
    beacon.dataset.cfBeacon = JSON.stringify({ token: BEACON_TOKEN })
    document.body.append(beacon)
  }))
}
