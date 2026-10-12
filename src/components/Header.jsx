import { useState, useEffect } from 'react'
import { uiFor } from '../content/i18n'

// An island: it hydrates with the props App.jsx serialised (src/hydrate.jsx), not from the URL or
// the page's context, so everything it renders depends only on those props. The links' words and
// targets live in src/content/ui.js.
//
// N6, a masthead set on the grid: the wordmark and the booking control on the first row (on every
// width, so booking never hides behind the menu), the section index on a second row above 60rem.
const Header = ({ locale = 'en', switchHref }) => {
  const ui = uiFor(locale)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sections = ui.nav.filter(l => !l.accent)
  const book = ui.nav.find(l => l.accent)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`mast ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="shell">
        <div className="mast-row">
          <a href={`${ui.home}#hero`} className="mast-word">Ahmed Chioua</a>

          <div className="mast-end">
            {/* Outside the section index, so it stays visible on phones, where that index
                collapses into the menu. */}
            {switchHref && (
              <a href={switchHref} hrefLang={ui.switchTo.lang} lang={ui.switchTo.lang} aria-label={ui.switchTo.name} className="mast-lang">
                {ui.switchTo.label}
              </a>
            )}
            {book && <a href={book.href} className="btn mast-cta">{book.name}</a>}
            <button className="mast-burger" aria-label={ui.menu} aria-expanded={open} onClick={() => setOpen(!open)}>
              <span /><span /><span />
            </button>
          </div>
        </div>

        <nav className="mast-nav">
          {sections.map(l => <a key={l.name} href={l.href}>{l.name}</a>)}
        </nav>
      </div>

      {open && (
        <div className="mast-sheet" onClick={() => setOpen(false)}>
          <div className="shell">
            {ui.nav.map(l => <a key={l.name} href={l.href}>{l.name}</a>)}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
