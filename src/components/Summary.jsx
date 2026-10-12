import { numberOf } from '../lib/sections'
import { Clause, SpecList } from './Doc'

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

/** Annex C: the tools, the certifications and the languages, as ruled rows. */
const About = () => (
  <Clause
    type="home" id="about"
    title="What I work" accent="with"
    lead="I use AI every day in the build, and it’s the difference between quoting six weeks and quoting six months. What it hasn’t changed is the part that decides whether software survives real users: the data model, the architecture, the tests, and knowing what to leave out. That half came from nine years of enterprise delivery."
  >
    <SpecList
      prefix={numberOf('home', 'about')}
      rows={[
        ...panels.map(p => ({ key: p.title, term: p.title, body: <p>{p.tags.join(' · ')}</p> })),
        {
          key: 'certs',
          term: 'Certifications',
          body: <ul className="role-bullets">{certs.map(c => <li key={c.name}>{c.name}, {c.by}</li>)}</ul>,
        },
        { key: 'languages', term: 'Languages', body: <p>{languages}</p> },
      ]}
    />
  </Clause>
)

export default About
