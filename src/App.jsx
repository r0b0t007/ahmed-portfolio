import { Suspense, lazy } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'

const Services   = lazy(() => import('./components/Services'))
const Process    = lazy(() => import('./components/Process'))
const Proof      = lazy(() => import('./components/Proof'))
const Experience = lazy(() => import('./components/Experience'))
const About      = lazy(() => import('./components/Summary'))
const Faq        = lazy(() => import('./components/Faq'))
const Contact    = lazy(() => import('./components/Contact'))
const Footer     = lazy(() => import('./components/Footer'))

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Suspense fallback={null}>
          <Services />
          <Process />
          <Proof />
          <Experience />
          <About />
          <Faq />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
