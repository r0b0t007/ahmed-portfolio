import { ordinal } from '../lib/ordinal'

/**
 * One card of a three-column hair-grid: a mono index, a serif title and a few short lines.
 * Benefits and Handoff both render it, so the two sections stay one system.
 */
export const BenefitCard = ({ b, i }) => (
  <div className="fade-in ed-ben">
    <div className="ed-ben-n">( {ordinal(i, 2)} )</div>
    <h3 className="ed-ben-t">{b.title}</h3>
    {b.lines.map(l => <p key={l} className="ed-ben-l">{l}</p>)}
  </div>
)
