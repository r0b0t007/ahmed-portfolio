import { proofItems as items } from '../content/proof'
import { productsPhrase } from '../content/products'
import { Block } from './Split'

/**
 * One checkable thing. Kept fully visible (not folded): this is what a buyer decides on.
 * Other sites open in a new tab (↗); a page on this site opens in place (→).
 */
export const ProofItem = ({ it }) => (
  <li className="row">
    <h3 className="row-t">{it.title}</h3>
    <p className="row-p">{it.body}</p>
    {it.link && (it.link.href.startsWith('/')
      ? <a className="link" href={it.link.href}>{it.link.label} →</a>
      : <a className="link" href={it.link.href} target="_blank" rel="noopener noreferrer">{it.link.label} ↗</a>)}
  </li>
)

const Proof = () => (
  <Block
    id="proof"
    title="Don’t take my word for it."
    em="Take two minutes."
    lead={`I won’t show you client logos I haven’t earned. I’ll show you things you can look up: ${productsPhrase}, this site, its source, and the track record behind it.`}
  >
    <ul className="rows">
      {items.map(it => <ProofItem key={it.title} it={it} />)}
    </ul>
  </Block>
)

export default Proof
