import { FIRST_LINK_DAYS } from '../content/site'
import { steps } from '../content/process'

export const Step = ({ s }) => {
  return (
    <div className="fade-in ed-step">
      <div className="ed-step-side">
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
      </div>
      <h2 className="sec-title">A working link in {FIRST_LINK_DAYS} days. <em>Then every week after.</em></h2>
      <p className="sec-lead">
        Agencies go quiet for six weeks and come back with a surprise. You don’t get to say
        “that’s not what I meant” until it’s expensive to fix. Here, every project runs the same
        four steps, and you can see it running from the first one.
      </p>
    </div>

    <div className="ed-steps">
      {steps.map(s => <Step key={s.title} s={s} />)}
    </div>

    <div className="ed-promise">
      Every week you can’t see it is a week it can’t earn. Fast feedback loops mean a faster
      launch, and a faster launch means your asset starts working sooner.
    </div>

  </section>
)

export default Process
