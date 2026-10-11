import { sectionIndex } from '../lib/sections'
import {
  BOOKING_URL, PRICE_MOVERS, PRICE_PROMISE, PRICE_SAAS_LABEL, PRICE_SITE_LABEL,
} from '../content/site'

/**
 * The band, set as a document table rather than a marketing card. The offer is a contract, so the
 * rows are ruled and the figures are tabular and right-aligned (in the sans, not the mono; see
 * .ed-price-figure in src/index.css for why). The number is the largest non-heading type in the
 * section: it is what the buyer came here for.
 */
const tiers = [
  { scope: 'Marketing site or landing page', from: PRICE_SITE_LABEL },
  { scope: 'SaaS product or MVP', from: PRICE_SAAS_LABEL },
]

/** The price band as a table. The French homepage renders it with its own rows and headers. */
export const PriceTable = ({ head, rows }) => (
  <table className="ed-price-table">
    <thead>
      <tr>
        <th scope="col">{head.scope}</th>
        <th scope="col">{head.from}</th>
      </tr>
    </thead>
    <tbody>
      {rows.map(t => (
        <tr key={t.scope}>
          <th scope="row" className="ed-price-scope">{t.scope}</th>
          <td className="ed-price-figure">{t.from}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

/**
 * The price objection gets its own section rather than a line in the FAQ, because the sharpest
 * version of it is one this positioning creates: if AI is what makes the build fast, a buyer
 * expects the price to fall with it. Answering that in the buyer's own words, before they ask,
 * turns the objection into a differentiator.
 */
const Pricing = () => (
  <section id="pricing" className="section">
    <div className="eyebrow-block">
      <div className="eyebrow-row">
        <span className="eyebrow">Pricing</span>
        <span className="eyebrow-index">( {sectionIndex('pricing')} )</span>
      </div>
      <h2 className="sec-title">Fixed. Premium. <em>Quoted once.</em></h2>
      <p className="sec-lead">
        The figures below are starting points. {PRICE_PROMISE} No change-order ambush.
      </p>
    </div>

    {/* A real table, not a grid of divs: this is tabular data with column headers, and the page
        already reaches for semantic pairs elsewhere (the <dl> in Contact). A screen reader reads
        "Marketing site or landing page, From, €3,000" instead of three loose spans. */}
    <PriceTable head={{ scope: 'Scope', from: 'From' }} rows={tiers} />

    <p className="ed-price-note">{PRICE_MOVERS}</p>

    <div className="ed-price">
      <span className="ed-price-label">The question everyone asks</span>
      <div>
        <p className="fade-in ed-price-q">&ldquo;AI writes the code. Why isn&rsquo;t it cheaper?&rdquo;</p>
        <p className="fade-in ed-price-a">
          AI makes me faster. It doesn&rsquo;t make the decisions that keep your product alive:
          what to build, what to leave out, and who answers when it breaks at an awkward hour.
          You&rsquo;re paying for those.
        </p>
        <p className="fade-in ed-price-a">
          Cheap development is the expensive option. You just pay for it later, as a rebuild.
        </p>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink ed-price-cta">
          Lock in a price and a date
        </a>
      </div>
    </div>

  </section>
)

export default Pricing
