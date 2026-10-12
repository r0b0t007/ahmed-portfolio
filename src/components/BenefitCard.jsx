/**
 * One cell of a ruled matrix: a title and a few short lines. Benefits (on the plate), Handoff and
 * the service pages' "what you get" all render it, so the three read as one system. `mark` adds
 * the quarter-disc in the cell's corner; the plate leaves it off.
 */
export const BenefitCard = ({ b, mark = true }) => (
  <li>
    {mark && <span className="qdisc" aria-hidden="true" />}
    <h3 className="title">{b.title}</h3>
    {b.lines.map(l => <p key={l}>{l}</p>)}
  </li>
)
