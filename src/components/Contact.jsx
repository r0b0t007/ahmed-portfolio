import { useState } from 'react'
import { BOOKING_URL, REPO_URL, WHATSAPP_DISPLAY } from '../content/site'
import { uiFor } from '../content/i18n'
import { WhatsAppIcon } from './WhatsAppIcon'

const EMAIL = 'ahmedchioua@gmail.com'
const LINKEDIN = 'https://linkedin.com/in/ahmedchioua'

const details = ui => [
  { label: ui.contact.details.email, value: EMAIL, href: `mailto:${EMAIL}` },
  { label: ui.contact.details.whatsapp, value: WHATSAPP_DISPLAY, href: ui.whatsappUrl },
  { label: ui.contact.details.linkedin, value: 'linkedin.com/in/ahmedchioua', href: LINKEDIN },
  { label: ui.contact.details.location, value: ui.contact.details.place, href: null },
]

/**
 * The form posts JSON to a Pages Function (functions/api/contact.js) which forwards it via
 * Resend. VITE_FORM_ENDPOINT (build-time) can point elsewhere — e.g. a hosted form backend —
 * but defaults to the function's route.
 */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '/api/contact'

async function send(form, gotcha, locale) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...form, locale, _gotcha: gotcha }),
  })
  // fetch only rejects on network failure; a 4xx/5xx must not read as "sent".
  if (!res.ok) throw new Error(`form endpoint responded ${res.status}`)
}

// The browser words its validation bubble in its own language, not the page's. Where the ui
// strings set messages (the French pages), the form uses them instead. A custom message makes the
// field invalid until it is cleared, so it is cleared on every input.
const validity = invalid => invalid && {
  onInvalid: e => {
    const f = e.target
    f.setCustomValidity(f.validity.typeMismatch ? invalid.email : invalid.required)
  },
  onInput: e => e.target.setCustomValidity(''),
}

/**
 * The document's signature block: the two parties, the one action that "signs" (booking the free
 * scope call), then the direct routes and the form for anyone who would rather write.
 *
 * The fields are uncontrolled on purpose. This island hydrates lazily (src/main.jsx), so there is
 * a window after first paint in which the visitor can type into the prerendered form before
 * React attaches. Controlled inputs start that render with empty state and blank whatever was
 * typed on the first keystroke after hydration; reading the values off the form at submit time
 * cannot lose them. It also drops a re-render per keystroke.
 *
 * An island: its words come from the locale App.jsx serialises into data-props. Every page renders
 * it once, so the fixed field ids are unique on the page.
 */
const Contact = ({ locale = 'en' }) => {
  const ui = uiFor(locale)
  const t = ui.contact
  const sign = ui.doc.sign
  const check = validity(t.invalid)
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
      }, fields['bot-field']?.value ?? '', locale)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section id="contact" className="signature">
      <h2 className="clause-title">{t.title} <span className="clause-title-soft">{t.em}</span></h2>
      <p className="clause-lead">{t.lead}</p>

      <div className="sign-grid">
        <div className="sign-party">
          <p className="sign-label">{sign.builder}</p>
          <p className="sign-name">Ahmed Chioua</p>
          <p className="sign-role">{sign.builderRole}</p>
        </div>
        <div className="sign-party">
          <p className="sign-label">{sign.client}</p>
          <div className="cta-row">
            <a className="btn-ink" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{ui.cta.short}</a>
            <a className="btn-wa" href={ui.whatsappUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              {t.whatsapp}
            </a>
          </div>
          <p className="sign-role">{sign.clientRole}</p>
        </div>
      </div>
      <p className="clause-note">{t.terms}</p>

      <div className="contact-grid">
        <div>
          <dl className="details">
            {details(ui).map(d => (
              <div key={d.label}>
                <dt>{d.label}</dt>
                <dd>{d.href ? <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{d.value}</a> : d.value}</dd>
              </div>
            ))}
          </dl>
          <p className="clause-note">
            {t.notReady}{' '}
            <a className="link-teal" href={REPO_URL} target="_blank" rel="noopener noreferrer">{t.readCode}</a>
          </p>
        </div>

        <form className="sheet-form" name="contact" onSubmit={submit} aria-labelledby="contact-form-title">
          <h3 id="contact-form-title" className="form-title">{sign.write}</h3>
          {/* The honeypot: hidden from people and from assistive technology alike. */}
          <div hidden><label>Skip <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="cf-name">{t.fields.name.label}</label>
              <input id="cf-name" name="name" autoComplete="name" placeholder={t.fields.name.placeholder} required {...check} />
            </div>
            <div className="field">
              <label htmlFor="cf-email">{t.fields.email.label}</label>
              <input id="cf-email" type="email" name="email" autoComplete="email" placeholder={t.fields.email.placeholder} required {...check} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="cf-subject">{t.fields.subject.label}</label>
            <input id="cf-subject" name="subject" placeholder={t.fields.subject.placeholder} required {...check} />
          </div>
          <div className="field">
            <label htmlFor="cf-message">{t.fields.message.label}</label>
            <textarea id="cf-message" name="message" rows="5" placeholder={t.fields.message.placeholder} required {...check} />
          </div>
          <button type="submit" className={`btn-ink form-submit ${status}`} disabled={status === 'sending'}>
            {t.submit[status]}
          </button>
          {/* The button's label carries the state visually; this announces it. */}
          <p className="sr-only" role="status">{status === 'idle' ? '' : t.submit[status]}</p>
        </form>
      </div>
    </section>
  )
}

export default Contact
