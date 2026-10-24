'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Flame, Clock, Award, Compass, Coffee, Sparkles } from 'lucide-react';

const ROAST_STAGES = [
  {
    level: 'Light Roast',
    temp: '196°C / 385°F',
    time: '9 mins 15s',
    origin: 'Yirgacheffe, Ethiopia',
    notes: 'Jasmine Bloom, Bergamot Citrus, Honey Crisp',
    color: '#b07d53',
    description: 'Preserves the delicate origin characteristics and bright floral acidity of high-elevation African beans.',
  },
  {
    level: 'Medium Amber',
    temp: '208°C / 406°F',
    time: '11 mins 40s',
    origin: 'Huila, Colombia',
    notes: 'Milk Chocolate, Roasted Hazelnut, Caramelized Peach',
    color: '#82481e',
    description: 'The golden balance where natural bean sugars caramelize, offering a creamy body with balanced sweetness.',
  },
  {
    level: 'Dark Espresso',
    temp: '220°C / 428°F',
    time: '13 mins 50s',
    origin: 'Antigua, Guatemala',
    notes: 'Smoked Dark Cacao, Molasses, Toasted Walnut',
    color: '#3d1d0c',
    description: 'Deep, syrupy and bold. Essential for our thick golden crema and dense milk drink foundations.',
  },
];

export default function RoastLabSection() {
  const [selectedRoast, setSelectedRoast] = useState(1);
  const current = ROAST_STAGES[selectedRoast];

  return (
    <section
      id="roast-lab"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-12 py-24 bg-[#1e1714] text-[#fff9f0] overflow-hidden"
    >
      {/* Background ambient warm glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#c48243]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#8c4e1d]/25 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-4xl w-full mx-auto text-center space-y-4 mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15">
          <Flame size={14} className="text-[#e29b58]" />
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#e29b58] uppercase">
            THE ARTISAN ROASTERY
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white uppercase leading-tight">
          FROM GREEN BEAN <br /> TO VELVET SWIRL.
        </h2>

        <p className="text-sm sm:text-base text-[#c9b9ad] max-w-xl mx-auto font-light leading-relaxed">
          Every batch is roasted in our custom cast-iron drum roaster, monitored second-by-second to unlock peak aromatic compounds.
        </p>

        {/* Roast Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          {ROAST_STAGES.map((roast, index) => (
            <button
              key={roast.level}
              onClick={() => setSelectedRoast(index)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                selectedRoast === index
                  ? 'bg-[#c48243] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/15 text-[#d8c7bb] border border-white/10'
              }`}
            >
              {roast.level}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Roast Showcase Card */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 mb-20">
        {/* Left Column: Live Stage Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold tracking-widest text-[#e29b58] uppercase">
                {current.origin}
              </span>
              <span className="text-xs font-mono text-[#c9b9ad] bg-black/40 px-3 py-1 rounded-full border border-white/10">
                {current.temp}
              </span>
            </div>

            <h3 className="text-3xl font-display font-bold text-white">
              {current.level}
            </h3>

            <p className="text-xs sm:text-sm text-[#bdae9f] leading-relaxed">
              {current.description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center gap-3">
                <Clock size={16} className="text-[#e29b58]" />
                <div>
                  <div className="text-[10px] text-[#9c8e84] uppercase">Roast Duration</div>
                  <div className="text-xs font-bold text-white">{current.time}</div>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center gap-3">
                <Award size={16} className="text-[#e29b58]" />
                <div>
                  <div className="text-[10px] text-[#9c8e84] uppercase">Cupping Score</div>
                  <div className="text-xs font-bold text-white">88.5 / 100</div>
                </div>
              </div>
            </div>

            {/* Tasting Notes */}
            <div className="pt-2">
              <span className="text-[10px] font-bold tracking-widest text-[#9c8e84] uppercase block mb-2">
                Identified Notes
              </span>
              <div className="p-3 rounded-2xl bg-[#c48243]/15 border border-[#c48243]/30 text-xs font-medium text-[#ffd8b0]">
                {current.notes}
              </div>
            </div>
          </div>
        </div>

        {/* Center / Right Column: Roastery Photo Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
            <Image
              src="/images/pourover.jpg"
              alt="Handcrafted Pour-over Dripper"
              fill
              loading="eager"
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 350px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#e29b58]">
                  Manual Craft
                </span>
                <h4 className="text-sm font-bold text-white">Chemex Artisan Extraction</h4>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
            <Image
              src="/images/pastry.jpg"
              alt="Freshly Baked Croissant Bakery"
              fill
              loading="eager"
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 350px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#e29b58]">
                  Fresh Oven Daily
                </span>
                <h4 className="text-sm font-bold text-white">Butter Croissant & Pain au Chocolat</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cafe Interior Banner */}
      <div className="max-w-6xl w-full mx-auto relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl min-h-[320px] md:min-h-[400px] flex items-center p-8 md:p-14 z-10">
        <Image
          src="/images/interior.jpg"
          alt="Aura Roastery Cafe Atmosphere"
          fill
          loading="eager"
          unoptimized
          className="object-cover filter brightness-[0.65]"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        <div className="relative z-10 max-w-lg space-y-4">
          <span className="text-xs font-bold tracking-[0.25em] text-[#e29b58] uppercase">
            AESTHETIC & SANCTUARY
          </span>
          <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
            Designed for unhurried conversations and quiet focus.
          </h3>
          <p className="text-xs sm:text-sm text-[#e0d3c7] leading-relaxed">
            Minimalist walnut millwork, warm Edison lighting, vinyl jazz, and the intoxicating fragrance of freshly ground beans.
          </p>
        </div>
      </div>
    </section>
  );
}
