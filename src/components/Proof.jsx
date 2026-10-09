import { sectionIndex } from '../lib/sections'
import { proofItems as items } from '../content/proof'
import { ordinal } from '../lib/ordinal'
import { spansLastRow } from '../lib/grid'

export const ProofItem = ({ it, i, wide }) => {
  return (
    <div className={`fade-in ed-proof-item${wide ? ' ed-proof-item--wide' : ''}`}>
      <div className="ed-proof-head">
        <h3>{it.title}</h3>
        <span className="ed-proof-i">{ordinal(i)}</span>
      </div>
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
      <div className="eyebrow-block">
        <div className="eyebrow-row">
          <span className="eyebrow">Proof</span>
          <span className="eyebrow-index">( {sectionIndex('proof')} )</span>
        </div>
        <h2 className="sec-title">Don&rsquo;t take my word for it. <em>Take two minutes.</em></h2>
        <p className="fade-in sec-lead">
          I won&rsquo;t show you client logos I haven&rsquo;t earned. I&rsquo;ll show you things you
          can check: two products of mine that real people use right now, this site, its source,
          and the track record behind it.
        </p>
      </div>

      <div className="hair-grid ed-proof-grid">
        {items.map((it, i) => (
          <ProofItem key={it.title} it={it} i={i} wide={spansLastRow(items, i)} />
        ))}
      </div>

    </section>
  )
}

export default Proof
