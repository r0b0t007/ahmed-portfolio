import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaClock, FaVideo } from 'react-icons/fa'

// Update this URL to your real Calendly link
const CALENDLY_URL =
  'https://calendly.com/ahmedchioua/30min?hide_gdpr_banner=1&background_color=050816&text_color=e8eaf6&primary_color=2DD4BF'

const perks = [
  { icon: <FaClock />,      text: '30-minute focused session' },
  { icon: <FaVideo />,      text: 'Google Meet or Teams' },
  { icon: <FaCalendarAlt />, text: 'Flexible scheduling, any timezone' },
]

const Calendly = () => {
  const widgetRef = useRef(null)

  useEffect(() => {
    // Load Calendly CSS
    if (!document.querySelector('#calendly-css')) {
      const link = document.createElement('link')
      link.id = 'calendly-css'
      link.rel = 'stylesheet'
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      document.head.appendChild(link)
    }

    // Load Calendly JS and init inline widget
    if (!document.querySelector('#calendly-js')) {
      const script = document.createElement('script')
      script.id = 'calendly-js'
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.onload = () => {
        if (window.Calendly && widgetRef.current) {
          window.Calendly.initInlineWidget({
            url: CALENDLY_URL,
            parentElement: widgetRef.current,
          })
        }
      }
      document.body.appendChild(script)
    } else if (window.Calendly && widgetRef.current) {
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: widgetRef.current,
      })
    }
  }, [])

  return (
    <section id="calendly" className="section cal-section">
      {/* Ambient glow */}
      <div className="cal-glow" />

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="section-label">Let's Talk</p>
          <h2 className="section-title">Book a Discovery Call</h2>
          <p className="section-subtitle">
            Whether you're exploring an Agile transformation, looking for a Scrum Master,
            or just want to connect — pick a time that works for you.
          </p>
        </motion.div>

        {/* Perks row */}
        <motion.div
          className="cal-perks"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {perks.map((p, i) => (
            <motion.div
              key={i}
              className="perk"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              <span className="perk-icon">{p.icon}</span>
              <span>{p.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Inline Calendly widget */}
        <motion.div
          className="cal-widget-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.25 }}
        >
          <div
            ref={widgetRef}
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            style={{ minWidth: '320px', height: '700px' }}
          />
        </motion.div>
      </div>

      <style>{`
        .cal-section {
          background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
          position: relative;
          overflow: hidden;
        }
        .cal-glow {
          position: absolute;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(45,212,191,0.07) 0%, transparent 65%);
          top: 0; left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          filter: blur(60px);
        }
        .cal-perks {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 52px;
          flex-wrap: wrap;
        }
        .perk {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .perk-icon {
          color: var(--accent-primary);
          display: flex;
          align-items: center;
        }
        .cal-widget-wrap {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }
        .calendly-inline-widget {
          border-radius: var(--radius-xl);
        }
      `}</style>
    </section>
  )
}

export default Calendly
