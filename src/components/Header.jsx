import { useState, useEffect } from 'react'
import { uiFor } from '../content/i18n'

// An island: it hydrates with the props App.jsx serialised (src/hydrate.jsx), not from the URL or
// the page's context, so everything it renders depends only on those props. The links' words and
// targets live in src/content/ui.js.
//
// Set like a document's running head: the name on the left; on the right a Contents toggle (the
// section links, at every width, instead of a row of five nav links), the language switch and the
// one action. The toggle replaces the old burger, with the same open/close behaviour.
const Header = ({ locale = 'en', switchHref }) => {
  const ui = uiFor(locale)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const contents = ui.nav.filter(l => !l.accent)
  const cta = ui.nav.find(l => l.accent)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
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
    <header className={`running-head${scrolled ? ' scrolled' : ''}`}>
      <a href={`${ui.home}#hero`} className="wordmark">Ahmed Chioua</a>

      <div className="head-end">
        <button
          type="button" className="contents-toggle"
          aria-expanded={open} aria-controls="contents-panel"
          onClick={() => setOpen(!open)}
        >
          {ui.menu}
        </button>

        {/* Outside the panel, so it stays one tap away on every width. */}
        {switchHref && (
          <a href={switchHref} hrefLang={ui.switchTo.lang} lang={ui.switchTo.lang} aria-label={ui.switchTo.name} className="lang-switch">
            {ui.switchTo.label}
          </a>
        )}

        {cta && <a href={cta.href} className="head-cta">{cta.name}</a>}
      </div>

      {/* Always in the DOM (toggled with `hidden`), so aria-controls names an element that exists. */}
      <nav id="contents-panel" className="contents-panel" aria-label={ui.menu} hidden={!open} onClick={() => setOpen(false)}>
        <ol>
          {contents.map(l => <li key={l.name}><a href={l.href}>{l.name}</a></li>)}
        </ol>
      </nav>
    </header>
  )
}

export default Header
