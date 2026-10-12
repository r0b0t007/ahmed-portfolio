import { BenefitCard } from '../components/BenefitCard'
import { Breadcrumb } from '../components/Breadcrumb'
import { Step } from '../components/Process'
import { ProofItem } from '../components/Proof'
import { FaqRow } from '../components/Faq'
import { Split, Block } from '../components/Split'
import { BOOKING_URL, FIRST_LINK_DAYS, LAUNCH_COVER_DAYS } from '../content/site'
import { useContent } from '../lib/content-context'

/**
 * One service, end to end: what it is, what's in it, how the weeks go, what it costs, what to
 * check, and the questions buyers ask. All copy comes from src/content in the page's language
 * (src/content/locale.js); this file lays it out on the homepage's shape: the pitch card (with
 * this service's terms) on the left, the reasons on the right.
 */
const ServicePage = ({ id }) => {
  const { ui, findService, faqById, steps, proof: proofs } = useContent()
  const t = ui.service
  const s = findService(id)
  const facts = [
    { n: s.priceLabel, l: t.facts.price },
    { n: s.weeks, l: t.facts.weeks },
    { n: String(FIRST_LINK_DAYS), l: t.facts.firstLink },
    { n: String(LAUNCH_COVER_DAYS), l: t.facts.cover },
  ]
  const proof = proofs[s.proof]

  const pitch = (
    <section id="hero" className="pitch">
      <Breadcrumb name={s.name} />
      <h1 className="pitch-h1 pitch-h1--page">{s.h1} <em>{s.h1Em}</em></h1>
      <p className="pitch-lead">{s.lead}</p>
      {/* A <dl>: each figure is the value of the label beside it, set like the homepage's scope
          picker (label left, figure right). */}
      <dl className="pitch-facts">
        {facts.map(f => (
          <div key={f.l}>
            <dt>{f.l}</dt>
            <dd>{f.n}</dd>
          </div>
        ))}
      </dl>
      <p className="picker-cta">
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn">{ui.cta.short}</a>
        <a href="#price" className="link">{t.seePrice}</a>
      </p>
    </section>
  )

  return (
    <Split pitch={pitch}>
      <Block id="included" title={t.included.title} em={t.included.em} lead={s.framing}>
        <ul className="rows">
          {s.included.map(b => <BenefitCard key={b.title} b={b} />)}
        </ul>
      </Block>

      <Block id="weeks" title={t.weeks.title(s.weeks)} em={t.weeks.em} lead={t.weeks.lead}>
        <ol className="steps">
          {steps.map((st, i) => <Step key={st.title} s={st} i={i} />)}
        </ol>
      </Block>

      <Block id="price" title={t.price.title(s.priceLabel)} em={t.price.em} lead={t.price.lead(s.priceLabel)}>
        <p className="note">{ui.offer.movers}</p>
        <p className="note"><b>{t.price.founding}</b> {ui.offer.founding}</p>
        <p className="block-cta">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn">{t.price.cta}</a>
        </p>
      </Block>

      <Block id="proof" title={s.proofTitle} em={s.proofTitleEm} lead={s.proofLead}>
        <ul className="rows">
          {proof.map(it => <ProofItem key={it.title} it={it} />)}
        </ul>
      </Block>

      <Block id="faq" title={t.faq.title} em={t.faq.em}>
        <div className="folds">
          {s.faqIds.map(faqById).map(f => <FaqRow key={f.id} f={f} />)}
        </div>
      </Block>
    </Split>
  )
}

export default ServicePage
