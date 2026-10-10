/**
 * Every page the build emits, in one list. Read by:
 *   - src/App.jsx and src/entry-server.jsx — which page to render for a path
 *   - scripts/prerender.js                 — one HTML file per route, plus sitemap.xml
 *   - vite.config.js                       — the page list in llms.txt, the 404 page's links
 *
 * The homepage's head is the hand-written one in index.html. Every other route's head is derived
 * here: canonical and og:url come from the path, so no page can carry another page's URL.
 * Keep this file JSX-free; Node imports it directly.
 */
import { CURRENCY_CODE, PERSON_ID, REPO_URL, SITE_URL } from './site.js'
import { services } from './services.js'
import { workLogs } from './work.js'

export const absoluteUrl = path => new URL(path, SITE_URL).href

// A self-contained stub of the homepage Person node: structured data is read per page, so the
// provider and author must resolve here, not only through an @id defined on another URL.
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
    breadcrumb(s.name, url),
  ],
})

// Two levels: there is no /services or /work index page, and a "#services" fragment is the
// homepage URL to a search engine, so a middle crumb would point at the same page as the first.
const breadcrumb = (name, url) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
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
      name: s.name,
      summary: s.summary,
      title: s.title,
      description: s.description,
      jsonLd: serviceJsonLd(s, absoluteUrl(path)),
    }
  }),
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
]

export function findRoute(path) {
  const route = routes.find(r => r.path === path)
  if (!route) throw new Error(`routes: no page at ${path}`)
  return route
}

export const servicePath = slug => findRoute(`/services/${slug}`).path
export const workPath = slug => findRoute(`/work/${slug}`).path
