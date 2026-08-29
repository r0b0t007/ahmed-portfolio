
const roles = [
  {
    date: ['Jun 2024 —', 'Present'], kind: 'Delivery',
    role: 'Scrum Master', org: 'Bell Canada (via consulting engagement)',
    project: 'Service Assurance — large-scale telecom platform',
    bullets: [
      'A platform where an outage is the product failing — uptime as a requirement, not a target.',
      'Distributed team, scaled delivery, release cadence that can’t slip quietly.',
    ],
    tools: ['Jira', 'Confluence', 'SAFe'],
  },
  {
    date: ['Oct 2023 —', 'Jun 2024'], kind: 'Delivery',
    role: 'Scrum Master', org: 'NTT DATA — Client: Bayer',
    project: 'CS Regulatory — life sciences IT platform',
    bullets: [
      'Regulated life-sciences IT, where “we’ll document it later” isn’t an option.',
      'Distributed across multiple time zones, with risk flagged early or not at all.',
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
    bullets: ['CI/CD pipelines and observability — the infrastructure half of shipping.'],
    tools: ['Docker', 'Kubernetes', 'AWS'],
  },
  {
    date: ['2017 —', '2021'], kind: 'Engineering',
    role: 'Software Engineer', org: 'Harman Connected Services',
    project: 'Enterprise engagements for Maincare & Symphony Retail AI (Disney, Carrefour, Casino, Fnac)',
    bullets: [
      'Four years hands-on across full-stack, multi-platform products.',
      'Enterprise retail and health platforms used by companies that audit their vendors.',
    ],
    tools: ['Java/JEE', 'Spring', 'Node.js', 'Angular'],
  },
]

const Row = ({ r }) => {
  return (
    <div className="fade-in ed-row">
      <div className="ed-row-date">
        {r.date[0]}<br />{r.date[1]}
        <span className="ed-kind">{r.kind}</span>
      </div>
      <div>
        <h3 className="ed-role">{r.role}</h3>
        <div className="ed-org">{r.org}</div>
        <div className="ed-project">{r.project}</div>
        <div className="ed-bullets">
          {r.bullets.map((b, i) => <div key={i} className="ed-bullet"><span>—</span>{b}</div>)}
        </div>
        <div className="ed-tools">
          {r.tools.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </div>
  )
}

const Experience = () => (
  <section id="experience" className="section">
    <div className="eyebrow-block">
      <div className="eyebrow-row">
        <span className="eyebrow">Background</span>
        <span className="eyebrow-index">( 04 )</span>
      </div>
      <h2 className="sec-title">Where the <em>standards</em> come from</h2>
      <p className="sec-lead">
        Nine years inside enterprise software — four building it, five making sure teams
        shipped it. Both halves show up in how I work now.
      </p>
    </div>

    <div className="ed-timeline">
      {roles.map((r, i) => <Row key={i} r={r} />)}
    </div>

  </section>
)

export default Experience
