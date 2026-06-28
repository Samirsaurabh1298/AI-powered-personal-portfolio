import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import avatarImg from '../assets/samir-avatar.jpeg'
import { useChat } from '../context/ChatContext'
import { useVoice } from '../context/VoiceContext'
import type { TypewriterTextProps } from '../types'

const SUGGESTIONS = ['React performance?', 'Open to remote?', 'Core Web Vitals?', 'Side projects?']

const RING_COLORS: Record<string, string> = {
  idle: 'rgba(34,211,238,0)',
  greeting: 'rgba(34,211,238,0.65)',
  speaking: 'rgba(34,211,238,0.7)',
  listening: 'rgba(239,68,68,0.7)',
  processing: 'rgba(139,92,246,0.55)',
}

const RING_SPEEDS: Record<string, number> = {
  greeting: 1.2, speaking: 0.55, listening: 0.85, processing: 1.4,
}

const STATE_LABEL: Record<string, string> = {
  greeting: 'Speaking...', speaking: 'Speaking...',
  listening: 'Listening...', processing: 'Thinking...',
}

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
  const [showTextInput, setShowTextInput] = useState(false)

  const { sendMessage, isStreaming, messages } = useChat()
  const { voiceState, language, interimTranscript, startVoiceExperience, stopVoice, isSupported } = useVoice()

  const isVoiceActive = voiceState !== 'idle'
  const ringColor = RING_COLORS[voiceState] || RING_COLORS.idle
  const ringSpeed = RING_SPEEDS[voiceState] || 1.2
  const isSpeaking = voiceState === 'speaking' || voiceState === 'greeting'

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
      targetPos.current = {
        x: ((e.clientX - cx) / window.innerWidth) * 8,
        y: ((e.clientY - cy) / window.innerHeight) * 5,
      }
    }
    window.addEventListener('mousemove', handleMouse)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const loop = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.08)
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.08)
      if (eyeRef.current)
        eyeRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`
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
        setTimeout(() => { setIsBlinking(false); scheduleBlink() }, 150)
      }, delay)
    }
    scheduleBlink()
    return () => { if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current) }
  }, [])

  const handleSend = () => {
    if (miniInput.trim()) { sendMessage(miniInput); setMiniInput('') }
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const lastBotMsg = useMemo(() => messages.filter((m: any) => m.role === 'bot').slice(-1)[0], [messages])
  const showReply = messages.length > 1 && lastBotMsg

  return (
    <div className="flex flex-col items-center gap-0">
      {/* Avatar */}
      <div ref={containerRef} className="relative" style={{ width: 'min(220px, 80vw)', height: 'min(220px, 80vw)' }}>
        {/* Ambient base rings */}
        <div className="avatar-ring-1" />
        <div className="avatar-ring-2" />

        {/* Voice state ring (inner) */}
        {isVoiceActive && (
          <motion.div
            key={voiceState}
            animate={{ scale: [1, 1.1, 1], opacity: [0.85, 0.35, 0.85] }}
            transition={{ duration: ringSpeed, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', inset: -10, borderRadius: '50%',
              border: `2px solid ${ringColor}`,
              boxShadow: `0 0 24px ${ringColor}`,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Voice state ring (outer) */}
        {isVoiceActive && (
          <motion.div
            key={`${voiceState}-outer`}
            animate={{ scale: [1, 1.16, 1], opacity: [0.4, 0.06, 0.4] }}
            transition={{ duration: ringSpeed * 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
            style={{
              position: 'absolute', inset: -22, borderRadius: '50%',
              border: `1px solid ${ringColor}`,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Eye tracking + avatar image */}
        <div ref={eyeRef} style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', willChange: 'transform' }}>
          <motion.img
            src={avatarImg}
            alt="Samir Saurabh"
            fetchPriority="high"
            animate={
              isBlinking
                ? { scaleY: 0.08, scale: 1 }
                : isSpeaking
                  ? { scaleY: 1, scale: [1, 1.006, 0.997, 1.005, 1] }
                  : { scaleY: 1, scale: 1 }
            }
            transition={
              isBlinking
                ? { duration: 0.08 }
                : isSpeaking
                  ? { duration: 0.42, repeat: Infinity, repeatType: 'mirror' }
                  : { duration: 0.08 }
            }
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
              borderRadius: '50%',
              border: isVoiceActive ? `2px solid ${ringColor}` : '2px solid rgba(34,211,238,0.3)',
              boxShadow: isVoiceActive
                ? `0 0 40px ${ringColor}, 0 0 80px rgba(34,211,238,0.05)`
                : '0 0 40px rgba(34,211,238,0.15), 0 0 80px rgba(34,211,238,0.05)',
              display: 'block',
              transition: 'border-color 0.4s, box-shadow 0.4s',
            }}
          />
        </div>

        {/* Breathing wrapper */}
        <motion.div
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
          style={{ position: 'absolute', inset: -2, borderRadius: '50%', border: '2px solid rgba(34,211,238,0.2)', pointerEvents: 'none' }}
        />

        {/* Status badge */}
        <div className="avatar-status-badge">
          {isVoiceActive ? (
            <>
              <VoiceStateDot state={voiceState} />
              {STATE_LABEL[voiceState]}
            </>
          ) : (
            <>
              <div className="status-dot" />
              Online · Open to work
            </>
          )}
        </div>
      </div>

      {/* Speech bubble */}
      {showBubble && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="speech-bubble-card"
          style={{ maxWidth: 340, width: '100%', marginTop: 16 }}
        >
          <div className="bubble-tail" />

          {/* Dynamic content based on voice state */}
          <BubbleContent
            voiceState={voiceState}
            interimTranscript={interimTranscript}
            showReply={!!showReply}
            lastBotText={lastBotMsg?.text || ''}
            isStreaming={isStreaming}
          />

          {/* Voice active: controls row */}
          {isVoiceActive ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              <span style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {language === 'hi' ? '🎙 हिंदी' : '🎙 EN'}
              </span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {!showTextInput && (
                  <button
                    onClick={() => setShowTextInput(true)}
                    style={{ fontSize: 10, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
                  >
                    Type instead
                  </button>
                )}
                <button onClick={stopVoice} className="voice-stop-btn" aria-label="Stop voice mode">
                  ⏹ Stop
                </button>
              </div>
            </div>
          ) : (
            /* Idle: voice CTA + text fallback */
            <>
              {isSupported && (
                <button
                  onClick={startVoiceExperience}
                  className="meet-samir-btn"
                  aria-label="Start voice conversation"
                >
                  <MicIcon />
                  Click to meet me
                </button>
              )}
              <div className="mini-chat-input-row" style={{ marginTop: isSupported ? 6 : 0 }}>
                <input
                  type="text"
                  value={miniInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMiniInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isSupported ? 'Or type a question...' : 'Ask me anything...'}
                  disabled={isStreaming}
                  className="mini-chat-input"
                  aria-label="Ask Samir a question"
                />
                <button onClick={handleSend} disabled={isStreaming || !miniInput.trim()} className="mini-chat-send" aria-label="Send message">
                  ➤
                </button>
              </div>
            </>
          )}

          {/* Text input when voice mode is active */}
          {isVoiceActive && showTextInput && (
            <div className="mini-chat-input-row" style={{ marginTop: 8 }}>
              <input
                type="text"
                value={miniInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMiniInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                disabled={isStreaming}
                className="mini-chat-input"
                aria-label="Type a message"
              />
              <button onClick={handleSend} disabled={isStreaming || !miniInput.trim()} className="mini-chat-send" aria-label="Send">➤</button>
            </div>
          )}

          {/* Suggestion chips — idle, no reply */}
          {!isVoiceActive && !showReply && (
            <div className="chips-row">
              {SUGGESTIONS.map(s => (
                <button key={s} className="chip-btn" onClick={() => sendMessage(s)} disabled={isStreaming}>{s}</button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

function BubbleContent({ voiceState, interimTranscript, showReply, lastBotText, isStreaming }: {
  voiceState: string; interimTranscript: string; showReply: boolean; lastBotText: string; isStreaming: boolean
}) {
  if (voiceState === 'listening') {
    return (
      <div style={{ fontSize: 13, lineHeight: 1.6, minHeight: 36, marginBottom: 6 }}>
        {interimTranscript ? (
          <span style={{ color: 'var(--text)', fontStyle: 'italic' }}>"{interimTranscript}"</span>
        ) : (
          <span style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <MicPulse />
            <span>Listening — ask me anything</span>
          </span>
        )}
      </div>
    )
  }

  if (voiceState === 'processing') {
    return (
      <div style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8, minHeight: 36, marginBottom: 6 }}>
        <span>Thinking</span>
        <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
          <span className="typing-dot" style={{ width: 4, height: 4 }} />
          <span className="typing-dot" style={{ width: 4, height: 4, animationDelay: '0.2s' }} />
          <span className="typing-dot" style={{ width: 4, height: 4, animationDelay: '0.4s' }} />
        </span>
      </div>
    )
  }

  if (voiceState === 'greeting' || voiceState === 'speaking') {
    return (
      <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6, marginBottom: 6 }}>
        {showReply
          ? isStreaming
            ? <>{lastBotText}<span className="typing-cursor-inline" /></>
            : lastBotText
          : <TypewriterText text="Hey, I'm Samir 👋 Ask me anything about my work or experience!" />
        }
      </div>
    )
  }

  // idle
  if (showReply) {
    return (
      <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6, marginBottom: 10 }}>
        {isStreaming ? <>{lastBotText}<span className="typing-cursor-inline" /></> : lastBotText}
        {!isStreaming && (
          <div style={{ marginTop: 8 }}>
            <a href="#ai-chat" style={{ fontSize: 11, color: 'var(--accent)', textDecoration: 'none' }}>See full conversation ↓</a>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6, marginBottom: 10 }}>
      <TypewriterText text="Hey, I'm Samir 👋 Ask me anything about my work or experience!" />
    </div>
  )
}

function MicIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  )
}

function MicPulse() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.25, 1] }}
      transition={{ duration: 0.85, repeat: Infinity }}
      style={{ display: 'inline-flex', flexShrink: 0 }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      </svg>
    </motion.span>
  )
}

function VoiceStateDot({ state }: { state: string }) {
  const colors: Record<string, string> = {
    greeting: 'var(--accent)', speaking: 'var(--accent)',
    listening: '#ef4444', processing: '#a855f7',
  }
  return (
    <motion.div
      animate={{ opacity: [1, 0.35, 1] }}
      transition={{ duration: 0.75, repeat: Infinity }}
      style={{ width: 5, height: 5, borderRadius: '50%', flexShrink: 0, background: colors[state] || 'var(--accent)' }}
    />
  )
}

function TypewriterText({ text }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    let i = 0
    setDisplayed('')
    setDone(false)
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(id); setDone(true) }
    }, 28)
    return () => clearInterval(id)
  }, [text])
  return <span>{done ? text : displayed}{!done && <span className="typing-cursor-inline" />}</span>
}
