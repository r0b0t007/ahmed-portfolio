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

/**
 * The fields are uncontrolled on purpose. This island hydrates lazily (src/main.jsx), so there is
 * a window after first paint in which the visitor can type into the prerendered form before
 * React attaches. Controlled inputs start that render with empty state and blank whatever was
 * typed on the first keystroke after hydration; reading the values off the form at submit time
 * cannot lose them. It also drops a re-render per keystroke.
 *
 * An island: its words come from the locale App.jsx serialises into data-props.
 */
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

const Contact = ({ locale = 'en' }) => {
  const ui = uiFor(locale)
  const t = ui.contact
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
    <section id="contact" className="section">
      <div className="ed-contact">
        <div className="ed-contact-left">
          <div className="sec-head ed-contact-head">
            <h2 className="sec-title">{t.title} <em>{t.em}</em></h2>
            <p className="sec-lead">{t.lead}</p>
            <div className="ed-contact-btns">
              <a className="btn-ink" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                {ui.cta.short}
              </a>
              <a className="btn-wa" href={ui.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                {t.whatsapp}
              </a>
            </div>
            <dl className="ed-details">
              {details(ui).map(d => (
                <div key={d.label} className="ed-detail">
                  <dt>{d.label}</dt>
                  <dd>{d.href ? <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{d.value}</a> : d.value}</dd>
                </div>
              ))}
            </dl>
            <p className="ed-alt-cta">{t.terms}</p>
            <p className="ed-alt-cta">
              {t.notReady}{' '}
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">{t.readCode}</a>
            </p>
          </div>
        </div>

        {/* method="post": a submit in the window before hydration goes out natively, and a GET
            would put the visitor's name, email and message in the URL, history and logs. */}
        <form className="ed-form" name="contact" method="post" onSubmit={submit}>
          <div style={{ display: 'none' }} aria-hidden="true"><label>Skip: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></div>
          {/* Each label names its field (htmlFor/id), so assistive tech and a click on the label
              both reach the input. */}
          <div className="ed-form-row">
            <div className="ed-fg"><label htmlFor="cf-name">{t.fields.name.label}</label><input id="cf-name" name="name" autoComplete="name" placeholder={t.fields.name.placeholder} required {...check} /></div>
            <div className="ed-fg"><label htmlFor="cf-email">{t.fields.email.label}</label><input id="cf-email" type="email" name="email" autoComplete="email" placeholder={t.fields.email.placeholder} required {...check} /></div>
          </div>
          <div className="ed-fg"><label htmlFor="cf-subject">{t.fields.subject.label}</label><input id="cf-subject" name="subject" placeholder={t.fields.subject.placeholder} required {...check} /></div>
          <div className="ed-fg"><label htmlFor="cf-message">{t.fields.message.label}</label><textarea id="cf-message" name="message" rows="5" placeholder={t.fields.message.placeholder} required {...check} /></div>
          <button type="submit" className={`ed-submit ${status}`} disabled={status === 'sending'}>
            {t.submit[status]}
          </button>
          {/* The button's label changes with the outcome, but a label change is not announced.
              This line is: success and failure reach screen readers too. */}
          <p className="sr-only" role="status">{status === 'success' || status === 'error' ? t.submit[status] : ''}</p>
        </form>
      </div>

    </section>
  )
}

export default Contact
