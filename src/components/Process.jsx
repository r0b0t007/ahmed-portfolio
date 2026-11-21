import { ordinal } from '../lib/ordinal'
import { BOOKING_URL, CTA_LABEL, CTA_LABEL_LONG, FIRST_LINK_DAYS } from '../content/site'
import { CtaLabel } from './CtaLabel'
import { homeSteps as steps } from '../content/process'

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
      {steps.map((s, i) => <Step key={s.title} s={s} i={i} />)}
    </div>

    {/* The one booking key between the hero and the price table. On a phone the header's key is
        inside the menu, so without this a reader scrolls five sections with nothing to press. */}
    <div className="ed-cta-row ed-steps-cta">
      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink"><CtaLabel long={CTA_LABEL_LONG} short={CTA_LABEL} /></a>
    </div>

  </section>
)

export default Process
