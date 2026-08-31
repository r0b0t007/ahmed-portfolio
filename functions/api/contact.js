/**
 * Cloudflare Pages Function: POST /api/contact
 *
 * Receives the contact form's JSON (src/components/Contact.jsx with
 * VITE_FORM_ENDPOINT=/api/contact) and forwards it as an email via Resend.
 *
 * Environment (Pages project settings → Variables and secrets):
 *   RESEND_API_KEY  (secret, required)  resend.com API key
 *   CONTACT_TO      (optional)          recipient, default ahmedchioua@gmail.com
 *   CONTACT_FROM    (optional)          verified sender; the default works before
 *                                       ahmedchioua.com is verified in Resend but only
 *                                       delivers to the Resend account owner's address
 *   RESEND_API_URL  (optional)          override for local testing only
 */
const MAX = { name: 200, email: 320, subject: 500, message: 10000 }

export async function onRequestPost({ request, env }) {
  const json = (status, body) =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

  if (!env.RESEND_API_KEY) return json(500, { error: 'form backend not configured' })

  let form
  try {
    form = await request.json()
  } catch {
    return json(400, { error: 'expected a JSON body' })
  }

  // Honeypot: bots fill the hidden field. Pretend success so they don't adapt.
  if (form._gotcha) return json(200, { ok: true })

  for (const field of Object.keys(MAX)) {
    const v = form[field]
    if (typeof v !== 'string' || !v.trim()) return json(400, { error: `missing ${field}` })
    if (v.length > MAX[field]) return json(400, { error: `${field} too long` })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return json(400, { error: 'invalid email' })

  const res = await fetch(env.RESEND_API_URL || 'https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM || 'Portfolio contact <onboarding@resend.dev>',
      to: [env.CONTACT_TO || 'ahmedchioua@gmail.com'],
      reply_to: form.email,
      subject: `Portfolio contact: ${form.subject}`,
      text: `From: ${form.name} <${form.email}>\n\n${form.message}`,
    }),
  })

  if (!res.ok) {
    console.error('resend error', res.status, await res.text())
    return json(502, { error: 'email delivery failed' })
  }
  return json(200, { ok: true })
}
