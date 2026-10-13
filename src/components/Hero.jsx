import {
  BOOKING_URL, CTA_LABEL, CTA_LABEL_LONG, FIRST_LINK_DAYS, LAUNCH_COVER_DAYS, SAAS_WEEKS, SITE_WEEKS, weeksRange,
} from '../content/site'
import { CtaLabel } from './CtaLabel'
import HeroPortrait from './HeroPortrait'
import { Schedule } from './Schedule'

// The usual timeline, as the FAQ states it ("a marketing site is usually 2 to 3 weeks, an MVP 4 to
// 6, a working link within the first 10 days"). The dates themselves go in each written scope.
// The two launch stations are alternatives (one or the other, by project), and the cover counts
// from launch, so each says which it is rather than reading as one sequence.
const stops = [
  { at: 'Day 0', what: 'Kickoff, after a free scope call' },
  { at: `Day ${FIRST_LINK_DAYS}`, what: 'Your first working link', key: true },
  { at: `Weeks ${weeksRange(SITE_WEEKS)}`, what: 'Launch, for a marketing site' },
  { at: `Weeks ${weeksRange(SAAS_WEEKS)}`, what: 'Or launch, for an MVP' },
  { at: `+${LAUNCH_COVER_DAYS} days`, what: 'After launch: fixes included' },
]

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
    <Schedule caption="Usual schedule. Your own dates go in the written scope." stops={stops} />

    <HeroPortrait byline="Web and SaaS developer. You work with me directly, start to finish." />
  </section>
)

export default Hero
