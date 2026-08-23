import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

/**
 * Server entry used only at build time by scripts/prerender.js.
 *
 * index.css is deliberately not imported here — the client build already emits a stylesheet link
 * into index.html, and component styles are colocated <style> tags that come along with the
 * rendered markup.
 */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
