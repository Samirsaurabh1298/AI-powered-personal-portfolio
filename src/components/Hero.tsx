import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import AvatarHero from './AvatarHero'
import type { AnimatedStatProps } from '../types'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

async function notifyResumeDownload() {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: 'samirsaurabh.dev@gmail.com',
      subject: '🎉 Someone downloaded your resume!',
      timestamp,
      user_agent: navigator.userAgent,
      referrer: document.referrer || 'Direct visit',
      message: `Resume downloaded on ${timestamp}.`,
    })
  } catch (err) {
    console.warn('EmailJS notification failed:', err)
  }
}

const STATS: AnimatedStatProps[] = [
  { value: 4, suffix: '+', label: 'Years Experience', delay: 600 },
  { value: 300, suffix: 'K+', label: 'Monthly Users', delay: 700 },
  { value: 35, suffix: '%', label: 'Perf Improvement', delay: 800 },
  { value: 1.8, suffix: 's', label: 'LCP Achieved', delay: 900 },
]

function AnimatedStat({ value, suffix, label, delay }: AnimatedStatProps) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    const duration = 1500
    const start = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(eased * value)
      if (progress < 1) requestAnimationFrame(animate)
    }
    const timer = setTimeout(() => requestAnimationFrame(animate), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  const formatted = value % 1 !== 0
    ? displayed.toFixed(1)
    : Math.floor(displayed).toString()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      <div className="font-display font-extrabold text-3xl md:text-4xl leading-none" style={{ color: 'var(--accent)' }}>
        {formatted}{suffix}
      </div>
      <div className="text-[10px] md:text-[11px] uppercase tracking-widest mt-1" style={{ color: 'var(--muted)' }}>
        {label}
      </div>
    </motion.div>
  )
}

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
      <div className="absolute pointer-events-none" style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)', top: '50%', left: '40%', transform: 'translate(-50%,-50%)' }} />
      <div className="absolute pointer-events-none hidden md:block" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(123,97,255,0.07) 0%, transparent 70%)', top: '15%', right: '5%' }} />

      <div className="relative z-10 w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center" style={{ maxWidth: 1100 }}>

        {/* LEFT — text content */}
        <div>
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Available for opportunities
          </motion.div>

          <motion.h1
            className="font-display font-extrabold leading-none mb-5 md:mb-6"
            style={{ fontSize: 'clamp(44px, 8vw, 96px)', letterSpacing: '-3px' }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Samir
            <span className="hero-name-stroke" style={{ paddingRight: 4 }}>
              Saur<span style={{ color: 'var(--accent)', WebkitTextStroke: '0px' }}>abh</span>
            </span>
          </motion.h1>

          <motion.p
            className="font-serif italic mb-8 md:mb-10"
            style={{ fontSize: 'clamp(15px, 2.2vw, 22px)', color: 'var(--muted)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Frontend Engineer — React Specialist &amp; Performance Obsessive
          </motion.p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:flex md:gap-10 mb-10 md:mb-12">
            {STATS.map(({ value, suffix, label, delay }) => (
              <AnimatedStat key={label} value={value} suffix={suffix} label={label} delay={delay} />
            ))}
          </div>

          <motion.div
            className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <a href="#projects" className="btn-primary">View Projects →</a>
            <a href="#ai-chat" className="btn-secondary">💬 Full AI Chat</a>
            <a
              href="https://drive.google.com/file/d/1T1QPvhqMpnnSoBDuhAWGvkJPhu4lKeny/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="btn-resume"
              onClick={handleResumeClick}
            >
              {resumeLabel}
            </a>
          </motion.div>
        </div>

        {/* RIGHT — avatar + speech bubble */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <AvatarHero />
        </motion.div>
      </div>

      <div className="absolute hidden md:flex items-center gap-3 text-[11px] uppercase tracking-widest" style={{ bottom: 40, left: 48, color: 'var(--muted)' }}>
        <div className="scroll-line" />
        Scroll to explore
      </div>
    </section>
  )
}
