import { faqs } from '../content/faqs'

/** One question and its answer, side by side on the grid. */
export const FaqRow = ({ f }) => (
  <div className="row row--faq">
    <h3 className="title">{f.q}</h3>
    <div className="row-body"><p>{f.a}</p></div>
  </div>
)

export const FaqRows = ({ list }) => (
  <div className="rows">
    {list.map(f => <FaqRow key={f.q} f={f} />)}
  </div>
)

const Faq = () => (
  <section id="faq" className="band">
    <div className="shell">
      <div className="sec-head">
        <h2 className="head">Straight answers</h2>
      </div>
      <FaqRows list={faqs} />
    </div>
  </section>
)

export default Faq
