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
 * Rendered in full at build time (scripts/prerender.js) so the served HTML carries the whole page.
 *
 * On the client only the two interactive regions are hydrated — see src/main.jsx. They're marked
 * with `island` wrappers so the client has a container to hydrate into. The wrappers are
 * `display: contents` (see index.css) so they create no box of their own: a real wrapper element
 * around the header would become its containing block and break `position: sticky`.
 *
 * Everything else is static markup that never gets hydrated, which is the point — it's what keeps
 * React off the main thread for ~80% of the tree.
 */
function App() {
  return (
    <div className="app">
      <div className="island" id="island-header"><Header /></div>
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Process />
        <Proof />
        <Experience />
        <About />
        <Faq />
        <div className="island" id="island-contact"><Contact /></div>
      </main>
      <Footer />
    </div>
  )
}

export default App
