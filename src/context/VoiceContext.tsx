import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { useChat } from './ChatContext'
import type { VoiceContextType } from '../types'

export type { VoiceContextType }

const VoiceCtx = createContext<VoiceContextType | null>(null)

export function useVoice(): VoiceContextType {
  const ctx = useContext(VoiceCtx)
  if (!ctx) throw new Error('useVoice must be used within VoiceProvider')
  return ctx
}

const GREETING =
  "Hey! I'm Samir. Welcome to my portfolio! I'm a Frontend Engineer with 4 years of experience in React and TypeScript. I've built apps used by over 300 thousand users every month. Feel free to ask me anything about my work, projects, or skills!"

function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n+/g, ' ')
    .trim()
}

// Research-backed male voice selection — priority order from most to least preferred
function selectMaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const maleNames = ['male', 'david', 'mark', 'guy', 'daniel', 'alex', 'fred', 'arthur', 'ryan', 'tom', 'james']
  return (
    voices.find(v => v.name === 'Google UK English Male') ||
    voices.find(v => v.lang.startsWith('en') && maleNames.some(k => v.name.toLowerCase().includes(k))) ||
    voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('google')) ||
    voices.find(v => v.lang.startsWith('en')) ||
    null
  )
}

// Load voices async — getVoices() returns [] on first call until voiceschanged fires
function waitForVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise(resolve => {
    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) { resolve(voices); return }
    const handler = () => resolve(window.speechSynthesis.getVoices())
    window.speechSynthesis.addEventListener('voiceschanged', handler, { once: true })
    // Fallback: some browsers never fire voiceschanged
    setTimeout(() => resolve(window.speechSynthesis.getVoices()), 1500)
  })
}

export function VoiceProvider({ children }: { children: ReactNode }) {
  const { sendMessage, messages, isStreaming } = useChat()

  const [voiceState, setVoiceState] = useState<VoiceContextType['voiceState']>('idle')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [isSupported] = useState(() =>
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) &&
    'speechSynthesis' in window
  )

  // Refs — prevent stale closures and GC issues
  const voiceStateRef = useRef<VoiceContextType['voiceState']>('idle')
  const hasStartedRef = useRef(false)
  const maleVoiceRef = useRef<SpeechSynthesisVoice | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null) // prevents GC killing onend
  const startListeningRef = useRef<() => void>(() => {})
  const processingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const setState = useCallback((s: VoiceContextType['voiceState']) => {
    voiceStateRef.current = s
    setVoiceState(s)
  }, [])

  // Keep ref in sync with state for use inside callbacks
  useEffect(() => { voiceStateRef.current = voiceState }, [voiceState])

  // Chrome 15s TTS cut-off workaround — pause/resume every 10s while speaking
  useEffect(() => {
    const id = setInterval(() => {
      if (voiceStateRef.current === 'speaking' && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause()
        window.speechSynthesis.resume()
      }
    }, 10_000)
    return () => clearInterval(id)
  }, [])

  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel()

    const cleaned = stripMarkdown(text)
    if (!cleaned) {
      startListeningRef.current()
      return
    }

    // Research fix: always create a NEW utterance — never reuse (Firefox reuse bug)
    // Research fix: store in ref — prevents GC from killing onend before it fires
    const utterance = new SpeechSynthesisUtterance(cleaned)
    utteranceRef.current = utterance

    utterance.lang = 'en-US'
    utterance.rate = 0.88
    utterance.pitch = 0.85
    utterance.volume = 1.0
    if (maleVoiceRef.current) utterance.voice = maleVoiceRef.current

    setState('speaking')

    utterance.onend = () => {
      utteranceRef.current = null
      // Small delay before restarting listening — avoids Chrome race condition
      setTimeout(() => {
        if (voiceStateRef.current === 'speaking') startListeningRef.current()
      }, 400)
    }

    utterance.onerror = (e) => {
      utteranceRef.current = null
      // 'interrupted' fires when we call cancel() — not a real error
      if ((e as any).error === 'interrupted') return
      setTimeout(() => {
        if (voiceStateRef.current === 'speaking') startListeningRef.current()
      }, 400)
    }

    // Research fix: setTimeout after cancel() before speak() — Firefox cancel+speak bug
    // where new utterance is silently discarded if spoken synchronously after cancel
    setTimeout(() => window.speechSynthesis.speak(utterance), 50)
  }, [setState])

  const startListening = useCallback(() => {
    if (!isSupported || !hasStartedRef.current) return

    // Research fix: create a FRESH instance every cycle
    // Reusing the same object causes zombie state on Android Chrome
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const rec = new SpeechRec()

    // Research finding: continuous: true is broken on Android Chrome
    // (onend never fires, recognition stalls after first result)
    // Correct pattern: continuous: false + restart in onend
    rec.lang = 'en-US'
    rec.continuous = false
    rec.interimResults = true
    rec.maxAlternatives = 1

    setState('listening')
    setInterimTranscript('')

    let finalSent = false // guard against double-processing

    rec.onresult = (e: any) => {
      let interim = ''
      let final = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript
        if (e.results[i].isFinal) final += t
        else interim += t
      }
      setInterimTranscript(interim || final)

      if (final && !finalSent) {
        finalSent = true
        setInterimTranscript('')
        setState('processing')

        // Safety timeout: if API hangs in processing, reset to listening after 30s
        processingTimerRef.current = setTimeout(() => {
          if (voiceStateRef.current === 'processing') setState('listening')
        }, 30_000)

        sendMessage(final)
      }
    }

    rec.onerror = (e: any) => {
      switch (e.error) {
        case 'no-speech':
          // Chrome fires this after ~7s silence — restart recognition
          setTimeout(() => {
            if (voiceStateRef.current === 'listening') startListeningRef.current()
          }, 200)
          break
        case 'aborted':
          // We called rec.abort() intentionally — do nothing
          break
        case 'not-allowed':
        case 'service-not-allowed':
          // Mic permission denied or Speech API blocked — give up
          setState('idle')
          break
        case 'network':
          // Google speech server error — retry once after delay
          setTimeout(() => {
            if (voiceStateRef.current === 'listening') startListeningRef.current()
          }, 1000)
          break
        default:
          setState('idle')
      }
    }

    // Research fix: onend fires when continuous: false recognition ends naturally
    // If finalSent is true, processing/speaking takes over — don't restart
    // If finalSent is false and still listening, restart (covers no-speech + session timeout)
    rec.onend = () => {
      if (!finalSent && voiceStateRef.current === 'listening') {
        // Research: call start() inside onend via setTimeout — direct call crashes some Chrome versions
        setTimeout(() => {
          if (voiceStateRef.current === 'listening') startListeningRef.current()
        }, 100)
      }
    }

    try {
      rec.start()
    } catch {
      // InvalidStateError if called while still starting — ignore
    }
  }, [isSupported, sendMessage, setState])

  useEffect(() => { startListeningRef.current = startListening }, [startListening])

  // Speak AI response when streaming finishes
  useEffect(() => {
    if (!isStreaming && voiceStateRef.current === 'processing') {
      if (processingTimerRef.current) {
        clearTimeout(processingTimerRef.current)
        processingTimerRef.current = null
      }
      const botMsgs = messages.filter(m => m.role === 'bot')
      const last = botMsgs[botMsgs.length - 1]
      if (last?.text) {
        setTimeout(() => {
          if (voiceStateRef.current === 'processing') speak(last.text)
        }, 300)
      }
    }
  }, [isStreaming, messages, speak])

  const startVoiceExperience = useCallback(async () => {
    if (!isSupported || hasStartedRef.current) return
    hasStartedRef.current = true

    // Preload male voice once — avoids getVoices() returning [] on subsequent speak() calls
    const voices = await waitForVoices()
    maleVoiceRef.current = selectMaleVoice(voices)

    setState('greeting')
    speak(GREETING)
  }, [isSupported, speak, setState])

  const stopVoice = useCallback(() => {
    if (processingTimerRef.current) {
      clearTimeout(processingTimerRef.current)
      processingTimerRef.current = null
    }
    window.speechSynthesis.cancel()
    utteranceRef.current = null
    hasStartedRef.current = false
    setState('idle')
    setInterimTranscript('')
  }, [setState])

  return (
    <VoiceCtx.Provider value={{ voiceState, interimTranscript, startVoiceExperience, stopVoice, isSupported }}>
      {children}
    </VoiceCtx.Provider>
  )
}
