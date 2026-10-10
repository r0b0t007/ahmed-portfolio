import { test } from 'node:test'
import assert from 'node:assert/strict'
import { onRequestPost } from '../../functions/api/contact.js'

const FORM = { name: 'A', email: 'a@b.co', subject: 'Un site', message: 'Bonjour' }

// Posts a form to the function and returns the subject of the email it asks Resend to send.
async function subjectFor(form) {
  const real = globalThis.fetch
  let sent
  globalThis.fetch = async (_, init) => { sent = JSON.parse(init.body); return new Response('{}') }
  try {
    const request = new Request('https://x/api/contact', { method: 'POST', body: JSON.stringify(form) })
    const res = await onRequestPost({ request, env: { RESEND_API_KEY: 'test' } })
    assert.equal(res.status, 200)
  } finally {
    globalThis.fetch = real
  }
  return sent.subject
}

test('a message from a French page is tagged (FR) in the subject; others are not', async () => {
  assert.equal(await subjectFor({ ...FORM, locale: 'fr' }), 'Portfolio contact (FR): Un site')
  assert.equal(await subjectFor({ ...FORM, locale: 'en' }), 'Portfolio contact: Un site')
  assert.equal(await subjectFor(FORM), 'Portfolio contact: Un site')
})
