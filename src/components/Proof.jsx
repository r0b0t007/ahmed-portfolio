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
          <span className="eyebrow-index">( 03 )</span>
        </div>
        <h2 className="sec-title">Shipped products, and <em>this page</em></h2>
        <p className="fade-in sec-lead">
          I don’t have client logos to show you for this kind of work yet, and putting some up
          would be borrowing credit I haven’t earned. What I do have is the products I build and
          run myself, and this site. You can check all of it in about two minutes.
        </p>
      </div>

      <div className="hair-grid ed-proof-grid">
        {items.map((it, i) => (
          <Item key={it.title} it={it} i={i} wide={lastIsWide && i === items.length - 1} />
        ))}
      </div>

      <div className="fade-in ed-founding">
        <span className="ed-founding-label">Founding clients</span>
        <p>
          The first few client projects go out at reduced rates in exchange for a case study and
          a reference. You get senior work under market rate, and I get the proof I’m missing.
          Mention it when you get in touch.
        </p>
      </div>

    </section>
  )
}

export default Proof
