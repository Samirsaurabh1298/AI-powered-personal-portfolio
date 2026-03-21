/* ============================================================
   SAMIR SAURABH — PORTFOLIO
   main.js
   ============================================================ */

/* ── EMAILJS CONFIG — Resume Download Notification ── */
// 👉 Replace these with your EmailJS credentials from emailjs.com
const EMAILJS_SERVICE_ID  = 'service_wngp6sa';
const EMAILJS_TEMPLATE_ID = 'ku3856n';
const EMAILJS_PUBLIC_KEY  = 'PSQWJd02fRQeiXKIl';

function initEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
}

async function notifyResumeDownload() {
  if (typeof emailjs === 'undefined') return;

  const now       = new Date();
  const timestamp = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const userAgent = navigator.userAgent;
  const referrer  = document.referrer || 'Direct visit';

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email:   'samirsaurabh.dev@gmail.com',
      subject:    '🎉 Someone downloaded your resume!',
      timestamp,
      user_agent: userAgent,
      referrer,
      message:    `Your resume was downloaded on ${timestamp}.\n\nBrowser: ${userAgent}\nReferrer: ${referrer}`,
    });
    console.log('Resume download notification sent!');
  } catch (err) {
    console.warn('EmailJS notification failed:', err);
    // Fail silently — download still works even if notification fails
  }
}

/* ── THEME TOGGLE ── */
function toggleTheme() {
  const html = document.documentElement;
  html.classList.toggle('light');
  html.classList.add('dark-forced');
  localStorage.setItem('theme', html.classList.contains('light') ? 'light' : 'dark');
}

// Restore saved theme or respect OS preference on page load
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.documentElement.classList.add('light');
    document.documentElement.classList.add('dark-forced');
  } else if (saved === 'dark') {
    document.documentElement.classList.add('dark-forced');
  }
  // else: no saved pref → CSS @media (prefers-color-scheme) handles it
})();

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

/* ── NAV SCROLL EFFECT ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

/* ── SCROLL ANIMATIONS (IntersectionObserver) ── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll('.fade-in, .exp-item, .project-card').forEach((el) =>
  observer.observe(el)
);

/* ── AI CHAT (Gemini API) ── */
const GEMINI_API_KEY = 'gsk_REPLACE_WITH_YOUR_GROQ_KEY';

const SYSTEM_CONTEXT = `You are an AI assistant for Samir Saurabh's portfolio website. Answer questions about Samir in first person (as if you are him). Be concise, professional, and friendly. Keep answers under 100 words unless asked for details.

About Samir:
- Frontend Engineer with 3+ years of experience at Mahindra First Choice Wheels Ltd. (MFCWL), Bangalore
- Specializes in React.js, TypeScript, Core Web Vitals optimization, and design system architecture
- Built and maintained 4+ production React applications serving 300K+ monthly users
- Improved app performance by 35% through code splitting, lazy loading, memoization
- Achieved Core Web Vitals: LCP 1.8s, FID 14ms, CLS 0.12 — best-in-class metrics
- Architected reusable component library with 50+ TypeScript components (atomic design) — reduced dev time by 40%
- Led 15+ major feature deliveries in Agile cross-functional teams (UX, backend, QA)
- Reduced design-to-dev turnaround by 30% during internship
- Tech stack: React.js (Hooks, Context API), Redux, TypeScript, JavaScript ES6+, Tailwind CSS, Material-UI, Bootstrap, Formik, Jest, React Testing Library
- Tools: Git, Vite, Webpack, Chrome DevTools, Postman, Jira, AWS S3, AWS Amplify, Vercel, Netlify
- Projects: Ediig Auction Platform Revamp (real-time WebSocket), Vehicle Inspection AI Platform (Chart.js dashboards), MFCWL Website (CWV optimization), YMS (SVG fractional ratings)
- Education: B.Tech Computer Science, School of Research and Technology Bhopal, 2020
- Location: Bangalore, India
- Email: samirsaurabh.dev@gmail.com
- LinkedIn: linkedin.com/in/samirsaurabh
- Open to new opportunities`;

let chatHistory = [];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function addMsg(text, role) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.innerHTML = `<div class="msg-bubble">${text}</div><div class="msg-time">${getTime()}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function showTyping() {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.id = 'typing';
  div.innerHTML = `<div class="typing-indicator">
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  </div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typing');
  if (t) t.remove();
}

async function sendMessage() {
  const input   = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const text    = input.value.trim();
  if (!text) return;

  input.value = '';
  input.style.height = 'auto';
  sendBtn.disabled = true;

  addMsg(text, 'user');
  chatHistory.push({ role: 'user', parts: [{ text }] });
  showTyping();

  try {

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GEMINI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_CONTEXT },
            ...chatHistory.map(m => ({
              role: m.role === 'model' ? 'assistant' : m.role,
              content: m.parts[0].text
            }))
          ],
          max_tokens: 300,
          temperature: 0.7
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      console.error('Groq API error:', errData);
      throw new Error(errData?.error?.message || 'API error');
    }

    const data  = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that. Please try again!";
    chatHistory.push({ role: 'model', parts: [{ text: reply }] });
    removeTyping();
    addMsg(reply, 'bot');
  } catch (err) {
    removeTyping();
    console.error('Chat error:', err);
    addMsg(`Error: ${err.message}. Check the browser console (F12) for details.`, 'bot');
  }

  sendBtn.disabled = false;
  input.focus();
}

/* ── EVENT LISTENERS (all wired here, no inline HTML handlers) ── */
document.addEventListener('DOMContentLoaded', () => {
  // Init EmailJS
  initEmailJS();

  // Resume download tracking
  const resumeBtn = document.getElementById('resumeBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      resumeBtn.textContent = '↓ Opening...';
      resumeBtn.classList.add('downloading');
      notifyResumeDownload().finally(() => {
        setTimeout(() => {
          resumeBtn.textContent = '↓ Download Resume';
          resumeBtn.classList.remove('downloading');
        }, 2000);
      });
    });
  }
  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  // Chat send button
  document.getElementById('sendBtn').addEventListener('click', sendMessage);

  // Chat Enter key
  document.getElementById('chatInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Chat textarea auto-resize
  document.getElementById('chatInput').addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 100) + 'px';
  });

  // Suggestion buttons
  document.querySelectorAll('[data-suggest]').forEach((btn) => {
    btn.addEventListener('click', function () {
      document.getElementById('chatInput').value = this.textContent.trim();
      sendMessage();
    });
  });
});