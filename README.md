# Mahi — Founder & Venture Strategist

A luxury, interactive executive portfolio featuring a 60 FPS cursor-tracking character canvas, executive venture showcases, leadership philosophy, synthesized tactile audio, and interactive inquiry modals.

![React](https://img.shields.io/badge/React-19-blue?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5.4-purple?style=flat-square)
![OpenCV](https://img.shields.io/badge/OpenCV-Python-green?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-black?style=flat-square)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=flat-square)

---

## 🌟 Overview & Key Features

- **60 FPS Cursor-Tracking Canvas**: Full-screen HTML5 Canvas renderer that continuously calculates cursor vector angles (`atan2(-dy, dx)`) relative to Mahi's face, smoothly steering her gaze in 360° across 64 high-resolution WebP frames.
- **Direct Eye-Contact Deadzone**: When the viewer's cursor enters the sweet spot near her eyes, the canvas locks onto `center.webp` (Frame 0) for mesmerizing, direct eye contact.
- **Barbie Pink Luxury Executive Theme**: Bespoke editorial palette featuring `#ee8299` (Barbie Pink), `#e0218a` (vibrant magenta accent), and deep obsidian `#1f1418` typography.
- **Ventures & Directorships Showcase**: High-profile initiatives (*Aura Capital*, *Lumina Studio*, *Apex Systems*, *Genesis Impact*) with an interactive mandate lightbox and technical specifications.
- **Executive Leadership Philosophy**: 4 strategic pillars (*Capital Allocation*, *Ecosystem Velocity*, *Generative Systems*, *Board Governance*), leadership chronology (2023–2026), and industry honors.
- **Interactive Modals**:
  - **Advisory Inquiry Dialog**: Categorized inquiry form (Venture Advisory, Board Directorship, Keynote Speaking, Capital Partnerships) with live sound feedback and success state.
  - **Executive CV Modal**: Comprehensive printable executive CV (Oxford Saïd, LSE, Board Directorships, Advisory Mandates, Accreditations) with `@media print` formatting.
- **Synthesized Web Audio**: Tactile clicks and soft hover chimes using the native Web Audio API (zero audio files needed, fully toggleable with mute state).
- **Mobile Touch Gaze**: Interactive touch-tracking for mobile devices that smoothly drifts back to eye contact upon release.

---

## 📁 Repository Structure

```
portfolio_mahi/
├── package.json                        # Root workspace scripts (npm run dev / build)
├── extract_frames.py                   # OpenCV frame extraction & inpainting script
├── portfolio-hero/                     # Frontend Vite + React application
│   ├── index.html                      # HTML root with Cinzel & Playfair Display fonts
│   ├── package.json                    # Application dependencies (React 19, Lucide, Vite)
│   ├── vite.config.js                  # Vite configuration (port 3001)
│   ├── public/
│   │   └── frames/                     # 64 circular WebP frames + center.webp
│   └── src/
│       ├── main.jsx                    # Application entry point
│       ├── App.jsx                     # Root application state & modal wiring
│       ├── index.css                   # Global Barbie Pink tokens & glassmorphism
│       ├── CharacterCanvas.jsx         # 60 FPS circular gaze-tracking canvas
│       ├── HeroSection.jsx             # Luxury hero card & top navigation pill
│       ├── HeroSection.css             # Hero styles, magnetic cursor & glass pill
│       ├── ProjectsSection.jsx         # Ventures showcase & mandate lightbox modal
│       ├── ProjectsSection.css         # Ventures masonry grid & lightbox styles
│       ├── ProjectMockup.jsx           # Generative visual artworks for venture cards
│       ├── AboutSection.jsx            # Executive practice, pillars & chronology
│       ├── AboutSection.css            # Practice timeline & distinction styles
│       ├── ContactSection.jsx          # Advisory inquiries, global offices & colophon
│       ├── ContactSection.css          # Contact card, copy-to-clipboard button
│       ├── ContactModal.jsx            # Advisory inquiry form modal
│       ├── ContactModal.css            # Frosted glass inquiry modal styling
│       ├── ResumeModal.jsx             # Executive CV modal with print stylesheet
│       ├── ResumeModal.css             # Executive CV layout & @media print styles
│       ├── soundEffects.js             # Web Audio API procedural sound synthesizer
│       └── useScrollReveal.js          # IntersectionObserver hook for scroll reveals
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18.0 or higher)
- **npm** or **pnpm** / **yarn**

### 1. Install Dependencies

From the repository root:
```bash
npm run install:all
```
*(Or `cd portfolio-hero && npm install`)*

### 2. Start the Development Server

```bash
npm run dev
```
Open **[http://localhost:3001/](http://localhost:3001/)** in your browser.

### 3. Build for Production

```bash
npm run build
```
The optimized production bundle will be output to `portfolio-hero/dist/`.

---

## 🛠️ How It Works

### 1. Character Tracking Engine (`CharacterCanvas.jsx`)
- Computes cursor vector `dx = mouseX - faceCX`, `dy = mouseY - faceCY`.
- Converts cursor direction into continuous radians `atan2(-dy, dx)`.
- Normalizes angle to floating-point frame index `[0..64)`.
- Uses shortest-path circular interpolation with multi-tier acceleration:
  - Fast sweeps ($\Delta > 6$ frames) accelerate with `speedFactor = 0.58+` and `MAX_FRAME_STEP = 6.2`.
  - Gentle movements smoothly decelerate into sub-frame settling without jitter.
- Within `DEADZONE_ENTER = 0.045`, the canvas locks onto `center.webp` (Frame 0) for direct eye contact.

### 2. Video Extraction & Watermark Inpainting (`extract_frames.py`)
- Python pipeline utilizing `opencv-python` and `numpy`.
- Reads source video `Woman_moving_eyes_and_head_20261008214536.mp4`.
- Inpaints bottom-right AI watermark region `[790:1020, 1590:1870]` using Telea fast inpainting (`cv2.INPAINT_TELEA`).
- Saves 64 directional frames (`000.webp`..`063.webp`) and neutral eye-contact frame (`center.webp`) at 92 WebP quality.

To re-run the frame extraction:
```bash
uv run --with opencv-python --with numpy python extract_frames.py
```

---

## 🎨 Customization Guide

- **Theme Colors**: Edit CSS variables in `portfolio-hero/src/index.css` (`--bg-primary: #ee8299`, `--accent-magenta: #e0218a`, etc.).
- **Executive Bio & Role**: Edit copy in `portfolio-hero/src/HeroSection.jsx`.
- **Ventures**: Update initiative titles, descriptions, and metrics in `portfolio-hero/src/ProjectsSection.jsx`.
- **CV / Resume**: Update education, board appointments, and accolades in `portfolio-hero/src/ResumeModal.jsx`.
- **Contact Details**: Update email address and office locations in `portfolio-hero/src/ContactSection.jsx`.

---

## 📄 License

MIT © Studio Mahi
