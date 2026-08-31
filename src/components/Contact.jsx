import { useState } from 'react'

const details = [
  { label: 'Email', value: 'ahmedchioua@gmail.com', href: 'mailto:ahmedchioua@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/ahmedchioua', href: 'https://linkedin.com/in/ahmedchioua' },
  { label: 'Location', value: 'Tétouan, Morocco · Remote', href: null },
]

/**
 * The form posts JSON to a Pages Function (functions/api/contact.js) which forwards it via
 * Resend. VITE_FORM_ENDPOINT (build-time) can point elsewhere — e.g. a hosted form backend —
 * but defaults to the function's route.
 */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '/api/contact'

async function send(form, gotcha) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...form, _subject: `Portfolio contact: ${form.subject}`, _gotcha: gotcha }),
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
