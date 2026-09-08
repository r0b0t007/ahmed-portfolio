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

/**
 * The fields are uncontrolled on purpose. This island hydrates lazily (src/main.jsx), so there is
 * a window after first paint in which the visitor can type into the prerendered form before
 * React attaches. Controlled inputs start that render with empty state and blank whatever was
 * typed on the first keystroke after hydration; reading the values off the form at submit time
 * cannot lose them. It also drops a re-render per keystroke.
 */
const Contact = () => {
  const [status, setStatus] = useState('idle')

  const submit = async e => {
    e.preventDefault()
    const form = e.target
    const fields = form.elements
    setStatus('sending')
    try {
      await send({
        name: fields.name.value,
        email: fields.email.value,
        subject: fields.subject.value,
        message: fields.message.value,
      }, fields['bot-field']?.value ?? '')
      setStatus('success')
      form.reset()
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
              <span className="eyebrow-index">( 09 )</span>
            </div>
            <h2 className="sec-title">Tell me what <em>you're building</em></h2>
            <p className="sec-lead" style={{ marginBottom: '28px' }}>
              Thirty minutes, free. You'll leave with a scope, a price and a date. If I'm not
              the right person for it, I'll say so on the call.
            </p>
            <div className="ed-avail-solid"><span className="ed-dot-b" />Available for new projects</div>
            <dl className="ed-details">
              {details.map(d => (
                <div key={d.label} className="ed-detail">
                  <dt>{d.label}</dt>
                  <dd>{d.href ? <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{d.value}</a> : d.value}</dd>
                </div>
              ))}
            </dl>
            <p className="ed-alt-cta">
              Not ready to talk?{' '}
              <a href="https://github.com/r0b0t007/ahmed-portfolio" target="_blank" rel="noopener noreferrer">
                Read the code first &rarr;
              </a>
            </p>
          </div>
        </div>

        <form className="fade-in ed-form" name="contact" onSubmit={submit}>
          <div style={{ display: 'none' }}><label>Skip: <input name="bot-field" /></label></div>
          <div className="ed-form-row">
            <div className="ed-fg"><label>Name</label><input name="name" placeholder="Your name" required /></div>
            <div className="ed-fg"><label>Email</label><input type="email" name="email" placeholder="your@email.com" required /></div>
          </div>
          <div className="ed-fg"><label>Subject</label><input name="subject" placeholder="What's this about?" required /></div>
          <div className="ed-fg"><label>Message</label><textarea name="message" rows="5" placeholder="Tell me more…" required /></div>
          <button type="submit" className={`ed-submit ${status}`} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : status === 'success' ? '✓ Message sent' : status === 'error' ? '✗ Failed — retry' : 'Send message'}
          </button>
        </form>
      </div>

    </section>
  )
}

export default Contact
