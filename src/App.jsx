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
 * Sections are imported statically rather than lazily so the whole page can be prerendered to
 * static HTML (see scripts/prerender.js). React.lazy suspends during renderToString, which would
 * emit empty fallbacks and then mismatch on hydration. The nine section chunks totalled ~14 kB
 * gzipped, and with the markup already in the HTML the bundle no longer gates first paint.
 */
function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Process />
        <Proof />
        <Experience />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
