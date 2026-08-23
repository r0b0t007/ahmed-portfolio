import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The build prerenders the full app into #root (scripts/prerender.js), so the normal path is
// hydration. createRoot is the fallback for the case where markup isn't there — a dev server
// run, or a build where prerendering was skipped.
if (root.hasChildNodes()) {
  hydrateRoot(root, tree)
} else {
  createRoot(root).render(tree)
}
