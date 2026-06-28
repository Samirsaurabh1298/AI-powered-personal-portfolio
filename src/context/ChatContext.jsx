import { createContext, useContext, useState, useRef, useCallback } from 'react'

const ChatContext = createContext(null)

const SYSTEM_CONTEXT_DEV = `You are an AI assistant for Samir Saurabh's portfolio. Answer in first person as Samir. Be concise and professional. Keep answers under 150 words unless asked for details. Use markdown for lists and emphasis when helpful.

About Samir: Frontend Engineer, 4+ years at Mahindra First Choice Wheels Ltd., Bangalore. React, TypeScript, Core Web Vitals expert. Built 4+ production apps for 300K+ monthly users. LCP 1.8s, FID 14ms, CLS 0.12. GitHub: https://github.com/Samirsaurabh1298. Open to remote opportunities.`

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function parseSSELine(line) {
  if (!line.startsWith('data: ')) return null
  const data = line.slice(6)
  if (data === '[DONE]') return null
  try {
    const json = JSON.parse(data)
    return json.choices?.[0]?.delta?.content || null
  } catch {
    return null
  }
}

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hey, I'm Samir 👋 Welcome to my portfolio. Ask me anything about my experience, skills, or projects!",
      time: getTime(),
    },
  ])
  const [isStreaming, setIsStreaming] = useState(false)
  const historyRef = useRef([])

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim()
    if (!trimmed || isStreaming) return

    const userMsg = { role: 'user', text: trimmed, time: getTime() }
    setMessages(prev => [...prev, userMsg])
    const newHistory = [...historyRef.current, { role: 'user', content: trimmed }]
    historyRef.current = newHistory
    setIsStreaming(true)

    const botPlaceholder = { role: 'bot', text: '', time: getTime() }
    setMessages(prev => [...prev, botPlaceholder])

    try {
      let res

      if (import.meta.env.DEV) {
        res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: SYSTEM_CONTEXT_DEV },
              ...newHistory,
            ],
            max_tokens: 800,
            temperature: 0.7,
            stream: true,
          }),
        })
      } else {
        res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newHistory }),
        })
      }

      if (!res.ok) throw new Error('API error')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop()
        for (const line of lines) {
          const content = parseSSELine(line.trim())
          if (content) {
            accumulated += content
            setMessages(prev => {
              const updated = [...prev]
              updated[updated.length - 1] = { ...updated[updated.length - 1], text: accumulated }
              return updated
            })
          }
        }
      }

      historyRef.current = [...newHistory, { role: 'assistant', content: accumulated }]
    } catch (err) {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          text: `Sorry, something went wrong. Please try again. (${err.message})`,
        }
        return updated
      })
    } finally {
      setIsStreaming(false)
    }
  }, [isStreaming])

  const clearChat = useCallback(() => {
    historyRef.current = []
    setMessages([{
      role: 'bot',
      text: "Hey, I'm Samir 👋 Welcome to my portfolio. Ask me anything about my experience, skills, or projects!",
      time: getTime(),
    }])
  }, [])

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isStreaming, clearChat }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used within ChatProvider')
  return ctx
}
