import { sectionIndex } from '../lib/sections'
import { faqs } from '../content/faqs'

export const FaqRow = ({ f }) => {
  return (
    <div className="fade-in ed-faq-item">
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
        <span className="eyebrow-index">( {sectionIndex('faq')} )</span>
      </div>
      <h2 className="sec-title">Straight <em>answers</em></h2>
    </div>

    <div className="ed-faq-grid">
      {faqs.map(f => <FaqRow key={f.q} f={f} />)}
    </div>

  </section>
)

export default Faq
