import { ordinal } from '../lib/ordinal'

/**
 * The hand-off, unbundled. "You own the repo" is one line; the stack below is what a founder is
 * actually buying at the end of the build. Reuses the Benefits card styles (.ed-ben*) so the two
 * three-column sections read as one system.
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
    title: 'Launch insurance, 30 days',
    lines: [
      'Bugs surfaced in the first 30 days: fixed, included.',
      'Small tweaks as real users hit it: included. The direct channel stays open.',
      'The first month is when things break. I stay for it.',
    ],
  },
]

const Item = ({ b, i }) => (
  <div className="fade-in ed-ben">
    <div className="ed-ben-n">( {ordinal(i, 2)} )</div>
    <h3 className="ed-ben-t">{b.title}</h3>
    {b.lines.map(l => <p key={l} className="ed-ben-l">{l}</p>)}
  </div>
)

const Handoff = () => (
  <section id="handoff" className="section">
    <div className="eyebrow-block">
      <div className="eyebrow-row">
        <span className="eyebrow">What you walk away with</span>
        <span className="eyebrow-index">( 04 )</span>
      </div>
      <h2 className="sec-title">You lift zero technical fingers. <em>You own everything.</em></h2>
      <p className="sec-lead">
        Most hand-offs are a zip file and a goodbye. This one is a stack.
      </p>
    </div>

    <div className="hair-grid ed-ben-grid">
      {stack.map((b, i) => <Item key={b.title} b={b} i={i} />)}
    </div>

    <div className="ed-promise">All of it inside the fixed price. Not an add-on. Not an upsell.</div>

  </section>
)

export default Handoff
