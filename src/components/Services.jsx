import { sectionIndex } from '../lib/sections'
import { ordinal } from '../lib/ordinal'

const services = [
  {
    title: 'Websites that rank and convert',
    tagline: 'Built to load fast and get found.',
    desc: 'Marketing sites, landing pages and portfolios, designed and built from scratch. Structured data, clean semantics, proper meta tags and a sitemap all go in during the build, and I measure Core Web Vitals before launch instead of leaving them as cleanup for later.',
    tags: ['Design & build', 'SEO foundation', 'Core Web Vitals', 'Analytics'],
  },
  {
    title: 'SaaS & MVP builds',
    tagline: 'From an idea to a product people can sign into.',
    desc: 'We agree on the smallest version that proves the idea, then I build it: auth, data model, the core flows, payments if you need them. It goes out on infrastructure that can take growth, so you’re not rebuilding the foundations the month it starts working.',
    tags: ['MVP scoping', 'Full-stack build', 'Auth & payments', 'Deploy pipeline'],
  },
]

const ServiceCard = ({ s, i }) => {
  return (
    <div className="fade-in ed-svc">
      <div className="ed-svc-n">( {ordinal(i, 2)} )</div>
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
        <span className="eyebrow-index">( {sectionIndex('services')} )</span>
      </div>
      <h2 className="sec-title">What I <em>build</em></h2>
      <p className="sec-lead">
        Two things, done end to end. Scoped up front, shipped on an agreed date, and handed
        over so you can maintain them without me.
      </p>
    </div>

    <div className="hair-grid ed-svc-grid">
      {services.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
    </div>

    <p className="fade-in ed-svc-also">
      <b>Already have a codebase that won&rsquo;t move, or a process eating hours a week?</b>{' '}
      Architecture rescues and AI automation are services too. Mention it in the scope call and
      we&rsquo;ll price it the same way.
    </p>

  </section>
)

export default Services
