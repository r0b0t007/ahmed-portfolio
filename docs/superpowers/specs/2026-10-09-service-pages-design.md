# Service pages: design

Date: 2026-10-09 · Status: approved; implemented on `feat/service-pages`

## Goal

Give the site its first URLs beyond `/`, so it can rank for searches the one-page site can't
cover. Ship two service pages and the multi-route build that every later page (`/work/*`,
`/fr/*`, `/notes/*`) will reuse.

Out of scope: `/work/*` build logs (they need facts from Ahmed), French pages, articles, the
deferred spec-sheet redesign, and any change to the homepage beyond links.

## Decisions taken

| Decision | Choice | Why |
|---|---|---|
| First batch | Two service pages | Written from already-approved copy; highest buying intent |
| Visual system | Current editorial classes in `src/index.css` | One consistent site; the spec-sheet redesign later restyles every page through the shared stylesheet |
| Build approach | One HTML template plus a route table (approach A) | Canonical and sitemap are derived from the path and can't drift. Rejected: hand-written HTML per page (head duplication) and Astro (premature until `/notes/`) |
| URL shape | `/services/<slug>`, no trailing slash | Clean, matches the audit plan. Written as `<slug>.html`, which Pages serves at the extensionless URL (verify with wrangler) |

## Pages

| | Website page | SaaS / MVP page |
|---|---|---|
| Path | `/services/website-development` | `/services/saas-mvp-development` |
| `<title>` | `Website Development, Fixed Price \| Ahmed Chioua` | `SaaS & MVP Development, Fixed Price \| Ahmed Chioua` |
| Price floor | `PRICE_SITE_LABEL` (€3,000) | `PRICE_SAAS_LABEL` (€12,000) |
| Typical timeline | 2 to 3 weeks | 4 to 6 weeks |
| Proof block | This site (Lighthouse 100s, public source) | PawPawCare and FitPal, from `products.js` |

Meta descriptions stay under 160 characters and state price floor, first link in
`FIRST_LINK_DAYS` days, and the date in writing.

### Section order (both pages)

1. **Breadcrumb**: Home › Services › page name. Links to `/` and `/#services`.
2. **Hero**: one `<h1>` that leads with the search term, a lead sentence, a fact strip
   (price floor · typical timeline · first link on day `FIRST_LINK_DAYS` ·
   `LAUNCH_COVER_DAYS` days of cover) and the booking CTA (`CTA_LABEL`, `BOOKING_URL`).
3. **What you get**: deliverables, drawn from the homepage service tags and the Handoff items.
4. **How the weeks run**: the four Process steps (Scope, Build, Ship, Hand over) set against
   this service's timeline.
5. **Price**: the floor, what it covers (wording from the "What does it cost?" FAQ), the
   founding-client offer, and a short **new** "what moves the number" list.
6. **Proof**: as in the table above. No new claims.
7. **FAQ**: 4 to 5 existing entries from `src/content/faqs.js`, selected by question, so the
   wording can't drift from the homepage.
8. **Contact**: the existing `Contact` island.

Target length: 700 to 1,000 words per page.

### Copy rules

- Every number comes from `src/content/site.js` constants, never typed into JSX.
- No client results, testimonials, revenue claims or new commitments. New wording (H1s, leads,
  one framing paragraph per page, the "what moves the number" lists) is drafted by Claude and
  flagged in the PR for Ahmed's review.
- No "not included / not a fit" section in this batch; it would create new commitments.

## Architecture

### Route table: `src/content/routes.js`

A single list consumed by the server entry, the prerender script and the sitemap generator.
Each entry: `path`, `title`, `description`, `component`, `jsonLd` (built from `site.js` and
`products.js`), and `breadcrumb`. The homepage is the first entry; its head stays the
hand-written one in `index.html`.

### Rendering

- `src/entry-server.jsx`: `render(path)` looks the path up and renders `<App page={...} />`.
  An unknown path throws, so a typo fails the build.
- `src/App.jsx`: keeps Header, Footer and the two island wrappers on every page. The homepage
  sections become a `Home` component; service pages render their own component inside `<main>`.
- The Contact island takes an `index` prop (its eyebrow number differs per page), serialised
  into `data-props` on its wrapper and read back by `hydrate.jsx`, so hydration matches.
- Header and Footer links change from `#section` to `/#section`. They work on `/` and on
  subpages, so Header needs no props and hydration is unchanged.
- `src/main.jsx` and the production path in `src/hydrate.jsx` are unchanged: both islands
  exist on every page. Only `renderDev()` changes: the dev server has no prerendered markup, so
  it looks up `location.pathname` in the route table to render the right page.

### Prerender (`scripts/prerender.js`)

For each route after `/`, start from the built `dist/index.html` and:

1. Replace `<title>`, meta description, canonical, `og:url`, `og:title`, `og:description`,
   `twitter:title` and `twitter:description`. Each replacement must match exactly once, or the
   build fails.
2. Remove the homepage-only blocks: the desktop hero-image preload and every
   `application/ld+json` script. Then insert the route's JSON-LD.
3. Inject the rendered markup and guard the `mailto:` links, as the homepage path does today.
4. Write `dist/services/<slug>.html`.

Canonical and `og:url` are `SITE_URL` + path, never written by hand.

### Generated files

- `sitemap.xml` is generated from the route table at build time, and `public/sitemap.xml` is
  deleted. No `lastmod`: a build date would change on every deploy and teach Google to ignore it.
- `llms.txt` gains a "Pages" list from the route table, through a new placeholder.

### Structured data per service page

- `Service`: `name`, `description`, `url`, `provider` → `PERSON_ID`, `areaServed`,
  `offers` → `Offer` with `priceSpecification` (`price` = floor, `priceCurrency` EUR, `minPrice`).
- `BreadcrumbList` matching the visible breadcrumb.
- No FAQPage or product nodes; those stay on the homepage.

### Homepage changes

- Each Services card gets a link to its page ("Website development in detail →").
- The homepage `<head>` and its existing build checks are unchanged.

## Verification

Build-time checks that fail the build:

- Every route renders exactly one `<h1>`.
- Every output's canonical equals `SITE_URL` + its path.
- Every route appears in the generated sitemap, and nothing else does.
- Every head replacement matches exactly once.

Before the PR (`wrangler pages dev dist`):

- `/services/website-development` and `/services/saas-mvp-development` return 200; the
  `.html` and trailing-slash variants redirect to them; unknown paths still return 404.
- Header links, breadcrumbs and the homepage card links resolve.
- Both islands hydrate on a service page (menu opens, form validates).
- Lighthouse mobile: accessibility, best practices and SEO all 100 on both new pages and on `/`.
- `npm run build` and `npm run lint` are clean.
