/**
 * Markdown content negotiation (acceptmarkdown.com, RFC 9110 §12.5.1). Runs as the Pages
 * Functions middleware (functions/_middleware.js); it lives outside functions/ because every file
 * in there becomes a route.
 *
 * Every page is served as HTML or as Markdown from the same URL, picked by the request's Accept
 * header. The Markdown files are built next to the HTML (scripts/prerender.js) at the path
 * markdownPath() names: <page>.md, and /index.html.md for the homepage, which is the llms.txt
 * convention, so the same files also work as direct links.
 *
 *   Accept prefers text/markdown -> the page's .md file, Content-Type: text/markdown
 *   Accept prefers text/html, is a bare wildcard or is absent -> the HTML, as before
 *   Accept matches neither (application/pdf), or wants Markdown from a page that has none
 *   and refuses HTML with q=0 -> 406. Otherwise a page without a twin falls back to HTML:
 *   acceptmarkdown.com's advice is that 406 should be rare.
 *   No such page -> 404 either way; a Markdown body when Markdown was asked for (dist/404.md)
 *
 * Both representations carry Vary: Accept, and the HTML advertises its twin with a
 * Link: rel="alternate" header. Everything is fetched through env.ASSETS, the Pages static asset
 * server, so its responses carry the same headers and redirects as when no Function runs.
 */

const HTML = 'text/html'
const MARKDOWN = 'text/markdown'
const MARKDOWN_TYPE = 'text/markdown; charset=utf-8'
export const NOT_FOUND_MARKDOWN = '/404.md'

function parseAccept(header) {
  return header.split(',').flatMap((raw, position) => {
    const [type, ...params] = raw.split(';').map(s => s.trim())
    if (!type) return []
    let q = 1
    for (const param of params) {
      const [name, value] = param.split('=').map(s => s.trim())
      if (name.toLowerCase() === 'q') {
        const parsed = Number(value)
        if (!Number.isNaN(parsed)) q = Math.min(1, Math.max(0, parsed))
      }
    }
    const lower = type.toLowerCase()
    const specificity = lower === '*/*' ? 0 : lower.endsWith('/*') ? 1 : 2
    return [{ type: lower, q, specificity, position }]
  })
}

const matches = (range, type) =>
  range.type === '*/*' || range.type === type || (range.type.endsWith('/*') && type.startsWith(range.type.slice(0, -1)))

/**
 * The type to serve from `produces` (most preferred first), or null when the client accepts none.
 * Each candidate is scored by the most specific range that matches it, so `text/html;q=0, *\/*`
 * still rules HTML out; the highest q wins, ties go to the client's order, then to ours.
 * A missing or empty header means no preference: the first type we produce.
 */
// The range that speaks for `type`: the most specific one matching it, the first of equals.
const rangeFor = (ranges, type) =>
  ranges.filter(r => matches(r, type)).sort((a, b) => b.specificity - a.specificity || a.position - b.position)[0]

export function preferredType(header, produces) {
  const ranges = header ? parseAccept(header) : []
  if (!ranges.length) return produces[0] ?? null
  let best = null
  for (const type of produces) {
    const range = rangeFor(ranges, type)
    if (!range || range.q <= 0) continue
    if (!best || range.q > best.q || (range.q === best.q && range.position < best.position)) {
      best = { type, q: range.q, position: range.position }
    }
  }
  return best?.type ?? null
}

/** True when the header turns `type` down outright (q=0), not merely leaves it unlisted. */
export const refuses = (header, type) => rangeFor(header ? parseAccept(header) : [], type)?.q === 0

/** Where a page's Markdown twin is built: /index.html.md for the homepage, <path>.md otherwise. */
export const markdownPath = pathname => (pathname === '/' ? '/index.html.md' : `${pathname}.md`)
// ...and back: the page a twin belongs to. 404.md belongs to none (_headers marks it noindex).
const pageOf = twin => (twin === NOT_FOUND_MARKDOWN ? null : twin === '/index.html.md' ? '/' : twin.slice(0, -3))

// Only an extensionless path without a trailing slash can be a page: "/fr/" is answered by the
// assets layer's redirect to "/fr", and "/index.html" by its redirect to "/", whatever the Accept.
const isPagePath = pathname => pathname === '/' || (!pathname.endsWith('/') && !/\.[^/]*$/.test(pathname))

function varyAccept(headers) {
  const vary = headers.get('Vary')
  const listed = (vary ?? '').split(',').map(s => s.trim().toLowerCase())
  if (listed.includes('accept') || listed.includes('*')) return
  headers.set('Vary', vary ? `${vary}, Accept` : 'Accept')
}

const REASON = { 404: 'Not Found', 406: 'Not Acceptable' }

// A response with headers this module can change (asset responses' headers are immutable).
function edit(response, { status = response.status, body = response.body } = {}) {
  const statusText = status === response.status ? response.statusText : REASON[status] ?? ''
  return new Response(body, { status, statusText, headers: new Headers(response.headers) })
}

function asMarkdown(response, canonical, request) {
  const res = edit(response, { body: request.method === 'HEAD' ? null : response.body })
  res.headers.set('Content-Type', MARKDOWN_TYPE)
  // The HTML page is the one to index; the Markdown is a view of it.
  if (canonical) res.headers.set('Link', `<${canonical}>; rel="canonical"`)
  varyAccept(res.headers)
  return res
}

function notAcceptable(base, request) {
  const body = `Not Acceptable\n\nThis resource is available as:\n- ${HTML}\n- ${MARKDOWN}\n\nYou asked for: ${request.headers.get('Accept') ?? ''}\n`
  const res = edit(base, { status: 406, body: request.method === 'HEAD' ? null : body })
  res.headers.set('Content-Type', 'text/plain; charset=utf-8')
  res.headers.set('Cache-Control', 'no-store')
  for (const name of ['ETag', 'Last-Modified', 'Content-Length', 'Link']) res.headers.delete(name)
  varyAccept(res.headers)
  return res
}

// No such page or file. A Markdown body when Markdown was asked for (agents get somewhere to go
// next); otherwise the HTML 404 page as the assets layer built it. 404 either way.
async function notFound(request, res, wanted, fromAssets) {
  if (wanted === MARKDOWN) {
    const body = await fromAssets(NOT_FOUND_MARKDOWN)
    if (body.status === 200) {
      const page = asMarkdown(edit(body, { status: 404 }), null, request)
      // These describe the file the body came from, not the missing resource.
      for (const name of ['ETag', 'Last-Modified']) page.headers.delete(name)
      page.headers.set('Cache-Control', 'no-store')
      return page
    }
  }
  const page = edit(res)
  varyAccept(page.headers)
  return page
}

/** Serves a GET or HEAD for anything that is not the API: pages, files and unknown paths. */
export async function negotiate(request, env) {
  const url = new URL(request.url)
  const { pathname } = url
  const fromAssets = (path, method = request.method) =>
    env.ASSETS.fetch(new Request(new URL(path, url.origin), { method: method === 'HEAD' ? 'HEAD' : 'GET', headers: request.headers }))
  if (request.method !== 'GET' && request.method !== 'HEAD') return env.ASSETS.fetch(request)

  const accept = request.headers.get('Accept')
  const wanted = preferredType(accept, [HTML, MARKDOWN])
  const page = isPagePath(pathname)

  if (page && wanted === MARKDOWN) {
    const md = await fromAssets(markdownPath(pathname))
    if (md.status === 200 || md.status === 304) return asMarkdown(md, url.origin + pathname, request)
  }

  const res = await env.ASSETS.fetch(request)
  if (res.status === 404) return notFound(request, res, wanted, fromAssets)
  // A direct link to a Markdown twin (/index.html.md) is Markdown too, whatever the assets
  // layer's MIME table says, and names its page as the one to index.
  if (!page) {
    if (!pathname.endsWith('.md') || res.status !== 200) return res
    const owner = pageOf(pathname)
    return asMarkdown(res, owner && url.origin + owner, request)
  }
  if (res.status === 304) {
    const notModified = edit(res)
    varyAccept(notModified.headers)
    return notModified
  }
  if (res.status !== 200 || !(res.headers.get('Content-Type') ?? '').startsWith(HTML)) return res

  // A page. Nothing it comes as is acceptable, or Markdown was wanted, there is no twin (a page
  // outside the route table) and HTML was refused outright.
  if (wanted === null || (wanted === MARKDOWN && refuses(accept, HTML))) return notAcceptable(res, request)

  const html = edit(res)
  varyAccept(html.headers)
  const twin = markdownPath(pathname)
  if ((await fromAssets(twin, 'HEAD')).status === 200) {
    const link = `<${twin}>; rel="alternate"; type="${MARKDOWN}"`
    const existing = html.headers.get('Link')
    html.headers.set('Link', existing ? `${existing}, ${link}` : link)
  }
  return html
}
