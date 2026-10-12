import { BOOKING_URL, CTA_LABEL_LONG, FIRST_LINK_DAYS, LAUNCH_COVER_DAYS, PRICE_SITE_LABEL } from '../content/site'
import HeroPortrait from './HeroPortrait'

// The same four terms the French hero lists (src/content/fr/home.js), each with its unit stated.
// They replace a row of bare numerals ("10 / 1 / 9+ / 100") whose units didn't compare.
const facts = [
  { n: PRICE_SITE_LABEL, l: 'Starting price of a marketing site, fixed in writing' },
  { n: `${FIRST_LINK_DAYS} days`, l: 'From kickoff to your first working link' },
  { n: `${LAUNCH_COVER_DAYS} days`, l: 'Of post-launch fixes, included in the price' },
  { n: '9+ years', l: 'Of production software for Bell, BMW and Bayer' },
]

const Hero = () => (
  <section id="hero" className="ed-hero">
    <div className="ed-hero-text">
      <p className="ed-kicker">For founders who need it launched, not &ldquo;in progress&rdquo;</p>
      <h1 className="ed-h1">Your site or SaaS,<br />live in weeks.<br />Fixed price.<br /><em>Date in writing.</em></h1>
      <p className="ed-lead">
        A working link in <strong>{FIRST_LINK_DAYS} days</strong>. A launch date you can plan around. A price
        that doesn&rsquo;t move. Built by an engineer with nine years shipping production software
        for Bell, BMW and Bayer.
      </p>
      <div className="ed-cta-row">
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">{CTA_LABEL_LONG}</a>
        <a href="#handoff" className="link-teal">See exactly what you get →</a>
      </div>
      {/* A <dl>, as on the French hero: dt first in the DOM, the value lifted visually by CSS. */}
      <dl className="svc-facts">
        {facts.map(f => (
          <div key={f.l}>
            <dt>{f.l}</dt>
            <dd>{f.n}</dd>
          </div>
        ))}
      </dl>
    </div>

    <HeroPortrait byline="Web and SaaS developer. You work with me directly, start to finish." />
  </section>
)

export default Hero
