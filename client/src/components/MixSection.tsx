'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Sliders, CheckCircle2, ChevronRight, Info } from 'lucide-react';

interface IngredientInfo {
  id: string;
  name: string;
  origin: string;
  description: string;
  ratio: number;
}

const INGREDIENTS: Record<string, IngredientInfo> = {
  espresso: {
    id: 'espresso',
    name: 'BOLD ESPRESSO',
    origin: 'Ethiopian & Colombian Washed Beans',
    description: 'Double ristretto extracted at 9-bar pressure, colliding with cold brew to yield notes of dark cacao and black cherry.',
    ratio: 40,
  },
  milk: {
    id: 'milk',
    name: 'SILKY MILK',
    origin: 'Organic Whole Milk & Steamed Oat',
    description: 'Fresh milk pouring in a dramatic arc, creating micro-bubbles and natural sweet silkiness without added sugar.',
    ratio: 45,
  },
  caramel: {
    id: 'caramel',
    name: 'GOLDEN CARAMEL',
    origin: 'Hand-Simmered Brown Butter',
    description: 'Slow-cooked golden toffee caramel ribbon weaving through the vortex, infused with flakes of Maldon sea salt.',
    ratio: 15,
  },
  crema: {
    id: 'crema',
    name: 'GELATO CREMA',
    origin: 'Madagascar Vanilla Scoop',
    description: 'Melting gently into the vortex to form an ultra-velvety golden crown that coats the palate.',
    ratio: 20,
  },
};

export default function MixSection() {
  const [activeIngredient, setActiveIngredient] = useState<string>('caramel');
  const [mixRatio, setMixRatio] = useState<number>(50); // 0 = Pure Espresso, 100 = Creamy Milk

  const currentInfo = INGREDIENTS[activeIngredient] || INGREDIENTS.caramel;

  return (
    <section
      id="mix-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-12 py-24 overflow-hidden bg-gradient-to-b from-[#080504] via-[#1a100b] to-[#20140d] text-[#fff9f0]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-tr from-[#c48243]/20 via-[#e29b58]/15 to-transparent rounded-full blur-[160px] pointer-events-none" />

      {/* Header matching video */}
      <div className="max-w-4xl w-full mx-auto text-center space-y-4 mb-10 relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 shadow-xs">
          <span className="text-[11px] font-extrabold tracking-[0.25em] text-[#e29b58] uppercase">
            STAGE 2 • THE MIX
          </span>
        </div>

        <h2 className="text-6xl sm:text-7xl md:text-8xl font-display font-black tracking-tight text-white uppercase leading-none">
          MIX IT UP.
        </h2>

        <p className="text-sm sm:text-base text-[#cfbfb2] max-w-lg mx-auto font-light leading-relaxed">
          The suspended ingredients collide into an explosive swirl vortex. Watch the milk, espresso, caramel ribbons, and crystal ice cubes unify.
        </p>
      </div>

      {/* Main Interactive Stage with Floating Ingredient Pins */}
      <div className="max-w-5xl w-full mx-auto relative min-h-[500px] sm:min-h-[580px] md:min-h-[640px] flex items-center justify-center z-20">
        {/* Floating Ingredient Tag: Top Left (BOLD ESPRESSO) */}
        <div className="absolute top-6 left-2 sm:left-8 md:left-12 z-30">
          <button
            onClick={() => setActiveIngredient('espresso')}
            className={`glass-pill px-5 py-2.5 rounded-full flex items-center gap-2.5 cursor-pointer bg-black/60 border border-white/20 backdrop-blur-md transition-all ${
              activeIngredient === 'espresso'
                ? 'ring-2 ring-[#e29b58] bg-black/85 shadow-xl scale-105'
                : 'opacity-90 hover:scale-105'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#522b13]" />
            <span className="text-xs font-extrabold tracking-widest text-white uppercase">
              BOLD ESPRESSO
            </span>
          </button>
        </div>

        {/* Floating Ingredient Tag: Top Right (SILKY MILK) */}
        <div className="absolute top-8 right-2 sm:right-8 md:right-14 z-30">
          <button
            onClick={() => setActiveIngredient('milk')}
            className={`glass-pill px-5 py-2.5 rounded-full flex items-center gap-2.5 cursor-pointer bg-black/60 border border-white/20 backdrop-blur-md transition-all ${
              activeIngredient === 'milk'
                ? 'ring-2 ring-[#e29b58] bg-black/85 shadow-xl scale-105'
                : 'opacity-90 hover:scale-105'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#d8c3b0]" />
            <span className="text-xs font-extrabold tracking-widest text-white uppercase">
              SILKY MILK
            </span>
          </button>
        </div>

        {/* Floating Ingredient Tag: Bottom Right (GOLDEN CARAMEL) */}
        <div className="absolute bottom-10 right-4 sm:right-12 md:right-16 z-30">
          <button
            onClick={() => setActiveIngredient('caramel')}
            className={`glass-pill px-5 py-2.5 rounded-full flex items-center gap-2.5 cursor-pointer bg-black/60 border border-white/20 backdrop-blur-md transition-all ${
              activeIngredient === 'caramel'
                ? 'ring-2 ring-[#e29b58] bg-black/85 shadow-xl scale-105'
                : 'opacity-90 hover:scale-105'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#e29b58]" />
            <span className="text-xs font-extrabold tracking-widest text-white uppercase">
              GOLDEN CARAMEL
            </span>
          </button>
        </div>

        {/* Floating Ingredient Tag: Bottom Left (GELATO CREMA) */}
        <div className="absolute bottom-12 left-4 sm:left-12 md:left-16 z-30">
          <button
            onClick={() => setActiveIngredient('crema')}
            className={`glass-pill px-5 py-2.5 rounded-full flex items-center gap-2.5 cursor-pointer bg-black/60 border border-white/20 backdrop-blur-md transition-all ${
              activeIngredient === 'crema'
                ? 'ring-2 ring-[#e29b58] bg-black/85 shadow-xl scale-105'
                : 'opacity-90 hover:scale-105'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#faecd6]" />
            <span className="text-xs font-extrabold tracking-widest text-white uppercase">
              GELATO CREMA
            </span>
          </button>
        </div>

        {/* Central Visual: Image 2 (Dynamic Vortex Collision Splash) */}
        <div className="relative w-full max-w-4xl aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black/40 backdrop-blur-xs transition-all duration-700 hover:scale-[1.01]">
          <Image
            src="/images/stage2-mix-vortex.jpg"
            alt="Explosive Fluid Vortex Splash Collision"
            fill
            priority
            loading="eager"
            unoptimized
            className="object-cover object-center filter saturate-[1.08] contrast-[1.05]"
            sizes="(max-width: 1200px) 100vw, 1000px"
          />
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/40 pointer-events-none" />

          {/* Bottom Live Status Pill */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-auto px-4 py-2.5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 shadow-xl flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e29b58] animate-ping" />
            <div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#e29b58]">
                STAGE 2: CENTRIFUGAL VORTEX COLLISION
              </div>
              <div className="text-xs font-semibold text-white">Scroll down to pour into the signature cup</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Ingredient Detail Drawer Card */}
      <div className="max-w-xl w-full mx-auto mt-6 z-20">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#e29b58]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#e29b58]">
                {currentInfo.origin}
              </span>
            </div>
            <span className="text-xs font-extrabold text-white bg-black/50 px-3 py-1 rounded-full border border-white/15">
              {currentInfo.name}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#d4c5b9] leading-relaxed">
            {currentInfo.description}
          </p>

          {/* Interactive Blend Ratio Slider */}
          <div className="pt-2 border-t border-white/10">
            <div className="flex justify-between items-center text-[11px] font-semibold text-[#b09e91] mb-1.5 uppercase tracking-wider">
              <span>Dark Espresso Intensity</span>
              <span className="font-bold text-[#e29b58]">{100 - mixRatio}% / {mixRatio}% Milk</span>
              <span>Creamy Milk Body</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={mixRatio}
              onChange={(e) => setMixRatio(Number(e.target.value))}
              className="w-full accent-[#e29b58] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
