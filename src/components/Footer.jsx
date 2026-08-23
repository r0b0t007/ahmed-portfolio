const CALENDLY = 'https://calendly.com/ahmedchioua/30min'

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ahmedchioua', path: 'M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z', fill: true },
  { label: 'Email', href: 'mailto:ahmedchioua@gmail.com', path: 'M2 4h20v16H2z M22 7l-10 5L2 7', fill: false },
  { label: 'GitHub', href: 'https://github.com/r0b0t007', path: 'M12 2A10 10 0 002 12a10 10 0 006.84 9.5c.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10 10 0 0012 2z', fill: true },
]

const Footer = () => (
  <footer className="ed-footer">
    <div className="ed-foot-top">
      <div>
        <div className="ed-foot-name">Ahmed Chioua</div>
        <p className="ed-foot-tag">Websites and SaaS, built fast and built properly.</p>
      </div>
      <div className="ed-foot-socials">
        {socials.map(s => (
          <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={s.label}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill={s.fill ? 'currentColor' : 'none'} stroke={s.fill ? 'none' : 'currentColor'} strokeWidth="2">
              <path d={s.path} />
            </svg>
          </a>
        ))}
      </div>
    </div>
    <div className="ed-foot-bottom">
      <span>© 2026 Ahmed Chioua. All rights reserved.</span>
      <a href={CALENDLY} target="_blank" rel="noopener noreferrer">Book a scope call ↗</a>
    </div>

  </footer>
)

export default Footer
