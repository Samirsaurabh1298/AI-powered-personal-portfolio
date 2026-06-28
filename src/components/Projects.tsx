import { motion } from 'framer-motion'

interface Metric { val: string; label: string }

interface Project {
  num: string
  accent: string
  stack: string[]
  name: string
  desc: string
  challenge: string
  approach: string
  metrics: Metric[]
  nda: boolean
  url: string | null
}

const PROJECTS: Project[] = [
  // ── Featured (live, public) ──────────────────────────────────────
  {
    num: '01',
    accent: 'linear-gradient(90deg, #f87171, #f59e0b)',
    stack: ['React', 'Claude AI', 'TypeScript', 'Vercel'],
    name: 'ATS Resume Optimizer',
    desc: 'AI resume optimizer that analyzes job descriptions and rewrites resumes to pass ATS filters — not keyword-stuffing, actual semantic rewriting.',
    challenge: 'Most ATS tools keyword-stuff. Getting AI to understand requirement context and rewrite resume sections coherently — not just inject words — was the real engineering problem.',
    approach: 'Claude AI for semantic gap analysis with streaming output. JD parser extracts requirement intent; AI cross-references resume sections and rewrites each with context-aware improvements.',
    metrics: [{ val: '3×', label: 'Interview Rate' }, { val: '30s', label: 'Analysis' }, { val: 'Live', label: 'Production' }],
    nda: false,
    url: 'https://atsoptimizer-liard.vercel.app',
  },
  {
    num: '02',
    accent: 'linear-gradient(90deg, #a78bfa, #ec4899)',
    stack: ['React.js', 'TypeScript', 'Tailwind CSS', 'DnD API'],
    name: 'TaskBoard',
    desc: 'Minimal Kanban that gets out of your way — no bloat, no feature-creep. Just the interface you need to ship.',
    challenge: 'Most task managers try to do everything and end up usable for nothing. The design constraint: maximum usefulness with minimum interface surface area.',
    approach: 'React DnD with full keyboard support, optimistic localStorage persistence, TypeScript discriminated unions for card state. Zero external UI dependencies — every pixel deliberate.',
    metrics: [{ val: 'Zero', label: 'UI Deps' }, { val: '100%', label: 'Keyboard' }, { val: 'Live', label: 'Production' }],
    nda: false,
    url: 'https://taskboard-taupe-five.vercel.app',
  },

  {
    num: '03',
    accent: 'linear-gradient(90deg, #06b6d4, #0ea5e9)',
    stack: ['React', 'TypeScript', 'LLM APIs', 'Tailwind CSS'],
    name: 'Vynora — AI-Native HR Platform',
    desc: 'Not another HRMS — every module, every workflow, every interaction powered by real-time LLM intelligence. 20 live modules covering Skills Gap Analysis, Interview Copilot, Bias Detection, Policy Q&A, Wellbeing Insights, and more. Built for Mahindra.',
    challenge: 'Every module had to run on live LLM intelligence, not canned rules — Skills Gap, Wellbeing Insights, Bias Detection all need context from each other. Getting 20 modules to share streaming AI state without latency kills the experience.',
    approach: 'Streaming LLM responses across all modules with a shared intelligence layer. 100% in-house infrastructure (Data Never Leaves), DPDP-compliant — responses are generated from internal context, not sent to third-party clouds.',
    metrics: [{ val: '20', label: 'Live Modules' }, { val: 'LLM', label: 'Every Feature' }, { val: 'DPDP', label: 'Compliant' }],
    nda: false,
    url: 'https://vynora-wheat.vercel.app/',
  },
  {
    num: '04',
    accent: 'linear-gradient(90deg, #10b981, #06b6d4)',
    stack: ['React', 'TypeScript', 'Jira API', 'Vercel'],
    name: 'Qalyst',
    desc: 'Jira-connected AI platform that eliminates all non-code writing. Developers get AI implementation plans. QA gets AI test scenarios. Results sync back to Jira automatically — no planning docs, no test spreadsheets, no context switching.',
    challenge: 'Planning docs and test spreadsheets exist because writing them is unavoidable — but they don\'t ship features. Making AI-generated plans accurate enough that devs actually trust them, not just use them as a starting point to rewrite.',
    approach: 'Jira OAuth loads active sprint tickets for the whole team. AI reads ticket descriptions and generates implementation plans (files to change, edge cases) and test scenarios (happy path, error states, edge cases). Results post back as formatted Jira comments — full traceability from ticket to result.',
    metrics: [{ val: 'Jira', label: 'Connected' }, { val: 'AI', label: 'Plans + Tests' }, { val: 'Zero', label: 'Manual Writing' }],
    nda: false,
    url: 'https://autoqa-coral.vercel.app/login',
  },

  // ── Production @ scale (NDA) ─────────────────────────────────────
  {
    num: '05',
    accent: 'linear-gradient(90deg, #22d3ee, #3b82f6)',
    stack: ['React.js', 'Redux', 'Tailwind', 'WebSocket'],
    name: 'Ediig Auction Platform',
    desc: 'Real-time auction platform rebuilt from scratch — live bidding, synchronized countdowns, complex global state.',
    challenge: 'Keeping bid state synchronized across concurrent users with zero desync — countdown timers can\'t drift, bids can\'t collide under high event frequency.',
    approach: 'WebSocket pub/sub with optimistic UI + server-authoritative reconciliation. Debounced countdown timers and race condition guards eliminate collisions at scale.',
    metrics: [{ val: '45%', label: 'Perf Boost' }, { val: '30%', label: 'Engagement ↑' }, { val: '20%', label: 'Bounce ↓' }],
    nda: true,
    url: null,
  },
  {
    num: '06',
    accent: 'linear-gradient(90deg, #3b82f6, #6c47ff)',
    stack: ['React.js', 'Chart.js', 'Axios', 'FileSaver.js'],
    name: 'Vehicle Inspection AI Platform',
    desc: 'AI-powered inspection reporting dashboard with interactive visualizations, advanced filtering, and multi-format export.',
    challenge: 'Multi-filter dashboards with AI-generated content needed consistent formatting across PDF and CSV exports — data integrity across format transforms at scale.',
    approach: 'Virtualized tables with lazy pagination, Chart.js config abstraction layer, FileSaver.js streaming for large exports. AI via REST with structured JSON schemas for predictable output.',
    metrics: [{ val: 'PDF/CSV', label: 'Export' }, { val: 'AI', label: 'Integrated' }, { val: '300K+', label: 'Users' }],
    nda: true,
    url: null,
  },
  {
    num: '07',
    accent: 'linear-gradient(90deg, #6c47ff, #22d3ee)',
    stack: ['React.js', 'Redux', 'Tailwind', 'SuiteCRM'],
    name: 'Mahindra First Choice Website',
    desc: 'High-performance marketing website with industry-leading Core Web Vitals — the result of systematically hunting every millisecond.',
    challenge: 'Content-heavy marketing site with images and third-party scripts needed LCP < 2s — load order of 8+ resource types had to be precisely orchestrated.',
    approach: 'Critical CSS inlining, preconnect/preload hints, lazy hydration, aggressive bundle splitting, image optimization pipeline. Every delta traced in DevTools.',
    metrics: [{ val: '1.8s', label: 'LCP' }, { val: '14ms', label: 'FID' }, { val: '0.12', label: 'CLS' }],
    nda: true,
    url: null,
  },
  {
    num: '08',
    accent: 'linear-gradient(90deg, #22d3ee, #f87171)',
    stack: ['JavaScript ES6', 'SVG', 'HTML5', 'CSS Custom Props'],
    name: 'Yard Management System (YMS)',
    desc: 'Dynamic fractional star ratings and complex UI theming — one codebase, multiple brand contexts, zero code forks.',
    challenge: 'Fractional star ratings with multiple visual states had to work consistently across brand variants from a single config — no code duplication per brand.',
    approach: 'Pure SVG manipulation with CSS custom properties for theming. Config-driven architecture means zero code changes for new brands — just a JSON update.',
    metrics: [{ val: 'SVG', label: 'Animated' }, { val: '1 src', label: 'N brands' }, { val: 'Config', label: 'Driven' }],
    nda: true,
    url: null,
  },
]

const featured = PROJECTS.filter(p => !p.nda)
const production = PROJECTS.filter(p => p.nda)

export default function Projects() {
  return (
    <section id="projects" className="px-5 py-16 md:px-12 md:py-28" style={{ background: 'var(--bg2)' }}>
      <div className="section-label">What I've built</div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h2>

      {/* ── Featured live projects ── */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginBottom: 1 }}>
        {featured.map(({ num, accent, stack, name, desc, challenge, approach, metrics, url }, index) => (
          <ProjectCard
            key={num}
            num={num} accent={accent} stack={stack} name={name} desc={desc}
            challenge={challenge} approach={approach} metrics={metrics}
            nda={false} url={url} index={index} featured
          />
        ))}
      </div>

      {/* ── Production @ scale divider ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '24px 0 0', marginBottom: 1 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
          Production @ Scale · NDA Protected
        </div>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      {/* ── NDA production work ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
        {production.map(({ num, accent, stack, name, desc, challenge, approach, metrics, url }, index) => (
          <ProjectCard
            key={num}
            num={num} accent={accent} stack={stack} name={name} desc={desc}
            challenge={challenge} approach={approach} metrics={metrics}
            nda url={url} index={index}
          />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ num, accent, stack, name, desc, challenge, approach, metrics, nda, url, index, featured = false }: {
  num: string; accent: string; stack: string[]; name: string; desc: string
  challenge: string; approach: string; metrics: Metric[]
  nda: boolean; url: string | null; index: number; featured?: boolean
}) {
  return (
    <motion.div
      className="project-card flex flex-col"
      style={{ minHeight: featured ? 400 : 340 }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 2) * 0.1 }}
      whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(34,211,238,0.09)', transition: { duration: 0.22 } }}
    >
      <div className="project-accent-bar" style={{ background: accent }} />
      <div className="project-num">{num}</div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {stack.map(t => <span key={t} className="tag">{t}</span>)}
        {nda ? (
          <span className="tag" style={{ borderColor: 'rgba(248,113,113,0.4)', color: '#f87171', background: 'rgba(248,113,113,0.06)' }}>NDA</span>
        ) : (
          <span className="tag" style={{ borderColor: 'rgba(74,222,128,0.4)', color: '#4ade80', background: 'rgba(74,222,128,0.06)' }}>Live</span>
        )}
      </div>

      <div className="font-display font-bold leading-tight mb-2" style={{ fontSize: featured ? 22 : 19, color: 'var(--text)' }}>
        {name}
      </div>

      <p className="text-[13px] leading-loose mb-4" style={{ color: 'var(--muted)' }}>{desc}</p>

      {/* Engineering story */}
      <div className="flex flex-col gap-3 flex-1" style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
        <div>
          <div className="text-[10px] uppercase tracking-widest mb-1.5 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
            <span>⚡</span> The Challenge
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: 'var(--muted)' }}>{challenge}</p>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest mb-1.5 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
            <span>⚙</span> My Approach
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: 'var(--muted)' }}>{approach}</p>
        </div>
      </div>

      {/* Metrics + link */}
      <div className="flex gap-5 flex-wrap items-center pt-4 mt-4" style={{ borderTop: '1px solid var(--border)' }}>
        {metrics.map(({ val, label }) => (
          <div key={label}>
            <div className="font-display font-bold text-base leading-none" style={{ color: 'var(--accent)' }}>{val}</div>
            <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--muted)' }}>{label}</div>
          </div>
        ))}
        {url && (
          <a href={url} target="_blank" rel="noreferrer" className="project-live-link ml-auto">
            View Live →
          </a>
        )}
        {nda && (
          <span className="text-[11px] ml-auto" style={{ color: 'rgba(248,113,113,0.5)' }}>Internal · Not public</span>
        )}
      </div>
    </motion.div>
  )
}
