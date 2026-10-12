import { FIRST_LINK_DAYS } from '../content/site'
import { steps } from '../content/process'
import { Block } from './Split'

/**
 * A step, folded: its number, name and timing are the whole outline, and the paragraph opens on
 * request. The French homepage and the service pages render the same component inside an
 * <ol className="steps">.
 */
export const Step = ({ s, i }) => (
  <li>
    <details className="fold step">
      <summary>
        <span className="step-n">{i + 1}</span>
        <h3 className="step-t">{s.title}</h3>
        <span className="step-meta">{s.meta}</span>
      </summary>
      <div className="fold-body"><p>{s.desc}</p></div>
    </details>
  </li>
)

const Process = () => (
  <Block
    id="process"
    title={`A working link in ${FIRST_LINK_DAYS} days.`}
    em="Then every week after."
    lead="Agencies go quiet for six weeks and come back with a surprise. You don’t get to say “that’s not what I meant” until it’s expensive to fix. Here, every project runs the same four steps, and you can see it running from the first one."
  >
    <ol className="steps">
      {steps.map((s, i) => <Step key={s.title} s={s} i={i} />)}
    </ol>
    <p className="note">
      Every week you can’t see it is a week it can’t earn. Fast feedback loops mean a faster
      launch, and a faster launch means your asset starts working sooner.
    </p>
  </Block>
)

export default Process
