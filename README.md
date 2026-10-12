# ahmedchioua.com

The source for my portfolio — and the working sample for the kind of work I do.

If you landed here from the site's *Proof* section: this is the thing. It's public precisely so
you can check the claims rather than take them on faith. Read the components, the structured data,
the build config, the commit history.

**Live:** [ahmedchioua.com](https://ahmedchioua.com)

## Lighthouse

Measured on the production build, mobile emulation:

| Category | Score |
|---|---|
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| Agentic Browsing | 100 |

Zero failed audits across those four categories.

**Performance is not in that table** — the automated run used to produce it excludes the category,
so quoting a number would be inventing one. What was measured directly, on a local production
build without throttling:

| Core Web Vital | Observed |
|---|---|
| LCP | 200 ms |
| CLS | 0.00 |
| INP | 45 ms |

Those are lab numbers on localhost. Real-world figures will be worse — network latency, Google
Fonts, and the hero image all cost something over the wire. Treat CLS 0.00 as the meaningful one:
it's a structural property of the layout, not an artefact of a fast connection.

Reproduce any of it yourself: `npm run build && npm run preview`, then run Lighthouse against the
preview URL.

## Stack

- **React 19** + **Vite 7** — no framework beyond that, no UI kit
- **Hand-written CSS** — design tokens in `src/index.css`, component styles colocated in each
  component. No Tailwind, no CSS-in-JS runtime, no page builder.
- **Framer Motion** for the few places motion earns its place
- Deployed on **Cloudflare Pages** (headers in `public/_headers`, trailing-slash redirects generated into `dist/_redirects` from the route table; unknown paths get `dist/404.html` (built from `src/404.html`, page links filled from the route table) with a real 404 status). Contact form posts to a Pages Function (`functions/api/contact.js`) that forwards via Resend
- IndexNow key: `public/ad4aaf3bb72b340890815dca2923b919.txt` (served at the site root). Bing, Yandex and other IndexNow engines fetch it to confirm URL submissions come from the site owner. Do not delete or rename it; changing the key means resubmitting with the new one.

JS shipped: **~65 kB gzipped on first paint** (React + Framer Motion + hero), with each section
below the fold split into its own chunk — ~14 kB more across all nine, loaded as you scroll.

## Design system

The site is set as a **scope document**: the contract the buyer receives. A cover (parties,
revision, key terms), a preamble, numbered clauses (§ 1–§ 6), lettered annexes (A–C) and a
signature block. `DESIGN.md` is the locked system; every token lives in `src/index.css`
(OKLCH, tinted toward the brand teal):

| Token | Value | Use |
|---|---|---|
| `--color-desk` | `oklch(94.6% 0.008 190)` | the ground around the sheet |
| `--color-paper` | `oklch(98.8% 0.004 190)` | the sheet |
| `--color-ink` | `oklch(19% 0.012 190)` | text, heavy rules |
| `--color-ink-2` | `oklch(35% 0.012 190)` | secondary text, the soft half of headings |
| `--color-muted` | `oklch(47% 0.012 190)` | mono labels and meta (6.6:1 on paper) |
| `--color-rule` | `oklch(86% 0.008 190)` | hairlines between rows |
| `--color-accent` | `oklch(43.8% 0.074 182)` | the brand teal (#0e5f55): numbers, links, states |

Type: **Archivo** (display 800/700, body 400; one variable file) · **JetBrains Mono** 500 (the
reference voice: clause numbers, labels, the revision line). Two self-hosted files, ~31 KB.
No scroll animation: only hover and focus states move.

## Structure

```
index.html              meta + JSON-LD (business/Person/Service/WebSite)
vite.config.js          build config + generated JSON-LD (FAQPage, product nodes) and llms.txt
scripts/prerender.js    injects rendered markup into dist/index.html; writes each page's .md twin
scripts/lib/markdown.js page HTML -> Markdown, for agents (and 404.md)
edge/negotiate.js       Accept: text/markdown -> the .md twin, Vary/Link/406/404 handling
functions/_middleware.js runs it on every request public/_routes.json sends to Functions
src/content/faqs.js     FAQ copy — single source for the section and the FAQPage schema
src/content/products.js shipped products — single source for Proof cards, schema nodes and llms.txt
src/content/llms.txt    llms.txt template (product and FAQ placeholders filled at build)
src/index.css           design tokens + the scope-document styles (see DESIGN.md)
src/App.jsx             section composition
src/main.jsx            client entry — hydrates the prerendered markup
src/entry-server.jsx    build-time server entry (renderToString)
src/content/faqs.js     single source of truth for FAQ copy (page + schema)
src/components/
  Doc.jsx                 the document primitives: cover, clause, spec list, key terms
  rows.jsx                content → spec-list rows, shared by the pages
  Header (running head) · Hero (cover) · Benefits (preamble) · Services · Process
  Pricing · Handoff · Faq (§ 5–6) · Proof · Experience · Summary (annexes A–C)
  Contact (signature block) · Footer (colophon)
src/lib/sections.js     clause and annex numbering per page type
```

### Prerendering

`npm run build` runs three steps: the client build, an SSR build of
`src/entry-server.jsx`, then `scripts/prerender.js`, which renders the app to a string and injects
it into `dist/index.html`. The client entry hydrates that markup rather than rendering into an
empty root.

This matters for two reasons. The page paints from HTML instead of waiting for the bundle to parse
— the previous build shipped an empty `<div id="root">`, so nothing was visible until JavaScript
executed. And crawlers that don't run JavaScript, including several AI crawlers, now see the real
content rather than an empty shell (which is why the old hand-written `<noscript>` mirror could be
dropped).

Sections are imported statically for this reason: `React.lazy` suspends during `renderToString`,
which would prerender empty fallbacks and mismatch on hydration.

### FAQ copy

Google requires `FAQPage` answer text to match the answer visible on the page. Rather than
maintain two copies, `src/content/faqs.js` is the only source: `Faq.jsx` renders from it, and a
small Vite plugin generates the JSON-LD from the same strings at build time. Edit the copy there
and both stay in sync by construction.

## Accessibility

Every text/background pair meets WCAG AA. Scroll reveals are disabled under
`prefers-reduced-motion`, and revealed content is present in the DOM regardless of animation state,
so it's available to crawlers and assistive tech immediately.

## Running it

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # production build to dist/
npm run preview  # serve the production build
npm run lint
```

---

Built by [Ahmed Chioua](https://ahmedchioua.com) · [LinkedIn](https://linkedin.com/in/ahmedchioua)
