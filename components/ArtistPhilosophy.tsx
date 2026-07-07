'use client';

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

// Custom SVG Icons for high fidelity and zero-dependency rendering
const ShieldIcon = () => (
  <svg className="w-6 h-6 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const LeafIcon = () => (
  <svg className="w-6 h-6 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18.75m0-18.75a8.25 8.25 0 018.25 8.25M12 3a8.25 8.25 0 00-8.25 8.25m16.5 0A8.25 8.25 0 0112 19.5m8.25-8.25H3.75" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-6 h-6 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3 15l5.187-.813L9 9l.813 5.187L15 15l-5.187.813zM18 10.5l-.5-3.5-3.5-.5 3.5-.5.5-3.5.5 3.5 3.5.5-3.5.5-.5 3.5zM20.25 18.75l-.4-2.1-2.1-.4 2.1-.4.4-2.1.4 2.1 2.1.4-2.1.4-.4 2.1z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

interface Commitment {
  title: string;
  description: string;
}

interface Standard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function ArtistPhilosophy() {
  const [activeTab, setActiveTab] = useState<'bio' | 'standards' | 'safespace'>('bio');

  const standards: Standard[] = [
    {
      icon: <SparklesIcon />,
      title: "Medical-Grade Sterilization",
      description: "Your health is my highest priority. I operate a 100% single-use, disposable studio. Every needle, cartridge, barrier film, and ink cap is opened directly in front of you and safely discarded immediately after your session."
    },
    {
      icon: <LeafIcon />,
      title: "Cruelty-Free & Vegan Materials",
      description: "I use exclusively vegan-friendly, cruelty-free black inks and pigments that are highly rated for safety and longevity. All stencil papers, soaps, and skin glides used throughout your session are also 100% vegan."
    },
    {
      icon: <ShieldIcon />,
      title: "Full Licensing & Compliance",
      description: "My studio space is fully licensed by the local health department and operates in strict compliance with all local health regulations and bloodborne pathogen safety standards."
    }
  ];

  const commitments: Commitment[] = [
    {
      title: "Consent is Absolute",
      description: "We will discuss placement, adjustments, and stencil placement together. I will never pressure you into a size or placement you aren't fully comfortable with."
    },
    {
      title: "Comfort Over Everything",
      description: "Need a break? Want to stretch? Need to adjust your seating? Just say the word. There is zero shame in taking breaks."
    },
    {
      title: "Privacy Options",
      description: "If your tattoo placement requires removing clothing, we can set up privacy screens to ensure you feel completely secure and respected throughout the session."
    },
    {
      title: "Open Communication",
      description: "If you ever feel uncomfortable, anxious, or have questions during any part of the process, my door is always open."
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 20 }
    }
  };

  return (
    <section 
      id="artist-philosophy" 
      className="relative bg-[#0D0D0D] text-[#F5F5F5] py-24 lg:py-32 overflow-hidden border-b border-[#262626]"
    >
      {/* Abstract background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D97706]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D97706] block mb-3">
            Philosophy &amp; Standards
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white lowercase leading-tight">
            respecting the canvas, refining the craft.
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-neutral-400 font-sans leading-relaxed">
            Tattooing is more than ink on skin—it is a collaborative, transparent, and entirely unpretentious journey built on clean artistry and clinical precision.
          </p>
        </div>

        {/* Interactive Navigation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Vertical Tab Selectors & Visual Anchor */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-2 border-b lg:border-b-0 lg:border-l border-[#262626] scrollbar-none">
              
              <button
                onClick={() => setActiveTab('bio')}
                className={`flex-shrink-0 text-left px-4 py-3 lg:pl-6 lg:pr-4 border-b-2 lg:border-b-0 lg:border-l-2 transition-all duration-300 focus:outline-none ${
                  activeTab === 'bio'
                    ? 'border-[#D97706] text-[#D97706] bg-[#D97706]/5'
                    : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <span className="block text-xs font-mono tracking-wider uppercase mb-1">01 / Artist</span>
                <span className="font-serif text-lg font-semibold">The Persona</span>
              </button>

              <button
                onClick={() => setActiveTab('standards')}
                className={`flex-shrink-0 text-left px-4 py-3 lg:pl-6 lg:pr-4 border-b-2 lg:border-b-0 lg:border-l-2 transition-all duration-300 focus:outline-none ${
                  activeTab === 'standards'
                    ? 'border-[#D97706] text-[#D97706] bg-[#D97706]/5'
                    : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <span className="block text-xs font-mono tracking-wider uppercase mb-1">02 / Clinical</span>
                <span className="font-serif text-lg font-semibold">Studio Standards</span>
              </button>

              <button
                onClick={() => setActiveTab('safespace')}
                className={`flex-shrink-0 text-left px-4 py-3 lg:pl-6 lg:pr-4 border-b-2 lg:border-b-0 lg:border-l-2 transition-all duration-300 focus:outline-none ${
                  activeTab === 'safespace'
                    ? 'border-[#D97706] text-[#D97706] bg-[#D97706]/5'
                    : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <span className="block text-xs font-mono tracking-wider uppercase mb-1">03 / Ethics</span>
                <span className="font-serif text-lg font-semibold">Inclusivity Policy</span>
              </button>

            </div>

            {/* Micro Portrait Callout */}
            <div className="hidden lg:block relative group overflow-hidden rounded-lg border border-[#262626]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent z-10 opacity-80" />
              <img 
                src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?q=80&w=800&auto=format&fit=crop" 
                alt="Jake Llewellyn at work in his private studio" 
                className="w-full h-64 object-cover object-center grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <p className="text-xs font-mono text-[#D97706] uppercase tracking-widest">now booking</p>
                <p className="text-sm text-neutral-300 font-sans mt-0.5">Custom blackwork &amp; flash</p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Content Panels */}
          <div className="lg:col-span-8 min-h-[500px]">
            
            {/* Panel 1: Extended Biography */}
            {activeTab === 'bio' && (
              <motion.div
                key="bio"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white lowercase">
                    the person behind the machine.
                  </h3>
                  <div className="mt-6 space-y-6 text-neutral-300 font-sans leading-relaxed text-base sm:text-lg">
                    <p>
                      My name is Jake Llewellyn, and I am a solo tattoo artist dedicated to the preservation and progression of illustrative blackwork. I began my journey in the visual arts as an illustrator, working with ink, charcoal, and paper. The transition to skin was a natural but profound shift—I realized that the ultimate canvas is one that breathes, moves, and ages.
                    </p>
                    <p>
                      My approach to tattooing is deeply intentional. I don’t believe in rushing the process or churning out cookie-cutter designs. I take the time to study your body’s natural lines, ensuring that every curve of the tattoo complements your anatomy. 
                    </p>
                    <p>
                      I draw inspiration from classical engraving, botanical illustrations, scientific diagrams, and ancient mythology, translating these complex themes into clean, readable tattoos that stand the test of time. When you sit in my chair, you are getting a collaborative, professional, and respectful experience from start to finish.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-6">
                  <a 
                    href="#booking-request-form"
                    className="inline-flex items-center text-[#D97706] font-mono text-sm uppercase tracking-wider hover:text-white transition-colors group"
                  >
                    Discuss a custom concept with Jake
                    <ArrowRightIcon />
                  </a>
                </motion.div>
              </motion.div>
            )}

            {/* Panel 2: Clinical Standards */}
            {activeTab === 'standards' && (
              <motion.div
                key="standards"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-10"
              >
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white lowercase">
                    clinical standards. creative space.
                  </h3>
                  <p className="mt-4 text-neutral-400 font-sans leading-relaxed">
                    A premium tattoo experience demands uncompromising hygiene and material safety. Every element of my workflow is engineered to exceed state health directives.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {standards.map((std, idx) => (
                    <motion.div 
                      key={idx} 
                      variants={itemVariants}
                      className="p-6 bg-[#121212] border border-[#262626] rounded-lg hover:border-neutral-700 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#1C1C1C] rounded-md border border-[#262626]">
                          {std.icon}
                        </div>
                        <h4 className="text-lg font-serif font-semibold text-white">{std.title}</h4>
                      </div>
                      <p className="text-neutral-400 font-sans text-sm leading-relaxed">
                        {std.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Panel 3: Safe Space & Inclusivity */}
            {activeTab === 'safespace' && (
              <motion.div
                key="safespace"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white lowercase">
                    every body is welcome here.
                  </h3>
                  <p className="mt-4 text-neutral-400 font-sans leading-relaxed">
                    Tattooing is an intimate process that requires trust, comfort, and vulnerability. I am committed to fostering a safe, inclusive, and body-positive environment for every single client, regardless of race, gender identity, sexual orientation, background, or body type.
                  </p>
                </motion.div>

                {/* Styled Amber Callout Block */}
                <motion.div 
                  variants={itemVariants}
                  className="p-6 sm:p-8 bg-[#D97706]/[0.03] border border-[#D97706]/20 rounded-xl"
                >
                  <h4 className="text-sm font-mono uppercase tracking-wider text-[#D97706] mb-6">
                    My Commitments to You:
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {commitments.map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <CheckIcon />
                        <div>
                          <h5 className="font-serif text-base font-semibold text-white mb-1">
                            {item.title}
                          </h5>
                          <p className="text-neutral-400 font-sans text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center md:text-left">
                  <p className="text-xs font-mono text-neutral-500">
                    * Have specific accessibility needs or sensory preferences? Let me know in your booking request.
                  </p>
                </motion.div>
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}