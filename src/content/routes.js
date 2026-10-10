/**
 * Every page the build emits, in one list. Read by:
 *   - src/App.jsx and src/entry-server.jsx — which page to render for a path
 *   - scripts/prerender.js                 — one HTML file per route, plus sitemap.xml
 *   - vite.config.js                       — the page list in llms.txt, the 404 page's links
 *
 * The homepage's head is the hand-written one in index.html. Every other route's head is derived
 * here: canonical and og:url come from the path, so no page can carry another page's URL.
 * French pages (src/content/fr/) are routes too, with a locale and, where an English twin exists,
 * alternates.
 * Keep this file JSX-free; Node imports it directly.
 */
import { CURRENCY_CODE, PERSON_ID, REPO_URL, SITE_URL } from './site.js'
import { services } from './services.js'
import { workLogs } from './work.js'
import { services as frServices } from './fr/services.js'
import { faqs as frFaqs } from './fr/faqs.js'
import { home as frHome } from './fr/home.js'
import { byId } from './byId.js'
import { uiFor } from './i18n.js'

export const absoluteUrl = path => new URL(path, SITE_URL).href

// A self-contained stub of the homepage Person node: structured data is read per page, so the
// provider and author must resolve here, not only through an @id defined on another URL.
const PROVIDER = { '@type': 'Person', '@id': PERSON_ID, name: 'Ahmed Chioua', url: SITE_URL }

const serviceJsonLd = (s, url, locale) => ({
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
    breadcrumb(s.name, url, locale),
  ],
})

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

const workJsonLd = (w, url) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TechArticle',
      '@id': `${url}#article`,
      headline: w.name,
      description: w.description,
      url,
      mainEntityOfPage: url,
      datePublished: w.datePublished,
      dateModified: w.dateModified ?? w.datePublished,
      author: PROVIDER,
      // The repository the log describes, so the claims in it can be checked against the source.
      isBasedOn: REPO_URL,
    },
    breadcrumb(w.name, url),
  ],
})

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
