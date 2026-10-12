import { BenefitCard } from '../components/BenefitCard'
import { Breadcrumb } from '../components/Breadcrumb'
import { Steps } from '../components/Process'
import { ProofRows } from '../components/Proof'
import { FaqRows } from '../components/Faq'
import { BOOKING_URL, FIRST_LINK_DAYS, LAUNCH_COVER_DAYS } from '../content/site'
import { useContent } from '../lib/content-context'

/**
 * One service, end to end: what it is, what's in it, how the weeks go, what it costs, what to
 * check, and the questions buyers ask. All copy comes from src/content in the page's language
 * (src/content/locale.js); this file only lays it out with the homepage's classes, so the page
 * reads as part of the same sheet.
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

  return (
    <>
      <section id="hero" className="band page-hero">
        <div className="shell">
          <div className="page-hero-text">
            <Breadcrumb name={s.name} />
            <h1 className="display">{s.h1} <em>{s.h1Em}</em></h1>
            <p className="lead">{s.lead}</p>
            <div className="cta-row">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn">{ui.cta.short}</a>
              <a href="#price" className="link">{t.seePrice}</a>
            </div>
          </div>
          {/* The spec sheet: each figure is the value of the label under it. dt comes first in the
              DOM, as the element requires; CSS lifts the figure visually (order: -1 on dd). */}
          <dl className="spec">
            {facts.map(f => (
              <div key={f.l}>
                <dt className="label">{f.l}</dt>
                <dd>{f.n}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="included" className="band">
        <div className="shell">
          <div className="sec-head">
            <h2 className="head">{t.included.title} <em>{t.included.em}</em></h2>
            <p className="lead">{s.framing}</p>
          </div>
          <ul className="matrix matrix--3">
            {s.included.map(b => <BenefitCard key={b.title} b={b} />)}
          </ul>
        </div>
      </section>

      <section id="weeks" className="band">
        <div className="shell">
          <div className="sec-head">
            <h2 className="head">{t.weeks.title(s.weeks)} <em>{t.weeks.em}</em></h2>
            <p className="lead">{t.weeks.lead}</p>
          </div>
          <Steps list={steps} />
        </div>
      </section>

      <section id="price" className="band">
        <div className="shell">
          <div className="sec-head">
            <h2 className="head">{t.price.title(s.priceLabel)} <em>{t.price.em}</em></h2>
            <p className="lead">{t.price.lead(s.priceLabel)}</p>
            <p className="lead">{ui.offer.movers}</p>
            <p className="lead"><b>{t.price.founding}</b> {ui.offer.founding}</p>
          </div>
          <div className="cta-row">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn">{t.price.cta}</a>
          </div>
        </div>
      </section>

      <section id="proof" className="band">
        <div className="shell">
          <div className="sec-head">
            <h2 className="head">{s.proofTitle} <em>{s.proofTitleEm}</em></h2>
            <p className="lead">{s.proofLead}</p>
          </div>
          <ProofRows list={proofs[s.proof]} />
        </div>
      </section>

      <section id="faq" className="band">
        <div className="shell">
          <div className="sec-head">
            <h2 className="head">{t.faq.title} <em>{t.faq.em}</em></h2>
          </div>
          <FaqRows list={s.faqIds.map(faqById)} />
        </div>
      </section>
    </>
  )
}

export default ServicePage
