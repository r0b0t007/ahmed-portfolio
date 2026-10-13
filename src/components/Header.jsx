import { useState, useEffect } from 'react'
import { uiFor } from '../content/i18n'

// An island: it hydrates with the props App.jsx serialised (src/hydrate.jsx), not from the URL or
// the page's context, so everything it renders depends only on those props. The links' words and
// targets live in src/content/ui.js.
//
// An edge-aligned nameplate, not a row of links: the wordmark on one edge, three keys on the other
// (the section index, the other language, the booking key). The section links live in the index
// panel at every width, so desktop and phone share one header.
const Header = ({ locale = 'en', switchHref }) => {
  const ui = uiFor(locale)
  const [open, setOpen] = useState(false)
  const sections = ui.nav.filter(l => !l.accent)
  const action = ui.nav.find(l => l.accent)

  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="ed-header">
      <a href={`${ui.home}#hero`} className="ed-logo">Ahmed Chioua</a>

      <div className="ed-head-end">
        <button className="ed-index-key" aria-expanded={open} aria-controls="site-index" onClick={() => setOpen(!open)}>
          <span className="ed-index-icon" aria-hidden="true"><span /><span /><span /></span>
          <span className="ed-index-label">{ui.menu}</span>
        </button>

        {switchHref && (
          <a href={switchHref} hrefLang={ui.switchTo.lang} lang={ui.switchTo.lang} aria-label={ui.switchTo.name} className="ed-lang">
            {ui.switchTo.label}
          </a>
        )}

        {/* The hero carries the booking key on a phone's first screen, so this one steps aside
            below 480px, where the nameplate has room for the wordmark and two keys only. */}
        <a href={action.href} className="ed-head-cta">{action.name}</a>
      </div>

      {/* Always in the markup, hidden while closed: the prerendered page still lists every
          section for crawlers and agents before (or without) hydration. */}
      <nav id="site-index" className="ed-index" aria-label={ui.menu} hidden={!open} onClick={() => setOpen(false)}>
        <ul>
          {sections.map(l => <li key={l.name}><a href={l.href}>{l.name}</a></li>)}
        </ul>
      </nav>
    </header>
  )
}

export default Header
