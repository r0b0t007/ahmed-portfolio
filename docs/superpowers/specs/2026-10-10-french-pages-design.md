# French pages: design

Date: 2026-10-10 · Status: approved in brainstorming, pending spec review

## Goal

Reach Moroccan buyers, who search in French ("création site web", "développeur web"), while the
Google Business Profile serves Morocco and the site is English-only. Ship a French homepage and
the two service pages in French, linked to their English twins with `hreflang`.

Out of scope: French versions of the Experience and About sections, the build log, the 404 page
and `llms.txt` prose; any change to English copy; prices in dirhams.

## Decisions taken

| Decision | Choice |
|---|---|
| Scope | A focused French homepage plus the two service pages |
| Currency | Euros, as on the English site (`3 000 €` formatting) |
| Approach | Language-aware content and components (approach A). Rejected: separate French component copies (drift) and an i18n library (client JavaScript for two languages) |
| Slugs | French: `/fr`, `/fr/services/creation-site-web`, `/fr/services/developpement-saas` |
| Copy | Claude translates the approved English into French (*vous*), same facts and rules; Ahmed approves every line |

## Pages

| Path | Twin | Contents |
|---|---|---|
| `/fr` | `/` | Hero + facts strip, the two services, process, price, proof, FAQ (6 entries), contact |
| `/fr/services/creation-site-web` | `/services/website-development` | Same sections as the English service page |
| `/fr/services/developpement-saas` | `/services/saas-mvp-development` | Same sections as the English service page |

French homepage FAQ, by id: `what`, `speed`, `cost`, `ownership`, `slip`, `location`.

The French hero has two CTAs: book a scope call (`BOOKING_URL`), and WhatsApp with a French
pre-filled message (`WHATSAPP_URL_FR`). The proof link to the build log reads
"…(en anglais)", since that page stays English.

## Architecture

### Content by locale

- Existing English modules stay where they are and keep working unchanged.
- New French modules mirror them under `src/content/fr/`, keyed by the same ids:
  - `services.js`: same service ids, French slug, copy and card
  - `faqs.js`: French `q`/`a` for the six ids used
  - `process.js`: the four steps
  - `proof.js`: product and site items
  - `ui.js`: interface strings (nav, breadcrumb, section titles, contact form, footer)
  - `home.js`: French homepage hero and section copy
- English interface strings move out of Header, Footer, Contact, Breadcrumb and ServicePage into
  `src/content/ui.js`, so both languages read from the same shape.
- `src/content/locale.js` exports `contentFor(locale)`, returning
  `{ services, faqs, process, proof, ui }` for `en` or `fr`.
- `site.js` adds `WHATSAPP_URL_FR` and French price labels (`PRICE_SITE_LABEL_FR` and the SaaS
  equivalent, via `toLocaleString('fr-FR')`). Every number still comes from `site.js`.

### Routes

- Every route gains `locale` (`'en'` or `'fr'`) and `alternates` (`{ en: path, fr: path }`).
  Twins are paired by a shared key: `home`, or the service id.
- New French routes:
  - `kind: 'home'`, `locale: 'fr'`, path `/fr`
  - two `kind: 'service'` routes built from `src/content/fr/services.js`
- `findRoute`, the sitemap, the redirects, the 404 page's list and `llms.txt` pick the French
  routes up with no other change.

### Rendering

- A `LocaleContext` provides `contentFor(route.locale)` to the page.
- The French homepage is a new `HomeFr` page assembled from data-driven components:
  `BenefitCard`, `Step`, `FaqRow`, `ProofItem`, the price block and the facts strip.
  The English `Home` is unchanged.
- `ServicePage` reads its labels and its service from the context, so one component renders both
  languages.
- Islands:
  - Header's and Contact's `data-props` gain `locale`.
  - Header also gains `switchHref`: the other language's twin path, or that language's homepage.
  - `hydrate.jsx` already passes `data-props` through, so hydration matches the server render.
  - The EN/FR switch link sits in the header.

### Head

`rewriteHead` gains three options:

- `lang`: sets `<html lang="fr">`
- `ogLocale`: replaces `og:locale` with `fr_FR`
- `alternates`: inserts `<link rel="alternate" hreflang="en|fr|x-default">` before `</head>`

The homepage keeps its hand-written head. A new `addAlternates(html, alternates)` helper inserts
its `hreflang` links, so `/` and `/fr` point at each other. `x-default` is always the English path.

## Verification

Unit tests:

- Every route's `alternates` are reciprocal, and every alternate path exists.
- French slugs match `^/fr(/services/[a-z0-9-]+)?$`.
- French titles are ≤ 60 characters and descriptions ≤ 160.
- Every French FAQ id exists in `src/content/fr/faqs.js`.
- English and French services have the same ids.
- `rewriteHead` sets `lang`, `og:locale` and the alternates (each exactly once).

Build checks (existing): one `<h1>` per page, canonical equals the page's own URL, every route
in the sitemap.

Before the PR, on `wrangler pages dev`:

- All three French URLs return 200; the trailing-slash forms 308; `/fr/services/nope` 404.
- `<html lang>` and `hreflang` are correct on both twins of each pair.
- The French header and contact form hydrate in French (menu, labels, validation, the
  sent/failed states).
- Lighthouse mobile on `/fr` and both French service pages: 100 / 100 / 100.
- The English pages are unchanged apart from the `hreflang` links and the EN/FR switch.

## Copy review

All French text is new and needs Ahmed's approval: the homepage hero, section titles and leads,
the service pages, the FAQ answers, the interface strings and the WhatsApp pre-filled message.
The PR lists them with their English source alongside.
