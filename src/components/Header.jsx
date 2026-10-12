import { useState, useEffect } from 'react'
import { uiFor } from '../content/i18n'

// An island: it hydrates with the props App.jsx serialised (src/hydrate.jsx), not from the URL or
// the page's context, so everything it renders depends only on those props. The links' words and
// targets live in src/content/ui.js; the one marked `accent` is the booking link, set apart.
const Header = ({ locale = 'en', switchHref }) => {
  const ui = uiFor(locale)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const links = ui.nav.filter(l => !l.accent)
  const cta = ui.nav.find(l => l.accent)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-header-in">
        <a href={`${ui.home}#hero`} className="wordmark">Ahmed Chioua</a>

        <nav className="site-nav">
          {links.map(l => <a key={l.name} href={l.href}>{l.name}</a>)}
        </nav>

        <div className="site-head-end">
          {/* Outside the nav, so it stays visible on phones, where the nav collapses into the menu. */}
          {switchHref && (
            <a href={switchHref} hrefLang={ui.switchTo.lang} lang={ui.switchTo.lang} aria-label={ui.switchTo.name} className="lang">
              {ui.switchTo.label}
            </a>
          )}
          {cta && <a href={cta.href} className="head-cta">{cta.name}</a>}
          <button className="burger" aria-label={ui.menu} aria-expanded={open} onClick={() => setOpen(!open)}>
            <span /><span />
          </button>
        </div>
      </div>

      {open && (
        <div className="site-menu" onClick={() => setOpen(false)}>
          {ui.nav.map(l => <a key={l.name} href={l.href}>{l.name}</a>)}
        </div>
      )}
    </header>
  )
}

export default Header
