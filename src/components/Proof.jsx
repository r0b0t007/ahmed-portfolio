import { useFadeIn } from '../hooks/useFadeIn'
import { products } from '../content/products'

const REPO = 'https://github.com/r0b0t007/ahmed-portfolio'
const LINKEDIN = 'https://linkedin.com/in/ahmedchioua'

const items = [
  ...products.map(p => ({ title: p.name, body: p.card, link: { label: p.label, href: p.url } })),
  {
    title: 'This site',
    body: 'Designed, built and deployed by me. React, hand-written CSS, no template, no page builder. Scores 100 / 100 / 100 on Lighthouse for accessibility, best practices and SEO — run it yourself.',
    link: null,
  },
  {
    title: 'The source',
    body: 'The whole thing is public. Read the code, the structured data, the build config, the commit history. If you want to know how I work, that’s the most honest answer I can give you.',
    link: { label: 'github.com/r0b0t007', href: REPO },
  },
  {
    title: 'The track record',
    body: 'Nine years of production software for companies that audit their vendors — Bell, BMW, Bayer. Verifiable, with certifications to match.',
    link: { label: 'linkedin.com/in/ahmedchioua', href: LINKEDIN },
  },
]

// The grid is two columns; an odd item count would leave the last card orphaned, so it spans.
const lastIsWide = items.length % 2 === 1

const index = n => String(n + 1).padStart(3, '0')

const Item = ({ it, i, wide }) => {
  const ref = useFadeIn(0.1)
  return (
    <div ref={ref} className={`fade-in ed-proof-item${wide ? ' ed-proof-item--wide' : ''}`}>
      <div className="ed-proof-head">
        <h3>{it.title}</h3>
        <span className="ed-proof-i">{index(i)}</span>
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
  const leadRef = useFadeIn(0.1)
  const foundingRef = useFadeIn(0.1)
  return (
    <section id="proof" className="section">
      <div className="eyebrow-block">
        <div className="eyebrow-row">
          <span className="eyebrow">Proof</span>
          <span className="eyebrow-index">( 03 )</span>
        </div>
        <h2 className="sec-title">Shipped products, and <em>this page</em></h2>
        <p ref={leadRef} className="fade-in sec-lead">
          I’m not going to show you a wall of client logos for this kind of work, because I’d be
          borrowing credit I haven’t earned yet. Here’s what I can show you instead — the products
          I build and run myself, plus this site — all of it checkable in about two minutes.
        </p>
      </div>

      <div className="hair-grid ed-proof-grid">
        {items.map((it, i) => (
          <Item key={it.title} it={it} i={i} wide={lastIsWide && i === items.length - 1} />
        ))}
      </div>

      <div ref={foundingRef} className="fade-in ed-founding">
        <span className="ed-founding-label">Founding clients</span>
        <p>
          I’m building the client side of this portfolio deliberately, which means the first few
          projects go out at founding rates in exchange for a case study and a reference. You get
          senior work below market; I get proof. Say so when you get in touch.
        </p>
      </div>

    </section>
  )
}

export default Proof
