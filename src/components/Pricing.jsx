import {
  BOOKING_URL, PRICE_MOVERS, PRICE_PROMISE, PRICE_SAAS_LABEL, PRICE_SITE_LABEL,
} from '../content/site'
import { Block, Fold } from './Split'

/**
 * The band, set as a table: the rows are ruled and the figures tabular and right-aligned. The
 * number is the largest non-heading type in the section: it is what the buyer came here for.
 */
const tiers = [
  { scope: 'Marketing site or landing page', from: PRICE_SITE_LABEL },
  { scope: 'SaaS product or MVP', from: PRICE_SAAS_LABEL },
]

/** The price band as a table. The French homepage renders it with its own rows and headers. */
export const PriceTable = ({ head, rows }) => (
  <table className="price-table">
    <thead>
      <tr>
        <th scope="col">{head.scope}</th>
        <th scope="col">{head.from}</th>
      </tr>
    </thead>
    <tbody>
      {rows.map(t => (
        <tr key={t.scope}>
          <th scope="row">{t.scope}</th>
          <td className="price-figure">{t.from}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

/**
 * The price objection stays on the page, folded: the sharpest version of it is one this
 * positioning creates (if AI makes the build fast, the price should fall with it), and the
 * buyer who has it can open the answer in place.
 */
const Pricing = () => (
  <Block
    id="pricing"
    title="Fixed. Premium."
    em="Quoted once."
    lead={`The figures below are starting points. ${PRICE_PROMISE} No change-order ambush.`}
  >
    <PriceTable head={{ scope: 'Scope', from: 'From' }} rows={tiers} />
    <p className="note">{PRICE_MOVERS}</p>
    <Fold summary="“AI writes the code. Why isn’t it cheaper?”">
      <p>
        AI makes me faster. It doesn&rsquo;t make the decisions that keep your product alive:
        what to build, what to leave out, and who answers when it breaks at an awkward hour.
        You&rsquo;re paying for those.
      </p>
      <p>Cheap development is the expensive option. You just pay for it later, as a rebuild.</p>
    </Fold>
    <p className="block-cta">
      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn">Lock in a price and a date</a>
    </p>
  </Block>
)

export default Pricing
