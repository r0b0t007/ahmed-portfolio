/** Nine years of roles, newest first. Rendered inside Background.jsx, below the pitch. */
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

const Row = ({ r }) => (
  <li className="role">
    <p className="role-when">{r.date[0]} {r.date[1]} · {r.kind}</p>
    <h4 className="role-t">{r.role}</h4>
    <p className="role-org">{r.org}</p>
    <p className="role-project">{r.project}</p>
    <ul className="role-points">
      {r.bullets.map((b, i) => <li key={i}>{b}</li>)}
    </ul>
    <p className="role-tools">{r.tools.join(' · ')}</p>
  </li>
)

export const Roles = () => (
  <ol className="roles">
    {roles.map((r, i) => <Row key={i} r={r} />)}
  </ol>
)
