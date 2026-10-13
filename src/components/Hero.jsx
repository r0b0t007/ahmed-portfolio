import { BOOKING_URL, CTA_LABEL, CTA_LABEL_LONG, FIRST_LINK_DAYS } from '../content/site'
import { schedule } from '../content/schedule'
import { CtaLabel } from './CtaLabel'
import HeroPortrait from './HeroPortrait'
import { Schedule } from './Schedule'

const Hero = () => (
  <section id="hero" className="ed-hero">
    <div className="ed-hero-text">
      <h1 className="ed-h1">Your site or SaaS, live in weeks. Fixed price. <em>Date in writing.</em></h1>
      <p className="ed-lead">
        A working link in <strong>{FIRST_LINK_DAYS} days</strong>. A launch date you can plan around. A price
        that doesn&rsquo;t move. Built by an engineer with nine years shipping production software
        for Bell, BMW and Bayer.
      </p>
      <div className="ed-cta-row">
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink"><CtaLabel long={CTA_LABEL_LONG} short={CTA_LABEL} /></a>
        <a href="#handoff" className="link-teal">See exactly what you get →</a>
      </div>
    </div>

    {/* The schedule comes before the portrait in the HTML because a phone shows it first; the
        desktop grid places both by area, so the order there is unchanged. */}
    <Schedule caption={schedule.caption} stops={schedule.stops} />

    <HeroPortrait byline="Web and SaaS developer. You work with me directly, start to finish." />
  </section>
)

export default Hero
