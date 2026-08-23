import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header'
import Contact from './components/Contact'
import { initReveal } from './reveal'

/**
 * Islands entry.
 *
 * The build prerenders the whole app to static HTML, but only two regions actually need to be
 * interactive: the header (scroll state + mobile menu) and the contact form. Hydrating just those
 * keeps the other seven sections as inert markup and keeps their code out of this bundle —
 * nothing here imports App.jsx, so the static components tree-shake away.
 *
 * The dev-server path is different: `vite dev` serves an empty #root with no prerendered markup,
 * so there is nothing to hydrate. App.jsx is imported dynamically there, which keeps it in its own
 * chunk that production never requests.
 */
const island = id => document.getElementById(id)

const headerEl = island('island-header')
const contactEl = island('island-contact')

if (headerEl && contactEl) {
  hydrateRoot(headerEl, <StrictMode><Header /></StrictMode>)
  hydrateRoot(contactEl, <StrictMode><Contact /></StrictMode>)
  initReveal()
} else {
  // No prerendered markup — dev server, or a client-only build.
  Promise.all([
    import('./App.jsx'),
    import('react-dom/client'),
  ]).then(([{ default: App }, { createRoot }]) => {
    createRoot(document.getElementById('root')).render(
      <StrictMode><App /></StrictMode>
    )
  })
}
