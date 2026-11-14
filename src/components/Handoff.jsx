import { BenefitCard } from './BenefitCard'
import { LAUNCH_COVER_DAYS } from '../content/site'

/**
 * The hand-off, unbundled. "You own the repo" is one line; the stack below is what a founder is
 * actually buying at the end of the build. Shares BenefitCard with Benefits so the two
 * three-column sections read as one system.
 */
const stack = [
  {
    title: 'Pure asset ownership',
    lines: [
      'Your GitHub repo, in your name, from day one.',
      'Written documentation plus a recorded walkthrough. You are never locked in, including to me.',
    ],
  },
  {
    title: 'Infrastructure, configured and transferred',
    lines: [
      'Hosting, domain, database, auth, payments: set up on your accounts (Vercel, AWS, Supabase, Cloudflare).',
      'Deploy pipeline live. Analytics wired before launch, not after.',
    ],
  },
  {
    title: `Launch insurance, ${LAUNCH_COVER_DAYS} days`,
    lines: [
      `Bugs surfaced in the first ${LAUNCH_COVER_DAYS} days: fixed, included.`,
      'Small tweaks as real users hit it: included. The direct channel stays open.',
    ],
  },
]

const Handoff = () => (
  <section id="handoff" className="section">
    <div className="sec-head">
      <h2 className="sec-title">You lift zero technical fingers. <em>You own everything.</em></h2>
      <p className="sec-lead">
        Most hand-offs are a zip file and a goodbye. This one is a stack.
      </p>
    </div>

    <div className="ed-ben-grid">
      {stack.map(b => <BenefitCard key={b.title} b={b} />)}
    </div>

    <div className="ed-promise">All of it inside the fixed price. Not an add-on. Not an upsell.</div>

  </section>
)

export default Handoff
