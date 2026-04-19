const SKILLS = [
  {
    icon: '⚛️',
    name: 'Core Frontend',
    desc: 'Building responsive, accessible, pixel-perfect UIs with modern web standards.',
    tags: ['React.js', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3'],
  },
  {
    icon: '🎨',
    name: 'UI & Styling',
    desc: 'Crafting design systems and component libraries that scale across teams.',
    tags: ['Tailwind CSS', 'Material-UI', 'Bootstrap', 'Formik'],
  },
  {
    icon: '⚡',
    name: 'Performance',
    desc: 'Core Web Vitals obsessive — LCP, FID, CLS optimization across production apps.',
    tags: ['Core Web Vitals', 'Lazy Loading', 'Code Splitting', 'Webpack', 'Vite'],
  },
  {
    icon: '🔧',
    name: 'State & Tooling',
    desc: 'Managing complex application state and developer workflows efficiently.',
    tags: ['Redux', 'Context API', 'Git', 'Jest', 'Postman'],
  },
  {
    icon: '☁️',
    name: 'Cloud & Deploy',
    desc: 'Deploying and managing frontend assets on modern cloud platforms.',
    tags: ['AWS S3', 'AWS Amplify', 'Vercel', 'Netlify'],
  },
  {
    icon: '🤝',
    name: 'Collaboration',
    desc: 'Bridging design and engineering in agile cross-functional teams.',
    tags: ['Figma', 'Agile/Scrum', 'Jira', 'REST APIs'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="px-5 py-16 md:px-12 md:py-28" style={{ background: 'var(--bg2)' }}>
      <div className="section-label">What I work with</div>
      <h2 className="section-title fade-in">Technical<br />Arsenal</h2>

      <div
        className="grid grid-cols-1 md:grid-cols-3 fade-in"
        style={{ gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}
      >
        {SKILLS.map(({ icon, name, desc, tags }) => (
          <div key={name} className="skill-card">
            <div className="text-3xl mb-4">{icon}</div>
            <div className="font-display font-bold text-base mb-2" style={{ color: 'var(--text)' }}>{name}</div>
            <p className="text-[13px] mt-2" style={{ color: 'var(--muted)' }}>{desc}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
