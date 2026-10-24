'use client';

import React, { useState } from 'react';
import { ArrowUp, MapPin, Clock, Phone, Mail, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#140e0b] text-[#f6f0e8] pt-20 pb-12 px-6 md:px-12 border-t border-white/10 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c48243]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Top Row: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-[0.2em] uppercase text-white">
              SWIRL
            </h2>
            <p className="text-xs sm:text-sm text-[#bdae9f] max-w-sm leading-relaxed">
              An architectural coffee roastery celebrating single-origin micro-lots, 3D fluid craft, and unforgettable sensory experiences.
            </p>
            <div className="flex items-center gap-4 pt-2 text-[#c48243]">
              <a href="#instagram" className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#twitter" className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 transition-colors" aria-label="X / Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="mailto:hello@swirlcafe.com" className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 transition-colors" aria-label="Email">
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#e29b58] uppercase">
                SECRET MICRO-LOTS
              </span>
              <h3 className="text-xl font-display font-bold text-white">
                Join The Swirl Tasting Guild
              </h3>
              <p className="text-xs text-[#bdae9f]">
                Receive invitations to private cupping sessions and early drops of limited Geisha micro-lots.
              </p>
            </div>

            {subscribed ? (
              <div className="p-3.5 rounded-2xl bg-[#c48243]/20 border border-[#c48243]/40 flex items-center gap-2 text-xs text-[#ffd8b0]">
                <CheckCircle2 size={16} className="text-[#e29b58]" />
                <span>Welcome to the Guild. Check your inbox for our tasting guide.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-full bg-black/40 border border-white/15 text-xs text-white placeholder-[#8c7b70] focus:outline-none focus:border-[#c48243]"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#c48243] hover:bg-[#a6652c] text-white text-xs font-bold tracking-widest uppercase transition-all shadow-md shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Row: Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
          <div className="flex items-start gap-3.5">
            <Clock size={18} className="text-[#e29b58] shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-bold tracking-widest text-[#9c8e84] uppercase">Hours</div>
              <div className="text-xs font-semibold text-white mt-1">Monday – Friday: 7:00 AM – 10:00 PM</div>
              <div className="text-xs text-[#bdae9f]">Saturday – Sunday: 8:00 AM – 11:00 PM</div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <MapPin size={18} className="text-[#e29b58] shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-bold tracking-widest text-[#9c8e84] uppercase">Location</div>
              <div className="text-xs font-semibold text-white mt-1">428 Roastery Lane, Artisan Quarter</div>
              <div className="text-xs text-[#bdae9f]">Valet Parking & Terrace Seating Available</div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Phone size={18} className="text-[#e29b58] shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-bold tracking-widest text-[#9c8e84] uppercase">Inquiries & Private Events</div>
              <div className="text-xs font-semibold text-white mt-1">+1 (800) 420-SWIRL</div>
              <div className="text-xs text-[#bdae9f]">events@swirlcafe.com</div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-[#8c7b70]">
          <div>
            © 2026 SWIRL Roastery & Cafe Co. All Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#e29b58] transition-colors py-1 cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
