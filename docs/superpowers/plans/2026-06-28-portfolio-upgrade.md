# Portfolio Upgrade — 10/10 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio from 6.5/10 to 10/10 with an AI-native avatar hero, Framer Motion animations, full SEO, streaming AI chat, and a working contact form.

**Architecture:** Single-page React 18 + Vite app. New `ChatContext` shares AI conversation state between the Hero mini-chat and the full AI Chat section. A Vercel Edge Function proxies Groq API calls server-side so no API key is exposed in the client bundle. Framer Motion replaces all CSS IntersectionObserver animations.

**Tech Stack:** React 18, Vite, Tailwind CSS, Framer Motion, react-markdown, remark-gfm, @emailjs/browser, Vercel Edge Functions, Groq API (llama-3.3-70b-versatile)

---

## Task 1: Install Dependencies + Photo Asset

**Files:**
- Modify: `package.json`
- Create: `src/assets/` (directory)
- Manual: add photo to `src/assets/samir-avatar.jpg`

- [ ] **Step 1: Install new packages**

```bash
cd "c:/samir/AI-powered-personal-portfolio"
npm install framer-motion react-markdown remark-gfm
```

Expected output: 3 packages added, no peer dependency warnings.

- [ ] **Step 2: Add your photo**

Copy your professional headshot (the navy blazer photo) into the project:
```
src/assets/samir-avatar.jpg
```

If you need to remove the background first, use https://remove.bg — free, takes 10 seconds. Save the result as `src/assets/samir-avatar.jpg` (background removal is optional; the circular mask hides the gray background naturally).

- [ ] **Step 3: Verify install**

```bash
npm run dev
```

Expected: dev server starts, no errors in terminal. Close with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/assets/
git commit -m "feat: install framer-motion, react-markdown, remark-gfm; add avatar photo"
```

---

## Task 2: SEO — index.html + Static Files

**Files:**
- Modify: `index.html`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`

- [ ] **Step 1: Replace index.html with full SEO version**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Primary -->
  <title>Samir Saurabh — Frontend Engineer | React, TypeScript, Core Web Vitals</title>
  <meta name="description" content="Samir Saurabh — Frontend Engineer specializing in React, TypeScript, and Core Web Vitals optimization. 3+ years building apps for 300K+ monthly users. LCP 1.8s. Open to remote opportunities." />
  <meta name="keywords" content="Frontend Engineer, React Developer, TypeScript, Bangalore, Remote, Core Web Vitals, Samir Saurabh" />
  <meta name="author" content="Samir Saurabh" />
  <link rel="canonical" href="https://samirsaurabh1298.vercel.app" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Samir Saurabh — Frontend Engineer" />
  <meta property="og:description" content="React specialist with 3+ years building apps for 300K+ monthly users. Core Web Vitals: LCP 1.8s, FID 14ms. Open to remote opportunities." />
  <meta property="og:image" content="/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://samirsaurabh1298.vercel.app" />
  <meta property="og:site_name" content="Samir Saurabh Portfolio" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Samir Saurabh — Frontend Engineer" />
  <meta name="twitter:description" content="React specialist · 300K+ users · LCP 1.8s · Open to remote opportunities" />
  <meta name="twitter:image" content="/og-image.png" />

  <!-- JSON-LD Person Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Samir Saurabh",
    "jobTitle": "Frontend Engineer",
    "url": "https://samirsaurabh1298.vercel.app",
    "email": "samirsaurabh.dev@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://linkedin.com/in/samirsaurabh",
      "https://github.com/Samirsaurabh1298"
    ],
    "knowsAbout": ["React", "TypeScript", "Core Web Vitals", "Frontend Engineering", "Performance Optimization"]
  }
  </script>

  <!-- Favicon -->
  <link rel="icon" href="/image/favicon.svg" type="image/svg+xml" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

- [ ] **Step 2: Create public/robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://samirsaurabh1298.vercel.app/sitemap.xml
```

- [ ] **Step 3: Create public/sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://samirsaurabh1298.vercel.app/</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Open http://localhost:5173, open DevTools → Elements → check `<head>` contains og:title, description, and JSON-LD script tag.

- [ ] **Step 5: Commit**

```bash
git add index.html public/robots.txt public/sitemap.xml
git commit -m "feat: full SEO — OG tags, JSON-LD schema, robots.txt, sitemap"
```

---

## Task 3: OG Image (public/og-image.png)

**Files:**
- Create: `scripts/og-image.html` (template to screenshot)
- Create: `public/og-image.png` (manual screenshot step)

- [ ] **Step 1: Create the OG image HTML template**

Create `scripts/og-image.html`:

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #1a1a1a;
    font-family: 'Segoe UI', system-ui, sans-serif;
    display: flex; align-items: center;
    padding: 80px;
    position: relative;
  }
  body::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .glow {
    position: absolute; top: 50%; left: 40%;
    transform: translate(-50%,-50%);
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 65%);
  }
  .content { position: relative; z-index: 1; flex: 1; }
  .label {
    font-size: 13px; letter-spacing: 4px; text-transform: uppercase;
    color: #22d3ee; margin-bottom: 24px; opacity: 0.8;
  }
  h1 {
    font-size: 88px; font-weight: 900; letter-spacing: -4px;
    line-height: 0.9; color: #fff; margin-bottom: 28px;
  }
  h1 span { color: #555; }
  h1 span em { color: #22d3ee; font-style: normal; }
  .tagline { font-size: 20px; color: #666; font-style: italic; margin-bottom: 40px; }
  .stats { display: flex; gap: 40px; }
  .stat-num { font-size: 32px; font-weight: 900; color: #22d3ee; }
  .stat-label { font-size: 11px; color: #444; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px; }
  .badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(34,211,238,0.08); border: 1px solid rgba(34,211,238,0.2);
    color: #22d3ee; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
    padding: 8px 16px; border-radius: 20px; margin-bottom: 32px;
  }
  .dot { width: 7px; height: 7px; border-radius: 50%; background: #22d3ee; }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="content">
    <div class="badge"><div class="dot"></div> Available for Remote Opportunities</div>
    <h1>Samir<br><span>Saur<em>abh</em></span></h1>
    <p class="tagline">Frontend Engineer — React Specialist & Performance Obsessive</p>
    <div class="stats">
      <div><div class="stat-num">3+</div><div class="stat-label">Years Exp</div></div>
      <div><div class="stat-num">300K+</div><div class="stat-label">Monthly Users</div></div>
      <div><div class="stat-num">1.8s</div><div class="stat-label">LCP Achieved</div></div>
      <div><div class="stat-num">35%</div><div class="stat-label">Perf Boost</div></div>
    </div>
  </div>
</body>
</html>
```

- [ ] **Step 2: Take a screenshot and save as og-image.png**

1. Open `scripts/og-image.html` in Chrome
2. Open DevTools → press `Ctrl+Shift+P` → type "screenshot" → choose **"Capture full size screenshot"**
3. This downloads a PNG — rename it `og-image.png` and move to `public/og-image.png`

Alternative: right-click the page → Inspect → select `<body>` → right-click in Elements panel → "Capture node screenshot"

- [ ] **Step 3: Commit**

```bash
git add scripts/og-image.html public/og-image.png
git commit -m "feat: add OG image for social sharing previews"
```

---

## Task 4: Vercel Edge Function (API Key Security)

**Files:**
- Create: `api/chat.js`
- Create: `vercel.json`
- Modify: `.env.local` (local dev only, gitignored)

- [ ] **Step 1: Create api/chat.js**

```js
export const config = { runtime: 'edge' }

const SYSTEM_CONTEXT = `You are an AI assistant for Samir Saurabh's portfolio website. Answer questions about Samir in first person (as if you are him). Be concise, professional, and friendly. Keep answers under 150 words unless asked for details. Use markdown for lists and emphasis when helpful.

About Samir:
- Frontend Engineer with 3+ years at Mahindra First Choice Wheels Ltd. (MFCWL), Bangalore
- Specializes in React.js, TypeScript, Core Web Vitals optimization, and design system architecture
- Built and maintained 4+ production React applications serving 300K+ monthly users
- Improved app performance by 35% through code splitting, lazy loading, memoization
- Core Web Vitals: LCP 1.8s, FID 14ms, CLS 0.12 — best-in-class metrics
- Architected reusable component library with 50+ TypeScript components (atomic design) — reduced dev time by 40%
- Led 15+ major feature deliveries in Agile cross-functional teams
- Tech stack: React.js, Redux, TypeScript, JavaScript ES6+, Tailwind CSS, Material-UI, Formik, Jest
- Tools: Git, Vite, Webpack, Postman, Jira, AWS S3, AWS Amplify, Vercel, Netlify
- Projects: Ediig Auction Platform (real-time WebSocket), Vehicle Inspection AI Platform, MFCWL Website (CWV), YMS (SVG), ATS Resume Optimizer (Claude AI — live at atsoptimizer-liard.vercel.app), TaskBoard (live at taskboard-taupe-five.vercel.app)
- GitHub: https://github.com/Samirsaurabh1298
- LinkedIn: linkedin.com/in/samirsaurabh
- Email: samirsaurabh.dev@gmail.com
- Location: Bangalore, India
- Open to new remote opportunities`

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const { messages } = await req.json()

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_CONTEXT },
        ...messages,
      ],
      max_tokens: 800,
      temperature: 0.7,
      stream: true,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    return new Response(JSON.stringify({ error: err }), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
```

- [ ] **Step 2: Create vercel.json**

```json
{
  "functions": {
    "api/chat.js": {
      "runtime": "edge"
    }
  }
}
```

- [ ] **Step 3: Update .env.local for local development**

Check if `.env.local` exists. If not, create it. Add:

```
# Local dev only — used when import.meta.env.DEV is true
VITE_GROQ_API_KEY=your_groq_api_key_here
```

Confirm `.env.local` is in `.gitignore` (it should be by default with Vite). If not:
```bash
echo ".env.local" >> .gitignore
```

- [ ] **Step 4: Add GROQ_API_KEY to Vercel dashboard**

After deploying: Vercel Dashboard → your project → Settings → Environment Variables → add `GROQ_API_KEY` with your Groq API key value. This is the server-side variable used by `api/chat.js`.

- [ ] **Step 5: Commit**

```bash
git add api/chat.js vercel.json .gitignore
git commit -m "feat: Vercel Edge Function proxy for Groq API — removes client-side key exposure"
```

---

## Task 5: ChatContext (Shared AI State)

**Files:**
- Create: `src/context/ChatContext.jsx`

- [ ] **Step 1: Create src/context/ChatContext.jsx**

```jsx
import { createContext, useContext, useState, useRef, useCallback } from 'react'

const ChatContext = createContext(null)

const SYSTEM_CONTEXT_DEV = `You are an AI assistant for Samir Saurabh's portfolio. Answer in first person as Samir. Be concise and professional. Keep answers under 150 words unless asked for details.

About Samir: Frontend Engineer, 3+ years at Mahindra First Choice Wheels Ltd., Bangalore. React, TypeScript, Core Web Vitals expert. 300K+ monthly users, LCP 1.8s. GitHub: https://github.com/Samirsaurabh1298. Open to remote opportunities.`

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
  const historyRef = useRef([]) // conversation history for API (no bot intro message)

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim()
    if (!trimmed || isStreaming) return

    // Add user message
    const userMsg = { role: 'user', text: trimmed, time: getTime() }
    setMessages(prev => [...prev, userMsg])
    const newHistory = [...historyRef.current, { role: 'user', content: trimmed }]
    historyRef.current = newHistory
    setIsStreaming(true)

    // Placeholder for streaming bot message
    const botPlaceholder = { role: 'bot', text: '', time: getTime() }
    setMessages(prev => [...prev, botPlaceholder])

    try {
      let res

      if (import.meta.env.DEV) {
        // Direct call in dev — uses VITE_GROQ_API_KEY from .env.local
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
        // Edge Function in production — no client-side key
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
        buffer = lines.pop() // keep incomplete line in buffer
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
```

- [ ] **Step 2: Verify no build errors**

```bash
npm run build
```

Expected: build succeeds with no errors. ChatContext is not used yet — that's fine.

- [ ] **Step 3: Commit**

```bash
git add src/context/ChatContext.jsx
git commit -m "feat: ChatContext with streaming Groq AI — shared between Hero and AI Chat section"
```

---

## Task 6: Update App.jsx

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace src/App.jsx**

Remove the IntersectionObserver (Framer Motion's `whileInView` replaces it). Add `ChatProvider`.

```jsx
import { ThemeProvider } from './context/ThemeContext'
import { ChatProvider } from './context/ChatContext'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import AIChat from './components/AIChat'
import Contact from './components/Contact'
import Footer from './components/Footer'

function Portfolio() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <AIChat />
      <Contact />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <Portfolio />
      </ChatProvider>
    </ThemeProvider>
  )
}
```

- [ ] **Step 2: Verify**

```bash
npm run dev
```

Open http://localhost:5173 — portfolio renders, no console errors. Animations will look broken until Framer Motion is added to each component (that's fine at this stage).

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "refactor: remove IntersectionObserver, add ChatProvider to App"
```

---

## Task 7: AvatarHero Component

**Files:**
- Create: `src/components/AvatarHero.jsx`

- [ ] **Step 1: Create src/components/AvatarHero.jsx**

```jsx
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import avatarImg from '../assets/samir-avatar.jpg'
import { useChat } from '../context/ChatContext'

const SUGGESTIONS = [
  'React performance?',
  'Open to remote?',
  'Core Web Vitals?',
  'Side projects?',
]

export default function AvatarHero() {
  const containerRef = useRef(null)
  const eyeRef = useRef(null)
  const animFrameRef = useRef(null)
  const currentPos = useRef({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const blinkTimerRef = useRef(null)

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

    const handleMouse = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / window.innerWidth
      const dy = (e.clientY - cy) / window.innerHeight
      targetPos.current = { x: dx * 8, y: dy * 5 }
    }
    window.addEventListener('mousemove', handleMouse)

    const lerp = (a, b, t) => a + (b - a) * t
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
    return () => clearTimeout(blinkTimerRef.current)
  }, [])

  const handleSend = () => {
    if (miniInput.trim()) {
      sendMessage(miniInput)
      setMiniInput('')
    }
  }

  const handleKeyDown = (e) => {
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
      <div ref={containerRef} className="relative" style={{ width: 220, height: 220 }}>
        {/* Pulsing rings */}
        <div className="avatar-ring-1" />
        <div className="avatar-ring-2" />

        {/* Eye tracking wrapper */}
        <div ref={eyeRef} style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', willChange: 'transform' }}>
          <motion.img
            src={avatarImg}
            alt="Samir Saurabh"
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
                onChange={e => setMiniInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={isStreaming}
                className="mini-chat-input"
              />
              <button
                onClick={handleSend}
                disabled={isStreaming || !miniInput.trim()}
                className="mini-chat-send"
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

function TypewriterText({ text }) {
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
```

- [ ] **Step 2: Add avatar CSS to src/index.css**

Add these rules at the end of `src/index.css`:

```css
/* ── Avatar Hero ── */
.avatar-ring-1 {
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  border: 1px solid rgba(34, 211, 238, 0.15);
  animation: ringPulse 3s ease-out infinite;
  pointer-events: none;
}
.avatar-ring-2 {
  position: absolute;
  inset: -24px;
  border-radius: 50%;
  border: 1px solid rgba(34, 211, 238, 0.07);
  animation: ringPulse 3s ease-out infinite 0.9s;
  pointer-events: none;
}
@keyframes ringPulse {
  0% { transform: scale(0.95); opacity: 0.5; }
  100% { transform: scale(1.12); opacity: 0; }
}
.avatar-status-badge {
  position: absolute;
  bottom: 10px;
  right: -4px;
  background: var(--bg);
  border: 1px solid rgba(34, 211, 238, 0.3);
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 10px;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  z-index: 2;
}
.status-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse 2s ease-in-out infinite;
}

/* ── Speech Bubble ── */
.speech-bubble-card {
  background: var(--card-bg, var(--bg));
  border: 1px solid rgba(34, 211, 238, 0.2);
  border-radius: 16px;
  border-top-right-radius: 4px;
  padding: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  position: relative;
}
.bubble-tail {
  position: absolute;
  top: -9px;
  right: 48px;
  width: 0; height: 0;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-bottom: 9px solid rgba(34,211,238,0.2);
}
.bubble-tail::after {
  content: '';
  position: absolute;
  top: 2px;
  left: -7px;
  width: 0; height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 7px solid var(--card-bg, var(--bg));
}
.mini-chat-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(34,211,238,0.05);
  border: 1px solid rgba(34,211,238,0.15);
  border-radius: 8px;
  padding: 6px 10px;
}
.mini-chat-input {
  background: none;
  border: none;
  outline: none;
  color: var(--text);
  font-size: 12px;
  flex: 1;
  font-family: var(--font-body, monospace);
}
.mini-chat-input::placeholder { color: var(--muted); }
.mini-chat-input:disabled { opacity: 0.5; }
.mini-chat-send {
  background: var(--accent);
  border: none;
  color: #000;
  font-weight: 700;
  font-size: 11px;
  padding: 5px 9px;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.mini-chat-send:disabled { opacity: 0.4; cursor: not-allowed; }
.chips-row {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
}
.chip-btn {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 11px;
  padding: 4px 9px;
  border-radius: 12px;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.chip-btn:hover { color: var(--accent); border-color: var(--accent); }
.chip-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.typing-cursor-inline {
  display: inline-block;
  width: 2px; height: 13px;
  background: var(--accent);
  margin-left: 2px;
  vertical-align: middle;
  animation: blink 1s step-end infinite;
}
```

- [ ] **Step 3: Verify build — no import errors**

```bash
npm run build
```

Expected: build succeeds. The photo import will fail if `src/assets/samir-avatar.jpg` doesn't exist — add the photo if not done yet.

- [ ] **Step 4: Commit**

```bash
git add src/components/AvatarHero.jsx src/index.css
git commit -m "feat: AvatarHero — eye tracking, breathing, blink, speech bubble, mini AI chat"
```

---

## Task 8: Hero Redesign

**Files:**
- Modify: `src/components/Hero.jsx`

- [ ] **Step 1: Replace src/components/Hero.jsx**

```jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import AvatarHero from './AvatarHero'

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

const STATS = [
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 300, suffix: 'K+', label: 'Monthly Users' },
  { value: 35, suffix: '%', label: 'Perf Improvement' },
  { value: 1.8, suffix: 's', label: 'LCP Achieved' },
]

function AnimatedStat({ value, suffix, label, delay }) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    const duration = 1500
    const start = performance.now()
    const animate = (now) => {
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

      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center" style={{ maxWidth: 1100 }}>

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
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Samir
            <span className="hero-name-stroke">
              Saur<span style={{ color: 'var(--accent)', WebkitTextStroke: 0 }}>abh</span>
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
            {STATS.map(({ value, suffix, label }, i) => (
              <AnimatedStat key={label} value={value} suffix={suffix} label={label} delay={600 + i * 100} />
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
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:5173. Check:
- Hero shows two columns on desktop (text left, avatar right)
- Name does a clip-path wipe on load
- Stats count up from 0
- Speech bubble appears after ~1.2s with typewriter text
- Moving the mouse makes the photo subtly follow

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat: Hero redesign — 2-col layout, Framer Motion entrance, animated stats, avatar integration"
```

---

## Task 9: Skills — Framer Motion

**Files:**
- Modify: `src/components/Skills.jsx`

- [ ] **Step 1: Replace Skills.jsx with Framer Motion version**

```jsx
import { motion } from 'framer-motion'

const SKILLS = [
  { icon: '⚛️', name: 'Core Frontend', desc: 'Building responsive, accessible, pixel-perfect UIs with modern React patterns and strict TypeScript.', tags: ['React.js', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3'] },
  { icon: '🎨', name: 'UI & Styling', desc: 'Crafting design systems and component libraries with utility-first and component-driven CSS approaches.', tags: ['Tailwind CSS', 'Material-UI', 'Bootstrap', 'Formik'] },
  { icon: '⚡', name: 'Performance', desc: 'Core Web Vitals obsessive — LCP, FID, CLS optimization through code splitting, lazy loading, and memoization.', tags: ['Core Web Vitals', 'Lazy Loading', 'Code Splitting', 'Webpack', 'Vite'] },
  { icon: '🔧', name: 'State & Tooling', desc: 'Managing complex application state and automating workflows for consistent, reliable delivery.', tags: ['Redux', 'Context API', 'Git', 'Jest', 'Postman'] },
  { icon: '☁️', name: 'Cloud & Deploy', desc: 'Deploying and managing frontend assets on cloud infrastructure with CI/CD pipelines.', tags: ['AWS S3', 'AWS Amplify', 'Vercel', 'Netlify'] },
  { icon: '🤝', name: 'Collaboration', desc: 'Bridging design and engineering in agile teams — from Figma handoff to production.', tags: ['Figma', 'Agile/Scrum', 'Jira', 'REST APIs'] },
]

export default function Skills() {
  return (
    <section id="skills" className="px-5 py-16 md:px-12 md:py-28" style={{ background: 'var(--bg2)' }}>
      <div className="section-label">What I work with</div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
        {SKILLS.map(({ icon, name, desc, tags }, index) => (
          <motion.div
            key={name}
            className="skill-card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="text-2xl mb-4">{icon}</div>
            <div className="font-display font-bold text-base mb-2" style={{ color: 'var(--text)' }}>{name}</div>
            <p className="text-[13px] leading-loose mb-4 flex-1" style={{ color: 'var(--muted)' }}>{desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

```bash
npm run dev
```

Scroll to Skills section — cards should stagger in with 80ms delay each, and lift on hover.

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills.jsx
git commit -m "feat: Skills — Framer Motion stagger entrance and hover lift"
```

---

## Task 10: Experience — Framer Motion

**Files:**
- Modify: `src/components/Experience.jsx`

- [ ] **Step 1: Replace Experience.jsx**

```jsx
import { motion } from 'framer-motion'

const EXPERIENCE = [
  {
    period: 'Apr 2022 — Present',
    role: 'Software Engineer',
    company: 'Mahindra First Choice Wheels Ltd. · Bangalore, India',
    bullets: [
      'Led frontend development for 4+ production React applications serving 300K+ monthly users across web and mobile-web platforms.',
      'Architected reusable component library with 50+ TypeScript components using atomic design — reduced dev time by 40%.',
      'Achieved Core Web Vitals compliance: LCP 1.8s, FID 14ms, CLS 0.12 — through code splitting, lazy loading, and critical CSS inlining.',
      'Delivered 15+ major features in Agile collaboration with UX, backend, and QA teams.',
    ],
  },
  {
    period: 'Jan 2022 — Mar 2022',
    role: 'Frontend Developer Intern',
    company: 'Mahindra First Choice Wheels Ltd. · Bangalore, India',
    bullets: [
      'Developed responsive web pages from Figma prototypes using React and Bootstrap.',
      'Reduced design-to-development turnaround by 30% through systematic component reuse.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="px-5 py-16 md:px-12 md:py-28" style={{ background: 'var(--bg)' }}>
      <div className="section-label">Where I've worked</div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        Experience
      </motion.h2>

      <div className="relative" style={{ paddingLeft: 32 }}>
        {/* Animated vertical timeline line */}
        <motion.div
          style={{
            position: 'absolute', left: 0, top: 0,
            width: 1,
            background: 'var(--accent)',
            opacity: 0.25,
            originY: 0,
          }}
          initial={{ scaleY: 0, height: '100%' }}
          whileInView={{ scaleY: 1, height: '100%' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />

        {EXPERIENCE.map(({ period, role, company, bullets }, index) => (
          <motion.div
            key={role + period}
            className="exp-item relative mb-14 last:mb-0"
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 18, delay: index * 0.15 }}
          >
            {/* Timeline dot */}
            <motion.div
              style={{
                position: 'absolute',
                left: -36,
                top: 6,
                width: 10, height: 10,
                borderRadius: '50%',
                background: 'var(--accent)',
                border: '2px solid var(--bg)',
              }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: index * 0.15 + 0.1 }}
            />

            <div className="text-[11px] uppercase tracking-widest mb-1" style={{ color: 'var(--accent)' }}>{period}</div>
            <div className="font-display font-bold text-xl md:text-2xl mb-1" style={{ color: 'var(--text)' }}>{role}</div>
            <div className="text-sm mb-4" style={{ color: 'var(--muted)' }}>{company}</div>
            <ul className="flex flex-col gap-2">
              {bullets.map((b, i) => (
                <li key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>→</span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Scroll to Experience — timeline line should draw from top to bottom, then each job slides in from the left.

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience.jsx
git commit -m "feat: Experience — Framer Motion spring entrance, animated SVG timeline line"
```

---

## Task 11: Projects — Framer Motion + NDA Badges

**Files:**
- Modify: `src/components/Projects.jsx`

- [ ] **Step 1: Replace Projects.jsx**

```jsx
import { motion } from 'framer-motion'

const PROJECTS = [
  {
    num: '01',
    accent: 'linear-gradient(90deg, #22d3ee, #3b82f6)',
    stack: ['React.js', 'Redux', 'Tailwind', 'WebSocket'],
    name: 'Ediig Auction Platform Revamp',
    desc: 'Real-time auction platform with live countdown timers, WebSocket connections for live bidding, and complex global state management. Redesigned UI from scratch.',
    metrics: [{ val: '45%', label: 'Perf Boost' }, { val: '30%', label: 'Engagement ↑' }, { val: '20%', label: 'Bounce ↓' }],
    nda: true,
    url: null,
    github: null,
  },
  {
    num: '02',
    accent: 'linear-gradient(90deg, #3b82f6, #6c47ff)',
    stack: ['React.js', 'Chart.js', 'Axios', 'FileSaver.js'],
    name: 'Vehicle Inspection AI Platform',
    desc: 'AI-powered vehicle inspection reporting dashboard with interactive Chart.js visualizations, advanced filtering, and multi-format export (PDF/CSV). Full error handling and retry logic.',
    metrics: [{ val: 'PDF/CSV', label: 'Export' }, { val: 'AI', label: 'Integrated' }],
    nda: true,
    url: null,
    github: null,
  },
  {
    num: '03',
    accent: 'linear-gradient(90deg, #6c47ff, #22d3ee)',
    stack: ['React.js', 'Redux', 'Tailwind', 'SuiteCRM'],
    name: 'Mahindra First Choice Website',
    desc: 'High-performance marketing website achieving best-in-class Core Web Vitals. Mobile-first, dynamic modals, multi-step progress tracking, and critical CSS inlining.',
    metrics: [{ val: '1.8s', label: 'LCP' }, { val: '14ms', label: 'FID' }, { val: '0.12', label: 'CLS' }],
    nda: true,
    url: null,
    github: null,
  },
  {
    num: '04',
    accent: 'linear-gradient(90deg, #22d3ee, #f87171)',
    stack: ['JavaScript ES6', 'SVG', 'HTML5', 'Bootstrap'],
    name: 'Yard Management System (YMS)',
    desc: 'Dynamic fractional star rating system with SVG manipulation and CSS animations. Configuration-driven theming with dynamic labels, badges, and brand-aligned descriptions.',
    metrics: [{ val: 'SVG', label: 'Animated' }, { val: 'Config', label: 'Driven' }],
    nda: true,
    url: null,
    github: null,
  },
  {
    num: '05',
    accent: 'linear-gradient(90deg, #f87171, #f59e0b)',
    stack: ['React', 'Claude AI', 'TypeScript', 'Vercel'],
    name: 'ATS Resume Optimizer',
    desc: 'AI-powered resume optimizer that analyzes job descriptions and rewrites resumes to pass ATS filters. Instant gap analysis in 30 seconds — achieving 3× higher interview rates.',
    metrics: [{ val: '3×', label: 'More Interviews' }, { val: '30s', label: 'Analysis' }],
    nda: false,
    url: 'https://atsoptimizer-liard.vercel.app',
    github: null,
  },
  {
    num: '06',
    accent: 'linear-gradient(90deg, #a78bfa, #ec4899)',
    stack: ['React.js', 'TypeScript', 'Tailwind', 'Drag & Drop'],
    name: 'TaskBoard',
    desc: 'Clean, minimal task management board for organizing work items with an intuitive drag-and-drop interface and distraction-free design.',
    metrics: [{ val: 'DnD', label: 'Interface' }, { val: 'Clean', label: 'UI/UX' }],
    nda: false,
    url: 'https://taskboard-taupe-five.vercel.app',
    github: null,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="px-5 py-16 md:px-12 md:py-28" style={{ background: 'var(--bg2)' }}>
      <div className="section-label">What I've built</div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
        {PROJECTS.map(({ num, accent, stack, name, desc, metrics, nda, url, github }, index) => (
          <motion.div
            key={num}
            className="project-card flex flex-col"
            style={{ minHeight: 340 }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
            whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(34,211,238,0.1)', transition: { duration: 0.25 } }}
          >
            <div className="project-accent-bar" style={{ background: accent }} />
            <div className="project-num">{num}</div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {stack.map(t => <span key={t} className="tag">{t}</span>)}
              {nda && (
                <span className="tag" style={{ borderColor: 'rgba(248,113,113,0.4)', color: '#f87171', background: 'rgba(248,113,113,0.06)' }}>
                  NDA
                </span>
              )}
            </div>

            <div className="font-display font-bold mb-3 leading-tight" style={{ fontSize: 20, color: 'var(--text)' }}>
              {name}
            </div>

            <p className="text-[13px] leading-loose flex-1" style={{ color: 'var(--muted)' }}>{desc}</p>

            {nda && (
              <p className="text-[11px] mt-2" style={{ color: 'rgba(248,113,113,0.6)' }}>
                Internal project · Not publicly accessible
              </p>
            )}

            <div className="flex gap-6 flex-wrap items-center pt-5 mt-5" style={{ borderTop: '1px solid var(--border)' }}>
              {metrics.map(({ val, label }) => (
                <div key={label}>
                  <div className="font-display font-bold text-lg leading-none" style={{ color: 'var(--accent)' }}>{val}</div>
                  <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--muted)' }}>{label}</div>
                </div>
              ))}
              <div className="flex gap-3 ml-auto">
                {github && (
                  <a href={github} target="_blank" rel="noreferrer" className="project-live-link">
                    Code →
                  </a>
                )}
                {url && (
                  <a href={url} target="_blank" rel="noreferrer" className="project-live-link">
                    View Live →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Scroll to Projects — cards fan in with stagger, hover floats upward. NDA projects show red "NDA" tag and "Internal project" note.

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.jsx
git commit -m "feat: Projects — Framer Motion stagger, NDA badges, hover float effect"
```

---

## Task 12: AIChat — Streaming + Markdown + ChatContext

**Files:**
- Modify: `src/components/AIChat.jsx`

- [ ] **Step 1: Replace AIChat.jsx**

```jsx
import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useChat } from '../context/ChatContext'
import { useState } from 'react'

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
                          code: ({ inline, children }) => inline
                            ? <code style={{ background: 'rgba(34,211,238,0.1)', padding: '1px 5px', borderRadius: 3, fontSize: '0.9em' }}>{children}</code>
                            : <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: 6, overflowX: 'auto', fontSize: '0.85em', margin: '6px 0' }}><code>{children}</code></pre>,
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
            >
              ➤
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify streaming**

```bash
npm run dev
```

Type a message in the AI Chat section → text should stream in word-by-word. Bot messages should render **bold text** and bullet lists from markdown. "Samir is typing..." should show while streaming.

- [ ] **Step 3: Verify shared state**

Send a message from the Hero speech bubble, then scroll to AI Chat section — the conversation history should appear there too.

- [ ] **Step 4: Commit**

```bash
git add src/components/AIChat.jsx
git commit -m "feat: AIChat — streaming responses, react-markdown, shared ChatContext, clear button"
```

---

## Task 13: Contact — Working EmailJS Form

**Files:**
- Modify: `src/components/Contact.jsx`

- [ ] **Step 1: Create a new EmailJS template**

Go to https://www.emailjs.com → Email Templates → Create New Template.

Template content:
```
Subject: 📬 New portfolio message from {{from_name}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}
```

Save the Template ID — you'll need it below (e.g., `template_contact123`).

- [ ] **Step 2: Add new env var to .env.local**

```
VITE_EMAILJS_CONTACT_TEMPLATE_ID=your_new_contact_template_id
```

Also add to Vercel Dashboard → Environment Variables.

- [ ] **Step 3: Replace Contact.jsx**

```jsx
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
    } catch {
      setStatus('error')
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
                <span className="contact-icon">{icon}</span>
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
              <label className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="contact-input"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="contact-input"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Message</label>
              <textarea
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
                style={{ color: '#4ade80', fontSize: 13 }}
              >
                ✓ Message sent! I'll reply within 24h.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: '#f87171', fontSize: 13 }}
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
```

- [ ] **Step 4: Add contact-input CSS to src/index.css**

```css
/* ── Contact Form ── */
.contact-input {
  display: block;
  width: 100%;
  margin-top: 6px;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 10px 14px;
  color: var(--text);
  font-size: 13px;
  font-family: var(--font-body, inherit);
  outline: none;
  transition: border-color 0.2s;
}
.contact-input:focus {
  border-color: var(--accent);
}
.contact-input::placeholder {
  color: var(--muted);
}
```

- [ ] **Step 5: Verify**

Fill out the contact form and submit. You should receive an email at `samirsaurabh.dev@gmail.com`. Success message should appear.

- [ ] **Step 6: Commit**

```bash
git add src/components/Contact.jsx src/index.css
git commit -m "feat: Contact — working EmailJS form with success/error states"
```

---

## Task 14: Navbar — GitHub Link + Active Section

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Replace Navbar.jsx**

```jsx
import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'ai-chat', label: 'AI Chat' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="nav-logo">SS<span style={{ color: 'var(--accent)' }}>.</span></a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-7">
        {NAV_LINKS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className="nav-link"
            style={{ color: activeSection === id ? 'var(--accent)' : undefined }}
          >
            {label}
          </a>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-3">
        {/* GitHub */}
        <a
          href="https://github.com/Samirsaurabh1298"
          target="_blank"
          rel="noreferrer"
          className="nav-link flex items-center gap-1.5"
          title="GitHub"
          style={{ fontSize: 13 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>

        {/* Hire Me */}
        <a href="mailto:samirsaurabh.dev@gmail.com" className="btn-secondary" style={{ padding: '7px 14px', fontSize: 12 }}>
          Hire Me
        </a>

        {/* Theme toggle */}
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          {isDark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile: theme + hamburger */}
      <div className="flex md:hidden items-center gap-3">
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          {isDark ? '☀' : '☾'}
        </button>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="mobile-menu-link"
              onClick={() => setMenuOpen(false)}
              style={{ color: activeSection === id ? 'var(--accent)' : undefined }}
            >
              {label}
            </a>
          ))}
          <a
            href="https://github.com/Samirsaurabh1298"
            target="_blank"
            rel="noreferrer"
            className="mobile-menu-link"
            onClick={() => setMenuOpen(false)}
          >
            GitHub
          </a>
          <a href="mailto:samirsaurabh.dev@gmail.com" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            Hire Me
          </a>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Verify**

Open the site — navbar should show GitHub link and "Hire Me". As you scroll through sections, the active nav link should turn cyan.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: Navbar — GitHub link, active section highlighting on scroll"
```

---

## Task 15: CSS Cleanup

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Remove IntersectionObserver animation classes from index.css**

Find and remove these blocks from `src/index.css` (Framer Motion now handles all animation):

```css
/* REMOVE these blocks: */

.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

.exp-item {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.exp-item.visible {
  opacity: 1;
  transform: translateX(0);
}

.project-card {
  opacity: 0;  /* ONLY remove the opacity:0 line — keep padding/background styling */
  ...
}
.project-card.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Keep all `.project-card` styling rules (padding, background, border, etc.) — only remove the opacity/transform initial-state and `.visible` overrides.

- [ ] **Step 2: Verify no visual regressions**

```bash
npm run dev
```

Scroll through all sections — nothing should be stuck invisible. All animations should play via Framer Motion.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "refactor: remove IntersectionObserver CSS animation classes — Framer Motion handles all"
```

---

## Task 16: Final Verification + Deploy

- [ ] **Step 1: Production build check**

```bash
npm run build
```

Expected: no errors. Bundle size should be reasonable (Framer Motion adds ~50KB gzipped — acceptable).

- [ ] **Step 2: Preview production build locally**

```bash
npm run preview
```

Open http://localhost:4173. Test:
- [ ] Avatar photo loads and breathing animation runs
- [ ] Move mouse → photo subtly follows
- [ ] Speech bubble appears and types out greeting
- [ ] Send a message in hero mini-chat → streaming response appears
- [ ] Scroll down → hero conversation appears in AI Chat section
- [ ] All section animations trigger on scroll
- [ ] Skills cards hover lifts
- [ ] Projects NDA badge shows on projects 01–04
- [ ] Contact form shows name/email/message fields
- [ ] Navbar GitHub link opens github.com/Samirsaurabh1298
- [ ] Active nav link highlights as you scroll

- [ ] **Step 3: Check SEO in DevTools**

Open http://localhost:4173 → DevTools → Elements → verify `<head>` has:
- `<meta name="description">`
- `<meta property="og:image">`
- `<script type="application/ld+json">`

- [ ] **Step 4: Push and deploy**

```bash
git push origin main
```

Vercel auto-deploys on push. After deploy:
1. Go to Vercel Dashboard → your project → Settings → Environment Variables
2. Add `GROQ_API_KEY` = your Groq API key
3. Redeploy (or it picks it up automatically on next push)

- [ ] **Step 5: Update canonical URL in index.html**

After Vercel assigns your URL (e.g., `samir-portfolio-abc.vercel.app`), update `index.html`:
```html
<link rel="canonical" href="https://your-actual-vercel-url.vercel.app" />
<meta property="og:url" content="https://your-actual-vercel-url.vercel.app" />
```

Also update `public/sitemap.xml` with the real URL, then push.

- [ ] **Step 6: Validate JSON-LD**

Visit https://validator.schema.org/ → paste your deployed URL → verify no errors on the Person schema.

- [ ] **Step 7: Test LinkedIn share preview**

Go to https://www.linkedin.com/post-inspector/ → enter your Vercel URL → verify OG image and title display correctly.

- [ ] **Step 8: Final commit**

```bash
git add index.html public/sitemap.xml
git commit -m "chore: update canonical URL and sitemap with live Vercel domain"
git push origin main
```

---

## Success Criteria Checklist

- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse SEO = 100
- [ ] Avatar eye tracking on desktop, no errors on mobile
- [ ] AI streaming works — text appears word-by-word
- [ ] Hero mini-chat and full AI Chat share conversation state
- [ ] OG image renders on LinkedIn inspector
- [ ] JSON-LD validates at schema.org/validator
- [ ] Contact form sends email successfully
- [ ] All section Framer Motion animations run at 60fps
- [ ] NDA badges on projects 01–04
- [ ] GitHub link in navbar
- [ ] Active section highlight in navbar on scroll
