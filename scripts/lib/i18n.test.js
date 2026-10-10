import { test } from 'node:test'
import assert from 'node:assert/strict'
import { typo } from '../../src/content/fr/typo.js'
import {
  PRICE_SAAS_LABEL_FR, PRICE_SITE_LABEL_FR, WHATSAPP_NUMBER, WHATSAPP_URL_FR, weeksTextFr,
} from '../../src/content/site.js'
import { contentFor } from '../../src/content/locale.js'
import { uiFor } from '../../src/content/i18n.js'
import { ui } from '../../src/content/ui.js'

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
