import { motion } from 'framer-motion'
import { FaLinkedin, FaEnvelope, FaGithub, FaCalendarAlt } from 'react-icons/fa'
import { useFadeIn } from '../hooks/useFadeIn'

const socials = [
  { icon: <FaLinkedin />,    href: 'https://linkedin.com/in/ahmedchioua', label: 'LinkedIn' },
  { icon: <FaEnvelope />,    href: 'mailto:ahmedchioua@outlook.com',      label: 'Email' },
  { icon: <FaGithub />,      href: 'https://github.com/r0b0t007',          label: 'GitHub' },
  { icon: <FaCalendarAlt />, href: '#calendly',                            label: 'Book a Call' },
]

const Footer = () => {
  const topRef = useFadeIn(0.1)

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div ref={topRef} className="fade-in footer-top">
          <a href="#hero" className="footer-logo">
            Ahmed<span>.</span>
          </a>
          <p className="footer-tagline">Scrum Master &amp; Agile Expert — Building better teams.</p>
          <div className="footer-socials">
            {socials.map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="social-btn"
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.94 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Ahmed Chioua. All rights reserved.</p>
          <p className="footer-cta">
            <a href="#calendly">Book a call ↗</a>
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--glass-border);
          padding: 60px 0 28px;
        }
        .footer-inner { display: flex; flex-direction: column; }
        .footer-top {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          padding-bottom: 40px;
        }
        .footer-logo { font-size: 1.8rem; font-weight: 900; letter-spacing: -1px; }
        .footer-logo span { color: var(--accent-primary); }
        .footer-tagline { font-size: 0.9rem; color: var(--text-muted); max-width: 320px; }
        .footer-socials { display: flex; gap: 12px; margin-top: 6px; }
        .social-btn {
          width: 42px; height: 42px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          font-size: 1rem;
          transition: color var(--transition), border-color var(--transition), background var(--transition);
        }
        .social-btn:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
          background: rgba(45,212,191,0.07);
        }
        .footer-divider { height: 1px; background: var(--glass-border); margin-bottom: 24px; }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .footer-cta a { color: var(--accent-primary); font-weight: 600; transition: opacity var(--transition); }
        .footer-cta a:hover { opacity: 0.75; }
        @media (max-width: 540px) {
          .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>
    </footer>
  )
}

export default Footer
