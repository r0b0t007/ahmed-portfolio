import {
  BOOKING_URL, PRICE_MOVERS, PRICE_PROMISE, PRICE_SAAS_FROM, PRICE_SAAS_LABEL, PRICE_SITE_FROM, PRICE_SITE_LABEL,
} from '../content/site'

/**
 * The band, set as a spec table rather than a marketing card. The offer is a contract, so the rows
 * are ruled and the figures are tabular, right-aligned and the largest type in the section: they
 * are what the buyer came here for. Each row also gets a stepped bar of its own floor against the
 * largest one (desktop only; the figure says the same thing, the bar just shows the step).
 */
const tiers = [
  { scope: 'Marketing site or landing page', from: PRICE_SITE_LABEL, value: PRICE_SITE_FROM },
  { scope: 'SaaS product or MVP', from: PRICE_SAAS_LABEL, value: PRICE_SAAS_FROM },
]

/** The price band as a table. The French homepage renders it with its own rows and headers. */
export const PriceTable = ({ head, rows }) => {
  const max = Math.max(...rows.map(r => r.value))
  return (
    <div className="price-table-wrap">
      <table className="price-table">
        <thead>
          <tr>
            <th scope="col" className="label">{head.scope}</th>
            <td className="price-bar" aria-hidden="true" />
            <th scope="col" className="label">{head.from}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(t => (
            <tr key={t.scope}>
              <th scope="row" className="price-scope">{t.scope}</th>
              <td className="price-bar" aria-hidden="true">
                <span className="bar-track"><span className="bar-fill" style={{ '--w': `${Math.round((t.value / max) * 100)}%` }} /></span>
              </td>
              <td className="price-figure">{t.from}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * The price objection gets its own row rather than a line in the FAQ, because the sharpest
 * version of it is one this positioning creates: if AI is what makes the build fast, a buyer
 * expects the price to fall with it. Answering that in the buyer's own words, before they ask,
 * turns the objection into a differentiator.
 */
const Pricing = () => (
  <section id="pricing" className="band">
    <div className="shell">
      <div className="sec-head">
        <h2 className="head">Fixed. Premium. <em>Quoted once.</em></h2>
        <p className="lead">
          The figures below are starting points. {PRICE_PROMISE} No change-order ambush.
        </p>
      </div>

      {/* A real table, not a grid of divs: this is tabular data with column headers. A screen
          reader reads "Marketing site or landing page, From, €3,000" instead of loose spans. */}
      <PriceTable head={{ scope: 'Scope', from: 'From' }} rows={tiers} />

      <p className="price-note">{PRICE_MOVERS}</p>

      <div className="price-qa">
        <p className="q">&ldquo;AI writes the code. Why isn&rsquo;t it cheaper?&rdquo;</p>
        <p>
          AI makes me faster. It doesn&rsquo;t make the decisions that keep your product alive:
          what to build, what to leave out, and who answers when it breaks at an awkward hour.
          You&rsquo;re paying for those.
        </p>
        <p>
          Cheap development is the expensive option. You just pay for it later, as a rebuild.
        </p>
        <div className="cta-row">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn">
            Lock in a price and a date
          </a>
        </div>
      </div>
    </div>
  </section>
)

export default Pricing
