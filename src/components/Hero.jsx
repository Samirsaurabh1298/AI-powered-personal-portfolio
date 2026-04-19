import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

async function notifyResumeDownload() {
  const now       = new Date()
  const timestamp = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  const userAgent = navigator.userAgent
  const referrer  = document.referrer || 'Direct visit'
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email:   'samirsaurabh.dev@gmail.com',
      subject:    '🎉 Someone downloaded your resume!',
      timestamp,
      user_agent: userAgent,
      referrer,
      message:    `Your resume was downloaded on ${timestamp}.\n\nBrowser: ${userAgent}\nReferrer: ${referrer}`,
    })
  } catch (err) {
    console.warn('EmailJS notification failed:', err)
  }
}

const STATS = [
  { num: '3+',    label: 'Years Experience' },
  { num: '300K+', label: 'Monthly Users' },
  { num: '35%',   label: 'Perf Improvement' },
  { num: '1.8s',  label: 'LCP Achieved' },
]

export default function Hero() {
  const [resumeLabel, setResumeLabel] = useState('↓ Download Resume')

  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
  }, [])

  const handleResumeClick = () => {
    setResumeLabel('↓ Opening...')
    notifyResumeDownload().finally(() => {
      setTimeout(() => setResumeLabel('↓ Download Resume'), 2000)
    })
  }

  return (
    <section id="home" className="hero-section relative flex items-center overflow-hidden">
      <div className="hero-grid" />
      <div className="absolute pointer-events-none" style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      <div className="absolute pointer-events-none hidden md:block" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(123,97,255,0.08) 0%, transparent 70%)', top: '20%', right: '10%' }} />

      <div className="relative z-10 w-full" style={{ maxWidth: 900 }}>
        <div className="hero-badge">Available for opportunities</div>

        <h1
          className="font-display font-extrabold leading-none mb-5 md:mb-6"
          style={{ fontSize: 'clamp(44px, 10vw, 110px)', letterSpacing: '-2px', animation: 'fadeUp 0.8s 0.1s ease both' }}
        >
          Samir
          <span className="hero-name-stroke">
            Saur<span style={{ color: 'var(--accent)', WebkitTextStroke: 0 }}>abh</span>
          </span>
        </h1>

        <p
          className="font-serif italic mb-8 md:mb-10"
          style={{ fontSize: 'clamp(15px, 2.5vw, 26px)', color: 'var(--muted)', animation: 'fadeUp 0.8s 0.2s ease both' }}
        >
          Frontend Engineer — React Specialist &amp; Performance Obsessive
        </p>

        {/* Stats — 2 col on mobile, row on desktop */}
        <div
          className="grid grid-cols-2 gap-x-8 gap-y-5 md:flex md:gap-12 mb-10 md:mb-12"
          style={{ animation: 'fadeUp 0.8s 0.3s ease both' }}
        >
          {STATS.map(({ num, label }) => (
            <div key={label}>
              <div className="font-display font-extrabold text-3xl md:text-4xl leading-none" style={{ color: 'var(--accent)' }}>{num}</div>
              <div className="text-[10px] md:text-[11px] uppercase tracking-widest mt-1" style={{ color: 'var(--muted)' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Buttons — stacked on mobile, row on desktop */}
        <div
          className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4"
          style={{ animation: 'fadeUp 0.8s 0.4s ease both' }}
        >
          <a href="#projects" className="btn-primary">View Projects →</a>
          <a href="#ai-chat" className="btn-secondary">🤖 Ask AI About Me</a>
          <a
            href="https://drive.google.com/file/d/1T1QPvhqMpnnSoBDuhAWGvkJPhu4lKeny/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="btn-resume"
            onClick={handleResumeClick}
          >
            {resumeLabel}
          </a>
        </div>
      </div>

      {/* Scroll hint — desktop only */}
      <div
        className="absolute hidden md:flex items-center gap-3 text-[11px] uppercase tracking-widest"
        style={{ bottom: 40, left: 48, color: 'var(--muted)', animation: 'fadeUp 1s 0.6s ease both' }}
      >
        <div className="scroll-line" />
        Scroll to explore
      </div>
    </section>
  )
}
