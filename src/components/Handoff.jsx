import { LAUNCH_COVER_DAYS } from '../content/site'
import { numberOf } from '../lib/sections'
import { Clause, SpecList } from './Doc'
import { linesRows } from './rows'

/**
 * The hand-off, unbundled. "You own the repo" is one line; the stack below is what a founder is
 * actually buying at the end of the build, set as numbered sub-clauses.
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
  <Clause
    type="home" id="handoff"
    title="You lift zero technical fingers." accent="You own everything."
    lead="Most hand-offs are a zip file and a goodbye. This one is a stack."
  >
    <SpecList prefix={numberOf('home', 'handoff')} rows={linesRows(stack)} />
    <p className="clause-note">All of it inside the fixed price. Not an add-on. Not an upsell.</p>
  </Clause>
)

export default Handoff
