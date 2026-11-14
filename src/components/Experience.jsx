const roles = [
  {
    date: ['Jun 2024 —', 'Present'], kind: 'Delivery',
    role: 'Scrum Master', org: 'Bell Canada (via consulting engagement)',
    project: 'Service Assurance — large-scale telecom platform',
    tools: ['Jira', 'Confluence', 'SAFe'],
  },
  {
    date: ['Oct 2023 —', 'Jun 2024'], kind: 'Delivery',
    role: 'Scrum Master', org: 'NTT DATA — Client: Bayer',
    project: 'CS Regulatory — life sciences IT platform',
    tools: ['Azure DevOps', 'Scrum', 'Kanban'],
  },
  {
    date: ['Jun 2021 —', 'Dec 2023'], kind: 'Delivery',
    role: 'Scrum Master', org: 'NTT DATA — Client: BMW',
    project: 'On-Demand Mobility Carsharing — connected vehicle',
    tools: ['Jira', 'Miro', 'SAFe'],
  },
  {
    date: ['Jan 2021 —', 'Jun 2021'], kind: 'Infrastructure',
    role: 'DevOps Engineer', org: 'NTT DATA — Client: BMW',
    project: 'On-Demand Mobility Carsharing Platform',
    tools: ['Docker', 'Kubernetes', 'AWS'],
  },
  {
    date: ['2017 —', '2021'], kind: 'Engineering',
    role: 'Software Engineer', org: 'Harman Connected Services',
    project: 'Enterprise engagements for Maincare & Symphony Retail AI (Disney, Carrefour, Casino, Fnac)',
    tools: ['Java/JEE', 'Spring', 'Node.js', 'Angular'],
  },
]

const Row = ({ r }) => {
  return (
    <div className="ed-row">
      <div className="ed-row-date">
        {r.date[0]}<br />{r.date[1]}
        <span className="ed-kind">{r.kind}</span>
      </div>
      <div>
        <h3 className="ed-role">{r.role}</h3>
        <div className="ed-org">{r.org}</div>
        <div className="ed-project">{r.project}</div>
        <div className="ed-tools">
          {r.tools.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </div>
  )
}

const Experience = () => (
  <section id="experience" className="section">
    <div className="sec-head">
      <h2 className="sec-title">Where the <em>standards</em> come from</h2>
      <p className="sec-lead">
        Nine years inside enterprise software: about four building it, and five leading the
        teams that shipped it. Both halves show up in how I work now.
      </p>
    </div>

    <div className="ed-timeline">
      {roles.map((r, i) => <Row key={i} r={r} />)}
    </div>

  </section>
)

export default Experience
