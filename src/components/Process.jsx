import { FIRST_LINK_DAYS } from '../content/site'
import { steps } from '../content/process'

/** One stage of the F4 sequence: its 1.0-style number, title, timing and description. */
export const Step = ({ s, i }) => (
  <li className="stage">
    <span className="stage-n">{i + 1}.0</span>
    <div className="stage-head">
      <h3 className="title">{s.title}</h3>
      <p className="label">{s.meta}</p>
    </div>
    <p>{s.desc}</p>
  </li>
)

/** The four stages, as an ordered list: the order is the point. */
export const Steps = ({ list }) => (
  <ol className="stages">
    {list.map((s, i) => <Step key={s.title} s={s} i={i} />)}
  </ol>
)

/** The cropped numeral: a real figure as an object, hanging off the band's edge. Decorative. */
export const Numeral = ({ n }) => <span className="numeral" aria-hidden="true">{n}</span>

const Process = () => (
  <section id="process" className="band">
    <div className="shell">
      <Numeral n={FIRST_LINK_DAYS} />
      <div className="sec-head">
        <h2 className="head">A working link in {FIRST_LINK_DAYS} days. <em>Then every week after.</em></h2>
        <p className="lead">
          Agencies go quiet for six weeks and come back with a surprise. You don’t get to say
          “that’s not what I meant” until it’s expensive to fix. Here, every project runs the same
          four steps, and you can see it running from the first one.
        </p>
      </div>

      <Steps list={steps} />

      <p className="stages-note">
        Every week you can’t see it is a week it can’t earn. Fast feedback loops mean a faster
        launch, and a faster launch means your asset starts working sooner.
      </p>
    </div>
  </section>
)

export default Process
