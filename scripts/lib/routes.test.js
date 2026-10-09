import { test } from 'node:test'
import assert from 'node:assert/strict'
import { routes, absoluteUrl, findRoute, servicePath, workPath } from '../../src/content/routes.js'
import { services } from '../../src/content/services.js'
import { faqById } from '../../src/content/faqs.js'
import { buildRedirects } from './pages.js'

test('the homepage is the first route and paths are unique', () => {
  assert.equal(routes[0].path, '/')
  assert.equal(new Set(routes.map(r => r.path)).size, routes.length)
})

test('service paths have no trailing slash', () => {
  for (const r of routes.filter(r => r.kind === 'service')) assert.match(r.path, /^\/services\/[a-z0-9-]+$/)
})

test('titles fit in 60 characters and descriptions in 160', () => {
  for (const r of routes.filter(r => r.kind !== 'home')) {
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
