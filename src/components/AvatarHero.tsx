import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import avatarImg from '../assets/samir-avatar.jpeg'
import { useChat } from '../context/ChatContext'
import type { TypewriterTextProps } from '../types'

const SUGGESTIONS = [
  'React performance?',
  'Open to remote?',
  'Core Web Vitals?',
  'Side projects?',
]

export default function AvatarHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const eyeRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number>(0)
  const currentPos = useRef({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const blinkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [isBlinking, setIsBlinking] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [miniInput, setMiniInput] = useState('')

  const { sendMessage, isStreaming, messages } = useChat()

  // Show bubble after 1.2s
  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 1200)
    return () => clearTimeout(t)
  }, [])

  // Eye tracking RAF loop
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / window.innerWidth
      const dy = (e.clientY - cy) / window.innerHeight
      targetPos.current = { x: dx * 8, y: dy * 5 }
    }
    window.addEventListener('mousemove', handleMouse)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const loop = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.08)
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.08)
      if (eyeRef.current) {
        eyeRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`
      }
      animFrameRef.current = requestAnimationFrame(loop)
    }
    animFrameRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', handleMouse)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  // Random blink
  useEffect(() => {
    const scheduleBlink = () => {
      const delay = 3000 + Math.random() * 3000
      blinkTimerRef.current = setTimeout(() => {
        setIsBlinking(true)
        setTimeout(() => {
          setIsBlinking(false)
          scheduleBlink()
        }, 150)
      }, delay)
    }
    scheduleBlink()
    return () => {
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current)
    }
  }, [])

  const handleSend = () => {
    if (miniInput.trim()) {
      sendMessage(miniInput)
      setMiniInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Latest bot reply (not the greeting)
  const lastBotMsg = messages.filter(m => m.role === 'bot').slice(-1)[0]
  const showReply = messages.length > 1 && lastBotMsg

  return (
    <div className="flex flex-col items-center gap-0">
      {/* Avatar */}
      <div ref={containerRef} className="relative" style={{ width: 'min(220px, 80vw)', height: 'min(220px, 80vw)' }}>
        {/* Pulsing rings */}
        <div className="avatar-ring-1" />
        <div className="avatar-ring-2" />

        {/* Eye tracking wrapper */}
        <div ref={eyeRef} style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', willChange: 'transform' }}>
          <motion.img
            src={avatarImg}
            alt="Samir Saurabh"
            fetchPriority="high"
            animate={{ scaleY: isBlinking ? 0.92 : 1 }}
            transition={{ duration: 0.08 }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              borderRadius: '50%',
              border: '2px solid rgba(34,211,238,0.3)',
              boxShadow: '0 0 40px rgba(34,211,238,0.15), 0 0 80px rgba(34,211,238,0.05)',
              display: 'block',
            }}
          />
        </div>

        {/* Breathing animation wrapper */}
        <motion.div
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
          style={{ position: 'absolute', inset: -2, borderRadius: '50%', border: '2px solid rgba(34,211,238,0.2)', pointerEvents: 'none' }}
        />

        {/* Status badge */}
        <div className="avatar-status-badge">
          <div className="status-dot" />
          Online · Open to work
        </div>
      </div>

      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="speech-bubble-card"
            style={{ maxWidth: 340, width: '100%', marginTop: 16 }}
          >
            {/* Bubble tail */}
            <div className="bubble-tail" />

            {showReply ? (
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6, marginBottom: 10 }}>
                {isStreaming
                  ? <>{lastBotMsg.text}<span className="typing-cursor-inline" /></>
                  : lastBotMsg.text
                }
                {!isStreaming && (
                  <div style={{ marginTop: 8 }}>
                    <a href="#ai-chat" style={{ fontSize: 11, color: 'var(--accent)', textDecoration: 'none' }}>
                      See full conversation ↓
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6, marginBottom: 10 }}>
                <TypewriterText text="Hey, I'm Samir 👋 Ask me anything about my work or experience!" />
              </div>
            )}

            {/* Mini chat input */}
            <div className="mini-chat-input-row">
              <input
                type="text"
                value={miniInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMiniInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={isStreaming}
                className="mini-chat-input"
                aria-label="Ask Samir a question"
              />
              <button
                onClick={handleSend}
                disabled={isStreaming || !miniInput.trim()}
                className="mini-chat-send"
                aria-label="Send message"
              >
                ➤
              </button>
            </div>

            {/* Suggestion chips */}
            {!showReply && (
              <div className="chips-row">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    className="chip-btn"
                    onClick={() => sendMessage(s)}
                    disabled={isStreaming}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function TypewriterText({ text }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let i = 0
    setDisplayed('')
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, 28)
    return () => clearInterval(interval)
  }, [text])
  return <span>{displayed}<span className="typing-cursor-inline" /></span>
}
