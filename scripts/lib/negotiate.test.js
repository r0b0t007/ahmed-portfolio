import { test } from 'node:test'
import assert from 'node:assert/strict'
import { onRequest } from '../../functions/_middleware.js'
import { preferredType, refuses, markdownPath } from '../../edge/negotiate.js'

const SITE = 'https://ahmedchioua.com'
const HTML_TYPE = 'text/html; charset=utf-8'

/**
 * Stands in for the assets binding the way Cloudflare's behaves: a known path gets its file with
 * the _headers rules on it, an unknown one gets 404.html with a 404 status, HEAD gets no body, and
 * html_handling (drop-trailing-slash) redirects /fr/ and /index.html.
 */
function assets(files) {
  const seen = []
  return {
    seen,
    async fetch(input) {
      const request = input instanceof Request ? input : new Request(input)
      const { pathname } = new URL(request.url)
      seen.push(`${request.method} ${pathname}`)
      const redirect = pathname === '/index.html' ? '/' : pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : null
      if (redirect) return new Response(null, { status: 307, headers: { Location: redirect } })
      const file = files[pathname]
      const [status, type, text] = file ? [200, file.type, file.body] : [404, HTML_TYPE, '<h1>Not found</h1>']
      const headers = { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff', ETag: `"${pathname}"`, Vary: 'Accept-Encoding' }
      return new Response(request.method === 'HEAD' ? null : text, { status, headers })
    },
  }
}

const FILES = {
  '/': { type: HTML_TYPE, body: '<h1>Home</h1>' },
  '/index.html.md': { type: 'application/octet-stream', body: '# Home\n' },
  '/fr': { type: HTML_TYPE, body: '<h1>Accueil</h1>' },
  '/fr.md': { type: 'text/markdown', body: '# Accueil\n' },
  // A page with no Markdown twin.
  '/orphan': { type: HTML_TYPE, body: '<h1>Orphan</h1>' },
  '/404.md': { type: 'text/markdown', body: '# Page not found\n\nThere is no page at this address.\n' },
  '/llms.txt': { type: 'text/plain; charset=utf-8', body: '# llms' },
}

async function get(path, { accept, method = 'GET', files = FILES } = {}) {
  const env = { ASSETS: assets(files) }
  const headers = accept === undefined ? {} : { Accept: accept }
  // next() is the rest of the Pages chain: here, only ever the contact Function.
  const next = async () => new Response('next', { status: 299 })
  const res = await onRequest({ request: new Request(SITE + path, { method, headers }), env, next })
  return { res, text: await res.text(), seen: env.ASSETS.seen }
}

const varies = res => res.headers.get('Vary').split(',').map(s => s.trim().toLowerCase())

test('preferredType passes the acceptmarkdown.com test vectors', () => {
  const both = ['text/html', 'text/markdown']
  assert.equal(preferredType('text/markdown', both), 'text/markdown')
  assert.equal(preferredType('text/markdown, text/html;q=0.8', both), 'text/markdown')
  assert.equal(preferredType('text/html', both), 'text/html')
  assert.equal(preferredType('text/markdown;q=0, text/html', both), 'text/html')
  assert.equal(preferredType('text/markdown;q=0', ['text/markdown']), null)
  assert.equal(preferredType(null, both), 'text/html')
  assert.equal(preferredType('*/*', both), 'text/html')
})

test('preferredType: the most specific range decides, then q, then the client’s order', () => {
  const both = ['text/html', 'text/markdown']
  // A real Chrome header must never land on Markdown.
  assert.equal(preferredType('text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', both), 'text/html')
  assert.equal(preferredType('text/html;q=0, */*', both), 'text/markdown')
  assert.equal(preferredType('text/html;q=0.5, text/markdown;q=0.9', both), 'text/markdown')
  assert.equal(preferredType('text/markdown, text/html', both), 'text/markdown')
  assert.equal(preferredType('text/*;q=0.5, text/markdown', both), 'text/markdown')
  assert.equal(preferredType('application/pdf', both), null)
  assert.equal(preferredType('TEXT/MARKDOWN; Q=1', both), 'text/markdown')
  assert.equal(preferredType('', both), 'text/html')
})

test('refuses means q=0 on the range that speaks for the type, not absence', () => {
  assert.equal(refuses('text/markdown, text/html;q=0', 'text/html'), true)
  assert.equal(refuses('text/*;q=0, text/html', 'text/html'), false)
  assert.equal(refuses('text/markdown', 'text/html'), false)
  assert.equal(refuses(null, 'text/html'), false)
})

test('markdownPath follows the llms.txt convention', () => {
  assert.equal(markdownPath('/'), '/index.html.md')
  assert.equal(markdownPath('/fr'), '/fr.md')
  assert.equal(markdownPath('/services/website-development'), '/services/website-development.md')
})

test('Accept: text/markdown on the homepage gets Markdown, with Vary: Accept and a canonical link', async () => {
  const { res, text } = await get('/', { accept: 'text/markdown' })
  assert.equal(res.status, 200)
  assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8')
  assert.deepEqual(varies(res), ['accept-encoding', 'accept'])
  assert.equal(res.headers.get('Link'), `<${SITE}/>; rel="canonical"`)
  // The _headers rules come through from the assets layer.
  assert.equal(res.headers.get('X-Content-Type-Options'), 'nosniff')
  assert.equal(text, '# Home\n')
})

test('Accept: text/html, */* or no Accept keeps the HTML, now with Vary: Accept and a link to the Markdown', async () => {
  for (const accept of ['text/html', '*/*', undefined, 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8']) {
    const { res, text } = await get('/fr', { accept })
    assert.equal(res.status, 200, String(accept))
    assert.equal(res.headers.get('Content-Type'), HTML_TYPE)
    assert.ok(varies(res).includes('accept'))
    assert.equal(res.headers.get('Link'), '</fr.md>; rel="alternate"; type="text/markdown"')
    assert.equal(text, '<h1>Accueil</h1>')
  }
})

test('HEAD gets the Markdown headers and no body', async () => {
  const { res, text } = await get('/', { accept: 'text/markdown', method: 'HEAD' })
  assert.equal(res.status, 200)
  assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8')
  assert.equal(text, '')
})

test('an unknown path is a 404 either way; Markdown askers get a Markdown body that says where to go', async () => {
  const md = await get('/__probe-404', { accept: 'text/markdown' })
  assert.equal(md.res.status, 404)
  assert.equal(md.res.headers.get('Content-Type'), 'text/markdown; charset=utf-8')
  assert.equal(md.res.headers.get('Cache-Control'), 'no-store')
  assert.equal(md.res.headers.get('ETag'), null)
  assert.ok(varies(md.res).includes('accept'))
  assert.ok(md.text.startsWith('# Page not found') && md.text.length >= 20)

  const html = await get('/__probe-404', { accept: 'text/html' })
  assert.equal(html.res.status, 404)
  assert.equal(html.res.headers.get('Content-Type'), HTML_TYPE)
  assert.ok(varies(html.res).includes('accept'))

  // A missing file with an extension too, and a page path under a real directory.
  for (const path of ['/old-page.php', '/services/nope']) {
    const res = (await get(path, { accept: 'text/markdown' })).res
    assert.equal(res.status, 404, path)
    assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8', path)
  }
})

test('406 when nothing the client accepts exists, listing what does', async () => {
  const pdf = await get('/', { accept: 'application/pdf' })
  assert.equal(pdf.res.status, 406)
  assert.equal(pdf.res.headers.get('Content-Type'), 'text/plain; charset=utf-8')
  assert.equal(pdf.res.headers.get('Cache-Control'), 'no-store')
  assert.ok(varies(pdf.res).includes('accept'))
  assert.match(pdf.text, /text\/html\n- text\/markdown/)
  // Markdown asked for, HTML refused, and this page has no twin.
  assert.equal((await get('/orphan', { accept: 'text/markdown, text/html;q=0' })).res.status, 406)
  // ...but where HTML is only unlisted, not refused, the page is served as HTML.
  const orphan = await get('/orphan', { accept: 'text/markdown' })
  assert.equal(orphan.res.status, 200)
  assert.equal(orphan.res.headers.get('Content-Type'), HTML_TYPE)
  assert.equal(orphan.res.headers.get('Link'), null)
})

test('files are not negotiated; a direct link to a Markdown twin is served as Markdown', async () => {
  const txt = await get('/llms.txt', { accept: 'text/markdown' })
  assert.equal(txt.res.headers.get('Content-Type'), 'text/plain; charset=utf-8')
  assert.equal(txt.res.headers.get('Link'), null)
  const twin = await get('/index.html.md')
  assert.equal(twin.res.headers.get('Content-Type'), 'text/markdown; charset=utf-8')
  assert.equal(twin.res.headers.get('Link'), `<${SITE}/>; rel="canonical"`)
  assert.equal(twin.text, '# Home\n')
  assert.equal((await get('/fr.md')).res.headers.get('Link'), `<${SITE}/fr>; rel="canonical"`)
  assert.equal((await get('/404.md')).res.headers.get('Link'), null)
})

test('a trailing slash or an .html path is left to the assets layer’s redirect, never answered with Markdown', async () => {
  for (const [path, location] of [['/fr/', '/fr'], ['/index.html', '/']]) {
    const { res, seen } = await get(path, { accept: 'text/markdown' })
    assert.equal(res.status, 307, path)
    assert.equal(res.headers.get('Location'), location, path)
    assert.deepEqual(seen, [`GET ${path}`], path)
  }
})

test('other methods go straight to the assets layer', async () => {
  const { seen } = await get('/', { method: 'POST', accept: 'text/markdown' })
  assert.deepEqual(seen, ['POST /'])
})

test('the form API goes on to its own Function, untouched by negotiation', async () => {
  for (const [path, method] of [['/api/contact', 'POST'], ['/api/contact', 'GET'], ['/api/nope', 'GET']]) {
    const { res, text, seen } = await get(path, { method, accept: 'text/markdown' })
    assert.equal(res.status, 299, `${method} ${path}`)
    assert.equal(text, 'next')
    assert.deepEqual(seen, [], 'never fetched from the assets')
  }
})
