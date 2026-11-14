import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cut } from '../../src/content/cut.js'
import { steps, homeSteps } from '../../src/content/process.js'
import { proofItems, homeProofItems } from '../../src/content/proof.js'
import { faqs, homeFaqs } from '../../src/content/faqs.js'

test('cut joins every sentence for the full text and the chosen ones for the short text', () => {
  assert.deepEqual(cut(['One.', 'Two.', 'Three.'], [0, 2]), { full: 'One. Two. Three.', short: 'One. Three.' })
})

test('cut refuses a passage with no homepage selection, or one that names a missing sentence', () => {
  assert.throws(() => cut(['One.'], []), /no homepage sentences/)
  assert.throws(() => cut(['One.'], undefined), /no homepage sentences/)
  assert.throws(() => cut(['One.'], [1]), /no sentence 1/)
  assert.throws(() => cut([], [0]), /at least one sentence/)
})

test('every homepage step and proof item has a body, shorter than or equal to the full one', () => {
  assert.equal(homeSteps.length, steps.length)
  homeSteps.forEach((s, i) => {
    assert.ok(s.desc.length > 0, s.title)
    assert.ok(s.desc.length <= steps[i].desc.length, s.title)
  })
  assert.equal(homeProofItems.length, proofItems.length)
  homeProofItems.forEach((it, i) => {
    assert.ok(it.body.length > 0, it.title)
    assert.ok(it.body.length <= proofItems[i].body.length, it.title)
  })
})

test('the homepage steps keep the offer facts the full steps state', () => {
  const home = homeSteps.map(s => s.desc).join(' ')
  assert.match(home, /If I miss the date in your scope, I keep building until it ships, and the overrun is on me\./)
  assert.match(home, /Day \d+, you get a URL\./)
  assert.match(home, /\d+ days of post-launch fixes\./)
})

test('the homepage FAQ is six of the entries, each one from the full list', () => {
  assert.equal(homeFaqs.length, 6)
  for (const f of homeFaqs) assert.ok(faqs.includes(f), f.id)
})
