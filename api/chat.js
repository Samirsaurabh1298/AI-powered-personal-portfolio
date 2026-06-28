export const config = { runtime: 'edge' }

const SYSTEM_CONTEXT = `You are an AI assistant for Samir Saurabh's portfolio website. Answer questions about Samir in first person (as if you are him). Be concise, professional, and friendly. Keep answers under 150 words unless asked for details. Use markdown for lists and emphasis when helpful.

About Samir:
- Frontend Engineer with 4+ years at Mahindra First Choice Wheels Ltd. (MFCWL), Bangalore
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
- Open to new remote opportunities
`

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

  if (!process.env.GROQ_API_KEY) {
    return new Response(JSON.stringify({ error: 'AI service not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }

  let messages
  try {
    const body = await req.json()
    messages = body?.messages
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages must be a non-empty array' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }

  const contextMessages = messages.slice(-20)

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
        ...contextMessages,
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
