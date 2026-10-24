'use client';

import React, { useEffect, useState } from 'react';
import ThreeCanvas from '@/components/ThreeCanvas';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MixSection from '@/components/MixSection';
import SipSection from '@/components/SipSection';
import RoastLabSection from '@/components/RoastLabSection';
import Footer from '@/components/Footer';
import OrderDrawer, { CartItem } from '@/components/OrderDrawer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'default-1',
      name: 'ORIGINAL SWIRL LATTE',
      price: '$6.50',
      image: '/images/iced-latte.jpg',
      quantity: 1,
    },
  ]);

  // Setup GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
        setScrollProgress(progress);

        if (progress < 0.28) {
          setCurrentSection(0);
        } else if (progress < 0.6) {
          setCurrentSection(1);
        } else if (progress < 0.85) {
          setCurrentSection(2);
        } else {
          setCurrentSection(3);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Subtle entrance animations for sections
    const sections = ['#spin-section', '#mix-section', '#sip-section', '#roast-lab'];
    sections.forEach((secId) => {
      gsap.fromTo(
        secId,
        { opacity: 0.85, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: secId,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Cart Handlers
  const handleAddToCart = (drink: any) => {
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
          image: drink.image,
          quantity: 1,
        },
      ];
    });
    setIsDrawerOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
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

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleTakeSpin = () => {
    const mixSection = document.getElementById('mix-section');
    if (mixSection) {
      mixSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="relative min-h-screen bg-[#f6f0e8] text-[#201815] overflow-x-hidden">
      {/* 3D WebGL Canvas Layer */}
      <ThreeCanvas scrollProgress={scrollProgress} currentSection={currentSection} />

      {/* Navigation Bar */}
      <Navbar onOpenOrder={() => setIsDrawerOpen(true)} cartCount={totalCartCount} />

      {/* Section 1: The Spin */}
      <HeroSection onTakeSpin={handleTakeSpin} />

      {/* Section 2: The Mix (Infinity loop & Vortex) */}
      <MixSection />

      {/* Section 3: The Sip (Your Daily Obsession) */}
      <SipSection
        onSelectDrink={handleAddToCart}
        onOpenOrder={() => setIsDrawerOpen(true)}
      />

      {/* Section 4: The Artisan Roastery & Cafe Sanctuary */}
      <RoastLabSection />

      {/* Footer */}
      <Footer />

      {/* Order & Table Reservation Drawer */}
      <OrderDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </main>
  );
}
