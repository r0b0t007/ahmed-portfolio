import { servicePath } from '../content/routes'
import { services } from '../content/services'

// One card per service page, in the same order: the card copy lives with the page's copy in
// src/content/services.js, so a new service is one entry there, not one in each file. The link
// and its label are passed in, because the French homepage renders the same card. The visible
// label is short so it never wraps on a phone; the hidden half names the service for a screen
// reader's link list.
export const ServiceCard = ({ s, href, more }) => {
  return (
    <div className="ed-svc">
      <h3 className="ed-svc-t">{s.card.title}</h3>
      <div className="ed-svc-tag">{s.card.tagline}</div>
      <p className="ed-svc-desc">{s.card.desc}</p>
      <div className="ed-svc-tags">
        {s.card.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
      <a href={href} className="link-teal ed-svc-more">{more}<span className="sr-only"> ({s.name})</span> →</a>
    </div>
  )
}

const Services = () => (
  <section id="services" className="section">
    <div className="sec-head">
      <h2 className="sec-title">What I <em>build</em></h2>
      <p className="sec-lead">
        Two things, done end to end. Scoped up front, shipped on an agreed date, and handed
        over so you can maintain them without me.
      </p>
    </div>

    <div className="ed-svc-grid">
      {services.map(s => <ServiceCard key={s.slug} s={s} href={servicePath(s.slug)} more="Full details" />)}
    </div>

    <p className="ed-svc-also">
      <b>Already have a codebase that won&rsquo;t move, or a process eating hours a week?</b>{' '}
      Architecture rescues and AI automation are services too. Mention it in the scope call and
      we&rsquo;ll price it the same way.
    </p>

  </section>
)

export default Services
