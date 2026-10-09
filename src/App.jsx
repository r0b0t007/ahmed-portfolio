import Header from './components/Header'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import { findRoute } from './content/routes'
import { sectionIndex, serviceSectionIndex } from './lib/sections'

/**
 * Each page is rendered once, at build time, into static HTML (scripts/prerender.js renders one
 * per route in src/content/routes.js). In the browser only two "islands" hydrate — Header (menu,
 * scroll state) and Contact (the form); see src/main.jsx. Everything else has no interactivity
 * and stays as prerendered markup, so those components never ship in the client bundle. The
 * island wrappers use display: contents so they add no box (the header must stay
 * position: sticky against <body>).
 *
 * Contact's props differ per page (its eyebrow index), so they are serialised into data-props:
 * src/hydrate.jsx reads them back, and the client render matches the server's.
 *
 * React.lazy is not an option here: it suspends during renderToString.
 */
import { ISLAND } from './islands'

function App({ path = '/' }) {
  const route = findRoute(path)
  const contactProps = { index: route.kind === 'home' ? sectionIndex('contact') : serviceSectionIndex('contact') }
  return (
    <div className="app">
      <div id={ISLAND.header} style={{ display: 'contents' }}><Header /></div>
      <main>
        {route.kind === 'home' ? <Home /> : <ServicePage slug={route.slug} />}
        <div id={ISLAND.contact} data-props={JSON.stringify(contactProps)} style={{ display: 'contents' }}>
          <Contact {...contactProps} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
