import { proofItems as items } from '../content/proof'
import { productsPhrase } from '../content/products'
import { ordinal } from '../lib/ordinal'

/** One row of a numbered index: number, title, what to check, and where to check it. */
export const ProofItem = ({ it, i }) => (
  <li className="row">
    <span className="row-i">{ordinal(i, 2)}</span>
    <h3 className="title">{it.title}</h3>
    <div className="row-body"><p>{it.body}</p></div>
    {/* Other sites open in a new tab (↗); a page on this site opens in place (the border arrow). */}
    {it.link && (it.link.href.startsWith('/')
      ? <a className="link row-link" href={it.link.href}>{it.link.label}<span className="arrow" aria-hidden="true" /></a>
      : <a className="link row-link" href={it.link.href} target="_blank" rel="noopener noreferrer">{it.link.label} ↗</a>)}
  </li>
)

/** The index itself: an ordered list, because it is the order to check things in. */
export const ProofRows = ({ list }) => (
  <ol className="rows">
    {list.map((it, i) => <ProofItem key={it.title} it={it} i={i} />)}
  </ol>
)

const Proof = () => (
  <section id="proof" className="band">
    <div className="shell">
      <div className="sec-head">
        <h2 className="head">Don&rsquo;t take my word for it. <em>Take two minutes.</em></h2>
        <p className="lead">
          I won&rsquo;t show you client logos I haven&rsquo;t earned. I&rsquo;ll show you things you
          can look up: {productsPhrase}, this site, its source, and the track record behind it.
        </p>
      </div>

      <ProofRows list={items} />
    </div>
  </section>
)

export default Proof
