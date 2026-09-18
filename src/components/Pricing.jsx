import { sectionIndex } from '../lib/sections'
import {
  BOOKING_URL, LAUNCH_COVER_DAYS, PRICE_SAAS_LABEL, PRICE_SITE_LABEL,
} from '../content/site'

/**
 * The band, set as a document table rather than a marketing card. The offer is a contract, so the
 * figures are tabular mono on hairline rules, and the number is the largest non-heading type in
 * the section: it is what the buyer came here for.
 */
const tiers = [
  { scope: 'Marketing site or landing page', from: PRICE_SITE_LABEL },
  { scope: 'SaaS product or MVP', from: PRICE_SAAS_LABEL },
]

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
        One price, fixed in the free scope call, in writing, with a date attached. It covers the
        build, the infrastructure, the hand-off and {LAUNCH_COVER_DAYS} days of launch insurance. No hourly meter.
        No change-order ambush.
      </p>
    </div>

    {/* A real table, not a grid of divs: this is tabular data with column headers, and the page
        already reaches for semantic pairs elsewhere (the <dl> in Contact). A screen reader reads
        "Marketing site or landing page, From, €3,000" instead of three loose spans. */}
    <table className="ed-price-table">
      <thead>
        <tr>
          <th scope="col">Scope</th>
          <th scope="col">From</th>
        </tr>
      </thead>
      <tbody>
        {tiers.map(t => (
          <tr key={t.scope}>
            <th scope="row" className="ed-price-scope">{t.scope}</th>
            <td className="ed-price-figure">{t.from}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <p className="ed-price-note">
      What moves the number: how much of it is new rather than adapted, and whether auth, payments
      or third-party integrations are in scope.
    </p>

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
