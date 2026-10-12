import Hero from '../components/Hero'
import Benefits from '../components/Benefits'
import Services from '../components/Services'
import Process from '../components/Process'
import Pricing from '../components/Pricing'
import Handoff from '../components/Handoff'
import Faq, { DateClause } from '../components/Faq'
import Proof from '../components/Proof'
import Experience from '../components/Experience'
import About from '../components/Summary'

/**
 * The homepage, set as the scope document the buyer receives: the cover (parties, revision, key
 * terms), the preamble, the numbered clauses, then the annexes. The signature block (Contact)
 * closes it, rendered by App.jsx inside its hydration island.
 *
 * The render order must match the order in src/lib/sections.js, which numbers the clauses (§ 1
 * to § 6) and letters the annexes (A to C).
 */
const Home = () => (
  <>
    <Hero />
    <Benefits />
    <Services />
    <Process />
    <Pricing />
    <Handoff />
    <DateClause />
    <Faq />
    <Proof />
    <Experience />
    <About />
  </>
)

export default Home
