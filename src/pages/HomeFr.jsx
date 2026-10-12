import { BookButton, DocCover, Clause, SpecList } from '../components/Doc'
import { ScheduleTable } from '../components/Process'
import { proofRows, serviceRows } from '../components/rows'
import { PriceTable } from '../components/Pricing'
import { TermsList } from '../components/Faq'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { home } from '../content/fr/home'
import { servicePath } from '../content/routes'
import { BOOKING_URL } from '../content/site'
import { useContent } from '../lib/content-context'
import { numberOf } from '../lib/sections'

const TYPE = 'home:fr'

/**
 * The French homepage, for buyers in Morocco who search in French. The same scope document as the
 * English one, shorter (no preamble, hand-off clause or background annexes) and built from the
 * same primitives (src/components/Doc.jsx), so the two read as one site. Copy is in
 * src/content/fr/home.js; Contact closes the page via App.jsx. Clause numbering is declared in
 * src/lib/sections.js; keep the render order in step with it.
 */
const HomeFr = () => {
  const { ui, services, steps, proof, faqById } = useContent()
  const { hero } = home

  return (
    <>
      <DocCover
        title={hero.h1.join(' ')}
        accent={hero.em}
        lead={hero.lead}
        actions={<>
          <BookButton href={BOOKING_URL} />
          <a href={ui.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-wa">
            <WhatsAppIcon />
            {hero.whatsapp}
          </a>
        </>}
        preparedFor={hero.preparedFor}
        byline={hero.byline}
        terms={hero.facts}
      />

      <Clause type={TYPE} id="services" title={home.services.title} accent={home.services.em} lead={home.services.lead}>
        <SpecList
          prefix={numberOf(TYPE, 'services')}
          rows={serviceRows(services, s => servicePath(s.slug, 'fr'), s => home.services.more(s.name))}
        />
      </Clause>

      <Clause type={TYPE} id="process" title={home.process.title} accent={home.process.em} lead={home.process.lead}>
        <ScheduleTable steps={steps} caption={ui.doc.schedule.launch} />
      </Clause>

      <Clause type={TYPE} id="pricing" title={home.pricing.title} accent={home.pricing.em} lead={`${home.pricing.lead} ${ui.offer.promise}`}>
        <PriceTable head={home.pricing.head} rows={home.pricing.rows} />
        <p className="clause-note">{ui.offer.movers}</p>
        <div className="cta-row">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">{home.pricing.cta}</a>
        </div>
      </Clause>

      <Clause type={TYPE} id="faq" title={home.faq.title} accent={home.faq.em}>
        <TermsList prefix={numberOf(TYPE, 'faq')} items={home.faq.ids.map(faqById)} />
      </Clause>

      <Clause type={TYPE} id="proof" title={home.proof.title} accent={home.proof.em} lead={home.proof.lead}>
        <SpecList prefix={numberOf(TYPE, 'proof')} rows={proofRows(proof.all)} />
      </Clause>
    </>
  )
}

export default HomeFr
