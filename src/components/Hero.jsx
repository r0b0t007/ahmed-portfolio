import { BOOKING_URL, CTA_LABEL, FIRST_LINK_DAYS } from '../content/site'
import { ui } from '../content/ui'
import HeroPortrait from './HeroPortrait'

/**
 * The offer as the page's one display line, then who it's for, the terms, and the booking
 * control. The four-figure stat row that used to sit under the CTA is gone: its units (days, a
 * count of one, years, a Lighthouse score) were incommensurable, and every figure in it is stated
 * where it can be checked: the process, the price table, the proof.
 *
 * The final clause carries the period square (.sq) in place of its full stop.
 */
const Hero = () => (
  <section id="hero" className="band hero">
    <div className="shell">
      <div className="hero-text">
        <h1 className="display">Your site or SaaS,<br />live in weeks.<br />Fixed price.<br /><em className="sq">Date in writing</em></h1>
        <p className="label">For founders who need it launched, not &ldquo;in progress&rdquo;</p>
        <p className="lead">
          A working link in <strong>{FIRST_LINK_DAYS} days</strong>. A launch date you can plan around. A price
          that doesn&rsquo;t move. Built by an engineer with nine years shipping production software
          for Bell, BMW and Bayer.
        </p>
        <div className="cta-row">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn">{CTA_LABEL}</a>
          <a href="#handoff" className="link">See exactly what you get</a>
        </div>
      </div>

      <HeroPortrait byline="Web and SaaS developer. You work with me directly, start to finish." place={ui.contact.details.place} />
    </div>
  </section>
)

export default Hero
