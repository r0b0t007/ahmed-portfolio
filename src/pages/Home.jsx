import Hero from '../components/Hero'
import Benefits from '../components/Benefits'
import Services from '../components/Services'
import Process from '../components/Process'
import Handoff from '../components/Handoff'
import Proof from '../components/Proof'
import Pricing from '../components/Pricing'
import Faq from '../components/Faq'
import Background from '../components/Background'
import { Split } from '../components/Split'

// The pitch card on the left (sticky on wide screens), the reasons on the right: why it holds,
// the proof, what gets built and how, the price, the questions, then the record. Contact closes
// the page but is rendered by App.jsx, inside its hydration island.
const Home = () => (
  <Split pitch={<Hero />}>
    <Benefits />
    <Proof />
    <Services />
    <Process />
    <Handoff />
    <Pricing />
    <Faq />
    <Background />
  </Split>
)

export default Home
