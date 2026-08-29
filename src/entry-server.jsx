import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

/**
 * Server entry used only at build time by scripts/prerender.js.
 *
 * index.css is deliberately not imported here — all styles live in that one stylesheet, and the
 * client build already emits its <link> into index.html, so the prerendered markup is styled by
 * it as soon as it loads. Nothing about the SSR bundle is served.
 */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
