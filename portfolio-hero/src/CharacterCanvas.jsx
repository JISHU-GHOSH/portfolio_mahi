import { useRef, useEffect } from 'react';

const NUM_FRAMES      = 64;
const CENTER_INDEX    = 38; // Frame 108 is the exact neutral forward eye-contact frame (108 - 70 = 38)
const DEADZONE_ENTER  = 0.06;
const DEADZONE_EXIT   = 0.085;
const BG_COLOR        = '#ee8299'; // Barbie Pink exact match with video background
const FACE_CENTER_X   = 0.502;
const FACE_CENTER_Y   = 0.389;

// Fluid lerp physics for liquid-smooth 60 FPS tracking (matches peaceful-raman standards)
const FRAME_LERP      = 0.16;
const MAX_FRAME_STEP  = 1.2;
const ASPECT_RATIO    = 1920 / 1080;

export default function CharacterCanvas({ className = 'character-canvas' }) {
  const canvasRef = useRef(null);

  const state = useRef({
    frames:         [],
    centerImg:      null,
    loaded:         0,
    totalFrames:    NUM_FRAMES + 1,
    smoothFrame:    CENTER_INDEX,
    targetFrame:    CENTER_INDEX,
    isCenter:       true,
    rafId:          null,
    mouseX:         FACE_CENTER_X,
    mouseY:         FACE_CENTER_Y,
    curMouseX:      FACE_CENTER_X,
    curMouseY:      FACE_CENTER_Y,
    isReady:        false,
  });

  // Preload all 64 continuous sweep frames + center.webp
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

  // Pointer & Touch Interaction
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
        if (Math.abs(dx) > 0.003 || Math.abs(dy) > 0.003) {
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

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      if (touchReturnRaf) cancelAnimationFrame(touchReturnRaf);
    };
  }, []);

  // 60 FPS Render Loop
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

      // Object-fit: cover metrics for 16:9 video
      const cA = W / H;
      let dW, dH, dX, dY;
      if (ASPECT_RATIO > cA) {
        dH = H;
        dW = dH * ASPECT_RATIO;
        dX = (W - dW) / 2;
        dY = 0;
      } else {
        dW = W;
        dH = dW / ASPECT_RATIO;
        dX = 0;
        dY = (H - dH) / 2;
      }

      // Exact pixel position of Mahi's face
      const faceCX = dX + dW * FACE_CENTER_X;
      const faceCY = dY + dH * FACE_CENTER_Y;

      // Low-pass smooth filter on cursor position
      s.curMouseX += (s.mouseX - s.curMouseX) * Math.min(1, 0.25 * dt);
      s.curMouseY += (s.mouseY - s.curMouseY) * Math.min(1, 0.25 * dt);

      const cx = s.curMouseX * W;
      const cy = s.curMouseY * H;
      const dx = cx - faceCX;
      const dy = cy - faceCY;

      // Distance from face center for deadzone
      const dist = Math.sqrt(dx * dx + dy * dy) / Math.min(W, H);
      if (s.isCenter) {
        if (dist > DEADZONE_EXIT) s.isCenter = false;
      } else {
        if (dist < DEADZONE_ENTER) s.isCenter = true;
      }

      // Linear normalized horizontal displacement [-1.0, 1.0]
      // Sensitive tracking: full turn reached before window edge
      const halfTrackWidth = W * 0.42;
      const normX = Math.max(-1, Math.min(1, dx / halfTrackWidth));

      // Continuous unbroken frame mapping:
      // normX = -1.0 (Left edge)  => Frame 0 (Profile Left)
      // normX =  0.0 (Center)     => CENTER_INDEX = 38 (Direct eye contact)
      // normX = +1.0 (Right edge) => Frame 63 (Profile Right)
      let target;
      if (normX < 0) {
        target = CENTER_INDEX + normX * CENTER_INDEX; // 38 -> 0
      } else {
        target = CENTER_INDEX + normX * (NUM_FRAMES - 1 - CENTER_INDEX); // 38 -> 63
      }
      s.targetFrame = Math.max(0, Math.min(NUM_FRAMES - 1, target));

      // Liquid-smooth lerp physics (monotonic, zero jumps, max 1.2 frame per tick)
      const diff = s.targetFrame - s.smoothFrame;
      const lf = 1 - Math.pow(1 - FRAME_LERP, dt);
      const step = Math.sign(diff) * Math.min(Math.abs(diff) * lf, MAX_FRAME_STEP * dt);
      s.smoothFrame = Math.max(0, Math.min(NUM_FRAMES - 1, s.smoothFrame + step));

      const frameIdx = Math.round(s.smoothFrame);

      // Frame selection: center deadzone locks onto center.webp
      let img = null;
      if (s.isCenter && s.centerImg && s.centerImg.complete && s.centerImg.naturalWidth > 0) {
        img = s.centerImg;
      } else if (s.frames[frameIdx] && s.frames[frameIdx].complete && s.frames[frameIdx].naturalWidth > 0) {
        img = s.frames[frameIdx];
      } else if (s.centerImg && s.centerImg.complete && s.centerImg.naturalWidth > 0) {
        img = s.centerImg;
      }

      // Clear with exact Barbie Pink background
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, W, H);

      // Subtle 3D micro-parallax shift for living depth
      const parallaxX = (s.curMouseX - FACE_CENTER_X) * 6;
      const parallaxY = (s.curMouseY - FACE_CENTER_Y) * 8;

      if (img) {
        try {
          ctx.drawImage(img, dX + parallaxX, dY + parallaxY, dW, dH);
        } catch {
          // Graceful fallback
        }
      }

      // Initial loading progress bar
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
