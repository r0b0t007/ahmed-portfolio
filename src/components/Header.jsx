import { useState, useEffect } from 'react'

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Proof', href: '#proof' },
  { name: 'About', href: '#about' },
  { name: 'FAQ', href: '#faq' },
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

    </header>
  )
}

export default Header
