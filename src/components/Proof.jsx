import { products } from '../content/products'
import { ordinal } from '../lib/ordinal'

const REPO = 'https://github.com/r0b0t007/ahmed-portfolio'
const LINKEDIN = 'https://linkedin.com/in/ahmedchioua'

const items = [
  ...products.map(p => ({ title: p.name, body: p.card, link: { label: p.label, href: p.url } })),
  {
    title: 'This site',
    body: 'Designed, built and deployed by me, in React with hand-written CSS. No template, no page builder. It scores 100 / 100 / 100 on Lighthouse for accessibility, best practices and SEO. Run it yourself if you want to check.',
    link: null,
  },
  {
    title: 'The source',
    body: 'The whole repository is public: the code, the structured data, the build config and every commit since the first one. It answers the question of how I work better than anything I could write here.',
    link: { label: 'github.com/r0b0t007', href: REPO },
  },
  {
    title: 'The track record',
    body: 'Nine years of production software for Bell, BMW and Bayer, delivered through NTT DATA and a consulting engagement. It’s all on LinkedIn, with the certifications alongside it.',
    link: { label: 'linkedin.com/in/ahmedchioua', href: LINKEDIN },
  },
]

// The grid is two columns; an odd item count would leave the last card orphaned, so it spans.
const lastIsWide = items.length % 2 === 1

const Item = ({ it, i, wide }) => {
  return (
    <div className={`fade-in ed-proof-item${wide ? ' ed-proof-item--wide' : ''}`}>
      <div className="ed-proof-head">
        <h3>{it.title}</h3>
        <span className="ed-proof-i">{ordinal(i)}</span>
      </div>
      <p className="ed-proof-body">{it.body}</p>
      {it.link && (
        <a className="ed-proof-link" href={it.link.href} target="_blank" rel="noopener noreferrer">
          {it.link.label} ↗
        </a>
      )}
    </div>
  )
}

const Proof = () => {
  return (
    <section id="proof" className="section">
      <div className="eyebrow-block">
        <div className="eyebrow-row">
          <span className="eyebrow">Proof</span>
          <span className="eyebrow-index">( 05 )</span>
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
          <Item key={it.title} it={it} i={i} wide={lastIsWide && i === items.length - 1} />
        ))}
      </div>

    </section>
  )
}

export default Proof
