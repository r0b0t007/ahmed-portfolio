import { Breadcrumb } from '../components/Breadcrumb'
import { BookButton, Clause, PageCover, SpecList } from '../components/Doc'
import { ScheduleTable } from '../components/Process'
import { linesRows, proofRows } from '../components/rows'
import { TermsList } from '../components/Faq'
import { BOOKING_URL, FIRST_LINK_DAYS, LAUNCH_COVER_DAYS } from '../content/site'
import { useContent } from '../lib/content-context'
import { numberOf } from '../lib/sections'

const TYPE = 'service'

/**
 * One service, set as its own scope document: the cover with the service's key terms, then what's
 * included (§ 1), the schedule (§ 2), the price (§ 3), the questions buyers ask (§ 4), and what to
 * check (Annex A). All copy comes from src/content in the page's language (src/content/locale.js);
 * this file only lays it out with the shared document primitives (src/components/Doc.jsx).
 */
const ServicePage = ({ id }) => {
  const { ui, findService, faqById, steps, proof: proofs } = useContent()
  const t = ui.service
  const s = findService(id)
  const terms = [
    { n: s.priceLabel, l: t.facts.price },
    { n: s.weeks, l: t.facts.weeks },
    { n: String(FIRST_LINK_DAYS), l: t.facts.firstLink },
    { n: String(LAUNCH_COVER_DAYS), l: t.facts.cover },
  ]

  return (
    <>
      <PageCover
        crumb={<Breadcrumb name={s.name} />}
        title={s.h1} accent={s.h1Em}
        lead={s.lead}
        actions={<>
          <BookButton href={BOOKING_URL} />
          <a href="#price" className="link-teal">{t.seePrice}</a>
        </>}
        terms={terms}
      />

      <Clause type={TYPE} id="included" title={t.included.title} accent={t.included.em} lead={s.framing}>
        <SpecList prefix={numberOf(TYPE, 'included')} rows={linesRows(s.included)} />
      </Clause>

      <Clause type={TYPE} id="weeks" title={t.weeks.title(s.weeks)} accent={t.weeks.em} lead={t.weeks.lead}>
        <ScheduleTable steps={steps} />
      </Clause>

      <Clause type={TYPE} id="price" title={t.price.title(s.priceLabel)} accent={t.price.em} lead={t.price.lead(s.priceLabel)}>
        <p className="clause-note">{ui.offer.movers}</p>
        <p className="clause-note"><b>{t.price.founding}</b> {ui.offer.founding}</p>
        <div className="cta-row">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">{t.price.cta}</a>
        </div>
      </Clause>

      <Clause type={TYPE} id="faq" title={t.faq.title} accent={t.faq.em}>
        <TermsList prefix={numberOf(TYPE, 'faq')} items={s.faqIds.map(faqById)} />
      </Clause>

      <Clause type={TYPE} id="proof" title={s.proofTitle} accent={s.proofTitleEm} lead={s.proofLead}>
        <SpecList prefix={numberOf(TYPE, 'proof')} rows={proofRows(proofs[s.proof])} />
      </Clause>
    </>
  )
}

export default ServicePage
