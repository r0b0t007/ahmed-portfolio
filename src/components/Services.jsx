import { servicePath } from '../content/routes'
import { services } from '../content/services'
import { useContent } from '../lib/content-context'
import { scale, weeksTo } from '../lib/scale'

/**
 * Stepped bars against the service's two real figures, its price floor and its usual weeks,
 * each drawn as a share of the largest across the services shown. No invented data: both numbers
 * come from src/content/site.js through the service entry.
 */
const Bars = ({ s, max }) => {
  const { ui } = useContent()
  const rows = [
    { label: ui.service.facts.price, value: s.priceLabel, w: s.priceFrom / max.price },
    { label: ui.service.facts.weeks, value: s.weeks, w: weeksTo(s.weeks) / max.weeks },
  ]
  return (
    <dl className="bars">
      {rows.map(r => (
        <div key={r.label} className="bar">
          <dt className="label">{r.label}</dt>
          <span className="bar-track" aria-hidden="true"><span className="bar-fill" style={{ '--w': `${Math.round(r.w * 100)}%` }} /></span>
          <dd>{r.value}</dd>
        </div>
      ))}
    </dl>
  )
}

// One cell per service page, in the same order: the card copy lives with the page's copy in
// src/content/services.js, so a new service is one entry there, not one in each file. The link
// and its label are passed in, because the French homepage renders the same cell.
export const ServiceCard = ({ s, href, more, max }) => (
  <li className="svc-cell">
    <h3 className="title">{s.card.title}</h3>
    <p className="label">{s.card.tagline}</p>
    <Bars s={s} max={max} />
    <p>{s.card.desc}</p>
    <ul className="chips">
      {s.card.tags.map(t => <li key={t}>{t}</li>)}
    </ul>
    <a href={href} className="link">{more}</a>
  </li>
)

const Services = () => {
  const max = scale(services)
  return (
    <section id="services" className="band">
      <div className="shell">
        <div className="sec-head sec-head--narrow">
          <h2 className="head">What I build</h2>
          <p className="lead">
            Two things, done end to end. Scoped up front, shipped on an agreed date, and handed
            over so you can maintain them without me.
          </p>
        </div>

        <ul className="svc-cells">
          {services.map(s => <ServiceCard key={s.slug} s={s} href={servicePath(s.slug)} more={`${s.name} in detail`} max={max} />)}
        </ul>

        <p className="svc-also">
          <b>Already have a codebase that won&rsquo;t move, or a process eating hours a week?</b>{' '}
          Architecture rescues and AI automation are services too. Mention it in the scope call and
          we&rsquo;ll price it the same way.
        </p>
      </div>
    </section>
  )
}

export default Services
