import { BenefitCard } from './BenefitCard'
import { Block } from './Split'
import { LAUNCH_COVER_DAYS } from '../content/site'

/**
 * The hand-off, unbundled. "You own the repo" is one line; the three rows below are what a
 * founder is actually buying at the end of the build. Shares BenefitCard with Benefits so the
 * two lists read as one system.
 */
const stack = [
  {
    title: 'Pure asset ownership',
    lines: [
      'Your GitHub repo, in your name, from day one.',
      'Written documentation plus a recorded walkthrough.',
      'Any developer can pick it up tomorrow. You are never locked in, including to me.',
    ],
  },
  {
    title: 'Infrastructure, configured and transferred',
    lines: [
      'Hosting, domain, database, auth, payments: set up on your accounts (Vercel, AWS, Supabase, Cloudflare).',
      'Deploy pipeline live. Push code, it ships.',
      'Analytics wired before launch, not after. Nobody “holds the keys for you”. You hold them.',
    ],
  },
  {
    title: `Launch insurance, ${LAUNCH_COVER_DAYS} days`,
    lines: [
      `Bugs surfaced in the first ${LAUNCH_COVER_DAYS} days: fixed, included.`,
      'Small tweaks as real users hit it: included. The direct channel stays open.',
      'The first month is when things break. I stay for it.',
    ],
  },
]

const Handoff = () => (
  <Block
    id="handoff"
    title="You lift zero technical fingers."
    em="You own everything."
    lead="Most hand-offs are a zip file and a goodbye. This one is a stack."
  >
    <ul className="rows">
      {stack.map(b => <BenefitCard key={b.title} b={b} />)}
    </ul>
    <p className="note">All of it inside the fixed price. Not an add-on. Not an upsell.</p>
  </Block>
)

export default Handoff
