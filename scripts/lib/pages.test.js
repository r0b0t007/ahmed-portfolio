import { test } from 'node:test'
import assert from 'node:assert/strict'
import { injectMarkup, rewriteHead, addAlternates, assertPage, buildSitemap, buildRedirects, fillErrorPage } from './pages.js'

const TEMPLATE = `<!doctype html><html lang="en"><head>
<title>Home | Ahmed Chioua</title>
<meta name="description" content="home description" />
<link rel="canonical" href="https://ahmedchioua.com/" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_US" />
<meta property="og:url" content="https://ahmedchioua.com/" />
<meta property="og:title" content="Home" />
<meta property="og:description" content="home description" />
<meta name="twitter:title" content="Home" />
<meta name="twitter:description" content="home description" />
<!-- below 900px the <h1> is the LCP -->
<link rel="preload" as="image" type="image/avif" href="/headshot-700.avif"
  media="(min-width: 900.02px)" fetchpriority="high" />
<link rel="preload" as="font" type="font/woff2" href="/assets/archivo.woff2" crossorigin />
<script type="application/ld+json">{"@graph":[{"@type":"Person"}]}</script>
<script type="application/ld+json">{"@graph":[{"@type":"FAQPage"}]}</script>
</head><body><div id="root"></div></body></html>`

const MAILTO = '<a href="mailto:a@b.c">a@b.c</a>'
const markup = (h1s = 1) =>
  '<main>' + '<h1>Title</h1>'.repeat(h1s) + 'x'.repeat(1000) + MAILTO + MAILTO + '</main>'

test('injectMarkup puts the markup in #root and guards both mailto links', () => {
  const html = injectMarkup(TEMPLATE, markup())
  assert.match(html, /<div id="root"><main><h1>Title<\/h1>/)
  assert.equal(html.match(/<!--email_off-->/g).length, 2)
})

test('injectMarkup rejects short markup, a missing root and a wrong mailto count', () => {
  assert.throws(() => injectMarkup(TEMPLATE, '<h1>x</h1>'), /markup looks wrong/)
  assert.throws(() => injectMarkup('<html></html>', markup()), /root/)
  assert.throws(() => injectMarkup(TEMPLATE, markup().replace(MAILTO, '')), /mailto/)
})

const PAGE = {
  url: 'https://ahmedchioua.com/services/x',
  title: 'SaaS & MVP Development | Ahmed Chioua',
  description: 'From €12,000 & "fast"',
  jsonLd: { '@context': 'https://schema.org', '@type': 'Service', name: '</script>' },
}

test('rewriteHead swaps every per-page field and escapes attribute values', () => {
  const html = rewriteHead(TEMPLATE, PAGE)
  assert.match(html, /<title>SaaS &amp; MVP Development \| Ahmed Chioua<\/title>/)
  assert.match(html, /<meta name="description" content="From €12,000 &amp; &quot;fast&quot;" \/>/)
  assert.match(html, /<link rel="canonical" href="https:\/\/ahmedchioua.com\/services\/x" \/>/)
  assert.match(html, /<meta property="og:url" content="https:\/\/ahmedchioua.com\/services\/x" \/>/)
  assert.match(html, /<meta property="og:title" content="SaaS &amp; MVP/)
  assert.match(html, /<meta name="twitter:description" content="From €12,000/)
  assert.doesNotMatch(html, /home description/)
})

test('rewriteHead drops the hero preload and the homepage JSON-LD, keeps font preloads', () => {
  const html = rewriteHead(TEMPLATE, PAGE)
  assert.doesNotMatch(html, /as="image"/)
  assert.match(html, /as="font"/)
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)
  assert.equal(ld.length, 1)
  assert.doesNotMatch(ld[0], /Person|FAQPage/)
  assert.match(ld[0], /\\u003c\/script>/) // a "</script>" inside the data cannot close the tag
})

test('rewriteHead strips head comments, and only head comments', () => {
  const html = rewriteHead(TEMPLATE.replace('<div id="root">', '<!--body note--><div id="root">'), PAGE)
  assert.doesNotMatch(html.slice(0, html.indexOf('</head>')), /<!--/)
  assert.match(html, /<!--body note-->/)
})

test('rewriteHead fails loudly when a head field is missing', () => {
  const noCanonical = TEMPLATE.replace(/<link rel="canonical"[^>]*>/, '')
  assert.throws(() => rewriteHead(noCanonical, PAGE), /canonical/)
})

test('assertPage accepts one h1 and a matching canonical, ignoring comments', () => {
  const html = injectMarkup(rewriteHead(TEMPLATE, PAGE), markup())
  assert.doesNotThrow(() => assertPage(html, PAGE.url))
})

test('assertPage rejects two h1s and a canonical for another URL', () => {
  const two = injectMarkup(rewriteHead(TEMPLATE, PAGE), markup(2))
  assert.throws(() => assertPage(two, PAGE.url), /one <h1>/)
  const one = injectMarkup(TEMPLATE, markup())
  assert.throws(() => assertPage(one, PAGE.url), /canonical/)
})

test('buildSitemap lists each URL once', () => {
  const xml = buildSitemap(['https://ahmedchioua.com/', 'https://ahmedchioua.com/services/x'])
  assert.match(xml, /^<\?xml version="1.0" encoding="UTF-8"\?>/)
  assert.equal(xml.match(/<loc>/g).length, 2)
  assert.match(xml, /<loc>https:\/\/ahmedchioua.com\/services\/x<\/loc>/)
})

test('buildRedirects sends each page’s slash form to the page, and nothing else', () => {
  const rules = buildRedirects(['/', '/services/a', '/about'])
    .split('\n').filter(l => l && !l.startsWith('#'))
  assert.deepEqual(rules, ['/services/a/ /services/a 308', '/about/ /about 308'])
})

test('fillErrorPage lists every route by name, escaped, in place of the placeholder', () => {
  const routes = [
    { path: '/', kind: 'home' },
    { path: '/services/a', kind: 'service', name: 'SaaS & MVP' },
    { path: '/fr', kind: 'home', name: 'Version française' },
  ]
  const html = fillErrorPage('<nav>\n        <!--PAGE_LINKS-->\n      </nav>', routes)
  assert.match(html, /<a href="\/">Homepage<\/a>/)
  assert.match(html, /<a href="\/services\/a">SaaS &amp; MVP<\/a>/)
  assert.match(html, /<a href="\/fr">Version française<\/a>/)
  assert.doesNotMatch(html, /PAGE_LINKS/)
})

test('fillErrorPage fails without exactly one placeholder', () => {
  assert.throws(() => fillErrorPage('<nav></nav>', []), /PAGE_LINKS/)
  assert.throws(() => fillErrorPage('<!--PAGE_LINKS--><!--PAGE_LINKS-->', []), /PAGE_LINKS/)
})

test('rewriteHead marks articles for link previews, and leaves other pages as websites', () => {
  const article = rewriteHead(TEMPLATE, { ...PAGE, og: { type: 'article', publishedTime: '2026-10-09' } })
  assert.match(article, /<meta property="og:type" content="article" \/>/)
  assert.match(article, /<meta property="article:published_time" content="2026-10-09" \/>/)
  const page = rewriteHead(TEMPLATE, PAGE)
  assert.match(page, /<meta property="og:type" content="website" \/>/)
  assert.doesNotMatch(page, /article:published_time/)
})

test('rewriteHead sets the page language, its og:locale and its hreflang links', () => {
  const alternates = { en: 'https://ahmedchioua.com/services/x', fr: 'https://ahmedchioua.com/fr/services/y' }
  const html = rewriteHead(TEMPLATE, { ...PAGE, url: alternates.fr, lang: 'fr', ogLocale: 'fr_FR', alternates })
  assert.match(html, /^<!doctype html><html lang="fr">/)
  assert.match(html, /<meta property="og:locale" content="fr_FR" \/>/)
  const links = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)" \/>/g)].map(m => [m[1], m[2]])
  assert.deepEqual(links, [['en', alternates.en], ['fr', alternates.fr], ['x-default', alternates.en]])
  assert.ok(html.lastIndexOf('hreflang') < html.indexOf('</head>'))
})

test('rewriteHead leaves language and hreflang alone when not asked', () => {
  const html = rewriteHead(TEMPLATE, PAGE)
  assert.match(html, /<html lang="en">/)
  assert.match(html, /<meta property="og:locale" content="en_US" \/>/)
  assert.doesNotMatch(html, /hreflang/)
})

test('addAlternates adds one set, needs an English page for x-default, and skips pages without twins', () => {
  const alt = { en: 'https://ahmedchioua.com/', fr: 'https://ahmedchioua.com/fr' }
  const once = addAlternates(TEMPLATE, alt)
  assert.equal(once.match(/hreflang=/g).length, 3)
  assert.throws(() => addAlternates(once, alt), /already/)
  assert.throws(() => addAlternates(TEMPLATE, { fr: alt.fr }), /x-default/)
  assert.equal(addAlternates(TEMPLATE, undefined), TEMPLATE)
})
