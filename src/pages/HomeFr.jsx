import { Fragment } from 'react'
import { ServiceCard } from '../components/Services'
import { Step } from '../components/Process'
import { ProofItem } from '../components/Proof'
import { PriceTable } from '../components/Pricing'
import { FaqRow } from '../components/Faq'
import ScopePicker from '../components/ScopePicker'
import Byline from '../components/Byline'
import { Split, Block } from '../components/Split'
import { home } from '../content/fr/home'
import { servicePath } from '../content/routes'
import { BOOKING_URL } from '../content/site'
import { useContent } from '../lib/content-context'

/**
 * The French homepage, for buyers in Morocco who search in French. Shorter than the English one
 * (no hand-off, background or "why it won't break" sections) and built from the same components,
 * so the two read as one site: the pitch card with the scope picker, then the reasons. Copy is in
 * src/content/fr/home.js; Contact closes the page via App.jsx.
 */
const HomeFr = () => {
  const { ui, services, steps, proof, faqById } = useContent()
  const { hero } = home
  const faqs = home.faq.ids.map(faqById)

  const pitch = (
    <section id="hero" className="pitch">
      <p className="pitch-for">{hero.kicker}</p>
      <h1 className="pitch-h1">
        {hero.h1.map(line => <Fragment key={line}>{line}<br /></Fragment>)}
        <em>{hero.em}</em>
      </h1>
      <p className="pitch-lead">{hero.lead}</p>
      <ScopePicker />
      <Byline text={hero.byline} />
    </section>
  )

  return (
    <Split pitch={pitch}>
      <Block id="proof" title={home.proof.title} em={home.proof.em} lead={home.proof.lead}>
        <ul className="rows">
          {proof.all.map(it => <ProofItem key={it.title} it={it} />)}
        </ul>
      </Block>

      <Block id="services" title={home.services.title} em={home.services.em} lead={home.services.lead}>
        <ul className="rows">
          {services.map(s => (
            <ServiceCard key={s.id} s={s} href={servicePath(s.slug, 'fr')} more={home.services.more(s.name)} />
          ))}
        </ul>
      </Block>

      <Block id="process" title={home.process.title} em={home.process.em} lead={home.process.lead}>
        <ol className="steps">
          {steps.map((s, i) => <Step key={s.title} s={s} i={i} />)}
        </ol>
      </Block>

      <Block id="pricing" title={home.pricing.title} em={home.pricing.em} lead={`${home.pricing.lead} ${ui.offer.promise}`}>
        <PriceTable head={home.pricing.head} rows={home.pricing.rows} />
        <p className="note">{ui.offer.movers}</p>
        <p className="block-cta">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn">{home.pricing.cta}</a>
        </p>
      </Block>

      <Block id="faq" title={home.faq.title} em={home.faq.em}>
        <div className="folds">
          {faqs.map(f => <FaqRow key={f.id} f={f} />)}
        </div>
      </Block>
    </Split>
  )
}

export default HomeFr
