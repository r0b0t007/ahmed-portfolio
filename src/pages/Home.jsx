import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import Benefits from '../components/Benefits'
import Services from '../components/Services'
import Process from '../components/Process'
import Handoff from '../components/Handoff'
import Proof from '../components/Proof'
import Pricing from '../components/Pricing'
import Experience from '../components/Experience'
import About from '../components/Summary'
import Faq from '../components/Faq'

// Section order is also declared in src/lib/sections.js, which numbers the eyebrows; keep both in step.
// Contact closes the page but is rendered by App.jsx, inside its hydration island.
const Home = () => (
  <>
    <Hero />
    <TrustStrip />
    <Benefits />
    <Services />
    <Process />
    <Handoff />
    <Proof />
    <Pricing />
    <Experience />
    <About />
    <Faq />
  </>
)

export default Home
