import { servicePath } from '../content/routes'
import { services } from '../content/services'
import { Block } from './Split'

// One row per service page, in the same order: the copy lives with the page's copy in
// src/content/services.js, so a new service is one entry there, not one in each file. The link
// and its label are passed in, because the French homepage renders the same row. The tag chips
// the cards used to carry are gone: they restated the description in four words each.
export const ServiceCard = ({ s, href, more }) => (
  <li className="row">
    <h3 className="row-t">{s.card.title}</h3>
    <p className="row-sub">{s.card.tagline}</p>
    <p className="row-p">{s.card.desc}</p>
    <a href={href} className="link">{more} →</a>
  </li>
)

const Services = () => (
  <Block
    id="services"
    title="What I"
    em="build"
    lead="Two things, done end to end. Scoped up front, shipped on an agreed date, and handed over so you can maintain them without me."
  >
    <ul className="rows">
      {services.map(s => <ServiceCard key={s.slug} s={s} href={servicePath(s.slug)} more={`${s.name} in detail`} />)}
    </ul>
    <p className="note">
      <b>Already have a codebase that won&rsquo;t move, or a process eating hours a week?</b>{' '}
      Architecture rescues and AI automation are services too. Mention it in the scope call and
      we&rsquo;ll price it the same way.
    </p>
  </Block>
)

export default Services
