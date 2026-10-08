# Portfolio Mahi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a luxury executive portfolio for Mahi (Founder & Venture Strategist) featuring 60 FPS vector cursor-tracking canvas with Barbie Pink (`#ee8299`) studio background, translucent frosted scrolling depth, Apple-grade scroll reveals, executive case studies, and interactive consultation/CV modals.

**Architecture:** Full-screen fixed HTML5 Canvas preloading 64 pre-extracted and Telea-inpainted WebP frames + center eye-contact frame from `C:\porfolio_mahi\Woman_moving_eyes_and_head_20261008214536.mp4`. React + Vite application with translucent frosted glass content wrapper (`<main className="content-wrapper">`) with `backdrop-filter: blur(20px)` and zero-CPU IntersectionObserver for staggered optical blur-dissolve entries.

**Tech Stack:** React 18, Vite 5, Lucide React, Web Audio API, HTML5 Canvas, OpenCV Python, Vanilla CSS tokens.

**Spec:** [`docs/superpowers/specs/2026-10-08-portfolio-mahi-design.md`](file:///c:/Users/jishu/Documents/antigravity/portfolio_mahi/docs/superpowers/specs/2026-10-08-portfolio-mahi-design.md)

## Global Constraints
- Target Workspace: `c:\Users\jishu\Documents\antigravity\portfolio_mahi`
- Target GitHub Repository: `https://github.com/JISHU-GHOSH/portfolio_mahi`
- Base Palette: `#ee8299` (Barbie Pink, exact match with video background), `#e0218a` (Hot Pink Accent), `#1f1418` (High-Fashion Dark Text)
- Watermark Inpainting: Kling AI sparkle at `[790:1020, 1590:1870]` using `cv2.inpaint(img, mask, 6, cv2.INPAINT_TELEA)`
- Strictly NO technical jargon copy (e.g., do NOT write "60 FPS canvas renderer" or similar on screen) and NO easter eggs
- Hero text positioned strictly bottom-left (`bottom: 5vh; left: 5vw; max-width: 360px`) to never obstruct Mahi's face

---

### Task 1: Frame Extraction & Watermark Inpainting Pipeline

**Files:**
- Create: `c:\Users\jishu\Documents\antigravity\portfolio_mahi\extract_frames.py`
- Output: `c:\Users\jishu\Documents\antigravity\portfolio_mahi\portfolio-hero\public\frames\000.webp` through `063.webp` + `center.webp`

**Interfaces:**
- Consumes: `C:\porfolio_mahi\Woman_moving_eyes_and_head_20261008214536.mp4`
- Produces: 64 WebP directional frames mapped to 360° counter-clockwise polar angles + `center.webp` (neutral eye-contact) at quality 92

- [ ] **Step 1: Write `extract_frames.py`**

```python
import cv2
import numpy as np
import os
import sys

VIDEO_PATH = r"C:\porfolio_mahi\Woman_moving_eyes_and_head_20261008214536.mp4"
OUT_DIR = r"portfolio-hero/public/frames"
os.makedirs(OUT_DIR, exist_ok=True)

# 64-frame counter-clockwise circular mapping for Mahi:
# 0..7:   RIGHT (0°) -> UP-RIGHT (45°)
# 8..15:  UP-RIGHT (45°) -> UP (90°)
# 16..23: UP (90°) -> UP-LEFT (135°)
# 24..31: UP-LEFT (135°) -> LEFT (180°)
# 32..39: LEFT (180°) -> DOWN-LEFT (225°)
# 40..47: DOWN-LEFT (225°) -> DOWN (270°)
# 48..55: DOWN (270°) -> DOWN-RIGHT (315°)
# 56..63: DOWN-RIGHT (315°) -> RIGHT (360°/0°)
frame_map = [
    # 0..7: 0° to 45° (RIGHT -> UP-RIGHT)
    124, 126, 128, 130, 132, 178, 180, 182,
    # 8..15: 45° to 90° (UP-RIGHT -> UP)
    184, 186, 188, 190, 8, 10, 12, 14,
    # 16..23: 90° to 135° (UP -> UP-LEFT)
    14, 16, 18, 20, 202, 204, 206, 208,
    # 24..31: 135° to 180° (UP-LEFT -> LEFT)
    210, 212, 214, 142, 144, 146, 148, 150,
    # 32..39: 180° to 225° (LEFT -> DOWN-LEFT)
    150, 152, 154, 58, 60, 62, 64, 66,
    # 40..47: 225° to 270° (DOWN-LEFT -> DOWN)
    66, 68, 70, 44, 46, 48, 50, 52,
    # 48..55: 270° to 315° (DOWN -> DOWN-RIGHT)
    52, 54, 56, 34, 36, 38, 40, 42,
    # 56..63: 315° to 360° (DOWN-RIGHT -> RIGHT)
    116, 118, 120, 121, 122, 123, 124, 124
]

def inpaint_frame(img):
    mask = np.zeros(img.shape[:2], dtype=np.uint8)
    mask[790:1020, 1590:1870] = 255
    return cv2.inpaint(img, mask, 6, cv2.INPAINT_TELEA)

cap = cv2.VideoCapture(VIDEO_PATH)
if not cap.isOpened():
    print(f"Error opening video: {VIDEO_PATH}")
    sys.exit(1)

all_frames = {}
needed = set(frame_map)
needed.add(0) # Center direct eye-contact frame

f_idx = 0
while True:
    ret, frame = cap.read()
    if not ret: break
    if f_idx in needed:
        all_frames[f_idx] = frame
    f_idx += 1
cap.release()

print(f"Loaded {len(all_frames)} needed video frames.")

# Save 64 directional frames
for i, f_num in enumerate(frame_map):
    cleaned = inpaint_frame(all_frames[f_num])
    out_path = os.path.join(OUT_DIR, f"{i:03d}.webp")
    cv2.imwrite(out_path, cleaned, [cv2.IMWRITE_WEBP_QUALITY, 92])

# Save center eye contact frame
cleaned_center = inpaint_frame(all_frames[0])
cv2.imwrite(os.path.join(OUT_DIR, "center.webp"), cleaned_center, [cv2.IMWRITE_WEBP_QUALITY, 92])

print(f"Successfully saved 64 WebP frames + center.webp to {OUT_DIR}")
```

- [ ] **Step 2: Run `extract_frames.py`**

Run: `uv run --with opencv-python --with numpy python extract_frames.py`
Expected: "Successfully saved 64 WebP frames + center.webp to portfolio-hero/public/frames"

- [ ] **Step 3: Verify all 65 `.webp` files exist**

Run: `Test-Path portfolio-hero/public/frames/063.webp`, `Test-Path portfolio-hero/public/frames/center.webp`
Expected: True

- [ ] **Step 4: Commit**

```bash
git add extract_frames.py portfolio-hero/public/frames
git commit -m "feat: extract 64 circular WebP frames and center eye contact frame"
```

---

### Task 2: Project Setup & Barbie Pink Theme Foundation

**Files:**
- Create: `portfolio-hero/package.json`
- Create: `portfolio-hero/vite.config.js`
- Create: `portfolio-hero/index.html`
- Create: `portfolio-hero/src/index.css`
- Create: `portfolio-hero/src/main.jsx`
- Create: `portfolio-hero/src/App.jsx`

**Interfaces:**
- Produces: Base Vite + React project runnable via `npm run dev` and `npm run build`

- [ ] **Step 1: Create `portfolio-hero/package.json`**

```json
{
  "name": "portfolio-mahi",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.1.4"
  }
}
```

- [ ] **Step 2: Create `portfolio-hero/vite.config.js`**

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    host: true,
  },
});
```

- [ ] **Step 3: Create `portfolio-hero/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#ee8299" />
    <meta name="description" content="Mahi — Founder & Venture Strategist. Advising high-growth ventures, private capital allocation, and global market expansion." />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23e0218a'/><text x='50' y='64' font-family='serif' font-size='46' fill='%23ffffff' text-anchor='middle'>M</text></svg>" />
    <title>Mahi — Founder &amp; Venture Strategist</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create `portfolio-hero/src/index.css`**

```css
:root {
  /* Barbie Pink Luxury Palette */
  --bg-primary: #ee8299;
  --bg-primary-dark: #e07289;
  --text-primary: #1f1418;
  --text-secondary: rgba(31, 20, 24, 0.78);
  --text-muted: rgba(31, 20, 24, 0.52);
  --accent-barbie: #e0218a;
  --accent-barbie-hover: #c71578;
  --accent-barbie-light: rgba(224, 33, 138, 0.12);

  /* Frosted Glass Tokens */
  --glass-bg: rgba(255, 240, 245, 0.45);
  --glass-bg-subtle: rgba(255, 240, 245, 0.28);
  --glass-bg-hover: rgba(255, 240, 245, 0.65);
  --glass-border: rgba(255, 255, 255, 0.55);
  --glass-border-subtle: rgba(255, 255, 255, 0.30);
  --glass-shadow: 0 14px 40px 0 rgba(31, 20, 24, 0.08);

  /* Typography */
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-cinzel: 'Cinzel', serif;
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-sans);
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

body {
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-sans);
  overflow-x: hidden;
  line-height: 1.6;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
}

::selection {
  background-color: var(--accent-barbie);
  color: #ffffff;
}

/* Custom Scrollbar */
::-webkit-scrollbar { width: 9px; height: 9px; }
::-webkit-scrollbar-track { background: #e8768e; }
::-webkit-scrollbar-thumb {
  background: var(--accent-barbie);
  border-radius: 9999px;
  border: 2px solid #e8768e;
}
::-webkit-scrollbar-thumb:hover { background: var(--accent-barbie-hover); }

/* Typography Helpers */
.font-serif { font-family: var(--font-serif); }
.font-cinzel { font-family: var(--font-cinzel); }
.font-sans { font-family: var(--font-sans); }

/* Glass Surfaces */
.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  border-radius: 20px;
}

.glass-card {
  background: var(--glass-bg-subtle);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--glass-border-subtle);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-card:hover {
  background: var(--glass-bg-hover);
  border-color: var(--glass-border);
  transform: translateY(-2px);
  box-shadow: 0 16px 36px rgba(31, 20, 24, 0.12);
}

.frosted-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 240, 245, 0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 9999px;
  padding: 0.5rem 1.25rem;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  text-decoration: none;
}

/* Button Utilities */
.btn-editorial {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 0.875rem 1.75rem;
  border-radius: 9999px;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  border: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
}

.btn-primary {
  background: var(--accent-barbie);
  color: #ffffff;
  box-shadow: 0 4px 18px rgba(224, 33, 138, 0.35);
}

.btn-primary:hover {
  background: var(--accent-barbie-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(224, 33, 138, 0.45);
}

.btn-secondary {
  background: rgba(255, 240, 245, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.65);
  color: var(--text-primary);
}

.btn-secondary:hover {
  background: rgba(255, 240, 245, 0.9);
  border-color: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
}

/* Scroll-Driven Reveal Choreography */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(38px) scale(0.97);
  filter: blur(8px);
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.85s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--reveal-delay, 0ms);
  will-change: opacity, transform, filter;
}

.reveal-on-scroll.is-revealed {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0px);
}

@media (prefers-reduced-motion: reduce) {
  .reveal-on-scroll {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
    transition: none !important;
  }
}
```

- [ ] **Step 5: Create `portfolio-hero/src/main.jsx` and placeholder `App.jsx`**

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```jsx
// src/App.jsx
import React from 'react';

export default function App() {
  return <div>Mahi Portfolio Initializing...</div>;
}
```

- [ ] **Step 6: Run `npm install` and verify build**

Run: `cd portfolio-hero; npm install; npm run build`
Expected: "built in ...s" with 0 errors.

- [ ] **Step 7: Commit**

```bash
git add portfolio-hero
git commit -m "chore: scaffold Vite React project and Barbie Pink theme tokens"
```

---

### Task 3: Character Canvas Component (`CharacterCanvas.jsx`)

**Files:**
- Create: `portfolio-hero/src/CharacterCanvas.jsx`

**Interfaces:**
- Produces: `<CharacterCanvas />` rendering fixed full-screen 60 FPS vector cursor tracking canvas

- [ ] **Step 1: Write `CharacterCanvas.jsx`**

```jsx
import { useRef, useEffect } from 'react';

const NUM_FRAMES      = 64;
const DEADZONE_RADIUS = 0.08;
const BG_COLOR        = '#ee8299'; // Exact match with video background
const FACE_CENTER_X   = 0.502;
const FACE_CENTER_Y   = 0.389;

const FRAME_LERP      = 0.22;
const MAX_FRAME_STEP  = 2.8;
const ASPECT_RATIO    = 1920 / 1080;

export default function CharacterCanvas({ className = 'character-canvas' }) {
  const canvasRef = useRef(null);

  const state = useRef({
    frames:         [],
    centerImg:      null,
    loaded:         0,
    totalFrames:    NUM_FRAMES + 1,
    smoothFrame:    0,
    targetAngle:    0,
    isCenter:       true,
    rafId:          null,
    mouseX:         FACE_CENTER_X,
    mouseY:         FACE_CENTER_Y,
    isReady:        false,
  });

  useEffect(() => {
    const s = state.current;
    let isMounted = true;
    const framesArray = [];

    const onImageLoaded = () => {
      if (!isMounted) return;
      s.loaded++;
      if (s.loaded >= s.totalFrames) s.isReady = true;
    };

    const baseUrl = import.meta.env.BASE_URL || '/';

    for (let i = 0; i < NUM_FRAMES; i++) {
      const img = new Image();
      img.onload = onImageLoaded;
      img.onerror = onImageLoaded;
      img.src = `${baseUrl}frames/${String(i).padStart(3, '0')}.webp`;
      framesArray.push(img);
    }
    s.frames = framesArray;

    const center = new Image();
    center.onload = onImageLoaded;
    center.onerror = onImageLoaded;
    center.src = `${baseUrl}frames/center.webp`;
    s.centerImg = center;

    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const s = state.current;
    let isTouching = false;
    let touchReturnRaf = null;

    const onMove = e => {
      if (window.innerWidth > 0 && window.innerHeight > 0) {
        s.mouseX = e.clientX / window.innerWidth;
        s.mouseY = e.clientY / window.innerHeight;
      }
    };

    const onTouchStart = e => {
      if (window.scrollY > window.innerHeight * 0.8) return;
      if (e.touches && e.touches[0] && window.innerWidth > 0 && window.innerHeight > 0) {
        isTouching = true;
        if (touchReturnRaf) cancelAnimationFrame(touchReturnRaf);
        s.mouseX = e.touches[0].clientX / window.innerWidth;
        s.mouseY = e.touches[0].clientY / window.innerHeight;
      }
    };

    const onTouchMove = e => {
      if (window.scrollY > window.innerHeight * 0.8) return;
      if (e.touches && e.touches[0] && window.innerWidth > 0 && window.innerHeight > 0) {
        isTouching = true;
        s.mouseX = e.touches[0].clientX / window.innerWidth;
        s.mouseY = e.touches[0].clientY / window.innerHeight;
      }
    };

    const onTouchEnd = () => {
      isTouching = false;
      if (window.scrollY > window.innerHeight * 0.8) return;

      function driftToCenter() {
        if (isTouching) return;
        const dx = FACE_CENTER_X - s.mouseX;
        const dy = FACE_CENTER_Y - s.mouseY;
        if (Math.abs(dx) > 0.005 || Math.abs(dy) > 0.005) {
          s.mouseX += dx * 0.12;
          s.mouseY += dy * 0.12;
          touchReturnRaf = requestAnimationFrame(driftToCenter);
        } else {
          s.mouseX = FACE_CENTER_X;
          s.mouseY = FACE_CENTER_Y;
        }
      }
      if (touchReturnRaf) cancelAnimationFrame(touchReturnRaf);
      touchReturnRaf = requestAnimationFrame(driftToCenter);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      if (touchReturnRaf) cancelAnimationFrame(touchReturnRaf);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    const s = state.current;

    function resize() {
      const W = window.innerWidth;
      const H = window.innerHeight;
      if (W <= 0 || H <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let last = -1;

    function render(ts) {
      s.rafId = requestAnimationFrame(render);

      if (last < 0) last = ts;
      const dt = Math.min(ts - last, 50) / 16.67;
      last = ts;

      const W = window.innerWidth;
      const H = window.innerHeight;
      if (W <= 0 || H <= 0) return;

      const faceCX = W * FACE_CENTER_X;
      const faceCY = H * FACE_CENTER_Y;

      const cx = s.mouseX * W;
      const cy = s.mouseY * H;
      const dx = cx - faceCX;
      const dy = cy - faceCY;

      const dist = Math.sqrt(dx * dx + dy * dy) / Math.min(W, H);
      s.isCenter = dist < DEADZONE_RADIUS;

      s.targetAngle = Math.atan2(-dy, dx);

      let normTarget = s.targetAngle % (2 * Math.PI);
      if (normTarget < 0) normTarget += 2 * Math.PI;
      const targetFrame = (normTarget / (2 * Math.PI)) * NUM_FRAMES;

      let diff = targetFrame - s.smoothFrame;
      if (diff >  NUM_FRAMES / 2) diff -= NUM_FRAMES;
      if (diff < -NUM_FRAMES / 2) diff += NUM_FRAMES;

      const lf = 1 - Math.pow(1 - FRAME_LERP, dt);
      const absDiff = Math.abs(diff);
      const step = Math.sign(diff) * Math.min(absDiff * Math.max(lf, 0.20), MAX_FRAME_STEP);

      s.smoothFrame = ((s.smoothFrame + step) % NUM_FRAMES + NUM_FRAMES) % NUM_FRAMES;

      const frameIdx = Math.round(s.smoothFrame) % NUM_FRAMES;

      let img = null;
      if (s.isCenter && s.centerImg && s.centerImg.complete && s.centerImg.naturalWidth > 0) {
        img = s.centerImg;
      } else if (s.frames[frameIdx] && s.frames[frameIdx].complete && s.frames[frameIdx].naturalWidth > 0) {
        img = s.frames[frameIdx];
      } else if (s.centerImg && s.centerImg.complete && s.centerImg.naturalWidth > 0) {
        img = s.centerImg;
      }

      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, W, H);

      if (img) {
        try {
          const iA = (img.naturalWidth && img.naturalHeight)
            ? (img.naturalWidth / img.naturalHeight)
            : ASPECT_RATIO;
          const cA = W / H;

          let dW, dH, dX, dY;
          if (iA > cA) {
            dH = H;
            dW = dH * iA;
            dX = (W - dW) / 2;
            dY = 0;
          } else {
            dW = W;
            dH = dW / iA;
            dX = 0;
            dY = (H - dH) / 2;
          }

          ctx.drawImage(img, dX, dY, dW, dH);
        } catch {
          // Graceful fallback
        }
      }

      if (!s.isReady && s.totalFrames > 0) {
        const p = Math.min(s.loaded / s.totalFrames, 1);
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(0, H - 3, W, 3);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillRect(0, H - 3, W * p, 3);
      }
    }

    s.rafId = requestAnimationFrame(render);

    return () => {
      if (s.rafId) cancelAnimationFrame(s.rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label="Interactive character — follows your cursor"
      role="img"
    />
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd portfolio-hero; npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add portfolio-hero/src/CharacterCanvas.jsx
git commit -m "feat: implement 60 FPS CharacterCanvas cursor tracking engine"
```

---

### Task 4: Audio System, Navigation & Hero Section

**Files:**
- Create: `portfolio-hero/src/soundEffects.js`
- Create: `portfolio-hero/src/HeroSection.jsx`
- Create: `portfolio-hero/src/HeroSection.css`

**Interfaces:**
- Produces: `<HeroSection />` with fixed canvas, vignette, frosted nav pill, magnetic cursor, bottom-left executive bio, and bottom-right scroll indicator

- [ ] **Step 1: Create `portfolio-hero/src/soundEffects.js`**

Implement Web Audio API synthesizer exporting `playClick()`, `playHover()`, `playOpen()`, `playClose()`, `toggleMute()`, and `isMuted()`.

- [ ] **Step 2: Create `portfolio-hero/src/HeroSection.css`**

Add styles for:
- `.character-canvas` (`position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 0;`)
- `.hero-vignette` (`position: fixed; inset: 0; z-index: 1; pointer-events: none;`)
- `.nav-pill-container` & `.nav-pill`
- `.hero-viewport` (`position: relative; height: 100vh; z-index: 10;`)
- `.hero-text` (`position: absolute; bottom: 5vh; left: 5vw; max-width: 360px;`)
- `.scroll-indicator` (`position: absolute; bottom: 4vh; right: 5vw;`)
- `.content-wrapper` (`position: relative; z-index: 10; backdrop-filter: blur(20px) saturate(130%);`)
- Magnetic spring-physics cursor (`.cursor-dot`, `.cursor-ring`)

- [ ] **Step 3: Create `portfolio-hero/src/HeroSection.jsx`**

Wire `CharacterCanvas`, `hero-vignette`, top navigation pill with sound toggle, bottom-left executive text, bottom-right scroll indicator, and `<main className="content-wrapper">{children}</main>`.

- [ ] **Step 4: Verify build**

Run: `cd portfolio-hero; npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add portfolio-hero/src/soundEffects.js portfolio-hero/src/HeroSection.jsx portfolio-hero/src/HeroSection.css
git commit -m "feat: implement executive HeroSection, audio system, and navigation"
```

---

### Task 5: Selected Ventures & Directorships (`ProjectsSection.jsx`)

**Files:**
- Create: `portfolio-hero/src/ProjectMockup.jsx`
- Create: `portfolio-hero/src/ProjectsSection.jsx`
- Create: `portfolio-hero/src/ProjectsSection.css`

**Interfaces:**
- Produces: `<ProjectsSection onOpenContact={...} />` with 4 case studies, filter tabs, hover lifts, and curatorial lightbox

- [ ] **Step 1: Create `portfolio-hero/src/ProjectMockup.jsx`**

Generate distinct generative SVG/CSS business visual artworks for:
- `aura-capital` (Geometric capital flow matrix, dynamic currency vectors, luxury gold/magenta lattices)
- `lumina-studio` (Architectural brand prism, chromatic refractive shields, spatial minimalism)
- `apex-systems` (Enterprise algorithmic network, cloud nodes, low-latency telemetry paths)
- `genesis-impact` (Organic venture nexus, regenerative financial rings, radiant vitality)

- [ ] **Step 2: Create `portfolio-hero/src/ProjectsSection.jsx`**

Feature 4 venture initiatives with category filters (`All`, `Venture Capital`, `Advisory`, `Enterprise Scaling`).
Wire `useScrollReveal` with `.reveal-on-scroll` classes.
Add interactive curatorial lightbox with full investment parameters and `"Inquire About Mandate"` CTA.

- [ ] **Step 3: Create `portfolio-hero/src/ProjectsSection.css`**

Set `.works-section { background: transparent; }`.
Set `.work-card` to frosted glass `rgba(255, 240, 245, 0.52)` with `backdrop-filter: blur(16px)` and subtle borders.

- [ ] **Step 4: Verify build**

Run: `cd portfolio-hero; npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add portfolio-hero/src/ProjectMockup.jsx portfolio-hero/src/ProjectsSection.jsx portfolio-hero/src/ProjectsSection.css
git commit -m "feat: implement Selected Ventures showcase and mandate lightbox"
```

---

### Task 6: Executive Practice & Leadership Philosophy (`AboutSection.jsx`)

**Files:**
- Create: `portfolio-hero/src/useScrollReveal.js`
- Create: `portfolio-hero/src/AboutSection.jsx`
- Create: `portfolio-hero/src/AboutSection.css`

**Interfaces:**
- Produces: `<AboutSection onOpenResume={...} onOpenContact={...} />` detailing strategic pillars, board chronology, honors, and executive statement

- [ ] **Step 1: Create `portfolio-hero/src/useScrollReveal.js`**

IntersectionObserver hook with `rootMargin: '50px 0px 0px 0px'`, `threshold: 0.05`, and `prefers-reduced-motion` support.

- [ ] **Step 2: Create `portfolio-hero/src/AboutSection.jsx`**

Render:
- Strategic Pillars: Capital Allocation & M&A, Board Advisory, Enterprise Scaling, Global Expansion
- Leadership Chronology Timeline (2023–2026)
- Distinctions & Board Seats
- CTAs: `"Executive Biography & CV"` and `"Advisory Consultation"`
- Wire `useScrollReveal` with `.reveal-on-scroll` classes.

- [ ] **Step 3: Create `portfolio-hero/src/AboutSection.css`**

Set `.practice-section { background: transparent; }`.
Set cards to frosted glass `rgba(255, 240, 245, 0.55)` with `backdrop-filter: blur(16px)`.

- [ ] **Step 4: Verify build**

Run: `cd portfolio-hero; npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add portfolio-hero/src/useScrollReveal.js portfolio-hero/src/AboutSection.jsx portfolio-hero/src/AboutSection.css
git commit -m "feat: implement Executive Practice, leadership chronology, and scroll reveal"
```

---

### Task 7: Advisory Inquiries, Locations & Modals

**Files:**
- Create: `portfolio-hero/src/ContactSection.jsx`
- Create: `portfolio-hero/src/ContactSection.css`
- Create: `portfolio-hero/src/ContactModal.jsx`
- Create: `portfolio-hero/src/ContactModal.css`
- Create: `portfolio-hero/src/ResumeModal.jsx`
- Create: `portfolio-hero/src/ResumeModal.css`
- Update: `portfolio-hero/src/App.jsx`

**Interfaces:**
- Produces: Complete interactive portfolio wiring `<HeroSection>`, `<ProjectsSection>`, `<AboutSection>`, `<ContactSection>`, `<ContactModal>`, and `<ResumeModal>`

- [ ] **Step 1: Create `portfolio-hero/src/ContactSection.jsx` and `ContactSection.css`**

- Direct studio email (`mahi@auracapital.com`) with one-click copy and sound trigger.
- Studio locations: Mayfair (London), Hudson Yards (New York), Marina Bay (Singapore).
- Set `.contact-section { background: transparent; }`.

- [ ] **Step 2: Create `portfolio-hero/src/ContactModal.jsx` and `ContactModal.css`**

- Advisory consultation inquiry form with category pills (`"Venture Capital / LP"`, `"Board Advisory"`, `"Keynote / Executive Briefing"`, `"Strategic Consultation"`).
- Keyboard Escape listener, backdrop blur, and confirmation screen.

- [ ] **Step 3: Create `portfolio-hero/src/ResumeModal.jsx` and `ResumeModal.css`**

- Executive CV detailing Education (Oxford Said, LSE), Board Directorships, Venture Advisory, and Press Features.
- Print-optimized CSS formatting via `@media print`.

- [ ] **Step 4: Wire all components into `portfolio-hero/src/App.jsx`**

```jsx
import React, { useState } from 'react';
import HeroSection from './HeroSection';
import ProjectsSection from './ProjectsSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import ContactModal from './ContactModal';
import ResumeModal from './ResumeModal';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      <HeroSection
        onOpenContact={() => setIsContactOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      >
        <ProjectsSection onOpenContact={() => setIsContactOpen(true)} />
        <AboutSection
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />
        <ContactSection
          onOpenContact={() => setIsContactOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </HeroSection>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </>
  );
}
```

- [ ] **Step 5: Verify build**

Run: `cd portfolio-hero; npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add portfolio-hero/src/ContactSection.jsx portfolio-hero/src/ContactSection.css portfolio-hero/src/ContactModal.jsx portfolio-hero/src/ContactModal.css portfolio-hero/src/ResumeModal.jsx portfolio-hero/src/ResumeModal.css portfolio-hero/src/App.jsx
git commit -m "feat: implement Advisory Inquiries, Executive CV modal, and root App wiring"
```

---

### Task 8: Verification, Dev Server & Push to GitHub

**Files:**
- Repository root in `portfolio_mahi`

- [ ] **Step 1: Run production build**

Run: `cd portfolio-hero; npm run build`
Expected: 0 errors, clean asset output in `dist/`.

- [ ] **Step 2: Commit all changes**

```bash
git add -A
git commit -m "feat: complete Mahi executive portfolio implementation"
```

- [ ] **Step 3: Push to GitHub**

```bash
git push -u origin master
```

- [ ] **Step 4: Launch local dev server**

Run: `npm run dev -- --host --port 3001`
Expected: Server running at `http://localhost:3001/`.
