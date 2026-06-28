import { ThemeProvider } from './context/ThemeContext'
import { ChatProvider } from './context/ChatContext'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import AIChat from './components/AIChat'
import Contact from './components/Contact'
import Footer from './components/Footer'

function Portfolio() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <AIChat />
      <Contact />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <Portfolio />
      </ChatProvider>
    </ThemeProvider>
  )
}
