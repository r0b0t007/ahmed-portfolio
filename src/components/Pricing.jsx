const CALENDLY = 'https://calendly.com/ahmedchioua/30min'

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
        <span className="eyebrow-index">( 05 )</span>
      </div>
      <h2 className="sec-title">Fixed price, quoted <em>before</em> you commit</h2>
      <p className="sec-lead">
        You get the number in the free scope call, in writing, with a date attached. No hourly
        billing, and no retainer you can&rsquo;t exit.
      </p>
    </div>

    <div className="ed-price">
      <span className="ed-price-label">The question everyone asks</span>
      <div>
        <p className="fade-in ed-price-q">&ldquo;AI writes the code. Why isn&rsquo;t it cheaper?&rdquo;</p>
        <p className="fade-in ed-price-a">
          The typing was never the expensive part. You&rsquo;re paying for what to build, what to
          leave out, and someone who answers when it breaks at an awkward hour.
        </p>
        <p className="fade-in ed-price-a">
          The speed is the discount. Weeks instead of months is money you don&rsquo;t spend waiting
          for the thing to exist.
        </p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-ink ed-price-cta">
          Get a price and a date
        </a>
      </div>
    </div>

  </section>
)

export default Pricing
