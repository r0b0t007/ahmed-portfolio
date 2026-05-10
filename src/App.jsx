import { Suspense, lazy } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MatrixRain from './components/MatrixRain'

const Summary    = lazy(() => import('./components/Summary'))
const Experience = lazy(() => import('./components/Experience'))
const Skills     = lazy(() => import('./components/Skills'))
const Education  = lazy(() => import('./components/Education'))
const Calendly   = lazy(() => import('./components/Calendly'))
const Contact    = lazy(() => import('./components/Contact'))
const Footer     = lazy(() => import('./components/Footer'))

function App() {
  return (
    <div className="app">
      <MatrixRain />
      <Header />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Summary />
          <Experience />
          <Skills />
          <Education />
          <Calendly />
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
