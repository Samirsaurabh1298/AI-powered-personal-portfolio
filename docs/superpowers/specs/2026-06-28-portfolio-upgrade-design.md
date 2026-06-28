# Portfolio Upgrade Design — 10/10

**Date:** 2026-06-28  
**Goal:** Transform the current 6.5/10 portfolio into a 10/10 AI-native frontend engineer showcase  
**Stack:** React 18 + Vite + Tailwind CSS (no framework change)

---

## 1. Overview

Three pillars drive every decision in this upgrade:

1. **AI-Native Hero** — Interactive photo avatar with eye tracking, breathing animation, and inline AI chat
2. **Premium Animations** — Framer Motion across all sections replacing the current CSS-only IntersectionObserver approach
3. **Full SEO** — Meta tags, OG image, JSON-LD schema, sitemap, robots.txt

Supporting fixes (from the 6.5/10 review): Groq streaming, markdown rendering, API key security, working contact form, GitHub link, NDA project labels, raised max_tokens.

---

## 2. New Dependencies

```
framer-motion         — animation engine (replaces CSS IntersectionObserver)
react-markdown        — render markdown in AI chat responses
remark-gfm            — GitHub-flavored markdown support
```

No Three.js, no Live2D, no GSAP. Keeping the bundle lean for 90+ Lighthouse.

---

## 3. Photo Asset Pipeline

**Required before implementation:**

1. Take `image/samir.jpg` (the professional headshot shared — navy blazer, gray background)
2. Remove background using remove.bg or Canva → export as `samir-nobg.png`
3. Resize to 600×600px, export as WebP: `samir-avatar.webp`
4. Place both in `src/assets/`

The avatar uses a single image (not layered PSD). Eye tracking is simulated using CSS `transform: translate()` on an overlay `<div>` positioned over the eyes region — no computer vision needed.

---

## 4. Section-by-Section Design

### 4.1 Hero (MAJOR REDESIGN)

**Layout change:** Single-column on mobile, two-column on desktop  
- Left column: badge + name + tagline + stats + CTA buttons  
- Right column: avatar + speech bubble + mini chat

**Avatar component (`AvatarHero.jsx`):**
```
┌──────────────────────────────────────────────────────┐
│  Pulsing ring (CSS keyframe, 3s infinite)            │
│  ┌────────────────────────────────────────────┐      │
│  │  samir-avatar.webp (240px circle)          │      │
│  │  • breathing: scale 1 → 1.015 (4s ease)   │      │
│  │  • eye overlay: tracks mousemove via GSAP  │      │
│  │  • blink: opacity 0→1 random 3–5s         │      │
│  └────────────────────────────────────────────┘      │
│  "Online · Open to work" badge (bottom-right)        │
└──────────────────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────────────────┐
│  Speech bubble (appears at 1.2s)                     │
│  "Hey, I'm Samir 👋 Welcome to my portfolio..."     │
│  ┌──────────────────────────────────────────────┐   │
│  │  [inline chat input]              [➤ send]   │   │
│  └──────────────────────────────────────────────┘   │
│  [chip: React skills?] [chip: Open to work?] [...]  │
└──────────────────────────────────────────────────────┘
```

**Eye tracking implementation:**
- `mousemove` event on `window` → compute angle from photo center to cursor
- Max displacement: ±8px horizontal, ±5px vertical
- Apply via CSS transform on a transparent `<div>` overlay positioned at eye region
- Lerp (linear interpolation) for smooth following — no sudden jumps
- Disabled on touch devices (no mousemove)

**Animation sequence (Framer Motion):**
- 0.0s: Badge fades in
- 0.2s: Name wipes in (clip-path left→right)
- 0.4s: Tagline fades up
- 0.6s: Stats count up from 0 (custom counter hook)
- 0.8s: CTA buttons spring in
- 1.0s: Avatar fades in + breathing starts
- 1.2s: Speech bubble slides down with spring
- 2.0s: Typewriter text runs in bubble
- 3.5s: Suggestion chips stagger in

**Mini chat:**
- Shares conversation state with the full AI Chat section via React Context (`ChatContext`)
- Same Groq API call — responses stream into the bubble
- On send: bubble expands to show reply, then collapses after 8s with "See full chat ↓" link

**Stats counter:**
- Custom `useCounter` hook: counts from 0 to target over 1.5s (easeOut)
- Triggers on component mount (hero is always visible first)

---

### 4.2 Skills (ANIMATION UPGRADE)

**Change:** Replace `.fade-in` IntersectionObserver with Framer Motion `useInView`

```jsx
// Each skill card:
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.5, delay: index * 0.08 }}
  whileHover={{ y: -4, transition: { duration: 0.2 } }}
>
```

Cards animate in with 80ms stagger. Hover lifts 4px with spring. Gradient top border slides in on hover (already in CSS — keep).

---

### 4.3 Experience (ANIMATION UPGRADE)

**Change:** Replace `.exp-item` with Framer Motion

- Timeline line draws from top to bottom as user scrolls (SVG `pathLength` animation)
- Each job item slides from left with spring stagger
- Dot on timeline scales in with a pop (spring, scale 0→1)

```jsx
<motion.div
  initial={{ opacity: 0, x: -40 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.15 }}
>
```

---

### 4.4 Projects (ANIMATION + CONTENT UPGRADE)

**Animation:** Cards fan in with stagger (same pattern as Skills)

**Content fixes:**
- Projects 01–04 (internal/NDA): Add `nda: true` field → renders "Internal Project · NDA" badge instead of missing link
- Projects 05–06 (live): Keep "View Live →" link
- Add `github` field for open-source projects (TaskBoard, ATS Optimizer) → "View Code →" link

**Hover upgrade:**
```jsx
whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(34,211,238,0.12)" }}
```

---

### 4.5 AI Chat (MAJOR UPGRADE)

**Changes:**
1. **Streaming responses** — switch from full-response fetch to SSE stream reader
2. **Markdown rendering** — wrap bot messages in `<ReactMarkdown>` with `remark-gfm`
3. **Raise max_tokens** from 300 → 800
4. **Shared state** — `ChatContext` provides `messages`, `sendMessage`, `isStreaming` to both Hero mini-chat and this section
5. **API key security** — route through Vercel Edge Function at `/api/chat` (details in §6)
6. **Better system prompt** — add GitHub links, add "current date is 2026", add personality

**Streaming implementation:**
```js
const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({messages}) })
const reader = res.body.getReader()
const decoder = new TextDecoder()
let buffer = ''
while (true) {
  const { done, value } = await reader.read()
  if (done) break
  buffer += decoder.decode(value, { stream: true })
  // Parse SSE lines, extract delta content, append to current message
}
```

**UI improvement:**
- Bot messages render markdown (bold, code blocks, bullet lists)
- Show "Samir is typing..." with name instead of generic dots
- Message timestamps remain
- "Clear chat" button added

---

### 4.6 Contact (FORM UPGRADE)

**Current:** Static contact links only — no form  
**New:** Add working EmailJS contact form

Form fields: Name, Email, Message  
On submit: `emailjs.send()` → sends to `samirsaurabh.dev@gmail.com`  
Success state: "Message sent! I'll reply within 24h ✓"  
Error state: "Something went wrong. Email me directly."

Keep existing contact links (email, LinkedIn, phone) beside the form.

Layout: 2-column — left: contact links + info cards (unchanged), right: new form

---

### 4.7 Navbar (MINOR)

**Add:** GitHub icon link → `https://github.com/samirsaurabh` (or correct URL)  
**Add:** Smooth active section highlighting (IntersectionObserver on section IDs → highlight nav link)

---

## 5. SEO Implementation

All changes in `index.html` only — no component changes needed.

### 5.1 Meta Tags
```html
<meta name="description" content="Samir Saurabh — Frontend Engineer specializing in React, TypeScript, and Core Web Vitals optimization. 3+ years, 300K+ monthly users, LCP 1.8s." />
<meta name="keywords" content="Frontend Engineer, React Developer, TypeScript, Bangalore, Remote, Core Web Vitals" />
<meta name="author" content="Samir Saurabh" />
<link rel="canonical" href="https://YOUR_DOMAIN_HERE" /><!-- confirm your deployed domain -->
```

### 5.2 Open Graph (LinkedIn, Slack, WhatsApp previews)
```html
<meta property="og:type" content="website" />
<meta property="og:title" content="Samir Saurabh — Frontend Engineer" />
<meta property="og:description" content="React specialist with 3+ years building apps for 300K+ monthly users. Core Web Vitals: LCP 1.8s." />
<meta property="og:image" content="/og-image.png" />
<meta property="og:url" content="https://samirsaurabh.dev" />
<meta property="og:site_name" content="Samir Saurabh Portfolio" />
```

### 5.3 Twitter Card
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Samir Saurabh — Frontend Engineer" />
<meta name="twitter:description" content="React specialist · 300K+ users · LCP 1.8s · Open to opportunities" />
<meta name="twitter:image" content="/og-image.png" />
```

### 5.4 JSON-LD Person Schema
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Samir Saurabh",
  "jobTitle": "Frontend Engineer",
  "url": "https://samirsaurabh.dev",
  "email": "samirsaurabh.dev@gmail.com",
  "address": { "@type": "PostalAddress", "addressLocality": "Bangalore", "addressCountry": "IN" },
  "sameAs": ["https://linkedin.com/in/samirsaurabh", "https://github.com/samirsaurabh"],
  "knowsAbout": ["React", "TypeScript", "Core Web Vitals", "Frontend Engineering"]
}
</script>
```

### 5.5 OG Image (`public/og-image.png`)
- 1200×630px PNG
- Dark background (#1a1a1a), name in large Syne font, tagline, cyan accent, minimal photo in corner
- Generated once as a static file — no dynamic image generation needed

### 5.6 Additional Files
- `public/robots.txt` — allow all, point to sitemap
- `public/sitemap.xml` — single-page site, one URL entry

---

## 6. API Key Security (Vercel Edge Function)

**Problem:** `VITE_GROK_API_KEY` is bundled into client JS — anyone can steal it.  
**Solution:** Move to a Vercel Edge Function proxy.

**File:** `api/chat.js` (Vercel serverless function)
```js
export default async function handler(req) {
  const { messages } = await req.json()
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, // server-side only
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: SYSTEM_CONTEXT }, ...messages],
      max_tokens: 800,
      temperature: 0.7,
      stream: true,
    }),
  })
  return new Response(response.body, {
    headers: { 'Content-Type': 'text/event-stream' }
  })
}
```

`GROQ_API_KEY` stored as Vercel environment variable — never in client code.  
`VITE_GROK_API_KEY` env var removed entirely.

---

## 7. Animation System Summary

| Section | Before | After |
|---------|--------|-------|
| Hero | CSS fadeUp (0.8s) | Framer Motion sequence, spring physics, typewriter |
| Avatar | None | CSS breathing + GSAP eye tracking + random blink |
| Stats | Static | useCounter hook — counts up on mount |
| Skills grid | CSS fade-in IntersectionObserver | Framer Motion stagger, whileHover lift |
| Experience | CSS slide IntersectionObserver | Framer Motion spring, SVG timeline draw |
| Projects | CSS fade IntersectionObserver | Framer Motion stagger, whileHover float |
| AI Chat | None | Framer Motion message appear, streaming text |
| Contact | CSS fade-in | Framer Motion stagger |
| Navbar | CSS transition | Active section highlight (IntersectionObserver) |

---

## 8. What Does NOT Change

- Overall color palette (dark: #1a1a1a + #22d3ee; light: #f8f9fa + #4a90e2)
- Typography (Syne, DM Mono, Instrument Serif)
- Dark/light theme system (ThemeContext, CSS variables)
- All portfolio content (stats, experience, project names, skills)
- Custom cursor (Cursor.jsx)
- Footer
- EmailJS resume tracking in Hero

---

## 9. File Changes Summary

| File | Change |
|------|--------|
| `index.html` | SEO meta, OG tags, JSON-LD |
| `public/robots.txt` | New file |
| `public/sitemap.xml` | New file |
| `public/og-image.png` | New static OG image |
| `src/assets/samir-avatar.webp` | New — processed photo |
| `src/context/ChatContext.jsx` | New — shared chat state |
| `src/components/AvatarHero.jsx` | New — avatar with eye tracking |
| `src/components/Hero.jsx` | Redesigned (2-col, uses AvatarHero) |
| `src/components/Skills.jsx` | Framer Motion animations |
| `src/components/Experience.jsx` | Framer Motion animations |
| `src/components/Projects.jsx` | Framer Motion + NDA badges + GitHub links |
| `src/components/AIChat.jsx` | Streaming, markdown, shared context |
| `src/components/Contact.jsx` | Add EmailJS contact form |
| `src/components/Navbar.jsx` | GitHub link, active section highlight |
| `src/App.jsx` | Remove IntersectionObserver (Framer Motion replaces it), add ChatProvider |
| `api/chat.js` | New — Vercel Edge Function proxy |

---

## 10. Success Criteria

- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse SEO = 100
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Avatar eye tracking works on desktop, gracefully absent on mobile
- [ ] AI streaming works — text appears word by word
- [ ] Hero mini-chat and full AI Chat section share conversation state
- [ ] OG image renders correctly on LinkedIn share
- [ ] JSON-LD validates at schema.org/validator
- [ ] All Framer Motion animations run at 60fps (no layout thrash)
- [ ] Contact form sends email successfully
