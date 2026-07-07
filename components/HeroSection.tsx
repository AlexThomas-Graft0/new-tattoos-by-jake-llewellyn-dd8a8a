'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, Eye } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};

const tattooImages = [
  {
    url: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=600&q=80',
    alt: 'Custom illustrative botanical blackwork detail featuring intricate dotwork',
  },
  {
    url: 'https://images.unsplash.com/photo-1598252577524-a2eaee3b1a61?auto=format&fit=crop&w=600&q=80',
    alt: 'Healed bold blackwork sleeve wrap close-up with intense shading',
  },
  {
    url: 'https://images.unsplash.com/photo-1590246814883-5775170b947b?auto=format&fit=crop&w=600&q=80',
    alt: 'Geometric structural line art and high contrast tattoo illustration',
  },
];

// Duplicate images to create a seamless infinite scrolling illusion
const scrollingImages = [...tattooImages, ...tattooImages, ...tattooImages];

export function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen w-full bg-[#0D0D0D] text-[#F5F5F5] overflow-hidden flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Subtle Background Textures & Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#D97706]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#10B981]/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(38,38,38,0.15)_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Typography Block */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-left space-y-8"
        >
          {/* Artist Tag */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
            <span className="h-[1px] w-8 bg-[#D97706]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D97706] font-mono font-semibold">
              Jake Llewellyn Tattoo
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F5F5] leading-[1.1] font-serif lowercase"
          >
            illustrative blackwork <br />
            <span className="text-[#D97706]">designed to move with you.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed font-sans"
          >
            Welcome to a structured, collaborative, and entirely unpretentious tattoo experience. Based in a private, clean studio space, I specialize in custom illustrative blackwork and original pre-drawn flash art that ages beautifully.
          </motion.p>

          {/* Action Pathways (CTAs) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <a
              href="#booking-request-form"
              className="group relative flex items-center justify-center gap-3 bg-[#D97706] hover:bg-[#c26a05] text-[#0D0D0D] font-semibold px-8 py-4 rounded-none transition-all duration-300 transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:ring-offset-2 focus:ring-offset-[#0D0D0D] text-sm tracking-wide"
            >
              <span>Book a Custom Tattoo</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#flash-catalog"
              className="flex items-center justify-center gap-3 bg-transparent hover:bg-[#262626]/40 text-[#F5F5F5] font-medium px-8 py-4 rounded-none border border-[#262626] hover:border-neutral-500 transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-neutral-700 text-sm tracking-wide"
            >
              <span>Browse Available Flash</span>
            </a>
          </motion.div>

          {/* Value Highlights */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 pt-6 border-t border-[#262626]/80 max-w-xl"
          >
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#F5F5F5]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" /> Private Space
              </span>
              <span className="text-[11px] text-neutral-500">Sterile, fully custom, zero attitude</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#F5F5F5]">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" /> Premium Ink
              </span>
              <span className="text-[11px] text-neutral-500">100% Vegan & cruelty-free</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#F5F5F5]">
                <Eye className="w-3.5 h-3.5 text-blue-400" /> Custom Fit
              </span>
              <span className="text-[11px] text-neutral-500">Mapped to your anatomy</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: High-contrast, Slow-scrolling Masonry */}
        <div className="lg:col-span-5 relative h-[500px] lg:h-[700px] w-full flex items-center justify-center overflow-hidden border border-[#262626] bg-[#0d0d0d] rounded-none group">
          
          {/* Accent frame corners for the container */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#262626] z-20 group-hover:border-[#D97706] transition-colors duration-500" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#262626] z-20 group-hover:border-[#D97706] transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#262626] z-20 group-hover:border-[#D97706] transition-colors duration-500" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#262626] z-20 group-hover:border-[#D97706] transition-colors duration-500" />

          {/* Scrolling Column */}
          <div className="relative w-full h-full flex flex-col items-center select-none overflow-hidden">
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: '-50%' }}
              transition={{
                ease: 'linear',
                duration: 24,
                repeat: Infinity,
              }}
              className="flex flex-col gap-6 w-full px-6 py-3"
            >
              {scrollingImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-full aspect-[3/4] flex-shrink-0 group/item overflow-hidden bg-neutral-900 border border-[#262626]"
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    loading="eager"
                    className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 transition-all duration-700 group-hover/item:scale-110 group-hover/item:grayscale-0 group-hover/item:brightness-100"
                  />
                  {/* Image Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D97706] bg-[#0D0D0D]/90 px-2 py-1 border border-[#262626]">
                      Healed Detail
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Overlay Grid lines for artistic structure */}
          <div className="absolute inset-0 pointer-events-none border border-[#262626] m-4 z-10 flex items-center justify-center">
            <div className="w-full h-[1px] bg-[#262626]/20 absolute" />
            <div className="h-full w-[1px] bg-[#262626]/20 absolute" />
          </div>
        </div>

      </div>
    </section>
  );
}