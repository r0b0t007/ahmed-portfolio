import { test } from 'node:test'
import assert from 'node:assert/strict'
import { injectMarkup, rewriteHead, assertPage, buildSitemap } from './pages.js'

const TEMPLATE = `<!doctype html><html lang="en"><head>
<title>Home | Ahmed Chioua</title>
<meta name="description" content="home description" />
<link rel="canonical" href="https://ahmedchioua.com/" />
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
