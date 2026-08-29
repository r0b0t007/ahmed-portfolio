/**
 * Prerenders the app into dist/index.html.
 *
 * Runs after both Vite builds (see the "build" script in package.json):
 *   1. vite build                          -> dist/          (client bundle + index.html)
 *   2. vite build --ssr src/entry-server   -> dist-ssr/      (server bundle, build-time only)
 *   3. node scripts/prerender.js           -> injects markup into dist/index.html
 *
 * Why: the site is client-rendered, so without this the served HTML has an empty #root. First
 * paint waits on the bundle parsing, and non-JS crawlers see nothing. Injecting the markup means
 * the page paints from HTML and React hydrates over it.
 */
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = resolve(root, 'dist/index.html')
const ssrEntry = resolve(root, 'dist-ssr/entry-server.js')

if (!existsSync(ssrEntry)) {
  console.error(`[prerender] SSR bundle missing at ${ssrEntry} — did "vite build --ssr" run?`)
  process.exit(1)
}

const { render } = await import(pathToFileURL(ssrEntry).href)
const markup = render()

if (!markup || markup.length < 1000) {
  console.error(`[prerender] rendered markup looks wrong (${markup?.length ?? 0} chars) — aborting`)
  process.exit(1)
}

let html = readFileSync(htmlPath, 'utf8')

const target = '<div id="root"></div>'
if (!html.includes(target)) {
  console.error('[prerender] could not find an empty <div id="root"></div> in dist/index.html')
  process.exit(1)
}

html = html.replace(target, `<div id="root">${markup}</div>`)

// Inline the (single, ~4 KiB gzipped) stylesheet: a <link> costs a full round trip on the critical
// path before first paint, and at this size the bytes are cheaper inline than the request.
const cssLink = /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/
const linkMatch = html.match(cssLink)
if (!linkMatch) {
  console.error('[prerender] expected exactly one <link rel="stylesheet"> for /assets/*.css in dist/index.html')
  process.exit(1)
}
const css = readFileSync(resolve(root, 'dist', linkMatch[1].slice(1)), 'utf8').trim()
html = html.replace(cssLink, `<style>${css}</style>`)
rmSync(resolve(root, 'dist', linkMatch[1].slice(1)))
writeFileSync(htmlPath, html)

// The SSR bundle is a build artefact; it must not be published.
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })

const kb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1)
console.log(`[prerender] injected ${markup.length.toLocaleString()} chars — dist/index.html now ${kb} kB`)
