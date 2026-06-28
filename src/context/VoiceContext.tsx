import { createContext, useContext, useState, useRef, useCallback, useEffect, type ReactNode } from 'react'
import { useChat } from './ChatContext'

type VoiceState = 'idle' | 'greeting' | 'listening' | 'processing' | 'speaking'

export interface VoiceContextType {
  voiceState: VoiceState
  interimTranscript: string
  startVoiceExperience: () => void
  stopVoice: () => void
  isSupported: boolean
}

const VoiceCtx = createContext<VoiceContextType | null>(null)

export function useVoice(): VoiceContextType {
  const ctx = useContext(VoiceCtx)
  if (!ctx) throw new Error('useVoice must be used within VoiceProvider')
  return ctx
}

const GREETING = "Hey! I'm Samir. Welcome to my portfolio. I'm a Frontend Engineer with 4 years of experience in React and TypeScript, building apps for hundreds of thousands of users. Feel free to ask me anything about my work or projects!"

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

export function VoiceProvider({ children }: { children: ReactNode }) {
  const { sendMessage, messages, isStreaming } = useChat()

  const [voiceState, setVoiceState] = useState<VoiceState>('idle')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [isSupported] = useState(() =>
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) &&
    'speechSynthesis' in window
  )

  const voiceStateRef = useRef<VoiceState>('idle')
  const recognitionRef = useRef<any>(null)
  const hasStartedRef = useRef(false)
  const startListeningRef = useRef<() => void>(() => {})

  useEffect(() => { voiceStateRef.current = voiceState }, [voiceState])

  // Chrome SpeechSynthesis 15s cut-off bug workaround
  useEffect(() => {
    const id = setInterval(() => {
      if (voiceStateRef.current === 'speaking' && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause()
        window.speechSynthesis.resume()
      }
    }, 10000)
    return () => clearInterval(id)
  }, [])

  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel()
    const cleaned = stripMarkdown(text)
    if (!cleaned) return

    const utterance = new SpeechSynthesisUtterance(cleaned)
    utterance.lang = 'en-US'
    utterance.rate = 0.88
    utterance.pitch = 1.0
    utterance.volume = 1.0

    const voices = window.speechSynthesis.getVoices()
    const voice =
      voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('google')) ||
      voices.find(v => v.lang.startsWith('en'))
    if (voice) utterance.voice = voice

    setVoiceState('speaking')

    utterance.onend = () => {
      setTimeout(() => {
        if (voiceStateRef.current === 'speaking') startListeningRef.current()
      }, 500)
    }
    utterance.onerror = (e) => {
      if ((e as any).error !== 'interrupted') setVoiceState('idle')
    }

    window.speechSynthesis.speak(utterance)
  }, [])

  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current || !hasStartedRef.current) return

    const rec = recognitionRef.current
    setVoiceState('listening')
    setInterimTranscript('')

    rec.lang = 'en-US'
    rec.continuous = false
    rec.interimResults = true

    rec.onresult = (e: any) => {
      let interim = ''
      let final = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript
        if (e.results[i].isFinal) final += t
        else interim += t
      }
      setInterimTranscript(interim || final)
      if (final) {
        setInterimTranscript('')
        setVoiceState('processing')
        sendMessage(final)
      }
    }

    rec.onerror = (e: any) => {
      if (e.error === 'no-speech') {
        if (voiceStateRef.current === 'listening') {
          try { rec.start() } catch {}
        }
      } else if (e.error !== 'aborted') {
        setVoiceState('idle')
      }
    }

    rec.onend = () => {}

    try { rec.start() } catch {}
  }, [isSupported, sendMessage])

  useEffect(() => { startListeningRef.current = startListening }, [startListening])

  // Speak response when streaming finishes
  useEffect(() => {
    if (!isStreaming && voiceStateRef.current === 'processing') {
      const botMsgs = messages.filter(m => m.role === 'bot')
      const lastBot = botMsgs[botMsgs.length - 1]
      if (lastBot?.text) {
        setTimeout(() => {
          if (voiceStateRef.current === 'processing') speak(lastBot.text)
        }, 300)
      }
    }
  }, [isStreaming, messages, speak])

  const startVoiceExperience = useCallback(() => {
    if (!isSupported || hasStartedRef.current) return
    hasStartedRef.current = true

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    recognitionRef.current = new SpeechRec()
    setVoiceState('greeting')

    const doGreet = () => speak(GREETING)
    if (window.speechSynthesis.getVoices().length > 0) {
      doGreet()
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', doGreet, { once: true })
    }
  }, [isSupported, speak])

  const stopVoice = useCallback(() => {
    window.speechSynthesis.cancel()
    if (recognitionRef.current) {
      try { recognitionRef.current.abort() } catch {}
    }
    hasStartedRef.current = false
    recognitionRef.current = null
    setVoiceState('idle')
    setInterimTranscript('')
  }, [])

  return (
    <VoiceCtx.Provider value={{ voiceState, interimTranscript, startVoiceExperience, stopVoice, isSupported }}>
      {children}
    </VoiceCtx.Provider>
  )
}
