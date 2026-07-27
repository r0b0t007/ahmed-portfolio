import { useState, useEffect } from 'react'

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Experience', href: '#experience' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact', accent: true },
]

const Header = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`ed-header ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="ed-logo">Ahmed Chioua</a>

      <nav className="ed-nav">
        {navLinks.map(l => (
          <a key={l.name} href={l.href} className={l.accent ? 'accent' : ''}>{l.name}</a>
        ))}
      </nav>

      <button className="ed-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>

      {open && (
        <div className="ed-mobile" onClick={() => setOpen(false)}>
          {navLinks.map(l => (
            <a key={l.name} href={l.href} className={l.accent ? 'accent' : ''}>{l.name}</a>
          ))}
        </div>
      )}

      <style>{`
        .ed-header {
          position: sticky; top: 0; z-index: 20;
          display: flex; justify-content: space-between; align-items: center;
          padding: 24px var(--pad);
          background: var(--paper);
          border-bottom: 1px solid var(--hair);
          transition: padding var(--transition), box-shadow var(--transition);
        }
        .ed-header.scrolled { padding: 16px var(--pad); box-shadow: 0 1px 0 rgba(0,0,0,0.03); }
        .ed-logo {
          font-family: var(--serif); font-style: italic; font-size: 1rem; font-weight: 600;
          color: var(--ink); letter-spacing: 0.2px;
        }
        .ed-nav { display: flex; gap: 36px; }
        .ed-nav a { font-size: 0.82rem; font-weight: 500; color: var(--ink-2); transition: color var(--transition); }
        .ed-nav a:hover { color: var(--ink); }
        .ed-nav a.accent { color: var(--teal); border-bottom: 1px solid var(--teal); padding-bottom: 2px; }
        .ed-burger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; padding: 6px;
        }
        .ed-burger span { width: 22px; height: 1.5px; background: var(--ink); display: block; }
        .ed-mobile {
          position: absolute; top: 100%; left: 0; right: 0;
          background: var(--paper); border-bottom: 1px solid var(--hair);
          display: flex; flex-direction: column; padding: 8px var(--pad) 20px;
        }
        .ed-mobile a { padding: 14px 0; font-size: 0.95rem; color: var(--ink-2); border-bottom: 1px solid var(--hair); }
        .ed-mobile a.accent { color: var(--teal); }
        @media (max-width: 720px) {
          .ed-nav { display: none; }
          .ed-burger { display: flex; }
        }
      `}</style>
    </header>
  )
}

export default Header
