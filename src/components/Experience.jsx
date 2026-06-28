import { motion } from 'framer-motion'

const EXPERIENCE = [
  {
    period: 'Apr 2022 — Present',
    role: 'Software Engineer',
    company: 'Mahindra First Choice Wheels Ltd. · Bangalore, India',
    bullets: [
      'Led frontend development for 4+ production React applications serving 300K+ monthly users across web and mobile-web platforms.',
      'Architected reusable component library with 50+ TypeScript components using atomic design — reduced dev time by 40%.',
      'Achieved Core Web Vitals compliance: LCP 1.8s, FID 14ms, CLS 0.12 — through code splitting, lazy loading, and critical CSS inlining.',
      'Delivered 15+ major features in Agile collaboration with UX, backend, and QA teams.',
    ],
  },
  {
    period: 'Jan 2022 — Mar 2022',
    role: 'Frontend Developer Intern',
    company: 'Mahindra First Choice Wheels Ltd. · Bangalore, India',
    bullets: [
      'Developed responsive web pages from Figma prototypes using React and Bootstrap.',
      'Reduced design-to-development turnaround by 30% through systematic component reuse.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="px-5 py-16 md:px-12 md:py-28" style={{ background: 'var(--bg)' }}>
      <div className="section-label">Where I've worked</div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        Experience
      </motion.h2>

      <div className="relative" style={{ paddingLeft: 32 }}>
        {/* Animated vertical timeline line */}
        <motion.div
          style={{
            position: 'absolute', left: 0, top: 0,
            width: 1,
            background: 'var(--accent)',
            opacity: 0.25,
            originY: 0,
          }}
          initial={{ scaleY: 0, height: '100%' }}
          whileInView={{ scaleY: 1, height: '100%' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />

        {EXPERIENCE.map(({ period, role, company, bullets }, index) => (
          <motion.div
            key={role + period}
            className="exp-item relative mb-14 last:mb-0"
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 18, delay: index * 0.15 }}
          >
            {/* Timeline dot */}
            <motion.div
              style={{
                position: 'absolute',
                left: -36,
                top: 6,
                width: 10, height: 10,
                borderRadius: '50%',
                background: 'var(--accent)',
                border: '2px solid var(--bg)',
              }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: index * 0.15 + 0.1 }}
            />

            <div className="text-[11px] uppercase tracking-widest mb-1" style={{ color: 'var(--accent)' }}>{period}</div>
            <div className="font-display font-bold text-xl md:text-2xl mb-1" style={{ color: 'var(--text)' }}>{role}</div>
            <div className="text-sm mb-4" style={{ color: 'var(--muted)' }}>{company}</div>
            <ul className="flex flex-col gap-2">
              {bullets.map((b, i) => (
                <li key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>→</span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
