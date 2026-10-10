import { test } from 'node:test'
import assert from 'node:assert/strict'
import { typo } from '../../src/content/fr/typo.js'
import {
  PRICE_SAAS_LABEL_FR, PRICE_SITE_LABEL_FR, WHATSAPP_NUMBER, WHATSAPP_URL_FR, weeksTextFr,
} from '../../src/content/site.js'

test('typo puts a no-break space before French double punctuation and inside guillemets', () => {
  assert.equal(
    typo('Prix : fixe ; date ? oui ! « citation »'),
    'Prix : fixe ; date ? oui ! « citation »',
  )
})

test('typo leaves URLs and non-strings alone, and reaches into arrays, objects and functions', () => {
  const v = typo({ href: 'https://wa.me/1?text=a', n: 3, list: ['a : b'], f: x => `${x} ?` })
  assert.equal(v.href, 'https://wa.me/1?text=a')
  assert.equal(v.n, 3)
  assert.deepEqual(v.list, ['a : b'])
  assert.equal(v.f('ok'), 'ok ?')
})

test('French price labels use French number formatting', () => {
  assert.equal(PRICE_SITE_LABEL_FR, '3 000 €')
  assert.equal(PRICE_SAAS_LABEL_FR, '12 000 €')
  assert.equal(weeksTextFr({ from: 2, to: 3 }), '2 à 3')
})

test('the French WhatsApp link pre-fills a French message to the same number', () => {
  const u = new URL(WHATSAPP_URL_FR)
  assert.equal(u.pathname, `/${WHATSAPP_NUMBER}`)
  assert.match(u.searchParams.get('text'), /^Bonjour Ahmed/)
})
