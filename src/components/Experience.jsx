const EXPERIENCE = [
  {
    period: 'Apr 2022 — Present',
    role: 'Software Engineer',
    company: 'Mahindra First Choice Wheels Ltd. · Bangalore, India',
    bullets: [
      'Led frontend development for 4+ production React applications serving 300K+ monthly users, improving performance by 35% through code splitting and lazy loading',
      'Architected reusable component library with 50+ TypeScript components following atomic design — reducing development time by 40%',
      'Achieved Core Web Vitals compliance: LCP 1.8s, FID 14ms, CLS 0.12 across all properties',
      'Delivered 15+ major features in Agile collaboration with UX, backend, and QA teams',
    ],
  },
  {
    period: 'Jan 2022 — Mar 2022',
    role: 'Frontend Developer Intern',
    company: 'Mahindra First Choice Wheels Ltd. · Bangalore, India',
    bullets: [
      'Developed responsive web pages from Figma prototypes using HTML5, CSS3, JavaScript',
      'Reduced design-to-development turnaround by 30% through pixel-perfect implementation',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="px-5 py-16 md:px-12 md:py-28" style={{ background: 'var(--bg)' }}>
      <div className="section-label">Career path</div>
      <h2 className="section-title fade-in">Experience</h2>

      <div className="exp-timeline">
        {EXPERIENCE.map(({ period, role, company, bullets }) => (
          <div key={role} className="exp-item">
            <div className="exp-dot" />
            <div className="text-[11px] uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>{period}</div>
            <div className="font-display font-bold mb-1" style={{ fontSize: 22, color: 'var(--text)' }}>{role}</div>
            <div className="text-[13px] mb-4" style={{ color: 'var(--muted)' }}>{company}</div>
            <ul className="exp-bullets">
              {bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
