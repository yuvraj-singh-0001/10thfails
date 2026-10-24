'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, Sparkles, ArrowUpRight } from 'lucide-react';

const TOTAL_FRAMES = 300;

function frameUrl(index: number) {
  const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
  const numStr = String(clamped).padStart(3, '0');
  return encodeURI(`/Ani 1/Coffe 1 Animation${numStr}.png`);
}

type TextStatement = {
  id: string;
  tag: string;
  titleTop: string;
  titleAccent: string;
  subtitle: string;
  cta?: boolean;
};

const STATEMENTS: TextStatement[] = [
  {
    id: 'statement-1',
    tag: '// 01. THE EXPERIMENT',
    titleTop: 'Ten Failed Batches.',
    titleAccent: 'One Perfect Pour.',
    subtitle: 'Slow-steeped Arabica. Zero added water.',
  },
  {
    id: 'statement-2',
    tag: '// 02. PURE COLLISION',
    titleTop: 'Dark Espresso.',
    titleAccent: 'Ice & Velvet Cream.',
    subtitle: 'Crushed ice & espresso colliding at 2°C.',
  },
  {
    id: 'statement-3',
    tag: '// 03. THE FINALE',
    titleTop: 'Chilled Thick.',
    titleAccent: 'Built To Hit.',
    subtitle: 'Crafted fresh every single morning.',
    cta: true,
  },
];

interface CoffeeScrollSceneProps {
  onOrder: () => void;
}

export default function CoffeeScrollScene({ onOrder }: CoffeeScrollSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Array of cached images & loaded flags
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const loadedRef = useRef<boolean[]>(Array(TOTAL_FRAMES).fill(false));

  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadCount, setLoadCount] = useState(0);

  // Subtle 3D mouse parallax
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Frame scrubbing state
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastPaintedRef = useRef(-1);
  const rafIdRef = useRef<number | null>(null);

  // Find nearest loaded frame so canvas never draws empty black space
  const getNearestLoaded = useCallback((index: number) => {
    const loaded = loadedRef.current;
    if (loaded[index]) return index;

    for (let d = 1; d < TOTAL_FRAMES; d++) {
      const b = index - d;
      const a = index + d;
      if (b >= 0 && loaded[b]) return b;
      if (a < TOTAL_FRAMES && loaded[a]) return a;
    }
    return 0;
  }, []);

  // Draw frame to canvas with cover-scaling
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const actualIndex = getNearestLoaded(frameIndex);
      const img = imagesRef.current[actualIndex];
      if (!img || !img.naturalWidth) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Cover scaling: fills entire canvas edge-to-edge
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.drawImage(img, dx, dy, dw, dh);
    },
    [getNearestLoaded]
  );

  // Resize canvas to window dimensions * DPR
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    lastPaintedRef.current = -1;
    drawFrame(Math.round(currentFrameRef.current));
  }, [drawFrame]);

  // Viewport pinning & scroll progress calculation
  const updatePinAndProgress = useCallback(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const rect = container.getBoundingClientRect();
    const vh = window.innerHeight;
    const totalScrollable = container.offsetHeight - vh;
    const scrolled = -rect.top;

    const raw = totalScrollable > 0 ? scrolled / totalScrollable : 0;
    const clamped = Math.max(0, Math.min(1, raw));
    targetFrameRef.current = clamped * (TOTAL_FRAMES - 1);
    setProgress(clamped);

    // Bulletproof Pinning:
    if (rect.top <= 0 && rect.bottom > vh) {
      stage.style.position = 'fixed';
      stage.style.top = '0';
      stage.style.left = '0';
      stage.style.bottom = 'auto';
    } else if (rect.bottom <= vh) {
      stage.style.position = 'absolute';
      stage.style.top = 'auto';
      stage.style.left = '0';
      stage.style.bottom = '0';
    } else {
      stage.style.position = 'absolute';
      stage.style.top = '0';
      stage.style.left = '0';
      stage.style.bottom = 'auto';
    }
  }, []);

  // Update smooth vertical text slide directly tied to scroll speed (NO ZOOM IN / ZOOM OUT)
  const updateTextTransforms = useCallback((currentProgress: number) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const centers = [0.18, 0.50, 0.82];

    STATEMENTS.forEach((_, i) => {
      const el = textRefs.current[i];
      if (!el) return;

      const targetCenter = centers[i];
      // delta: distance from center in normalized scroll space
      // delta < 0: text is coming up from below (y > 0)
      // delta === 0: centered in viewport
      // delta > 0: text is scrolling away towards top (y < 0)
      const delta = (currentProgress - targetCenter) / 0.16;
      const absDelta = Math.abs(delta);

      // Outside active window
      if (absDelta > 1.2) {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        return;
      }

      el.style.pointerEvents = absDelta < 0.6 ? 'auto' : 'none';

      // Pure vertical translation directly mapped to scroll speed (NO ZOOM):
      // Enters from below (y > 0), locks in center (y = 0), exits towards top (y < 0)
      const y = -delta * (isMobile ? 60 : 90);
      const opacity = Math.max(0, Math.min(1.0, 1.0 - Math.pow(absDelta, 1.9)));

      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      el.style.opacity = opacity.toFixed(2);
      el.style.willChange = 'transform, opacity';
    });
  }, []);

  // Main RAF loop
  useEffect(() => {
    const tick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      const diff = target - current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.22;
      } else {
        currentFrameRef.current = target;
      }

      const currentProgress = currentFrameRef.current / (TOTAL_FRAMES - 1);

      const frameToDraw = Math.round(currentFrameRef.current);
      if (frameToDraw !== lastPaintedRef.current) {
        lastPaintedRef.current = frameToDraw;
        drawFrame(frameToDraw);
      }

      // Update cinematic zoom-out text transforms directly tied to scroll speed
      updateTextTransforms(currentProgress);

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame, updateTextTransforms]);

  // Load single frame
  const loadSingleFrame = useCallback((index: number) => {
    return new Promise<void>((resolve) => {
      if (loadedRef.current[index]) {
        resolve();
        return;
      }

      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        loadedRef.current[index] = true;
        imagesRef.current[index] = img;

        if (index === 0 || index <= 2) {
          setIsLoaded(true);
          drawFrame(0);
        }

        if (Math.abs(index - currentFrameRef.current) <= 1) {
          drawFrame(Math.round(currentFrameRef.current));
        }

        setLoadCount((prev) => prev + 1);
        resolve();
      };
      img.onerror = () => resolve();
      img.src = frameUrl(index);
    });
  }, [drawFrame]);

  // High-performance tiered frame preloading
  useEffect(() => {
    let isCancelled = false;

    const startPreload = async () => {
      // Prime first 5 frames
      for (let i = 0; i < 5; i++) {
        if (isCancelled) return;
        await loadSingleFrame(i);
      }

      // Load key landmarks every 6th frame
      const landmarkOrder: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i += 6) {
        landmarkOrder.push(i);
      }
      if (!landmarkOrder.includes(TOTAL_FRAMES - 1)) {
        landmarkOrder.push(TOTAL_FRAMES - 1);
      }

      let cursor = 0;
      const worker = async () => {
        while (cursor < landmarkOrder.length && !isCancelled) {
          const idx = landmarkOrder[cursor++];
          await loadSingleFrame(idx);
        }
      };
      await Promise.all(Array.from({ length: 6 }, worker));

      // Fill in remaining frames
      const allFrames: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!loadedRef.current[i]) allFrames.push(i);
      }

      let fillCursor = 0;
      const fillWorker = async () => {
        while (fillCursor < allFrames.length && !isCancelled) {
          const idx = allFrames[fillCursor++];
          await loadSingleFrame(idx);
        }
      };
      await Promise.all(Array.from({ length: 8 }, fillWorker));
    };

    void startPreload();

    return () => {
      isCancelled = true;
    };
  }, [loadSingleFrame]);

  // Window listeners
  useEffect(() => {
    resizeCanvas();
    updatePinAndProgress();

    window.addEventListener('scroll', updatePinAndProgress, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });

    return () => {
      window.removeEventListener('scroll', updatePinAndProgress);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas, updatePinAndProgress]);

  // Mouse 3D parallax tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const tiltX = ((clientY - centerY) / centerY) * -1.5;
    const tiltY = ((clientX - centerX) / centerX) * 2.5;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const loadPercentage = Math.min(100, Math.round((loadCount / TOTAL_FRAMES) * 100));

  return (
    <section
      ref={containerRef}
      id="coffee-3d-scene"
      className="relative w-full bg-[#050302] text-[#fff9f0]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ========================================================
          1. PINNED FULL-SCREEN 3D CANVAS STAGE (Z-Index: 0)
          Renders 300 pristine PNG frames from Ani 1 at 120 FPS
      ======================================================== */}
      <div
        ref={stageRef}
        className="fixed top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#050302] z-0 pointer-events-none"
        style={{ perspective: '1200px' }}
      >
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center transition-transform duration-150 ease-out"
          style={{
            transform: `scale(${1.02 + progress * 0.02}) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Hardware-Accelerated 2D Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full block object-cover select-none pointer-events-none"
          />
        </div>

        {/* Ambient Atmospheric Vignette */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#050302]/85 via-[#050302]/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#050302]/95 via-[#050302]/40 to-transparent" />
        {/* Minimal Luxury Hairline Progress Indicator at bottom edge */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/10 z-30">
          <div
            className="h-full bg-gradient-to-r from-[#c48243] to-[#e2a56a] transition-all duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Instant Initial Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#050302]">
            <div className="h-10 w-10 rounded-full border-2 border-[#c48243] border-t-transparent animate-spin mb-4" />
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#c48243]">
              Brewing 3D Frames... {loadPercentage}%
            </p>
          </div>
        )}
      </div>

      {/* ========================================================
          2. FOREGROUND PURE CINEMATIC ZOOM TYPOGRAPHY (NO CARDS, NO BOXES)
          3 Clean Statements that Zoom-In & Dissolve as user scrolls!
      ======================================================== */}
      <div className="relative z-10 w-full pointer-events-none">
        {STATEMENTS.map((st, index) => (
          <div
            key={st.id}
            className="min-h-screen w-full flex items-center px-6 sm:px-12 md:px-20 lg:px-28 py-24"
          >
            {/* Pure Floating Typography Element (NO CARD, NO BOX) */}
            <div
              ref={(el) => {
                textRefs.current[index] = el;
              }}
              className="max-w-3xl space-y-5 transition-opacity"
              style={{
                transformOrigin: 'center center',
              }}
            >
              {/* Minimal Telemetry Tag */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 border border-[#c48243]/30 backdrop-blur-md shadow-lg">
                <span className="h-2 w-2 rounded-full bg-[#c48243] animate-pulse shadow-[0_0_8px_#c48243]" />
                <span className="font-mono text-[11px] font-extrabold tracking-[0.28em] text-[#e2a56a] uppercase">
                  {st.tag}
                </span>
              </div>

              {/* Massive Cinematic Headline */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.04] tracking-tight drop-shadow-[0_12px_35px_rgba(0,0,0,0.98)]">
                <span>{st.titleTop}</span>

                <br />
                <span className="bg-gradient-to-r from-[#f5caa0] via-[#e2a56a] to-[#c48243] bg-clip-text text-transparent">
                  {st.titleAccent}
                </span>
              </h1>

              {/* Pure High-Contrast Subtitle (Zero black background box) */}
              <p className="text-base sm:text-lg md:text-xl text-[#f7ede3] font-medium leading-relaxed drop-shadow-[0_4px_14px_rgba(0,0,0,1)] drop-shadow-[0_1px_3px_rgba(0,0,0,1)] max-w-xl">
                {st.subtitle}
              </p>

              {/* Optional Call to Action Button on the Final Statement */}
              {st.cta && (
                <div className="pt-4 pointer-events-auto">
                  <button
                    onClick={onOrder}
                    className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#c48243] to-[#e09848] py-4 px-8 text-xs font-black uppercase tracking-[0.24em] text-white shadow-2xl transition-all duration-300 hover:brightness-110 hover:scale-105 active:scale-95 cursor-pointer group"
                  >
                    <Sparkles size={16} />
                    <span>Order Signature Cold Coffee</span>
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
