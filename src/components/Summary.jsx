import { ordinal } from '../lib/ordinal'

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

const Panel = ({ p, i }) => {
  return (
    <div className="fade-in ed-panel">
      <div className="ed-panel-head">
        <h3>{p.title}</h3>
        <span className="ed-panel-i">{ordinal(i)}</span>
      </div>
      <div className="ed-panel-tags">
        {p.tags.map(t => <span key={t} className="ed-pill">{t}</span>)}
      </div>
    </div>
  )
}

const About = () => {
  return (
    <section id="about" className="section">
      <div className="eyebrow-block">
        <div className="eyebrow-row">
          <span className="eyebrow">About</span>
          <span className="eyebrow-index">( 08 )</span>
        </div>
        <h2 className="sec-title">What I work <em>with</em></h2>
        <p className="fade-in sec-lead">
          I use AI every day in the build, and it’s the difference between quoting six weeks and
          quoting six months. What it hasn’t changed is the part that decides whether software
          survives real users: the data model, the architecture, the tests, and knowing what to
          leave out. That half came from nine years of enterprise delivery.
        </p>
      </div>

      <div className="hair-grid ed-about-grid">
        {panels.map((p, i) => <Panel key={p.title} p={p} i={i} />)}

        <div className="ed-cert-strip">
          {certs.map(c => (
            <div key={c.name} className="ed-cert">
              <span className="ed-cert-dot" />
              <div>
                <div className="ed-cert-n">{c.name}</div>
                <div className="ed-cert-by">{c.by}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="ed-lang-strip">
          <span className="ed-lang-label">Languages</span>
          <span className="ed-lang-val">{languages}</span>
        </div>
      </div>

    </section>
  )
}

export default About
