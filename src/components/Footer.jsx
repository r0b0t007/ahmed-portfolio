import { BOOKING_URL, REPO_URL, SITE_URL } from '../content/site'
import { useContent } from '../lib/content-context'
import { BUILD_COMMIT, formatBuildDate } from '../lib/build'

const routes = whatsappUrl => [
  { label: 'Email', href: 'mailto:ahmedchioua@gmail.com' },
  { label: 'WhatsApp', href: whatsappUrl },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ahmedchioua' },
  { label: 'GitHub', href: 'https://github.com/r0b0t007' },
]

// Lighthouse run against the live homepage, so "run it yourself" is one click.
const PAGESPEED = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(SITE_URL)}`

/**
 * The colophon: where this page came from, set the way a document states its printing. The
 * revision is the build's own commit and date (src/lib/build.js), so the line can't go stale; the
 * Lighthouse figures are the ones measured and published in the build log, with the means to
 * re-run them.
 */
const Footer = () => {
  const { ui } = useContent()
  const c = ui.doc.colophon
  const date = formatBuildDate(ui.lang)
  return (
    <footer className="colophon">
      <p className="colophon-name"><b>Ahmed Chioua</b> {ui.footer.tag}</p>
      <dl className="colophon-facts">
        {(date || BUILD_COMMIT) && (
          <div>
            <dt>{c.revision}</dt>
            <dd>
              {date}
              {BUILD_COMMIT && <>{date && ' · '}<a href={`${REPO_URL}/commit/${BUILD_COMMIT}`} target="_blank" rel="noopener noreferrer">commit {BUILD_COMMIT}</a></>}
            </dd>
          </div>
        )}
        <div>
          <dt>{c.source}</dt>
          <dd><a href={REPO_URL} target="_blank" rel="noopener noreferrer">github.com/r0b0t007/ahmed-portfolio</a></dd>
        </div>
        <div>
          <dt>{c.lighthouse}</dt>
          <dd>{c.lighthouseText} <a href={PAGESPEED} target="_blank" rel="noopener noreferrer">{c.runIt} ↗</a></dd>
        </div>
        <div>
          <dt>{c.contact}</dt>
          <dd>
            {routes(ui.whatsappUrl).map((r, i) => (
              <span key={r.label}>
                {i > 0 && ' · '}
                <a href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{r.label}</a>
              </span>
            ))}
          </dd>
        </div>
      </dl>
      <p className="colophon-rights">
        <span>{ui.footer.rights}</span>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{ui.cta.short} ↗</a>
      </p>
    </footer>
  )
}

export default Footer
