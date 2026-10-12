import { test } from 'node:test'
import assert from 'node:assert/strict'
import worker from '../../worker/index.js'

const ASSETS = { fetch: async () => new Response('asset', { status: 404 }) }
const FORM = { name: 'A', email: 'a@b.co', subject: 'Hi', message: 'Hello' }

test('the Worker sends the contact form to the same handler as the Pages Function', async () => {
  const real = globalThis.fetch
  let sent
  globalThis.fetch = async (_, init) => { sent = JSON.parse(init.body); return new Response('{}') }
  try {
    const request = new Request('https://ahmedchioua.com/api/contact', { method: 'POST', body: JSON.stringify(FORM) })
    const res = await worker.fetch(request, { ASSETS, RESEND_API_KEY: 'test' })
    assert.equal(res.status, 200)
    assert.equal(sent.subject, 'Portfolio contact: Hi')
  } finally {
    globalThis.fetch = real
  }
})

test('the Worker refuses other methods on the form route, and leaves other paths to the assets', async () => {
  const get = await worker.fetch(new Request('https://ahmedchioua.com/api/contact'), { ASSETS })
  assert.equal(get.status, 405)
  assert.equal(get.headers.get('Allow'), 'POST')
  const other = await worker.fetch(new Request('https://ahmedchioua.com/api/nope'), { ASSETS })
  assert.equal(await other.text(), 'asset')
})
