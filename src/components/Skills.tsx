import { motion } from 'framer-motion'

interface Skill {
  icon: string
  name: string
  desc: string
  tags: string[]
}

const SKILLS: Skill[] = [
  { icon: '⚛️', name: 'Core Frontend', desc: 'Building responsive, accessible, pixel-perfect UIs with modern React patterns and strict TypeScript.', tags: ['React.js', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3'] },
  { icon: '🎨', name: 'UI & Styling', desc: 'Crafting design systems and component libraries with utility-first and component-driven CSS approaches.', tags: ['Tailwind CSS', 'Material-UI', 'Bootstrap', 'Formik'] },
  { icon: '⚡', name: 'Performance', desc: 'Core Web Vitals obsessive — LCP, FID, CLS optimization through code splitting, lazy loading, and memoization.', tags: ['Core Web Vitals', 'Lazy Loading', 'Code Splitting', 'Webpack', 'Vite'] },
  { icon: '🔧', name: 'State & Tooling', desc: 'Managing complex application state and automating workflows for consistent, reliable delivery.', tags: ['Redux', 'Context API', 'Git', 'Jest', 'Postman'] },
  { icon: '☁️', name: 'Cloud & Deploy', desc: 'Deploying and managing frontend assets on cloud infrastructure with CI/CD pipelines.', tags: ['AWS S3', 'AWS Amplify', 'Vercel', 'Netlify'] },
  { icon: '🤝', name: 'Collaboration', desc: 'Bridging design and engineering in agile teams — from Figma handoff to production.', tags: ['Figma', 'Agile/Scrum', 'Jira', 'REST APIs'] },
]

export default function Skills() {
  return (
    <section id="skills" className="px-5 py-16 md:px-12 md:py-28" style={{ background: 'var(--bg2)' }}>
      <div className="section-label">What I work with</div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
        {SKILLS.map(({ icon, name, desc, tags }, index) => (
          <motion.div
            key={name}
            className="skill-card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="text-2xl mb-4">{icon}</div>
            <div className="font-display font-bold text-base mb-2" style={{ color: 'var(--text)' }}>{name}</div>
            <p className="text-[13px] leading-loose mb-4 flex-1" style={{ color: 'var(--muted)' }}>{desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
