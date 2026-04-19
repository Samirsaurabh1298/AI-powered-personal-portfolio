const CONTACT_LINKS = [
  { icon: '✉', href: 'mailto:samirsaurabh.dev@gmail.com', label: 'samirsaurabh.dev@gmail.com' },
  { icon: 'in', href: 'https://linkedin.com/in/samirsaurabh', label: 'linkedin.com/in/samirsaurabh', external: true },
  { icon: '✆', href: 'tel:+916200432657', label: '+91 6200432657' },
]

const INFO_CARDS = [
  { label: 'Location', value: 'Bangalore, India', color: false },
  { label: 'Availability', value: 'Open to Opportunities', color: true },
  { label: 'Education', value: 'B.Tech Computer Science', sub: 'School of Research and Technology, Bhopal · 2020', color: false },
]

export default function Contact() {
  return (
    <section id="contact" className="px-5 py-16 md:px-12 md:py-28" style={{ background: 'var(--bg2)' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        <div className="fade-in">
          <div className="section-label">Get in touch</div>
          <h3
            className="font-display font-extrabold mb-5"
            style={{ fontSize: 'clamp(24px, 5vw, 40px)', letterSpacing: '-1px', color: 'var(--text)' }}
          >
            Let's build something great together
          </h3>
          <p className="text-sm leading-loose mb-8" style={{ color: 'var(--muted)' }}>
            Open to full-time roles, freelance projects, and collaborations. Whether you need a React performance specialist or someone to own your frontend architecture — let's talk.
          </p>
          <div className="flex flex-col gap-3">
            {CONTACT_LINKS.map(({ icon, href, label, external }) => (
              <a
                key={label}
                href={href}
                className="contact-link"
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <div
                  className="flex items-center justify-center text-base flex-shrink-0"
                  style={{ width: 36, height: 36, border: '1px solid var(--border)' }}
                >
                  {icon}
                </div>
                {label}
              </a>
            ))}
          </div>
        </div>

        <div
          className="fade-in flex flex-col"
          style={{ gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}
        >
          {INFO_CARDS.map(({ label, value, sub, color }) => (
            <div key={label} className="p-8" style={{ background: 'var(--surface)' }}>
              <div className="text-[11px] uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>{label}</div>
              <div
                className="font-display font-bold"
                style={{ fontSize: 20, color: color ? 'var(--accent)' : 'var(--text)' }}
              >
                {value}
              </div>
              {sub && <div className="text-[13px] mt-1" style={{ color: 'var(--muted)' }}>{sub}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
