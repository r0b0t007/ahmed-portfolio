import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header'
import Contact from './components/Contact'
import { ISLAND } from './islands'

// The build prerenders the whole page (scripts/prerender.js). Only the two components with
// state hydrate; the rest is static HTML and never enters this bundle. The dev server has no
// prerendered markup, so it falls back to rendering the full app client-side.
const islands = [[ISLAND.header, Header], [ISLAND.contact, Contact]]

if (document.getElementById(ISLAND.header)?.hasChildNodes()) {
  for (const [id, Component] of islands) {
    hydrateRoot(document.getElementById(id), <StrictMode><Component /></StrictMode>)
  }
  revealOnScroll()
} else {
  import('./App.jsx').then(({ default: App }) => {
    createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
  })
}

// The static sections use .fade-in / .fade-fill reveal classes that useFadeIn used to toggle
// from React. Same behaviour, no hydration: one observer over every reveal element that is not
// inside an island (islands keep the hook).
function revealOnScroll() {
  const inIsland = el => islands.some(([id]) => document.getElementById(id)?.contains(el))
  const els = [...document.querySelectorAll('.fade-in, .fade-fill, .fade-fill-var')].filter(el => !inIsland(el))
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
    }
  }, { threshold: 0.1 })
  els.forEach(el => observer.observe(el))
}
