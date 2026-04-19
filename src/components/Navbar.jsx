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
  const { toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between gap-4 px-5 py-4 md:px-12 md:py-5 border-b transition-all duration-300 ${
        scrolled || menuOpen ? 'border-[var(--border)]' : 'border-transparent'
      }`}
      style={(scrolled || menuOpen) ? { background: 'var(--nav-scrolled-bg)', backdropFilter: 'blur(20px)' } : {}}
    >
      <a href="#" className="font-display font-extrabold text-lg tracking-tight" style={{ color: 'var(--text)' }}>
        SS<span style={{ color: 'var(--accent)' }}>.</span>
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 list-none">
        {NAV_LINKS.map(({ id, label }) => (
          <li key={id}>
            <a href={`#${id}`} className="nav-link">{label}</a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <a
          href="mailto:samirsaurabh.dev@gmail.com"
          className="hidden sm:block border px-4 py-2 text-xs uppercase tracking-widest transition-all duration-200"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--bg)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}
        >
          Hire Me
        </a>

        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <span className="toggle-icon-sun">☀️</span>
          <span className="toggle-icon-moon">🌙</span>
          <span className="theme-toggle-thumb" />
        </button>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] p-1.5"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-[1.5px] transition-all duration-300"
            style={{
              background: 'var(--text)',
              transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block w-5 h-[1.5px] transition-all duration-300"
            style={{ background: 'var(--text)', opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-[1.5px] transition-all duration-300"
            style={{
              background: 'var(--text)',
              transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu md:hidden">
          {NAV_LINKS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>
          ))}
          <a
            href="mailto:samirsaurabh.dev@gmail.com"
            className="sm:hidden"
            onClick={closeMenu}
            style={{ color: 'var(--accent)' }}
          >
            Hire Me →
          </a>
        </div>
      )}
    </nav>
  )
}
