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
    if (el) hydrateRoot(el, <StrictMode><Component /></StrictMode>)
    else console.error(`[islands] missing #${id} — App.jsx and islands.js out of sync`)
  }
}

// Dev server only: no prerendered markup, so render the whole app. main.jsx guards the call
// with import.meta.env.DEV; the App chunk is tree-shaken out of the production bundle.
export async function renderDev() {
  const { default: App } = await import('./App.jsx')
  createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
}
