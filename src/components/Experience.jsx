import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown, FaBriefcase, FaCode } from 'react-icons/fa'
import { useFadeIn } from '../hooks/useFadeIn'

const experiences = [
  {
    id: 1,
    role: 'Scrum Master',
    company: 'Bell.ca (via consulting engagement)',
    period: 'Jun 2024 – Present',
    project: 'Service Assurance — large-scale telecom platform',
    type: 'agile',
    description: [
      'Facilitate daily standups, sprint planning, sprint reviews, and retrospectives for a fully distributed team.',
      'Remove impediments and escalate blockers the team cannot self-resolve; protect the team from interruption and scope creep.',
      'Track velocity, sprint burndown, and delivery health metrics; surface trends and coach the team on continuous improvement.',
      'Partner with product managers and product owners to refine the backlog, sharpen acceptance criteria, and maintain prioritization.',
      'Coordinate with other Scrum Masters in a scaled agile environment to manage cross-team dependencies.',
      'Coach team members on agile principles, fostering self-organization and a culture of continuous improvement.',
    ],
    tools: ['Jira', 'Confluence', 'Miro', 'Scrum', 'SAFe', 'Kanban'],
  },
  {
    id: 2,
    role: 'Scrum Master',
    company: 'NTT DATA — Remote, Tetouan',
    period: 'Oct 2023 – Jun 2024',
    project: 'Bayer CS Regulatory — life sciences IT platform',
    type: 'agile',
    description: [
      'Facilitated all Scrum ceremonies for a distributed engineering team operating across multiple time zones.',
      'Resolved cross-team dependencies and removed blockers to keep sprint commitments on track.',
      'Coached team on Scrum practices and helped mature engineering hygiene (definition of done, refinement cadence).',
      'Reported sprint metrics and delivery health to stakeholders; flagged risks early and drove pragmatic mitigation.',
    ],
    tools: ['Azure DevOps Boards', 'OneNote', 'Scrum', 'Kanban'],
  },
  {
    id: 3,
    role: 'Scrum Master',
    company: 'NTT DATA — Remote, Tetouan',
    period: 'Jun 2021 – Dec 2023',
    project: 'BMW — On-Demand Mobility Carsharing & BMW Tele-Services (connected vehicle)',
    type: 'agile',
    description: [
      'Served as Scrum Master for multiple cloud-native product engineering teams in a scaled agile setup.',
      'Facilitated standups, planning, reviews, and retrospectives; ran focused retros that produced concrete, tracked improvements.',
      'Tracked velocity and sprint metrics to identify bottlenecks; coached teams on slicing stories and improving flow.',
      'Partnered with product owners on backlog refinement, story sizing, and release planning across multi-team programs.',
      'Mediated conflicts and built psychological safety in a fully distributed, multicultural team environment.',
      'Coordinated with other Scrum Masters and Release Train Engineers on cross-team dependencies and PI planning.',
    ],
    tools: ['Jira', 'Confluence', 'Miro', 'Scrum', 'SAFe', 'Kanban'],
  },
  {
    id: 4,
    role: 'DevOps Engineer',
    company: 'NTT DATA — Tetouan',
    period: 'Jan 2021 – Jun 2021',
    project: 'BMW — On-Demand Mobility Carsharing Platform',
    type: 'devops',
    description: [
      'Built CI/CD pipelines and observability tooling; contributed to platform development before transitioning into the Scrum Master role on the same product.',
    ],
    tools: ['Java EE', 'Docker', 'Kubernetes', 'GitLab CI/CD', 'AWS (RDS/SQS)', 'Grafana', 'Prometheus', 'Kibana', 'MQTT'],
  },
  {
    id: 5,
    role: 'Software Engineer',
    company: 'Harman Connected Services — Casablanca',
    period: 'Jun 2019 – Jan 2021',
    project: 'Maincare Solutions — Health Management Apps (Vivoptime, Linxap, IdeoCM)',
    type: 'dev',
    description: [
      'Delivered features within Scrum cycles; participated in estimation, planning, and retrospectives — building the developer-side perspective that informs my Scrum Master practice today.',
    ],
    tools: ['Spring Boot', 'Java EE', 'Node.js', 'TypeScript', 'Angular', 'iOS/Swift 5', 'SQL', 'GitLab CI', 'Jenkins'],
  },
  {
    id: 6,
    role: 'Software Engineer',
    company: 'Harman Connected Services — Casablanca',
    period: 'Sep 2017 – Jun 2019',
    project: 'Symphony Retail AI — ERP G.O.L.D V5/V6 (Disney, Carrefour, Casino, Fnac)',
    type: 'dev',
    description: [
      'Member of a Scrum team delivering ERP capabilities to enterprise retail clients; ensured code quality via unit and integration tests.',
    ],
    tools: ['Java/JEE (Spring)', 'Oracle 11g', 'JavaScript (ES6)', 'REST APIs', 'PL/SQL', 'SonarQube', 'Jira'],
  },
]

const typeConfig = {
  agile:  { color: 'var(--accent-primary)',   icon: <FaBriefcase size={11} /> },
  devops: { color: 'var(--accent-secondary)', icon: <FaCode size={11} /> },
  dev:    { color: 'var(--accent-pink)',       icon: <FaCode size={11} /> },
}

const ExperienceCard = ({ exp, index }) => {
  const ref = useFadeIn(0.1)
  const [open, setOpen] = useState(index === 0)
  const cfg = typeConfig[exp.type]

  return (
    <div ref={ref} className="fade-in tl-item">
      {/* Timeline dot */}
      <div className="tl-dot" style={{ '--dc': cfg.color }}>
        <span className="dot-icon" style={{ color: cfg.color }}>{cfg.icon}</span>
      </div>

      {/* Card — keep motion for hover border effect */}
      <motion.div
        className={`exp-card ${open ? 'open' : ''}`}
        style={{ '--cc': cfg.color }}
        whileHover={{ borderColor: cfg.color + '55' }}
      >
        <button className="card-header" onClick={() => setOpen(!open)} aria-expanded={open}>
          <div className="card-meta">
            <span className="exp-period">{exp.period}</span>
            <span className="exp-type-tag" style={{ color: cfg.color, borderColor: cfg.color + '40', background: cfg.color + '12' }}>
              {exp.type === 'agile' ? 'Agile' : exp.type === 'devops' ? 'DevOps' : 'Engineering'}
            </span>
          </div>
          <div className="card-title-row">
            <div>
              <h3 className="exp-role">{exp.role}</h3>
              <h4 className="exp-company">{exp.company}</h4>
            </div>
            <motion.span
              className="chevron"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <FaChevronDown size={12} />
            </motion.span>
          </div>
          <p className="exp-project">⬡ {exp.project}</p>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className="card-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <ul className="exp-desc">
                {exp.description.map((d, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {d}
                  </motion.li>
                ))}
              </ul>
              <div className="exp-tools">
                {exp.tools.map(t => (
                  <span key={t} className="tool-tag">{t}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

const Experience = () => {
  const headerRef = useFadeIn()

  return (
    <section id="experience" className="section exp-section">
      <div className="container">
        <div ref={headerRef} className="fade-in section-header">
          <p className="section-label">Career</p>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            7+ years across Agile coaching, DevOps engineering, and software development.
          </p>
        </div>

        <div className="timeline">
          <div className="tl-line" />
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .exp-section { background: var(--bg-primary); }
        .timeline {
          position: relative;
          max-width: 760px;
          margin: 0 auto;
        }
        .tl-line {
          position: absolute;
          left: 18px;
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(45,212,191,0.25) 10%,
            rgba(129,140,248,0.2) 60%,
            rgba(244,114,182,0.15) 90%,
            transparent 100%
          );
        }
        .tl-item {
          display: grid;
          grid-template-columns: 38px 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .tl-dot {
          width: 38px; height: 38px;
          background: rgba(5,8,22,0.95);
          border: 1px solid var(--dc, var(--accent-primary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 12px color-mix(in srgb, var(--dc) 30%, transparent);
          z-index: 1;
        }
        .dot-icon { display: flex; }
        .exp-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: border-color var(--transition);
        }
        .exp-card.open { border-color: rgba(255,255,255,0.1); }
        .card-header {
          width: 100%;
          background: none;
          border: none;
          padding: 22px 24px;
          text-align: left;
          cursor: pointer;
          color: var(--text-primary);
        }
        .card-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .exp-period {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
          letter-spacing: 0.3px;
        }
        .exp-type-tag {
          padding: 2px 10px;
          border: 1px solid;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .card-title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 8px;
        }
        .exp-role {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 3px;
        }
        .exp-company {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .chevron {
          color: var(--text-muted);
          flex-shrink: 0;
          margin-top: 4px;
          display: flex;
        }
        .exp-project {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-style: italic;
        }
        .card-body {
          overflow: hidden;
          border-top: 1px solid var(--glass-border);
          padding: 20px 24px;
        }
        .exp-desc {
          margin-bottom: 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .exp-desc li {
          font-size: 0.9rem;
          color: var(--text-secondary);
          padding-left: 16px;
          position: relative;
          line-height: 1.6;
        }
        .exp-desc li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--cc, var(--accent-primary));
          font-size: 0.7rem;
          top: 2px;
        }
        .exp-tools {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tool-tag {
          padding: 4px 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: border-color var(--transition), color var(--transition);
        }
        .tool-tag:hover {
          border-color: var(--cc, var(--accent-primary));
          color: var(--text-primary);
        }
        @media (max-width: 600px) {
          .tl-item { grid-template-columns: 30px 1fr; gap: 14px; }
          .tl-dot { width: 30px; height: 30px; }
          .tl-line { left: 14px; }
        }
      `}</style>
    </section>
  )
}

export default Experience
