import { Suspense, lazy } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'

const Services = lazy(() => import('./components/Services'))
const Experience = lazy(() => import('./components/Experience'))
const About      = lazy(() => import('./components/Summary'))
const Contact    = lazy(() => import('./components/Contact'))
const Footer     = lazy(() => import('./components/Footer'))

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Services />
          <Experience />
          <About />
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
