import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { FaBars, FaTimes, FaCalendarAlt } from 'react-icons/fa'

const navLinks = [
  { name: 'Home', href: '#hero', id: 'hero' },
  { name: 'About', href: '#summary', id: 'summary' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Education', href: '#education', id: 'education' },
  { name: 'Contact', href: '#contact', id: 'contact' },
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
      const sectionIds = ['hero', 'summary', 'experience', 'skills', 'education', 'calendly', 'contact']
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <motion.div className="scroll-bar" style={{ scaleX: scrollYProgress }} />

      <div className="container header-inner">
        <motion.a
          href="#hero"
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ahmed<span className="logo-dot">.</span>
        </motion.a>

        <motion.nav
          className="desktop-nav"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <ul>
            {navLinks.map((link, i) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
              >
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <motion.span className="nav-indicator" layoutId="navIndicator" />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        <motion.a
          href="#calendly"
          className="book-btn"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          <FaCalendarAlt size={13} />
          Book a Call
        </motion.a>

        <motion.button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <FaTimes />
              </motion.span>
            ) : (
              <motion.span
                key="bars"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <FaBars />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              className="mobile-nav"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            >
              <ul>
                {[...navLinks, { name: 'Book a Call', href: '#calendly', id: 'calendly' }].map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={link.id === 'calendly' ? 'mobile-book' : ''}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .header {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 1000;
          padding: 22px 0;
          transition: padding 0.4s ease, background 0.4s ease, border-color 0.4s ease;
          border-bottom: 1px solid transparent;
        }
        .header.scrolled {
          background: rgba(5, 8, 22, 0.82);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border-bottom-color: rgba(255,255,255,0.06);
          padding: 14px 0;
        }
        .scroll-bar {
          position: absolute;
          top: 0; left: 0;
          height: 2px;
          width: 100%;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
          transform-origin: left;
          z-index: 1001;
        }
        .header-inner {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .logo {
          font-size: 1.6rem;
          font-weight: 900;
          letter-spacing: -1px;
          flex-shrink: 0;
          margin-right: auto;
        }
        .logo-dot { color: var(--accent-primary); }
        .desktop-nav ul { display: flex; gap: 4px; }
        .nav-link {
          display: block;
          padding: 7px 14px;
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: 100px;
          position: relative;
          transition: color var(--transition);
        }
        .nav-link:hover,
        .nav-link.active { color: var(--text-primary); }
        .nav-indicator {
          position: absolute;
          inset: 0;
          border-radius: 100px;
          background: rgba(255,255,255,0.06);
          z-index: -1;
        }
        .book-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 20px;
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          border-radius: 100px;
          font-size: 0.84rem;
          font-weight: 700;
          color: #050816;
          flex-shrink: 0;
          box-shadow: 0 0 24px rgba(45,212,191,0.28);
          transition: box-shadow var(--transition);
        }
        .book-btn:hover {
          box-shadow: 0 0 36px rgba(45,212,191,0.42);
          color: #050816;
        }
        .mobile-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px; height: 40px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--glass-border);
          border-radius: 10px;
          color: var(--text-primary);
          font-size: 1rem;
          flex-shrink: 0;
          z-index: 1001;
        }
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5,8,22,0.72);
          backdrop-filter: blur(4px);
          z-index: 999;
        }
        .mobile-nav {
          position: fixed;
          top: 0; right: 0;
          width: min(78%, 320px);
          height: 100vh;
          background: rgba(7,9,28,0.97);
          backdrop-filter: blur(24px);
          border-left: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .mobile-nav ul {
          display: flex;
          flex-direction: column;
          gap: 0;
          width: 100%;
          padding: 0 40px;
        }
        .mobile-nav a {
          display: block;
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text-secondary);
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color var(--transition), padding-left var(--transition);
        }
        .mobile-nav a:hover { color: var(--text-primary); padding-left: 8px; }
        .mobile-nav li:last-child a { border-bottom: none; }
        .mobile-book { color: var(--accent-primary) !important; font-weight: 700 !important; }
        @media (max-width: 820px) {
          .desktop-nav, .book-btn { display: none; }
          .mobile-toggle { display: flex; }
        }
      `}</style>
    </header>
  )
}

export default Header
