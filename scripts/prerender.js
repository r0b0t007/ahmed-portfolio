/**
 * Prerenders every route in src/content/routes.js into dist/.
 *
 * Runs after both Vite builds (see the "build" script in package.json):
 *   1. vite build                          -> dist/          (client bundle + index.html)
 *   2. vite build --ssr src/entry-server   -> dist-ssr/      (server bundle, build-time only)
 *   3. node scripts/prerender.js           -> one HTML file per route, plus sitemap.xml and _redirects
 *
 * Why: the site is client-rendered, so without this the served HTML has an empty #root. First
 * paint waits on the bundle parsing, and non-JS crawlers see nothing. Injecting the markup means
 * the page paints from HTML and React hydrates over it.
 *
 * The homepage keeps index.html's hand-written head. Every other route starts from the same
 * built template, so it inherits the inlined CSS, font preloads and entry script, and gets its
 * own title, description, canonical and JSON-LD (scripts/lib/pages.js). Routes are written as
 * <path>.html, which Cloudflare Pages serves at the extensionless URL.
 */
import { readFileSync, writeFileSync, rmSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { routes, absoluteUrl } from '../src/content/routes.js'
import { injectMarkup, rewriteHead, assertPage, buildSitemap, buildRedirects } from './lib/pages.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = file => resolve(root, 'dist', file)
const ssrEntry = resolve(root, 'dist-ssr/entry-server.js')

if (!existsSync(ssrEntry)) {
  console.error(`[prerender] SSR bundle missing at ${ssrEntry} — did "vite build --ssr" run?`)
  process.exit(1)
}

const { render } = await import(pathToFileURL(ssrEntry).href)
const template = readFileSync(dist('index.html'), 'utf8')
const outFile = path => (path === '/' ? 'index.html' : `${path.slice(1)}.html`)
const paths = routes.map(r => r.path)

for (const route of routes) {
  try {
    const url = absoluteUrl(route.path)
    // Head first, on the bare template: the "exactly once" checks must only ever see the head,
    // not a <title> inside an SVG icon or JSON-LD that a component renders in the body.
    const head = route.kind === 'home'
      ? template
      : rewriteHead(template, { url, title: route.title, description: route.description, jsonLd: route.jsonLd })
    const html = injectMarkup(head, render(route.path))
    assertPage(html, url)
    // 404.html's "Get in touch" is a fixed /#contact link (src/404.html); the homepage must keep
    // rendering that anchor, or the link lands at the top of the page instead of the form.
    if (route.kind === 'home' && !html.includes('id="contact"')) throw new Error('homepage has no id="contact" for 404.html to link to')
    const file = dist(outFile(route.path))
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, html)
    console.log(`[prerender] ${route.path} -> dist/${outFile(route.path)} (${(Buffer.byteLength(html) / 1024).toFixed(1)} kB)`)
  } catch (err) {
    // The stack, not just the message: a component that throws while rendering is only findable
    // by its file and line.
    console.error(`[prerender] ${route.path} failed`)
    console.error(err?.stack ?? err)
    process.exit(1)
  }
}
writeFileSync(dist('sitemap.xml'), buildSitemap(paths.map(absoluteUrl)))
console.log(`[prerender] sitemap.xml: ${routes.length} URLs`)
writeFileSync(dist('_redirects'), buildRedirects(paths))
console.log(`[prerender] _redirects: ${routes.length - 1} trailing-slash rules`)

// The SSR bundle is a build artefact; it must not be published.
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
