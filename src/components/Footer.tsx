export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-logo">
            SS<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <p className="footer-tagline">
            Frontend Engineer · React · TypeScript · Core Web Vitals
          </p>
        </div>

        <div className="footer-links">
          <a href="mailto:samirsaurabh.dev@gmail.com" className="footer-link">Email</a>
          <a href="https://linkedin.com/in/samirsaurabh" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
          <a href="https://github.com/Samirsaurabh1298" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
        </div>

        <div className="footer-right">
          <p className="footer-copy">&copy; {year} Samir Saurabh</p>
          <p className="footer-copy" style={{ opacity: 0.5 }}>Bangalore, India</p>
        </div>
      </div>
    </footer>
  )
}
