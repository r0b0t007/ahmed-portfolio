import { numberOf } from '../lib/sections'
import { Clause, SpecList } from './Doc'

const roles = [
  {
    date: 'Jun 2024 – present', kind: 'Delivery',
    role: 'Scrum Master', org: 'Bell Canada (via consulting engagement)',
    project: 'Service Assurance, a large-scale telecom platform',
    bullets: [
      'On a service assurance platform an outage is the product failing, so uptime was a hard requirement.',
      'Fully distributed team on a scaled delivery setup, with a release cadence that had to hold.',
    ],
    tools: ['Jira', 'Confluence', 'SAFe'],
  },
  {
    date: 'Oct 2023 – Jun 2024', kind: 'Delivery',
    role: 'Scrum Master', org: 'NTT DATA, client: Bayer',
    project: 'CS Regulatory, a life sciences IT platform',
    bullets: [
      'Regulated life-sciences IT, where the documentation is part of the deliverable.',
      'Teams spread across several time zones, which meant raising risks early or not at all.',
    ],
    tools: ['Azure DevOps', 'Scrum', 'Kanban'],
  },
  {
    date: 'Jun 2021 – Dec 2023', kind: 'Delivery',
    role: 'Scrum Master', org: 'NTT DATA, client: BMW',
    project: 'On-Demand Mobility Carsharing, connected vehicle',
    bullets: [
      'Multiple cloud-native product teams shipping connected-vehicle systems in a scaled programme.',
      'Refinement and release planning across teams that had to integrate with each other.',
    ],
    tools: ['Jira', 'Miro', 'SAFe'],
  },
  {
    date: 'Jan 2021 – Jun 2021', kind: 'Infrastructure',
    role: 'DevOps Engineer', org: 'NTT DATA, client: BMW',
    project: 'On-Demand Mobility Carsharing Platform',
    bullets: ['CI/CD pipelines and observability tooling for a connected-vehicle platform.'],
    tools: ['Docker', 'Kubernetes', 'AWS'],
  },
  {
    date: '2017 – 2021', kind: 'Engineering',
    role: 'Software Engineer', org: 'Harman Connected Services',
    project: 'Enterprise engagements for Maincare and Symphony Retail AI (Disney, Carrefour, Casino, Fnac)',
    bullets: [
      'Four years hands-on across full-stack, multi-platform products.',
      'Enterprise retail and health platforms with long release cycles and strict acceptance testing.',
    ],
    tools: ['Java/JEE', 'Spring', 'Node.js', 'Angular'],
  },
]

/**
 * Annex B: the record, one ruled row per role. The dates and the kind of work sit in the term
 * column; the role, the employer, the project and what it demanded in the body.
 */
const Experience = () => (
  <Clause
    type="home" id="experience"
    title="Where the standards come from"
    lead="Nine years inside enterprise software: about four building it, and five leading the teams that shipped it. Both halves show up in how I work now."
  >
    <SpecList
      prefix={numberOf('home', 'experience')}
      rows={roles.map(r => ({
        key: r.date,
        term: r.role,
        sub: `${r.date} · ${r.kind}`,
        body: <>
          <p className="role-org"><b>{r.org}</b>. {r.project}.</p>
          <ul className="role-bullets">{r.bullets.map(b => <li key={b}>{b}</li>)}</ul>
          <p className="spec-tags">{r.tools.join(' · ')}</p>
        </>,
      }))}
    />
  </Clause>
)

export default Experience
