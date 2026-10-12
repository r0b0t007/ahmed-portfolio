import { faqs } from '../content/faqs'
import { Block } from './Split'

/**
 * One question, folded. The answers are the same strings as the FAQPage JSON-LD (vite.config.js),
 * so the structured data still matches what the page shows once a question is opened.
 */
export const FaqRow = ({ f }) => (
  <details className="fold">
    <summary><h3 className="fold-q">{f.q}</h3></summary>
    <div className="fold-body"><p>{f.a}</p></div>
  </details>
)

const Faq = () => (
  <Block id="faq" title="Straight" em="answers">
    <div className="folds">
      {faqs.map(f => <FaqRow key={f.q} f={f} />)}
    </div>
  </Block>
)

export default Faq
