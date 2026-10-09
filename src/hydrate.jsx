import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import Header from './components/Header'
import Contact from './components/Contact'
import { ISLAND } from './islands'

/**
 * Everything that needs React. Loaded by src/main.jsx behind a dynamic import after first
 * paint, so the React runtime (the vendor chunk) never competes with fonts and the hero image
 * for bandwidth before FCP.
 */
const islands = [[ISLAND.header, Header], [ISLAND.contact, Contact]]

export function hydrateIslands() {
  for (const [id, Component] of islands) {
    const el = document.getElementById(id)
    if (!el) {
      console.error(`[islands] missing #${id} — App.jsx and islands.js out of sync`)
      continue
    }
    // The props the server rendered this island with (App.jsx serialises them), so the client
    // tree matches the prerendered markup. A parse failure is contained to its own island: if it
    // threw out of this loop, main.jsx would retry the whole function and call hydrateRoot a
    // second time on the islands that had already hydrated.
    let props
    try {
      props = el.dataset.props ? JSON.parse(el.dataset.props) : {}
    } catch (err) {
      console.error(`[islands] #${id} has unreadable data-props; leaving it as static markup`, err)
      continue
    }
    hydrateRoot(el, <StrictMode><Component {...props} /></StrictMode>)
  }
}

// Dev server only: no prerendered markup, so render the whole page for the current URL. main.jsx
// guards the call with import.meta.env.DEV; the App chunk is tree-shaken out of production.
export async function renderDev() {
  const [{ default: App }, { routes }] = await Promise.all([import('./App.jsx'), import('./content/routes.js')])
  // In production these URLs never reach a script: Pages redirects /x/ and /x.html to /x, and
  // answers unknown paths with 404.html. The dev server serves index.html for all of them, so
  // normalise the same way and fall back to the homepage instead of throwing on a blank page.
  const path = location.pathname.replace(/(index)?\.html$/, '').replace(/(.)\/$/, '$1')
  const known = routes.some(r => r.path === path)
  if (!known) console.warn(`[dev] no page at ${location.pathname}; rendering the homepage (production answers 404)`)
  createRoot(document.getElementById('root')).render(<StrictMode><App path={known ? path : '/'} /></StrictMode>)
}
