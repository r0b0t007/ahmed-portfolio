import { motion } from 'framer-motion'

const Summary = () => {
  return (
    <section id="summary" className="section summary-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">About Me</h2>
          <div className="section-line"></div>
        </motion.div>

        <div className="summary-content">
          <motion.div
            className="summary-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              Instrumental <strong>Scrum Master</strong> with a strong technical background and over <strong>9 years of experience</strong> driving Agile success in demanding IT environments.
            </p>
            <p>
              I combine deep Agile expertise with a scalable mindset to deliver high-impact results across complex projects and organizations. Diligent, forward-thinking, and highly adaptable, I thrive in dynamic environments—responding effectively to evolving company, customer, and project demands.
            </p>
            <p>
              As a dedicated servant leader, I empower teams by removing impediments, fostering collaboration, and promoting a culture of continuous improvement.
            </p>
          </motion.div>

          <motion.div
            className="summary-stats"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="stat-card">
              <h3>9+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-card">
              <h3>PSM I</h3>
              <p>Certified</p>
            </div>
            <div className="stat-card">
              <h3>SSM</h3>
              <p>Certified</p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .summary-section {
          background: var(--bg-secondary);
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        .section-line {
          width: 60px;
          height: 4px;
          background: var(--accent-primary);
          margin: 0 auto;
          border-radius: 2px;
        }

        .summary-content {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 50px;
          align-items: center;
        }

        .summary-text p {
          margin-bottom: 20px;
          font-size: 1.1rem;
          color: var(--text-secondary);
        }

        .summary-text strong {
          color: var(--text-primary);
        }

        .summary-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .stat-card {
          background: var(--bg-card);
          padding: 30px;
          border-radius: 15px;
          text-align: center;
          border: 1px solid #222;
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-primary);
        }

        .stat-card h3 {
          font-size: 2rem;
          color: var(--accent-primary);
          margin-bottom: 5px;
        }

        .stat-card p {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .stat-card:nth-child(1) {
          grid-column: span 2;
        }

        @media (max-width: 768px) {
          .summary-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

export default Summary
