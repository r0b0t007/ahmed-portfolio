import { Numeral } from './Process'

const roles = [
  {
    date: ['Jun 2024 —', 'Present'], kind: 'Delivery',
    role: 'Scrum Master', org: 'Bell Canada (via consulting engagement)',
    project: 'Service Assurance — large-scale telecom platform',
    bullets: [
      'On a service assurance platform an outage is the product failing, so uptime was a hard requirement.',
      'Fully distributed team on a scaled delivery setup, with a release cadence that had to hold.',
    ],
    tools: ['Jira', 'Confluence', 'SAFe'],
  },
  {
    date: ['Oct 2023 —', 'Jun 2024'], kind: 'Delivery',
    role: 'Scrum Master', org: 'NTT DATA — Client: Bayer',
    project: 'CS Regulatory — life sciences IT platform',
    bullets: [
      'Regulated life-sciences IT, where the documentation is part of the deliverable.',
      'Teams spread across several time zones, which meant raising risks early or not at all.',
    ],
    tools: ['Azure DevOps', 'Scrum', 'Kanban'],
  },
  {
    date: ['Jun 2021 —', 'Dec 2023'], kind: 'Delivery',
    role: 'Scrum Master', org: 'NTT DATA — Client: BMW',
    project: 'On-Demand Mobility Carsharing — connected vehicle',
    bullets: [
      'Multiple cloud-native product teams shipping connected-vehicle systems in a scaled programme.',
      'Refinement and release planning across teams that had to integrate with each other.',
    ],
    tools: ['Jira', 'Miro', 'SAFe'],
  },
  {
    date: ['Jan 2021 —', 'Jun 2021'], kind: 'Infrastructure',
    role: 'DevOps Engineer', org: 'NTT DATA — Client: BMW',
    project: 'On-Demand Mobility Carsharing Platform',
    bullets: ['CI/CD pipelines and observability tooling for a connected-vehicle platform.'],
    tools: ['Docker', 'Kubernetes', 'AWS'],
  },
  {
    date: ['2017 —', '2021'], kind: 'Engineering',
    role: 'Software Engineer', org: 'Harman Connected Services',
    project: 'Enterprise engagements for Maincare & Symphony Retail AI (Disney, Carrefour, Casino, Fnac)',
    bullets: [
      'Four years hands-on across full-stack, multi-platform products.',
      'Enterprise retail and health platforms with long release cycles and strict acceptance testing.',
    ],
    tools: ['Java/JEE', 'Spring', 'Node.js', 'Angular'],
  },
]

// One role as an index row: when, who, and what it taught.
const Row = ({ r }) => (
  <li className="row row--role">
    <p className="label row-when">{r.date[0]} {r.date[1]} · {r.kind}</p>
    <div className="row-who">
      <h3 className="title">{r.role}</h3>
      <p className="row-org">{r.org}</p>
      <p className="label">{r.project}</p>
    </div>
    <div className="row-body">
      <ul className="bullets">
        {r.bullets.map(b => <li key={b}>{b}</li>)}
      </ul>
      <ul className="chips row-tools">
        {r.tools.map(t => <li key={t}>{t}</li>)}
      </ul>
    </div>
  </li>
)

const Experience = () => (
  <section id="experience" className="band">
    <div className="shell">
      <Numeral n={9} />
      <div className="sec-head sec-head--narrow">
        <h2 className="head">Where the standards come from</h2>
        <p className="lead">
          Nine years inside enterprise software: about four building it, and five leading the
          teams that shipped it. Both halves show up in how I work now.
        </p>
      </div>

      <ol className="rows">
        {roles.map(r => <Row key={r.date.join() + r.role} r={r} />)}
      </ol>
    </div>
  </section>
)

export default Experience
