import { useState } from 'react'
import { useFadeIn } from '../hooks/useFadeIn'

const details = [
  { label: 'Email', value: 'ahmedchioua@gmail.com', href: 'mailto:ahmedchioua@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/ahmedchioua', href: 'https://linkedin.com/in/ahmedchioua' },
  { label: 'Location', value: 'Tétouan, Morocco · Remote', href: null },
]

const Contact = () => {
  const leftRef = useFadeIn(0.1)
  const formRef = useFadeIn(0.1)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  const change = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contact', ...form }).toString(),
      })
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="section">
      <div className="ed-contact">
        <div ref={leftRef} className="fade-in ed-contact-left">
          <div className="eyebrow-block" style={{ marginBottom: 0 }}>
            <div className="eyebrow-row">
              <span className="eyebrow">Contact</span>
              <span className="eyebrow-index">( 04 )</span>
            </div>
            <h2 className="sec-title">Let's talk about <em>what ships</em></h2>
            <p className="sec-lead" style={{ marginBottom: '28px' }}>
              Tell me where AI is stuck in your organization — I'll tell you honestly whether
              and how I can help.
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

        <form ref={formRef} className="fade-in ed-form" name="contact" onSubmit={submit}>
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

      <style>{`
        .ed-contact { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .ed-avail-solid {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 10px 18px; background: var(--ink); color: var(--paper);
          font-size: 0.72rem; font-weight: 600;
        }
        .ed-dot-b { width: 7px; height: 7px; border-radius: 50%; background: var(--teal-bright); animation: dcpulse 2s infinite; }
        .ed-details { margin-top: 32px; display: flex; flex-direction: column; gap: 14px; }
        .ed-detail { display: grid; grid-template-columns: 90px 1fr; gap: 16px; align-items: baseline; }
        .ed-detail dt { font-family: var(--mono); font-size: 0.66rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-muted); }
        .ed-detail dd { font-size: 0.9rem; color: var(--ink-2); }
        .ed-detail dd a { border-bottom: 1px solid var(--hair); transition: border-color var(--transition); }
        .ed-detail dd a:hover { border-color: var(--teal); color: var(--teal); }

        .ed-form { background: var(--paper-card); border: 1px solid var(--hair); padding: 40px; }
        .ed-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ed-fg { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
        .ed-fg label { font-family: var(--mono); font-size: 0.62rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-muted); }
        .ed-fg input, .ed-fg textarea {
          width: 100%; padding: 12px 14px; background: var(--paper); border: 1px solid var(--hair);
          color: var(--ink); font-family: var(--sans); font-size: 0.9rem; resize: none;
        }
        .ed-fg input::placeholder, .ed-fg textarea::placeholder { color: var(--ink-muted); }
        .ed-fg input:focus, .ed-fg textarea:focus { outline: none; border-color: var(--teal); }
        .ed-submit {
          width: 100%; padding: 15px; border: 1px solid var(--ink); background: var(--ink);
          color: var(--paper); font-weight: 600; font-size: 0.88rem; font-family: var(--sans);
          letter-spacing: 0.02em; transition: background var(--transition), border-color var(--transition);
        }
        .ed-submit:hover { background: var(--teal); border-color: var(--teal); }
        .ed-submit:disabled { opacity: 0.7; cursor: default; }
        .ed-submit.success { background: var(--teal); border-color: var(--teal); }
        .ed-submit.error { background: #9a3535; border-color: #9a3535; }
        @media (max-width: 820px) { .ed-contact { grid-template-columns: 1fr; gap: 40px; } .ed-form-row { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

export default Contact
