import Hero from './components/sections/Hero'
import About from './components/sections/About'
import './App.css'
import Skill from './components/sections/Skill'
import Projects from './components/sections/Projects'
import Process from './components/sections/Process'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import { TimelineDemo } from './components/sections/TimeLine'
import FAB from './components/FAB'

function App() {
  return (
    <div className="min-h-screen w-screen">
      <Hero />
      <About />
      <Skill/>
      <Projects/>
      <Process/>
      <Experience/>
      <TimelineDemo/>
      <Contact/>
      <FAB/>
    </div>
  )
}

export default App
