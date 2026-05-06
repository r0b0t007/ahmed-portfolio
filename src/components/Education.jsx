import { motion } from 'framer-motion'

const education = [
  {
    degree: 'State Engineer — Computer Engineering',
    school: 'Mohammed VI International Academy of Civil Aviation',
    location: 'Casablanca, Morocco',
  },
  {
    degree: 'Preparatory Classes for Higher Education',
    school: 'Lycée Technique Settat',
    location: 'Settat, Morocco',
  },
  {
    degree: 'High School Diploma — Science & Electrical Technologies',
    school: 'Lycée Technique Tetouan',
    location: 'Tetouan, Morocco',
  },
]

const certifications = [
  {
    name: 'Professional Scrum Master I (PSM I)',
    issuer: 'Scrum.org',
    color: 'var(--accent-primary)',
  },
  {
    name: 'SAFe Agilist',
    issuer: 'Scaled Agile, Inc.',
    color: 'var(--accent-secondary)',
  },
  {
    name: 'Certified SAFe® 6 Scrum Master (SSM)',
    issuer: 'Scaled Agile, Inc.',
    color: 'var(--accent-pink)',
  },
]

const languages = [
  { lang: 'Arabic',  level: 'Native',  pct: 100, color: 'var(--accent-primary)' },
  { lang: 'English', level: 'C2 / C1', pct: 90,  color: 'var(--accent-secondary)' },
  { lang: 'French',  level: 'C1 / B2', pct: 80,  color: 'var(--accent-pink)' },
]

const cardIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] } },
})

const Education = () => (
  <section id="education" className="section edu-section">
    <div className="container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <p className="section-label">Background</p>
        <h2 className="section-title">Education &amp; Certifications</h2>
      </motion.div>

      <div className="edu-grid">
        {/* Education column */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={cardIn(0)}
        >
          <h3 className="col-heading">
            <span className="col-icon">🎓</span>
            Education
          </h3>
          <div className="edu-list">
            {education.map((e, i) => (
              <motion.div
                key={e.degree}
                className="edu-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 6 }}
              >
                <h4 className="edu-degree">{e.degree}</h4>
                <p className="edu-school">{e.school}</p>
                <p className="edu-location">📍 {e.location}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right column: Certifications + Languages */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={cardIn(0.12)}
          >
            <h3 className="col-heading">
              <span className="col-icon">🏅</span>
              Certifications
            </h3>
            <div className="cert-list">
              {certifications.map((c, i) => (
                <motion.div
                  key={c.name}
                  className="cert-card"
                  style={{ '--cc': c.color }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: -6 }}
                >
                  <div className="cert-dot" />
                  <div>
                    <p className="cert-name">{c.name}</p>
                    <p className="cert-issuer">{c.issuer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={cardIn(0.24)}
            style={{ marginTop: '40px' }}
          >
            <h3 className="col-heading">
              <span className="col-icon">🌍</span>
              Languages
            </h3>
            <div className="lang-card">
              {languages.map((l, i) => (
                <div key={l.lang} className="lang-row">
                  <div className="lang-info">
                    <span className="lang-name">{l.lang}</span>
                    <span className="lang-level" style={{ color: l.color }}>{l.level}</span>
                  </div>
                  <div className="lang-track">
                    <motion.div
                      className="lang-fill"
                      style={{ background: l.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>

    <style>{`
      .edu-section {
        background: var(--bg-primary);
      }
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
      /* Education cards */
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
      .edu-location {
        font-size: 0.78rem;
        color: var(--text-muted);
      }
      /* Cert cards */
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
      .cert-issuer {
        font-size: 0.78rem;
        color: var(--text-secondary);
      }
      /* Language */
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
      .lang-fill {
        height: 100%;
        border-radius: 2px;
        opacity: 0.85;
      }
      @media (max-width: 768px) {
        .edu-grid { grid-template-columns: 1fr; gap: 40px; }
      }
    `}</style>
  </section>
)

export default Education
