import Header from './components/Header'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Home from './pages/Home'
import HomeFr from './pages/HomeFr'
import ServicePage from './pages/ServicePage'
import WorkPage from './pages/WorkPage'
import { findRoute } from './content/routes'
import { contentFor } from './content/locale'
import { uiFor } from './content/i18n'
import { LocaleContext } from './lib/content-context'
import { homeFrSectionIndex, sectionIndex, serviceSectionIndex, workSectionIndex } from './lib/sections'

/**
 * Each page is rendered once, at build time, into static HTML (scripts/prerender.js renders one
 * per route in src/content/routes.js). In the browser only two "islands" hydrate — Header (menu,
 * scroll state) and Contact (the form); see src/main.jsx. Everything else has no interactivity
 * and stays as prerendered markup, so those components never ship in the client bundle. The
 * island wrappers use display: contents so they add no box (the header must stay
 * position: sticky against <body>).
 *
 * Both islands' props differ per page (the language, the switch target, Contact's eyebrow index),
 * so they are serialised into data-props:
 * src/hydrate.jsx reads them back, and the client render matches the server's. Every other
 * component reads the page's language content from LocaleContext (src/lib/content-context.js).
 *
 * React.lazy is not an option here: it suspends during renderToString.
 */
import { ISLAND } from './islands'

// Each route kind's page and section numbering, in one place so a new kind can't get one without
// the other. "kind:locale" entries override a kind for one language.
const PAGE_TYPES = {
  home: { render: () => <Home />, index: sectionIndex },
  'home:fr': { render: () => <HomeFr />, index: homeFrSectionIndex },
  service: { render: r => <ServicePage id={r.id} />, index: serviceSectionIndex },
  work: { render: r => <WorkPage slug={r.slug} name={r.name} />, index: workSectionIndex },
}

// The header's language switch goes to this page in the other language, or to that language's
// homepage when the page has no twin (a build log).
const OTHER = { en: 'fr', fr: 'en' }

function App({ path = '/' }) {
  const route = findRoute(path)
  const type = PAGE_TYPES[`${route.kind}:${route.locale}`] ?? PAGE_TYPES[route.kind]
  if (!type) throw new Error(`App: no page type "${route.kind}" for ${path}`)
  const other = OTHER[route.locale]
  const headerProps = { locale: route.locale, switchHref: route.alternates?.[other] ?? uiFor(other).home }
  // Contact closes every page; its eyebrow number continues the page type's own section order.
  const contactProps = { index: type.index('contact'), locale: route.locale }
  return (
    <LocaleContext.Provider value={contentFor(route.locale)}>
      <div className="app">
        <div id={ISLAND.header} data-props={JSON.stringify(headerProps)} style={{ display: 'contents' }}>
          <Header {...headerProps} />
        </div>
        <main>
          {type.render(route)}
          <div id={ISLAND.contact} data-props={JSON.stringify(contactProps)} style={{ display: 'contents' }}>
            <Contact {...contactProps} />
          </div>
        </main>
        <Footer />
      </div>
    </LocaleContext.Provider>
  )
}

export default App
