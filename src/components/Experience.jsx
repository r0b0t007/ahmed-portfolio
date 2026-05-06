import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown, FaBriefcase, FaCode } from 'react-icons/fa'

const experiences = [
  {
    id: 1,
    role: 'Scrum Master',
    company: 'Bell.ca Morocco',
    period: 'Jun 2024 – Present',
    project: 'Service Assurance',
    type: 'agile',
    description: [
      'Facilitated sprint reviews, planning sessions, and daily stand-ups to foster team engagement.',
      'Applied Scrum methodology to optimize cycle times and meet target objectives.',
      'Coached teams in Agile practices, delivering training to cultivate a positive Scrum mindset.',
      'Collaborated with product owners and cross-functional teams to drive project progress.',
    ],
    tools: ['Scaled Agile', 'Scrum', 'Jira', 'Confluence', 'Miro'],
  },
  {
    id: 2,
    role: 'Scrum Master',
    company: 'NTT DATA Tetouan',
    period: 'Oct 2023 – Jun 2024',
    project: 'Bayer CS Regulatory',
    type: 'agile',
    description: [
      'Facilitated sprint reviews and planning meetings to promote full team engagement.',
      'Applied Scrum methodology to shorten cycle time and achieve delivery goals.',
      'Removed impediments and cleared dependencies to ensure smooth workflow.',
      'Monitored and tracked project progress to support timely completion.',
    ],
    tools: ['Scrum', 'Azure DevOps', 'OneNote'],
  },
  {
    id: 3,
    role: 'Scrum Master',
    company: 'NTT DATA Morocco',
    period: 'Jan 2023 – Dec 2023',
    project: 'BMW Tele-Services',
    type: 'agile',
    description: [
      'Facilitated sprint reviews, planning, and daily meetings.',
      'Applied Scrum methodology to shorten cycle time and achieve target margins.',
      'Worked across teams outside of engineering to find solutions to issues.',
      'Communicated project updates to stakeholders at all levels.',
    ],
    tools: ['Scrum', 'Jira', 'Confluence', 'Miro'],
  },
  {
    id: 4,
    role: 'Scrum Master',
    company: 'NTT DATA Tetouan',
    period: 'Jun 2021 – Jun 2023',
    project: 'On-Demand Mobility (BMW)',
    type: 'agile',
    description: [
      'Facilitated sprint reviews, planning, and daily meetings.',
      'Coached teams in Agile practices and provided training.',
      'Collaborated with product owners and technologists to define solutions.',
    ],
    tools: ['Scrum', 'Jira', 'Confluence', 'Miro'],
  },
  {
    id: 5,
    role: 'DevOps Engineer',
    company: 'NTT DATA Tetouan',
    period: 'Jan 2021 – Jun 2021',
    project: 'On-Demand Mobility Carsharing',
    type: 'devops',
    description: [
      'Development and maintenance of ODM Carsharing platform.',
      'Implemented CI/CD pipelines and monitored system performance.',
    ],
    tools: ['Java', 'Docker', 'Kubernetes', 'Kibana', 'GitLab CI/CD', 'AWS'],
  },
  {
    id: 6,
    role: 'Software Engineer',
    company: 'Harman Connected Services',
    period: 'Jun 2019 – Jan 2021',
    project: 'Health Management Apps',
    type: 'dev',
    description: [
      'Developed new modules for Ideo Mobility Factory.',
      'Performed unit and integration testing and wrote documentation.',
      'Participated in Scrum workshops and maintained features.',
    ],
    tools: ['Spring Boot', 'Swift 5', 'iOS', 'Angular', 'Jenkins'],
  },
  {
    id: 7,
    role: 'Software Engineer',
    company: 'Harman Connected Services',
    period: 'Sep 2017 – Jun 2019',
    project: 'ERP G.O.L.D V5/V6',
    type: 'dev',
    description: [
      'Member of Scrum team for development, testing, and validation.',
      'Ensured code quality via unit tests and integration tests.',
      'Fixed bugs and anomalies in the product.',
    ],
    tools: ['Java/JEE', 'Oracle 11g', 'JavaScript', 'REST', 'Jira'],
  },
]

const typeConfig = {
  agile:  { color: 'var(--accent-primary)',   icon: <FaBriefcase size={11} /> },
  devops: { color: 'var(--accent-secondary)', icon: <FaCode size={11} /> },
  dev:    { color: 'var(--accent-pink)',       icon: <FaCode size={11} /> },
}

const ExperienceCard = ({ exp, index }) => {
  const [open, setOpen] = useState(index === 0)
  const cfg = typeConfig[exp.type]

  return (
    <motion.div
      className="tl-item"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
    >
      {/* Timeline dot */}
      <div className="tl-dot" style={{ '--dc': cfg.color }}>
        <span className="dot-icon" style={{ color: cfg.color }}>{cfg.icon}</span>
      </div>

      {/* Card */}
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
    </motion.div>
  )
}

const Experience = () => (
  <section id="experience" className="section exp-section">
    <div className="container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <p className="section-label">Career</p>
        <h2 className="section-title">Work Experience</h2>
        <p className="section-subtitle">
          7+ years across Agile coaching, DevOps engineering, and software development.
        </p>
      </motion.div>

      <div className="timeline">
        <div className="tl-line" />
        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </div>

    <style>{`
      .exp-section {
        background: var(--bg-primary);
      }
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
      .exp-card.open {
        border-color: rgba(255,255,255,0.1);
      }
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

export default Experience
