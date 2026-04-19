const PROJECTS = [
  {
    num: '01',
    accent: 'linear-gradient(90deg, #22d3ee, #3b82f6)',
    stack: ['React.js', 'Redux', 'Tailwind', 'WebSocket'],
    name: 'Ediig Auction Platform Revamp',
    desc: 'Real-time auction platform with live countdown timers, WebSocket connections for live bidding, and complex global state management. Redesigned UI from scratch.',
    metrics: [{ val: '45%', label: 'Perf Boost' }, { val: '30%', label: 'Engagement ↑' }, { val: '20%', label: 'Bounce ↓' }],
    url: null,
  },
  {
    num: '02',
    accent: 'linear-gradient(90deg, #3b82f6, #6c47ff)',
    stack: ['React.js', 'Chart.js', 'Axios', 'FileSaver.js'],
    name: 'Vehicle Inspection AI Platform',
    desc: 'AI-powered vehicle inspection reporting dashboard with interactive Chart.js visualizations, advanced filtering, and multi-format export (PDF/CSV). Full error handling and retry logic.',
    metrics: [{ val: 'PDF/CSV', label: 'Export' }, { val: 'AI', label: 'Integrated' }],
    url: null,
  },
  {
    num: '03',
    accent: 'linear-gradient(90deg, #6c47ff, #22d3ee)',
    stack: ['React.js', 'Redux', 'Tailwind', 'SuiteCRM'],
    name: 'Mahindra First Choice Website',
    desc: 'High-performance marketing website achieving perfect Core Web Vitals scores. Mobile-first approach with dynamic modals, multi-step progress tracking, and critical CSS inlining.',
    metrics: [{ val: '1.8s', label: 'LCP' }, { val: '14ms', label: 'FID' }, { val: '0.12', label: 'CLS' }],
    url: null,
  },
  {
    num: '04',
    accent: 'linear-gradient(90deg, #22d3ee, #f87171)',
    stack: ['JavaScript ES6', 'SVG', 'HTML5', 'Bootstrap'],
    name: 'Yard Management System (YMS)',
    desc: 'Dynamic fractional star rating system with SVG manipulation and CSS animations. Configuration-driven theming with dynamic labels, badges, and brand-aligned descriptions.',
    metrics: [{ val: 'SVG', label: 'Animated' }, { val: 'Config', label: 'Driven' }],
    url: null,
  },
  {
    num: '05',
    accent: 'linear-gradient(90deg, #f87171, #f59e0b)',
    stack: ['React', 'Claude AI', 'TypeScript', 'Vercel'],
    name: 'ATS Resume Optimizer',
    desc: 'AI-powered resume optimizer that analyzes job descriptions and rewrites resumes to pass ATS filters. Instant gap analysis in 30 seconds — achieving 3× higher interview rates.',
    metrics: [{ val: '3×', label: 'More Interviews' }, { val: '30s', label: 'Analysis' }, { val: 'AI', label: 'Powered' }],
    url: 'https://atsoptimizer-liard.vercel.app',
  },
  {
    num: '06',
    accent: 'linear-gradient(90deg, #a78bfa, #ec4899)',
    stack: ['React.js', 'TypeScript', 'Tailwind', 'Drag & Drop'],
    name: 'TaskBoard',
    desc: 'Clean, minimal task management board for organizing work items with an intuitive drag-and-drop interface and distraction-free design.',
    metrics: [{ val: 'DnD', label: 'Interface' }, { val: 'Clean', label: 'UI/UX' }],
    url: 'https://taskboard-taupe-five.vercel.app',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="px-5 py-16 md:px-12 md:py-28" style={{ background: 'var(--bg2)' }}>
      <div className="section-label">What I've built</div>
      <h2 className="section-title fade-in">Projects</h2>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}
      >
        {PROJECTS.map(({ num, accent, stack, name, desc, metrics, url }) => (
          <div key={num} className="project-card flex flex-col" style={{ minHeight: 340 }}>
            <div className="project-accent-bar" style={{ background: accent }} />
            <div className="project-num">{num}</div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {stack.map(t => <span key={t} className="tag">{t}</span>)}
            </div>

            <div
              className="font-display font-bold mb-3 leading-tight"
              style={{ fontSize: 20, color: 'var(--text)' }}
            >
              {name}
            </div>

            <p className="text-[13px] leading-loose flex-1" style={{ color: 'var(--muted)' }}>
              {desc}
            </p>

            <div
              className="flex gap-6 flex-wrap pt-5 mt-5"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              {metrics.map(({ val, label }) => (
                <div key={label}>
                  <div className="font-display font-bold text-lg leading-none" style={{ color: 'var(--accent)' }}>{val}</div>
                  <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--muted)' }}>{label}</div>
                </div>
              ))}

              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="project-live-link ml-auto self-center"
                >
                  View Live →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
