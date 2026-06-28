import { lazy, Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { ChatProvider } from './context/ChatContext'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'

const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))
const AIChat = lazy(() => import('./components/AIChat'))
const Contact = lazy(() => import('./components/Contact'))

function Portfolio() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Skills />
        <ErrorBoundary>
          <Suspense fallback={<div style={{ minHeight: '200px' }} />}>
            <Experience />
            <Projects />
            <AIChat />
            <Contact />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <ThemeProvider>
        <ChatProvider>
          <Portfolio />
        </ChatProvider>
      </ThemeProvider>
    </>
  )
}
