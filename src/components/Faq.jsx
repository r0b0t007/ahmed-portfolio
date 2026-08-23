import { useFadeIn } from '../hooks/useFadeIn'
import { faqs } from '../content/faqs'

const Row = ({ f }) => {
  const ref = useFadeIn(0.1)
  return (
    <div ref={ref} className="fade-in ed-faq-item">
      <h3 className="ed-faq-q">{f.q}</h3>
      <p className="ed-faq-a">{f.a}</p>
    </div>
  )
}

const Faq = () => (
  <section id="faq" className="section">
    <div className="eyebrow-block">
      <div className="eyebrow-row">
        <span className="eyebrow">Questions</span>
        <span className="eyebrow-index">( 06 )</span>
      </div>
      <h2 className="sec-title">Straight <em>answers</em></h2>
    </div>

    <div className="ed-faq-grid">
      {faqs.map(f => <Row key={f.q} f={f} />)}
    </div>

    <style>{`
      .ed-faq-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 0 56px; max-width: 1040px;
      }
      .ed-faq-item { padding: 26px 0; border-bottom: 1px solid var(--hair); }
      .ed-faq-q {
        font-family: var(--serif); font-size: 1.2rem; font-weight: 400;
        line-height: 1.35; margin-bottom: 10px;
      }
      .ed-faq-a { font-size: 0.92rem; color: var(--ink-2); line-height: 1.8; }
      @media (max-width: 820px) { .ed-faq-grid { grid-template-columns: 1fr; } }
    `}</style>
  </section>
)

export default Faq
