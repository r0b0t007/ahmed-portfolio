/**
 * One column of a three-column band: a title and a few short lines. Benefits, Handoff and the
 * service pages all render it, so those sections stay one system.
 */
export const BenefitCard = ({ b }) => (
  <div className="fade-in ed-ben">
    <h3 className="ed-ben-t">{b.title}</h3>
    {b.lines.map(l => <p key={l} className="ed-ben-l">{l}</p>)}
  </div>
)
