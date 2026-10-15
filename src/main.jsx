import './index.css' // the entry owns the stylesheet: vite.config.js inlines it into <head>
import { CONTACT_READY, ISLAND } from './islands'

/**
 * Entry chunk. Deliberately tiny and React-free: it is the only script fetched before first
 * paint, and Lighthouse's throttled simulation charges every byte in flight before FCP against
 * FCP and LCP. React and the two islands live in src/hydrate.jsx, loaded behind import() once
 * the page has painted (see schedule below), so ~67 KB of runtime leaves the first wave.
 */

// The build prerenders the whole page (scripts/prerender.js). Only the two components with
// state hydrate; the rest is static HTML and never enters this bundle.
const prerendered = document.getElementById(ISLAND.header)?.hasChildNodes()

if (prerendered) {
  // Hydrate at the first sign the user wants to interact, or shortly after the page has loaded
  // and painted — whichever comes first. Nothing above the fold needs React: only the contact
  // form does.
  //
  // Not at `load` alone: with the CSS inlined, load can fire before the first frame is painted,
  // and Lighthouse charges every request started before the observed LCP to FCP and LCP. So the
  // fetch waits for the browser's own report that it painted: an LCP entry where there is one,
  // else first-contentful-paint (Safari), with a timer in case neither arrives (a tab loaded in
  // the background paints nothing until it is shown). A frame callback is not enough: LCP is
  // timed when the frame reaches the screen, and a fetch queued behind requestAnimationFrame was
  // measured starting 30-40 ms before that.
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
  const afterPaint = fn => {
    const types = window.PerformanceObserver?.supportedEntryTypes || []
    const type = ['largest-contentful-paint', 'paint'].find(t => types.includes(t))
    if (!type) return fn()
    const done = () => { observer.disconnect(); clearTimeout(timer); fn() }
    // A `paint` observer also delivers first-paint (background only), which can come before any
    // content is on screen; Firefox before 122 takes this path. Wait for the contentful one.
    const observer = new PerformanceObserver(list => {
      if (type === 'paint' && !list.getEntries().some(e => e.name === 'first-contentful-paint')) return
      done()
    })
    const timer = setTimeout(done, 3000)
    observer.observe({ type, buffered: true })
  }
  const start = () => afterPaint(soon)
  if (document.readyState === 'complete') start()
  else addEventListener('load', start, { once: true })
} else if (import.meta.env.DEV) {
  // The dev server has no prerendered markup: render the full app client-side. Guarded so the
  // production bundle contains neither this branch nor an App chunk.
  import('./hydrate.jsx').then(({ renderDev }) => renderDev())
}
