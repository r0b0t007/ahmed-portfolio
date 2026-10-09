import { BenefitCard } from '../components/BenefitCard'
import { Breadcrumb } from '../components/Breadcrumb'
import { Eyebrow as SharedEyebrow } from '../components/Eyebrow'
import { Step } from '../components/Process'
import { ProofItem } from '../components/Proof'
import { FaqRow } from '../components/Faq'
import { findService } from '../content/services'
import { faqById } from '../content/faqs'
import { steps } from '../content/process'
import { productProof, siteProof } from '../content/proof'
import {
  BOOKING_URL, CTA_LABEL_LONG, FIRST_LINK_DAYS, FOUNDING_OFFER, LAUNCH_COVER_DAYS, PRICE_MOVERS,
  PRICE_PROMISE,
} from '../content/site'
import { serviceSectionIndex as idx } from '../lib/sections'
import { spansLastRow } from '../lib/grid'

const PROOF = { site: siteProof, products: productProof }

const Eyebrow = ({ label, id }) => <SharedEyebrow label={label} index={idx(id)} />

/**
 * One service, end to end: what it is, what's in it, how the weeks go, what it costs, what to
 * check, and the questions buyers ask. All copy comes from src/content; this file only lays it
 * out with the homepage's classes, so the page reads as part of the same site.
 */
const ServicePage = ({ slug }) => {
  const s = findService(slug)
  const facts = [
    { n: s.priceLabel, l: 'Starting price, fixed per project in writing' },
    { n: s.weeks, l: 'Weeks, usually, from kickoff to launch' },
    { n: String(FIRST_LINK_DAYS), l: 'Days to your first working link' },
    { n: String(LAUNCH_COVER_DAYS), l: 'Days of post-launch fixes, included' },
  ]
  const proof = PROOF[s.proof]

  return (
    <>
      <section id="hero" className="section svc-hero">
        <Breadcrumb name={s.name} />
        <h1 className="ed-h1">{s.h1} <em>{s.h1Em}</em></h1>
        <p className="ed-lead">{s.lead}</p>
        <div className="ed-cta-row">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">{CTA_LABEL_LONG}</a>
          <a href="#price" className="link-teal">See the price →</a>
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
          <Eyebrow label="What you get" id="included" />
          <h2 className="sec-title">Everything it takes <em>to go live.</em></h2>
          <p className="sec-lead">{s.framing}</p>
        </div>
        <div className="hair-grid ed-ben-grid">
          {s.included.map((b, i) => <BenefitCard key={b.title} b={b} i={i} />)}
        </div>
      </section>

      <section id="weeks" className="section">
        <div className="eyebrow-block">
          <Eyebrow label="How the weeks run" id="weeks" />
          <h2 className="sec-title">Usually live in {s.weeks} weeks. <em>A link on day {FIRST_LINK_DAYS}.</em></h2>
          <p className="sec-lead">The same four steps as every project, and you can see it running from the first one.</p>
        </div>
        <div className="ed-steps">
          {steps.map((st, i) => <Step key={st.title} s={st} i={i} />)}
        </div>
      </section>

      <section id="price" className="section">
        <div className="eyebrow-block">
          <Eyebrow label="Price" id="price" />
          <h2 className="sec-title">From {s.priceLabel}. <em>Quoted once.</em></h2>
          <p className="sec-lead">{s.priceLabel} is the starting point. {PRICE_PROMISE}</p>
        </div>
        <p className="ed-price-note">{PRICE_MOVERS}</p>
        <p className="ed-price-note"><b>Founding-client rate:</b> {FOUNDING_OFFER}</p>
        <div className="ed-cta-row svc-price-cta">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">Lock in a price and a date</a>
        </div>
      </section>

      <section id="proof" className="section">
        <div className="eyebrow-block">
          <Eyebrow label="Proof" id="proof" />
          <h2 className="sec-title">{s.proofTitle} <em>{s.proofTitleEm}</em></h2>
          <p className="sec-lead">{s.proofLead}</p>
        </div>
        <div className="hair-grid ed-proof-grid">
          {proof.map((it, i) => <ProofItem key={it.title} it={it} i={i} wide={spansLastRow(proof, i)} />)}
        </div>
      </section>

      <section id="faq" className="section">
        <div className="eyebrow-block">
          <Eyebrow label="Questions" id="faq" />
          <h2 className="sec-title">Straight <em>answers</em></h2>
        </div>
        <div className="ed-faq-grid">
          {s.faqIds.map(faqById).map(f => <FaqRow key={f.id} f={f} />)}
        </div>
      </section>
    </>
  )
}

export default ServicePage
