'use client';

import React from 'react';
import { ArrowUp, MapPin, Clock, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#080504] px-6 pt-16 pb-10 text-[#f6f0e8] md:px-12">
      <div className="relative z-10 mx-auto max-w-7xl space-y-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-6">
            <h2 className="font-display text-3xl font-extrabold tracking-[0.18em] text-white uppercase">
              10 Fails
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[#bdae9f]">
              Cafe for cold coffee, fried eggs and momos. This page is just the coffee. The rest of the menu comes later.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 lg:col-span-6">
            <div className="flex items-start gap-3">
              <Clock size={16} className="mt-0.5 shrink-0 text-[#e29b58]" />
              <div>
                <div className="text-[10px] font-bold tracking-widest text-[#9c8e84] uppercase">Hours</div>
                <div className="mt-1 text-xs font-semibold text-white">11:00 AM – 11:00 PM</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#e29b58]" />
              <div>
                <div className="text-[10px] font-bold tracking-widest text-[#9c8e84] uppercase">Location</div>
                <div className="mt-1 text-xs font-semibold text-white">Coming to your city</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-[#e29b58]" />
              <div>
                <div className="text-[10px] font-bold tracking-widest text-[#9c8e84] uppercase">Order</div>
                <div className="mt-1 text-xs font-semibold text-white">hello@10fails.com</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[#8c7b70] sm:flex-row">
          <div>© 2026 10 Fails. Cold coffee first.</div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 hover:text-[#e29b58]"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
