'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Plus, Star, Heart, ArrowRight } from 'lucide-react';

interface SipSectionProps {
  onSelectDrink: (drink: any) => void;
  onOpenOrder: () => void;
}

const DRINKS = [
  {
    id: 'original',
    name: 'ORIGINAL SWIRL CUP',
    subtitle: 'Signature Takeaway Cup & Swirl',
    price: '$6.50',
    image: '/images/stage3-coffee-cup.jpg',
    calories: '185 kcal',
    caffeine: '195 mg',
    description: 'The final evolution. Freshly brewed double espresso, silky steamed milk, and slow-dripped golden caramel swirl pouring continuously from above into our signature cup.',
    notes: ['Golden Caramel', 'Velvety Cocoa', 'Brown Sugar Crema'],
    badge: 'SIGNATURE MASTERPIECE',
  },
  {
    id: 'vanilla-cloud',
    name: 'VANILLA CLOUD',
    subtitle: 'Whipped Gelato Cold Foam',
    price: '$7.25',
    image: '/images/vanilla-cloud.jpg',
    calories: '220 kcal',
    caffeine: '175 mg',
    description: 'Poured through a chilled cloud of whipped Madagascar bourbon vanilla cream with molten salted butterscotch drizzle.',
    notes: ['Vanilla Gelato', 'Salted Toffee', 'Silky Crema'],
    badge: 'BARISTA FAVORITE',
  },
  {
    id: 'caramel-crush',
    name: 'CARAMEL CRUSH',
    subtitle: 'Triple Ristretto & Burnt Butter',
    price: '$7.50',
    image: '/images/latte.jpg',
    calories: '240 kcal',
    caffeine: '210 mg',
    description: 'An unapologetically decadent symphony of triple espresso, house-caramelized butterscotch cream, and warm cinnamon.',
    notes: ['Toasted Toffee', 'Roasted Pecan', 'Dark Espresso'],
    badge: 'LIMITED EDITION',
  },
];

export default function SipSection({ onSelectDrink, onOpenOrder }: SipSectionProps) {
  const [selectedId, setSelectedId] = useState<string>('original');
  const currentDrink = DRINKS.find((d) => d.id === selectedId) || DRINKS[0];

  return (
    <section
      id="sip-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-12 py-24 overflow-hidden bg-gradient-to-b from-[#20140d] via-[#1a100b] to-[#120b08] text-[#fff9f0]"
    >
      {/* Seamless cascading liquid gradient linking Section 2 down into Section 3 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-64 bg-gradient-to-b from-[#c48243]/40 via-[#e29b58]/30 to-transparent blur-2xl pointer-events-none" />

      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-tr from-[#c48243]/20 via-[#e29b58]/15 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header matching video */}
      <div className="max-w-4xl w-full mx-auto text-center space-y-4 mb-12 relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 shadow-xs">
          <span className="text-[11px] font-extrabold tracking-[0.25em] text-[#e29b58] uppercase">
            SECTION 3 • THE SIP & CASCADE
          </span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Sparkles className="text-[#e29b58] w-6 h-6 md:w-8 md:h-8 animate-spin-slow" />
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white uppercase leading-tight">
            YOUR DAILY OBSESSION.
          </h2>
          <Sparkles className="text-[#e29b58] w-6 h-6 md:w-8 md:h-8 animate-spin-slow" />
        </div>

        <p className="text-sm sm:text-base text-[#cfbfb2] max-w-lg mx-auto font-light leading-relaxed">
          From the swirling vortex above, the golden espresso-caramel ribbon pours continuously into your cup with zero interruption.
        </p>

        {/* Flavor Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          {DRINKS.map((drink) => (
            <button
              key={drink.id}
              onClick={() => setSelectedId(drink.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                selectedId === drink.id
                  ? 'bg-[#c48243] text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/15 text-[#cfbfb2] border border-white/10'
              }`}
            >
              {drink.name}
            </button>
          ))}
        </div>
      </div>

      {/* Showcase Grid */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">
        {/* Left Column: Tasting Notes & Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl space-y-5">
            <div className="inline-block px-3 py-1 rounded-full bg-[#c48243]/20 text-[#e29b58] text-[10px] font-extrabold tracking-widest uppercase border border-[#c48243]/30">
              {currentDrink.badge}
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                {currentDrink.name}
              </h3>
              <p className="text-xs font-semibold text-[#b09e91] tracking-wider uppercase mt-1">
                {currentDrink.subtitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#d4c5b9] leading-relaxed">
              {currentDrink.description}
            </p>

            {/* Tasting Notes Pills */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[10px] font-bold tracking-widest text-[#b09e91] uppercase">
                Aromatic Profile
              </span>
              <div className="flex flex-wrap gap-2">
                {currentDrink.notes.map((note) => (
                  <span
                    key={note}
                    className="text-[11px] font-medium bg-black/40 text-[#ffd8b0] px-3 py-1 rounded-full border border-white/10"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-center">
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/10">
                <span className="block text-[10px] text-[#b09e91] uppercase font-bold">Caffeine</span>
                <span className="text-xs font-extrabold text-white">{currentDrink.caffeine}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/10">
                <span className="block text-[10px] text-[#b09e91] uppercase font-bold">Calories</span>
                <span className="text-xs font-extrabold text-white">{currentDrink.calories}</span>
              </div>
            </div>

            {/* Price & Quick Add Button */}
            <div className="flex items-center justify-between pt-3">
              <span className="text-3xl font-display font-black text-[#e29b58]">
                {currentDrink.price}
              </span>
              <button
                onClick={() => onSelectDrink(currentDrink)}
                className="px-6 py-2.5 rounded-full bg-[#c48243] hover:bg-[#a6652c] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Plus size={14} />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center Column: Big Coffee Cup Showcase with Cascading Swirl */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-[320px] sm:w-[400px] aspect-[4/5] flex items-center justify-center">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-radial from-[#e29b58]/35 to-transparent rounded-full filter blur-3xl pointer-events-none animate-glow" />

            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-black/40 backdrop-blur-xs transition-all duration-700 hover:scale-[1.02]">
              <Image
                src={currentDrink.image}
                alt={currentDrink.name}
                fill
                priority
                loading="eager"
                unoptimized
                className="object-cover object-center filter saturate-[1.08] contrast-[1.05]"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Seamless Pouring Indicator Tag */}
              <div className="absolute top-4 left-4 right-4 p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-[#e29b58]">
                    CONTINUOUS POURING VORTEX
                  </div>
                  <div className="text-xs font-bold text-white">Flowing seamlessly from above</div>
                </div>
                <div className="text-xs font-extrabold text-[#e29b58] bg-white/10 px-2.5 py-1 rounded-full border border-[#c48243]/30">
                  Ready
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Other Drink Cards */}
        <div className="lg:col-span-3 space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#b09e91] uppercase block">
            More Confections
          </span>
          {DRINKS.filter((d) => d.id !== selectedId).map((drink) => (
            <div
              key={drink.id}
              onClick={() => setSelectedId(drink.id)}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 cursor-pointer hover:border-[#c48243]/60 transition-all duration-300 group"
            >
              <div className="relative w-16 h-20 rounded-xl overflow-hidden shrink-0 shadow-md">
                <Image
                  src={drink.image}
                  alt={drink.name}
                  fill
                  loading="eager"
                  unoptimized
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-[#e29b58] uppercase tracking-wider">
                  {drink.badge}
                </div>
                <h4 className="text-xs font-bold text-white truncate">
                  {drink.name}
                </h4>
                <p className="text-[11px] text-[#b09e91]">{drink.price}</p>
              </div>
              <ArrowRight size={15} className="text-[#e29b58] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Big Bottom Action Button matching video */}
      <div className="mt-14 relative z-20">
        <button
          onClick={onOpenOrder}
          className="px-10 py-4 rounded-full bg-[#c48243] hover:bg-[#a6652c] text-white text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer group"
        >
          <Sparkles size={16} className="text-white group-hover:rotate-45 transition-transform" />
          <span>FIND YOUR SWIRL</span>
          <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
