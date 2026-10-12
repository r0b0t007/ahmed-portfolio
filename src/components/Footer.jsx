import { BOOKING_URL, REPO_URL } from '../content/site'
import { useContent } from '../lib/content-context'

const links = whatsappUrl => [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ahmedchioua' },
  { label: 'WhatsApp', href: whatsappUrl },
  { label: 'Email', href: 'mailto:ahmedchioua@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/r0b0t007' },
]

/**
 * Ft4, a colophon rather than a sitemap: the wordmark, the offer in one line, where to reach me,
 * and where the source is. Every link is a word, not an icon, so it says where it goes.
 */
const Footer = () => {
  const { ui } = useContent()
  return (
    <footer className="band colophon">
      <div className="shell">
        <p className="colophon-word">Ahmed Chioua</p>
        <p className="colophon-text">
          {ui.footer.tag}{' '}
          {links(ui.whatsappUrl).map((l, i) => (
            <span key={l.label}>
              {i > 0 && ' · '}
              <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{l.label}</a>
            </span>
          ))}
          {' · '}
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">Source</a>
        </p>
        <p className="colophon-meta">
          <span className="label">{ui.footer.rights}</span>
          <a className="link" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{ui.cta.short} ↗</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
