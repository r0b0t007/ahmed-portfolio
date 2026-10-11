import { test } from 'node:test'
import assert from 'node:assert/strict'
import { routes, absoluteUrl, findRoute, servicePath, workPath } from '../../src/content/routes.js'
import { services } from '../../src/content/services.js'
import { services as frServices } from '../../src/content/fr/services.js'
import { faqById } from '../../src/content/faqs.js'
import { buildRedirects } from './pages.js'

test('the homepage is the first route and paths are unique', () => {
  assert.equal(routes[0].path, '/')
  assert.equal(new Set(routes.map(r => r.path)).size, routes.length)
})

test('service paths have no trailing slash; French ones live under /fr', () => {
  for (const r of routes.filter(r => r.kind === 'service')) {
    assert.match(r.path, r.locale === 'fr' ? /^\/fr\/services\/[a-z0-9-]+$/ : /^\/services\/[a-z0-9-]+$/)
  }
})

test('titles fit in 60 characters and descriptions in 160', () => {
  for (const r of routes.filter(r => r.path !== '/')) {
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

test('every page except the homepage gets a trailing-slash redirect', () => {
  const rules = buildRedirects(routes.map(r => r.path)).split('\n').filter(l => l && !l.startsWith('#'))
  assert.equal(rules.length, routes.length - 1)
  for (const r of routes.filter(r => r.path !== '/')) assert.ok(rules.includes(`${r.path}/ ${r.path} 308`), r.path)
})

test('work pages live at /work/<slug> and resolve by slug', () => {
  const work = routes.filter(r => r.kind === 'work')
  assert.ok(work.length > 0)
  for (const r of work) {
    assert.match(r.path, /^\/work\/[a-z0-9-]+$/)
    assert.equal(workPath(r.slug), r.path)
  }
  assert.throws(() => workPath('nope'), /no page at/)
})

test('work JSON-LD is a dated TechArticle by the Person, with a breadcrumb ending at the page', () => {
  for (const r of routes.filter(r => r.kind === 'work')) {
    const [article, crumbs] = r.jsonLd['@graph']
    assert.equal(article['@type'], 'TechArticle')
    assert.equal(article.url, absoluteUrl(r.path))
    assert.equal(article.author['@id'], 'https://ahmedchioua.com/#person')
    assert.match(article.datePublished, /^\d{4}-\d{2}-\d{2}$/)
    assert.equal(crumbs.itemListElement.at(-1).item, absoluteUrl(r.path))
  }
})

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
  assert.equal(faq.mainEntity[0].name, 'Que construisez-vous exactement\u00a0?')
})

test('English and French routes cover the same services', () => {
  const ids = l => routes.filter(r => r.kind === 'service' && r.locale === l).map(r => r.id)
  assert.deepEqual(ids('fr'), ids('en'))
  assert.deepEqual(ids('fr'), frServices.map(s => s.id))
})
