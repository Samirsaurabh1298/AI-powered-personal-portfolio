import { useState, useRef, useEffect } from 'react'

const GROK_API_KEY = import.meta.env.VITE_GROK_API_KEY

const SYSTEM_CONTEXT = `You are an AI assistant for Samir Saurabh's portfolio website. Answer questions about Samir in first person (as if you are him). Be concise, professional, and friendly. Keep answers under 100 words unless asked for details.

About Samir:
- Frontend Engineer with 3+ years of experience at Mahindra First Choice Wheels Ltd. (MFCWL), Bangalore
- Specializes in React.js, TypeScript, Core Web Vitals optimization, and design system architecture
- Built and maintained 4+ production React applications serving 300K+ monthly users
- Improved app performance by 35% through code splitting, lazy loading, memoization
- Achieved Core Web Vitals: LCP 1.8s, FID 14ms, CLS 0.12 — best-in-class metrics
- Architected reusable component library with 50+ TypeScript components (atomic design) — reduced dev time by 40%
- Led 15+ major feature deliveries in Agile cross-functional teams (UX, backend, QA)
- Tech stack: React.js (Hooks, Context API), Redux, TypeScript, JavaScript ES6+, Tailwind CSS, Material-UI, Bootstrap, Formik, Jest
- Tools: Git, Vite, Webpack, Chrome DevTools, Postman, Jira, AWS S3, AWS Amplify, Vercel, Netlify
- Projects: Ediig Auction Platform Revamp (real-time WebSocket), Vehicle Inspection AI Platform (Chart.js dashboards), MFCWL Website (CWV optimization), YMS (SVG fractional ratings)
- Education: B.Tech Computer Science, School of Research and Technology Bhopal, 2020
- Location: Bangalore, India
- Email: samirsaurabh.dev@gmail.com
- LinkedIn: linkedin.com/in/samirsaurabh
- Open to new opportunities`

const SUGGESTIONS = [
  "What's your experience with React performance optimization?",
  "Tell me about the projects you've shipped at scale",
  "What are your Core Web Vitals achievements?",
  "Are you open to new opportunities?",
  "What makes you different from other frontend devs?",
]

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hey there! 👋 I'm Samir's AI assistant. I know everything about his experience, skills, and projects. What would you like to know?", time: getTime() },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const messagesRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, loading])

  const sendMessage = async (text) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    setInput('')
    const userMsg = { role: 'user', text: trimmed, time: getTime() }
    setMessages(prev => [...prev, userMsg])
    const newHistory = [...history, { role: 'user', content: trimmed }]
    setHistory(newHistory)
    setLoading(true)

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_CONTEXT },
            ...newHistory,
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err?.error?.message || 'API error')
      }

      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that. Please try again!"
      setHistory(prev => [...prev, { role: 'assistant', content: reply }])
      setMessages(prev => [...prev, { role: 'bot', text: reply, time: getTime() }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: `Error: ${err.message}`, time: getTime() }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <section id="ai-chat" className="px-5 py-16 md:px-12 md:py-28" style={{ background: 'var(--bg)' }}>
      <div className="section-label">Powered by Groq AI</div>
      <h2 className="section-title fade-in">Ask Me<br />Anything</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        <div className="ai-intro fade-in">
          <p className="text-sm leading-loose mb-5" style={{ color: 'var(--muted)' }}>
            Instead of reading through my resume, just ask. This AI assistant knows everything about my experience, skills, projects, and what I bring to a team.
          </p>
          <p className="text-sm leading-loose mb-8" style={{ color: 'var(--muted)' }}>
            Ask it anything — from technical skills to what kind of teams I thrive in.
          </p>
          <div className="flex flex-col gap-2">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                className="ai-suggestion"
                onClick={() => sendMessage(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="chat-box">
          <div className="chat-header">
            <div className="chat-avatar">🤖</div>
            <div>
              <div className="font-display font-bold text-sm" style={{ color: 'var(--text)' }}>Samir's AI Assistant</div>
              <div className="chat-status">Online · Powered by Groq</div>
            </div>
          </div>

          <div className="chat-messages" ref={messagesRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.role}`}>
                <div className="msg-bubble">{msg.text}</div>
                <div className="msg-time">{msg.time}</div>
              </div>
            ))}
            {loading && (
              <div className="msg bot">
                <div className="typing-indicator">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-area">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="Ask anything about Samir..."
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onInput={e => {
                e.target.style.height = 'auto'
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px'
              }}
            />
            <button
              className="chat-send"
              onClick={() => sendMessage(input)}
              disabled={loading}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
