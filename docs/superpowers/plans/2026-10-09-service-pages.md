# Service Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/services/website-development` and `/services/saas-mvp-development` as prerendered pages, with the multi-route build every later page will reuse.

**Architecture:** A plain-data route table (`src/content/routes.js`) drives three consumers: the server entry (`render(path)`), the prerender script (one HTML file per route, head rewritten from the homepage template) and the generated `sitemap.xml`/`llms.txt`. Pure HTML-string helpers live in `scripts/lib/pages.js` and are unit-tested with `node --test`. Pages reuse the existing editorial components and the single stylesheet; the two islands (Header, Contact) hydrate unchanged on every page.

**Tech Stack:** React 19, Vite 7, `react-dom/server` `renderToString`, Node 26 (`node:test`), Cloudflare Pages, `wrangler pages dev` for local verification.

Spec: `docs/superpowers/specs/2026-10-09-service-pages-design.md`

## Global Constraints

- URLs: `/services/website-development` and `/services/saas-mvp-development`, no trailing slash, written as `dist/services/<slug>.html`.
- Titles ≤ 60 characters, meta descriptions ≤ 160 characters.
- Every number on a page comes from `src/content/site.js`; never type a price, day count or week count into JSX.
- No client results, testimonials, revenue claims or new commitments. New wording lives only in `src/content/services.js` and is flagged in the PR for Ahmed's review.
- Canonical and `og:url` are `SITE_URL` + path, computed, never hand-written.
- The homepage `<head>` and its existing build checks in `vite.config.js` stay unchanged.
- Lighthouse mobile accessibility, best practices and SEO stay at 100 on `/` and reach 100 on both new pages.
- Content modules imported by Node (`vite.config.js`, `scripts/`) must stay JSX-free and use `.js` extensions in their imports.
- Code comments follow the repo's style: explain *why*, in full sentences.

Spec amendments made while planning (apply in Task 7's commit):
- The Contact island takes an `index` prop, serialised into a `data-props` attribute so hydration matches the server render (otherwise a service page shows the homepage's "( 10 )").
- `sitemap.xml` omits `lastmod`, `changefreq` and `priority`: a build-date `lastmod` changes on every deploy and teaches Google to ignore it, and Google ignores the other two.

## File Structure

| File | Status | Responsibility |
|---|---|---|
| `scripts/lib/pages.js` | Create | Pure HTML helpers: `injectMarkup`, `rewriteHead`, `assertPage`, `buildSitemap` |
| `scripts/lib/pages.test.js` | Create | Unit tests for the helpers |
| `scripts/lib/routes.test.js` | Create | Unit tests for the route table and service content |
| `src/content/site.js` | Modify | Export price numbers, `CURRENCY_CODE`, `PRICE_MOVERS` |
| `src/content/faqs.js` | Modify | Add `id` to each entry; export `faqById` |
| `src/content/process.js` | Create | The four process steps (moved from `Process.jsx`) |
| `src/content/proof.js` | Create | Proof items (moved from `Proof.jsx`), split into product and site groups |
| `src/content/services.js` | Create | Service page copy and facts |
| `src/content/routes.js` | Create | Route table, `absoluteUrl`, `findRoute`, `servicePath`, per-route JSON-LD |
| `src/lib/sections.js` | Modify | Add `SERVICE_SECTION_ORDER` and `serviceSectionIndex` |
| `src/components/Process.jsx` | Modify | Read steps from content; export `Step` |
| `src/components/Proof.jsx` | Modify | Read items from content; export `ProofItem` |
| `src/components/Faq.jsx` | Modify | Export `FaqRow` |
| `src/components/Pricing.jsx` | Modify | Use `PRICE_MOVERS` |
| `src/components/Contact.jsx` | Modify | Take `index` prop |
| `src/components/Header.jsx` | Modify | Links become `/#section`, logo links to `/` |
| `src/components/Services.jsx` | Modify | Each card links to its service page |
| `src/pages/Home.jsx` | Create | The homepage sections (moved from `App.jsx`) |
| `src/pages/ServicePage.jsx` | Create | One service page, rendered from `services.js` |
| `src/App.jsx` | Modify | Pick the page from `path`; pass Contact its props |
| `src/entry-server.jsx` | Modify | `render(path)` |
| `src/hydrate.jsx` | Modify | Hydrate islands with `data-props`; dev render by pathname |
| `src/index.css` | Modify | Breadcrumb, facts strip, service hero, card link |
| `scripts/prerender.js` | Rewrite | Loop the route table; write pages and `sitemap.xml` |
| `vite.config.js` | Modify | `{{PAGES}}` placeholder for `llms.txt` |
| `src/content/llms.txt` | Modify | Add `{{PAGES}}`; bump "Last updated" |
| `public/sitemap.xml` | Delete | Now generated |
| `package.json` | Modify | `"test"` script |

---

### Task 1: HTML helpers with tests

**Files:**
- Create: `scripts/lib/pages.js`
- Create: `scripts/lib/pages.test.js`
- Modify: `package.json` (scripts)

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `injectMarkup(template: string, markup: string): string`: puts `markup` into the empty `<div id="root"></div>`, wraps each `mailto:` link in `<!--email_off-->`; throws if markup < 1000 chars, root missing, or mailto count ≠ 2.
  - `rewriteHead(html: string, { url, title, description, jsonLd }): string`: replaces title, description, canonical, og:url/title/description, twitter:title/description; removes the hero image preload and every JSON-LD script; inserts `jsonLd` before `</head>`. Throws if any target is not found exactly once.
  - `assertPage(html: string, url: string): void`: throws unless exactly one `<h1>` (comments ignored) and exactly one canonical equal to `url`.
  - `buildSitemap(urls: string[]): string`

- [ ] **Step 1: Write the failing tests**

`scripts/lib/pages.test.js`:

```js
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
```

Add to `package.json` `"scripts"`:

```json
"test": "node --test \"scripts/**/*.test.js\"",
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL, `Cannot find module '.../scripts/lib/pages.js'`.

- [ ] **Step 3: Implement `scripts/lib/pages.js`**

```js
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

export function rewriteHead(html, { url, title, description, jsonLd }) {
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
  for (const [pattern, replacement, label] of fields) html = replaceOnce(html, pattern, replacement, label)

  // The homepage graph (Person, FAQPage, products) describes the homepage. Each route brings its own.
  if (!(html.match(JSON_LD) || []).length) throw new Error('[prerender] expected JSON-LD in the template, found none')
  html = html.replace(JSON_LD, '')
  // "<" escaped so a string in the data can never close the <script> element early.
  const json = JSON.stringify(jsonLd).replace(/</g, '\\u003c')
  return replaceOnce(html, /<\/head>/, `<script type="application/ld+json">${json}</script>\n</head>`, '</head>')
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
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 8 tests, 0 failures.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/pages.js scripts/lib/pages.test.js package.json
git commit -m "feat: add tested HTML helpers for multi-page prerendering"
```

---

### Task 2: Shared content modules and the route table

**Files:**
- Modify: `src/content/site.js`
- Modify: `src/content/faqs.js`
- Create: `src/content/process.js`
- Create: `src/content/proof.js`
- Create: `src/content/services.js`
- Create: `src/content/routes.js`
- Create: `scripts/lib/routes.test.js`
- Modify: `src/components/Process.jsx`, `src/components/Proof.jsx`, `src/components/Faq.jsx`, `src/components/Pricing.jsx`

**Interfaces:**
- Consumes: nothing from Task 1.
- Produces:
  - `site.js`: `PRICE_SITE_FROM: number` (3000), `PRICE_SAAS_FROM: number` (12000), `CURRENCY_CODE: 'EUR'`, `PRICE_MOVERS: string`.
  - `faqs.js`: each entry gains `id: string`; `faqById(id: string): { id, q, a }` (throws on unknown id).
  - `process.js`: `steps: { title, meta, desc }[]`.
  - `proof.js`: `productProof`, `siteProof`, `proofItems`: arrays of `{ title, body, link: { label, href } | null }`.
  - `services.js`: `services: Service[]`, `findService(slug): Service`. `Service` = `{ slug, name, summary, title, description, serviceType, priceFrom, priceLabel, weeks, h1, h1Em, lead, framing, included: { title, lines: string[] }[], proof: 'site' | 'products', proofTitle, proofTitleEm, proofLead, faqIds: string[] }`.
  - `routes.js`: `routes: Route[]`, `absoluteUrl(path): string`, `findRoute(path): Route` (throws on unknown), `servicePath(slug): string`. `Route` = `{ path, kind: 'home' }` or `{ path, kind: 'service', slug, name, summary, title, description, jsonLd }`.
  - Components: `Step` (named export of `Process.jsx`, props `{ s, i }`), `ProofItem` (named export of `Proof.jsx`, props `{ it, i, wide }`), `FaqRow` (named export of `Faq.jsx`, props `{ f }`).

- [ ] **Step 1: Write the failing tests**

`scripts/lib/routes.test.js`:

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { routes, absoluteUrl, findRoute, servicePath } from '../../src/content/routes.js'
import { services } from '../../src/content/services.js'
import { faqById } from '../../src/content/faqs.js'

test('the homepage is the first route and paths are unique', () => {
  assert.equal(routes[0].path, '/')
  assert.equal(new Set(routes.map(r => r.path)).size, routes.length)
})

test('service paths have no trailing slash', () => {
  for (const r of routes.filter(r => r.kind === 'service')) assert.match(r.path, /^\/services\/[a-z0-9-]+$/)
})

test('titles fit in 60 characters and descriptions in 160', () => {
  for (const r of routes.filter(r => r.kind === 'service')) {
    assert.ok(r.title.length <= 60, `${r.path} title is ${r.title.length} chars`)
    assert.ok(r.description.length <= 160, `${r.path} description is ${r.description.length} chars`)
  }
})

test('absoluteUrl joins paths onto SITE_URL', () => {
  assert.equal(absoluteUrl('/'), 'https://ahmedchioua.com/')
  assert.equal(absoluteUrl('/services/website-development'), 'https://ahmedchioua.com/services/website-development')
})

test('findRoute and servicePath throw on an unknown page', () => {
  assert.throws(() => findRoute('/nope'), /no page at \/nope/)
  assert.throws(() => servicePath('nope'), /no page at/)
  assert.equal(servicePath('website-development'), '/services/website-development')
})

test('every FAQ id a service page asks for exists', () => {
  for (const s of services) for (const id of s.faqIds) assert.doesNotThrow(() => faqById(id), `${s.slug}: ${id}`)
})

test('service JSON-LD carries the price floor and a breadcrumb ending at the page', () => {
  for (const r of routes.filter(r => r.kind === 'service')) {
    const [service, crumbs] = r.jsonLd['@graph']
    assert.equal(service['@type'], 'Service')
    assert.equal(service.url, absoluteUrl(r.path))
    assert.equal(service.offers.priceCurrency, 'EUR')
    assert.equal(typeof service.offers.price, 'number')
    const last = crumbs.itemListElement.at(-1)
    assert.equal(last.item, absoluteUrl(r.path))
    assert.equal(last.position, crumbs.itemListElement.length)
  }
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL, `Cannot find module '.../src/content/routes.js'`.

- [ ] **Step 3: Export price numbers and `PRICE_MOVERS` from `src/content/site.js`**

Replace:

```js
const CURRENCY = '€'
const PRICE_SITE_FROM = 3000
const PRICE_SAAS_FROM = 12000
```

with:

```js
const CURRENCY = '€'
// ISO 4217 code for the same currency, for structured data (Offer.priceCurrency).
export const CURRENCY_CODE = 'EUR'
export const PRICE_SITE_FROM = 3000
export const PRICE_SAAS_FROM = 12000
```

Append after the `PRICE_SAAS_LABEL` export:

```js
/**
 * What makes a quote land above the floor. Shown under the price band on the homepage and on
 * each service page, so the two can't drift into different answers.
 */
export const PRICE_MOVERS =
  'What moves the number: how much of it is new rather than adapted, and whether auth, payments or third-party integrations are in scope.'
```

In `src/components/Pricing.jsx`, add `PRICE_MOVERS` to the `../content/site` import and replace the `<p className="ed-price-note">…</p>` element with:

```jsx
    <p className="ed-price-note">{PRICE_MOVERS}</p>
```

- [ ] **Step 4: Add ids to `src/content/faqs.js`**

Add an `id` as the first key of each entry, in order: `'what'`, `'speed'`, `'ai-quality'`, `'client-work'`, `'cost'`, `'founding'`, `'slip'`, `'after'`, `'ownership'`, `'existing-code'`, `'location'`. Example for the first entry:

```js
  {
    id: 'what',
    q: 'What exactly do you build?',
```

Append at the end of the file:

```js
/** One entry by id. The service pages pick their FAQ subset this way; an unknown id fails the build. */
export function faqById(id) {
  const f = faqs.find(f => f.id === id)
  if (!f) throw new Error(`faqs: no entry with id "${id}"`)
  return f
}
```

Update the header comment's consumer list with:

```js
 *   - src/pages/ServicePage.jsx — renders a per-service subset, picked by id
```

- [ ] **Step 5: Move the process steps to `src/content/process.js`**

```js
/**
 * The four steps every project runs. Rendered by the homepage Process section and by each
 * service page, so the description of how the work goes can't drift between them.
 */
import { FIRST_LINK_DAYS, LAUNCH_COVER_DAYS } from './site.js'

export const steps = [
  {
    title: 'Scope',
    meta: 'Free · 1 week',
    desc: 'A 30-minute call, then a written scope: what gets built, what doesn’t, what it costs, and the date it goes live. If I’m not the right person for it, I’ll say so here. That’s why it’s free.',
  },
  {
    title: 'Build',
    meta: `Day ${FIRST_LINK_DAYS}: a link · then weekly`,
    desc: `Day ${FIRST_LINK_DAYS}, you get a URL. It’s rough. It’s real. You click through the core flow, react, and we adjust while changes are still cheap. Every week after: a demo, an updated link, a direct line to me. AI in the loop is why the timeline is weeks, not months. The weekly architecture review is why it holds.`,
  },
  {
    title: 'Ship',
    meta: 'On the date in your scope',
    desc: 'Live on your infrastructure, your domain, your accounts. Performance, accessibility and SEO verified before it goes out, and you see the numbers. If I miss the date in your scope, I keep building until it ships, and the overrun is on me.',
  },
  {
    title: 'Hand over',
    meta: `Included · ${LAUNCH_COVER_DAYS} days of cover`,
    desc: `The repo, the pipeline, the documentation, a walkthrough, and ${LAUNCH_COVER_DAYS} days of post-launch fixes. Any developer can pick it up after me. If you’d rather I kept going, we scope that separately.`,
  },
]
```

In `src/components/Process.jsx`: delete the local `steps` array, change the site import to `import { FIRST_LINK_DAYS } from '../content/site'`, add `import { steps } from '../content/process'`, and change `const Step = ({ s, i }) => {` to `export const Step = ({ s, i }) => {`.

- [ ] **Step 6: Move the proof items to `src/content/proof.js`**

```js
/**
 * The verifiable things the site points to instead of client logos. The homepage Proof section
 * shows all of them; each service page shows the group that fits it (products for SaaS, this
 * site and its source for websites).
 */
import { products } from './products.js'

const REPO = 'https://github.com/r0b0t007/ahmed-portfolio'
const LINKEDIN = 'https://linkedin.com/in/ahmedchioua'

export const productProof = products.map(p => ({ title: p.name, body: p.card, link: { label: p.label, href: p.url } }))

export const siteProof = [
  {
    title: 'This site',
    body: 'Designed, built and deployed by me, in React with hand-written CSS. No template, no page builder. It scores 100 / 100 / 100 on Lighthouse for accessibility, best practices and SEO. Run it yourself if you want to check.',
    link: null,
  },
  {
    title: 'The source',
    body: 'The whole repository is public: the code, the structured data, the build config and every commit since the first one. It answers the question of how I work better than anything I could write here.',
    link: { label: 'github.com/r0b0t007', href: REPO },
  },
]

const trackRecord = {
  title: 'The track record',
  body: 'Nine years of production software for Bell, BMW and Bayer, delivered through NTT DATA and a consulting engagement. It’s all on LinkedIn, with the certifications alongside it.',
  link: { label: 'linkedin.com/in/ahmedchioua', href: LINKEDIN },
}

export const proofItems = [...productProof, ...siteProof, trackRecord]
```

In `src/components/Proof.jsx`: delete `REPO`, `LINKEDIN`, the `products` import and the local `items` array; add `import { proofItems as items } from '../content/proof'`; change `const Item = ({ it, i, wide }) => {` to `export const ProofItem = ({ it, i, wide }) => {` and update its one use in `Proof` from `<Item` to `<ProofItem`.

In `src/components/Faq.jsx`: change `const Row = ({ f }) => {` to `export const FaqRow = ({ f }) => {` and its use from `<Row` to `<FaqRow`.

- [ ] **Step 7: Create `src/content/services.js`**

```js
/**
 * Copy and facts for the service pages (src/pages/ServicePage.jsx). Every number comes from
 * site.js. The prose marked NEW below was drafted for these pages and is awaiting Ahmed's review;
 * everything else restates copy already published on the homepage.
 *
 * Also read by src/content/routes.js (titles, descriptions, structured data) and, through it,
 * by vite.config.js (llms.txt) and scripts/prerender.js. Keep it JSX-free.
 */
import {
  FIRST_LINK_DAYS, LAUNCH_COVER_DAYS, PRICE_SAAS_FROM, PRICE_SAAS_LABEL, PRICE_SITE_FROM,
  PRICE_SITE_LABEL,
} from './site.js'

const handOff = {
  title: 'Hand-off',
  lines: [`The repo in your name, documentation, a recorded walkthrough, and ${LAUNCH_COVER_DAYS} days of post-launch fixes.`],
}

export const services = [
  {
    slug: 'website-development',
    name: 'Website development',
    summary: `marketing sites and landing pages from ${PRICE_SITE_LABEL}, usually live in 2 to 3 weeks`,
    title: 'Website Development, Fixed Price | Ahmed Chioua',
    description: `Marketing sites and landing pages from ${PRICE_SITE_LABEL}, usually live in 2 to 3 weeks. A working link in ${FIRST_LINK_DAYS} days, a fixed price and a date in writing.`,
    serviceType: 'Website Design & Development',
    priceFrom: PRICE_SITE_FROM,
    priceLabel: PRICE_SITE_LABEL,
    weeks: '2–3',
    // NEW
    h1: 'Website development,',
    h1Em: 'fixed price, date in writing.',
    // NEW
    lead: `Marketing sites, landing pages and portfolios, designed and built from scratch. A working link in ${FIRST_LINK_DAYS} days, the site live on your own domain usually 2 to 3 weeks after kickoff, and a price fixed in writing before any of it starts.`,
    // NEW
    framing: 'A website earns its place two ways: search engines can find it, and the people who land on it can do what it was built for. Both are settled while it’s being built, so structured data, clean semantics and Core Web Vitals are part of the build, not a cleanup pass after launch.',
    included: [
      { title: 'Designed and built from scratch', lines: ['A marketing site, landing page or portfolio, designed around your offer. No template, no page builder.'] },
      { title: 'An SEO foundation', lines: ['Structured data, clean semantics, proper meta tags and a sitemap, all in during the build.'] },
      { title: 'Core Web Vitals, measured', lines: ['Performance, accessibility and SEO verified before launch, and you see the numbers.'] },
      { title: 'Analytics before launch', lines: ['Wired in before the site goes live, not after, so the first visitors are counted.'] },
      { title: 'Your domain, your accounts', lines: ['Hosting, domain and deploy pipeline set up on accounts you control. Push code, it ships.'] },
      handOff,
    ],
    proof: 'site',
    proofTitle: 'Don’t take my word for it.',
    proofTitleEm: 'Check this page.',
    // NEW
    proofLead: 'The page you’re reading was built the way your site would be. Run Lighthouse on it, or read the source.',
    faqIds: ['speed', 'cost', 'ai-quality', 'ownership', 'after'],
  },
  {
    slug: 'saas-mvp-development',
    name: 'SaaS & MVP development',
    summary: `SaaS products and MVPs from ${PRICE_SAAS_LABEL}, usually live in 4 to 6 weeks`,
    title: 'SaaS & MVP Development, Fixed Price | Ahmed Chioua',
    description: `SaaS products and MVPs from ${PRICE_SAAS_LABEL}, usually live in 4 to 6 weeks. A working link in ${FIRST_LINK_DAYS} days, a fixed price and a date in writing.`,
    serviceType: 'SaaS & MVP Development',
    priceFrom: PRICE_SAAS_FROM,
    priceLabel: PRICE_SAAS_LABEL,
    weeks: '4–6',
    // NEW
    h1: 'SaaS and MVP development,',
    h1Em: 'fixed price, date in writing.',
    // NEW
    lead: `From an idea to a product people can sign into. A working link in ${FIRST_LINK_DAYS} days, a demo every week after, and the product live on your own infrastructure usually 4 to 6 weeks after kickoff, at a price fixed in writing before any of it starts.`,
    // NEW
    framing: 'A first version has one job: prove that people want it. So the scope starts from the smallest version that can prove it, and everything else waits. The foundations don’t wait. Auth, the data model and the deploy pipeline are built to take growth, so the month it starts working isn’t the month you rebuild them.',
    included: [
      { title: 'A scope that fits on a page', lines: ['The smallest version that proves the idea: what’s in, what’s out, the price and the launch date, in writing.'] },
      { title: 'Auth and a data model', lines: ['Sign-in, accounts and a data model designed to hold up once real users arrive.'] },
      { title: 'The core flows', lines: ['The screens and actions the product exists for, built end to end and demoed every week.'] },
      { title: 'Payments, if you need them', lines: ['Set up on your own payment account, so the revenue is yours from the first charge.'] },
      { title: 'Infrastructure on your accounts', lines: ['Hosting, database and auth on accounts you control (Vercel, AWS, Supabase, Cloudflare), with a deploy pipeline: push code, it ships.'] },
      handOff,
    ],
    proof: 'products',
    proofTitle: 'Products I build',
    proofTitleEm: 'and run.',
    proofLead: 'I won’t show you client logos I haven’t earned. These are two products of mine that real people use right now.',
    faqIds: ['speed', 'cost', 'slip', 'ownership', 'founding'],
  },
]

export function findService(slug) {
  const s = services.find(s => s.slug === slug)
  if (!s) throw new Error(`services: no service with slug "${slug}"`)
  return s
}
```

- [ ] **Step 8: Create `src/content/routes.js`**

```js
/**
 * Every page the build emits, in one list. Read by:
 *   - src/App.jsx and src/entry-server.jsx — which page to render for a path
 *   - scripts/prerender.js                 — one HTML file per route, plus sitemap.xml
 *   - vite.config.js                       — the page list in llms.txt
 *
 * The homepage's head is the hand-written one in index.html. Every other route's head is derived
 * here: canonical and og:url come from the path, so no page can carry another page's URL.
 * Keep this file JSX-free; Node imports it directly.
 */
import { CURRENCY_CODE, PERSON_ID, SITE_URL } from './site.js'
import { services } from './services.js'

export const absoluteUrl = path => new URL(path, SITE_URL).href

// A self-contained stub of the homepage Person node: structured data is read per page, so the
// provider must resolve here, not only through an @id defined on another URL.
const PROVIDER = { '@type': 'Person', '@id': PERSON_ID, name: 'Ahmed Chioua', url: SITE_URL }

const serviceJsonLd = (s, url) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: s.name,
      serviceType: s.serviceType,
      description: s.description,
      url,
      provider: PROVIDER,
      areaServed: [
        { '@type': 'Country', name: 'Morocco' },
        { '@type': 'Place', name: 'Remote, worldwide' },
      ],
      offers: {
        '@type': 'Offer',
        url,
        price: s.priceFrom,
        priceCurrency: CURRENCY_CODE,
        // The published figure is a floor, not a fixed price; minPrice says so.
        priceSpecification: { '@type': 'PriceSpecification', minPrice: s.priceFrom, priceCurrency: CURRENCY_CODE },
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}#services` },
        { '@type': 'ListItem', position: 3, name: s.name, item: url },
      ],
    },
  ],
})

export const routes = [
  { path: '/', kind: 'home' },
  ...services.map(s => {
    const path = `/services/${s.slug}`
    return {
      path,
      kind: 'service',
      slug: s.slug,
      name: s.name,
      summary: s.summary,
      title: s.title,
      description: s.description,
      jsonLd: serviceJsonLd(s, absoluteUrl(path)),
    }
  }),
]

export function findRoute(path) {
  const route = routes.find(r => r.path === path)
  if (!route) throw new Error(`routes: no page at ${path}`)
  return route
}

export const servicePath = slug => findRoute(`/services/${slug}`).path
```

- [ ] **Step 9: Run the tests and the build**

Run: `npm test`
Expected: PASS, 15 tests (8 from Task 1, 7 new), 0 failures.

Run: `npm run build && npm run lint`
Expected: build succeeds with `[prerender] injected …`; lint prints no errors. The homepage renders exactly as before (moved content only).

- [ ] **Step 10: Commit**

```bash
git add src/content scripts/lib/routes.test.js src/components/Process.jsx src/components/Proof.jsx src/components/Faq.jsx src/components/Pricing.jsx
git commit -m "feat: add the route table and service page content"
```

---

### Task 3: Render pages by path

**Files:**
- Create: `src/pages/Home.jsx`
- Create: `src/pages/ServicePage.jsx`
- Modify: `src/App.jsx`, `src/entry-server.jsx`, `src/hydrate.jsx`, `src/lib/sections.js`
- Modify: `src/components/Contact.jsx`, `src/components/Header.jsx`, `src/components/Services.jsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `findRoute`, `servicePath` (routes.js); `findService` (services.js); `faqById` (faqs.js); `productProof`, `siteProof` (proof.js); `steps` (process.js); `Step`, `ProofItem`, `FaqRow`, `BenefitCard` components; `PRICE_MOVERS`, `BOOKING_URL`, `CTA_LABEL_LONG`, `FIRST_LINK_DAYS`, `LAUNCH_COVER_DAYS` (site.js).
- Produces:
  - `App({ path = '/' })`
  - `render(path: string): string` from `src/entry-server.jsx`
  - `serviceSectionIndex(id: string): string` from `src/lib/sections.js`
  - `Contact({ index: string })`
  - Island wrapper attribute `data-props` (JSON) on `#island-contact`

- [ ] **Step 1: Add the service section order to `src/lib/sections.js`**

Replace the `sectionIndex` export with:

```js
const indexIn = (order, name) => id => {
  const i = order.indexOf(id)
  if (i < 0) throw new Error(`${name}: "${id}" is not in the section order`)
  return ordinal(i, 2)
}

export const sectionIndex = indexIn(SECTION_ORDER, 'sectionIndex')

/** The numbered sections of a service page (src/pages/ServicePage.jsx), in render order. */
export const SERVICE_SECTION_ORDER = ['included', 'weeks', 'price', 'proof', 'faq', 'contact']

export const serviceSectionIndex = indexIn(SERVICE_SECTION_ORDER, 'serviceSectionIndex')
```

- [ ] **Step 2: Move the homepage sections to `src/pages/Home.jsx`**

```jsx
import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import Benefits from '../components/Benefits'
import Services from '../components/Services'
import Process from '../components/Process'
import Handoff from '../components/Handoff'
import Proof from '../components/Proof'
import Pricing from '../components/Pricing'
import Experience from '../components/Experience'
import About from '../components/Summary'
import Faq from '../components/Faq'

// Section order is also declared in src/lib/sections.js, which numbers the eyebrows; keep both in step.
// Contact closes the page but is rendered by App.jsx, inside its hydration island.
const Home = () => (
  <>
    <Hero />
    <TrustStrip />
    <Benefits />
    <Services />
    <Process />
    <Handoff />
    <Proof />
    <Pricing />
    <Experience />
    <About />
    <Faq />
  </>
)

export default Home
```

- [ ] **Step 3: Create `src/pages/ServicePage.jsx`**

```jsx
import { BenefitCard } from '../components/BenefitCard'
import { Step } from '../components/Process'
import { ProofItem } from '../components/Proof'
import { FaqRow } from '../components/Faq'
import { findService } from '../content/services'
import { faqById } from '../content/faqs'
import { steps } from '../content/process'
import { productProof, siteProof } from '../content/proof'
import {
  BOOKING_URL, CTA_LABEL_LONG, FIRST_LINK_DAYS, LAUNCH_COVER_DAYS, PRICE_MOVERS,
} from '../content/site'
import { serviceSectionIndex as idx } from '../lib/sections'

const PROOF = { site: siteProof, products: productProof }

const Eyebrow = ({ label, id }) => (
  <div className="eyebrow-row">
    <span className="eyebrow">{label}</span>
    <span className="eyebrow-index">( {idx(id)} )</span>
  </div>
)

/**
 * One service, end to end: what it is, what's in it, how the weeks go, what it costs, what to
 * check, and the questions buyers ask. All copy comes from src/content; this file only lays it
 * out with the homepage's classes, so the page reads as part of the same site.
 */
const ServicePage = ({ slug }) => {
  const s = findService(slug)
  const facts = [
    { n: s.priceLabel, l: 'Starting price, fixed per project in writing' },
    { n: s.weeks, l: 'Weeks, usually, from kickoff to launch' },
    { n: String(FIRST_LINK_DAYS), l: 'Days to your first working link' },
    { n: String(LAUNCH_COVER_DAYS), l: 'Days of post-launch fixes, included' },
  ]
  const proof = PROOF[s.proof]

  return (
    <>
      <section id="hero" className="section svc-hero">
        <nav aria-label="Breadcrumb" className="crumbs">
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/#services">Services</a></li>
            <li aria-current="page">{s.name}</li>
          </ol>
        </nav>
        <h1 className="ed-h1">{s.h1} <em>{s.h1Em}</em></h1>
        <p className="ed-lead">{s.lead}</p>
        <div className="ed-cta-row">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">{CTA_LABEL_LONG}</a>
          <a href="#price" className="link-teal">See the price →</a>
        </div>
        {/* A <dl>: each figure is the value of the label above it. dt comes first in the DOM, as
            the element requires; CSS lifts the figure visually (order: -1 on dd). */}
        <dl className="svc-facts">
          {facts.map(f => (
            <div key={f.l}>
              <dt>{f.l}</dt>
              <dd>{f.n}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="included" className="section">
        <div className="eyebrow-block">
          <Eyebrow label="What you get" id="included" />
          <h2 className="sec-title">Everything it takes <em>to go live.</em></h2>
          <p className="sec-lead">{s.framing}</p>
        </div>
        <div className="hair-grid ed-ben-grid">
          {s.included.map((b, i) => <BenefitCard key={b.title} b={b} i={i} />)}
        </div>
      </section>

      <section id="weeks" className="section">
        <div className="eyebrow-block">
          <Eyebrow label="How the weeks run" id="weeks" />
          <h2 className="sec-title">Usually live in {s.weeks} weeks. <em>A link on day {FIRST_LINK_DAYS}.</em></h2>
          <p className="sec-lead">The same four steps as every project, and you can see it running from the first one.</p>
        </div>
        <div className="ed-steps">
          {steps.map((st, i) => <Step key={st.title} s={st} i={i} />)}
        </div>
      </section>

      <section id="price" className="section">
        <div className="eyebrow-block">
          <Eyebrow label="Price" id="price" />
          <h2 className="sec-title">From {s.priceLabel}. <em>Quoted once.</em></h2>
          <p className="sec-lead">
            {s.priceLabel} is the starting point. Your number is fixed once, in the free scope call,
            in writing, with a date attached, and it doesn&rsquo;t move after that. It covers the
            build, the infrastructure, the hand-off and {LAUNCH_COVER_DAYS} days of launch
            insurance. No hourly meter.
          </p>
        </div>
        <p className="ed-price-note">{PRICE_MOVERS}</p>
        <div className="ed-cta-row svc-price-cta">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">Lock in a price and a date</a>
        </div>
      </section>

      <section id="proof" className="section">
        <div className="eyebrow-block">
          <Eyebrow label="Proof" id="proof" />
          <h2 className="sec-title">{s.proofTitle} <em>{s.proofTitleEm}</em></h2>
          <p className="sec-lead">{s.proofLead}</p>
        </div>
        <div className="hair-grid ed-proof-grid">
          {proof.map((it, i) => <ProofItem key={it.title} it={it} i={i} wide={false} />)}
        </div>
      </section>

      <section id="faq" className="section">
        <div className="eyebrow-block">
          <Eyebrow label="Questions" id="faq" />
          <h2 className="sec-title">Straight <em>answers</em></h2>
        </div>
        <div className="ed-faq-grid">
          {s.faqIds.map(faqById).map(f => <FaqRow key={f.id} f={f} />)}
        </div>
      </section>
    </>
  )
}

export default ServicePage
```

- [ ] **Step 4: Rewrite `src/App.jsx`**

```jsx
import Header from './components/Header'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import { findRoute } from './content/routes'
import { sectionIndex, serviceSectionIndex } from './lib/sections'

/**
 * Each page is rendered once, at build time, into static HTML (scripts/prerender.js renders one
 * per route in src/content/routes.js). In the browser only two "islands" hydrate — Header (menu,
 * scroll state) and Contact (the form); see src/main.jsx. Everything else has no interactivity
 * and stays as prerendered markup, so those components never ship in the client bundle. The
 * island wrappers use display: contents so they add no box (the header must stay
 * position: sticky against <body>).
 *
 * Contact's props differ per page (its eyebrow index), so they are serialised into data-props:
 * src/hydrate.jsx reads them back, and the client render matches the server's.
 *
 * React.lazy is not an option here: it suspends during renderToString.
 */
import { ISLAND } from './islands'

function App({ path = '/' }) {
  const route = findRoute(path)
  const contactProps = { index: route.kind === 'home' ? sectionIndex('contact') : serviceSectionIndex('contact') }
  return (
    <div className="app">
      <div id={ISLAND.header} style={{ display: 'contents' }}><Header /></div>
      <main>
        {route.kind === 'home' ? <Home /> : <ServicePage slug={route.slug} />}
        <div id={ISLAND.contact} data-props={JSON.stringify(contactProps)} style={{ display: 'contents' }}>
          <Contact {...contactProps} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
```

- [ ] **Step 5: Render by path in `src/entry-server.jsx`**

Change the signature and render call:

```jsx
export function render(path) {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>
  )
}
```

Add to its comment: `path` is a route from src/content/routes.js; an unknown path throws, so a typo fails the build.

- [ ] **Step 6: Hydrate islands with their props in `src/hydrate.jsx`**

Replace `hydrateIslands` and `renderDev` with:

```jsx
export function hydrateIslands() {
  for (const [id, Component] of islands) {
    const el = document.getElementById(id)
    if (!el) {
      console.error(`[islands] missing #${id} — App.jsx and islands.js out of sync`)
      continue
    }
    // The props the server rendered this island with (App.jsx serialises them), so the client
    // tree matches the prerendered markup.
    const props = el.dataset.props ? JSON.parse(el.dataset.props) : {}
    hydrateRoot(el, <StrictMode><Component {...props} /></StrictMode>)
  }
}

// Dev server only: no prerendered markup, so render the whole page for the current URL. main.jsx
// guards the call with import.meta.env.DEV; the App chunk is tree-shaken out of production.
export async function renderDev() {
  const { default: App } = await import('./App.jsx')
  createRoot(document.getElementById('root')).render(<StrictMode><App path={location.pathname} /></StrictMode>)
}
```

- [ ] **Step 7: Take the index as a prop in `src/components/Contact.jsx`**

Delete `import { sectionIndex } from '../lib/sections'`. Change `const Contact = () => {` to `const Contact = ({ index }) => {` and `( {sectionIndex('contact')} )` to `( {index} )`.

- [ ] **Step 8: Make Header links work from any page (`src/components/Header.jsx`)**

Change every `href: '#…'` in `navLinks` to `href: '/#…'` (`'/#services'`, `'/#process'`, `'/#proof'`, `'/#pricing'`, `'/#about'`, `'/#faq'`, `'/#contact'`), and the logo to `<a href="/" className="ed-logo">Ahmed Chioua</a>`. Add above `navLinks`:

```js
// Root-relative: on "/" they scroll in place, and from a service page they lead back to the
// homepage section. Header hydrates without props, so the links can't depend on the path.
```

- [ ] **Step 9: Link each homepage Services card to its page (`src/components/Services.jsx`)**

Add `slug: 'website-development',` to the first entry of `services` and `slug: 'saas-mvp-development',` to the second. Add imports:

```js
import { servicePath } from '../content/routes'
import { findService } from '../content/services'
```

In `ServiceCard`, after the `ed-svc-tags` div, add:

```jsx
      <a href={servicePath(s.slug)} className="link-teal ed-svc-more">{findService(s.slug).name} in detail →</a>
```

- [ ] **Step 10: Add the service page styles to `src/index.css`**

Append:

```css
/* ── Service pages (src/pages/ServicePage.jsx) ── */
.svc-hero { padding-top: 56px; }
.svc-hero .ed-lead { max-width: 60ch; }
.crumbs ol {
  display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 10px; list-style: none; margin-bottom: 40px;
  font-family: var(--mono); font-size: 0.72rem; letter-spacing: 0.06em; color: var(--ink-muted);
}
.crumbs li + li::before { content: '/'; margin-right: 10px; }
/* Padding brings the tap target to ~25px tall without moving the text. */
.crumbs a { display: inline-block; padding: 4px 0; color: var(--teal); }
.crumbs a:hover { color: var(--ink); }
.svc-facts {
  display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px 32px;
  max-width: 880px; margin-top: 56px; padding-top: 26px; border-top: 1px solid var(--hair);
}
.svc-facts > div { display: flex; flex-direction: column; gap: 6px; }
.svc-facts dd { order: -1; font-family: var(--serif); font-size: 1.9rem; font-weight: 300; line-height: 1; }
.svc-facts dt { font-size: 0.75rem; color: var(--ink-muted); line-height: 1.5; }
.svc-price-cta { margin-top: 32px; }
.ed-svc-more { display: inline-block; margin-top: 22px; }
@media (max-width: 720px) { .svc-facts { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
```

- [ ] **Step 11: Check the dev server renders both page types**

Run: `npm run dev` (background), then open `http://localhost:5173/` and `http://localhost:5173/services/website-development` in the browser (chrome-devtools MCP `navigate_page` + `take_snapshot`).
Expected: the homepage is unchanged apart from the two "in detail →" links; the service page shows breadcrumb, H1, facts, six sections and the Contact section labelled "( 06 )". No console errors. Stop the dev server afterwards.

- [ ] **Step 12: Run tests, build and lint**

Run: `npm test && npm run build && npm run lint`
Expected: tests pass; build succeeds (prerender still writes only the homepage at this point); lint clean.

- [ ] **Step 13: Commit**

```bash
git add src
git commit -m "feat: render the homepage and service pages from the route table"
```

---

### Task 4: Prerender every route and generate the sitemap

**Files:**
- Rewrite: `scripts/prerender.js`
- Delete: `public/sitemap.xml`
- Modify: `vite.config.js`, `src/content/llms.txt`

**Interfaces:**
- Consumes: `injectMarkup`, `rewriteHead`, `assertPage`, `buildSitemap` (Task 1); `routes`, `absoluteUrl` (Task 2); `render(path)` (Task 3).
- Produces: `dist/index.html`, `dist/services/website-development.html`, `dist/services/saas-mvp-development.html`, `dist/sitemap.xml`, `{{PAGES}}` in `llms.txt`.

- [ ] **Step 1: Rewrite `scripts/prerender.js`**

```js
/**
 * Prerenders every route in src/content/routes.js into dist/.
 *
 * Runs after both Vite builds (see the "build" script in package.json):
 *   1. vite build                          -> dist/          (client bundle + index.html)
 *   2. vite build --ssr src/entry-server   -> dist-ssr/      (server bundle, build-time only)
 *   3. node scripts/prerender.js           -> one HTML file per route, plus sitemap.xml
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
import { injectMarkup, rewriteHead, assertPage, buildSitemap } from './lib/pages.js'

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

try {
  for (const route of routes) {
    const url = absoluteUrl(route.path)
    let html = injectMarkup(template, render(route.path))
    if (route.kind !== 'home') {
      html = rewriteHead(html, { url, title: route.title, description: route.description, jsonLd: route.jsonLd })
    }
    assertPage(html, url)
    const file = dist(outFile(route.path))
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, html)
    console.log(`[prerender] ${route.path} -> dist/${outFile(route.path)} (${(Buffer.byteLength(html) / 1024).toFixed(1)} kB)`)
  }
  writeFileSync(dist('sitemap.xml'), buildSitemap(routes.map(r => absoluteUrl(r.path))))
  console.log(`[prerender] sitemap.xml: ${routes.length} URLs`)
} catch (err) {
  console.error(err.message)
  process.exit(1)
}

// The SSR bundle is a build artefact; it must not be published.
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
```

- [ ] **Step 2: Delete the static sitemap**

Run: `git rm public/sitemap.xml`

- [ ] **Step 3: Add the page list to `llms.txt`**

In `vite.config.js`, add `import { routes, absoluteUrl } from './src/content/routes.js'` and add to `fills`:

```js
    PAGES: () => routes
      .filter(r => r.kind !== 'home')
      .map(r => `- [${r.name}](${absoluteUrl(r.path)}) — ${r.summary}`)
      .join('\n'),
```

In `src/content/llms.txt`, insert a new line `{{PAGES}}` directly after the line beginning `- [Pricing](https://ahmedchioua.com/#pricing)`, and change `> Last updated: 2026-09-12` to `> Last updated: 2026-10-09`.

- [ ] **Step 4: Build and inspect the output**

Run: `npm test && npm run build && npm run lint`
Expected: the prerender log lists three routes and `sitemap.xml: 3 URLs`; lint clean.

Run:

```bash
ls dist/services
grep -o '<title>[^<]*' dist/services/*.html
grep -o 'rel="canonical" href="[^"]*"' dist/index.html dist/services/*.html
grep -c 'as="image"' dist/index.html dist/services/*.html
cat dist/sitemap.xml
grep -A2 'ahmedchioua.com/services' dist/llms.txt | head -6
```

Expected: two `.html` files; titles as in the Global Constraints; each canonical equals its own URL; `as="image"` count 1 for `index.html` and 0 for each service page; the sitemap lists exactly `/`, `/services/website-development` and `/services/saas-mvp-development`; `llms.txt` lists both pages.

- [ ] **Step 5: Prove the build fails on a bad route**

Temporarily change one service `slug` in `src/content/services.js` to `'Website Development'`, run `npm test`, confirm the "no trailing slash" test fails, then revert the change and confirm `npm test` passes.

- [ ] **Step 6: Commit**

```bash
git add scripts/prerender.js vite.config.js src/content/llms.txt
git commit -m "feat: prerender every route and generate the sitemap"
```

---

### Task 5: Verify on the Pages runtime, then open the PR

**Files:**
- Modify: `docs/superpowers/specs/2026-10-09-service-pages-design.md` (record the two amendments)

**Interfaces:**
- Consumes: the built `dist/` from Task 4.
- Produces: a pushed branch and an open PR.

- [ ] **Step 1: Serve `dist/` with wrangler on a free port**

Run (background): `npx -y wrangler@latest pages dev dist --port 8941 --ip 127.0.0.1`
Wait until the log shows `Ready on http://127.0.0.1:8941`. Always use `127.0.0.1`, not `localhost`: another local process can answer on `localhost` for the same port.

- [ ] **Step 2: Check status codes and redirects**

```bash
for p in / /services/website-development /services/saas-mvp-development /services/website-development.html /services/website-development/ /services/nope /sitemap.xml; do
  printf "%-42s " "$p"; curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" "http://127.0.0.1:8941$p"
done
```

Expected: `/` and both service URLs 200; the `.html` and trailing-slash variants 308 to the clean URL; `/services/nope` 404; `/sitemap.xml` 200. If the trailing-slash variant returns 404 instead of redirecting, record it in the PR description; it is not a blocker, because nothing links to it.

- [ ] **Step 3: Check hydration on a service page**

With the chrome-devtools MCP: `navigate_page` to `http://127.0.0.1:8941/services/saas-mvp-development`, `resize_page` to 390×844, `click` the `.ed-burger` button, `take_snapshot`.
Expected: the mobile menu is open and its links point to `/#…`; `list_console_messages` shows no hydration errors. Then click "SaaS & MVP development in detail →" from `/` and confirm it lands on the page.

- [ ] **Step 4: Lighthouse on all three pages**

```bash
for p in / /services/website-development /services/saas-mvp-development; do
  npx -y lighthouse@12 "http://127.0.0.1:8941$p" --only-categories=seo,accessibility,best-practices \
    --form-factor=mobile --screenEmulation.mobile --chrome-flags="--headless=new" \
    --output=json --output-path="$TMPDIR/lh-$(echo $p | tr / _).json" --quiet
done
```

Parse each JSON with `encoding='utf8'` and print the category scores plus any failing audit.
Expected: accessibility, best practices and SEO all `1` on every page. Fix any failure before continuing.

- [ ] **Step 5: Stop the server**

Stop the wrangler processes started in Step 1 (by PID, from `Get-CimInstance Win32_Process` filtered on `port 8941`), then confirm the port is free.

- [ ] **Step 6: Record the spec amendments**

In the spec, under "Rendering", add: "The Contact island takes an `index` prop, serialised into `data-props` on its wrapper and read back by `hydrate.jsx`." Under "Generated files", replace "`lastmod` is the build date." with "No `lastmod`: a build date would change on every deploy."

- [ ] **Step 7: Commit, push and open the PR**

```bash
git add docs/superpowers/specs/2026-10-09-service-pages-design.md docs/superpowers/plans/2026-10-09-service-pages.md
git commit -m "docs: record spec amendments for the service pages"
git push -u origin feat/service-pages
gh pr create --base main --title "feat: add the website and SaaS/MVP service pages" --body-file <body>
```

The PR body must include: what the pages are; the multi-route build; the verification table (status codes, Lighthouse per page); and a **"Copy to review"** list quoting every field marked `// NEW` in `src/content/services.js`, so Ahmed can approve or rewrite each one. End it with the attribution line.
