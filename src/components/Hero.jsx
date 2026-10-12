import { BOOKING_URL, FIRST_LINK_DAYS, LAUNCH_COVER_DAYS, PRICE_SITE_LABEL } from '../content/site'
import { BookButton, DocCover } from './Doc'
import { TrackRecord } from './TrustStrip'

// The offer's numbers, each with its unit in the label. They used to be four bare figures in a
// row (10 · 1 · 9+ · 100), which made a reader decode what each one counted.
const terms = [
  { n: PRICE_SITE_LABEL, l: 'Starting price of a marketing site, fixed in writing' },
  { n: `${FIRST_LINK_DAYS} days`, l: 'From kickoff to your first working link' },
  { n: `${LAUNCH_COVER_DAYS} days`, l: 'Of post-launch fixes, included in the price' },
  { n: '9+ years', l: 'Of production software for Bell, BMW and Bayer' },
]

const Hero = () => (
  <DocCover
    title="Your site or SaaS, live in weeks. Fixed price."
    accent="Date in writing."
    lead={<>
      A working link in <strong>{FIRST_LINK_DAYS} days</strong>. A launch date you can plan around. A price
      that doesn&rsquo;t move. Built by an engineer with nine years shipping production software
      for Bell, BMW and Bayer.
    </>}
    actions={<>
      <BookButton href={BOOKING_URL} />
      <a href="#handoff" className="link-teal">See exactly what you get →</a>
    </>}
    preparedFor="Founders who need it launched, not “in progress”."
    byline="Web and SaaS developer. You work with me directly, start to finish."
    track={<TrackRecord />}
    terms={terms}
  />
)

export default Hero
