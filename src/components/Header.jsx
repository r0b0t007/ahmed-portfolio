import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#summary' },
        { name: 'Experience', href: '#experience' },
        { name: 'Skills', href: '#skills' },
        { name: 'Contact', href: '#contact' },
    ]

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container header-container">
                <a href="#" className="logo">
                    Ahmed<span className="accent">.</span>
                </a>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a href={link.href}>{link.name}</a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.nav
                            className="mobile-nav"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween' }}
                        >
                            <ul>
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} onClick={() => setIsOpen(false)}>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>

            <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 20px 0;
          transition: all 0.3s ease;
        }

        .header.scrolled {
          background: rgba(10, 10, 10, 0.95);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          padding: 15px 0;
          backdrop-filter: blur(10px);
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .accent {
          color: var(--accent-primary);
        }

        .desktop-nav ul {
          display: flex;
          gap: 30px;
        }

        .desktop-nav a {
          font-size: 0.9rem;
          font-weight: 500;
          position: relative;
        }

        .desktop-nav a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-primary);
          transition: width 0.3s ease;
        }

        .desktop-nav a:hover::after {
          width: 100%;
        }

        .mobile-toggle {
          display: none;
          font-size: 1.5rem;
          cursor: pointer;
          z-index: 1001;
        }

        .mobile-nav {
          position: fixed;
          top: 0;
          right: 0;
          width: 70%;
          height: 100vh;
          background: var(--bg-card);
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5);
        }

        .mobile-nav ul {
          display: flex;
          flex-direction: column;
          gap: 30px;
          text-align: center;
        }

        .mobile-nav a {
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
        }
      `}</style>
        </header>
    )
}

export default Header
