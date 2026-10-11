# French Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/fr`, `/fr/services/creation-site-web` and `/fr/services/developpement-saas`, linked to their English twins with `hreflang`, with the header and contact islands hydrating in French.

**Architecture:** Interface strings move into `src/content/ui.js`, with a French mirror in `src/content/fr/`. `src/content/locale.js` serves each page's language content through a React context, so one set of components renders both languages. The route table gains `locale`, a twin `key` and computed `alternates`; prerender writes `lang`, `og:locale` and `hreflang` from them. The two islands get `locale` through `data-props` and read only `src/content/i18n.js`, so the client bundle carries no page copy.

**Tech Stack:** React 19, Vite 7, build-time prerender (`scripts/prerender.js`), `node:test`, Cloudflare Pages (`wrangler pages dev`), Lighthouse 12.

Spec: `docs/superpowers/specs/2026-10-10-french-pages-design.md`.

## Global Constraints

- Run tests with `npm test` (it globs `"scripts/**/*.test.js"`); `node --test scripts/` fails on Node 26.
- Content modules under `src/content/` are JSX-free and import each other with explicit `.js` extensions: Node imports them directly in tests and in `vite.config.js`.
- English copy does not change. Built English pages may differ from today's only by the `hreflang` links, the header's language switch (and its wrapper) and the islands' `data-props`.
- Every number comes from `src/content/site.js`. Prices stay in euros; French labels are `3 000 €` (`toLocaleString('fr-FR')`, no-break space before `€`).
- French copy uses *vous* and curly apostrophes (`’`). Type it with ordinary spaces; every French module passes its exports through `typo()` (`src/content/fr/typo.js`), which puts the no-break spaces before `: ; ? !` and inside `« »`.
- French copy states the same facts as the English copy and nothing new. Product facts follow `src/content/products.js`. Never quote user counts. Add no new "open source" claims (translating the existing FitPal card is flagged for Ahmed in the PR).
- The islands (`Header`, `Contact`) import `src/content/i18n.js`, never `src/content/locale.js`.
- All French copy is Ahmed's to approve: the PR lists it beside its English source.
- Local checks use `wrangler pages dev dist --ip 127.0.0.1` on a fresh port, always at `127.0.0.1`, never `localhost`.
- Stage files by explicit path. The working tree has unrelated untracked files (`.impeccable/`, `DESIGN.md`, `PRODUCT.md`, `PROMO.md`, `redesign/…`, a PNG) that must not be committed.
- Every commit message ends with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## File Structure

| File | Responsibility |
|---|---|
| `src/content/fr/typo.js` (new) | French typography: no-break spaces before double punctuation |
| `src/content/site.js` | + `WHATSAPP_URL_FR`, `PRICE_SITE_LABEL_FR`, `PRICE_SAAS_LABEL_FR`, `weeksTextFr` |
| `src/content/ui.js` (new) | English interface strings (nav, crumb, CTAs, service-page labels, contact, footer) |
| `src/content/fr/ui.js` (new) | The same shape, in French |
| `src/content/i18n.js` (new) | `uiFor(locale)`: interface strings only; what the islands import |
| `src/content/locale.js` (new) | `contentFor(locale)`: ui, services, FAQs, steps, proof for one language |
| `src/content/byId.js` (new) | `byId(list, what)`: lookup by id that fails loudly |
| `src/lib/content-context.js` (new) | `LocaleContext`, `useContent()` |
| `src/content/fr/{services,faqs,process,products,proof,home}.js` (new) | French content, mirroring the English modules by id |
| `src/content/services.js` | + `id` on each service |
| `src/content/routes.js` | + `locale`, `key`, `alternates`; French routes; `servicePath(slug, locale)` |
| `scripts/lib/pages.js` | `rewriteHead` gains `lang`, `ogLocale`, `alternates`; new `addAlternates`; 404 label by path |
| `scripts/prerender.js` | passes language and alternates to the head helpers |
| `src/App.jsx` | provides the locale context, picks `HomeFr`, serialises island props |
| `src/pages/HomeFr.jsx` (new) | The French homepage |
| `src/pages/ServicePage.jsx` | Reads service and labels from the context; takes `id` |
| `src/components/{Header,Contact,Footer,Breadcrumb,Services,Pricing}.jsx` | Read their words from the ui strings; `ServiceCard` and `PriceTable` exported |
| `src/lib/sections.js` | + `HOME_FR_SECTION_ORDER`, `homeFrSectionIndex` |
| `src/index.css` | + `.ed-head-end`, `.ed-lang` |
| `scripts/lib/i18n.test.js` (new) | typography, labels, French content parity, `contentFor` |
| `scripts/lib/pages.test.js`, `scripts/lib/routes.test.js` | new cases for head and routes |

---

### Task 1: French typography and French offer constants

**Files:**
- Create: `src/content/fr/typo.js`
- Modify: `src/content/site.js`
- Test: `scripts/lib/i18n.test.js` (new)

**Interfaces:**
- Produces: `typo(value)`, which deep-maps strings, arrays, objects and functions (function results are mapped). Also `WHATSAPP_URL_FR`, `PRICE_SITE_LABEL_FR`, `PRICE_SAAS_LABEL_FR` and `weeksTextFr({ from, to }) → '2 à 3'`, all from `site.js`.

- [ ] **Step 1: Write the failing tests**

Create `scripts/lib/i18n.test.js`:

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { typo } from '../../src/content/fr/typo.js'
import {
  PRICE_SAAS_LABEL_FR, PRICE_SITE_LABEL_FR, WHATSAPP_NUMBER, WHATSAPP_URL_FR, weeksTextFr,
} from '../../src/content/site.js'

test('typo puts a no-break space before French double punctuation and inside guillemets', () => {
  assert.equal(
    typo('Prix : fixe ; date ? oui ! « citation »'),
    'Prix : fixe ; date ? oui ! « citation »',
  )
})

test('typo leaves URLs and non-strings alone, and reaches into arrays, objects and functions', () => {
  const v = typo({ href: 'https://wa.me/1?text=a', n: 3, list: ['a : b'], f: x => `${x} ?` })
  assert.equal(v.href, 'https://wa.me/1?text=a')
  assert.equal(v.n, 3)
  assert.deepEqual(v.list, ['a : b'])
  assert.equal(v.f('ok'), 'ok ?')
})

test('French price labels use French number formatting', () => {
  assert.equal(PRICE_SITE_LABEL_FR, '3 000 €')
  assert.equal(PRICE_SAAS_LABEL_FR, '12 000 €')
  assert.equal(weeksTextFr({ from: 2, to: 3 }), '2 à 3')
})

test('the French WhatsApp link pre-fills a French message to the same number', () => {
  const u = new URL(WHATSAPP_URL_FR)
  assert.equal(u.pathname, `/${WHATSAPP_NUMBER}`)
  assert.match(u.searchParams.get('text'), /^Bonjour Ahmed/)
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL, `Cannot find module '…/src/content/fr/typo.js'`.

- [ ] **Step 3: Write `src/content/fr/typo.js`**

```js
/**
 * French typography. French sets a space before : ; ? ! and inside « », and it must not break, or
 * a line can start with the punctuation. Copy in src/content/fr/ is typed with ordinary spaces
 * and every module exports it through typo(), so no file has to carry invisible characters.
 */
const fix = s => s.replace(/ ([:;?!»])/g, ' $1').replace(/« /g, '« ')

export const typo = v =>
  typeof v === 'string' ? fix(v)
    : typeof v === 'function' ? (...args) => typo(v(...args))
      : Array.isArray(v) ? v.map(typo)
        : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, typo(x)]))
          : v
```

- [ ] **Step 4: Add the French constants to `src/content/site.js`**

After the `WHATSAPP_URL` export (line 26), add:

```js
/** The same invitation in French, for the French pages (src/content/fr/). */
export const WHATSAPP_URL_FR =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent('Bonjour Ahmed, j’ai trouvé votre site et j’aimerais parler d’un projet.')
```

After `export const PRICE_SAAS_LABEL = money(PRICE_SAAS_FROM)` (line 52), add:

```js
// The same floors written the French way ("3 000 €"). fr-FR groups with a narrow no-break space,
// and the space before the currency is a no-break one, so a figure never wraps away from it.
const moneyFr = n => `${n.toLocaleString('fr-FR')} ${CURRENCY}`
export const PRICE_SITE_LABEL_FR = moneyFr(PRICE_SITE_FROM)
export const PRICE_SAAS_LABEL_FR = moneyFr(PRICE_SAAS_FROM)
```

After `export const weeksText = …` (last line), add:

```js
export const weeksTextFr = w => `${w.from} à ${w.to}`
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 27 tests (23 existing + 4 new).

- [ ] **Step 6: Commit**

```bash
git add src/content/fr/typo.js src/content/site.js scripts/lib/i18n.test.js
git commit -m "feat: French typography helper and French offer constants

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Interface strings out of the components (English output unchanged)

**Files:**
- Create: `src/content/ui.js`, `src/content/i18n.js`, `src/content/byId.js`, `src/content/locale.js`, `src/lib/content-context.js`
- Modify: `src/content/services.js`, `src/content/routes.js`, `src/App.jsx`, `src/pages/ServicePage.jsx`, `src/components/Header.jsx`, `src/components/Contact.jsx`, `src/components/Footer.jsx`, `src/components/Breadcrumb.jsx`, `src/components/Services.jsx`, `src/components/Pricing.jsx`
- Test: `scripts/lib/i18n.test.js`

**Interfaces:**
- Consumes: `site.js` constants.
- Produces:
  - `ui` (English). Shape: `{ lang, home, nav[], menu, switchTo{label,name,lang}, crumbHome, crumbLabel, cta{long,short}, whatsappUrl, offer{promise,movers,founding}, service{…}, contact{…}, footer{tag,rights} }`.
  - `uiFor(locale)` and `LOCALES` from `i18n.js`.
  - `byId(list, what) → id => item`.
  - `contentFor(locale) → { locale, ui, services, findService(id), faqs, faqById(id), steps, proof: { products, site, all } }`.
  - `LocaleContext` and `useContent()` from `src/lib/content-context.js`.
  - Each service gains `id: 'website' | 'saas'`; each route gains `locale: 'en'`, and service routes gain `id`.
  - `ServicePage({ id })`, `ServiceCard({ s, i, href, more })` and `PriceTable({ head, rows })`.
  - `Header({ locale = 'en' })` and `Contact({ index, locale = 'en' })`.

- [ ] **Step 1: Snapshot today's English build**

Create `node_modules/.fr-baseline/snap.mjs` (inside `node_modules`, so git ignores it):

```js
// Usage: node node_modules/.fr-baseline/snap.mjs <outDir>
// Normalised copies of the built English pages, for diffing one build against another.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
const out = process.argv[2]
mkdirSync(out, { recursive: true })
for (const f of ['index', 'services/website-development', 'services/saas-mvp-development', 'work/this-site', '404']) {
  const html = readFileSync(`dist/${f}.html`, 'utf8')
    .replace(/<style>[\s\S]*?<\/style>/g, '<style/>') // inlined CSS: one huge line, checked visually instead
    .replace(/<!--[\s\S]*?-->/g, '') // React's text separators and the email_off guards
    .replace(/-[\w-]{8}\.(js|css|woff2)/g, '.$1') // Vite content hashes
    .replace(/>\s*</g, '>\n<') // one tag per line, so a diff is readable
  writeFileSync(`${out}/${f.replace(/\//g, '_')}.html`, html)
}
```

Run: `npm run build && node node_modules/.fr-baseline/snap.mjs node_modules/.fr-baseline/before`
Expected: the build succeeds, and 5 files appear in `node_modules/.fr-baseline/before/`.

- [ ] **Step 2: Write the failing test**

Append to `scripts/lib/i18n.test.js`:

```js
import { contentFor } from '../../src/content/locale.js'
import { uiFor } from '../../src/content/i18n.js'
import { ui } from '../../src/content/ui.js'

test('contentFor(en) serves the English content, by id', () => {
  const c = contentFor('en')
  assert.equal(c.ui, ui)
  assert.equal(c.findService('website').slug, 'website-development')
  assert.equal(c.findService('saas').slug, 'saas-mvp-development')
  assert.equal(c.faqById('cost').id, 'cost')
  assert.equal(c.proof.all.length, c.proof.products.length + c.proof.site.length + 1)
  assert.throws(() => c.findService('nope'), /no entry with id "nope"/)
})

test('an unknown locale fails loudly', () => {
  assert.throws(() => contentFor('de'), /no content for "de"/)
  assert.throws(() => uiFor('de'), /no interface strings for locale "de"/)
})
```

Run: `npm test`
Expected: FAIL, `Cannot find module '…/src/content/locale.js'`.

- [ ] **Step 3: Add ids to the English services**

In `src/content/services.js`, add `id` as the first field of each service:

```js
  {
    id: 'website',
    slug: 'website-development',
```

```js
  {
    id: 'saas',
    slug: 'saas-mvp-development',
```

Extend the header comment's first paragraph with: `` `id` pairs a service with its French twin in src/content/fr/services.js. ``

- [ ] **Step 4: Write `src/content/ui.js`**

```js
/**
 * Interface strings: the words around the content (navigation, breadcrumb, CTAs, the service
 * page's section titles, the contact form, the footer). src/content/fr/ui.js has the same shape
 * in French, so one set of components renders both languages. Offer facts stay in site.js; this
 * file only words them.
 *
 * Keep it light: the two hydrated islands import it (through i18n.js), so everything it imports
 * ships in the client bundle.
 */
import {
  CTA_LABEL, CTA_LABEL_LONG, CTA_LABEL_NAV, FIRST_LINK_DAYS, FOUNDING_OFFER, PRICE_MOVERS,
  PRICE_PROMISE, WHATSAPP_URL,
} from './site.js'

export const ui = {
  lang: 'en',
  home: '/',
  // Section links are root-relative: on the homepage they scroll in place, and from any other page
  // they lead back to that section. The CTA is the exception: every page renders the contact form,
  // so "#contact" keeps the visitor on the page they were reading.
  nav: [
    { name: 'Services', href: '/#services' },
    { name: 'Process', href: '/#process' },
    { name: 'Proof', href: '/#proof' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'About', href: '/#about' },
    { name: 'FAQ', href: '/#faq' },
    { name: CTA_LABEL_NAV, href: '#contact', accent: true },
  ],
  menu: 'Menu',
  // The header's link to the other language. Its accessible name contains the visible label.
  switchTo: { label: 'FR', name: 'FR, version française', lang: 'fr' },
  crumbHome: 'Home',
  crumbLabel: 'Breadcrumb',
  cta: { long: CTA_LABEL_LONG, short: CTA_LABEL },
  whatsappUrl: WHATSAPP_URL,
  offer: { promise: PRICE_PROMISE, movers: PRICE_MOVERS, founding: FOUNDING_OFFER },
  service: {
    facts: {
      price: 'Starting price, fixed per project in writing',
      weeks: 'Weeks, usually, from kickoff to launch',
      firstLink: 'Days to your first working link',
      cover: 'Days of post-launch fixes, included',
    },
    seePrice: 'See the price →',
    included: { eyebrow: 'What you get', title: 'Everything it takes', em: 'to go live.' },
    weeks: {
      eyebrow: 'How the weeks run',
      title: weeks => `Usually live in ${weeks} weeks.`,
      em: `A link on day ${FIRST_LINK_DAYS}.`,
      lead: 'The same four steps as every project, and you can see it running from the first one.',
    },
    price: {
      eyebrow: 'Price',
      title: price => `From ${price}.`,
      em: 'Quoted once.',
      lead: price => `${price} is the starting point. ${PRICE_PROMISE}`,
      founding: 'Founding-client rate:',
      cta: 'Lock in a price and a date',
    },
    proof: { eyebrow: 'Proof' },
    faq: { eyebrow: 'Questions', title: 'Straight', em: 'answers' },
  },
  contact: {
    eyebrow: 'Next step',
    title: 'Claim your',
    em: `${FIRST_LINK_DAYS}-Day Prototype Slot`,
    lead: "I run a few builds at a time; weekly demos are why. The scope call is free, 30 minutes, and ends with a written answer: what gets built, what it costs, and the date it goes live. If I'm not the right person for it, I'll tell you on the call.",
    whatsapp: 'Message me on WhatsApp',
    details: { email: 'Email', whatsapp: 'WhatsApp', linkedin: 'LinkedIn', location: 'Location', place: 'Tétouan, Morocco · Remote' },
    terms: 'No retainer. No deposit to talk. A written scope within a week, or a straight “not me”.',
    notReady: 'Not ready to talk?',
    readCode: 'Read the code first →',
    fields: {
      name: { label: 'Name', placeholder: 'Your name' },
      email: { label: 'Email', placeholder: 'your@email.com' },
      subject: { label: 'Subject', placeholder: "What's this about?" },
      message: { label: 'Message', placeholder: 'Tell me more…' },
    },
    submit: { idle: 'Send message', sending: 'Sending…', success: '✓ Message sent', error: '✗ Failed — retry' },
    // Prefixes the subject of the email the form sends.
    subjectPrefix: 'Portfolio contact: ',
    // Validation messages for the browser's bubble. null keeps the browser's own, which is in the
    // browser's language; the French pages set theirs.
    invalid: null,
  },
  footer: {
    tag: `Fixed price. Date in writing. A working link in ${FIRST_LINK_DAYS} days.`,
    rights: '© 2026 Ahmed Chioua. All rights reserved.',
  },
}
```

- [ ] **Step 5: Write `src/content/i18n.js`, `src/content/byId.js` and `src/content/locale.js`**

`src/content/i18n.js`:

```js
/**
 * Interface strings for a locale. Separate from locale.js on purpose: the two hydrated islands
 * (Header, Contact) import this file, and everything it imports ships in the client bundle,
 * whereas locale.js pulls in every content module of both languages.
 */
import { ui as en } from './ui.js'

const UI = { en }

export const LOCALES = Object.keys(UI)

export function uiFor(locale) {
  const ui = UI[locale]
  if (!ui) throw new Error(`i18n: no interface strings for locale "${locale}"`)
  return ui
}
```

`src/content/byId.js`:

```js
/** A lookup by `id` that fails the build on an unknown id, instead of rendering an empty section. */
export const byId = (list, what) => id => {
  const item = list.find(x => x.id === id)
  if (!item) throw new Error(`${what}: no entry with id "${id}"`)
  return item
}
```

`src/content/locale.js`:

```js
/**
 * Everything a page renders, in one language. App.jsx provides contentFor(route.locale) through
 * src/lib/content-context.js. The French modules under src/content/fr/ mirror the English ones
 * by id, so a component never branches on the language. Keep it JSX-free.
 */
import { byId } from './byId.js'
import { uiFor } from './i18n.js'
import { services } from './services.js'
import { faqs } from './faqs.js'
import { steps } from './process.js'
import { productProof, proofItems, siteProof } from './proof.js'

const build = (locale, m) => ({
  locale,
  ui: uiFor(locale),
  services: m.services,
  findService: byId(m.services, `services (${locale})`),
  faqs: m.faqs,
  faqById: byId(m.faqs, `faqs (${locale})`),
  steps: m.steps,
  proof: { products: m.productProof, site: m.siteProof, all: m.proofItems },
})

const CONTENT = {
  en: build('en', { services, faqs, steps, productProof, siteProof, proofItems }),
}

export function contentFor(locale) {
  const c = CONTENT[locale]
  if (!c) throw new Error(`locale: no content for "${locale}"`)
  return c
}
```

`src/lib/content-context.js`:

```js
import { createContext, useContext } from 'react'

/**
 * The page's content in its language (src/content/locale.js), provided once by App.jsx.
 * Prerendered components read it here. The two islands hydrate outside this provider, so they get
 * their locale through data-props instead (see App.jsx).
 */
export const LocaleContext = createContext(null)

export function useContent() {
  const c = useContext(LocaleContext)
  if (!c) throw new Error('useContent: no LocaleContext.Provider above this component (App.jsx provides it)')
  return c
}
```

Run: `npm test`
Expected: PASS, 29 tests.

- [ ] **Step 6: Give every route a locale, and service routes their id**

In `src/content/routes.js`, change the route list:

```js
export const routes = [
  { path: '/', kind: 'home', locale: 'en' },
  ...services.map(s => {
    const path = `/services/${s.slug}`
    return {
      path,
      kind: 'service',
      locale: 'en',
      id: s.id,
      slug: s.slug,
```

and in the work map, add `locale: 'en',` after `kind: 'work',`.

- [ ] **Step 7: Provide the context in `src/App.jsx` and pass `id` to ServicePage**

Replace the imports and the page-type table, and wrap the tree:

```jsx
import Header from './components/Header'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import WorkPage from './pages/WorkPage'
import { findRoute } from './content/routes'
import { contentFor } from './content/locale'
import { LocaleContext } from './lib/content-context'
import { sectionIndex, serviceSectionIndex, workSectionIndex } from './lib/sections'
```

```jsx
const PAGE_TYPES = {
  home: { render: () => <Home />, index: sectionIndex },
  service: { render: r => <ServicePage id={r.id} />, index: serviceSectionIndex },
  work: { render: r => <WorkPage slug={r.slug} name={r.name} />, index: workSectionIndex },
}
```

```jsx
  return (
    <LocaleContext.Provider value={contentFor(route.locale)}>
      <div className="app">
        <div id={ISLAND.header} style={{ display: 'contents' }}><Header /></div>
        <main>
          {type.render(route)}
          <div id={ISLAND.contact} data-props={JSON.stringify(contactProps)} style={{ display: 'contents' }}>
            <Contact {...contactProps} />
          </div>
        </main>
        <Footer />
      </div>
    </LocaleContext.Provider>
  )
```

Add one line to the comment block above `import { ISLAND }`: `Every other component reads the page's language content from LocaleContext (src/lib/content-context.js).`

- [ ] **Step 8: Rewrite `src/pages/ServicePage.jsx` to read from the context**

```jsx
import { BenefitCard } from '../components/BenefitCard'
import { Breadcrumb } from '../components/Breadcrumb'
import { Eyebrow as SharedEyebrow } from '../components/Eyebrow'
import { Step } from '../components/Process'
import { ProofItem } from '../components/Proof'
import { FaqRow } from '../components/Faq'
import { BOOKING_URL, FIRST_LINK_DAYS, LAUNCH_COVER_DAYS } from '../content/site'
import { useContent } from '../lib/content-context'
import { serviceSectionIndex as idx } from '../lib/sections'
import { spansLastRow } from '../lib/grid'

const Eyebrow = ({ label, id }) => <SharedEyebrow label={label} index={idx(id)} />

/**
 * One service, end to end: what it is, what's in it, how the weeks go, what it costs, what to
 * check, and the questions buyers ask. All copy comes from src/content in the page's language
 * (src/content/locale.js); this file only lays it out with the homepage's classes, so the page
 * reads as part of the same site.
 */
const ServicePage = ({ id }) => {
  const { ui, findService, faqById, steps, proof: proofs } = useContent()
  const t = ui.service
  const s = findService(id)
  const facts = [
    { n: s.priceLabel, l: t.facts.price },
    { n: s.weeks, l: t.facts.weeks },
    { n: String(FIRST_LINK_DAYS), l: t.facts.firstLink },
    { n: String(LAUNCH_COVER_DAYS), l: t.facts.cover },
  ]
  const proof = proofs[s.proof]

  return (
    <>
      <section id="hero" className="section svc-hero">
        <Breadcrumb name={s.name} />
        <h1 className="ed-h1">{s.h1} <em>{s.h1Em}</em></h1>
        <p className="ed-lead">{s.lead}</p>
        <div className="ed-cta-row">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">{ui.cta.long}</a>
          <a href="#price" className="link-teal">{t.seePrice}</a>
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
          <Eyebrow label={t.included.eyebrow} id="included" />
          <h2 className="sec-title">{t.included.title} <em>{t.included.em}</em></h2>
          <p className="sec-lead">{s.framing}</p>
        </div>
        <div className="hair-grid ed-ben-grid">
          {s.included.map((b, i) => <BenefitCard key={b.title} b={b} i={i} />)}
        </div>
      </section>

      <section id="weeks" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={t.weeks.eyebrow} id="weeks" />
          <h2 className="sec-title">{t.weeks.title(s.weeks)} <em>{t.weeks.em}</em></h2>
          <p className="sec-lead">{t.weeks.lead}</p>
        </div>
        <div className="ed-steps">
          {steps.map((st, i) => <Step key={st.title} s={st} i={i} />)}
        </div>
      </section>

      <section id="price" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={t.price.eyebrow} id="price" />
          <h2 className="sec-title">{t.price.title(s.priceLabel)} <em>{t.price.em}</em></h2>
          <p className="sec-lead">{t.price.lead(s.priceLabel)}</p>
        </div>
        <p className="ed-price-note">{ui.offer.movers}</p>
        <p className="ed-price-note"><b>{t.price.founding}</b> {ui.offer.founding}</p>
        <div className="ed-cta-row svc-price-cta">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">{t.price.cta}</a>
        </div>
      </section>

      <section id="proof" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={t.proof.eyebrow} id="proof" />
          <h2 className="sec-title">{s.proofTitle} <em>{s.proofTitleEm}</em></h2>
          <p className="sec-lead">{s.proofLead}</p>
        </div>
        <div className="hair-grid ed-proof-grid">
          {proof.map((it, i) => <ProofItem key={it.title} it={it} i={i} wide={spansLastRow(proof, i)} />)}
        </div>
      </section>

      <section id="faq" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={t.faq.eyebrow} id="faq" />
          <h2 className="sec-title">{t.faq.title} <em>{t.faq.em}</em></h2>
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

- [ ] **Step 9: Header, Breadcrumb and Footer read the ui strings**

`src/components/Header.jsx`. Replace the imports, delete the `navLinks` constant with its comment, and change the component's first line and the hard-coded strings:

```jsx
import { useState, useEffect } from 'react'
import { uiFor } from '../content/i18n'

// An island: it hydrates with the props App.jsx serialised (src/hydrate.jsx), not from the URL or
// the page's context, so everything it renders depends only on those props. The links' words and
// targets live in src/content/ui.js.
const Header = ({ locale = 'en' }) => {
  const ui = uiFor(locale)
  const [open, setOpen] = useState(false)
```

Then make these replacements in the JSX:
- `href="/#hero"` → ``href={`${ui.home}#hero`}``
- `navLinks.map` → `ui.nav.map` (both places)
- `aria-label="Menu"` → `aria-label={ui.menu}`

`src/components/Breadcrumb.jsx`:

```jsx
import { useContent } from '../lib/content-context'

/**
 * Home › page, matching the BreadcrumbList in src/content/routes.js. Two levels, because there is
 * no index page between the homepage and a service page or build log. "Home" is the homepage of
 * the page's own language.
 */
export const Breadcrumb = ({ name }) => {
  const { ui } = useContent()
  return (
    <nav aria-label={ui.crumbLabel} className="crumbs">
      <ol>
        <li><a href={ui.home}>{ui.crumbHome}</a></li>
        <li aria-current="page">{name}</li>
      </ol>
    </nav>
  )
}
```

`src/components/Footer.jsx`. Make these edits:
- `import { BOOKING_URL, CTA_LABEL, FIRST_LINK_DAYS, WHATSAPP_URL } from '../content/site'` → `import { BOOKING_URL } from '../content/site'` plus `import { useContent } from '../lib/content-context'`
- `const socials = [` → `const socials = whatsappUrl => [`
- `{ label: 'WhatsApp', href: WHATSAPP_URL,` → `{ label: 'WhatsApp', href: whatsappUrl,`
- Replace the component with the following. The `socials` map body and the `<svg>` stay exactly as they are:

```jsx
const Footer = () => {
  const { ui } = useContent()
  return (
    <footer className="ed-footer">
      <div className="ed-foot-top">
        <div>
          <div className="ed-foot-name">Ahmed Chioua</div>
          <p className="ed-foot-tag">{ui.footer.tag}</p>
        </div>
        <div className="ed-foot-socials">
          {socials(ui.whatsappUrl).map(s => (
            <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={s.label}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill={s.fill ? 'currentColor' : 'none'} stroke={s.fill ? 'none' : 'currentColor'} strokeWidth="2">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
      <div className="ed-foot-bottom">
        <span>{ui.footer.rights}</span>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{ui.cta.short} ↗</a>
      </div>

    </footer>
  )
}
```

- [ ] **Step 10: Rewrite `src/components/Contact.jsx` to read the ui strings**

```jsx
import { useState } from 'react'
import { BOOKING_URL, REPO_URL, WHATSAPP_DISPLAY } from '../content/site'
import { uiFor } from '../content/i18n'
import { WhatsAppIcon } from './WhatsAppIcon'

const EMAIL = 'ahmedchioua@gmail.com'
const LINKEDIN = 'https://linkedin.com/in/ahmedchioua'

const details = ui => [
  { label: ui.contact.details.email, value: EMAIL, href: `mailto:${EMAIL}` },
  { label: ui.contact.details.whatsapp, value: WHATSAPP_DISPLAY, href: ui.whatsappUrl },
  { label: ui.contact.details.linkedin, value: 'linkedin.com/in/ahmedchioua', href: LINKEDIN },
  { label: ui.contact.details.location, value: ui.contact.details.place, href: null },
]

/**
 * The form posts JSON to a Pages Function (functions/api/contact.js) which forwards it via
 * Resend. VITE_FORM_ENDPOINT (build-time) can point elsewhere — e.g. a hosted form backend —
 * but defaults to the function's route.
 */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '/api/contact'

async function send(form, gotcha, subjectPrefix) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...form, _subject: `${subjectPrefix}${form.subject}`, _gotcha: gotcha }),
  })
  // fetch only rejects on network failure; a 4xx/5xx must not read as "sent".
  if (!res.ok) throw new Error(`form endpoint responded ${res.status}`)
}

/**
 * The fields are uncontrolled on purpose. This island hydrates lazily (src/main.jsx), so there is
 * a window after first paint in which the visitor can type into the prerendered form before
 * React attaches. Controlled inputs start that render with empty state and blank whatever was
 * typed on the first keystroke after hydration; reading the values off the form at submit time
 * cannot lose them. It also drops a re-render per keystroke.
 *
 * An island: its words come from the locale App.jsx serialises into data-props.
 */
const Contact = ({ index, locale = 'en' }) => {
  const ui = uiFor(locale)
  const t = ui.contact
  const [status, setStatus] = useState('idle')

  const submit = async e => {
    e.preventDefault()
    const form = e.target
    const fields = form.elements
    setStatus('sending')
    try {
      await send({
        name: fields.name.value,
        email: fields.email.value,
        subject: fields.subject.value,
        message: fields.message.value,
      }, fields['bot-field']?.value ?? '', t.subjectPrefix)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section id="contact" className="section">
      <div className="ed-contact">
        <div className="fade-in ed-contact-left">
          <div className="eyebrow-block" style={{ marginBottom: 0 }}>
            <div className="eyebrow-row">
              <span className="eyebrow">{t.eyebrow}</span>
              <span className="eyebrow-index">( {index} )</span>
            </div>
            <h2 className="sec-title">{t.title} <em>{t.em}</em></h2>
            <p className="sec-lead" style={{ marginBottom: '28px' }}>{t.lead}</p>
            <div className="ed-contact-btns">
              <a className="btn-ink" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                {ui.cta.short}
              </a>
              <a className="btn-wa" href={ui.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                {t.whatsapp}
              </a>
            </div>
            <dl className="ed-details">
              {details(ui).map(d => (
                <div key={d.label} className="ed-detail">
                  <dt>{d.label}</dt>
                  <dd>{d.href ? <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{d.value}</a> : d.value}</dd>
                </div>
              ))}
            </dl>
            <p className="ed-alt-cta">{t.terms}</p>
            <p className="ed-alt-cta">
              {t.notReady}{' '}
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">{t.readCode}</a>
            </p>
          </div>
        </div>

        <form className="fade-in ed-form" name="contact" onSubmit={submit}>
          <div style={{ display: 'none' }}><label>Skip: <input name="bot-field" /></label></div>
          <div className="ed-form-row">
            <div className="ed-fg"><label>{t.fields.name.label}</label><input name="name" placeholder={t.fields.name.placeholder} required /></div>
            <div className="ed-fg"><label>{t.fields.email.label}</label><input type="email" name="email" placeholder={t.fields.email.placeholder} required /></div>
          </div>
          <div className="ed-fg"><label>{t.fields.subject.label}</label><input name="subject" placeholder={t.fields.subject.placeholder} required /></div>
          <div className="ed-fg"><label>{t.fields.message.label}</label><textarea name="message" rows="5" placeholder={t.fields.message.placeholder} required /></div>
          <button type="submit" className={`ed-submit ${status}`} disabled={status === 'sending'}>
            {t.submit[status]}
          </button>
        </form>
      </div>

    </section>
  )
}

export default Contact
```

- [ ] **Step 11: Export `ServiceCard` and `PriceTable` for reuse**

`src/components/Services.jsx`. Replace `ServiceCard` and its use:

```jsx
// One card per service page, in the same order: the card copy lives with the page's copy in
// src/content/services.js, so a new service is one entry there, not one in each file. The link
// and its label are passed in, because the French homepage renders the same card.
export const ServiceCard = ({ s, i, href, more }) => {
  return (
    <div className="fade-in ed-svc">
      <div className="ed-svc-n">( {ordinal(i, 2)} )</div>
      <h3 className="ed-svc-t">{s.card.title}</h3>
      <div className="ed-svc-tag">{s.card.tagline}</div>
      <p className="ed-svc-desc">{s.card.desc}</p>
      <div className="ed-svc-tags">
        {s.card.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
      <a href={href} className="link-teal ed-svc-more">{more} →</a>
    </div>
  )
}
```

```jsx
      {services.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} href={servicePath(s.slug)} more={`${s.name} in detail`} />)}
```

`src/components/Pricing.jsx`. Add after `tiers`:

```jsx
/** The price band as a table. The French homepage renders it with its own rows and headers. */
export const PriceTable = ({ head, rows }) => (
  <table className="ed-price-table">
    <thead>
      <tr>
        <th scope="col">{head.scope}</th>
        <th scope="col">{head.from}</th>
      </tr>
    </thead>
    <tbody>
      {rows.map(t => (
        <tr key={t.scope}>
          <th scope="row" className="ed-price-scope">{t.scope}</th>
          <td className="ed-price-figure">{t.from}</td>
        </tr>
      ))}
    </tbody>
  </table>
)
```

and replace the inline `<table className="ed-price-table">…</table>` in `Pricing` (keep the comment above it) with:

```jsx
    <PriceTable head={{ scope: 'Scope', from: 'From' }} rows={tiers} />
```

- [ ] **Step 12: Test, lint, build, and diff against the snapshot**

Run: `npm test && npm run lint && npm run build && node node_modules/.fr-baseline/snap.mjs node_modules/.fr-baseline/task2 && diff -r node_modules/.fr-baseline/before node_modules/.fr-baseline/task2 && echo IDENTICAL`
Expected: 29 tests pass, lint is clean, the build prints 4 pages, and the output ends with `IDENTICAL`. Any diff line is a regression in the English output: fix it before committing.

- [ ] **Step 13: Commit**

```bash
git add src/content/ui.js src/content/i18n.js src/content/byId.js src/content/locale.js src/lib/content-context.js \
  src/content/services.js src/content/routes.js src/App.jsx src/pages/ServicePage.jsx \
  src/components/Header.jsx src/components/Contact.jsx src/components/Footer.jsx src/components/Breadcrumb.jsx \
  src/components/Services.jsx src/components/Pricing.jsx scripts/lib/i18n.test.js
git commit -m "refactor: interface strings in src/content/ui.js, page content through a locale context

The built English pages are byte-identical apart from React's text separators.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: French content modules

**Files:**
- Create: `src/content/fr/ui.js`, `src/content/fr/services.js`, `src/content/fr/faqs.js`, `src/content/fr/process.js`, `src/content/fr/products.js`, `src/content/fr/proof.js`, `src/content/fr/home.js`
- Modify: `src/content/i18n.js`, `src/content/locale.js`, `docs/superpowers/specs/2026-10-10-french-pages-design.md`
- Test: `scripts/lib/i18n.test.js`

**Interfaces:**
- Consumes: `typo`, the `*_FR` constants and `weeksTextFr` (Task 1); the `ui` shape (Task 2); `workPath` from `routes.js`.
- Produces:
  - `fr/ui.js` → `ui`, with the same shape as English. Its `nav` has no About, and `contact.invalid` is set.
  - `fr/services.js` → `services` (ids `website`, `saas`; slugs `creation-site-web`, `developpement-saas`).
  - `fr/faqs.js` → `faqs` (ids `what`, `speed`, `ai-quality`, `cost`, `slip`, `after`, `ownership`, `location`).
  - `fr/process.js` → `steps`.
  - `fr/products.js` → `products` (French `card`) and `productsPhrase`.
  - `fr/proof.js` → `productProof`, `siteProof`, `proofItems`.
  - `fr/home.js` → `home`: `{ meta{name,title,description}, hero{kicker,h1[],em,lead,whatsapp,facts[]}, services{eyebrow,title,em,lead,more(name)}, process{…}, proof{…}, pricing{eyebrow,title,em,lead,head,rows,cta}, faq{eyebrow,title,em,ids} }`.
  - `contentFor('fr')` and `uiFor('fr')`.

- [ ] **Step 1: Write the failing tests**

Append to `scripts/lib/i18n.test.js`:

```js
import { services } from '../../src/content/services.js'
import { steps } from '../../src/content/process.js'
import { ui as frUi } from '../../src/content/fr/ui.js'
import { services as frServices } from '../../src/content/fr/services.js'
import { faqs as frFaqs } from '../../src/content/fr/faqs.js'
import { steps as frSteps } from '../../src/content/fr/process.js'
import { proofItems as frProof } from '../../src/content/fr/proof.js'
import { home as frHome } from '../../src/content/fr/home.js'

test('French services mirror the English ones: same ids, order, price, weeks and proof group', () => {
  assert.deepEqual(frServices.map(s => s.id), services.map(s => s.id))
  frServices.forEach((s, i) => {
    for (const k of ['priceFrom', 'weeks', 'proof']) assert.equal(s[k], services[i][k], `${s.id}.${k}`)
    assert.equal(s.included.length, services[i].included.length, `${s.id}.included`)
  })
})

test('every FAQ id a French page asks for exists in French', () => {
  const ids = new Set(frFaqs.map(f => f.id))
  assert.deepEqual(frHome.faq.ids, ['what', 'speed', 'cost', 'ownership', 'slip', 'location'])
  for (const id of [...frHome.faq.ids, ...frServices.flatMap(s => s.faqIds)]) assert.ok(ids.has(id), id)
})

test('the French process has the same four steps', () => {
  assert.equal(frSteps.length, steps.length)
})

test('French interface strings have the same shape as the English ones', () => {
  const shape = v => typeof v === 'function' ? 'fn'
    : Array.isArray(v) ? v.map(shape)
      : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map(k => [k, shape(v[k])]))
        : typeof v
  // The navs differ in length (About is English-only), and only French sets validation messages.
  const comparable = u => ({ ...u, nav: undefined, contact: { ...u.contact, invalid: undefined } })
  assert.deepEqual(shape(comparable(frUi)), shape(comparable(ui)))
})

test('the French nav stays on the French homepage, except the contact anchor every page has', () => {
  for (const l of frUi.nav) assert.match(l.href, /^(\/fr#[a-z]+|#contact)$/, l.name)
})

test('contentFor and uiFor serve French', () => {
  const c = contentFor('fr')
  assert.equal(c.ui, frUi)
  assert.equal(uiFor('fr'), frUi)
  assert.equal(c.findService('saas').slug, 'developpement-saas')
  assert.equal(c.proof.all, frProof)
})

test('no French string has an ordinary space before : ; ? or !', () => {
  const strings = v => typeof v === 'string' ? [v]
    : typeof v === 'function' ? strings(v('X'))
      : Array.isArray(v) ? v.flatMap(strings)
        : v && typeof v === 'object' ? Object.values(v).flatMap(strings)
          : []
  for (const s of strings([frUi, frServices, frFaqs, frSteps, frProof, frHome])) {
    assert.doesNotMatch(s, / [:;?!]/, s)
  }
})
```

Run: `npm test`
Expected: FAIL, `Cannot find module '…/src/content/fr/ui.js'`.

- [ ] **Step 2: Write `src/content/fr/ui.js`**

```js
/**
 * Interface strings in French: the same shape as src/content/ui.js (a test compares them).
 * Copy is Claude's translation of the English, awaiting Ahmed's approval.
 */
import { FIRST_LINK_DAYS, FOUNDING_SLOTS, LAUNCH_COVER_DAYS, WHATSAPP_URL_FR } from '../site.js'
import { typo } from './typo.js'

const CTA_LONG = `Réserver un créneau prototype de ${FIRST_LINK_DAYS} jours`
const PROMISE = `Votre montant est fixé une seule fois, pendant l’appel de cadrage gratuit, par écrit, avec une date, et il ne bouge plus ensuite. Il couvre le développement, l’infrastructure, la passation et ${LAUNCH_COVER_DAYS} jours de garantie après le lancement. Pas de compteur horaire.`

export const ui = typo({
  lang: 'fr',
  home: '/fr',
  // The French homepage's sections. About is English-only, so it isn't here.
  nav: [
    { name: 'Services', href: '/fr#services' },
    { name: 'Méthode', href: '/fr#process' },
    { name: 'Preuves', href: '/fr#proof' },
    { name: 'Tarifs', href: '/fr#pricing' },
    { name: 'FAQ', href: '/fr#faq' },
    { name: 'Réserver un créneau', href: '#contact', accent: true },
  ],
  menu: 'Menu',
  switchTo: { label: 'EN', name: 'EN, English version', lang: 'en' },
  crumbHome: 'Accueil',
  crumbLabel: 'Fil d’Ariane',
  cta: { long: CTA_LONG, short: `Réserver un créneau de ${FIRST_LINK_DAYS} jours` },
  whatsappUrl: WHATSAPP_URL_FR,
  offer: {
    promise: PROMISE,
    movers: 'Ce qui fait varier le montant : la part de neuf par rapport à l’existant adapté, et la présence ou non d’authentification, de paiements ou d’intégrations tierces.',
    founding: `pour les ${FOUNDING_SLOTS} prochains projets, et ce n’est pas une remise. Vous échangez une étude de cas écrite et une recommandation contre le tarif fondateur. Même périmètre, même date, même passation. Dites « fondateur » pendant l’appel de cadrage.`,
  },
  service: {
    facts: {
      price: 'Prix de départ, fixé par écrit pour chaque projet',
      weeks: 'Semaines en général, du lancement du projet à la mise en ligne',
      firstLink: 'Jours jusqu’à votre premier lien fonctionnel',
      cover: 'Jours de corrections après le lancement, inclus',
    },
    seePrice: 'Voir le prix →',
    included: { eyebrow: 'Ce que vous obtenez', title: 'Tout ce qu’il faut', em: 'pour être en ligne.' },
    weeks: {
      eyebrow: 'Déroulé des semaines',
      title: weeks => `En ligne en ${weeks} semaines en général.`,
      em: `Un lien au jour ${FIRST_LINK_DAYS}.`,
      lead: 'Les mêmes quatre étapes que pour chaque projet, et vous le voyez avancer dès la première.',
    },
    price: {
      eyebrow: 'Prix',
      title: price => `À partir de ${price}.`,
      em: 'Chiffré une fois.',
      lead: price => `${price} est le point de départ. ${PROMISE}`,
      founding: 'Tarif client fondateur :',
      cta: 'Fixer un prix et une date',
    },
    proof: { eyebrow: 'Preuves' },
    faq: { eyebrow: 'Questions', title: 'Des réponses', em: 'directes' },
  },
  contact: {
    eyebrow: 'Prochaine étape',
    title: 'Réservez votre',
    em: `créneau prototype de ${FIRST_LINK_DAYS} jours`,
    lead: 'Je mène peu de projets à la fois ; c’est ce qui rend les démos hebdomadaires possibles. L’appel de cadrage est gratuit, dure 30 minutes et se termine par une réponse écrite : ce qui sera construit, ce que ça coûte et la date de mise en ligne. Si je ne suis pas la bonne personne, je vous le dirai pendant l’appel.',
    whatsapp: 'Écrivez-moi sur WhatsApp',
    details: { email: 'E-mail', whatsapp: 'WhatsApp', linkedin: 'LinkedIn', location: 'Localisation', place: 'Tétouan, Maroc · À distance' },
    terms: 'Pas d’abonnement. Pas d’acompte pour discuter. Un cadrage écrit sous une semaine, ou un « ce n’est pas pour moi » franc.',
    notReady: 'Pas encore prêt à en parler ?',
    readCode: 'Lisez d’abord le code →',
    fields: {
      name: { label: 'Nom', placeholder: 'Votre nom' },
      email: { label: 'E-mail', placeholder: 'vous@exemple.com' },
      subject: { label: 'Objet', placeholder: 'De quoi s’agit-il ?' },
      message: { label: 'Message', placeholder: 'Dites-m’en plus…' },
    },
    submit: { idle: 'Envoyer le message', sending: 'Envoi…', success: '✓ Message envoyé', error: '✗ Échec, réessayer' },
    // Tells Ahmed's inbox which page the message came from.
    subjectPrefix: 'Portfolio contact (FR): ',
    invalid: { required: 'Veuillez remplir ce champ.', email: 'Veuillez saisir une adresse e-mail valide.' },
  },
  footer: {
    tag: `Prix fixe. Date par écrit. Un lien fonctionnel en ${FIRST_LINK_DAYS} jours.`,
    rights: '© 2026 Ahmed Chioua. Tous droits réservés.',
  },
})
```

- [ ] **Step 3: Write `src/content/fr/products.js` and `src/content/fr/proof.js`**

`src/content/fr/products.js`:

```js
/**
 * The product cards in French. Every fact is the English card's (src/content/products.js, which
 * records what each product is and its status today); only the language differs. Keyed by product
 * name, and a product without a French card fails the build.
 */
import { products as en } from '../products.js'
import { typo } from './typo.js'

const CARDS = typo({
  PawPawCare: 'Une application de suivi de santé pour animaux que j’ai fondée et développée de bout en bout : rappels de vaccins et de traitements, courbes de poids, dossiers vétérinaires, et une IA qui lit les photos de carnets de vaccination. En accès anticipé : les inscrits de la liste d’attente sont intégrés avant le lancement sur les stores. C’est ce qui se rapproche le plus d’une étude de cas.',
  'FitPal Coach': 'Un logiciel pour les coachs sportifs indépendants qui suivent de 5 à 40 clients. Le coach dispose d’un tableau de bord qui montre l’assiduité par rapport au programme ; chaque client reçoit une application d’entraînement au nom du coach, qui s’installe depuis le navigateur, fonctionne hors ligne et se connecte avec une clé d’accès. Je l’ai construit et je l’exploite sur un socle open source (openGym). Vendu à la suite d’un appel sur fitpal.ma.',
})

export const products = en.map(p => {
  const card = CARDS[p.name]
  if (!card) throw new Error(`fr/products: no French card for "${p.name}"`)
  return { ...p, card }
})

const NUMBER_WORDS = ['aucun', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf']
const plural = products.length === 1 ? '' : 's'

/** "deux produits que j’ai construits et que j’exploite": the French productsPhrase. */
export const productsPhrase =
  `${NUMBER_WORDS[products.length] ?? products.length} produit${plural} que j’ai construit${plural} et que j’exploite`
```

`src/content/fr/proof.js`:

```js
/**
 * The French Proof items: the same things to check as src/content/proof.js. The build log stays in
 * English, and its link says so.
 */
import { products } from './products.js'
import { REPO_URL } from '../site.js'
import { workPath } from '../routes.js'
import { typo } from './typo.js'

const LINKEDIN = 'https://linkedin.com/in/ahmedchioua'

export const productProof = products.map(p => ({ title: p.name, body: p.card, link: { label: p.label, href: p.url } }))

export const siteProof = typo([
  {
    title: 'Ce site',
    body: 'Conçu, développé et déployé par moi, en React avec du CSS écrit à la main. Pas de template, pas de constructeur de pages. Il obtient 100 / 100 / 100 sur Lighthouse en accessibilité, bonnes pratiques et SEO. Lancez-le vous-même pour vérifier.',
    link: { label: 'Lire le journal de construction (en anglais)', href: workPath('this-site') },
  },
  {
    title: 'Le code source',
    body: 'Tout le dépôt est public : le code, les données structurées, la configuration de build et chaque commit depuis le premier. Il montre ma façon de travailler mieux que tout ce que je pourrais écrire ici.',
    link: { label: 'github.com/r0b0t007', href: REPO_URL },
  },
])

const trackRecord = typo({
  title: 'Le parcours',
  body: 'Neuf ans de logiciels en production pour Bell, BMW et Bayer, livrés via NTT DATA et une mission de conseil. Tout est sur LinkedIn, avec les certifications.',
  link: { label: 'linkedin.com/in/ahmedchioua', href: LINKEDIN },
})

export const proofItems = [...productProof, ...siteProof, trackRecord]
```

- [ ] **Step 4: Write `src/content/fr/process.js` and `src/content/fr/faqs.js`**

`src/content/fr/process.js`:

```js
/** The four steps in French (src/content/process.js). Same order, same facts. */
import { FIRST_LINK_DAYS, LAUNCH_COVER_DAYS } from '../site.js'
import { typo } from './typo.js'

export const steps = typo([
  {
    title: 'Cadrage',
    meta: 'Gratuit · 1 semaine',
    desc: 'Un appel de 30 minutes, puis un cadrage écrit : ce qui est construit, ce qui ne l’est pas, ce que ça coûte et la date de mise en ligne. Si je ne suis pas la bonne personne, je vous le dirai à ce moment-là. C’est pour ça que c’est gratuit.',
  },
  {
    title: 'Développement',
    meta: `Jour ${FIRST_LINK_DAYS} : un lien · puis chaque semaine`,
    desc: `Au jour ${FIRST_LINK_DAYS}, vous recevez une URL. C’est brut, mais c’est réel. Vous testez le parcours principal, vous réagissez, et on ajuste tant que les changements coûtent peu. Chaque semaine ensuite : une démo, un lien mis à jour, une ligne directe avec moi. L’IA dans la boucle explique pourquoi le délai se compte en semaines et non en mois. La revue d’architecture hebdomadaire explique pourquoi ça tient.`,
  },
  {
    title: 'Mise en ligne',
    meta: 'À la date de votre cadrage',
    desc: 'En ligne sur votre infrastructure, votre domaine, vos comptes. Performance, accessibilité et SEO vérifiés avant la mise en ligne, et vous voyez les chiffres. Si je manque la date de votre cadrage, je continue jusqu’à la livraison, et le dépassement est à ma charge.',
  },
  {
    title: 'Passation',
    meta: `Incluse · ${LAUNCH_COVER_DAYS} jours de couverture`,
    desc: `Le dépôt, le pipeline, la documentation, une présentation vidéo, et ${LAUNCH_COVER_DAYS} jours de corrections après le lancement. N’importe quel développeur peut reprendre après moi. Si vous préférez que je continue, on le cadre séparément.`,
  },
])
```

`src/content/fr/faqs.js`:

```js
/**
 * The French FAQ: the entries the French pages show (the homepage's six, plus "ai-quality" and
 * "after" for the service pages), by the English ids (src/content/faqs.js). Visible text and the
 * French homepage's FAQPage JSON-LD (src/content/routes.js) both read these strings.
 */
import {
  FIRST_LINK_DAYS, LAUNCH_COVER_DAYS, PRICE_SAAS_LABEL_FR, PRICE_SITE_LABEL_FR, SAAS_WEEKS,
  SITE_WEEKS, weeksTextFr,
} from '../site.js'
import { typo } from './typo.js'

export const faqs = typo([
  {
    id: 'what',
    q: 'Que construisez-vous exactement ?',
    a: 'Des sites web vitrines, des produits SaaS et des MVP, des outils internes, et l’automatisation IA qui les accompagne. Du full-stack, de la conception au déploiement. Si ça tourne dans un navigateur et que ça doit tenir en conditions réelles, c’est dans mon périmètre.',
  },
  {
    id: 'speed',
    q: 'Rapide, c’est-à-dire ?',
    a: `Un site vitrine prend en général ${weeksTextFr(SITE_WEEKS)} semaines. Un MVP, en général ${weeksTextFr(SAAS_WEEKS)}, selon ce qu’il contient. Vous avez une date dans le cadrage écrit avant de vous engager, et un lien fonctionnel dans les ${FIRST_LINK_DAYS} premiers jours. C’est le développement assisté par IA qui rend ces délais réalistes.`,
  },
  {
    id: 'ai-quality',
    q: 'Développer avec l’IA, est-ce que ça veut dire moins de qualité ?',
    a: 'L’IA accélère l’écriture : la structure de départ, le code répétitif, les tests, les premiers jets. Elle ne prend pas les décisions d’architecture et ne relit pas son propre travail. Ça, c’est mon travail, et c’est ce à quoi neuf ans de projets en grande entreprise m’ont formé. Ce site a été construit ainsi : lancez Lighthouse dessus.',
  },
  {
    id: 'cost',
    q: 'Combien ça coûte ?',
    a: `Les sites vitrines démarrent à ${PRICE_SITE_LABEL_FR}, les SaaS et MVP à ${PRICE_SAAS_LABEL_FR}. Le montant exact est fixé pour chaque projet pendant l’appel de cadrage gratuit, selon ce dont le projet a besoin et non selon les heures passées. Il couvre le développement, la mise en place de l’infrastructure, la passation et ${LAUNCH_COVER_DAYS} jours de corrections après le lancement. Pas de compteur horaire, pas d’abonnement dont on ne peut pas sortir, pas de facture surprise.`,
  },
  {
    id: 'slip',
    q: 'Et si la date de lancement glisse ?',
    a: 'Ce n’est pas à vous de le payer. La date figure dans votre cadrage écrit. Si je la manque, je continue jusqu’à la livraison, et le dépassement est à ma charge. Les changements de périmètre que vous demandez en cours de route déplacent la date et le prix, et on se met d’accord sur les deux par écrit avant que je continue.',
  },
  {
    id: 'after',
    q: `Que se passe-t-il après les ${LAUNCH_COVER_DAYS} jours ?`,
    a: 'Trois options, aucune imposée. Confier le projet à n’importe quel développeur : c’est à ça que servent la documentation et la présentation vidéo. Me confier une suite cadrée, à prix fixe. Ou un forfait mensuel de maintenance pour l’hébergement, les mises à jour et les petites modifications, chiffré à part. Rien ne se renouvelle tout seul.',
  },
  {
    id: 'ownership',
    q: 'À qui appartient le code ?',
    a: `À vous, entièrement et dès le premier jour. Votre dépôt, votre infrastructure, vos comptes : hébergement, domaine, base de données, authentification et paiements configurés sur des comptes que vous contrôlez. La passation comprend la documentation et une présentation vidéo, pour que vous puissiez confier le projet à un autre développeur quand vous le voulez, et ${LAUNCH_COVER_DAYS} jours de corrections après le lancement, pour que le premier mois ne soit pas à vous de déboguer.`,
  },
  {
    id: 'location',
    q: 'Où êtes-vous basé, et est-ce important ?',
    a: 'À Tétouan, au Maroc, en GMT+1. Je travaille à distance avec des équipes canadiennes et allemandes depuis cinq ans. Le chevauchement avec les horaires européens est total, et avec la côte Est des États-Unis il couvre la majeure partie de la journée.',
  },
])
```

- [ ] **Step 5: Write `src/content/fr/services.js`**

```js
/**
 * The service pages in French: the same services as src/content/services.js, paired by `id`, with
 * French slugs. Every number comes from site.js. Also read by src/content/routes.js (titles,
 * descriptions, structured data). Keep it JSX-free.
 */
import {
  FIRST_LINK_DAYS, LAUNCH_COVER_DAYS, PRICE_SAAS_FROM, PRICE_SAAS_LABEL_FR, PRICE_SITE_FROM,
  PRICE_SITE_LABEL_FR, SAAS_WEEKS, SITE_WEEKS, weeksRange, weeksTextFr,
} from '../site.js'
import { productsPhrase } from './products.js'
import { typo } from './typo.js'

const handOff = {
  title: 'Passation',
  lines: [`Le dépôt à votre nom, la documentation, une présentation vidéo et ${LAUNCH_COVER_DAYS} jours de corrections après le lancement.`],
}

export const services = typo([
  {
    id: 'website',
    slug: 'creation-site-web',
    name: 'Création de site web',
    card: {
      title: 'Des sites qui se positionnent et qui convertissent',
      tagline: 'Conçus pour charger vite et être trouvés.',
      desc: 'Sites vitrines, landing pages et portfolios, conçus et développés sur mesure. Données structurées, sémantique propre, balises meta soignées et sitemap sont intégrés pendant le développement, et je mesure les Core Web Vitals avant le lancement au lieu de les laisser pour plus tard.',
      tags: ['Conception et développement', 'Bases SEO', 'Core Web Vitals', 'Analytics'],
    },
    summary: `sites vitrines et landing pages à partir de ${PRICE_SITE_LABEL_FR}, en ligne en ${weeksTextFr(SITE_WEEKS)} semaines en général`,
    title: 'Création de site web à prix fixe | Ahmed Chioua',
    description: `Sites vitrines et landing pages à partir de ${PRICE_SITE_LABEL_FR}, en ligne en ${weeksTextFr(SITE_WEEKS)} semaines en général. Un lien fonctionnel en ${FIRST_LINK_DAYS} jours, un prix fixe et une date par écrit.`,
    serviceType: 'Conception et développement de sites web',
    priceFrom: PRICE_SITE_FROM,
    priceLabel: PRICE_SITE_LABEL_FR,
    weeks: weeksRange(SITE_WEEKS),
    h1: 'Création de site web,',
    h1Em: 'prix fixe, date par écrit.',
    lead: `Sites vitrines, landing pages et portfolios, conçus et développés sur mesure. Un lien fonctionnel en ${FIRST_LINK_DAYS} jours, le site en ligne sur votre propre domaine ${weeksTextFr(SITE_WEEKS)} semaines après le lancement du projet en général, et un prix fixé par écrit avant que quoi que ce soit ne commence.`,
    framing: 'Un site web se justifie de deux façons : les moteurs de recherche le trouvent, et les visiteurs qui y arrivent peuvent faire ce pour quoi il a été conçu. Les deux se règlent pendant le développement : données structurées, sémantique propre et Core Web Vitals font partie du projet, pas d’un nettoyage après le lancement.',
    included: [
      { title: 'Conçu et développé sur mesure', lines: ['Un site vitrine, une landing page ou un portfolio, conçu autour de votre offre. Pas de template, pas de constructeur de pages.'] },
      { title: 'Des bases SEO solides', lines: ['Données structurées, sémantique propre, balises meta soignées et sitemap, intégrés pendant le développement.'] },
      { title: 'Core Web Vitals, mesurés', lines: ['Performance, accessibilité et SEO vérifiés avant le lancement, et vous voyez les chiffres.'] },
      { title: 'Analytics avant le lancement', lines: ['Installés avant la mise en ligne, pas après, pour que les premiers visiteurs soient comptés.'] },
      { title: 'Votre domaine, vos comptes', lines: ['Hébergement, domaine et pipeline de déploiement configurés sur des comptes que vous contrôlez. Vous poussez le code, il est en ligne.'] },
      handOff,
    ],
    proof: 'site',
    proofTitle: 'Ne me croyez pas sur parole.',
    proofTitleEm: 'Vérifiez cette page.',
    proofLead: 'La page que vous lisez a été construite comme le serait votre site. Lancez Lighthouse dessus, ou lisez le code source.',
    faqIds: ['speed', 'cost', 'ai-quality', 'ownership', 'after'],
  },
  {
    id: 'saas',
    slug: 'developpement-saas',
    name: 'Développement SaaS et MVP',
    card: {
      title: 'SaaS et MVP',
      tagline: 'D’une idée à un produit auquel on peut se connecter.',
      desc: 'On s’accorde sur la plus petite version qui prouve l’idée, puis je la construis : authentification, modèle de données, parcours principaux, paiements si vous en avez besoin. Elle est déployée sur une infrastructure capable d’encaisser la croissance, pour que vous n’ayez pas à refaire les fondations le mois où ça commence à marcher.',
      tags: ['Cadrage du MVP', 'Développement full-stack', 'Authentification et paiements', 'Pipeline de déploiement'],
    },
    summary: `produits SaaS et MVP à partir de ${PRICE_SAAS_LABEL_FR}, en ligne en ${weeksTextFr(SAAS_WEEKS)} semaines en général`,
    title: 'Développement SaaS et MVP à prix fixe | Ahmed Chioua',
    description: `Produits SaaS et MVP à partir de ${PRICE_SAAS_LABEL_FR}, en ligne en ${weeksTextFr(SAAS_WEEKS)} semaines en général. Un lien fonctionnel en ${FIRST_LINK_DAYS} jours, un prix fixe et une date par écrit.`,
    serviceType: 'Développement SaaS et MVP',
    priceFrom: PRICE_SAAS_FROM,
    priceLabel: PRICE_SAAS_LABEL_FR,
    weeks: weeksRange(SAAS_WEEKS),
    h1: 'Développement SaaS et MVP,',
    h1Em: 'prix fixe, date par écrit.',
    lead: `D’une idée à un produit auquel on peut se connecter. Un lien fonctionnel en ${FIRST_LINK_DAYS} jours, une démo chaque semaine ensuite, et le produit en ligne sur votre propre infrastructure ${weeksTextFr(SAAS_WEEKS)} semaines après le lancement du projet en général, à un prix fixé par écrit avant que quoi que ce soit ne commence.`,
    framing: 'Une première version n’a qu’un objectif : prouver que des gens en veulent. Le périmètre part donc de la plus petite version capable de le prouver, et tout le reste attend. Les fondations, elles, n’attendent pas. L’authentification, le modèle de données et le pipeline de déploiement sont conçus pour encaisser la croissance, pour que le mois où ça marche ne soit pas celui où vous les reconstruisez.',
    included: [
      { title: 'Un périmètre qui tient sur une page', lines: ['La plus petite version qui prouve l’idée : ce qui est inclus, ce qui ne l’est pas, le prix et la date de lancement, par écrit.'] },
      { title: 'Authentification et modèle de données', lines: ['Connexion, comptes et un modèle de données conçu pour tenir quand les vrais utilisateurs arrivent.'] },
      { title: 'Les parcours principaux', lines: ['Les écrans et les actions pour lesquels le produit existe, développés de bout en bout et présentés en démo chaque semaine.'] },
      { title: 'Les paiements, si besoin', lines: ['Configurés sur votre propre compte de paiement, pour que les revenus soient à vous dès le premier encaissement.'] },
      { title: 'Une infrastructure sur vos comptes', lines: ['Hébergement, base de données et authentification sur des comptes que vous contrôlez (Vercel, AWS, Supabase, Cloudflare), avec un pipeline de déploiement : vous poussez le code, il est en ligne.'] },
      handOff,
    ],
    proof: 'products',
    proofTitle: 'Les produits que je construis',
    proofTitleEm: 'et que j’exploite.',
    proofLead: `Je ne vous montrerai pas de logos clients que je n’ai pas mérités. Voici ${productsPhrase}.`,
    faqIds: ['speed', 'cost', 'slip', 'ownership', 'after'],
  },
])
```

- [ ] **Step 6: Write `src/content/fr/home.js`**

```js
/**
 * The French homepage (src/pages/HomeFr.jsx): its head, hero and section copy. Shorter than the
 * English homepage: no Experience, About or hand-off sections. The section order is declared in
 * src/lib/sections.js (HOME_FR_SECTION_ORDER).
 */
import { FIRST_LINK_DAYS, LAUNCH_COVER_DAYS, PRICE_SAAS_LABEL_FR, PRICE_SITE_LABEL_FR } from '../site.js'
import { productsPhrase } from './products.js'
import { typo } from './typo.js'

export const home = typo({
  meta: {
    // How the page is listed on the (English) 404 page.
    name: 'Version française',
    title: 'Développeur web et SaaS au Maroc, prix fixe | Ahmed Chioua',
    description: `Sites web et SaaS en quelques semaines, à prix fixe : un premier lien fonctionnel en ${FIRST_LINK_DAYS} jours, un prix et une date de lancement par écrit. Basé à Tétouan.`,
  },
  hero: {
    kicker: 'Pour les fondateurs qui veulent un produit lancé, pas « en cours »',
    h1: ['Votre site ou SaaS,', 'en ligne en quelques semaines.', 'Prix fixe.'],
    em: 'Date par écrit.',
    lead: `Un lien fonctionnel en ${FIRST_LINK_DAYS} jours. Une date de lancement sur laquelle vous pouvez compter. Un prix qui ne bouge pas. Développé par un ingénieur qui a passé neuf ans à livrer des logiciels en production pour Bell, BMW et Bayer.`,
    whatsapp: 'Écrivez-moi sur WhatsApp',
    facts: [
      { n: PRICE_SITE_LABEL_FR, l: 'Prix de départ d’un site vitrine, fixé par écrit' },
      { n: String(FIRST_LINK_DAYS), l: 'Jours jusqu’à votre premier lien fonctionnel' },
      { n: String(LAUNCH_COVER_DAYS), l: 'Jours de corrections après le lancement, inclus' },
      { n: '9+', l: 'Années de logiciels en production pour Bell, BMW et Bayer' },
    ],
  },
  services: {
    eyebrow: 'Services',
    title: 'Ce que je',
    em: 'construis',
    lead: 'Deux choses, faites de bout en bout. Cadrées dès le départ, livrées à une date convenue, et remises de façon à ce que vous puissiez les maintenir sans moi.',
    more: name => `${name} en détail`,
  },
  process: {
    eyebrow: 'Méthode',
    title: `Un lien fonctionnel en ${FIRST_LINK_DAYS} jours.`,
    em: 'Puis chaque semaine.',
    lead: 'Les agences disparaissent six semaines et reviennent avec une surprise. Vous ne pouvez pas dire « ce n’est pas ce que je voulais » avant que ce soit coûteux à corriger. Ici, chaque projet suit les mêmes quatre étapes, et vous le voyez avancer dès la première.',
  },
  proof: {
    eyebrow: 'Preuves',
    title: 'Ne me croyez pas sur parole.',
    em: 'Prenez deux minutes.',
    lead: `Je ne vous montrerai pas de logos clients que je n’ai pas mérités. Je vous montre ce que vous pouvez vérifier : ${productsPhrase}, ce site, son code source, et le parcours derrière.`,
  },
  pricing: {
    eyebrow: 'Tarifs',
    title: 'Fixe. Haut de gamme.',
    em: 'Chiffré une fois.',
    lead: 'Les montants ci-dessous sont des points de départ.',
    head: { scope: 'Prestation', from: 'À partir de' },
    rows: [
      { scope: 'Site vitrine ou landing page', from: PRICE_SITE_LABEL_FR },
      { scope: 'Produit SaaS ou MVP', from: PRICE_SAAS_LABEL_FR },
    ],
    cta: 'Fixer un prix et une date',
  },
  faq: {
    eyebrow: 'Questions',
    title: 'Des réponses',
    em: 'directes',
    ids: ['what', 'speed', 'cost', 'ownership', 'slip', 'location'],
  },
})
```

- [ ] **Step 7: Register French in `i18n.js` and `locale.js`**

`src/content/i18n.js`:

```js
import { ui as en } from './ui.js'
import { ui as fr } from './fr/ui.js'

const UI = { en, fr }
```

`src/content/locale.js`. Add these imports:

```js
import { services as frServices } from './fr/services.js'
import { faqs as frFaqs } from './fr/faqs.js'
import { steps as frSteps } from './fr/process.js'
import { productProof as frProductProof, proofItems as frProofItems, siteProof as frSiteProof } from './fr/proof.js'
```

and the `fr` entry:

```js
const CONTENT = {
  en: build('en', { services, faqs, steps, productProof, siteProof, proofItems }),
  fr: build('fr', {
    services: frServices, faqs: frFaqs, steps: frSteps,
    productProof: frProductProof, siteProof: frSiteProof, proofItems: frProofItems,
  }),
}
```

- [ ] **Step 8: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 36 tests. If the "same shape" test fails, the diff names the key missing from one side: add it there.

- [ ] **Step 9: Bring the spec in line with what the plan found**

In `docs/superpowers/specs/2026-10-10-french-pages-design.md`:
- Under "Content by locale", replace the `faqs.js` bullet with: `` `faqs.js`: French `q`/`a` for eight ids: the homepage's six, plus `ai-quality` and `after`, which the service pages ask for ``
- Add these bullets to the same list:
  - `` `products.js`: French product cards and the French "two products" phrase (kept apart from `proof.js`, which imports `routes.js`, to avoid an import cycle) ``
  - `` `typo.js`: French typography; every French module exports through it ``
- Replace the `contentFor` bullet with: `` `src/content/locale.js` exports `contentFor(locale)`; `src/content/i18n.js` exports `uiFor(locale)` (interface strings only), which is all the islands import, so the client bundle carries no page copy ``
- In the Pages table, change the `/fr` contents to: `Hero + facts strip, the two services, process, proof, price, FAQ (6 entries), contact` (the nav's order).

- [ ] **Step 10: Commit**

```bash
git add src/content/fr/ src/content/i18n.js src/content/locale.js scripts/lib/i18n.test.js docs/superpowers/specs/2026-10-10-french-pages-design.md
git commit -m "feat: French content modules, mirroring the English ones by id

Copy is a translation awaiting Ahmed's review.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Head helpers for language and hreflang

**Files:**
- Modify: `scripts/lib/pages.js`
- Test: `scripts/lib/pages.test.js`

**Interfaces:**
- Produces:
  - `rewriteHead(html, { url, title, description, jsonLd, og, lang?, ogLocale?, alternates? })`. `alternates` is `{ en: absoluteUrl, fr: absoluteUrl }`.
  - `addAlternates(html, alternates)`: inserts `hreflang` links for each language plus `x-default` (the `en` URL) before `</head>`. It returns the html unchanged when `alternates` is falsy.
  - `fillErrorPage` labels only `path === '/'` as "Homepage".

- [ ] **Step 1: Write the failing tests**

In `scripts/lib/pages.test.js`, add `addAlternates` to the import, and add `<meta property="og:locale" content="en_US" />` to `TEMPLATE` after the `og:type` line. Then append:

```js
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
```

Also change the `fillErrorPage` test's routes to add a French homepage, and assert its label:

```js
  const routes = [
    { path: '/', kind: 'home' },
    { path: '/services/a', kind: 'service', name: 'SaaS & MVP' },
    { path: '/fr', kind: 'home', name: 'Version française' },
  ]
```

```js
  assert.match(html, /<a href="\/fr">Version française<\/a>/)
```

Run: `npm test`
Expected: FAIL. `addAlternates` is not exported, the new rewriteHead test fails, and the 404 test prints "Homepage" for `/fr`.

- [ ] **Step 2: Implement it in `scripts/lib/pages.js`**

In `rewriteHead`, change the signature and add the optional fields before the `for` loop:

```js
export function rewriteHead(html, { url, title, description, jsonLd, og, lang, ogLocale, alternates }) {
```

```js
  // A page in another language than the template says so twice: to browsers and screen readers
  // (<html lang>) and to link-preview crawlers (og:locale).
  if (lang) fields.push([/<html lang="[^"]*">/, `<html lang="${escapeAttr(lang)}">`, '<html lang>'])
  if (ogLocale) fields.push([metaTag('property', 'og:locale'), `<meta property="og:locale" content="${escapeAttr(ogLocale)}" />`, 'og:locale'])
```

and after `html = html.replace(JSON_LD, '')`, add:

```js
  html = addAlternates(html, alternates)
```

Add the new export after `rewriteHead`:

```js
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
```

In `fillErrorPage`, label only the English homepage:

```js
    .map(r => `<a href="${escapeAttr(r.path)}">${escapeHtml(r.path === '/' ? 'Homepage' : r.name)}</a>`)
```

- [ ] **Step 3: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 39 tests.

- [ ] **Step 4: Commit**

```bash
git add scripts/lib/pages.js scripts/lib/pages.test.js
git commit -m "feat: head helpers set the page language and its hreflang links

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: French routes and pages

**Files:**
- Create: `src/pages/HomeFr.jsx`
- Modify: `src/content/routes.js`, `scripts/prerender.js`, `src/App.jsx`, `src/lib/sections.js`
- Test: `scripts/lib/routes.test.js`

**Interfaces:**
- Consumes: the `fr/*` modules (Task 3), `rewriteHead`/`addAlternates` (Task 4), `ServiceCard` and `PriceTable` (Task 2), and `useContent`.
- Produces:
  - Routes with `locale`, a twin `key` (`'home'`, `'service:<id>'`) and `alternates` (`{ en: path, fr: path }`) on paired pages.
  - `servicePath(slug, locale = 'en')`.
  - `homeFrSectionIndex`.
  - `HomeFr`.

- [ ] **Step 1: Write the failing tests**

In `scripts/lib/routes.test.js`, add these imports:

```js
import { services as frServices } from '../../src/content/fr/services.js'
```

Replace the test `'service paths have no trailing slash'` with:

```js
test('service paths have no trailing slash; French ones live under /fr', () => {
  for (const r of routes.filter(r => r.kind === 'service')) {
    assert.match(r.path, r.locale === 'fr' ? /^\/fr\/services\/[a-z0-9-]+$/ : /^\/services\/[a-z0-9-]+$/)
  }
})
```

Replace `routes.filter(r => r.kind !== 'home')` in the titles test with `routes.filter(r => r.path !== '/')`. Then append:

```js
test('the French pages are the homepage and both services, at French slugs', () => {
  const fr = routes.filter(r => r.locale === 'fr')
  assert.deepEqual(fr.map(r => r.path), ['/fr', '/fr/services/creation-site-web', '/fr/services/developpement-saas'])
  for (const r of fr) assert.match(r.path, /^\/fr(\/services\/[a-z0-9-]+)?$/)
  assert.equal(servicePath('developpement-saas', 'fr'), '/fr/services/developpement-saas')
})

test('twin pages name each other, and every alternate exists', () => {
  const paired = routes.filter(r => r.alternates)
  assert.equal(paired.length, 6)
  for (const r of paired) {
    assert.equal(r.alternates[r.locale], r.path, `${r.path} lists itself`)
    for (const path of Object.values(r.alternates)) assert.deepEqual(findRoute(path).alternates, r.alternates, `${r.path} -> ${path}`)
  }
  assert.deepEqual(findRoute('/').alternates, { en: '/', fr: '/fr' })
  assert.equal(findRoute('/work/this-site').alternates, undefined)
})

test('French structured data: French breadcrumbs, and the homepage FAQ matches the visible answers', () => {
  const svc = findRoute('/fr/services/creation-site-web').jsonLd['@graph']
  assert.deepEqual(svc[1].itemListElement[0], { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://ahmedchioua.com/fr' })
  const [page, faq] = findRoute('/fr').jsonLd['@graph']
  assert.equal(page.inLanguage, 'fr')
  assert.equal(faq['@type'], 'FAQPage')
  assert.equal(faq.mainEntity.length, 6)
  assert.equal(faq.mainEntity[0].name, 'Que construisez-vous exactement ?')
})

test('English and French routes cover the same services', () => {
  const ids = l => routes.filter(r => r.kind === 'service' && r.locale === l).map(r => r.id)
  assert.deepEqual(ids('fr'), ids('en'))
  assert.deepEqual(ids('fr'), frServices.map(s => s.id))
})
```

Run: `npm test`
Expected: FAIL. No route has `locale: 'fr'`, and `servicePath` ignores its second argument.

- [ ] **Step 2: Add the French routes to `src/content/routes.js`**

Replace the imports and the whole section from `breadcrumb` to the end of the file. `absoluteUrl`, `PROVIDER`, `serviceJsonLd` and `workJsonLd` stay, with the edits shown:

```js
import { CURRENCY_CODE, PERSON_ID, REPO_URL, SITE_URL } from './site.js'
import { services } from './services.js'
import { workLogs } from './work.js'
import { services as frServices } from './fr/services.js'
import { faqs as frFaqs } from './fr/faqs.js'
import { home as frHome } from './fr/home.js'
import { byId } from './byId.js'
import { uiFor } from './i18n.js'
```

Change `serviceJsonLd`'s signature to `(s, url, locale)`, and its last graph entry to `breadcrumb(s.name, url, locale),`.

Replace `breadcrumb` with:

```js
// Two levels: there is no /services or /work index page, and a "#services" fragment is the
// homepage URL to a search engine, so a middle crumb would point at the same page as the first.
// The first crumb is the homepage of the page's own language.
const breadcrumb = (name, url, locale = 'en') => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: uiFor(locale).crumbHome, item: absoluteUrl(uiFor(locale).home) },
    { '@type': 'ListItem', position: 2, name, item: url },
  ],
})
```

Add after `workJsonLd`:

```js
// The French homepage's own graph. The English homepage's is hand-written in index.html; this one
// names the page, its language and the person, and carries the French FAQ the page shows (same
// strings, so the structured data matches the visible answers).
const homeFrJsonLd = url => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: frHome.meta.title,
      description: frHome.meta.description,
      inLanguage: 'fr',
      about: PROVIDER,
    },
    {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      inLanguage: 'fr',
      mainEntity: frHome.faq.ids.map(byId(frFaqs, 'faqs (fr)')).map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
})

// English pages live at the root, French ones under /fr.
const PREFIX = { en: '', fr: '/fr' }

const serviceRoute = locale => s => {
  const path = `${PREFIX[locale]}/services/${s.slug}`
  return {
    path,
    kind: 'service',
    locale,
    key: `service:${s.id}`,
    id: s.id,
    slug: s.slug,
    name: s.name,
    summary: s.summary,
    title: s.title,
    description: s.description,
    jsonLd: serviceJsonLd(s, absoluteUrl(path), locale),
  }
}

const pages = [
  { path: '/', kind: 'home', locale: 'en', key: 'home' },
  ...services.map(serviceRoute('en')),
  // Build logs are English-only: no key, so no twin.
  ...workLogs.map(w => {
    const path = `/work/${w.slug}`
    return {
      path,
      kind: 'work',
      locale: 'en',
      slug: w.slug,
      name: w.name,
      summary: w.summary,
      title: w.title,
      description: w.description,
      jsonLd: workJsonLd(w, absoluteUrl(path)),
      og: { type: 'article', publishedTime: w.datePublished },
    }
  }),
  {
    path: '/fr',
    kind: 'home',
    locale: 'fr',
    key: 'home',
    name: frHome.meta.name,
    title: frHome.meta.title,
    description: frHome.meta.description,
    jsonLd: homeFrJsonLd(absoluteUrl('/fr')),
  },
  ...frServices.map(serviceRoute('fr')),
]

// A page that exists in both languages names both versions (hreflang), each by its own path.
// Twins share a key, so the two pages of a pair get the same set by construction.
export const routes = pages.map(r => {
  const twins = r.key ? pages.filter(p => p.key === r.key) : []
  return twins.length > 1 ? { ...r, alternates: Object.fromEntries(twins.map(t => [t.locale, t.path])) } : r
})

export function findRoute(path) {
  const route = routes.find(r => r.path === path)
  if (!route) throw new Error(`routes: no page at ${path}`)
  return route
}

export const servicePath = (slug, locale = 'en') => findRoute(`${PREFIX[locale]}/services/${slug}`).path
export const workPath = slug => findRoute(`/work/${slug}`).path
```

Add one line to the file's header comment: `French pages (src/content/fr/) are routes too, with a locale and, where an English twin exists, alternates.`

Run: `npm test`
Expected: PASS, 43 tests.

- [ ] **Step 3: Pass language and alternates through `scripts/prerender.js`**

Add `addAlternates` to the import from `./lib/pages.js`, then add above the loop:

```js
// og:locale per language; index.html declares en_US.
const OG_LOCALE = { en: 'en_US', fr: 'fr_FR' }
const absolute = alternates => alternates && Object.fromEntries(Object.entries(alternates).map(([l, p]) => [l, absoluteUrl(p)]))
```

and replace the `head` computation:

```js
    // The English homepage keeps index.html's hand-written head and only gains its hreflang links.
    const head = route.path === '/'
      ? addAlternates(template, absolute(route.alternates))
      : rewriteHead(template, {
        url,
        title: route.title,
        description: route.description,
        jsonLd: route.jsonLd,
        og: route.og,
        lang: route.locale,
        ogLocale: OG_LOCALE[route.locale],
        alternates: absolute(route.alternates),
      })
```

Update the header comment's paragraph "The homepage keeps index.html's hand-written head." to: `The English homepage keeps index.html's hand-written head (plus its hreflang links). Every other route, the French homepage included, starts from the same built template…` and keep the rest of the paragraph as it is.

- [ ] **Step 4: Number the French homepage's sections in `src/lib/sections.js`**

Append:

```js
/** The numbered sections of the French homepage (src/pages/HomeFr.jsx), in render order. */
export const HOME_FR_SECTION_ORDER = ['services', 'process', 'proof', 'pricing', 'faq', 'contact']

export const homeFrSectionIndex = indexIn(HOME_FR_SECTION_ORDER, 'homeFrSectionIndex')
```

- [ ] **Step 5: Write `src/pages/HomeFr.jsx`**

```jsx
import { Fragment } from 'react'
import { Eyebrow as SharedEyebrow } from '../components/Eyebrow'
import { ServiceCard } from '../components/Services'
import { Step } from '../components/Process'
import { ProofItem } from '../components/Proof'
import { PriceTable } from '../components/Pricing'
import { FaqRow } from '../components/Faq'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { home } from '../content/fr/home'
import { servicePath } from '../content/routes'
import { BOOKING_URL } from '../content/site'
import { useContent } from '../lib/content-context'
import { homeFrSectionIndex as idx } from '../lib/sections'
import { spansLastRow } from '../lib/grid'

const Eyebrow = ({ label, id }) => <SharedEyebrow label={label} index={idx(id)} />

/**
 * The French homepage, for buyers in Morocco who search in French. Shorter than the English one
 * (no Experience, About or hand-off) and built from the same row components and classes, so the
 * two read as one site. The hero has no portrait: its preload belongs to the English homepage's
 * head. Copy is in src/content/fr/home.js; Contact closes the page via App.jsx. Section order is
 * declared in src/lib/sections.js (HOME_FR_SECTION_ORDER); keep both in step.
 */
const HomeFr = () => {
  const { ui, services, steps, proof, faqById } = useContent()
  const { hero } = home
  const faqs = home.faq.ids.map(faqById)

  return (
    <>
      <section id="hero" className="section svc-hero">
        <p className="ed-kicker">{hero.kicker}</p>
        <h1 className="ed-h1">
          {hero.h1.map(line => <Fragment key={line}>{line}<br /></Fragment>)}
          <em>{hero.em}</em>
        </h1>
        <p className="ed-lead">{hero.lead}</p>
        <div className="ed-cta-row">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">{ui.cta.long}</a>
          <a href={ui.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-wa">
            <WhatsAppIcon />
            {hero.whatsapp}
          </a>
        </div>
        <dl className="svc-facts">
          {hero.facts.map(f => (
            <div key={f.l}>
              <dt>{f.l}</dt>
              <dd>{f.n}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="services" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={home.services.eyebrow} id="services" />
          <h2 className="sec-title">{home.services.title} <em>{home.services.em}</em></h2>
          <p className="sec-lead">{home.services.lead}</p>
        </div>
        <div className="hair-grid ed-svc-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} href={servicePath(s.slug, 'fr')} more={home.services.more(s.name)} />
          ))}
        </div>
      </section>

      <section id="process" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={home.process.eyebrow} id="process" />
          <h2 className="sec-title">{home.process.title} <em>{home.process.em}</em></h2>
          <p className="sec-lead">{home.process.lead}</p>
        </div>
        <div className="ed-steps">
          {steps.map((s, i) => <Step key={s.title} s={s} i={i} />)}
        </div>
      </section>

      <section id="proof" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={home.proof.eyebrow} id="proof" />
          <h2 className="sec-title">{home.proof.title} <em>{home.proof.em}</em></h2>
          <p className="fade-in sec-lead">{home.proof.lead}</p>
        </div>
        <div className="hair-grid ed-proof-grid">
          {proof.all.map((it, i) => <ProofItem key={it.title} it={it} i={i} wide={spansLastRow(proof.all, i)} />)}
        </div>
      </section>

      <section id="pricing" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={home.pricing.eyebrow} id="pricing" />
          <h2 className="sec-title">{home.pricing.title} <em>{home.pricing.em}</em></h2>
          <p className="sec-lead">{home.pricing.lead} {ui.offer.promise}</p>
        </div>
        <PriceTable head={home.pricing.head} rows={home.pricing.rows} />
        <p className="ed-price-note">{ui.offer.movers}</p>
        <div className="ed-cta-row svc-price-cta">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">{home.pricing.cta}</a>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={home.faq.eyebrow} id="faq" />
          <h2 className="sec-title">{home.faq.title} <em>{home.faq.em}</em></h2>
        </div>
        <div className="ed-faq-grid">
          {faqs.map(f => <FaqRow key={f.id} f={f} />)}
        </div>
      </section>
    </>
  )
}

export default HomeFr
```

- [ ] **Step 6: Route the French homepage in `src/App.jsx`**

Add these imports: `import HomeFr from './pages/HomeFr'`, and `homeFrSectionIndex` to the `./lib/sections` import. Then extend the table and the lookup:

```jsx
// Each route kind's page and section numbering, in one place so a new kind can't get one without
// the other. "kind:locale" entries override a kind for one language.
const PAGE_TYPES = {
  home: { render: () => <Home />, index: sectionIndex },
  'home:fr': { render: () => <HomeFr />, index: homeFrSectionIndex },
  service: { render: r => <ServicePage id={r.id} />, index: serviceSectionIndex },
  work: { render: r => <WorkPage slug={r.slug} name={r.name} />, index: workSectionIndex },
}
```

```jsx
  const type = PAGE_TYPES[`${route.kind}:${route.locale}`] ?? PAGE_TYPES[route.kind]
```

- [ ] **Step 7: Build and check the output**

Run: `npm test && npm run lint && npm run build`
Expected: tests and lint pass, and the build prints 7 pages: `/`, the 2 services, `/work/this-site`, `/fr`, and `/fr/services/creation-site-web` and `/fr/services/developpement-saas`. The output also includes `sitemap.xml: 7 URLs` and `_redirects: 6 trailing-slash rules`.

Run: `grep -o '<html lang="[a-z]*">\|hreflang="[a-z-]*" href="[^"]*"\|og:locale" content="[a-z_A-Z]*"' dist/fr.html dist/index.html dist/fr/services/developpement-saas.html dist/services/saas-mvp-development.html`
Expected:
- `dist/fr.html` and `dist/fr/services/developpement-saas.html`: `lang="fr"` and `fr_FR`.
- `dist/index.html` and `dist/services/saas-mvp-development.html`: `lang="en"` and `en_US`.
- Each file has three hreflang links (`en`, `fr`, `x-default` = the English URL), and both twins of a pair list identical URLs.

- [ ] **Step 8: Commit**

```bash
git add src/content/routes.js scripts/prerender.js src/lib/sections.js src/pages/HomeFr.jsx src/App.jsx scripts/lib/routes.test.js
git commit -m "feat: French homepage and service pages, paired with their English twins by hreflang

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Islands in French, and the language switch

**Files:**
- Modify: `src/App.jsx`, `src/components/Header.jsx`, `src/components/Contact.jsx`, `src/index.css`

**Interfaces:**
- Consumes: `uiFor` and route `alternates`.
- Produces:
  - Header island `data-props`: `{ locale, switchHref }`.
  - Contact island `data-props`: `{ index, locale }`.
  - `Header({ locale, switchHref })` renders `<a class="ed-lang">`.

- [ ] **Step 1: Serialise the islands' locale in `src/App.jsx`**

Add the import `import { uiFor } from './content/i18n'`, and above `function App`:

```jsx
// The header's language switch goes to this page in the other language, or to that language's
// homepage when the page has no twin (a build log).
const OTHER = { en: 'fr', fr: 'en' }
```

In `App`, replace the props and the header island:

```jsx
  const other = OTHER[route.locale]
  const headerProps = { locale: route.locale, switchHref: route.alternates?.[other] ?? uiFor(other).home }
  // Contact closes every page; its eyebrow number continues the page type's own section order.
  const contactProps = { index: type.index('contact'), locale: route.locale }
```

```jsx
        <div id={ISLAND.header} data-props={JSON.stringify(headerProps)} style={{ display: 'contents' }}>
          <Header {...headerProps} />
        </div>
```

Update the comment block: change "Contact's props differ per page (its eyebrow index), so they are serialised into data-props" to "Both islands' props differ per page (the language, the switch target, Contact's eyebrow index), so they are serialised into data-props".

- [ ] **Step 2: Add the switch to `src/components/Header.jsx`**

Change the signature to `const Header = ({ locale = 'en', switchHref }) => {` and replace the `<nav className="ed-nav">…</nav>` and `<button className="ed-burger" …>…</button>` with:

```jsx
      <div className="ed-head-end">
        <nav className="ed-nav">
          {ui.nav.map(l => (
            <a key={l.name} href={l.href} className={l.accent ? 'accent' : ''}>{l.name}</a>
          ))}
        </nav>

        {/* Outside the nav, so it stays visible on phones, where the nav collapses into the menu. */}
        {switchHref && (
          <a href={switchHref} hrefLang={ui.switchTo.lang} lang={ui.switchTo.lang} aria-label={ui.switchTo.name} className="ed-lang">
            {ui.switchTo.label}
          </a>
        )}

        <button className="ed-burger" aria-label={ui.menu} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
```

- [ ] **Step 3: Style the switch in `src/index.css`**

After the `.ed-nav a.accent` rule (line 240), add:

```css
.ed-head-end { display: flex; align-items: center; gap: 26px; }
/* The language switch: a small mono tag, sized as a 32px target. */
.ed-lang {
  display: inline-flex; align-items: center; min-height: 32px; padding: 0 10px;
  font-family: var(--mono); font-size: 0.72rem; letter-spacing: 0.08em;
  color: var(--ink-2); border: 1px solid var(--hair);
  transition: color var(--transition), border-color var(--transition);
}
.ed-lang:hover { color: var(--ink); border-color: var(--ink-2); }
```

and inside the existing `@media (max-width: 860px)` block, add `.ed-head-end { gap: 14px; }`.

Check that the custom properties exist: `grep -n -- '--mono:\|--hair:\|--ink-2:\|--transition:' src/index.css` must print all four. If `--mono` has another name, use the name the `.eyebrow` rule's `font-family` uses.

- [ ] **Step 4: French validation messages in `src/components/Contact.jsx`**

Add above `const Contact`:

```jsx
// The browser words its validation bubble in its own language, not the page's. Where the ui
// strings set messages (the French pages), the form uses them instead. A custom message makes the
// field invalid until it is cleared, so it is cleared on every input.
const validity = invalid => invalid && {
  onInvalid: e => {
    const f = e.target
    f.setCustomValidity(f.validity.typeMismatch ? invalid.email : invalid.required)
  },
  onInput: e => e.target.setCustomValidity(''),
}
```

In the component body, add `const check = validity(t.invalid)` after `const t = ui.contact`. Then add `{...check}` to each of the four fields:

```jsx
            <div className="ed-fg"><label>{t.fields.name.label}</label><input name="name" placeholder={t.fields.name.placeholder} required {...check} /></div>
            <div className="ed-fg"><label>{t.fields.email.label}</label><input type="email" name="email" placeholder={t.fields.email.placeholder} required {...check} /></div>
```

```jsx
          <div className="ed-fg"><label>{t.fields.subject.label}</label><input name="subject" placeholder={t.fields.subject.placeholder} required {...check} /></div>
          <div className="ed-fg"><label>{t.fields.message.label}</label><textarea name="message" rows="5" placeholder={t.fields.message.placeholder} required {...check} /></div>
```

- [ ] **Step 5: Build and check the islands' props and the client bundle**

Run: `npm test && npm run lint && npm run build`
Expected: all pass, 7 pages.

Run: `grep -o 'id="island-[a-z]*" data-props="[^"]*"' dist/fr.html dist/work/this-site.html dist/services/website-development.html`
Expected:
- `/fr`: header `{&quot;locale&quot;:&quot;fr&quot;,&quot;switchHref&quot;:&quot;/&quot;}`; contact `locale` `fr`.
- `/work/this-site`: switch `/fr`.
- `/services/website-development`: switch `/fr/services/creation-site-web`.

Run: `ls -l dist/assets/hydrate-*.js`, and `grep -c 'Que construisez' dist/assets/*.js`
Expected: the hydrate chunk grew by a few kB at most (the ui strings), and the count is `0` for every asset: no page copy leaked into the client bundle.

- [ ] **Step 6: Commit**

```bash
git add src/App.jsx src/components/Header.jsx src/components/Contact.jsx src/index.css
git commit -m "feat: header and contact hydrate in the page's language; EN/FR switch

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Verify, then open the PR

**Files:**
- No source changes, unless a check fails. Then fix the cause, commit it, and re-run the failed check.

- [ ] **Step 1: Diff the English pages against the Task 2 snapshot**

Run: `node node_modules/.fr-baseline/snap.mjs node_modules/.fr-baseline/final && diff -r node_modules/.fr-baseline/before node_modules/.fr-baseline/final`
Expected, and nothing else:
- `index` and both English service pages gain three `<link rel="alternate" hreflang=…>` lines.
- Every English page gains the header island's `data-props`, the `ed-head-end` wrapper, the `ed-lang` link and `"locale":"en"` in Contact's `data-props`.
- `404` gains three links: Version française, Création de site web, Développement SaaS et MVP.

- [ ] **Step 2: Serve the build like production**

Run in the background: `npx wrangler pages dev dist --port 8811 --ip 127.0.0.1` (if 8811 is taken, pick another fresh port and use it below).

```bash
for p in /fr /fr/services/creation-site-web /fr/services/developpement-saas / /services/website-development; do
  printf '%s ' "$p"; curl -s -o /dev/null -w '%{http_code}\n' "http://127.0.0.1:8811$p"; done
for p in /fr/ /fr/services/creation-site-web/; do
  printf '%s ' "$p"; curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' "http://127.0.0.1:8811$p"; done
curl -s -o /dev/null -w '/fr/services/nope %{http_code}\n' http://127.0.0.1:8811/fr/services/nope
curl -s http://127.0.0.1:8811/sitemap.xml | grep -c '<loc>'
curl -s http://127.0.0.1:8811/llms.txt | grep '/fr/services/'
```

Expected:
- The five pages answer `200`.
- Both slash forms answer `308`, to the path without the slash.
- `/fr/services/nope` answers `404`.
- The sitemap has `7` URLs, and `llms.txt` lists both French service pages.
- The requests appear in the wrangler log. If they don't, another server answered: change the port.

- [ ] **Step 3: Check that the islands hydrate in French, in the browser**

Using the chrome-devtools MCP, open `http://127.0.0.1:8811/fr` and confirm:
1. `document.documentElement.lang === 'fr'`, and the console has no hydration error (no `Hydration failed` / `did not match` message).
2. Emulate a 390×844 viewport, tap the menu button, and check that the menu lists Services, Méthode, Preuves, Tarifs, FAQ, Réserver un créneau. Tap again to close it.
3. Run `document.querySelector('#contact form').reportValidity()`, then read `document.querySelector('input[name=name]').validationMessage`. Expected: `Veuillez remplir ce champ.`
4. Click into the name field first and wait until the network list shows the `hydrate-…js` chunk loaded: before hydration, a submit is the browser's native GET, not the island's. Then run `window.fetch = () => Promise.resolve(new Response('', { status: 500 }))`, fill the four fields with test text, and submit. The button reads `✗ Échec, réessayer`. Reload, and repeat with `status: 200`: the button reads `✓ Message envoyé`. The stubbed fetch means no email is sent.
5. On `/services/website-development`, the `FR` switch leads to `/fr/services/creation-site-web`, and its `EN` switch leads back.

Take screenshots of `/fr` (390px and 1280px wide), of `/fr/services/developpement-saas` (390px) and of the English homepage header (1280px and 390px). Check the hero h1, the WhatsApp button and the switch for overflow, wrapping and alignment. Fix anything that looks broken before continuing.

- [ ] **Step 4: Lighthouse on the French pages**

```bash
for p in fr fr/services/creation-site-web fr/services/developpement-saas; do
  npx -y lighthouse@12 "http://127.0.0.1:8811/$p" --only-categories=accessibility,best-practices,seo \
    --form-factor=mobile --chrome-flags="--headless=new" --output=json --output-path="node_modules/.fr-baseline/lh-${p//\//_}.json" --quiet
  node -e "const r=require('./node_modules/.fr-baseline/lh-${p//\//_}.json');console.log('$p',Object.values(r.categories).map(c=>c.id+' '+Math.round(c.score*100)).join(', '))"
done
```

Expected: `accessibility 100, best-practices 100, seo 100` on all three pages. Run the same for `/` and confirm that the English homepage still scores 100 on all three categories.

- [ ] **Step 5: Stop the server and generate the copy-review table**

Stop the wrangler background task. Create `node_modules/.fr-baseline/copy-review.mjs`:

```js
// Prints every French string beside its English source, as a Markdown table, for the PR.
import { ui } from '../../src/content/ui.js'
import { ui as frUi } from '../../src/content/fr/ui.js'
import { services } from '../../src/content/services.js'
import { services as frServices } from '../../src/content/fr/services.js'
import { faqById } from '../../src/content/faqs.js'
import { faqs as frFaqs } from '../../src/content/fr/faqs.js'
import { steps } from '../../src/content/process.js'
import { steps as frSteps } from '../../src/content/fr/process.js'
import { proofItems } from '../../src/content/proof.js'
import { proofItems as frProof } from '../../src/content/fr/proof.js'
import { home as frHome } from '../../src/content/fr/home.js'

const flat = (key, v) => typeof v === 'function' ? flat(key, v('{x}'))
  : Array.isArray(v) ? v.flatMap((x, i) => flat(`${key}[${i}]`, x))
    : v && typeof v === 'object' ? Object.entries(v).flatMap(([k, x]) => flat(key ? `${key}.${k}` : k, x))
      : typeof v === 'string' ? [[key, v]] : []
const cell = s => s.replace(/\|/g, '\\|').replace(/ | /g, ' ')
const rows = []
const both = (label, en, fr) => {
  const source = new Map(flat('', en))
  for (const [k, f] of flat('', fr)) {
    const e = source.get(k) ?? '(no English source: French homepage)'
    if (e === f || /^(https?:|\/|#|mailto:)/.test(f)) continue
    rows.push(`| ${label} \`${k}\` | ${cell(e)} | ${cell(f)} |`)
  }
}
both('ui', ui, frUi)
services.forEach((s, i) => both(`service ${s.id}`, s, frServices[i]))
for (const f of frFaqs) both(`faq ${f.id}`, faqById(f.id), f)
both('process', steps, frSteps)
both('proof', proofItems, frProof)
both('home', {}, frHome)
console.log(['| Where | English | Français |', '|---|---|---|', ...rows].join('\n'))
```

Run: `node node_modules/.fr-baseline/copy-review.mjs > node_modules/.fr-baseline/copy-review.md && wc -c node_modules/.fr-baseline/copy-review.md`
Expected: a table of a few hundred rows, under 60,000 characters (GitHub's PR body limit is 65,536).

- [ ] **Step 6: Push and open the PR**

Write `node_modules/.fr-baseline/pr-body.md` with:
- **Summary:** what ships (3 French pages, hreflang pairs, French islands, EN/FR switch).
- **How:** `ui.js`/`i18n.js`/`locale.js`, the context, routes with `alternates`, `rewriteHead` options.
- **Verification:**
  - test count;
  - the English diff (only hreflang, switch and props);
  - the wrangler status codes;
  - the hydration checks;
  - the Lighthouse scores per page.
- **For Ahmed to decide:**
  - Approve the French copy (table below).
  - The FitPal Coach card translates the existing "socle open source (openGym)" wording, which he chose to keep in English. Say if the French page should drop it.
  - The French homepage's `<title>` targets "développeur web … Maroc".
- **Copy review:** the contents of `copy-review.md`.
- The line `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.

```bash
git push -u origin feat/french-pages
gh pr create --base main --head feat/french-pages --title "French pages: /fr homepage and service pages with hreflang" --body-file node_modules/.fr-baseline/pr-body.md
```

Expected: the PR URL is printed.

- [ ] **Step 7: Check URL handling on the Cloudflare preview deploy**

`/fr` is the first page served from a `.html` file that sits beside a directory of the same name (`dist/fr.html` and `dist/fr/`). Wrangler is not production-faithful on URL handling (see the hosting memory), so check the branch's preview deploy. Find its URL with `npx wrangler pages deployment list --project-name ahmed-portfolio --environment preview`, or from the Cloudflare check on the PR. Then run the Step 2 status loop against it. Expected: the same codes as under wrangler (`/fr` 200, `/fr/` 308 to `/fr`, `/fr/services/nope` 404). If `/fr` redirects or 404s there, stop and report it before merging.

Report the PR URL to Ahmed with the Lighthouse scores, the preview results and the open decisions.

After the merge, which is Ahmed's call: wait for the production deploy (`npx wrangler pages deployment list --project-name ahmed-portfolio --environment production`). Check five consecutive live `200` responses on each French URL and a `308` on its slash form on the live site. Then offer to request indexing in Google Search Console and Bing, and to ping IndexNow for the three French URLs and the two English service pages (their heads changed).
