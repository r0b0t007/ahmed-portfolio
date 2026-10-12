import { Fragment } from 'react'
import { ServiceCard } from '../components/Services'
import { scale } from '../lib/scale'
import { Steps } from '../components/Process'
import { ProofRows } from '../components/Proof'
import { PriceTable } from '../components/Pricing'
import { FaqRows } from '../components/Faq'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import HeroPortrait from '../components/HeroPortrait'
import { home } from '../content/fr/home'
import { servicePath } from '../content/routes'
import { BOOKING_URL } from '../content/site'
import { useContent } from '../lib/content-context'

/**
 * The French homepage, for buyers in Morocco who search in French. Shorter than the English one
 * (no Experience, About or hand-off) and built from the same components and classes, so the two
 * read as one sheet. The hero is the English one's split: the offer, then the same portrait
 * (HeroPortrait, preloaded in this page's head too). Copy is in src/content/fr/home.js; Contact
 * closes the page via App.jsx.
 */
const HomeFr = () => {
  const { ui, services, steps, proof, faqById } = useContent()
  const { hero } = home
  const faqs = home.faq.ids.map(faqById)
  const max = scale(services)

  return (
    <>
      <section id="hero" className="band hero">
        <div className="shell">
          <div className="hero-text">
            {/* The last clause carries the period square in place of its full stop. */}
            <h1 className="display">
              {hero.h1.map(line => <Fragment key={line}>{line}<br /></Fragment>)}
              <em className="sq">{hero.em.replace(/\.$/, '')}</em>
            </h1>
            <p className="label">{hero.kicker}</p>
            <p className="lead">{hero.lead}</p>
            <div className="cta-row">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn">{ui.cta.short}</a>
              <a href={ui.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                <WhatsAppIcon />
                {hero.whatsapp}
              </a>
            </div>
          </div>
          <HeroPortrait byline={hero.byline} place={ui.contact.details.place} />
        </div>
      </section>

      <section id="services" className="band">
        <div className="shell">
          <div className="sec-head sec-head--narrow">
            <h2 className="head">{home.services.title} <em>{home.services.em}</em></h2>
            <p className="lead">{home.services.lead}</p>
          </div>
          <ul className="svc-cells">
            {services.map(s => (
              <ServiceCard key={s.id} s={s} href={servicePath(s.slug, 'fr')} more={home.services.more(s.name)} max={max} />
            ))}
          </ul>
        </div>
      </section>

      <section id="process" className="band">
        <div className="shell">
          <div className="sec-head">
            <h2 className="head">{home.process.title} <em>{home.process.em}</em></h2>
            <p className="lead">{home.process.lead}</p>
          </div>
          <Steps list={steps} />
        </div>
      </section>

      <section id="proof" className="band">
        <div className="shell">
          <div className="sec-head">
            <h2 className="head">{home.proof.title} <em>{home.proof.em}</em></h2>
            <p className="lead">{home.proof.lead}</p>
          </div>
          <ProofRows list={proof.all} />
        </div>
      </section>

      <section id="pricing" className="band">
        <div className="shell">
          <div className="sec-head">
            <h2 className="head">{home.pricing.title} <em>{home.pricing.em}</em></h2>
            <p className="lead">{home.pricing.lead} {ui.offer.promise}</p>
          </div>
          <PriceTable head={home.pricing.head} rows={home.pricing.rows} />
          <p className="price-note">{ui.offer.movers}</p>
          <div className="cta-row price-cta">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn">{home.pricing.cta}</a>
          </div>
        </div>
      </section>

      <section id="faq" className="band">
        <div className="shell">
          <div className="sec-head">
            <h2 className="head">{home.faq.title} <em>{home.faq.em}</em></h2>
          </div>
          <FaqRows list={faqs} />
        </div>
      </section>
    </>
  )
}

export default HomeFr
