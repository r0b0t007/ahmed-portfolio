import { ordinal } from '../lib/ordinal'

const steps = [
  {
    title: 'Scope',
    meta: 'Free · 1 week',
    desc: 'A 30-minute call, then a written scope: what gets built, what doesn’t, what it costs, and the date it goes live. If I’m not the right person for it, I’ll say so here. That’s why it’s free.',
  },
  {
    title: 'Build',
    meta: 'Day 10: a link · then weekly',
    desc: 'Day ten, you get a URL. It’s rough. It’s real. You click through the core flow, react, and we adjust while changes are still cheap. Every week after: a demo, an updated link, a direct line to me. AI in the loop is why the timeline is weeks, not months. The weekly architecture review is why it holds.',
  },
  {
    title: 'Ship',
    meta: 'On the date in your scope',
    desc: 'Live on your infrastructure, your domain, your accounts. Performance, accessibility and SEO verified before it goes out, and you see the numbers. If I miss the date in your scope, I keep building until it ships, and the overrun is on me.',
  },
  {
    title: 'Hand over',
    meta: 'Included · 30 days of cover',
    desc: 'The repo, the pipeline, the documentation, a walkthrough, and 30 days of post-launch fixes. Any developer can pick it up after me. If you’d rather I kept going, we scope that separately.',
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
      <h2 className="sec-title">A working link in 10 days. <em>Then every week after.</em></h2>
      <p className="sec-lead">
        Agencies go quiet for six weeks and come back with a surprise. You don’t get to say
        “that’s not what I meant” until it’s expensive to fix. Here, every project runs the same
        four steps, and you can see it running from the first one.
      </p>
    </div>

    <div className="ed-steps">
      {steps.map((s, i) => <Step key={s.title} s={s} i={i} />)}
    </div>

    <div className="ed-promise">
      Every week you can’t see it is a week it can’t earn. Fast feedback loops mean a faster
      launch, and a faster launch means your asset starts working sooner.
    </div>

  </section>
)

export default Process
