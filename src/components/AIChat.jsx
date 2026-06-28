import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useChat } from '../context/ChatContext'

const SUGGESTIONS = [
  "What's your experience with React performance optimization?",
  "Tell me about the projects you've shipped at scale",
  "What are your Core Web Vitals achievements?",
  "Are you open to new opportunities?",
  "What makes you different from other frontend devs?",
]

export default function AIChat() {
  const { messages, sendMessage, isStreaming, clearChat } = useChat()
  const [input, setInput] = useState('')
  const messagesRef = useRef(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, isStreaming])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed || isStreaming) return
    sendMessage(trimmed)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <section id="ai-chat" className="px-5 py-16 md:px-12 md:py-28" style={{ background: 'var(--bg)' }}>
      <div className="section-label">Powered by Groq AI</div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        Ask Me<br />Anything
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm leading-loose mb-5" style={{ color: 'var(--muted)' }}>
            Instead of reading through my resume, just ask. This AI assistant knows everything about my experience, skills, projects, and what I bring to a team.
          </p>
          <p className="text-sm leading-loose mb-8" style={{ color: 'var(--muted)' }}>
            Conversation started in the hero carries over here. Ask follow-up questions naturally.
          </p>
          <div className="flex flex-col gap-2">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                className="ai-suggestion"
                onClick={() => sendMessage(s)}
                disabled={isStreaming}
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="chat-box"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="chat-header">
            <div className="chat-avatar">🤖</div>
            <div style={{ flex: 1 }}>
              <div className="font-display font-bold text-sm" style={{ color: 'var(--text)' }}>Samir's AI Assistant</div>
              <div className="chat-status">
                {isStreaming ? 'Samir is typing...' : 'Online · Powered by Groq'}
              </div>
            </div>
            <button
              onClick={clearChat}
              style={{ fontSize: 11, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' }}
              title="Clear conversation"
            >
              Clear
            </button>
          </div>

          <div className="chat-messages" ref={messagesRef}>
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`msg ${msg.role}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="msg-bubble">
                    {msg.role === 'bot' ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => <p style={{ margin: '0 0 6px' }}>{children}</p>,
                          ul: ({ children }) => <ul style={{ paddingLeft: 18, margin: '6px 0' }}>{children}</ul>,
                          ol: ({ children }) => <ol style={{ paddingLeft: 18, margin: '6px 0' }}>{children}</ol>,
                          li: ({ children }) => <li style={{ marginBottom: 3 }}>{children}</li>,
                          strong: ({ children }) => <strong style={{ color: 'var(--accent)' }}>{children}</strong>,
                          code: ({ children }) => {
                            const content = String(children).replace(/\n$/, '')
                            return content.includes('\n')
                              ? <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '10px', borderRadius: 6, overflowX: 'auto', fontSize: '0.85em', margin: '6px 0' }}><code>{content}</code></pre>
                              : <code style={{ background: 'var(--tag-bg)', padding: '1px 5px', borderRadius: 3, fontSize: '0.9em' }}>{content}</code>
                          },
                        }}
                      >
                        {msg.text || ''}
                      </ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                    {isStreaming && i === messages.length - 1 && msg.role === 'bot' && (
                      <span className="typing-cursor-inline" />
                    )}
                  </div>
                  <div className="msg-time">{msg.time}</div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isStreaming && messages[messages.length - 1]?.role !== 'bot' && (
              <div className="msg bot">
                <div className="typing-indicator">
                  <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-area">
            <textarea
              className="chat-input"
              placeholder="Ask anything about Samir..."
              aria-label="Ask the AI assistant a question"
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onInput={e => {
                e.target.style.height = 'auto'
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px'
              }}
              disabled={isStreaming}
            />
            <button
              className="chat-send"
              onClick={handleSend}
              disabled={isStreaming || !input.trim()}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
