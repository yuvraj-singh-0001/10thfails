'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CoffeeScrollScene from '@/components/CoffeeScrollScene';
import Footer from '@/components/Footer';
import OrderDrawer, { CartItem } from '@/components/OrderDrawer';
import { Sparkles, Droplets, Zap, ShieldCheck } from 'lucide-react';

const SIGNATURE_BREWS = [
  {
    id: 'classic',
    batch: 'BATCH #01 • SIGNATURE',
    name: 'Classic Velvet Brew',
    desc: 'Slow-steeped Arabica espresso with farm-fresh micro-foam milk. Deep cocoa notes, zero added water.',
    price: '₹99',
    tag: 'MOST POPULAR',
    notes: ['Dark Roast Arabica', 'Whole Farm Milk', 'Slow Caramel'],
  },
  {
    id: 'vanilla',
    batch: 'BATCH #05 • INFUSION',
    name: 'Madagascar Vanilla Cold',
    desc: 'Infused with real Madagascar bourbon vanilla beans. Silky, subtle sweetness that enhances the roasted bean aroma.',
    price: '₹129',
    tag: 'ARTISANAL',
    notes: ['Madagascar Vanilla', 'Double Shot Drip', 'Raw Cane Infusion'],
  },
  {
    id: 'thick',
    batch: 'BATCH #10 • MASTER RESERVE',
    name: 'Extra Thick Double Swirl',
    desc: 'Triple-churned dense velvet pour. Extra thick texture that coats the glass and stays cold for over 45 minutes.',
    price: '₹149',
    tag: 'ULTRA DENSE',
    notes: ['Triple Churned', 'Double Espresso', 'Salted Caramel Drizzle'],
  },
];

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (drink: (typeof SIGNATURE_BREWS)[number]) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === drink.name);
      if (existing) {
        return prev.map((item) =>
          item.name === drink.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `${drink.id}-${Date.now()}`,
          name: drink.name,
          price: drink.price,
          image: '',
          quantity: 1,
        },
      ];
    });
    setIsDrawerOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(
      (prev) =>
        prev
          .map((item) => {
            if (item.id === id) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="relative min-h-screen bg-[#050302] text-[#fff9f0] selection:bg-[#c48243] selection:text-white">
      <Navbar onOpenOrder={() => setIsDrawerOpen(true)} cartCount={totalCartCount} />

      {/* 3D Scroll Video Experience (100% animetion video.mp4, No Images) */}
      <CoffeeScrollScene onOrder={() => setIsDrawerOpen(true)} />

      {/* Seamless Transition Section: From the 3D Vortex into Your Glass */}
      <section
        id="menu"
        className="relative -mt-1 bg-gradient-to-b from-[#050302] via-[#090604] to-[#050302] px-6 py-28 md:px-14 z-20"
      >
        {/* Subtle Ambient Caramel Radial Glow */}
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#c48243]/10 rounded-full blur-[140px]" />

        <div className="relative mx-auto max-w-6xl">
          {/* Seamless Header connecting the 3D brew story */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#c48243] animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#e2a56a]">
                FROM THE VORTEX • INTO YOUR GLASS
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Pick Your Brew.
            </h2>

            <p className="text-sm md:text-base text-[#cfbfb2] leading-relaxed">
              Three signature cold coffee iterations born from ten failed recipes. Chilled to 2°C, served thick and velvet-smooth.
            </p>
          </div>

          {/* Luxury Signature Brew Showcase Cards */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {SIGNATURE_BREWS.map((drink) => (
              <article
                key={drink.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl transition-all duration-500 hover:border-[#c48243]/60 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(196,130,67,0.12)]"
              >
                {/* Glow pill behind each card on hover */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#c48243]/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-40" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#c48243]">
                      {drink.batch}
                    </span>
                    <span className="rounded-full bg-white/[0.06] border border-white/10 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-[#e2a56a]">
                      {drink.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#fff9f0]">
                      {drink.name}
                    </h3>
                    <div className="mt-2 text-2xl font-black text-[#e2a56a]">
                      {drink.price}
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-[#bcaea1]">
                    {drink.desc}
                  </p>

                  {/* Tasting Notes Pills */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {drink.notes.map((note) => (
                      <span
                        key={note}
                        className="rounded-full bg-black/40 border border-white/10 px-2.5 py-1 text-[10px] font-medium text-[#d9c9bc]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleAddToCart(drink)}
                    className="w-full rounded-full bg-[#c48243] py-3.5 text-xs font-extrabold uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-300 hover:bg-[#a6652c] hover:shadow-[0_10px_25px_rgba(196,130,67,0.35)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles size={14} />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Quality Guarantee Strip */}
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md flex flex-wrap items-center justify-around gap-6 text-center text-xs text-[#cfbfb2]">
            <div className="flex items-center gap-3">
              <Droplets size={18} className="text-[#c48243]" />
              <span>Zero Artificial Syrups</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap size={18} className="text-[#c48243]" />
              <span>Served at 2°C Ice Cold</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-[#c48243]" />
              <span>100% Farm-Fresh Whole Milk</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <OrderDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />
    </main>
  );
}
