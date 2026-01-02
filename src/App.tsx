import Hero from './components/sections/Hero'
import About from './components/sections/About'
import './App.css'
import Skill from './components/sections/Skill'
import Projects from './components/sections/Projects'
import Process from './components/sections/Process'
// import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import { TimelineDemo } from './components/sections/TimeLine'
import FAB from './components/FAB'
import GitHubHeroSection from './components/sections/GithubHeroSection'
import { NavbarComp } from './components/Nav'

function App() {
  return (
    <div id='home' className="min-h-screen max-w-screen w-screen scroll-smooth">
      <NavbarComp/>
      <Hero />
      <GitHubHeroSection username={'1rubiz'}/>
      <About />
      <Skill/>
      <Projects/>
      <Process/>
      <TimelineDemo/>
      <Contact/>
      <FAB/>
    </div>
  )
}

export default App
