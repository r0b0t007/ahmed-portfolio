import { Fragment } from 'react'
import { ServiceCard } from '../components/Services'
import { Step } from '../components/Process'
import { ProofItem } from '../components/Proof'
import { PriceTable } from '../components/Pricing'
import { FaqRow } from '../components/Faq'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import HeroPortrait from '../components/HeroPortrait'
import { CtaLabel } from '../components/CtaLabel'
import { Schedule } from '../components/Schedule'
import { home } from '../content/fr/home'
import { servicePath } from '../content/routes'
import { BOOKING_URL } from '../content/site'
import { useContent } from '../lib/content-context'
import { spansLastRow } from '../lib/grid'

/**
 * The French homepage, for buyers in Morocco who search in French. Shorter than the English one
 * (no Experience, About or hand-off) and built from the same row components and classes, so the
 * two read as one site. The hero is the English one's: the offer, the same portrait (HeroPortrait,
 * preloaded in this page's head too) and the schedule drawn underneath. Copy is in
 * src/content/fr/home.js; Contact closes the page via App.jsx.
 */
const HomeFr = () => {
  const { ui, services, steps, proof, faqById } = useContent()
  const { hero } = home
  const faqs = home.faq.ids.map(faqById)

  return (
    <>
      <section id="hero" className="ed-hero">
        <div className="ed-hero-text">
          <p className="ed-kicker">{hero.kicker}</p>
          <h1 className="ed-h1">
            {hero.h1.map(line => <Fragment key={line}>{line} </Fragment>)}
            <em>{hero.em}</em>
          </h1>
          <p className="ed-lead">{hero.lead}</p>
          <div className="ed-cta-row">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink"><CtaLabel long={ui.cta.long} short={ui.cta.short} /></a>
            <a href={ui.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <WhatsAppIcon />
              {hero.whatsapp}
            </a>
          </div>
        </div>
        <HeroPortrait byline={hero.byline} />
        <Schedule caption={hero.schedule.caption} stops={hero.schedule.stops} />
      </section>

      <section id="services" className="section">
        <div className="eyebrow-block">
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
          <h2 className="sec-title">{home.process.title} <em>{home.process.em}</em></h2>
          <p className="sec-lead">{home.process.lead}</p>
        </div>
        <div className="ed-steps">
          {steps.map((s, i) => <Step key={s.title} s={s} i={i} />)}
        </div>
      </section>

      <section id="proof" className="section">
        <div className="eyebrow-block">
          <h2 className="sec-title">{home.proof.title} <em>{home.proof.em}</em></h2>
          <p className="fade-in sec-lead">{home.proof.lead}</p>
        </div>
        <div className="hair-grid ed-proof-grid">
          {proof.all.map((it, i) => <ProofItem key={it.title} it={it} i={i} wide={spansLastRow(proof.all, i)} />)}
        </div>
      </section>

      <section id="pricing" className="section">
        <div className="eyebrow-block">
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
