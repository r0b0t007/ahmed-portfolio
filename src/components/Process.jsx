import { ordinal } from '../lib/ordinal'

const steps = [
  {
    title: 'Scope',
    meta: 'Free · 1 week',
    desc: 'A call, then a written scope: what gets built, what doesn’t, what it costs, and when it lands. If I don’t think I’m the right person for the job, I’ll say so at this stage. That’s why it’s free.',
  },
  {
    title: 'Build',
    meta: '2 to 6 weeks, typical',
    desc: 'You get a working link in the first week, then a demo every week and a direct line to me. Building with AI is what makes the timeline short. I review the architecture at the end of every week so the speed doesn’t turn into debt you inherit.',
  },
  {
    title: 'Ship',
    meta: 'Days',
    desc: 'Live on your infrastructure, your domain, your accounts. I check performance, accessibility and SEO before it goes out, and you see the numbers.',
  },
  {
    title: 'Hand over',
    meta: 'Included',
    desc: 'You get the repo, the pipeline, the documentation and a walkthrough, so any developer can pick it up after me. If you’d rather I kept going, we scope that separately.',
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
        <span className="eyebrow-index">( 03 )</span>
      </div>
      <h2 className="sec-title">How I <em>build</em></h2>
      <p className="sec-lead">
        Every project runs the same four steps, so you know what you’re committing to
        before you commit to it. No open-ended retainers, no invoices you didn’t expect.
      </p>
    </div>

    <div className="ed-steps">
      {steps.map((s, i) => <Step key={s.title} s={s} i={i} />)}
    </div>

    <div className="ed-promise">Fixed scope, fixed price, and a date in writing.</div>

  </section>
)

export default Process
