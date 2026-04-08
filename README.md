# Kunal Chauhan | High-Performance Portfolio

**Live Demo: [https://spidykunal.onrender.com/](https://spidykunal.onrender.com/)**

A premium, interactive portfolio website engineered for high visual impact and professional clarity. This project combines futuristic aesthetics with industrial-grade software engineering principles.

## 🕷️ The Cinematic Experience

This portfolio is not just a site; it's a digital journey:
- **Spider-Verse Identity Reveal**: Custom Three.js shaders (Hero) and CSS masks (About) create a "Secret Identity" transition where the Spider-Man persona reveals the developer underneath.
- **Cinematic Soundtrack**: Integrated background audio (`spider_man.mp3`) with an "Initialize Experience" entrance overlay to comply with browser autoplay policies.
- **Scroll-Aware Audio**: The music automatically fades to 0 volume when scrolling away from the Hero section and fades back in when returning.
- **Inertial Smooth Scrolling**: Powered by **Lenis**, providing a weighty, cinematic feel to every movement.

## 🚀 Technical Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS (v4)
- **Animations**: GSAP (ScrollTrigger)
- **Engine**: Three.js (WebGL Shaders)
- **Smooth Scroll**: Lenis
- **Deployment**: Render (Static Site)

## 📂 Project Structure

- `src/components/CinematicEntrance.jsx`: Handles pre-loader, interaction-based audio start, and volume muting.
- `src/components/SmoothScroll.jsx`: Initializes Lenis inertial scrolling synced with GSAP.
- `src/components/Hero.jsx`: High-performance WebGL shader hero with identity reveal.
- `src/components/Experience.jsx`: Animated career timeline.
- `src/components/Projects.jsx`: Interactive mission dossier (3D tilt effect).
- `src/components/Navbar.jsx`: Responsive navigation with integrated **GitHub**, **LinkedIn**, and **Instagram** socials.

## 🛠️ Local Development

1. **Clone & Install**:
   ```bash
   git clone https://github.com/burgerbeast7/kunal-spider-style-portfolio.git
   cd kunal-spider-style-portfolio
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```

## 🌐 Deployment (Render)

This project is configured for seamless deployment on **Render** via the included `render.yaml`.

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Static Site Routing**: Automatically handles React SPA rewrites to `index.html`.

## 👤 Personal Profile

- **Name**: Kunal Chauhan
- **Location**: Palampur, India
- **Focus**: Full-Stack Development · Django · React · AWS
- **GitHub**: [burgerbeast7](https://github.com/burgerbeast7)
- **LinkedIn**: [Kunal Chauhan](https://www.linkedin.com/in/kunal-chauhan-7a7539287/)

---
*© 2026 Kunal Chauhan. Engineered for the future.*
