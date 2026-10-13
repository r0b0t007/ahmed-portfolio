import './index.css' // the entry owns the stylesheet: vite.config.js inlines it into <head>
import { ISLAND } from './islands'

/**
 * Entry chunk. Deliberately tiny and React-free: it is the only script fetched before first
 * paint, and Lighthouse's throttled simulation charges every byte in flight before FCP against
 * FCP and LCP. React and the two islands live in src/hydrate.jsx, loaded behind import() once
 * the page has painted (see schedule below), so ~60 KB of runtime leaves the first wave.
 */

// The build prerenders the whole page (scripts/prerender.js). Only the two components with
// state hydrate; the rest is static HTML and never enters this bundle.
const prerendered = document.getElementById(ISLAND.header)?.hasChildNodes()

if (prerendered) {
  // Hydrate at the first sign the user wants to interact, or shortly after load — whichever
  // comes first. Nothing above the fold needs React to be readable; only the header's index key
  // and the contact form do.
  //
  // The idle timeout is deliberately short. Between first paint and hydration a tap on the menu
  // button does nothing, so that window has to be bounded by the runtime download rather than by
  // how long the browser feels like staying idle. `load` already fires after the LCP image, so
  // starting the fetch there costs no metric.
  const triggers = ['pointerdown', 'touchstart', 'keydown', 'focusin', 'scroll', 'mousemove']
  const listen = fn => { for (const type of triggers) fn(type, hydrate, { capture: true, passive: true }) }
  let hydrating = false

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
  if (document.readyState === 'complete') soon()
  else addEventListener('load', soon, { once: true })
} else if (import.meta.env.DEV) {
  // The dev server has no prerendered markup: render the full app client-side. Guarded so the
  // production bundle contains neither this branch nor an App chunk.
  import('./hydrate.jsx').then(({ renderDev }) => renderDev())
}
