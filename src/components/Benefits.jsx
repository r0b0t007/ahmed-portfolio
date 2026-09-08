import { ordinal } from '../lib/ordinal'

/**
 * The three promises that decide whether a visitor keeps reading: speed, verifiability, and
 * ownership. Each maps to one of the three reasons founders don't buy — "it'll take forever",
 * "I can't tell if the work is any good", and "I'll be locked in".
 *
 * Lines are deliberately short. This section is read on a phone more often than not.
 */
const benefits = [
  {
    title: 'Fast, and you can watch it happen',
    lines: [
      'A marketing site takes 2 to 3 weeks. An MVP takes 4 to 6.',
      'You get a link you can open in week one, then a demo every week until it ships.',
    ],
  },
  {
    title: 'Check the work before you pay for it',
    lines: [
      'This site scores 100 / 100 / 100 on Lighthouse, and its source is public on GitHub.',
      'Two of my own products are live with real users. Open them and judge for yourself.',
    ],
  },
  {
    title: 'You own all of it, from day one',
    lines: [
      'Your repo, your hosting, your accounts.',
      'Handover includes documentation and a walkthrough, so any developer can take over after me.',
    ],
  },
]

const Benefit = ({ b, i }) => (
  <div className="fade-in ed-ben">
    <div className="ed-ben-n">( {ordinal(i, 2)} )</div>
    <h3 className="ed-ben-t">{b.title}</h3>
    {b.lines.map(l => <p key={l} className="ed-ben-l">{l}</p>)}
  </div>
)

const Benefits = () => (
  <section id="benefits" className="section">
    <div className="eyebrow-block">
      <div className="eyebrow-row">
        <span className="eyebrow">What you get</span>
        <span className="eyebrow-index">( 01 )</span>
      </div>
      <h2 className="sec-title">Three things that <em>decide it</em></h2>
      <p className="sec-lead">
        Most people hiring a developer are making a call they don&rsquo;t feel qualified to make.
        These are the three things that should settle it.
      </p>
    </div>

    <div className="hair-grid ed-ben-grid">
      {benefits.map((b, i) => <Benefit key={b.title} b={b} i={i} />)}
    </div>

  </section>
)

export default Benefits
