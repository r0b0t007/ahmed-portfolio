import { useState, useEffect } from 'react'
import { uiFor } from '../content/i18n'

// An island: it hydrates with the props App.jsx serialised (src/hydrate.jsx), not from the URL or
// the page's context, so everything it renders depends only on those props. The links' words and
// targets live in src/content/ui.js.
const Header = ({ locale = 'en', switchHref }) => {
  const ui = uiFor(locale)
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
      <a href={`${ui.home}#hero`} className="ed-logo">Ahmed Chioua</a>

      <div className="ed-head-end">
        <nav className="ed-nav">
          {ui.nav.map(l => (
            <a key={l.name} href={l.href} className={l.accent ? 'accent' : ''}>{l.name}</a>
          ))}
        </nav>

        {/* Outside the nav, so it stays visible on phones, where the nav collapses into the menu. */}
        {switchHref && (
          <a href={switchHref} hrefLang={ui.switchTo.lang} lang={ui.switchTo.lang} aria-label={ui.switchTo.name} className="ed-lang">
            {ui.switchTo.label}
          </a>
        )}

        <button className="ed-burger" aria-label={ui.menu} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <div className="ed-mobile" onClick={() => setOpen(false)}>
          {ui.nav.map(l => (
            <a key={l.name} href={l.href} className={l.accent ? 'accent' : ''}>{l.name}</a>
          ))}
        </div>
      )}

    </header>
  )
}

export default Header
