# ahmedchioua.com

The source for my portfolio — and the working sample for the kind of work I do.

If you landed here from the site's *Proof* section: this is the thing. It's public precisely so
you can check the claims rather than take them on faith. Read the components, the structured data,
the build config, the commit history.

**Live:** [ahmedchioua.com](https://ahmedchioua.com)

## Lighthouse

Measured on the production build, mobile:

| Category | Score |
|---|---|
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| Agentic Browsing | 100 |

Zero failed audits. Reproduce it yourself: `npm run build && npm run preview`, then run Lighthouse
against the preview URL.

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
index.html              meta, JSON-LD (Person/Service/FAQPage/WebSite), no-JS crawler fallback
public/llms.txt         structured summary for AI crawlers
src/index.css           design tokens + shared editorial primitives
src/App.jsx             section composition, lazy boundaries
src/hooks/useFadeIn.js  IntersectionObserver scroll reveal
src/components/
  Header · Hero · TrustStrip · Services · Process · Proof
  Experience · Summary (About) · Faq · Contact · Footer
```

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

## Notes

`AmbientBackground.jsx`, `MatrixRain.jsx`, `Skills.jsx`, `Education.jsx` and `Calendly.jsx` are
retained but not mounted — earlier design passes kept around for reference.

---

Built by [Ahmed Chioua](https://ahmedchioua.com) · [LinkedIn](https://linkedin.com/in/ahmedchioua)
