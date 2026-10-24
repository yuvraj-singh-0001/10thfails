'use client';

import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenOrder: () => void;
  cartCount: number;
}

export default function Navbar({ onOpenOrder, cartCount }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-50 px-6 py-5 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-2xl font-extrabold tracking-[0.18em] text-white uppercase"
          >
            10 Fails
          </button>

          <nav className="hidden items-center gap-9 text-xs font-semibold tracking-[0.16em] text-white/80 uppercase md:flex">
            <button onClick={() => scrollToSection('coffee')} className="hover:text-[#c48243]">
              Brew
            </button>
            <button onClick={() => scrollToSection('menu')} className="hover:text-[#c48243]">
              Cold Coffee
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenOrder}
              className="relative rounded-full bg-white p-2.5 text-[#201815]"
              aria-label="Open cart"
            >
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c48243] text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full border border-white/15 bg-white/10 p-2.5 text-white md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/95 text-lg font-display tracking-widest text-white md:hidden">
          <button onClick={() => scrollToSection('coffee')}>Brew</button>
          <button onClick={() => scrollToSection('menu')}>Cold Coffee</button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOrder();
            }}
            className="mt-2 rounded-full bg-[#c48243] px-6 py-3 font-sans text-xs tracking-widest uppercase"
          >
            Order ({cartCount})
          </button>
        </div>
      )}
    </>
  );
}
