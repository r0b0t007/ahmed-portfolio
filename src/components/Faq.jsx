import { faqs } from '../content/faqs'
import { numberOf } from '../lib/sections'
import { Clause } from './Doc'

/**
 * Questions as numbered, collapsible terms. Closed by default so the list scans as a contents of
 * objections; each answer is one tap away. The answer text is in the HTML either way, which the
 * FAQPage JSON-LD (vite.config.js) and the Markdown twin both rely on.
 */
export const TermsList = ({ prefix, items }) => (
  <div className="terms">
    {items.map((f, i) => (
      <details key={f.q} className="term">
        <summary>
          {/* The number is part of the question's text, as in the clause headings: never a
              label in a column beside it. */}
          <h3 className="term-q"><span className="spec-no">{prefix}.{i + 1}</span>{' '}{f.q}</h3>
        </summary>
        <p className="term-a">{f.a}</p>
      </details>
    ))}
  </div>
)

// The slip question is § 5 on the homepage, a clause of its own, so § 6 doesn't repeat it.
const OWN_CLAUSE = 'slip'

/** § 5: what happens if the date slips, the one guarantee the offer rests on. */
export const DateClause = () => {
  const f = faqs.find(x => x.id === OWN_CLAUSE)
  return (
    <Clause type="home" id="date" title={f.q}>
      <p className="clause-lead">{f.a}</p>
    </Clause>
  )
}

const Faq = () => (
  <Clause type="home" id="faq" title="Straight" accent="answers">
    <TermsList prefix={numberOf('home', 'faq')} items={faqs.filter(f => f.id !== OWN_CLAUSE)} />
  </Clause>
)

export default Faq
