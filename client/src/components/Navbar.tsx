'use client';

import React, { useState } from 'react';
import { Search, ShoppingBag, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenOrder: () => void;
  cartCount: number;
}

export default function Navbar({ onOpenOrder, cartCount }: NavbarProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Audio ambience toggle (simulated smooth cafe white noise / gentle vinyl chime)
  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo matching video */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection('spin-section')}
              className="text-2xl md:text-3xl font-display font-extrabold tracking-[0.2em] text-[#201815] uppercase hover:opacity-80 transition-opacity"
            >
              SWIRL
            </button>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#c48243]" />
            <span className="hidden sm:inline-block text-[11px] font-semibold tracking-widest text-[#7d6f64] uppercase">
              Roastery
            </span>
          </div>

          {/* Navigation Links matching video */}
          <nav className="hidden md:flex items-center gap-9 text-xs font-semibold tracking-[0.16em] uppercase text-[#382b24]">
            <button
              onClick={() => scrollToSection('spin-section')}
              className="hover:text-[#c48243] transition-colors py-1 relative group"
            >
              HOME
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c48243] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection('mix-section')}
              className="hover:text-[#c48243] transition-colors py-1 relative group"
            >
              ESPRESSO
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c48243] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection('sip-section')}
              className="hover:text-[#c48243] transition-colors py-1 relative group"
            >
              THE ROAST
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c48243] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection('roast-lab')}
              className="hover:text-[#c48243] transition-colors py-1 relative group"
            >
              OUR STORY
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c48243] transition-all duration-300 group-hover:w-full" />
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2.5 rounded-full border transition-all duration-300 ${
                isPlayingAudio
                  ? 'bg-[#c48243] text-white border-[#c48243] shadow-md'
                  : 'bg-white/80 hover:bg-white text-[#4a3b32] border-[#201815]/10'
              }`}
              title={isPlayingAudio ? 'Mute Cafe Ambience' : 'Play Cafe Ambience'}
              aria-label="Toggle cafe ambiance audio"
            >
              {isPlayingAudio ? <Volume2 size={16} className="animate-pulse" /> : <VolumeX size={16} />}
            </button>

            {/* Search Pill */}
            <div className="relative hidden sm:block">
              {searchOpen ? (
                <div className="flex items-center bg-white/90 rounded-full px-3 py-1.5 border border-[#201815]/15 shadow-sm">
                  <Search size={14} className="text-[#8c7b70] mr-2" />
                  <input
                    type="text"
                    placeholder="Search brew..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-xs text-[#201815] focus:outline-none w-28"
                    autoFocus
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-[#8c7b70] text-xs ml-1">
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white/90 border border-[#201815]/10 text-xs font-medium tracking-wider text-[#382b24] transition-all"
                >
                  <Search size={13} className="text-[#8c7b70]" />
                  <span>SEARCH</span>
                </button>
              )}
            </div>

            {/* Shopping Bag / Cart */}
            <button
              onClick={onOpenOrder}
              className="relative p-2.5 rounded-full bg-[#201815] text-[#fff9f0] hover:bg-[#382b24] transition-all duration-200 shadow-md group"
              aria-label="Open Cart"
            >
              <ShoppingBag size={17} className="transition-transform group-hover:scale-110" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#c48243] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-white/80 border border-[#201815]/10 text-[#201815]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#f6f0e8]/95 backdrop-blur-xl md:hidden flex flex-col justify-center items-center gap-8 text-lg font-display tracking-widest text-[#201815]">
          <button
            onClick={() => scrollToSection('spin-section')}
            className="hover:text-[#c48243] transition-colors"
          >
            HOME
          </button>
          <button
            onClick={() => scrollToSection('mix-section')}
            className="hover:text-[#c48243] transition-colors"
          >
            ESPRESSO
          </button>
          <button
            onClick={() => scrollToSection('sip-section')}
            className="hover:text-[#c48243] transition-colors"
          >
            THE ROAST
          </button>
          <button
            onClick={() => scrollToSection('roast-lab')}
            className="hover:text-[#c48243] transition-colors"
          >
            OUR STORY
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOrder();
            }}
            className="px-6 py-3 rounded-full bg-[#201815] text-[#fff9f0] font-sans text-xs tracking-widest uppercase mt-4"
          >
            ORDER YOUR SIP ({cartCount})
          </button>
        </div>
      )}
    </>
  );
}
