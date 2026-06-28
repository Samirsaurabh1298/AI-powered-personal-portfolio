export interface Message {
  role: 'user' | 'bot'
  text: string
  time: string
}

export interface ChatContextType {
  messages: Message[]
  sendMessage: (text: string) => Promise<void>
  isStreaming: boolean
  clearChat: () => void
}

export interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
}

export interface AnimatedStatProps {
  value: number
  suffix: string
  label: string
  delay: number
}

export interface TypewriterTextProps {
  text: string
}

export interface VoiceContextType {
  voiceState: 'idle' | 'greeting' | 'listening' | 'processing' | 'speaking'
  language: 'en' | 'hi'
  interimTranscript: string
  startVoiceExperience: () => void
  stopVoice: () => void
  isSupported: boolean
}
