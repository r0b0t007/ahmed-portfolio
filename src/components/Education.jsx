import { motion } from 'framer-motion'
import { useFadeIn } from '../hooks/useFadeIn'

const education = [
  {
    degree: 'State Engineer Degree in Computer Engineering',
    school: 'Mohammed VI International Academy of Civil Aviation',
    location: 'Casablanca, Morocco',
  },
  {
    degree: 'Preparatory Classes for Higher Education Entrance Examinations',
    school: 'Lycée Technique Settat',
    location: 'Settat, Morocco',
  },
]

const certifications = [
  { name: 'Professional Scrum Master I (PSM I)', issuer: 'Scrum.org',          color: 'var(--accent-primary)' },
  { name: 'SAFe® 6 Scrum Master',               issuer: 'Scaled Agile, Inc.',  color: 'var(--accent-secondary)' },
  { name: 'SAFe® 6 Agilist',                    issuer: 'Scaled Agile, Inc.',  color: 'var(--accent-pink)' },
]

const languages = [
  { lang: 'Arabic',  level: 'Native',                  pct: 100, color: 'var(--accent-primary)' },
  { lang: 'English', level: 'C2 written / C1 spoken',  pct: 92,  color: 'var(--accent-secondary)' },
  { lang: 'French',  level: 'C1 written / B2 spoken',  pct: 78,  color: 'var(--accent-pink)' },
]

const leadership = [
  {
    role: 'Product Owner — Internal ERP Implementation',
    location: 'Tétouan, Morocco',
    period: 'Dec 2023 – Jun 2024',
    desc: 'Led a team of developers; owned roadmap and milestones; provided Scrum and Kanban training to the team.',
  },
  {
    role: 'Mentor — Company Mentorship Program',
    location: 'NTT DATA',
    period: 'Feb 2024 – Jun 2024',
    desc: 'Mentored junior engineers on agile practices and career development; coaching on leadership and communication.',
  },
]

const EduCardItem = ({ e }) => {
  const ref = useFadeIn(0.1)
  return (
    <motion.div ref={ref} className="fade-in edu-card" whileHover={{ x: 6 }}>
      <h4 className="edu-degree">{e.degree}</h4>
      <p className="edu-school">{e.school}</p>
      <p className="edu-location">📍 {e.location}</p>
    </motion.div>
  )
}

const CertCardItem = ({ c }) => {
  const ref = useFadeIn(0.1)
  return (
    <motion.div ref={ref} className="fade-in cert-card" style={{ '--cc': c.color }} whileHover={{ x: -6 }}>
      <div className="cert-dot" />
      <div>
        <p className="cert-name">{c.name}</p>
        <p className="cert-issuer">{c.issuer}</p>
      </div>
    </motion.div>
  )
}

const LangBarItem = ({ l }) => {
  const barRef = useFadeIn(0.1)
  return (
    <div className="lang-row">
      <div className="lang-info">
        <span className="lang-name">{l.lang}</span>
        <span className="lang-level" style={{ color: l.color }}>{l.level}</span>
      </div>
      <div className="lang-track">
        <div
          ref={barRef}
          className="lang-fill fade-fill-var"
          style={{ '--target': `${l.pct}%`, background: l.color }}
        />
      </div>
    </div>
  )
}

const LeadCardItem = ({ l }) => {
  const ref = useFadeIn(0.1)
  return (
    <motion.div ref={ref} className="fade-in lead-card" whileHover={{ y: -4 }}>
      <div className="lead-head">
        <p className="lead-role">{l.role}</p>
        <span className="lead-period">{l.period}</span>
      </div>
      <p className="lead-location">{l.location}</p>
      <p className="lead-desc">{l.desc}</p>
    </motion.div>
  )
}

const Education = () => {
  const headerRef     = useFadeIn()
  const eduColRef     = useFadeIn(0.1)
  const certColRef    = useFadeIn(0.1)
  const langColRef    = useFadeIn(0.1)
  const leaderRef     = useFadeIn(0.1)

  return (
    <section id="education" className="section edu-section">
      <div className="container">
        <div ref={headerRef} className="fade-in section-header">
          <p className="section-label">Background</p>
          <h2 className="section-title">Education &amp; Certifications</h2>
        </div>

        <div className="edu-grid">
          {/* Education column */}
          <div ref={eduColRef} className="fade-in">
            <h3 className="col-heading">
              <span className="col-icon">🎓</span>
              Education
            </h3>
            <div className="edu-list">
              {education.map(e => <EduCardItem key={e.degree} e={e} />)}
            </div>
          </div>

          {/* Right column: Certifications + Languages */}
          <div>
            <div ref={certColRef} className="fade-in">
              <h3 className="col-heading">
                <span className="col-icon">🏅</span>
                Certifications
              </h3>
              <div className="cert-list">
                {certifications.map(c => <CertCardItem key={c.name} c={c} />)}
              </div>
            </div>

            <div ref={langColRef} className="fade-in" style={{ marginTop: '40px' }}>
              <h3 className="col-heading">
                <span className="col-icon">🌍</span>
                Languages
              </h3>
              <div className="lang-card">
                {languages.map(l => <LangBarItem key={l.lang} l={l} />)}
              </div>
            </div>
          </div>
        </div>

        {/* Leadership & Volunteering */}
        <div ref={leaderRef} className="fade-in leadership-section">
          <h3 className="col-heading" style={{ marginBottom: '24px' }}>
            <span className="col-icon">🌱</span>
            Leadership &amp; Volunteering
          </h3>
          <div className="leadership-grid">
            {leadership.map(l => <LeadCardItem key={l.role} l={l} />)}
          </div>
        </div>
      </div>

      <style>{`
        .edu-section { background: var(--bg-primary); }
        .edu-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }
        .col-heading {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 24px;
        }
        .col-icon { font-size: 1.2rem; }
        .edu-list { display: flex; flex-direction: column; gap: 14px; }
        .edu-card {
          padding: 20px 22px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-left: 3px solid var(--accent-secondary);
          border-radius: var(--radius-md);
          transition: border-left-color var(--transition), transform var(--transition), background var(--transition);
          cursor: default;
        }
        .edu-card:hover {
          border-left-color: var(--accent-primary);
          background: var(--bg-card-hover);
        }
        .edu-degree {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 5px;
          line-height: 1.4;
        }
        .edu-school {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 600;
          margin-bottom: 4px;
        }
        .edu-location { font-size: 0.78rem; color: var(--text-muted); }
        .cert-list { display: flex; flex-direction: column; gap: 12px; }
        .cert-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 22px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          transition: transform var(--transition), border-color var(--transition), background var(--transition);
          cursor: default;
        }
        .cert-card:hover {
          border-color: var(--cc, var(--accent-primary));
          background: var(--bg-card-hover);
        }
        .cert-dot {
          width: 10px; height: 10px;
          background: var(--cc, var(--accent-primary));
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 8px var(--cc, var(--accent-primary));
        }
        .cert-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 3px;
        }
        .cert-issuer { font-size: 0.78rem; color: var(--text-secondary); }
        .lang-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .lang-row { display: flex; flex-direction: column; gap: 8px; }
        .lang-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .lang-name { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); }
        .lang-level { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.3px; }
        .lang-track {
          height: 4px;
          background: rgba(255,255,255,0.06);
          border-radius: 2px;
          overflow: hidden;
        }
        .lang-fill { height: 100%; border-radius: 2px; opacity: 0.85; }
        .leadership-section { margin-top: 60px; }
        .leadership-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .lead-card {
          padding: 22px 24px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-left: 3px solid var(--accent-green);
          border-radius: var(--radius-md);
          transition: border-left-color var(--transition), background var(--transition), transform var(--transition);
          cursor: default;
        }
        .lead-card:hover {
          background: var(--bg-card-hover);
          border-left-color: var(--accent-primary);
        }
        .lead-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 4px;
        }
        .lead-role { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); line-height: 1.4; }
        .lead-period { font-size: 0.72rem; font-weight: 600; color: var(--accent-primary); white-space: nowrap; flex-shrink: 0; }
        .lead-location { font-size: 0.78rem; color: var(--text-muted); margin-bottom: 10px; }
        .lead-desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.65; }
        @media (max-width: 768px) {
          .edu-grid { grid-template-columns: 1fr; gap: 40px; }
          .leadership-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

export default Education
