
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

// Skills as a ruled 2 x 2 matrix, then the certificates and languages as one row of fact cells.
const About = () => (
  <section id="about" className="band">
    <div className="shell">
      <div className="sec-head">
        <h2 className="head">What I work with</h2>
        <p className="lead">
          I use AI every day in the build, and it’s the difference between quoting six weeks and
          quoting six months. What it hasn’t changed is the part that decides whether software
          survives real users: the data model, the architecture, the tests, and knowing what to
          leave out. That half came from nine years of enterprise delivery.
        </p>
      </div>

      <ul className="matrix matrix--2">
        {panels.map(p => (
          <li key={p.title}>
            <span className="qdisc" aria-hidden="true" />
            <h3 className="title">{p.title}</h3>
            <ul className="chips">
              {p.tags.map(t => <li key={t}>{t}</li>)}
            </ul>
          </li>
        ))}
      </ul>

      <dl className="facts-row">
        {certs.map(c => (
          <div key={c.name}>
            <dt className="label">{c.by}</dt>
            <dd>{c.name}</dd>
          </div>
        ))}
        <div>
          <dt className="label">Languages</dt>
          <dd>{languages}</dd>
        </div>
      </dl>
    </div>
  </section>
)

export default About
