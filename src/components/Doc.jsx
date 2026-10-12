import { REPO_URL } from '../content/site'
import { useContent } from '../lib/content-context'
import { isAnnex, numberOf } from '../lib/sections'
import { BUILD_COMMIT, formatBuildDate } from '../lib/build'

/**
 * The scope-document system every page is set in. The offer is a contract (a working link in N
 * days, a fixed price, a date in writing), so the pages are set the way that contract would be:
 * a cover with the parties and the revision, numbered clauses, ruled key/value terms, lettered
 * annexes and a signature block (Contact.jsx). These primitives are the whole vocabulary; pages
 * compose them and never style a section of their own.
 */

/**
 * One numbered clause (or lettered annex) of the document. `type` is the page type whose order in
 * src/lib/sections.js numbers it. The number is part of the heading text, the way "4. Payment"
 * is in a contract: not a label above or beside it. `accent` is the second half of a two-part
 * heading, set lighter rather than in italics.
 */
export const Clause = ({ type, id, title, accent, lead, children }) => {
  const { ui } = useContent()
  const no = numberOf(type, id)
  const label = isAnnex(type, id) ? ui.doc.annex(no) : ui.doc.clause(no)
  const leads = lead == null ? [] : Array.isArray(lead) ? lead : [lead]
  return (
    <section id={id} className="clause">
      <h2 className="clause-title">
        <span className="clause-no">{label}</span>{' '}
        {title}
        {accent && <>{' '}<span className="clause-title-soft">{accent}</span></>}
      </h2>
      {leads.map((l, i) => <p key={i} className="clause-lead">{l}</p>)}
      {children}
    </section>
  )
}

/**
 * Ruled key/value rows, numbered as sub-clauses ("1.1", "1.2"). Each row is a term and what it
 * means: the spec-sheet form of what used to be a grid of cards. `rows` carry their own content
 * as children so a row can hold a list, a link or a table without this component knowing.
 */
export const SpecList = ({ prefix, rows }) => (
  <dl className="spec">
    {rows.map((r, i) => (
      <div key={r.key ?? i} className="spec-row">
        <dt>
          {prefix != null && <span className="spec-no">{prefix}.{i + 1}</span>}
          <span className="spec-term">{r.term}</span>
          {r.sub && <span className="spec-sub">{r.sub}</span>}
        </dt>
        <dd>{r.body}</dd>
      </div>
    ))}
  </dl>
)

/**
 * A short table of the offer's numbers, each with its unit spelled out in the label. The figure
 * is the value of its label, so it is the <dd>; CSS sets it first in the row.
 */
export const KeyTerms = ({ caption, rows }) => (
  <div className="terms-box">
    <p className="terms-caption">{caption}</p>
    <dl className="key-terms">
      {rows.map(r => (
        <div key={r.l}>
          <dt>{r.l}</dt>
          <dd>{r.n}</dd>
        </div>
      ))}
    </dl>
  </div>
)

/**
 * The primary booking button. Its full label ("Claim a 10-Day Prototype Slot") can't fit a phone
 * on one line, and a button label never wraps, so below 30rem it switches to the page's short
 * label (ui.cta.short, the same words the signature block uses). The hidden span is display:
 * none, so the accessible name is always the label on screen.
 */
export const BookButton = ({ href }) => {
  const { ui } = useContent()
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="btn-ink">
      <span className="label-long">{ui.cta.long}</span>
      <span className="label-short">{ui.cta.short}</span>
    </a>
  )
}

/** The revision line: build date and commit, the commit linking to its diff on GitHub. */
export const Revision = () => {
  const { ui } = useContent()
  const date = formatBuildDate(ui.lang)
  if (!date && !BUILD_COMMIT) return null
  return (
    <span className="doc-revision">
      {ui.doc.revision} {date}
      {BUILD_COMMIT && <>{' · '}<a href={`${REPO_URL}/commit/${BUILD_COMMIT}`} target="_blank" rel="noopener noreferrer"><code>{BUILD_COMMIT}</code></a></>}
    </span>
  )
}

/**
 * The document cover, for the two homepages: what the document is, its revision, the title, the
 * offer in a paragraph, the primary action, then the parties and the key terms.
 *
 * The portrait is an ID photo beside "Prepared by", not a hero: 72px everywhere, so it costs the
 * 320w file (9 KB) at any density and never competes with the headline for the first screen.
 * alt is empty because the name sits right beside it.
 */
export const DocCover = ({ title, accent, lead, actions, preparedFor, byline, track, terms }) => {
  const { ui } = useContent()
  return (
    <section id="hero" className="cover">
      <p className="doc-meta">
        <span className="doc-label">{ui.doc.label}</span>
        <Revision />
      </p>
      <div className="cover-grid">
        <div className="cover-main">
          <h1 className="doc-title">{title} <span className="doc-title-accent">{accent}</span></h1>
          <p className="cover-lead">{lead}</p>
          <div className="cta-row">{actions}</div>
        </div>
        <div className="cover-side">
          <dl className="parties">
            <div>
              <dt>{ui.doc.preparedBy}</dt>
              <dd className="party-by">
                <picture>
                  <source type="image/avif" srcSet="/headshot-320.avif 320w" sizes="72px" />
                  <img src="/headshot-320.webp" srcSet="/headshot-320.webp 320w" sizes="72px" width="72" height="72" alt="" decoding="async" />
                </picture>
                <span><b>Ahmed Chioua</b>{' '}{byline}</span>
              </dd>
            </div>
            <div>
              <dt>{ui.doc.preparedFor}</dt>
              <dd>{preparedFor}</dd>
            </div>
            {track && (
              <div>
                <dt>{ui.doc.trackRecord}</dt>
                <dd>{track}</dd>
              </div>
            )}
          </dl>
          {terms && <KeyTerms caption={ui.doc.keyTerms} rows={terms} />}
        </div>
      </div>
    </section>
  )
}

/**
 * The cover for service pages and build logs: breadcrumb, revision, title, lead, actions and the
 * page's own key terms. No parties: the homepage already introduced them.
 */
export const PageCover = ({ crumb, title, accent, lead, actions, terms, children }) => {
  const { ui } = useContent()
  return (
    <section id="hero" className="cover cover--page">
      <div className="doc-meta">
        {crumb}
        <Revision />
      </div>
      <div className="cover-grid">
        <div className="cover-main">
          <h1 className="doc-title">{title}{accent && <>{' '}<span className="doc-title-accent">{accent}</span></>}</h1>
          <p className="cover-lead">{lead}</p>
          {actions && <div className="cta-row">{actions}</div>}
        </div>
        {terms && (
          <div className="cover-side">
            <KeyTerms caption={ui.doc.keyTerms} rows={terms} />
          </div>
        )}
      </div>
      {children}
    </section>
  )
}
