import { useFadeIn } from '../hooks/useFadeIn'

const panels = [
  { i: '001', title: 'AI & Automation', tags: ['LLM Applications', 'Claude & Claude Code', 'Agentic Workflows', 'Prompt Engineering', 'RAG', 'Automation'] },
  { i: '002', title: 'Delivery & Agile', tags: ['Scrum', 'Kanban', 'SAFe', 'PI Planning', 'Release Planning'] },
  { i: '003', title: 'Engineering Foundation', tags: ['Java/JEE', 'Spring', 'Node.js', 'TypeScript', 'Docker', 'AWS'] },
  { i: '004', title: 'Advisory & Facilitation', tags: ['AI Adoption Roadmapping', 'Stakeholder Communication', 'Workshops & Coaching', 'Team Enablement'] },
]

const certs = [
  { name: 'Professional Scrum Master I (PSM I)', by: 'Scrum.org' },
  { name: 'SAFe® 6 Scrum Master', by: 'Scaled Agile' },
  { name: 'SAFe® 6 Agilist', by: 'Scaled Agile' },
]

const languages = 'Arabic (Native) · English (C2 / C1) · French (C1 / B2)'

const Panel = ({ p }) => {
  const ref = useFadeIn(0.1)
  return (
    <div ref={ref} className="fade-in ed-panel">
      <div className="ed-panel-head">
        <h3>{p.title}</h3>
        <span className="ed-panel-i">{p.i}</span>
      </div>
      <div className="ed-panel-tags">
        {p.tags.map(t => <span key={t} className="ed-pill">{t}</span>)}
      </div>
    </div>
  )
}

const About = () => {
  const leadRef = useFadeIn(0.1)
  return (
    <section id="about" className="section">
      <div className="eyebrow-block">
        <div className="eyebrow-row">
          <span className="eyebrow">About</span>
          <span className="eyebrow-index">( 03 )</span>
        </div>
        <h2 className="sec-title">AI fluency. <em>Delivery discipline.</em></h2>
        <p ref={leadRef} className="fade-in sec-lead">
          AI Transformation Consultant pairing hands-on AI engineering — LLMs, agentic workflows,
          and automation — with a 9-year enterprise delivery background. I advise where AI fits,
          build the systems, and leave teams able to keep shipping.
        </p>
      </div>

      <div className="hair-grid ed-about-grid">
        {panels.map(p => <Panel key={p.i} p={p} />)}

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

      <style>{`
        .ed-about-grid { grid-template-columns: 1fr 1fr; max-width: 940px; }
        .ed-panel { background: var(--paper-card); padding: 30px 32px; }
        .ed-panel-head {
          display: flex; align-items: baseline; justify-content: space-between;
          border-bottom: 1px solid var(--ink); padding-bottom: 14px; margin-bottom: 18px;
        }
        .ed-panel-head h3 { font-family: var(--serif); font-size: 1.25rem; font-weight: 400; }
        .ed-panel-i { font-family: var(--mono); font-size: 0.7rem; color: var(--ink-muted); }
        .ed-panel-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .ed-pill {
          padding: 6px 14px; border: 1px solid var(--hair); background: var(--paper);
          font-size: 0.8rem; font-weight: 500; color: var(--ink-2);
        }
        .ed-cert-strip {
          grid-column: span 2; background: var(--paper-card); padding: 24px 32px;
          display: flex; flex-wrap: wrap; gap: 32px;
        }
        .ed-cert { display: flex; align-items: center; gap: 12px; }
        .ed-cert-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--teal); flex-shrink: 0; }
        .ed-cert-n { font-size: 0.88rem; font-weight: 600; }
        .ed-cert-by { font-family: var(--mono); font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-muted); margin-top: 2px; }
        .ed-lang-strip {
          grid-column: span 2; background: var(--paper-card); padding: 20px 32px;
          display: flex; align-items: baseline; gap: 18px; flex-wrap: wrap;
        }
        .ed-lang-label { font-family: var(--mono); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--teal); }
        .ed-lang-val { font-size: 0.9rem; color: var(--ink-2); }
        @media (max-width: 720px) {
          .ed-about-grid { grid-template-columns: 1fr; }
          .ed-cert-strip, .ed-lang-strip { grid-column: span 1; }
        }
      `}</style>
    </section>
  )
}

export default About
