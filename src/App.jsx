import Header from './components/Header'
import Hero from './components/Hero'
import Summary from './components/Summary'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Calendly from './components/Calendly'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MatrixRain from './components/MatrixRain'

function App() {
  return (
    <div className="app">
      <MatrixRain />
      <Header />
      <main>
        <Hero />
        <Summary />
        <Experience />
        <Skills />
        <Education />
        <Calendly />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
