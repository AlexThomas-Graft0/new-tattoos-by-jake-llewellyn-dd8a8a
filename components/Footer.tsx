'use client';

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('inquiries@jake-llewellyn-tattoo.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      // Fallback
    }
  };

  return (
    <footer className="relative z-10 bg-[#0D0D0D] text-[#F5F5F5] border-t border-[#262626] overflow-hidden">
      {/* Decorative top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#D97706]/30 to-transparent" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 sm:px-8 lg:px-12">
        
        {/* Quick CTA Banner Area */}
        <div className="border-b border-[#262626] pb-12 mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-white lowercase">
              ready to start your next piece?
            </h3>
            <p className="mt-3 text-sm sm:text-base text-gray-400 font-sans font-light leading-relaxed">
              Let&apos;s create something that moves with your body. Select an option below to begin.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <a
              href="#booking-request-form"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#D97706] bg-[#D97706] text-black font-sans font-semibold text-sm tracking-wide rounded-sm hover:bg-transparent hover:text-[#D97706] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:ring-offset-2 focus:ring-offset-black"
            >
              Book a Custom Project
            </a>
            <a
              href="#flash-catalog"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#262626] bg-transparent text-[#F5F5F5] font-sans font-semibold text-sm tracking-wide rounded-sm hover:border-[#F5F5F5] hover:bg-white/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              Claim a Pre-Drawn Flash Design
            </a>
          </div>
        </div>

        {/* 4-Column Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 xl:gap-12"
        >
          {/* Column 1: Brand & Licensing */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs tracking-widest text-[#D97706] uppercase block">
                the studio
              </span>
              <h4 className="font-sans text-2xl font-bold tracking-tight text-white lowercase">
                jake llewellyn tattoo.
              </h4>
            </div>
            <p className="text-sm text-gray-400 font-sans leading-relaxed">
              Professional illustrative blackwork tattooing in a private, clean, and inclusive studio space. Fully licensed and compliant with local health department regulations.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#262626] bg-black/40 text-xs font-mono text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Health Dept. Certified
            </div>
          </motion.div>

          {/* Column 2: Navigation */}
          <motion.div variants={itemVariants} className="space-y-6">
            <span className="font-mono text-xs tracking-widest text-[#D97706] uppercase block">
              explore
            </span>
            <ul className="space-y-3 text-sm font-sans">
              {[
                { label: 'Portfolio Gallery', href: '#portfolio-grid' },
                { label: 'Pre-Drawn Flash', href: '#flash-catalog' },
                { label: 'About & Safety', href: '#artist-philosophy' },
                { label: 'Booking Info & FAQ', href: '#process-timeline' },
                { label: 'Aftercare Guide', href: '#aftercare-protocol' },
              ].map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 block py-1 relative group focus:outline-none focus:text-white"
                  >
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact & Hours */}
          <motion.div variants={itemVariants} className="space-y-6">
            <span className="font-mono text-xs tracking-widest text-[#D97706] uppercase block">
              contact & hours
            </span>
            <div className="space-y-4 text-sm">
              <div className="space-y-1">
                <span className="text-xs text-gray-500 block font-mono">Direct Inquiry</span>
                <button
                  onClick={handleCopyEmail}
                  className="font-mono text-gray-300 hover:text-[#D97706] transition-colors duration-200 text-left block break-all focus:outline-none"
                  title="Click to copy email address"
                  aria-label="Copy studio email address"
                >
                  inquiries@jake-llewellyn-tattoo.com
                  {copied && (
                    <span className="block text-xs text-[#10B981] mt-1 font-sans">
                      ✓ Email copied to clipboard
                    </span>
                  )}
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-gray-500 block font-mono">Response Window</span>
                <p className="text-gray-400 font-sans leading-relaxed">
                  Mon-Fri, 9:00 AM - 5:00 PM <br />
                  <span className="text-xs text-gray-500">(Response within 3-5 business days)</span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-gray-500 block font-mono">Studio Hours</span>
                <p className="text-gray-400 font-sans">
                  Tuesday - Saturday, 11:00 AM - 7:00 PM <br />
                  <span className="text-xs text-gray-500">(By appointment only)</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Column 4: Client Agreement Summary */}
          <motion.div variants={itemVariants} className="space-y-6">
            <span className="font-mono text-xs tracking-widest text-[#D97706] uppercase block">
              the agreement
            </span>
            <p className="text-sm text-gray-400 font-sans leading-relaxed">
              All bookings require a non-refundable deposit to secure dates. All designs are the intellectual property of Jake Llewellyn. Safety, inclusivity, and client consent are prioritized at every stage of the process.
            </p>
            <div className="border border-[#262626] bg-black/30 p-4 rounded-sm">
              <span className="text-xs font-mono text-[#D97706] block mb-1">deposit notice:</span>
              <p className="text-xs text-gray-400 font-sans leading-snug">
                $100 for flash and $200 for custom works. Applied directly to the final cost on session day.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-[#262626] mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-xs font-mono text-gray-500">
            <span>© 2026 Jake Llewellyn. All rights reserved.</span>
            <span className="hidden sm:inline text-gray-700">|</span>
            <a href="#artist-philosophy" className="hover:text-white transition-colors">Studio Policies</a>
            <span className="hidden sm:inline text-gray-700">|</span>
            <a href="#booking-request-form" className="hover:text-white transition-colors">Booking Terms</a>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="#hero-section" 
              className="p-3 border border-[#262626] hover:border-[#D97706] hover:text-[#D97706] transition-colors rounded-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
              aria-label="Back to top of page"
            >
              <svg 
                className="w-4 h-4 transform rotate-180" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-6l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}