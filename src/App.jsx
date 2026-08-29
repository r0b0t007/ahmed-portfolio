import Header from './components/Header'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'
import Services from './components/Services'
import Process from './components/Process'
import Proof from './components/Proof'
import Experience from './components/Experience'
import About from './components/Summary'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'

/**
 * The full tree is rendered once, at build time, into static HTML (scripts/prerender.js). In the
 * browser only two "islands" hydrate — Header (menu, scroll state) and Contact (the form); see
 * src/main.jsx. Everything else has no interactivity and stays as prerendered markup, so those
 * components never ship in the client bundle. The island wrappers use display: contents so they
 * add no box (the header must stay position: sticky against <body>).
 *
 * React.lazy is not an option here: it suspends during renderToString.
 */
import { ISLAND } from './islands'
function App() {
  return (
    <div className="app">
      <div id={ISLAND.header} style={{ display: 'contents' }}><Header /></div>
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Process />
        <Proof />
        <Experience />
        <About />
        <Faq />
        <div id={ISLAND.contact} style={{ display: 'contents' }}><Contact /></div>
      </main>
      <Footer />
    </div>
  )
}

export default App
