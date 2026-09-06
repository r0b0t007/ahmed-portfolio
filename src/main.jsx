import './index.css' // the entry owns the stylesheet: vite.config.js inlines it into <head>
import { ISLAND } from './islands'

/**
 * Entry chunk. Deliberately tiny and React-free: it is the only script fetched before first
 * paint, and Lighthouse's throttled simulation charges every byte in flight before FCP against
 * FCP and LCP. React and the two islands live in src/hydrate.jsx, loaded behind import() once
 * the page has painted (see schedule below), so ~60 KB of runtime leaves the first wave.
 */

// Every .fade-in / .fade-fill element on the page, islands included: classList changes survive
// hydration, so one observer owns the reveal effect and no component needs a hook for it.
function revealOnScroll() {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
    }
  }, { threshold: 0.1 })
  document.querySelectorAll('.fade-in, .fade-fill, .fade-fill-var').forEach(el => observer.observe(el))
}

// The build prerenders the whole page (scripts/prerender.js). Only the two components with
// state hydrate; the rest is static HTML and never enters this bundle.
const prerendered = document.getElementById(ISLAND.header)?.hasChildNodes()

if (prerendered) {
  revealOnScroll() // before hydration, so a failed island can't leave the page invisible

  // Hydrate at the first sign the user wants to interact, or once the page is idle after
  // load — whichever comes first. Nothing above the fold needs React to be readable; only the
  // menu button, the header's scrolled state and the contact form do.
  let hydrating = false
  const hydrate = () => {
    if (hydrating) return
    hydrating = true
    for (const type of triggers) removeEventListener(type, hydrate, true)
    import('./hydrate.jsx').then(({ hydrateIslands }) => hydrateIslands())
  }
  const triggers = ['pointerdown', 'touchstart', 'keydown', 'focusin', 'scroll', 'mousemove']
  for (const type of triggers) addEventListener(type, hydrate, { capture: true, passive: true })
  const whenIdle = () => ('requestIdleCallback' in window ? requestIdleCallback(hydrate, { timeout: 1500 }) : setTimeout(hydrate, 0))
  if (document.readyState === 'complete') whenIdle()
  else addEventListener('load', whenIdle, { once: true })
} else if (import.meta.env.DEV) {
  // The dev server has no prerendered markup: render the full app client-side. Guarded so the
  // production bundle contains neither this branch nor an App chunk.
  import('./hydrate.jsx').then(({ renderDev }) => {
    renderDev()
    requestAnimationFrame(() => requestAnimationFrame(revealOnScroll))
  })
}
