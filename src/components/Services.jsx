import { useFadeIn } from '../hooks/useFadeIn'

const services = [
  {
    n: '01',
    title: 'AI Adoption Strategy & Roadmapping',
    tagline: 'Where AI actually moves your numbers.',
    desc: 'Identify high-value use cases, assess feasibility and risk, and build a pragmatic adoption roadmap with the guardrails to ship responsibly.',
    tags: ['Use-case discovery', 'Feasibility & ROI', 'Roadmap', 'Governance'],
  },
  {
    n: '02',
    title: 'AI-Augmented Delivery',
    tagline: 'AI inside how your teams already ship.',
    desc: 'Bring AI into the product and delivery workflow — refinement, docs, testing, reporting — without breaking cadence. Faster teams, same quality bar.',
    tags: ['Workflow design', 'Tooling', 'Enablement', 'Delivery metrics'],
  },
  {
    n: '03',
    title: 'Agentic Systems & Automation',
    tagline: 'Working systems, not slideware.',
    desc: 'Design and build LLM-powered workflows — agents, RAG, automation — integrated with your stack and measured against real baselines.',
    tags: ['LLM applications', 'Agentic workflows', 'RAG', 'Integration'],
  },
  {
    n: '04',
    title: 'Team Enablement & AI Fluency',
    tagline: 'Capability that stays after I leave.',
    desc: 'Hands-on training and playbooks so product and delivery teams keep shipping with AI — prompting, tooling, and ways of working.',
    tags: ['Workshops', 'Playbooks', 'Coaching'],
  },
]

const ServiceCard = ({ s }) => {
  const ref = useFadeIn(0.1)
  return (
    <div ref={ref} className="fade-in ed-svc">
      <div className="ed-svc-n">( {s.n} )</div>
      <h3 className="ed-svc-t">{s.title}</h3>
      <div className="ed-svc-tag">{s.tagline}</div>
      <p className="ed-svc-desc">{s.desc}</p>
      <div className="ed-svc-tags">
        {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  )
}

const Services = () => (
  <section id="services" className="section">
    <div className="eyebrow-block">
      <div className="eyebrow-row">
        <span className="eyebrow">Services</span>
        <span className="eyebrow-index">( 01 )</span>
      </div>
      <h2 className="sec-title">How I <em>help</em></h2>
      <p className="sec-lead">
        Four ways I take organizations from AI curiosity to shipped, measurable outcomes —
        strategy, delivery, build, and the capability to keep going.
      </p>
    </div>

    <div className="hair-grid ed-svc-grid">
      {services.map(s => <ServiceCard key={s.n} s={s} />)}
    </div>

    <style>{`
      .ed-svc-grid { grid-template-columns: 1fr 1fr; }
      .ed-svc {
        background: var(--paper-card);
        padding: 36px 34px;
        transition: background var(--transition);
      }
      .ed-svc:hover { background: var(--paper); }
      .ed-svc-n {
        font-family: var(--mono); font-size: 0.7rem; font-weight: 500;
        letter-spacing: 0.14em; color: var(--teal); margin-bottom: 22px;
      }
      .ed-svc-t {
        font-family: var(--serif); font-size: 1.5rem; font-weight: 400;
        line-height: 1.25; margin-bottom: 8px;
      }
      .ed-svc-tag {
        font-family: var(--serif); font-style: italic; font-size: 0.95rem;
        color: var(--teal); margin-bottom: 14px;
      }
      .ed-svc-desc { font-size: 0.95rem; color: var(--ink-2); line-height: 1.75; margin-bottom: 22px; }
      .ed-svc-tags { display: flex; flex-wrap: wrap; gap: 8px; }
      @media (max-width: 720px) { .ed-svc-grid { grid-template-columns: 1fr; } }
    `}</style>
  </section>
)

export default Services
