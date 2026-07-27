import { useFadeIn } from '../hooks/useFadeIn'

const roles = [
  {
    date: ['Jun 2024 —', 'Present'], kind: 'Agile',
    role: 'Scrum Master', org: 'Bell Canada (via consulting engagement)',
    project: 'Service Assurance — large-scale telecom platform',
    bullets: [
      'Facilitate ceremonies for a fully distributed team; remove blockers and protect focus.',
      'Track velocity and delivery-health metrics; coach continuous improvement.',
    ],
    tools: ['Jira', 'Confluence', 'SAFe'],
  },
  {
    date: ['Oct 2023 —', 'Jun 2024'], kind: 'Agile',
    role: 'Scrum Master', org: 'NTT DATA — Client: Bayer',
    project: 'CS Regulatory — life sciences IT platform',
    bullets: [
      'Facilitated all ceremonies for a distributed team across multiple time zones.',
      'Reported sprint metrics and delivery health; flagged risks early.',
    ],
    tools: ['Azure DevOps', 'Scrum', 'Kanban'],
  },
  {
    date: ['Jun 2021 —', 'Dec 2023'], kind: 'Agile',
    role: 'Scrum Master', org: 'NTT DATA — Client: BMW',
    project: 'On-Demand Mobility Carsharing — connected vehicle',
    bullets: [
      'Scrum Master for multiple cloud-native product teams in a scaled agile setup.',
      'Partnered with POs on refinement and release planning across programs.',
    ],
    tools: ['Jira', 'Miro', 'SAFe'],
  },
  {
    date: ['Jan 2021 —', 'Jun 2021'], kind: 'DevOps',
    role: 'DevOps Engineer', org: 'NTT DATA — Client: BMW',
    project: 'On-Demand Mobility Carsharing Platform',
    bullets: ['Built CI/CD pipelines and observability tooling before moving into the SM role.'],
    tools: ['Docker', 'Kubernetes', 'AWS'],
  },
  {
    date: ['2017 —', '2021'], kind: 'Engineering',
    role: 'Software Engineer', org: 'Harman Connected Services',
    project: 'Enterprise engagements for Maincare & Symphony Retail AI (Disney, Carrefour, Casino, Fnac)',
    bullets: ['Delivered features within Scrum cycles across full-stack, multi-platform products.'],
    tools: ['Java/JEE', 'Node.js', 'Angular'],
  },
]

const Row = ({ r }) => {
  const ref = useFadeIn(0.1)
  return (
    <div ref={ref} className="fade-in ed-row">
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
        <span className="eyebrow">Experience</span>
        <span className="eyebrow-index">( 02 )</span>
      </div>
      <h2 className="sec-title">Nine years of <em>enterprise</em> delivery</h2>
    </div>

    <div className="ed-timeline">
      {roles.map((r, i) => <Row key={i} r={r} />)}
    </div>

    <style>{`
      .ed-timeline { max-width: 780px; }
      .ed-row {
        display: grid; grid-template-columns: 160px 1fr; gap: 32px;
        padding: 30px 0; border-bottom: 1px solid var(--hair);
      }
      .ed-row-date {
        font-family: var(--mono); font-size: 0.74rem; color: var(--ink-muted);
        line-height: 1.8; padding-top: 5px;
      }
      .ed-kind {
        display: inline-block; margin-top: 8px; padding: 3px 10px;
        border: 1px solid var(--hair); color: var(--teal);
        font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase;
      }
      .ed-role { font-family: var(--serif); font-size: 1.35rem; font-weight: 400; margin-bottom: 2px; }
      .ed-org { font-size: 0.88rem; color: var(--ink-2); }
      .ed-project {
        font-family: var(--serif); font-style: italic; font-size: 0.95rem;
        color: var(--teal); margin: 8px 0 14px;
      }
      .ed-bullets { display: flex; flex-direction: column; gap: 7px; margin-bottom: 16px; }
      .ed-bullet { font-size: 0.9rem; color: var(--ink-2); padding-left: 18px; position: relative; line-height: 1.65; }
      .ed-bullet span { position: absolute; left: 0; color: var(--teal); }
      .ed-tools { display: flex; flex-wrap: wrap; gap: 8px; }
      @media (max-width: 620px) {
        .ed-row { grid-template-columns: 1fr; gap: 14px; }
      }
    `}</style>
  </section>
)

export default Experience
