import { useEffect, useRef, useState } from 'react'
import { FaCalendarAlt, FaClock, FaVideo } from 'react-icons/fa'
import { useFadeIn } from '../hooks/useFadeIn'

const CALENDLY_URL =
  'https://calendly.com/ahmedchioua/30min?hide_gdpr_banner=1&background_color=050816&text_color=e8eaf6&primary_color=2DD4BF'

const perks = [
  { icon: <FaClock />,       text: '30-minute focused session' },
  { icon: <FaVideo />,       text: 'Google Meet or Teams' },
  { icon: <FaCalendarAlt />, text: 'Flexible scheduling, any timezone' },
]

const Calendly = () => {
  const widgetRef   = useRef(null)
  const [widgetLoaded, setWidgetLoaded] = useState(false)
  const headerRef   = useFadeIn()
  const perksRef    = useFadeIn(0.1)
  const widgetWrap  = useFadeIn(0.1)

  useEffect(() => {
    if (!widgetLoaded) return

    const initWidget = () => {
      if (window.Calendly && widgetRef.current) {
        window.Calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: widgetRef.current,
        })
      }
    }

    if (!document.querySelector('#calendly-css')) {
      const link = document.createElement('link')
      link.id = 'calendly-css'
      link.rel = 'stylesheet'
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      document.head.appendChild(link)
    }

    if (!document.querySelector('#calendly-js')) {
      const script = document.createElement('script')
      script.id = 'calendly-js'
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.onload = initWidget
      document.body.appendChild(script)
    } else {
      initWidget()
    }
  }, [widgetLoaded])

  return (
    <section id="calendly" className="section cal-section">
      {/* Ambient glow */}
      <div className="cal-glow" />

      <div className="container">
        <div ref={headerRef} className="fade-in section-header">
          <p className="section-label">Let's Talk</p>
          <h2 className="section-title">Book a Discovery Call</h2>
          <p className="section-subtitle">
            Whether you're exploring an Agile transformation, looking for a Scrum Master,
            or just want to connect — pick a time that works for you.
          </p>
        </div>

        {/* Perks row */}
        <div ref={perksRef} className="fade-in cal-perks">
          {perks.map((p, i) => (
            <div key={i} className="perk">
              <span className="perk-icon">{p.icon}</span>
              <span>{p.text}</span>
            </div>
          ))}
        </div>

        {/* Inline Calendly widget — loads on click to avoid third-party cookies on page load */}
        <div ref={widgetWrap} className="fade-in cal-widget-wrap">
          {widgetLoaded ? (
            <div
              ref={widgetRef}
              className="calendly-inline-widget"
              data-url={CALENDLY_URL}
              style={{ minWidth: '320px', height: '700px' }}
            />
          ) : (
            <div className="cal-trigger" onClick={() => setWidgetLoaded(true)}>
              <span className="cal-trigger-icon"><FaCalendarAlt /></span>
              <span className="cal-trigger-label">Load booking calendar</span>
              <p className="cal-trigger-sub">Calendly loads only when you click — no third-party tracking until then</p>
            </div>
          )}
        </div>
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
        .cal-trigger {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 220px;
          cursor: pointer;
          padding: 48px 24px;
          transition: background var(--transition);
        }
        .cal-trigger:hover {
          background: var(--bg-card-hover);
        }
        .cal-trigger-icon {
          font-size: 2.2rem;
          color: var(--accent-primary);
          display: flex;
        }
        .cal-trigger-label {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .cal-trigger-sub {
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-align: center;
          max-width: 360px;
          line-height: 1.6;
        }
      `}</style>
    </section>
  )
}

export default Calendly
