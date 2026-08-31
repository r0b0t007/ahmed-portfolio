import { useState } from 'react'

const details = [
  { label: 'Email', value: 'ahmedchioua@gmail.com', href: 'mailto:ahmedchioua@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/ahmedchioua', href: 'https://linkedin.com/in/ahmedchioua' },
  { label: 'Location', value: 'Tétouan, Morocco · Remote', href: null },
]

/**
 * Where the form posts. Set VITE_FORM_ENDPOINT (build-time) to a form backend that accepts a
 * JSON POST — Formspree (https://formspree.io/f/<id>) or Web3Forms both do. Left unset, the
 * form falls back to Netlify Forms (POST to / with form-name), which only works while the
 * site is hosted on Netlify with the hidden <form netlify> in index.html. On Cloudflare Pages
 * set it to /api/contact (functions/api/contact.js).
 */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

async function send(form, gotcha) {
  const res = ENDPOINT
    ? await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: `Portfolio contact: ${form.subject}`, _gotcha: gotcha }),
      })
    : await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contact', ...form }).toString(),
      })
  // fetch only rejects on network failure; a 4xx/5xx must not read as "sent".
  if (!res.ok) throw new Error(`form endpoint responded ${res.status}`)
}

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  const change = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      await send(form, e.target.elements['bot-field']?.value ?? '')
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section id="contact" className="section">
      <div className="ed-contact">
        <div className="fade-in ed-contact-left">
          <div className="eyebrow-block" style={{ marginBottom: 0 }}>
            <div className="eyebrow-row">
              <span className="eyebrow">Contact</span>
              <span className="eyebrow-index">( 07 )</span>
            </div>
            <h2 className="sec-title">Tell me what <em>you're building</em></h2>
            <p className="sec-lead" style={{ marginBottom: '28px' }}>
              Send me the shape of it and I'll tell you honestly whether I'm the right person,
              what it would take, and what it would cost. The scope call is free and there's
              nothing to unsubscribe from.
            </p>
            <div className="ed-avail-solid"><span className="ed-dot-b" />Available for engagements</div>
            <dl className="ed-details">
              {details.map(d => (
                <div key={d.label} className="ed-detail">
                  <dt>{d.label}</dt>
                  <dd>{d.href ? <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{d.value}</a> : d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <form className="fade-in ed-form" name="contact" onSubmit={submit}>
          <input type="hidden" name="form-name" value="contact" />
          <div style={{ display: 'none' }}><label>Skip: <input name="bot-field" /></label></div>
          <div className="ed-form-row">
            <div className="ed-fg"><label>Name</label><input name="name" placeholder="Your name" value={form.name} onChange={change} required /></div>
            <div className="ed-fg"><label>Email</label><input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={change} required /></div>
          </div>
          <div className="ed-fg"><label>Subject</label><input name="subject" placeholder="What's this about?" value={form.subject} onChange={change} required /></div>
          <div className="ed-fg"><label>Message</label><textarea name="message" rows="5" placeholder="Tell me more…" value={form.message} onChange={change} required /></div>
          <button type="submit" className={`ed-submit ${status}`} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : status === 'success' ? '✓ Message sent' : status === 'error' ? '✗ Failed — retry' : 'Send message'}
          </button>
        </form>
      </div>

    </section>
  )
}

export default Contact
