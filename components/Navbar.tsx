'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Menu, X, Calendar, ArrowRight } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'philosophy', href: '#artist-philosophy' },
  { label: 'portfolio', href: '#portfolio-grid' },
  { label: 'available flash', href: '#flash-catalog' },
  { label: 'the process', href: '#process-timeline' },
  { label: 'aftercare', href: '#aftercare-protocol' },
];

const headerVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
    },
  },
};

const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      type: 'spring',
      duration: 0.3,
      bounce: 0,
    },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      type: 'spring',
      duration: 0.4,
      bounce: 0.1,
    },
  },
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll position to apply background blur & border
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0D0D0D]/90 backdrop-blur-md border-b border-[#262626] py-4'
          : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      {/* Top micro-banner for studio availability */}
      <div className="absolute top-0 left-0 right-0 bg-[#262626] text-[10px] tracking-widest uppercase py-1 px-4 text-center text-[#F5F5F5]/70 font-mono hidden md:block">
        <span className="inline-block w-2 h-2 rounded-full bg-[#D97706] mr-2 animate-pulse" />
        private studio • by appointment only • tuesday - saturday 11am - 7pm
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-1 md:mt-4">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#hero-section"
            className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] rounded-md"
            aria-label="Jake Llewellyn Tattoo Home"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight lowercase text-[#F5F5F5] group-hover:text-[#D97706] transition-colors duration-200">
              jake llewellyn
            </span>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#D97706] -mt-1 pl-[2px]">
              tattoo studio
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-mono text-xs tracking-wider lowercase text-[#F5F5F5]/80 hover:text-[#D97706] transition-colors duration-200 relative py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] rounded-sm"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D97706] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Call to Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#booking-request-form"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#D97706] hover:bg-[#D97706]/90 text-[#0D0D0D] font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D] focus-visible:ring-[#D97706]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Custom</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#F5F5F5] hover:text-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] rounded-md transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="lg:hidden mt-4 overflow-hidden border-t border-[#262626] bg-[#0D0D0D]/95 backdrop-blur-lg rounded-b-xl"
            >
              <div className="py-6 px-4 flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-4">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="font-serif text-lg lowercase text-[#F5F5F5] hover:text-[#D97706] transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] rounded-sm block"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                <div className="h-px bg-[#262626] my-2" />

                {/* Mobile Extra Info & CTA */}
                <div className="flex flex-col gap-4">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#F5F5F5]/60">
                    <p>studio open • tue - sat</p>
                    <p className="mt-1 text-[#D97706]">by appointment only</p>
                  </div>
                  <a
                    href="#booking-request-form"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-between px-5 py-3.5 bg-[#D97706] text-[#0D0D0D] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#D97706]/90 transition-colors duration-200"
                  >
                    <span>Book Custom Tattoo</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}