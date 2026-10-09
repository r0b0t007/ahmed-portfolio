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
        // Two levels: there is no /services page, and a "#services" fragment is the homepage URL
        // to a search engine, so a middle crumb would point at the same page as the first.
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: s.name, item: url },
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
