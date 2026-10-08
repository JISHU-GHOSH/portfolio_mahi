# Design Specification: Mahi — Founder & Venture Strategist Portfolio

- **Project**: `portfolio_mahi`
- **Repository**: `https://github.com/JISHU-GHOSH/portfolio_mahi`
- **Identity**: Mahi — Founder & Venture Strategist / Executive Director
- **Theme & Aesthetics**: Barbie Pink (`#ee8299`) Luxury Executive Editorial with Hot Pink (`#e0218a`) Accents
- **Video Source**: `C:\porfolio_mahi\Woman_moving_eyes_and_head_20261008214536.mp4`

---

## 1. Overview & Vision
A high-converting, luxury executive portfolio for **Mahi**, mirroring the ultra-fluid, zero-lag 60 FPS vector cursor-tracking interaction of `peaceful-raman` and `riya-portfolio`. 

Mahi represents a top-tier businesswoman, founder, and venture strategist advising high-growth tech ventures, private equity allocations, and global market expansion. The visual language blends iconic **Barbie Pink (`#ee8299`)** seamless studio backdrops with frosted glassmorphism, crisp modern typography, and high-conviction executive case studies.

---

## 2. Core Architecture & Components

### 2.1 Frame Extraction & Inpainting Pipeline (`extract_frames.py`)
- **Input**: `C:\porfolio_mahi\Woman_moving_eyes_and_head_20261008214536.mp4` (1920×1080 @ 24fps, 240 frames).
- **Watermark Inpainting**: Inpaint bottom-right Kling AI watermark sparkle at `[790:1020, 1590:1870]` using `cv2.inpaint(img, mask, 6, cv2.INPAINT_TELEA)`.
- **Circular Directional Trajectory**:
  - Analyze feature tracks to sample 64 evenly distributed counter-clockwise frames (0° to 360°, every 5.625°):
    - `0°` (Right): Gaze looking viewer's right
    - `45°` (Up-Right): Gaze looking viewer's up-right
    - `90°` (Up): Gaze looking viewer's up
    - `135°` (Up-Left): Gaze looking viewer's up-left
    - `180°` (Left): Gaze looking viewer's left
    - `225°` (Down-Left): Gaze looking viewer's down-left
    - `270°` (Down): Gaze looking viewer's down
    - `315°` (Down-Right): Gaze looking viewer's down-right
  - Pre-render and export 64 frames as WebP (`000.webp` to `063.webp`) at quality 92 into `portfolio-hero/public/frames/`.
  - Export direct eye-contact frame (Frame 0) as `center.webp`.

### 2.2 Character Canvas Engine (`CharacterCanvas.jsx`)
- Fixed full-screen canvas (`position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none;`).
- Preload all 65 WebP images cleanly with standard `HTMLImageElement`.
- Background clear color exact match to `#ee8299` (Barbie pink) for zero edge seams.
- Cursor vector calculation relative to Mahi's face center (`X = 0.502`, `Y = 0.389`).
- Continuous shortest-path angular lerp:
  - `FRAME_LERP = 0.22`
  - `MAX_FRAME_STEP = 2.8`
  - `DEADZONE_RADIUS = 0.08` (direct eye contact when cursor rests over face).
- Single 100% opacity frame draw per animation frame with `object-fit: cover` geometry.
- Mobile touch support: touch move steers gaze; touch release smoothly drifts back to center over ~350ms.

### 2.3 Hero Section & Atmosphere (`HeroSection.jsx` + `HeroSection.css`)
- **Vignette Layer**: `<div className="hero-vignette" />` (fixed at `z-index: 1`) providing subtle radial shading at edges for typographic clarity.
- **Magnetic Trailing Cursor**: Spring-physics white dot & trailing ring.
- **Top Navigation Pill**: Frosted glass pill with sections: `Home`, `Ventures`, `Advisory`, `Contact`, plus Web Audio sound toggle button.
- **Bottom-Left Executive Identity**:
  - Pretitle: `"VENTURE • ADVISORY"`
  - Name: `"Mahi"` (Grand Serif typography)
  - Subtitle: `"Founder & Venture Strategist"`
  - Mission Statement: *"Building, scaling, and advising visionary enterprises across technology, private capital, and global market expansion."*
  - Status Indicator: `"Active Board & Advisory Engagements • 2026"`
  - CTAs: `"Explore Ventures"` (scrolls to `#ventures`), `"Leadership Statement"` (scrolls to `#advisory`), `"Advisory Inquiry"` (opens consultation modal).
- **Bottom-Right Scroll Indicator**: `"Explore Ventures ↓"` with subtle bounce.

### 2.4 Translucent Frosted Content Wrapper (`<main className="content-wrapper">`)
- Downstream sections wrapped in `.content-wrapper` with `backdrop-filter: blur(20px) saturate(130%)` and top transparent gradient.
- Section backgrounds set to `background: transparent;`.
- Fixed character canvas glows softly through the frosted backdrop as user scrolls.

### 2.5 Selected Ventures & Directorships (`ProjectsSection.jsx`)
- Section ID: `#ventures`
- 4 Featured initiatives:
  1. **Aura Capital** (Multi-stage venture fund & cross-border growth)
  2. **Lumina Studio** (Strategic brand architecture & executive advisory)
  3. **Apex Systems** (Enterprise operational scaling & algorithmic infrastructure)
  4. **Genesis Impact Fund** (Ethical venture backing & female founder mentorship)
- Category filters: `All`, `Venture Capital`, `Advisory`, `Enterprise Scaling`.
- High-fidelity visual cards with subtle hover lift and Web Audio tactile sound triggers.
- Interactive Curatorial Lightbox / Initiative Detail Modal with investment specifications, mandate, and `"Inquire About Mandate"` action button.

### 2.6 Executive Practice & Leadership Philosophy (`AboutSection.jsx`)
- Section ID: `#advisory`
- Strategic Pillars:
  - Capital Allocation & Growth Stage M&A
  - Board Advisory & Corporate Governance
  - Enterprise Scaling & Organizational Architecture
  - Global Market Penetration & Strategic Partnerships
- Curated Leadership Chronology (2023–2026):
  - 2026: *General Partner & Strategic Advisor* — Aura Capital Global Fund II
  - 2025: *Non-Executive Board Member* — Apex Enterprise Systems (Series B to C)
  - 2024: *Founding Director* — Lumina Advisory Atelier
  - 2023: *Executive Fellow* — Oxford Said Global Leadership Initiative
- Honors, Board Seats, and Certifications.
- Direct CTA triggers for Executive CV Modal and Advisory Inquiry Modal.

### 2.7 Advisory Inquiries & Locations (`ContactSection.jsx`)
- Section ID: `#contact`
- Direct executive email (`mahi@auracapital.com`) with click-to-copy and tactile confirmation.
- Studio & Office Presences: London (Mayfair), New York (Hudson Yards), Singapore (Marina Bay).
- External executive platforms: LinkedIn, Substack, Bloomberg Terminal, Forbes Council.
- Colophon & Back-to-Top trigger.

### 2.8 Interactive Modals & Sound Engine
- **ContactModal.jsx**: Advisory Inquiry modal with inquiry pills (`"Venture Capital / LP"`, `"Board Advisory"`, `"Keynote / Executive Briefing"`, `"Strategic Consultation"`), form validation, and confirmation state.
- **ResumeModal.jsx**: Comprehensive Executive Biography & Board CV with print/PDF styling (`window.print()`).
- **soundEffects.js**: Lightweight Web Audio API synthesizer for tactile clicks, soft hover tones, and modal transitions (muteable).

### 2.9 Apple / Linear-Grade Scroll Reveal (`useScrollReveal.js`)
- Zero-overhead IntersectionObserver applying `.reveal-on-scroll` with optical blur-dissolve (`filter: blur(8px) -> 0px`) and `transform: translateY(38px) scale(0.97) -> translateY(0) scale(1)`.
- Respects `prefers-reduced-motion`.

---

## 3. Verification & Acceptance Criteria
1. `extract_frames.py` extracts 64 smooth directional WebP frames + `center.webp` with watermark fully inpainted.
2. Character canvas tracks cursor in real-time at 60 FPS with zero lag, correct gaze direction, and direct eye contact deadzone.
3. Palette matches exact `#ee8299` Barbie pink with zero visible border seams.
4. Hero text sits comfortably at bottom-left without obstructing Mahi's face.
5. Translucent frosted scrolling allows Mahi to glow softly behind content.
6. `npm run build` bundles cleanly with 0 errors.
7. Codebase committed and pushed to `https://github.com/JISHU-GHOSH/portfolio_mahi`.
