import { ordinal } from '../lib/ordinal'

const steps = [
  {
    title: 'Scope',
    meta: 'Free · 1 week',
    desc: 'A call, then a written scope: what gets built, what doesn’t, what it costs, and the date it lands. If I don’t think I’m the right person for it, I’ll tell you here — that’s the whole point of this step being free.',
  },
  {
    title: 'Build',
    meta: '2 to 6 weeks, typical',
    desc: 'You see it running from week one. Weekly demo, a link you can click, and a channel where you can reach me. AI in the loop is why the timeline looks short; the architecture review at the end of each week is why it holds.',
  },
  {
    title: 'Ship',
    meta: 'Days',
    desc: 'Live on your infrastructure, your domain, your accounts. Performance, accessibility and SEO verified before launch, not promised for later.',
  },
  {
    title: 'Hand over',
    meta: 'Included',
    desc: 'The repo, the pipeline, the documentation, and a walkthrough. You can take it to any developer afterwards. If you’d rather I kept building, that’s a new scope — not an assumption.',
  },
]

const Step = ({ s, i }) => {
  return (
    <div className="fade-in ed-step">
      <div className="ed-step-side">
        <div className="ed-step-n">( {ordinal(i, 2)} )</div>
        <div className="ed-step-meta">{s.meta}</div>
      </div>
      <div>
        <h3 className="ed-step-t">{s.title}</h3>
        <p className="ed-step-desc">{s.desc}</p>
      </div>
    </div>
  )
}

const Process = () => (
  <section id="process" className="section">
    <div className="eyebrow-block">
      <div className="eyebrow-row">
        <span className="eyebrow">Process</span>
        <span className="eyebrow-index">( 02 )</span>
      </div>
      <h2 className="sec-title">How I <em>build</em></h2>
      <p className="sec-lead">
        No open-ended retainers, no surprise invoices. Every project runs the same four
        steps, and you know the shape before you commit.
      </p>
    </div>

    <div className="ed-steps">
      {steps.map((s, i) => <Step key={s.title} s={s} i={i} />)}
    </div>

    <div className="ed-promise">Fixed scope. Fixed price. A date, in writing.</div>

  </section>
)

export default Process
