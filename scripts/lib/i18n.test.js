import { test } from 'node:test'
import assert from 'node:assert/strict'
import { typo } from '../../src/content/fr/typo.js'
import {
  PRICE_SAAS_LABEL_FR, PRICE_SITE_LABEL_FR, WHATSAPP_NUMBER, WHATSAPP_URL_FR, weeksTextFr,
} from '../../src/content/site.js'
import { contentFor } from '../../src/content/locale.js'
import { uiFor } from '../../src/content/i18n.js'
import { ui } from '../../src/content/ui.js'
import { services } from '../../src/content/services.js'
import { steps } from '../../src/content/process.js'
import { ui as frUi } from '../../src/content/fr/ui.js'
import { services as frServices } from '../../src/content/fr/services.js'
import { faqs as frFaqs } from '../../src/content/fr/faqs.js'
import { steps as frSteps } from '../../src/content/fr/process.js'
import { proofItems as frProof } from '../../src/content/fr/proof.js'
import { home as frHome } from '../../src/content/fr/home.js'

test('typo puts a no-break space before French double punctuation and inside guillemets', () => {
  assert.equal(
    typo('Prix : fixe ; date ? oui ! « citation »'),
    'Prix\u00a0: fixe\u00a0; date\u00a0? oui\u00a0! «\u00a0citation\u00a0»',
  )
})

test('typo leaves URLs and non-strings alone, and reaches into arrays, objects and functions', () => {
  const v = typo({ href: 'https://wa.me/1?text=a', n: 3, list: ['a : b'], f: x => `${x} ?` })
  assert.equal(v.href, 'https://wa.me/1?text=a')
  assert.equal(v.n, 3)
  assert.deepEqual(v.list, ['a\u00a0: b'])
  assert.equal(v.f('ok'), 'ok\u00a0?')
})

test('French price labels use French number formatting', () => {
  assert.equal(PRICE_SITE_LABEL_FR, '3\u202f000\u00a0€')
  assert.equal(PRICE_SAAS_LABEL_FR, '12\u202f000\u00a0€')
  assert.equal(weeksTextFr({ from: 2, to: 3 }), '2 à 3')
})

test('the French WhatsApp link pre-fills a French message to the same number', () => {
  const u = new URL(WHATSAPP_URL_FR)
  assert.equal(u.pathname, `/${WHATSAPP_NUMBER}`)
  assert.match(u.searchParams.get('text'), /^Bonjour Ahmed/)
})

test('contentFor(en) serves the English content, by id', () => {
  const c = contentFor('en')
  assert.equal(c.ui, ui)
  assert.equal(c.findService('website').slug, 'website-development')
  assert.equal(c.findService('saas').slug, 'saas-mvp-development')
  assert.equal(c.faqById('cost').id, 'cost')
  assert.equal(c.proof.all.length, c.proof.products.length + c.proof.site.length + 1)
  assert.throws(() => c.findService('nope'), /no entry with id "nope"/)
})

test('an unknown locale fails loudly', () => {
  assert.throws(() => contentFor('de'), /no content for "de"/)
  assert.throws(() => uiFor('de'), /no interface strings for locale "de"/)
})

test('French services mirror the English ones: same ids, order, price, weeks and proof group', () => {
  assert.deepEqual(frServices.map(s => s.id), services.map(s => s.id))
  frServices.forEach((s, i) => {
    for (const k of ['priceFrom', 'weeks', 'proof']) assert.equal(s[k], services[i][k], `${s.id}.${k}`)
    assert.equal(s.included.length, services[i].included.length, `${s.id}.included`)
  })
})

test('every FAQ id a French page asks for exists in French', () => {
  const ids = new Set(frFaqs.map(f => f.id))
  assert.deepEqual(frHome.faq.ids, ['what', 'speed', 'cost', 'ownership', 'slip', 'location'])
  for (const id of [...frHome.faq.ids, ...frServices.flatMap(s => s.faqIds)]) assert.ok(ids.has(id), id)
})

test('the French process has the same four steps', () => {
  assert.equal(frSteps.length, steps.length)
})

test('French interface strings have the same shape as the English ones', () => {
  const shape = v => typeof v === 'function' ? 'fn'
    : Array.isArray(v) ? v.map(shape)
      : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map(k => [k, shape(v[k])]))
        : typeof v
  // The navs differ in length (About is English-only), and only French sets validation messages.
  const comparable = u => ({ ...u, nav: undefined, contact: { ...u.contact, invalid: undefined } })
  assert.deepEqual(shape(comparable(frUi)), shape(comparable(ui)))
})

test('the French nav stays on the French homepage, except the contact anchor every page has', () => {
  for (const l of frUi.nav) assert.match(l.href, /^(\/fr#[a-z]+|#contact)$/, l.name)
})

test('contentFor and uiFor serve French', () => {
  const c = contentFor('fr')
  assert.equal(c.ui, frUi)
  assert.equal(uiFor('fr'), frUi)
  assert.equal(c.findService('saas').slug, 'developpement-saas')
  assert.equal(c.proof.all, frProof)
})

test('no French string has an ordinary space before : ; ? or !', () => {
  const strings = v => typeof v === 'string' ? [v]
    : typeof v === 'function' ? strings(v('X'))
      : Array.isArray(v) ? v.flatMap(strings)
        : v && typeof v === 'object' ? Object.values(v).flatMap(strings)
          : []
  for (const s of strings([frUi, frServices, frFaqs, frSteps, frProof, frHome])) {
    assert.doesNotMatch(s, / [:;?!]/, s)
  }
})
