import { proofItems as items } from '../content/proof'
import { productsPhrase } from '../content/products'

export const ProofItem = ({ it }) => {
  return (
    <div className="ed-proof-item">
      <h3 className="ed-proof-head">{it.title}</h3>
      <p className="ed-proof-body">{it.body}</p>
      {/* Other sites open in a new tab (↗); a page on this site opens in place (→). */}
      {it.link && (it.link.href.startsWith('/')
        ? <a className="ed-proof-link" href={it.link.href}>{it.link.label} →</a>
        : <a className="ed-proof-link" href={it.link.href} target="_blank" rel="noopener noreferrer">{it.link.label} ↗</a>)}
    </div>
  )
}

const Proof = () => {
  return (
    <section id="proof" className="section">
      <div className="sec-head">
        <h2 className="sec-title">Don&rsquo;t take my word for it. <em>Take two minutes.</em></h2>
        <p className="sec-lead">
          I won&rsquo;t show you client logos I haven&rsquo;t earned. I&rsquo;ll show you things you
          can look up: {productsPhrase}, this site, its source, and the track record behind it.
        </p>
      </div>

      <div className="ed-proof-grid">
        {items.map(it => (
          <ProofItem key={it.title} it={it} />
        ))}
      </div>

    </section>
  )
}

export default Proof
