'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  ShieldCheck, 
  Droplet, 
  Sparkles, 
  Sun, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileDown, 
  Calendar,
  Clock,
  Info
} from 'lucide-react';

// Framer motion variants with explicit typing
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

export function AftercareProtocol() {
  const [activeMethod, setActiveMethod] = useState<'second-skin' | 'traditional'>('second-skin');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Simulated PDF download with toast success feedback
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (downloading || downloadSuccess) return;
    
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1500);
  };

  return (
    <section 
      id="aftercare-protocol" 
      className="relative bg-[#0D0D0D] text-[#F5F5F5] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans border-t border-[#262626]"
    >
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D97706]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION 7.1: AFTERCARE HEADER */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <div className="lg:col-span-7 space-y-6">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#262626] border border-[#333333] text-xs uppercase tracking-widest text-[#D97706]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
              Essential Healing Guide
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F5F5] font-serif lowercase"
            >
              how to care for your tattoo.
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-400 leading-relaxed max-w-2xl"
            >
              The session is over, but our work isn&apos;t done. 50% of the final quality of your tattoo depends on how you care for it during the next two to three weeks. Please follow these instructions carefully to ensure clean healing, sharp lines, and deep black saturation.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#aftercare-protocol"
                onClick={handleDownload}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#D97706] hover:bg-[#B45309] text-black font-semibold text-sm uppercase tracking-wider transition-all duration-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:ring-offset-2 focus:ring-offset-[#0D0D0D]"
              >
                {downloading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating Guide...
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-black" />
                    Downloaded Successfully
                  </>
                ) : (
                  <>
                    <FileDown className="w-4 h-4 text-black" />
                    Download Printable PDF Guide (PDF) →
                  </>
                )}
              </a>
            </motion.div>
          </div>

          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#D97706] to-[#262626] rounded-none opacity-20 blur group-hover:opacity-30 transition duration-1000" />
            <div className="relative bg-[#141414] border border-[#262626] p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold tracking-tight font-serif lowercase text-[#F5F5F5]">
                quick-reference stats.
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0D0D0D] p-4 border border-[#262626]">
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Critical Phase</div>
                  <div className="text-2xl font-bold text-[#D97706]">Days 1–3</div>
                </div>
                <div className="bg-[#0D0D0D] p-4 border border-[#262626]">
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Peeling Phase</div>
                  <div className="text-2xl font-bold text-[#D97706]">Days 4–14</div>
                </div>
                <div className="bg-[#0D0D0D] p-4 border border-[#262626]">
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Healing</div>
                  <div className="text-2xl font-bold text-[#D97706]">3 Weeks</div>
                </div>
                <div className="bg-[#0D0D0D] p-4 border border-[#262626]">
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Free Touch-ups</div>
                  <div className="text-2xl font-bold text-[#D97706]">6 Months</div>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs text-gray-400 bg-[#0D0D0D] p-3 border-l-2 border-[#D97706]">
                <Info className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <span>Always wash your hands thoroughly with antibacterial soap before touching your fresh tattoo.</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* TOAST NOTIFICATION FOR SIMULATED DOWNLOAD */}
        <AnimatePresence>
          {downloadSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-6 right-6 z-50 bg-[#10B981] text-black px-6 py-4 shadow-2xl flex items-center gap-3 border border-emerald-400 font-sans"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-bold uppercase tracking-wider text-xs">Download Complete</p>
                <p className="text-xs opacity-90">"jake-llewellyn-aftercare-guide.pdf" saved.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECTION 7.2: IMMEDIATE CARE (DAYS 1-3) */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#262626]">
            <div>
              <p className="text-[#D97706] text-xs uppercase tracking-widest font-mono mb-2">Stage 01</p>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif lowercase">
                immediate care (days 1–3)
              </h3>
            </div>
            
            {/* Tab toggles for interactive view */}
            <div className="flex bg-[#141414] p-1 border border-[#262626] mt-4 md:mt-0 max-w-sm">
              <button 
                onClick={() => setActiveMethod('second-skin')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${activeMethod === 'second-skin' ? 'bg-[#D97706] text-black' : 'text-gray-400 hover:text-[#F5F5F5]'}`}
              >
                Second-Skin Bandage
              </button>
              <button 
                onClick={() => setActiveMethod('traditional')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${activeMethod === 'traditional' ? 'bg-[#D97706] text-black' : 'text-gray-400 hover:text-[#F5F5F5]'}`}
              >
                Traditional Wrap
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeMethod === 'second-skin' ? (
              <motion.div 
                key="second-skin"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                <div className="lg:col-span-4 bg-[#141414] p-8 border border-[#262626] flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-[#D97706]/10 text-[#D97706] text-xs font-mono uppercase tracking-widest mb-6 border border-[#D97706]/20">
                      Method A
                    </span>
                    <h4 className="text-xl font-bold tracking-tight text-[#F5F5F5] mb-4">
                      Second-Skin Bandage (Saniderm / Tegaderm)
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      A medical-grade, breathable adhesive barrier that locks in the body&apos;s natural healing fluids, allowing for an incredibly clean, scab-free healing process.
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-[#262626] flex items-center gap-4">
                    <Droplet className="w-8 h-8 text-[#D97706] shrink-0" />
                    <p className="text-xs text-gray-500 leading-normal">
                      Fluid collection under the film is normal. It will look dark, blurry, and ink-filled. Do not panic.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-8 bg-[#141414] border border-[#262626] p-8 sm:p-10">
                  <h5 className="text-xs uppercase tracking-widest text-[#D97706] font-mono mb-8">Step-by-Step Instructions</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div className="text-xl font-bold font-serif text-[#D97706]">01.</div>
                      <h6 className="font-semibold text-sm text-[#F5F5F5] uppercase tracking-wider">Leave it on for 3 to 5 days:</h6>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Keep the bandage on as directed. It is normal for fluid (ink, plasma, blood) to collect under the film. It may look dark and blurry—this is completely normal.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="text-xl font-bold font-serif text-[#D97706]">02.</div>
                      <h6 className="font-semibold text-sm text-[#F5F5F5] uppercase tracking-wider">Removal:</h6>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        To remove, find an edge and gently peel the bandage <em className="text-[#D97706] not-italic font-semibold">downwards</em> in the shower under warm running water. Do not pull it straight up.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="text-xl font-bold font-serif text-[#D97706]">03.</div>
                      <h6 className="font-semibold text-sm text-[#F5F5F5] uppercase tracking-wider">Wash immediately:</h6>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Gently wash the area with your clean hands using lukewarm water and a mild, unscented liquid soap (like Dr. Bronner&apos;s Baby Mild or Dial). Do not use a washcloth or sponge.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="text-xl font-bold font-serif text-[#D97706]">04.</div>
                      <h6 className="font-semibold text-sm text-[#F5F5F5] uppercase tracking-wider">Pat dry:</h6>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Pat the area dry with a clean paper towel. Let it air dry for 10 minutes before applying moisturizer.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="traditional"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                <div className="lg:col-span-4 bg-[#141414] p-8 border border-[#262626] flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-[#D97706]/10 text-[#D97706] text-xs font-mono uppercase tracking-widest mb-6 border border-[#D97706]/20">
                      Method B
                    </span>
                    <h4 className="text-xl font-bold tracking-tight text-[#F5F5F5] mb-4">
                      Traditional Plastic Wrap
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      The classic method used for clients with sensitive skin, adhesive allergies, or placements that do not support stretch-film adhesion properly.
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-[#262626] flex items-center gap-4">
                    <Clock className="w-8 h-8 text-[#D97706] shrink-0" />
                    <p className="text-xs text-gray-500 leading-normal">
                      Never re-wrap your tattoo yourself once the initial plastic barrier is removed.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-8 bg-[#141414] border border-[#262626] p-8 sm:p-10">
                  <h5 className="text-xs uppercase tracking-widest text-[#D97706] font-mono mb-8">Step-by-Step Instructions</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div className="text-xl font-bold font-serif text-[#D97706]">01.</div>
                      <h6 className="font-semibold text-sm text-[#F5F5F5] uppercase tracking-wider">Remove in 2 to 4 hours:</h6>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Do not leave the plastic wrap on for more than 4 hours. Do not re-wrap the tattoo.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="text-xl font-bold font-serif text-[#D97706]">02.</div>
                      <h6 className="font-semibold text-sm text-[#F5F5F5] uppercase tracking-wider">Wash immediately:</h6>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Wash the tattoo immediately after removal using lukewarm water and a mild, unscented liquid soap. Wash away all dried fluids and ointment.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="text-xl font-bold font-serif text-[#D97706]">03.</div>
                      <h6 className="font-semibold text-sm text-[#F5F5F5] uppercase tracking-wider">Pat dry:</h6>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Gently pat dry with a clean paper towel. Let it air dry completely.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="text-xl font-bold font-serif text-[#D97706]">04.</div>
                      <h6 className="font-semibold text-sm text-[#F5F5F5] uppercase tracking-wider">Apply ointment:</h6>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Apply a very thin layer of ointment (like Aquaphor) to protect the skin.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SECTION 7.3: THE HEALING PHASE (DAYS 4-14) */}
        <div className="mb-24">
          <div className="mb-12">
            <p className="text-[#D97706] text-xs uppercase tracking-widest font-mono mb-2">Stage 02</p>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight font-serif lowercase">
              the peeling phase.
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Daily Maintenance */}
            <div className="bg-[#141414] border border-[#262626] p-8 sm:p-10 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-none text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold uppercase tracking-wider text-[#F5F5F5]">Daily Maintenance</h4>
              </div>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="text-emerald-500 shrink-0 font-mono text-sm font-bold mt-1">✓</div>
                  <div>
                    <h5 className="font-bold text-sm text-[#F5F5F5] mb-1">Wash twice daily</h5>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Wash your tattoo once in the morning and once at night with unscented liquid soap.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="text-emerald-500 shrink-0 font-mono text-sm font-bold mt-1">✓</div>
                  <div>
                    <h5 className="font-bold text-sm text-[#F5F5F5] mb-1">Moisturize sparingly</h5>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Apply a thin layer of unscented, alcohol-free lotion (like Lubriderm or Aveeno) 2-3 times a day. Your skin should look hydrated, not greasy or wet. If the lotion is pooling on the skin, you&apos;ve applied too much.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Critical Warnings (What NOT to do) */}
            <div className="bg-[#141414] border border-[#262626] p-8 sm:p-10 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-none text-red-400">
                  <XCircle className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold uppercase tracking-wider text-[#F5F5F5]">Critical Warnings (What NOT to do)</h4>
              </div>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="text-red-500 shrink-0 font-mono text-sm font-bold mt-1">✗</div>
                  <div>
                    <h5 className="font-bold text-sm text-[#F5F5F5] mb-1">Do NOT pick or scratch</h5>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Your tattoo will peel and flake like a sunburn, and it will itch. Do not scratch, pick, or peel the flaking skin. Doing so can pull the ink out of the skin, leaving blank spots.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="text-red-500 shrink-0 font-mono text-sm font-bold mt-1">✗</div>
                  <div>
                    <h5 className="font-bold text-sm text-[#F5F5F5] mb-1">Do NOT submerge in water</h5>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Avoid baths, hot tubs, swimming pools, lakes, and oceans for at least 2 weeks. Showers are fine, but do not let the water spray directly onto the new tattoo.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="text-red-500 shrink-0 font-mono text-sm font-bold mt-1">✗</div>
                  <div>
                    <h5 className="font-bold text-sm text-[#F5F5F5] mb-1">Do NOT expose to direct sunlight</h5>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Keep your healing tattoo out of direct sunlight. Sunburn will ruin a healing tattoo.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="text-red-500 shrink-0 font-mono text-sm font-bold mt-1">✗</div>
                  <div>
                    <h5 className="font-bold text-sm text-[#F5F5F5] mb-1">Do NOT wear tight clothing</h5>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Avoid tight clothing that rubs against the healing area, which can cause irritation and scabbing.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* SECTION 7.4: LONG-TERM CARE & PRESERVATION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#141414] border border-[#262626] p-8 sm:p-12 lg:p-16 overflow-hidden"
        >
          {/* Decorative graphic background lines */}
          <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-10">
            <svg width="100%" height="100%" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 L100,100 M20,0 L100,80 M0,20 L80,100" stroke="#D97706" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D97706] mb-4">
              <Sun className="w-4 h-4" />
              UV Protection & Preservation
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight font-serif lowercase mb-6 text-[#F5F5F5]">
              keeping your ink sharp.
            </h3>
            
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-10">
              Illustrative blackwork is built to last, but UV radiation is the number one enemy of tattoo longevity. Sun exposure breaks down the pigment particles in your skin over time, causing lines to blur and black ink to fade into a dull gray.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-[#F5F5F5] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#D97706]" />
                  Use SPF 30+
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Once your tattoo is completely healed (usually after 3 weeks), apply a high-quality SPF 30 or higher sunscreen whenever you are exposed to the sun.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-[#F5F5F5] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#D97706]" />
                  Moisturize regularly
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Keeping your skin hydrated keeps the layers of skin above the ink clear and healthy, making your tattoo look crisper and darker.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-sm text-[#F5F5F5] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#D97706]" />
                  6-Month Touch-ups
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  If you notice any lines that settled lighter than expected during the healing process, reach out within 6 months for your free touch-up session.
                </p>
              </div>
            </div>

            {/* In-page Anchor Link for Touch-ups / Booking */}
            <div className="mt-12 pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <p className="text-xs text-gray-400 max-w-md">
                Need to book a touch-up or check your healing progress with Jake? Get in touch via the booking system.
              </p>
              <a 
                href="#booking-request-form"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D97706] hover:text-white transition-colors duration-200"
              >
                Inquire about a Touch-up →
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}