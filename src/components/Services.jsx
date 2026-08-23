import { useFadeIn } from '../hooks/useFadeIn'

const services = [
  {
    n: '01',
    title: 'Websites that rank and convert',
    tagline: 'Fast to load. Built to be found.',
    desc: 'Marketing sites, landing pages and portfolios that earn their keep — designed and built from scratch, not dropped into a template. Every build ships with the SEO foundation most sites bolt on too late: structured data, clean semantics, real meta, sitemap, and Core Web Vitals treated as a requirement rather than a cleanup task.',
    tags: ['Design & build', 'SEO foundation', 'Core Web Vitals', 'Analytics'],
  },
  {
    n: '02',
    title: 'SaaS & MVP builds',
    tagline: 'From idea to something real users can touch.',
    desc: 'A working product, not a prototype that dies in a demo. We scope the smallest version that proves the thing, then I build it — auth, data model, core flows, payments if you need them — deployed on infrastructure that won’t need replacing when it works.',
    tags: ['MVP scoping', 'Full-stack build', 'Auth & payments', 'Deploy pipeline'],
  },
  {
    n: '03',
    title: 'Architecture & technical rescue',
    tagline: 'For products that shipped fast and now can’t move.',
    desc: 'Someone built it quickly, it worked, and now every change breaks something else. I audit what’s there, tell you plainly what’s worth saving, and give you a sequenced plan — or do the work. Nine years inside enterprise codebases means I’ve seen how this ends, and how to stop it without a rewrite you can’t afford.',
    tags: ['Codebase audit', 'Refactor plan', 'Performance', 'Remediation'],
  },
  {
    n: '04',
    title: 'AI-augmented automation',
    tagline: 'AI inside the work, not beside it.',
    desc: 'The internal tooling that quietly removes hours a week — LLM workflows, agents, retrieval over your own documents, integrations between systems that don’t talk. Built against your real processes and measured against how long the job took before. If AI doesn’t beat the baseline, I’ll say so.',
    tags: ['LLM applications', 'Agentic workflows', 'RAG', 'Integrations'],
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
      <h2 className="sec-title">What I <em>build</em></h2>
      <p className="sec-lead">
        Four things, done properly. Scoped up front, shipped on a date, handed over with
        the keys — not a dependency on me.
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
