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
- Deployed on **Netlify** (contact form uses Netlify Forms)

JS shipped: **~65 kB gzipped on first paint** (React + Framer Motion + hero), with each section
below the fold split into its own chunk — ~14 kB more across all nine, loaded as you scroll.

## Design system

Editorial, warm-paper light theme. Tokens live in `src/index.css`:

| Token | Value | Use |
|---|---|---|
| `--paper` | `#faf7f2` | page background |
| `--paper-card` | `#fffdf9` | card surface |
| `--paper-raised` | `#f1ece2` | raised panel |
| `--ink` | `#1a1c1a` | primary text, heavy rules |
| `--ink-2` | `#4a4d49` | secondary text |
| `--ink-muted` | `#64665f` | mono meta — WCAG AA on every surface used |
| `--teal` | `#0e5f55` | accent |
| `--hair` | `#e2ddd3` | hairline borders |

Type: **Newsreader** (serif display) · **Archivo** (sans) · **IBM Plex Mono** (labels and meta).
Fonts load async and non-render-blocking, with critical CSS inlined in `index.html`.

Sections are numbered `( 01 )`–`( 07 )` and separated by hairline rules — the grid gaps are 1px
`background` bleed via `.hair-grid` rather than borders.

## Structure

```
index.html              meta + JSON-LD (Person/Service/WebSite)
vite.config.js          build config + generated JSON-LD (FAQPage, product nodes) and llms.txt
scripts/prerender.js    injects rendered markup into dist/index.html
src/content/faqs.js     FAQ copy — single source for the section and the FAQPage schema
src/content/products.js shipped products — single source for Proof cards, schema nodes and llms.txt
src/content/llms.txt    llms.txt template (product and FAQ placeholders filled at build)
src/index.css           design tokens + shared editorial primitives
src/App.jsx             section composition
src/main.jsx            client entry — hydrates the prerendered markup
src/entry-server.jsx    build-time server entry (renderToString)
src/content/faqs.js     single source of truth for FAQ copy (page + schema)
src/hooks/useFadeIn.js  IntersectionObserver scroll reveal
src/components/
  Header · Hero · TrustStrip · Services · Process · Proof
  Experience · Summary (About) · Faq · Contact · Footer
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
