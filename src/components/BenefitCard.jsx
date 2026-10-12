/**
 * One row of a short list: a bold title and its lines run together as one paragraph. Benefits,
 * Handoff and each service page's "What you get" render it inside a <ul className="rows">, so the
 * three read as one system. (Named for the cards it replaced.)
 */
export const BenefitCard = ({ b }) => (
  <li className="row">
    <h3 className="row-t">{b.title}</h3>
    <p className="row-p">{b.lines.join(' ')}</p>
  </li>
)
