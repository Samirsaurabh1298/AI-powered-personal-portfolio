# 🚀 Samir Saurabh — Frontend Engineer Portfolio

> A modern, AI-powered personal portfolio website built with vanilla HTML, CSS, and JavaScript.

---

## ✨ Features

- 🤖 **AI Chat Assistant** — Powered by Groq (Llama 3.3 70B). Visitors can ask anything about my experience, skills, and projects
- 🌙 **Dark / Light Theme Toggle** — Smooth theme switching with OS preference detection and localStorage persistence
- 📄 **Resume Download Tracking** — Email notification via EmailJS every time someone downloads the resume
- ⚡ **Custom Animated Cursor** — Smooth cursor with ring follower effect
- 🎨 **Scroll Animations** — IntersectionObserver-based fade-in animations
- 📱 **Fully Responsive** — Works on all screen sizes
- 🎯 **Zero Dependencies** — No frameworks, no build tools, pure vanilla code

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (Custom Properties, Grid, Flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| AI Chat | Groq API (Llama 3.3 70B Versatile) |
| Notifications | EmailJS |
| Fonts | Google Fonts (Syne, DM Mono, Instrument Serif) |
| Hosting | GitHub Pages |

---

## 📁 Project Structure

```
portfolio/
├── index.html       # Main HTML structure
├── styles.css       # All styles, CSS variables, themes, animations
├── main.js          # JavaScript — AI chat, theme toggle, cursor, events
├── README.md        # Project documentation
└── DEPLOY.md        # Deployment guide
```

---

## 🚀 Getting Started

### Run Locally

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
```

2. Open with Live Server (VS Code extension) or any local server:
```bash
npx serve .
```

3. Visit `http://localhost:3000`

> ⚠️ Must be served via `http://` — opening `index.html` directly via `file://` will block the AI chat API calls.

---

## 🔑 Environment Setup

This project uses two external APIs. Replace the credentials in `main.js`:

### Groq API (AI Chat)
```js
const GROQ_API_KEY = 'your_groq_api_key';
```
Get your free key at → [console.groq.com](https://console.groq.com)

### EmailJS (Resume Download Notification)
```js
const EMAILJS_SERVICE_ID  = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id';
const EMAILJS_PUBLIC_KEY  = 'your_public_key';
```
Get your free credentials at → [emailjs.com](https://emailjs.com)

---

## 🎨 Theming

The portfolio supports full dark/light theming via CSS custom properties:

```css
/* Dark Mode (default) */
:root {
  --bg: #1a1a1a;
  --accent: #22d3ee;
  --text: #e0e0e0;
}

/* Light Mode */
html.light {
  --bg: #f8f9fa;
  --accent: #4a90e2;
  --text: #212529;
}
```

Theme preference is saved to `localStorage` and respects `prefers-color-scheme` on first visit.

---

## 📊 Portfolio Sections

| Section | Description |
|---------|-------------|
| **Hero** | Name, role, key stats, CTA buttons |
| **Skills** | 6 skill categories with tech tags |
| **Experience** | Timeline of work history |
| **Projects** | 4 production projects with metrics |
| **AI Chat** | Live Groq-powered assistant |
| **Contact** | Email, LinkedIn, phone |

---

## 📈 Projects Showcased

1. **Ediig Auction Platform** — Real-time WebSocket bidding platform (45% perf boost)
2. **Vehicle Inspection AI Platform** — Dashboard with Chart.js + PDF/CSV export
3. **Mahindra First Choice Website** — LCP 1.8s, FID 14ms, CLS 0.12
4. **Yard Management System** — SVG fractional star ratings

---

## 🌐 Live Demo

> **[samirsaurabh.github.io/portfolio](https://samirsaurabh.github.io/portfolio)**

---

## 📬 Contact

| Platform | Link |
|----------|------|
| Email | samirsaurabh.dev@gmail.com |
| LinkedIn | [linkedin.com/in/samirsaurabh](https://linkedin.com/in/samirsaurabh) |
| Phone | +91 6200432657 |
| Location | Bangalore, India |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Built with ♥ + AI · Bangalore, India</p>