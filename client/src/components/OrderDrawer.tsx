'use client';

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Check, Calendar, Clock, Users, Coffee, Sparkles } from 'lucide-react';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  milk?: string;
  sweetness?: string;
}

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function OrderDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: OrderDrawerProps) {
  const [tab, setTab] = useState<'order' | 'reserve'>('order');
  const [isOrdered, setIsOrdered] = useState(false);
  const [isReserved, setIsReserved] = useState(false);

  // Reservation form state
  const [partySize, setPartySize] = useState('2 Guests');
  const [reserveDate, setReserveDate] = useState('Today');
  const [reserveTime, setReserveTime] = useState('4:30 PM');
  const [seatingArea, setSeatingArea] = useState('Barista Counter');

  if (!isOpen) return null;

  // Calculate total price
  const parsePrice = (price: string) => Number(price.replace(/[^\d.]/g, '')) || 0;
  const subtotal = items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const handleOrderCheckout = () => {
    setIsOrdered(true);
    setTimeout(() => {
      onClearCart();
      setIsOrdered(false);
      onClose();
    }, 2800);
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReserved(true);
    setTimeout(() => {
      setIsReserved(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <div className="relative z-10 w-full max-w-md bg-[#faf7f2] h-full shadow-2xl flex flex-col border-l border-[#c48243]/20 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#201815]/10 flex items-center justify-between bg-white/60 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-extrabold tracking-wider uppercase text-[#201815]">
              10 Fails
            </span>
            <span className="text-xs text-[#7d6f64] font-semibold uppercase">Cold coffee</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#201815] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-6 pt-4 flex gap-2">
          <button
            onClick={() => setTab('order')}
            className={`flex-1 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              tab === 'order'
                ? 'bg-[#201815] text-[#fff9f0] shadow-sm'
                : 'bg-white/70 text-[#6a5b50] hover:text-[#201815]'
            }`}
          >
            Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
          </button>
          <button
            onClick={() => setTab('reserve')}
            className={`flex-1 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              tab === 'reserve'
                ? 'bg-[#201815] text-[#fff9f0] shadow-sm'
                : 'bg-white/70 text-[#6a5b50] hover:text-[#201815]'
            }`}
          >
            Book Table
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'order' ? (
            isOrdered ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#c48243]/15 text-[#c48243] flex items-center justify-center animate-bounce">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#201815]">
                  Order received
                </h3>
                <p className="text-xs text-[#6a5b50] max-w-xs">
                  Your cold coffee order #{Math.floor(1000 + Math.random() * 9000)} is in. Give us a few minutes.
                </p>
                <div className="p-4 rounded-2xl bg-white border border-[#c48243]/20 w-full max-w-xs text-xs text-[#4a3b32] space-y-1">
                  <div className="font-bold text-[#c48243]">ESTIMATED READY TIME</div>
                  <div className="font-extrabold text-base text-[#201815]">6 - 8 Minutes</div>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16 text-[#7d6f64]">
                <Coffee size={40} className="text-[#c48243]/40" />
                <h3 className="text-base font-bold text-[#201815]">Your Bag is Empty</h3>
                <p className="text-xs max-w-xs">
                  Add a cold coffee to start.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-white/90 border border-[#201815]/10 shadow-xs flex items-center gap-3.5"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-black">
                      <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#201815] truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] font-semibold text-[#c48243]">{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-[#f6f0e8] hover:bg-[#ebd5be] flex items-center justify-center text-[#201815] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-extrabold text-[#201815] w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-[#f6f0e8] hover:bg-[#ebd5be] flex items-center justify-center text-[#201815] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 text-[#9e8f85] hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )
          ) : isReserved ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-[#c48243]/15 text-[#c48243] flex items-center justify-center animate-bounce">
                <Check size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-[#201815]">
                Table Confirmed!
              </h3>
              <p className="text-xs text-[#6a5b50] max-w-xs">
                We have saved a spot at our {seatingArea} for {partySize} on {reserveDate} at {reserveTime}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleReserveSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#7d6f64] uppercase tracking-wider flex items-center gap-1.5">
                  <Users size={13} />
                  <span>Party Size</span>
                </label>
                <select
                  value={partySize}
                  onChange={(e) => setPartySize(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-[#201815]/10 text-xs font-bold text-[#201815] focus:outline-none focus:ring-2 focus:ring-[#c48243]"
                >
                  <option>1 Guest (Solo Study)</option>
                  <option>2 Guests (Duo Catchup)</option>
                  <option>3-4 Guests (Table Lounge)</option>
                  <option>5-6 Guests (Private Alcove)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#7d6f64] uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar size={13} />
                  <span>Date</span>
                </label>
                <select
                  value={reserveDate}
                  onChange={(e) => setReserveDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-[#201815]/10 text-xs font-bold text-[#201815] focus:outline-none"
                >
                  <option>Today</option>
                  <option>Tomorrow</option>
                  <option>This Weekend</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#7d6f64] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock size={13} />
                  <span>Time Slot</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['10:00 AM', '1:30 PM', '4:30 PM', '6:00 PM', '7:30 PM', '9:00 PM'].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setReserveTime(t)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all ${
                        reserveTime === t
                          ? 'bg-[#201815] text-[#fff9f0]'
                          : 'bg-white border border-[#201815]/10 text-[#4a3b32] hover:bg-[#f6f0e8]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#7d6f64] uppercase tracking-wider">
                  Seating Zone
                </label>
                <select
                  value={seatingArea}
                  onChange={(e) => setSeatingArea(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-[#201815]/10 text-xs font-bold text-[#201815] focus:outline-none"
                >
                  <option>Barista Counter (Brew View)</option>
                  <option>Sunlit Window Lounge</option>
                  <option>Cozy Reading Velvet Nook</option>
                  <option>Open-Air Garden Terrace</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-4 rounded-full bg-[#c48243] hover:bg-[#a6652c] text-white text-xs font-extrabold uppercase tracking-[0.2em] shadow-md transition-all cursor-pointer"
              >
                Confirm Table Reservation
              </button>
            </form>
          )}
        </div>

        {/* Footer for Order checkout */}
        {tab === 'order' && items.length > 0 && !isOrdered && (
          <div className="p-6 border-t border-[#201815]/10 bg-white/70 backdrop-blur-md space-y-3">
            <div className="flex justify-between text-xs text-[#7d6f64]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#201815]">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-xs text-[#7d6f64]">
              <span>GST</span>
              <span className="font-semibold text-[#201815]">₹{tax}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-[#201815] pt-2 border-t border-[#201815]/10">
              <span>Total</span>
              <span className="font-display text-xl text-[#c48243]">₹{total}</span>
            </div>

            <button
              onClick={handleOrderCheckout}
              className="w-full py-4 rounded-full bg-[#201815] hover:bg-[#382b24] text-[#fff9f0] text-xs font-extrabold uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              <Sparkles size={15} className="text-[#c48243]" />
              <span>Checkout Order</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
