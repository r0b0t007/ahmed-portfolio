import { servicePath } from '../content/routes'
import { services } from '../content/services'
import { numberOf } from '../lib/sections'
import { Clause, SpecList } from './Doc'
import { serviceRows } from './rows'

const Services = () => (
  <Clause
    type="home" id="services"
    title="What I" accent="build"
    lead="Two things, done end to end. Scoped up front, shipped on an agreed date, and handed over so you can maintain them without me."
  >
    <SpecList
      prefix={numberOf('home', 'services')}
      rows={[
        ...serviceRows(services, s => servicePath(s.slug), s => `${s.name} in detail`),
        {
          key: 'also',
          term: 'Also on request',
          body: <p>
            <b>Already have a codebase that won&rsquo;t move, or a process eating hours a week?</b>{' '}
            Architecture rescues and AI automation are services too. Mention it in the scope call and
            we&rsquo;ll price it the same way.
          </p>,
        },
      ]}
    />
  </Clause>
)

export default Services
