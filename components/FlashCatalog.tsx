'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Check, 
  Lock, 
  Filter, 
  Maximize2, 
  MapPin, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  Info,
  X
} from 'lucide-react';

interface FlashItem {
  id: string;
  status: 'Available' | 'Claimed';
  title: string;
  visualDescription: string;
  sizeEstimate: string;
  priceEstimate: string;
  placementRecommendation: string;
  altText: string;
  imageUrl: string;
}

const flashItems: FlashItem[] = [
  {
    id: 'FLASH-01-RAVEN',
    status: 'Available',
    title: 'The Moon Phase Raven',
    visualDescription: 'A stylized raven perched on a crescent moon with hanging geometric charms.',
    sizeEstimate: 'Approx. 6 x 4 inches',
    priceEstimate: '$350 - $450',
    placementRecommendation: 'Forearm, calf, or upper shoulder.',
    altText: 'Original flash design of a raven perched on a crescent moon with geometric details.',
    imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'FLASH-02-DAGGER',
    status: 'Claimed',
    title: 'Traditional Dagger & Rose',
    visualDescription: 'A bold illustrative dagger piercing through a heavy-petaled rose with delicate line shading.',
    sizeEstimate: 'Approx. 7 x 3 inches',
    priceEstimate: '$400 - $500',
    placementRecommendation: 'Outer forearm, calf, or thigh.',
    altText: 'Traditional dagger and rose flash design, marked as claimed.',
    imageUrl: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'FLASH-03-HEART',
    status: 'Available',
    title: 'Anatomical Heart & Wildflowers',
    visualDescription: 'A realistic anatomical heart with blooming wildflowers growing out of the aorta.',
    sizeEstimate: 'Approx. 5 x 5 inches',
    priceEstimate: '$450 - $550',
    placementRecommendation: 'Upper arm, thigh, or upper back.',
    altText: 'Anatomical heart with wildflowers growing from it, available tattoo flash design.',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'FLASH-04-MOTH',
    status: 'Available',
    title: 'Sacred Geometry Moth',
    visualDescription: 'A detailed death\'s head hawkmoth centered inside clean geometric concentric circles.',
    sizeEstimate: 'Approx. 5 x 6 inches',
    priceEstimate: '$500 - $600',
    placementRecommendation: 'Sternum, upper back, or thigh.',
    altText: 'Death\'s head hawkmoth flash design inside sacred geometry lines.',
    imageUrl: 'https://images.unsplash.com/photo-1576489922094-27859dc22915?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'FLASH-05-CICADA',
    status: 'Claimed',
    title: 'Lunar Cicada',
    visualDescription: 'A fine-line cicada with spread wings, featuring moon phase details along the spine.',
    sizeEstimate: 'Approx. 4 x 4 inches',
    priceEstimate: '$300 - $350',
    placementRecommendation: 'Lower neck, inner forearm, or ankle.',
    altText: 'Lunar cicada tattoo flash design, marked as claimed.',
    imageUrl: 'https://images.unsplash.com/photo-1541689224446-d135c433ab24?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'FLASH-06-SERPENT',
    status: 'Available',
    title: 'Serpent & Ginkgo Leaves',
    visualDescription: 'A slender snake winding through falling ginkgo biloba leaves.',
    sizeEstimate: 'Approx. 8 x 3 inches',
    priceEstimate: '$550 - $700',
    placementRecommendation: 'Tricep wrap, skin, or collarbone curve.',
    altText: 'Snake winding through falling ginkgo leaves, available tattoo flash.',
    imageUrl: 'https://images.unsplash.com/photo-1531386151447-fd762e7a3ae8?auto=format&fit=crop&w=800&q=80'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

export function FlashCatalog() {
  const [filter, setFilter] = useState<'All' | 'Available' | 'Claimed'>('All');
  const [activeItem, setActiveItem] = useState<FlashItem | null>(null);

  const filteredItems = flashItems.filter(item => {
    if (filter === 'All') return true;
    return item.status === filter;
  });

  const handleClaimClick = (item: FlashItem) => {
    // Store selected flash in localStorage so the booking form can pre-fill it
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedFlashId', item.id);
      localStorage.setItem('selectedFlashTitle', item.title);
      // Dispatch custom event to notify booking form if it is already mounted
      window.dispatchEvent(new CustomEvent('flashSelected', { detail: item }));
    }
    
    // Smooth scroll to booking form
    const element = document.getElementById('booking-request-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="flash-catalog" 
      className="relative bg-[#0D0D0D] text-[#F5F5F5] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#262626]"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-6 text-sm font-medium tracking-wide uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Unique Original Work</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F5F5F5] font-serif mb-6 lowercase">
            available flash designs.
          </h2>
          
          <p className="text-base sm:text-lg text-gray-400 font-sans leading-relaxed">
            Flash designs are pre-drawn, original pieces of art that I am excited to tattoo. Unless specified otherwise, <strong className="text-white font-medium">each design is tattooed only once</strong>. Once a design is claimed, it is retired forever.
          </p>
          
          <p className="mt-4 text-sm text-gray-500 max-w-2xl mx-auto italic">
            Browsing flash is the fastest way to get in my chair—these requests bypass the longer custom design phase and are scheduled with priority.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="max-w-4xl mx-auto mb-12 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
          <div>
            <h4 className="text-sm font-semibold text-[#F5F5F5] uppercase tracking-wider mb-1">
              Strict One-Off Policy
            </h4>
            <p className="text-xs sm:text-sm text-gray-400">
              Designs marked as <span className="text-[#D97706] font-semibold">Available</span> can be reserved immediately with a deposit. Those marked as <span className="text-gray-500 font-semibold">Claimed</span> are permanently retired out of respect for the collector.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#262626]/50 p-1 rounded-lg border border-[#262626]">
            {(['All', 'Available', 'Claimed'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium tracking-wider uppercase rounded-md transition-all duration-300 ${
                  filter === type
                    ? 'bg-[#D97706] text-[#0D0D0D] shadow-lg shadow-amber-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-[#262626]'
                }`}
              >
                {type === 'All' ? 'All Designs' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Flash Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isAvailable = item.status === 'Available';
              return (
                <motion.div
                  layout
                  variants={cardVariants}
                  key={item.id}
                  className="group relative bg-[#262626]/40 rounded-xl overflow-hidden border border-[#262626] hover:border-amber-500/40 transition-all duration-500 flex flex-col h-full"
                >
                  {/* Image Container with Hover Effect */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-black">
                    <img
                      src={item.imageUrl}
                      alt={item.altText}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Status Pill */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-lg ${
                        isAvailable 
                          ? 'bg-[#D97706] text-[#0D0D0D] border border-amber-400/20' 
                          : 'bg-[#262626]/80 text-[#F5F5F5] border border-white/10'
                      }`}>
                        {isAvailable ? (
                          <>
                            <span className="w-1.5 h-1.5 bg-[#0D0D0D] rounded-full animate-ping" />
                            Available
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3 text-gray-400" />
                            Claimed / Retired
                          </>
                        )}
                      </span>
                    </div>

                    {/* Quick Expand Button */}
                    <button 
                      onClick={() => setActiveItem(item)}
                      className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black text-[#F5F5F5] border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
                      aria-label="View detailed specifications"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold tracking-tight text-[#F5F5F5] group-hover:text-amber-500 transition-colors duration-300 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2 italic">
                        "{item.visualDescription}"
                      </p>
                    </div>

                    {/* Metadata Specs */}
                    <div className="mt-auto space-y-2.5 border-t border-[#262626] pt-4 mb-6">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 uppercase tracking-wider">Dimensions</span>
                        <span className="text-[#F5F5F5] font-medium">{item.sizeEstimate}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 uppercase tracking-wider">Price Estimate</span>
                        <span className="text-[#F5F5F5] font-medium text-amber-500">{item.priceEstimate}</span>
                      </div>
                      <div className="flex justify-between text-xs items-start">
                        <span className="text-gray-500 uppercase tracking-wider mt-0.5">Best Placements</span>
                        <span className="text-[#F5F5F5] font-medium text-right max-w-[180px] line-clamp-1">
                          {item.placementRecommendation}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    {isAvailable ? (
                      <button
                        onClick={() => handleClaimClick(item)}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#D97706] hover:bg-amber-600 active:bg-amber-700 text-[#0D0D0D] font-semibold text-sm tracking-wider uppercase transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#0D0D0D]"
                      >
                        <span>Claim This Design</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#262626] text-gray-500 font-semibold text-sm tracking-wider uppercase cursor-not-allowed border border-white/5"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Claimed / Retired</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Custom Project Callout Banner */}
        <div className="relative bg-[#262626]/30 border border-[#262626] rounded-2xl p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706] mb-3 block">
              Prefer a bespoke concept?
            </span>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F5F5F5] font-serif mb-4 lowercase">
              looking for a custom piece?
            </h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
              If none of the available flash designs match your vision, I would love to collaborate on a custom illustrative concept. Let's build a design tailored precisely to your ideas and body placement.
            </p>
            <a
              href="#booking-request-form"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#262626] hover:border-amber-500/40 bg-transparent text-[#F5F5F5] hover:text-[#D97706] rounded-lg text-sm font-semibold tracking-wider uppercase transition-all duration-300"
            >
              <span>Submit a Custom Booking Request</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Detail Modal / Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-md"
            onClick={() => setActiveItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0D0D0D] border border-[#262626] rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] md:max-h-[80vh] flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side: Large Image */}
              <div className="relative md:w-1/2 bg-black flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-0">
                <img 
                  src={activeItem.imageUrl} 
                  alt={activeItem.altText} 
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-md ${
                  activeItem.status === 'Available'
                    ? 'bg-[#D97706] text-[#0D0D0D]' 
                    : 'bg-[#262626] text-[#F5F5F5]'
                }`}>
                  {activeItem.status}
                </div>
              </div>

              {/* Right Side: Detailed Info */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-xs font-mono text-gray-500 block mb-1">{activeItem.id}</span>
                      <h3 className="text-2xl md:text-3xl font-bold font-serif text-[#F5F5F5] lowercase">
                        {activeItem.title}
                      </h3>
                    </div>
                    <button 
                      onClick={() => setActiveItem(null)}
                      className="p-1.5 rounded-full hover:bg-[#262626] text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-400 italic mb-8">
                    "{activeItem.visualDescription}"
                  </p>

                  <div className="space-y-4 border-t border-[#262626] pt-6 mb-8">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recommended Placement</h4>
                        <p className="text-sm text-[#F5F5F5]">{activeItem.placementRecommendation}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Dimensions</h4>
                        <p className="text-sm text-[#F5F5F5] font-medium">{activeItem.sizeEstimate}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Estimated Cost</h4>
                        <p className="text-sm text-amber-500 font-bold">{activeItem.priceEstimate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#262626]/40 p-4 rounded-xl border border-[#262626] flex gap-3 items-start mb-8">
                    <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-400 leading-relaxed">
                      A non-refundable deposit of <strong className="text-[#F5F5F5]">$100</strong> is required to lock in this design. This amount goes directly towards the final cost of your tattoo session.
                    </p>
                  </div>
                </div>

                <div>
                  {activeItem.status === 'Available' ? (
                    <button
                      onClick={() => {
                        handleClaimClick(activeItem);
                        setActiveItem(null);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#D97706] hover:bg-amber-600 active:bg-amber-700 text-[#0D0D0D] font-bold text-sm tracking-wider uppercase transition-colors"
                    >
                      <span>Claim This Design</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#262626] text-gray-500 font-semibold text-sm tracking-wider uppercase cursor-not-allowed border border-white/5"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Claimed / Retired</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}