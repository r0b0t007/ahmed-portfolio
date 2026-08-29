import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header'
import Contact from './components/Contact'
import { ISLAND } from './islands'

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
const islands = [[ISLAND.header, Header], [ISLAND.contact, Contact]]
const prerendered = document.getElementById(ISLAND.header)?.hasChildNodes()

if (prerendered) {
  revealOnScroll() // before hydration, so a failed island can't leave the page invisible
  for (const [id, Component] of islands) {
    const el = document.getElementById(id)
    if (el) hydrateRoot(el, <StrictMode><Component /></StrictMode>)
    else console.error(`[islands] missing #${id} — App.jsx and islands.js out of sync`)
  }
} else if (import.meta.env.DEV) {
  // The dev server has no prerendered markup: render the full app client-side. Guarded so the
  // production bundle contains neither this branch nor an App chunk.
  import('./App.jsx').then(({ default: App }) => {
    createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
    requestAnimationFrame(() => requestAnimationFrame(revealOnScroll))
  })
}
