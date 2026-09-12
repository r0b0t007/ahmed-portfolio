import { BOOKING_URL } from '../content/site'

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
        <span className="eyebrow-index">( 06 )</span>
      </div>
      <h2 className="sec-title">Fixed. Premium. <em>Quoted once.</em></h2>
      <p className="sec-lead">
        One price, fixed in the free scope call, in writing, with a date attached. It covers the
        build, the infrastructure, the hand-off and 30 days of launch insurance. No hourly meter.
        No change-order ambush.
      </p>
    </div>

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
