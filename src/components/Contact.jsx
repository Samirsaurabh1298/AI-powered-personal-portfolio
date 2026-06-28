import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID       = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_PUBLIC_KEY       = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_CONTACT_TEMPLATE = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID

const CONTACT_LINKS = [
  { icon: '✉', href: 'mailto:samirsaurabh.dev@gmail.com', label: 'samirsaurabh.dev@gmail.com' },
  { icon: 'in', href: 'https://linkedin.com/in/samirsaurabh', label: 'linkedin.com/in/samirsaurabh', external: true },
  { icon: '⌥', href: 'https://github.com/Samirsaurabh1298', label: 'github.com/Samirsaurabh1298', external: true },
  { icon: '✆', href: 'tel:+916200432657', label: '+91 6200432657' },
]

const INFO_CARDS = [
  { label: 'Location', value: 'Bangalore, India' },
  { label: 'Availability', value: 'Open to Opportunities', accent: true },
  { label: 'Education', value: 'B.Tech Computer Science', sub: 'School of Research and Technology, Bhopal · 2020' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CONTACT_TEMPLATE,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: 'samirsaurabh.dev@gmail.com',
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 6000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 8000)
    }
  }

  return (
    <section id="contact" className="px-5 py-16 md:px-12 md:py-28" style={{ background: 'var(--bg2)' }}>
      <div className="section-label">Get in touch</div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        Contact
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Left — links + info */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-4 mb-10">
            {CONTACT_LINKS.map(({ icon, href, label, external }) => (
              <a
                key={label}
                href={href}
                className="contact-link"
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <span className="contact-icon" aria-hidden="true">{icon}</span>
                <span>{label}</span>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-px" style={{ background: 'var(--border)', border: '1px solid var(--border)' }}>
            {INFO_CARDS.map(({ label, value, sub, accent }) => (
              <div key={label} style={{ background: 'var(--bg)', padding: '14px 16px' }}>
                <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>{label}</div>
                <div className="text-sm font-medium" style={{ color: accent ? 'var(--accent)' : 'var(--text)' }}>{value}</div>
                {sub && <div className="text-[11px] mt-0.5" style={{ color: 'var(--muted)' }}>{sub}</div>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — contact form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="contact-name" className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="contact-input"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="contact-input"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                required
                rows={5}
                className="contact-input"
                style={{ resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={status === 'sending'}
              style={{ alignSelf: 'flex-start', opacity: status === 'sending' ? 0.6 : 1 }}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message →'}
            </button>

            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: 'var(--color-success)', fontSize: 13 }}
              >
                ✓ Message sent! I'll reply within 24h.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: 'var(--color-danger)', fontSize: 13 }}
              >
                Something went wrong. Email me directly at samirsaurabh.dev@gmail.com
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
