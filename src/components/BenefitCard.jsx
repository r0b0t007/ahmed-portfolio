/**
 * One row of an inspection checklist: the standard, then what it means. Benefits, Handoff and a
 * service page's "included" all render it, so the three stay one system. The rows are not a
 * sequence, so they carry no number.
 */
export const BenefitCard = ({ b }) => (
  <div className="ed-ben">
    <h3 className="ed-ben-t">{b.title}</h3>
    {b.lines.map(l => <p key={l} className="ed-ben-l">{l}</p>)}
  </div>
)
