import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { routes } from '../../src/content/routes.js'
import { BOOKING_URL, SITE_URL } from '../../src/content/site.js'

// Line endings as committed (LF), whatever the checkout's core.autocrlf did to them.
const llms = readFileSync(new URL('../../src/content/llms.txt', import.meta.url), 'utf8').replace(/\r\n/g, '\n')
const indexHtml = readFileSync(new URL('../../index.html', import.meta.url), 'utf8')

// The lines of one "## " section of llms.txt, heading excluded.
const section = heading => {
  const start = llms.indexOf(`\n## ${heading}\n`)
  assert.ok(start >= 0, `llms.txt has no "## ${heading}" section`)
  const rest = llms.slice(start + heading.length + 5)
  return rest.slice(0, rest.search(/\n## |$/)).trim().split('\n')
}

test('llms.txt tells agents when to use the site, before any other section', () => {
  // llmstxt.org: an H1, a blockquote summary, then H2 sections. This one comes first.
  assert.match(llms, /^# .+\n\n>/)
  assert.equal(llms.match(/^## .+$/m)[0], '## When to use this')
})

test('every "When to use this" entry is an llms.txt link item with guidance', () => {
  const items = section('When to use this')
  assert.ok(items.length >= 4)
  for (const item of items) assert.match(item, /^- \[[^\]]+\]\(https:\/\/[^)\s]+\): \S.{40,}$/, item)
})

test('"When to use this" links only to pages that exist, and to the booking link the site uses', () => {
  const paths = new Set(routes.map(r => r.path))
  const urls = section('When to use this').flatMap(item => [...item.matchAll(/\]\((https:\/\/[^)\s]+)\)/g)].map(m => m[1]))
  for (const url of urls) {
    if (url === BOOKING_URL) continue
    assert.ok(url.startsWith(SITE_URL), `${url} is neither this site nor the booking link`)
    assert.ok(paths.has(new URL(url).pathname), `${url} is not a page in src/content/routes.js`)
  }
  assert.ok(urls.includes(BOOKING_URL), 'tells agents how to act: the booking link')
})

test('the homepage JSON-LD leads with the business, an Organization with an address and a contact point', () => {
  const graph = JSON.parse(indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph']
  const business = graph[0]
  assert.equal(business['@id'], `${SITE_URL}#business`)
  assert.deepEqual(business['@type'], ['ProfessionalService', 'Organization'])
  assert.equal(business.address['@type'], 'PostalAddress')
  assert.equal(business.address.addressCountry, 'MA')
  const contact = business.contactPoint
  assert.equal(contact['@type'], 'ContactPoint')
  assert.ok(contact.contactType)
  // The same reachable details the node, and the page's contact section, already publish.
  assert.equal(contact.email, business.email)
  assert.equal(contact.telephone, business.telephone)
})

test('robots.txt lets ClaudeBot crawl, and still refuses the other training crawlers', () => {
  const robots = readFileSync(new URL('../../public/robots.txt', import.meta.url), 'utf8').replace(/\r\n/g, '\n')
  // Each group: its User-agent lines and its rules (comments and blank lines dropped).
  const groups = robots.replace(/#.*$/gm, '').split(/\n\s*\n/).map(block => {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean)
    return {
      agents: lines.filter(l => /^user-agent:/i.test(l)).map(l => l.split(':')[1].trim().toLowerCase()),
      refusesAll: lines.some(l => /^disallow:\s*\/$/i.test(l)),
    }
  })
  const groupFor = agent => groups.find(g => g.agents.includes(agent)) ?? groups.find(g => g.agents.includes('*'))
  assert.equal(groupFor('claudebot').refusesAll, false)
  assert.ok(groupFor('claudebot').agents.includes('*'), 'ClaudeBot follows the * group, not a group of its own')
  for (const agent of ['gptbot', 'ccbot', 'anthropic-ai', 'google-extended']) assert.equal(groupFor(agent).refusesAll, true, agent)
})
