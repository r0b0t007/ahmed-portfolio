/**
 * String-level helpers for scripts/prerender.js. Pure functions over HTML text, so they can be
 * unit-tested without a build (scripts/lib/pages.test.js).
 *
 * Every rewrite asserts it matched exactly once. The template is Vite's output for the
 * hand-written index.html, and a silent miss here would ship a service page with the homepage's
 * canonical or title. That is the bug this whole module exists to make impossible.
 */

const ROOT = '<div id="root"></div>'
const MIN_MARKUP = 1000

// Cloudflare's Email Address Obfuscation rewrites every mailto:/visible address and injects
// /cdn-cgi/scripts/.../email-decode.min.js into the critical path to undo it. Addresses wrapped
// in these comments are left alone, and with nothing to rewrite the script is not injected.
// React can't emit HTML comments, so the wrap happens here. Hydration ignores comment nodes.
const EMAIL_OFF = /(<a\s[^>]*href="mailto:[^"]*"[^>]*>.*?<\/a>)/gs
// Every page renders Contact (the <dd>) and Footer (the icon link). Asserting the exact count
// means a refactor that moves one out of reach of the regex fails the build, instead of quietly
// putting email-decode.min.js back in the critical path.
const MAILTO_LINKS = 2

export function injectMarkup(template, markup) {
  if (!markup || markup.length < MIN_MARKUP) {
    throw new Error(`[prerender] rendered markup looks wrong (${markup?.length ?? 0} chars)`)
  }
  if (!template.includes(ROOT)) {
    throw new Error(`[prerender] could not find an empty ${ROOT} in the template`)
  }
  const guarded = markup.replace(EMAIL_OFF, '<!--email_off-->$1<!--/email_off-->')
  const wrapped = (guarded.match(/<!--email_off-->/g) || []).length
  if (wrapped !== MAILTO_LINKS) {
    throw new Error(`[prerender] wrapped ${wrapped} mailto: links in <!--email_off-->, expected ${MAILTO_LINKS}`)
  }
  // Function replacer: `$&`/`$1` sequences inside the markup must not be treated as patterns.
  return template.replace(ROOT, () => `<div id="root">${guarded}</div>`)
}

const escapeAttr = s =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function replaceOnce(html, pattern, replacement, label) {
  const all = new RegExp(pattern.source, pattern.flags.replace('g', '') + 'g')
  const found = (html.match(all) || []).length
  if (found !== 1) throw new Error(`[prerender] expected one ${label} in the template, found ${found}`)
  return html.replace(pattern, () => replacement)
}

const metaTag = (attr, key) => new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`)
const JSON_LD = /\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g

export function rewriteHead(html, { url, title, description, jsonLd, og, lang, ogLocale, alternates }) {
  // index.html's head comments explain the homepage (the hero preload, the critical CSS). On any
  // other page they describe tags that are gone and cost first-wave bytes, so they go, before the
  // exactly-once checks below can count a tag that is only mentioned in their prose.
  const end = html.indexOf('</head>')
  if (end < 0) throw new Error('[prerender] expected one </head> in the template, found 0')
  html = html.slice(0, end).replace(/<!--[\s\S]*?-->\n?/g, '') + html.slice(end)

  const t = escapeAttr(title)
  const d = escapeAttr(description)
  const u = escapeAttr(url)
  const fields = [
    [/<title>[^<]*<\/title>/, `<title>${t}</title>`, '<title>'],
    [metaTag('name', 'description'), `<meta name="description" content="${d}" />`, 'meta description'],
    [/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${u}" />`, 'canonical'],
    [metaTag('property', 'og:url'), `<meta property="og:url" content="${u}" />`, 'og:url'],
    [metaTag('property', 'og:title'), `<meta property="og:title" content="${t}" />`, 'og:title'],
    [metaTag('property', 'og:description'), `<meta property="og:description" content="${d}" />`, 'og:description'],
    [metaTag('name', 'twitter:title'), `<meta name="twitter:title" content="${t}" />`, 'twitter:title'],
    [metaTag('name', 'twitter:description'), `<meta name="twitter:description" content="${d}" />`, 'twitter:description'],
    // The desktop hero portrait is the homepage's LCP. No other page renders it, so preloading
    // it there would spend 34 KB of first-wave bandwidth on an image nobody sees.
    [/\s*<link rel="preload" as="image"[^>]*>/, '', 'hero image preload'],
  ]
  // Articles (build logs) say so to link-preview crawlers, matching their TechArticle JSON-LD;
  // every other page keeps index.html's og:type of "website".
  if (og?.type === 'article') {
    fields.push([
      metaTag('property', 'og:type'),
      `<meta property="og:type" content="article" />\n    <meta property="article:published_time" content="${escapeAttr(og.publishedTime)}" />`,
      'og:type',
    ])
  }
  // A page in another language than the template says so twice: to browsers and screen readers
  // (<html lang>) and to link-preview crawlers (og:locale).
  if (lang) fields.push([/<html lang="[^"]*">/, `<html lang="${escapeAttr(lang)}">`, '<html lang>'])
  if (ogLocale) fields.push([metaTag('property', 'og:locale'), `<meta property="og:locale" content="${escapeAttr(ogLocale)}" />`, 'og:locale'])
  for (const [pattern, replacement, label] of fields) html = replaceOnce(html, pattern, replacement, label)

  // The homepage graph (Person, FAQPage, products) describes the homepage. Each route brings its own.
  if (!(html.match(JSON_LD) || []).length) throw new Error('[prerender] expected JSON-LD in the template, found none')
  html = html.replace(JSON_LD, '')
  html = addAlternates(html, alternates)
  // "<" escaped so a string in the data can never close the <script> element early.
  const json = JSON.stringify(jsonLd).replace(/</g, '\\u003c')
  return replaceOnce(html, /<\/head>/, `<script type="application/ld+json">${json}</script>\n</head>`, '</head>')
}

/**
 * hreflang links for a page that exists in more than one language: one per language, plus
 * x-default, which is the English page (the version for a reader whose language has none).
 * Every page of a pair must carry the same set, or search engines ignore it; src/content/routes.js
 * builds the set once per pair, and scripts/lib/routes.test.js checks it is reciprocal.
 */
export function addAlternates(html, alternates) {
  if (!alternates) return html
  const end = html.indexOf('</head>')
  if (/hreflang=/.test(html.slice(0, end))) throw new Error('[prerender] the template already has hreflang links')
  if (!alternates.en) throw new Error('[prerender] alternates need an English page for x-default')
  const links = [...Object.entries(alternates), ['x-default', alternates.en]]
    .map(([lang, href]) => `<link rel="alternate" hreflang="${escapeAttr(lang)}" href="${escapeAttr(href)}" />`)
  return replaceOnce(html, /<\/head>/, `${links.join('\n')}\n</head>`, '</head>')
}

export function assertPage(html, url) {
  // Comments are stripped first: index.html's head comments mention "<h1>" in prose.
  const visible = html.replace(/<!--[\s\S]*?-->/g, '')
  const h1 = (visible.match(/<h1[\s>]/g) || []).length
  if (h1 !== 1) throw new Error(`[prerender] ${url}: expected one <h1>, found ${h1}`)
  const canonical = [...visible.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map(m => m[1])
  if (canonical.length !== 1 || canonical[0] !== url) {
    throw new Error(`[prerender] ${url}: canonical is [${canonical.join(', ')}], expected ${url}`)
  }
}

// No lastmod: a build date would change on every deploy and teach Google to ignore it.
// changefreq and priority are ignored by Google, so they are left out too.
export const buildSitemap = urls => [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(u => `  <url><loc>${escapeAttr(u)}</loc></url>`),
  '</urlset>',
  '',
].join('\n')

/**
 * Cloudflare Pages serves each prerendered <path>.html at /path, but answers /path/ with a 404 in
 * production (wrangler pages dev redirects it, which hid this until #29 shipped). One exact rule
 * per page sends the slash form to the canonical URL. Exact rules, not a placeholder, so a
 * mistyped path with a slash still gets a plain 404 rather than a redirect to one. 308 matches the
 * status Pages itself uses for /path.html -> /path.
 */
export const buildRedirects = paths => [
  '# Generated by scripts/prerender.js from src/content/routes.js. Do not edit by hand.',
  ...paths.filter(p => p !== '/').map(p => `${p}/ ${p} 308`),
  '',
].join('\n')

const PAGE_LINKS = '<!--PAGE_LINKS-->'
const escapeHtml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Fills src/404.html's page list from the route table: one link per page, labelled with its name.
 * The list is generated rather than typed, so a page added, renamed or removed in routes.js can't
 * leave the 404 page missing it or pointing at another 404.
 */
export function fillErrorPage(template, routes) {
  const found = template.split(PAGE_LINKS).length - 1
  if (found !== 1) throw new Error(`[404] expected one ${PAGE_LINKS} in src/404.html, found ${found}`)
  // The placeholder's own indentation, so the generated lines line up with the hand-written ones.
  const indent = template.match(new RegExp(`([ \\t]*)${PAGE_LINKS}`))[1]
  const links = routes
    .map(r => `<a href="${escapeAttr(r.path)}">${escapeHtml(r.path === '/' ? 'Homepage' : r.name)}</a>`)
    .join(`\n${indent}`)
  return template.replace(PAGE_LINKS, () => links)
}
