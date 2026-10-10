import { BenefitCard } from '../components/BenefitCard'
import { Breadcrumb } from '../components/Breadcrumb'
import { Eyebrow as SharedEyebrow } from '../components/Eyebrow'
import { Step } from '../components/Process'
import { ProofItem } from '../components/Proof'
import { FaqRow } from '../components/Faq'
import { BOOKING_URL, FIRST_LINK_DAYS, LAUNCH_COVER_DAYS } from '../content/site'
import { useContent } from '../lib/content-context'
import { serviceSectionIndex as idx } from '../lib/sections'
import { spansLastRow } from '../lib/grid'

const Eyebrow = ({ label, id }) => <SharedEyebrow label={label} index={idx(id)} />

/**
 * One service, end to end: what it is, what's in it, how the weeks go, what it costs, what to
 * check, and the questions buyers ask. All copy comes from src/content in the page's language
 * (src/content/locale.js); this file only lays it out with the homepage's classes, so the page
 * reads as part of the same site.
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

  return (
    <>
      <section id="hero" className="section svc-hero">
        <Breadcrumb name={s.name} />
        <h1 className="ed-h1">{s.h1} <em>{s.h1Em}</em></h1>
        <p className="ed-lead">{s.lead}</p>
        <div className="ed-cta-row">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">{ui.cta.long}</a>
          <a href="#price" className="link-teal">{t.seePrice}</a>
        </div>
        {/* A <dl>: each figure is the value of the label above it. dt comes first in the DOM, as
            the element requires; CSS lifts the figure visually (order: -1 on dd). */}
        <dl className="svc-facts">
          {facts.map(f => (
            <div key={f.l}>
              <dt>{f.l}</dt>
              <dd>{f.n}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="included" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={t.included.eyebrow} id="included" />
          <h2 className="sec-title">{t.included.title} <em>{t.included.em}</em></h2>
          <p className="sec-lead">{s.framing}</p>
        </div>
        <div className="hair-grid ed-ben-grid">
          {s.included.map((b, i) => <BenefitCard key={b.title} b={b} i={i} />)}
        </div>
      </section>

      <section id="weeks" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={t.weeks.eyebrow} id="weeks" />
          <h2 className="sec-title">{t.weeks.title(s.weeks)} <em>{t.weeks.em}</em></h2>
          <p className="sec-lead">{t.weeks.lead}</p>
        </div>
        <div className="ed-steps">
          {steps.map((st, i) => <Step key={st.title} s={st} i={i} />)}
        </div>
      </section>

      <section id="price" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={t.price.eyebrow} id="price" />
          <h2 className="sec-title">{t.price.title(s.priceLabel)} <em>{t.price.em}</em></h2>
          <p className="sec-lead">{t.price.lead(s.priceLabel)}</p>
        </div>
        <p className="ed-price-note">{ui.offer.movers}</p>
        <p className="ed-price-note"><b>{t.price.founding}</b> {ui.offer.founding}</p>
        <div className="ed-cta-row svc-price-cta">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">{t.price.cta}</a>
        </div>
      </section>

      <section id="proof" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={t.proof.eyebrow} id="proof" />
          <h2 className="sec-title">{s.proofTitle} <em>{s.proofTitleEm}</em></h2>
          <p className="sec-lead">{s.proofLead}</p>
        </div>
        <div className="hair-grid ed-proof-grid">
          {proof.map((it, i) => <ProofItem key={it.title} it={it} i={i} wide={spansLastRow(proof, i)} />)}
        </div>
      </section>

      <section id="faq" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={t.faq.eyebrow} id="faq" />
          <h2 className="sec-title">{t.faq.title} <em>{t.faq.em}</em></h2>
        </div>
        <div className="ed-faq-grid">
          {s.faqIds.map(faqById).map(f => <FaqRow key={f.id} f={f} />)}
        </div>
      </section>
    </>
  )
}

export default ServicePage
