import { motion } from 'framer-motion'

const Education = () => {
  return (
    <section id="education" className="section education-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Education & Certifications</h2>
          <div className="section-line"></div>
        </motion.div>

        <div className="education-grid">
          {/* Education Column */}
          <motion.div
            className="edu-column"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="column-title">Education</h3>
            <div className="edu-card">
              <h4>State Engineer Degree in Computer Engineering</h4>
              <p className="institution">Mohammed VI International Academy of Civil Aviation</p>
              <p className="location">Casablanca, Morocco</p>
            </div>
            <div className="edu-card">
              <h4>Preparatory Classes for Higher Education</h4>
              <p className="institution">Lycée Technique Settat</p>
              <p className="location">Settat, Morocco</p>
            </div>
            <div className="edu-card">
              <h4>High School Diploma in Science & Electrical Technologies</h4>
              <p className="institution">Lycée Technique Tetouan</p>
              <p className="location">Tetouan, Morocco</p>
            </div>
          </motion.div>

          {/* Certifications & Languages Column */}
          <motion.div
            className="edu-column"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="column-title">Certifications</h3>
            <div className="cert-card">
              <h4>Professional Scrum Master I (PSM I)</h4>
              <p className="issuer">Scrum.org</p>
            </div>
            <div className="cert-card">
              <h4>SAFe Agilist</h4>
              <p className="issuer">Scaled Agile, Inc.</p>
            </div>
            <div className="cert-card">
              <h4>Certified SAFe® 6 Scrum Master</h4>
              <p className="issuer">Scaled Agile, Inc.</p>
            </div>

            <h3 className="column-title" style={{ marginTop: '40px' }}>Languages</h3>
            <div className="lang-list">
              <div className="lang-item">
                <span>Arabic</span>
                <span className="level">Native</span>
              </div>
              <div className="lang-item">
                <span>English</span>
                <span className="level">C2 / C1</span>
              </div>
              <div className="lang-item">
                <span>French</span>
                <span className="level">C1 / B2</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .education-section {
          background: var(--bg-primary);
        }

        .education-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
        }

        .column-title {
          font-size: 1.5rem;
          margin-bottom: 25px;
          color: var(--accent-primary);
        }

        .edu-card, .cert-card {
          background: var(--bg-card);
          padding: 25px;
          border-radius: 10px;
          margin-bottom: 20px;
          border-left: 4px solid var(--accent-secondary);
          transition: transform 0.3s ease;
        }

        .edu-card:hover, .cert-card:hover {
          transform: translateX(10px);
        }

        .edu-card h4, .cert-card h4 {
          font-size: 1.1rem;
          margin-bottom: 5px;
        }

        .institution, .issuer {
          color: var(--text-secondary);
          font-weight: 600;
        }

        .location {
          color: #666;
          font-size: 0.9rem;
          font-style: italic;
        }

        .lang-list {
          background: var(--bg-card);
          padding: 25px;
          border-radius: 10px;
          border: 1px solid #222;
        }

        .lang-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #333;
        }

        .lang-item:last-child {
          border-bottom: none;
        }

        .level {
          color: var(--accent-primary);
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .education-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

export default Education
