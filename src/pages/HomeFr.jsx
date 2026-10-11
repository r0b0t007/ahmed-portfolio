import { Fragment } from 'react'
import { Eyebrow as SharedEyebrow } from '../components/Eyebrow'
import { ServiceCard } from '../components/Services'
import { Step } from '../components/Process'
import { ProofItem } from '../components/Proof'
import { PriceTable } from '../components/Pricing'
import { FaqRow } from '../components/Faq'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { home } from '../content/fr/home'
import { servicePath } from '../content/routes'
import { BOOKING_URL } from '../content/site'
import { useContent } from '../lib/content-context'
import { homeFrSectionIndex as idx } from '../lib/sections'
import { spansLastRow } from '../lib/grid'

const Eyebrow = ({ label, id }) => <SharedEyebrow label={label} index={idx(id)} />

/**
 * The French homepage, for buyers in Morocco who search in French. Shorter than the English one
 * (no Experience, About or hand-off) and built from the same row components and classes, so the
 * two read as one site. The hero has no portrait: its preload belongs to the English homepage's
 * head. Copy is in src/content/fr/home.js; Contact closes the page via App.jsx. Section order is
 * declared in src/lib/sections.js (HOME_FR_SECTION_ORDER); keep both in step.
 */
const HomeFr = () => {
  const { ui, services, steps, proof, faqById } = useContent()
  const { hero } = home
  const faqs = home.faq.ids.map(faqById)

  return (
    <>
      <section id="hero" className="section svc-hero">
        <p className="ed-kicker">{hero.kicker}</p>
        <h1 className="ed-h1">
          {hero.h1.map(line => <Fragment key={line}>{line}<br /></Fragment>)}
          <em>{hero.em}</em>
        </h1>
        <p className="ed-lead">{hero.lead}</p>
        <div className="ed-cta-row">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">{ui.cta.long}</a>
          <a href={ui.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-wa">
            <WhatsAppIcon />
            {hero.whatsapp}
          </a>
        </div>
        <dl className="svc-facts">
          {hero.facts.map(f => (
            <div key={f.l}>
              <dt>{f.l}</dt>
              <dd>{f.n}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="services" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={home.services.eyebrow} id="services" />
          <h2 className="sec-title">{home.services.title} <em>{home.services.em}</em></h2>
          <p className="sec-lead">{home.services.lead}</p>
        </div>
        <div className="hair-grid ed-svc-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} href={servicePath(s.slug, 'fr')} more={home.services.more(s.name)} />
          ))}
        </div>
      </section>

      <section id="process" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={home.process.eyebrow} id="process" />
          <h2 className="sec-title">{home.process.title} <em>{home.process.em}</em></h2>
          <p className="sec-lead">{home.process.lead}</p>
        </div>
        <div className="ed-steps">
          {steps.map((s, i) => <Step key={s.title} s={s} i={i} />)}
        </div>
      </section>

      <section id="proof" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={home.proof.eyebrow} id="proof" />
          <h2 className="sec-title">{home.proof.title} <em>{home.proof.em}</em></h2>
          <p className="fade-in sec-lead">{home.proof.lead}</p>
        </div>
        <div className="hair-grid ed-proof-grid">
          {proof.all.map((it, i) => <ProofItem key={it.title} it={it} i={i} wide={spansLastRow(proof.all, i)} />)}
        </div>
      </section>

      <section id="pricing" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={home.pricing.eyebrow} id="pricing" />
          <h2 className="sec-title">{home.pricing.title} <em>{home.pricing.em}</em></h2>
          <p className="sec-lead">{home.pricing.lead} {ui.offer.promise}</p>
        </div>
        <PriceTable head={home.pricing.head} rows={home.pricing.rows} />
        <p className="ed-price-note">{ui.offer.movers}</p>
        <div className="ed-cta-row svc-price-cta">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">{home.pricing.cta}</a>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="eyebrow-block">
          <Eyebrow label={home.faq.eyebrow} id="faq" />
          <h2 className="sec-title">{home.faq.title} <em>{home.faq.em}</em></h2>
        </div>
        <div className="ed-faq-grid">
          {faqs.map(f => <FaqRow key={f.id} f={f} />)}
        </div>
      </section>
    </>
  )
}

export default HomeFr
