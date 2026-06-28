import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'ai-chat', label: 'AI Chat' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="nav-logo">SS<span style={{ color: 'var(--accent)' }}>.</span></a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-7">
        {NAV_LINKS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className="nav-link"
            style={{ color: activeSection === id ? 'var(--accent)' : undefined }}
          >
            {label}
          </a>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-3">
        {/* GitHub */}
        <a
          href="https://github.com/Samirsaurabh1298"
          target="_blank"
          rel="noreferrer"
          className="nav-link flex items-center gap-1.5"
          title="GitHub"
          style={{ fontSize: 13 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>

        {/* Hire Me */}
        <a href="mailto:samirsaurabh.dev@gmail.com" className="btn-secondary" style={{ padding: '7px 14px', fontSize: 12 }}>
          Hire Me
        </a>

        {/* Theme toggle */}
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          {isDark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile: theme + hamburger */}
      <div className="flex md:hidden items-center gap-3">
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          {isDark ? '☀' : '☾'}
        </button>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="mobile-menu-link"
              onClick={() => setMenuOpen(false)}
              style={{ color: activeSection === id ? 'var(--accent)' : undefined }}
            >
              {label}
            </a>
          ))}
          <a
            href="https://github.com/Samirsaurabh1298"
            target="_blank"
            rel="noreferrer"
            className="mobile-menu-link"
            onClick={() => setMenuOpen(false)}
          >
            GitHub
          </a>
          <a href="mailto:samirsaurabh.dev@gmail.com" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            Hire Me
          </a>
        </div>
      )}
    </nav>
  )
}
