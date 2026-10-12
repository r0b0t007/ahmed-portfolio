import {
  BOOKING_URL, PRICE_MOVERS, PRICE_PROMISE, PRICE_SAAS_LABEL, PRICE_SITE_LABEL,
} from '../content/site'
import { numberOf } from '../lib/sections'
import { Clause, SpecList } from './Doc'

/**
 * The band, set as a ruled table: the offer is a contract, so the rows are ruled and the figures
 * are tabular and right-aligned (in the sans, not the mono; see .price-figure in src/index.css for
 * why). The figure is the largest non-heading type in the clause: it is what the buyer came for.
 */
const tiers = [
  { scope: 'Marketing site or landing page', from: PRICE_SITE_LABEL },
  { scope: 'SaaS product or MVP', from: PRICE_SAAS_LABEL },
]

/**
 * The price band as a table. A real table, not a grid of divs: a screen reader reads "Marketing
 * site or landing page, From, €3,000" instead of three loose spans. The French homepage renders it
 * with its own rows and headers.
 */
export const PriceTable = ({ head, rows }) => (
  <table className="sheet-table price-table">
    <thead>
      <tr>
        <th scope="col">{head.scope}</th>
        <th scope="col">{head.from}</th>
      </tr>
    </thead>
    <tbody>
      {rows.map(t => (
        <tr key={t.scope}>
          <th scope="row" className="price-scope">{t.scope}</th>
          <td className="price-figure">{t.from}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

/**
 * The price objection gets its own sub-clause rather than a line in the FAQ, because the sharpest
 * version of it is one this positioning creates: if AI is what makes the build fast, a buyer
 * expects the price to fall with it. Answering that in the buyer's own words, before they ask,
 * turns the objection into a differentiator.
 */
const Pricing = () => (
  <Clause
    type="home" id="pricing"
    title="Fixed. Premium." accent="Quoted once."
    lead={`The figures below are starting points. ${PRICE_PROMISE} No change-order ambush.`}
  >
    <PriceTable head={{ scope: 'Scope', from: 'From' }} rows={tiers} />
    <p className="clause-note">{PRICE_MOVERS}</p>
    <SpecList
      prefix={numberOf('home', 'pricing')}
      rows={[{
        key: 'question',
        term: 'The question everyone asks',
        sub: '“AI writes the code. Why isn’t it cheaper?”',
        body: <>
          <p>
            AI makes me faster. It doesn&rsquo;t make the decisions that keep your product alive:
            what to build, what to leave out, and who answers when it breaks at an awkward hour.
            You&rsquo;re paying for those.
          </p>
          <p>Cheap development is the expensive option. You just pay for it later, as a rebuild.</p>
          <div className="cta-row">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">Lock in a price and a date</a>
          </div>
        </>,
      }]}
    />
  </Clause>
)

export default Pricing
