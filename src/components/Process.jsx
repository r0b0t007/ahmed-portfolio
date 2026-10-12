import { FIRST_LINK_DAYS } from '../content/site'
import { steps } from '../content/process'
import { useContent } from '../lib/content-context'
import { Clause } from './Doc'

/**
 * The four steps as a schedule: when each one happens, what it is, what happens in it. A real
 * table (column headers, one row per step), because that is what a schedule in a contract is.
 * The homepages and every service page render it from src/content/process.js, so the description
 * of how the work goes can't drift between them. `caption` states the launch lengths where the
 * page doesn't already (the service pages put theirs in the clause heading).
 */
export const ScheduleTable = ({ steps: rows, caption }) => {
  const { ui } = useContent()
  return (
    <table className="sheet-table schedule">
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>
          <th scope="col">{ui.doc.schedule.when}</th>
          <th scope="col">{ui.doc.schedule.step}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(s => (
          <tr key={s.title}>
            <td className="schedule-when">{s.meta}</td>
            <td>
              <h3 className="schedule-step">{s.title}</h3>
              <p>{s.desc}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const Process = () => {
  const { ui } = useContent()
  return (
    <Clause
      type="home" id="process"
      title={`A working link in ${FIRST_LINK_DAYS} days.`} accent="Then every week after."
      lead="Agencies go quiet for six weeks and come back with a surprise. You don’t get to say “that’s not what I meant” until it’s expensive to fix. Here, every project runs the same four steps, and you can see it running from the first one."
    >
      <ScheduleTable steps={steps} caption={ui.doc.schedule.launch} />
      <p className="clause-note">
        Every week you can’t see it is a week it can’t earn. Fast feedback loops mean a faster
        launch, and a faster launch means your asset starts working sooner.
      </p>
    </Clause>
  )
}

export default Process
