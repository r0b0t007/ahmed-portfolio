import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useFadeIn } from '../hooks/useFadeIn'

const stats = [
  { value: 9, suffix: '+', label: 'Years in Tech',         color: 'var(--accent-primary)' },
  { value: 5, suffix: '+', label: 'Years as Scrum Master', color: 'var(--accent-secondary)' },
  { value: 3, suffix: '',  label: 'Certifications',         color: 'var(--accent-pink)' },
  { value: 3, suffix: '',  label: 'Languages',              color: 'var(--accent-green)' },
]

const AnimatedNumber = ({ value, suffix }) => {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const end = value
    const duration = 1400
    const step = (duration / end)
    const timer = setInterval(() => {
      start += 1
      setDisplay(start)
      if (start >= end) clearInterval(timer)
    }, step)
    return () => clearInterval(timer)
  }, [inView, value])

  return <span ref={ref}>{display}{suffix}</span>
}

const StatCard = ({ s }) => {
  const ref = useFadeIn(0.1)
  return (
    <motion.div
      ref={ref}
      className="fade-in bento-card bento-stat"
      style={{ '--sc': s.color }}
      whileHover={{ y: -6 }}
    >
      <div className="stat-value">
        <AnimatedNumber value={s.value} suffix={s.suffix} />
      </div>
      <div className="stat-label">{s.label}</div>
      <div className="stat-glow" />
    </motion.div>
  )
}

const Summary = () => {
  const headerRef = useFadeIn()
  const bioRef    = useFadeIn(0.1)
  const availRef  = useFadeIn(0.1)
  const locRef    = useFadeIn(0.1)

  return (
    <section id="summary" className="section summary-section">
      <div className="container">
        <div ref={headerRef} className="fade-in section-header">
          <p className="section-label">About Me</p>
          <h2 className="section-title">Servant Leader.<br />Agile Champion.</h2>
          <p className="section-subtitle">
            Bridging teams and strategy to deliver outcomes that matter.
          </p>
        </div>

        <div className="bento">
          {/* Bio — spans 2 cols */}
          <div ref={bioRef} className="fade-in bento-card bento-bio">
            <div className="bio-tag">Bio</div>
            <p>
              Certified <strong>Scrum Master</strong> with <strong>5+ years of dedicated SM experience</strong>{' '}
              and a 9-year background in software engineering. Proven track record facilitating agile
              delivery for distributed product engineering teams across <strong>telecom, automotive,
              life sciences, and retail</strong>.
            </p>
            <p>
              Servant leader who protects the process, removes blockers, and coaches teams to mature
              their practices — balancing process adherence with pragmatic, outcome-focused delivery.
              Deep working knowledge of <strong>Scrum, Kanban, and SAFe</strong>; fluent in Jira,
              Confluence, and Azure DevOps; comfortable partnering with product managers to keep
              backlogs healthy and prioritized.
            </p>
          </div>

          {/* Stats */}
          {stats.map(s => <StatCard key={s.label} s={s} />)}

          {/* Availability card */}
          <div ref={availRef} className="fade-in bento-card bento-avail">
            <span className="avail-dot" />
            <div>
              <p className="avail-title">Available for Hire</p>
              <p className="avail-sub">Open to Scrum Master &amp; Agile Coach roles globally</p>
            </div>
          </div>

          {/* Location card */}
          <div ref={locRef} className="fade-in bento-card bento-loc">
            <div className="loc-flag">🇲🇦</div>
            <p className="loc-name">Morocco</p>
            <p className="loc-sub">Tetouan / Remote</p>
          </div>
        </div>
      </div>

      <style>{`
        .summary-section {
          background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
        }
        .bento {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: auto auto;
          gap: 16px;
        }
        .bento-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 28px;
          transition: border-color var(--transition), background var(--transition);
          position: relative;
          overflow: hidden;
        }
        .bento-card:hover {
          border-color: rgba(255,255,255,0.12);
          background: var(--bg-card-hover);
        }
        .bento-bio { grid-column: span 2; }
        .bio-tag {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(45,212,191,0.1);
          border: 1px solid rgba(45,212,191,0.2);
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--accent-primary);
          margin-bottom: 20px;
        }
        .bento-bio p {
          font-size: 0.97rem;
          color: var(--text-secondary);
          line-height: 1.85;
          margin-bottom: 14px;
        }
        .bento-bio p:last-child { margin-bottom: 0; }
        .bento-bio strong { color: var(--text-primary); font-weight: 600; }
        .bento-stat {
          grid-column: span 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          cursor: default;
          min-height: 130px;
        }
        .stat-value {
          font-size: 2.6rem;
          font-weight: 900;
          color: var(--sc, var(--accent-primary));
          line-height: 1;
          margin-bottom: 10px;
          letter-spacing: -1px;
        }
        .stat-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          letter-spacing: 0.5px;
        }
        .stat-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(45,212,191,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .bento-avail {
          grid-column: span 2;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .avail-dot {
          width: 12px; height: 12px;
          background: var(--accent-green);
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 12px var(--accent-green);
          animation: pulseDot 2.5s ease-in-out infinite;
        }
        @keyframes pulseDot {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.55; transform:scale(0.8); }
        }
        .avail-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .avail-sub { font-size: 0.83rem; color: var(--text-secondary); }
        .bento-loc {
          grid-column: span 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
        }
        .loc-flag { font-size: 2rem; margin-bottom: 4px; }
        .loc-name { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); }
        .loc-sub { font-size: 0.83rem; color: var(--text-secondary); }

        @media (max-width: 900px) {
          .bento { grid-template-columns: repeat(2, 1fr); }
          .bento-bio, .bento-avail, .bento-loc { grid-column: span 2; }
        }
        @media (max-width: 540px) {
          .bento { grid-template-columns: 1fr; }
          .bento-bio, .bento-stat, .bento-avail, .bento-loc { grid-column: span 1; }
        }
      `}</style>
    </section>
  )
}

export default Summary
