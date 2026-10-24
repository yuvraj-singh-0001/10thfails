'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowDown, Sparkles, Compass, Eye } from 'lucide-react';

interface HeroSectionProps {
  onTakeSpin: () => void;
}

const INGREDIENT_HIGHLIGHTS = [
  { name: 'FARM FRESH MILK', desc: 'Silky micro-foam foundation', pos: 'top-8 left-4 sm:left-10' },
  { name: 'MADAGASCAR VANILLA', desc: 'Handmade gelato scoop', pos: 'top-12 right-4 sm:right-12' },
  { name: 'DUTCH COCOA & SUGAR', desc: 'Pure cane & dark cocoa', pos: 'bottom-20 right-6 sm:right-16' },
  { name: 'AMBER CARAMEL & BEANS', desc: 'Slow simmered toffee & roasted beans', pos: 'bottom-16 left-6 sm:left-14' },
];

export default function HeroSection({ onTakeSpin }: HeroSectionProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <section
      id="spin-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-12 pt-28 pb-20 overflow-hidden bg-radial from-[#18110c] via-[#0d0907] to-[#080504] text-[#fff9f0]"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-[#c48243]/20 via-[#e09848]/15 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Header Badge & Headline matching video */}
      <div className="max-w-5xl w-full mx-auto text-center space-y-4 mb-8 relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#e29b58] animate-pulse" />
          <span className="text-[11px] font-extrabold tracking-[0.25em] text-[#e29b58] uppercase">
            SECTION 1 • THE ORIGIN & SPIN
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-white uppercase leading-[1.02]">
          GOOD THINGS <br className="hidden sm:inline" />
          COME AROUND.
        </h1>

        <p className="text-sm sm:text-base text-[#cfbfb2] font-light tracking-wide max-w-xl mx-auto leading-relaxed">
          Coffee worth getting lost in. Witness raw artisanal ingredients in mid-air suspension before they converge into our signature liquid swirl.
        </p>

        {/* Action Button matching video */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onTakeSpin}
            className="px-8 py-3.5 rounded-full bg-[#c48243] hover:bg-[#a6652c] text-white text-xs font-extrabold tracking-[0.22em] uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer group"
          >
            <span>TAKE A SPIN</span>
            <Compass size={16} className="transition-transform group-hover:rotate-180 duration-500 text-white" />
          </button>

          <div className="flex items-center gap-2 text-xs font-medium text-[#c4b3a5] px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles size={14} className="text-[#e29b58]" />
            <span>Scroll Down to Trigger Mix</span>
          </div>
        </div>
      </div>

      {/* Central Showcase: Image 1 (Floating Raw Ingredients on Obsidian Black) */}
      <div className="max-w-5xl w-full mx-auto relative min-h-[460px] sm:min-h-[540px] md:min-h-[620px] flex items-center justify-center z-20">
        {/* Floating Interactive Ingredient Cards */}
        {INGREDIENT_HIGHLIGHTS.map((item) => (
          <div
            key={item.name}
            className={`absolute ${item.pos} z-30 transition-all duration-300`}
          >
            <button
              onClick={() => setActiveTag(activeTag === item.name ? null : item.name)}
              className="glass-pill px-4 py-2 rounded-full flex items-center gap-2 text-[#fff9f0] bg-black/60 border border-white/20 backdrop-blur-md hover:border-[#c48243] hover:scale-105 transition-all shadow-lg cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#c48243] animate-ping" />
              <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase">
                {item.name}
              </span>
            </button>
            {activeTag === item.name && (
              <div className="mt-2 p-2.5 rounded-xl bg-black/85 border border-[#c48243]/50 text-[11px] text-[#e8dacd] max-w-xs shadow-xl animate-in fade-in zoom-in-95">
                {item.desc}
              </div>
            )}
          </div>
        ))}

        {/* Central Ingredient Collage Visual */}
        <div className="relative w-full max-w-4xl aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black/40 backdrop-blur-xs transition-all duration-700 hover:scale-[1.01]">
          <Image
            src="/images/stage1-ingredients.jpg"
            alt="Artisanal Raw Coffee Ingredients Floating"
            fill
            priority
            loading="eager"
            unoptimized
            className="object-cover object-center filter saturate-[1.08] contrast-[1.05]"
            sizes="(max-width: 1200px) 100vw, 1000px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Bottom Live Status Pill */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-auto px-4 py-2.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 shadow-xl flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c48243] animate-pulse" />
            <div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#e29b58]">
                STAGE 1: SUSPENDED IN MID-AIR
              </div>
              <div className="text-xs font-semibold text-white">Scroll to initiate collision & vortex</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="mt-8 flex flex-col items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-[#b09e91] uppercase z-20 pointer-events-none">
        <span>SCROLL TO MIX & MORPH</span>
        <div className="w-5 h-8 rounded-full border-2 border-[#c48243]/50 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-[#c48243] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
