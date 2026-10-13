import { uiFor } from '../content/i18n'

// An island: it hydrates with the props App.jsx serialised (src/hydrate.jsx), not from the URL or
// the page's context, so everything it renders depends only on those props. The links' words and
// targets live in src/content/ui.js.
//
// An edge-aligned nameplate, not a row of links: the mark on one edge, three keys on the other
// (the section index, the other language, the booking key). The section links live in the index
// panel at every width, so desktop and phone share one header.
//
// The index is a native popover (popovertarget on the key), so it opens from the prerendered HTML
// before hydration and without JavaScript. What the browser doesn't do (placing it under the
// header, closing it when a link is followed, and the whole panel in browsers without popovers)
// is one plain script in index.html, so this component holds no state.
const Header = ({ locale = 'en', switchHref }) => {
  const ui = uiFor(locale)
  const sections = ui.nav.filter(l => !l.accent)
  const action = ui.nav.find(l => l.accent)

  return (
    <header className="ed-header">
      {/* The mark is the booking key: a signal face, a graphite edge, a hard offset. The kit and
          its source are in brand/logo-kit. Drawn on a 256 grid; the offset is 24 units, so a
          press moves the key onto it, as the site's keys do. */}
      <a href={`${ui.home}#hero`} className="ed-logo" aria-label="Ahmed Chioua">
        <svg viewBox="20 20 216 216" width="44" height="44" aria-hidden="true" focusable="false">
          <path className="ed-logo-off" d="M44 44H236V236H44Z" />
          <g className="ed-logo-key">
            <path className="ed-logo-edge" d="M20 20H212V212H20Z" />
            <path className="ed-logo-face" d="M34 34H198V198H34Z" />
            <path className="ed-logo-a" fillRule="evenodd" d="M92 56H140L172.15 176H138.15L130.65 148H101.35L93.85 176H59.85ZM116 93.32L125.29 128H106.71Z" />
          </g>
        </svg>
      </a>

      <div className="ed-head-end">
        {/* aria-label names the key at every width; the visible label is dropped on phones. */}
        <button
          type="button"
          className="ed-index-key"
          aria-label={ui.menu}
          popoverTarget="site-index"
        >
          <span className="ed-index-icon" aria-hidden="true"><span /><span /><span /></span>
          <span className="ed-index-label" aria-hidden="true">{ui.menu}</span>
        </button>

        {switchHref && (
          <a href={switchHref} hrefLang={ui.switchTo.lang} lang={ui.switchTo.lang} aria-label={ui.switchTo.name} className="ed-lang">
            {ui.switchTo.label}
          </a>
        )}

        {/* The hero carries the booking key on a phone's first screen, so this one steps aside
            below 480px, where the nameplate has room for the mark and two keys only. The index
            lists it there instead. */}
        <a href={action.href} className="ed-head-cta">{action.name}</a>
      </div>

      {/* Always in the markup: the prerendered page lists every section for crawlers and agents. */}
      <nav id="site-index" popover="auto" className="ed-index" aria-label={ui.menu}>
        <ul>
          {sections.map(l => <li key={l.name}><a href={l.href}>{l.name}</a></li>)}
          <li className="ed-index-cta"><a href={action.href}>{action.name}</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
