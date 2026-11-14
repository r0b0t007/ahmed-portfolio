import { ordinal } from '../lib/ordinal'
import { FIRST_LINK_DAYS } from '../content/site'
import { steps } from '../content/process'

export const Step = ({ s, i }) => {
  return (
    <div className="ed-step">
      <div className="ed-step-side">
        {/* Visual only: the order of the steps already says it, and Markdown twins and screen
            readers would otherwise get a bare "01" line. */}
        <div className="ed-step-n" aria-hidden="true">{ordinal(i, 2)}</div>
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
    <div className="sec-head">
      <h2 className="sec-title">A working link in {FIRST_LINK_DAYS} days. <em>Then every week after.</em></h2>
      <p className="sec-lead">
        Agencies go quiet for six weeks and come back with a surprise. Here, every project runs
        the same four steps, and you can see it running from the first one.
      </p>
    </div>

    <div className="ed-steps">
      {steps.map((s, i) => <Step key={s.title} s={{ ...s, desc: s.short }} i={i} />)}
    </div>

  </section>
)

export default Process
