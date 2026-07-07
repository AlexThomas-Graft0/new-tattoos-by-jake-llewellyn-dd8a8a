'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, FileText, Compass, CalendarCheck } from 'lucide-react';

interface TimelineStep {
  number: string;
  title: string;
  body: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  details: string[];
}

const steps: TimelineStep[] = [
  {
    number: '01',
    title: 'Browse & Select',
    body: 'Look through my portfolio or available flash designs to see if my illustrative blackwork style aligns with your vision. If you want custom work, gather 2-3 reference images that capture the mood or flow you are looking for.',
    icon: Compass,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
    details: ['Explore custom gallery', 'Choose pre-drawn flash', 'Gather reference moodboards']
  },
  {
    number: '02',
    title: 'Send the Details',
    body: 'Ditch the unorganized social media DMs. Fill out our structured, 2-minute booking form with your desired size, placement, and reference files. This gives me everything I need to review your concept and provide an accurate quote.',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
    details: ['Avoid messy DM threads', 'Specify exact body placement', 'Receive upfront pricing']
  },
  {
    number: '03',
    title: 'Secure & Sit',
    body: 'Once approved, we’ll lock in your session date with a secure deposit. I’ll prepare your custom design or prepare your chosen flash piece, and we’ll bring it to life in a clean, relaxed, and professional studio environment.',
    icon: CalendarCheck,
    image: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=800',
    details: ['Secure dates via deposit', 'Collaborative design review', 'Relaxed, clinical-grade session']
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 15,
    },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: 'easeInOut' },
  },
};

export function ProcessTimeline() {
  return (
    <section
      id="process-timeline"
      className="relative min-h-screen bg-[#0D0D0D] text-[#F5F5F5] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Abstract Background Lineart / Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F5F5F5" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#D97706]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[#D97706] font-mono text-sm tracking-[0.25em] uppercase block mb-3">
            The Workflow
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight lowercase font-sans mb-6">
            how we build your tattoo.
          </h2>
          <p className="max-w-2xl mx-auto text-stone-400 font-sans text-lg leading-relaxed">
            From the initial spark of an idea to the final healing phase, my process is completely 
            transparent, highly collaborative, and structured to put you at ease.
          </p>
        </div>

        {/* Desktop Visual Connection Line */}
        <div className="hidden lg:block relative w-full h-1 bg-[#262626] top-[2.75rem] left-0 right-0 z-0 max-w-5xl mx-auto">
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="h-full bg-gradient-to-r from-[#D97706] via-amber-500 to-[#D97706] origin-left"
          />
        </div>

        {/* Step Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10 max-w-6xl mx-auto mb-24"
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative flex flex-col bg-[#121212]/90 border border-[#262626] rounded-xl overflow-hidden p-6 md:p-8 transition-colors duration-300 hover:border-[#D97706]/40"
              >
                {/* Background Artful Image Overlay on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none">
                  <img
                    src={step.image}
                    alt=""
                    className="w-full h-full object-cover grayscale"
                  />
                </div>

                {/* Step Header */}
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <span className="text-5xl md:text-6xl font-black font-sans text-[#D97706] tracking-tighter">
                    {step.number}
                  </span>
                  <div className="p-3 rounded-lg bg-[#262626]/40 border border-[#262626] text-[#D97706] group-hover:bg-[#D97706] group-hover:text-[#0D0D0D] transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow relative z-10">
                  <h3 className="text-2xl font-bold font-sans text-[#F5F5F5] mb-4 group-hover:text-[#D97706] transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-stone-400 font-sans text-sm leading-relaxed mb-6">
                    {step.body}
                  </p>
                </div>

                {/* Checklist Footer */}
                <div className="border-t border-[#262626] pt-5 mt-auto relative z-10">
                  <ul className="space-y-2.5">
                    {step.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-center text-xs text-stone-500 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] mr-2.5 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden border border-[#333] bg-[#161616]"
        >
          {/* Subtle background graphic */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/20 via-transparent to-transparent opacity-60 pointer-events-none" />

          <div className="relative px-6 py-12 md:p-16 text-center max-w-4xl mx-auto z-10">
            <span className="text-[#D97706] font-mono text-xs tracking-widest uppercase inline-block mb-4">
              Get Started
            </span>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-[#F5F5F5] lowercase font-sans mb-4">
              Ready to start your next piece?
            </h3>
            <p className="text-stone-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Let's create something that moves with your body. Select an option below to begin.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Custom Project CTA */}
              <a
                href="#booking-request-form"
                className="w-full sm:w-auto px-8 py-4 bg-[#D97706] hover:bg-[#b56100] text-[#0D0D0D] font-bold text-sm tracking-wider uppercase rounded transition-all duration-200 shadow-lg shadow-[#D97706]/10 flex items-center justify-center gap-2 group/btn"
              >
                Book a Custom Project
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </a>

              {/* Flash Catalog CTA */}
              <a
                href="#flash-catalog"
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-[#262626] text-[#F5F5F5] font-bold text-sm tracking-wider uppercase rounded border border-[#262626] hover:border-[#F5F5F5]/30 transition-all duration-200 flex items-center justify-center"
              >
                Claim a Pre-Drawn Flash Design
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}