/** Tools, certifications and languages. Rendered inside Background.jsx, below the pitch. */
const panels = [
  { title: 'Build', tags: ['React', 'TypeScript', 'Node.js', 'Java/Spring', 'Angular', 'REST APIs', 'SQL'] },
  { title: 'AI & Automation', tags: ['LLM Applications', 'Claude & Claude Code', 'Agentic Workflows', 'RAG', 'Prompt Engineering'] },
  { title: 'Ship & Operate', tags: ['Docker', 'Kubernetes', 'AWS', 'GitLab CI/CD', 'Observability', 'Core Web Vitals'] },
  { title: 'Delivery', tags: ['Scrum', 'Kanban', 'SAFe', 'Scoping', 'Roadmapping', 'Stakeholder Communication'] },
]

const certs = [
  { name: 'Professional Scrum Master I (PSM I)', by: 'Scrum.org' },
  { name: 'SAFe® 6 Scrum Master', by: 'Scaled Agile' },
  { name: 'SAFe® 6 Agilist', by: 'Scaled Agile' },
]

const languages = 'Arabic (Native) · English (C2 / C1) · French (C1 / B2)'

export const Toolkit = () => (
    <dl className="kit">
      {panels.map(p => (
        <div key={p.title}>
          <dt>{p.title}</dt>
          <dd>{p.tags.join(' · ')}</dd>
        </div>
      ))}
      <div>
        <dt>Certifications</dt>
        <dd>{certs.map(c => `${c.name} (${c.by})`).join(' · ')}</dd>
      </div>
      <div>
        <dt>Languages</dt>
        <dd>{languages}</dd>
      </div>
    </dl>
)
