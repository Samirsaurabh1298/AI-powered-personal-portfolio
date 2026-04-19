export default function Footer() {
  return (
    <footer
      className="flex flex-col sm:flex-row justify-between items-center gap-2 px-5 py-8 md:px-12 md:py-10 border-t text-center sm:text-left"
      style={{ borderColor: 'var(--border)' }}
    >
      <p className="text-xs" style={{ color: 'var(--muted)' }}>
        &copy; 2026 <span style={{ color: 'var(--accent)' }}>Samir Saurabh</span> · Frontend Engineer
      </p>
      <p className="text-[11px]" style={{ color: 'var(--muted)' }}>Bangalore, India</p>
    </footer>
  )
}
