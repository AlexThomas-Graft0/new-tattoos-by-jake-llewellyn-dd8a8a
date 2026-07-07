'use client';

import * as React from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface PortfolioItem {
  id: string;
  title: string;
  categories: string[];
  placementGroup: 'Arm / Sleeve' | 'Leg / Calf' | 'Torso / Back';
  description: string;
  altText: string;
  imageUrl: string;
  sessionTime: string;
  healingMethod: 'Saniderm' | 'Traditional';
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 'peony-shoulder',
    title: 'Botanical Peony Shoulder Wrap',
    categories: ['Nature & Botanical', 'Illustrative'],
    placementGroup: 'Arm / Sleeve',
    description: 'An organic flow of peonies wrapped to accent the natural curve of the shoulder. Done with mixed line weights and soft whip-shading.',
    altText: 'Illustrative peony tattoo wrapped around a female shoulder and collarbone with fine-line details.',
    imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80',
    sessionTime: '4.5',
    healingMethod: 'Saniderm'
  },
  {
    id: 'archangel-back',
    title: 'The Archangel Backpiece',
    categories: ['Blackwork', 'Illustrative'],
    placementGroup: 'Torso / Back',
    description: 'A large-scale, high-contrast illustrative backpiece depicting a classic archangel sculpture with dramatic stone textures.',
    altText: 'Large-scale blackwork archangel back tattoo featuring heavy black shading and dramatic textures.',
    imageUrl: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=1000&q=80',
    sessionTime: '18',
    healingMethod: 'Saniderm'
  },
  {
    id: 'cyberpunk-hannya',
    title: 'Cyberpunk Hannya Mask',
    categories: ['Pop Culture & Myth', 'Blackwork'],
    placementGroup: 'Arm / Sleeve',
    description: 'A modern, geometric-infused take on the traditional Japanese Hannya mask, utilizing solid black fills and clean negative space.',
    altText: 'Cyberpunk-style Hannya mask tattoo on the outer forearm with geometric accents.',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
    sessionTime: '6',
    healingMethod: 'Traditional'
  },
  {
    id: 'delicate-fern',
    title: 'Delicate Fern Cluster',
    categories: ['Fine-line', 'Nature & Botanical'],
    placementGroup: 'Arm / Sleeve',
    description: 'A minimalist, highly detailed fern branch designed with single-needle precision to mimic real botanical specimens.',
    altText: 'Single-needle fine-line botanical fern tattoo on the inner wrist.',
    imageUrl: 'https://images.unsplash.com/photo-1542382257-201b72a21436?auto=format&fit=crop&w=1000&q=80',
    sessionTime: '2',
    healingMethod: 'Saniderm'
  },
  {
    id: 'ouroboros-snake',
    title: 'Mythological Ouroboros Snake',
    categories: ['Pop Culture & Myth', 'Illustrative'],
    placementGroup: 'Leg / Calf',
    description: 'A detailed snake consuming its own tail, featuring intricate scale-by-scale stippling and sharp contour lines.',
    altText: 'Illustrative snake ouroboros tattoo wrapping around the calf with detailed stipple shading.',
    imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=1000&q=80',
    sessionTime: '5',
    healingMethod: 'Traditional'
  },
  {
    id: 'geometric-mountain',
    title: 'Geometric Mountain Range',
    categories: ['Fine-line', 'Blackwork'],
    placementGroup: 'Torso / Back',
    description: 'Clean geometric framework surrounding a stippled mountain range, placed perfectly along the rib cage.',
    altText: 'Geometric mountain range tattoo with fine-line framing on the side ribs.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    sessionTime: '3.5',
    healingMethod: 'Saniderm'
  }
];

const categoryFilters = [
  'All Work',
  'Illustrative',
  'Blackwork',
  'Fine-line',
  'Nature & Botanical',
  'Pop Culture & Myth'
];

const placementFilters = [
  'All Placements',
  'Arm / Sleeve',
  'Leg / Calf',
  'Torso / Back'
];

export function PortfolioGrid() {
  const [selectedCategory, setSelectedCategory] = React.useState('All Work');
  const [selectedPlacement, setSelectedPlacement] = React.useState('All Placements');
  const [activeLightboxIndex, setActiveLightboxIndex] = React.useState<number | null>(null);

  const filteredItems = portfolioItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All Work' ||
      item.categories.includes(selectedCategory);
    
    const matchesPlacement =
      selectedPlacement === 'All Placements' ||
      item.placementGroup === selectedPlacement;

    return matchesCategory && matchesPlacement;
  });

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => 
      prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
    );
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => 
      prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
    );
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredItems]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 18 }
    }
  };

  return (
    <section 
      id="portfolio-grid" 
      className="bg-[#0D0D0D] text-[#F5F5F5] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section 2.1: Portfolio Header & Intro */}
        <div className="border-b border-[#262626] pb-12 mb-12">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight lowercase font-serif text-[#F5F5F5] mb-6">
              custom work archive.
            </h2>
            <p className="text-[#A3A3A3] text-lg leading-relaxed font-sans">
              Every tattoo shown below is a custom piece designed specifically for the client&apos;s unique anatomy. 
              This gallery showcases the aging quality, line weight consistency, and anatomical flow of my illustrative blackwork. 
              Use the filters to explore themes and placements.
            </p>
          </div>
        </div>

        {/* Section 2.2: Interactive Filter Bar */}
        <div className="space-y-6 mb-12">
          {/* Category Filters */}
          <div>
            <span className="block text-xs uppercase tracking-widest text-[#A3A3A3] font-mono mb-3">Style / Category</span>
            <div className="flex flex-wrap gap-2">
              {categoryFilters.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setActiveLightboxIndex(null);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-[#D97706] focus:ring-offset-2 focus:ring-offset-[#0D0D0D] ${
                      isActive 
                        ? 'bg-[#D97706] text-[#0D0D0D]' 
                        : 'bg-[#262626] text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#333333]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Placement Filters */}
          <div>
            <span className="block text-xs uppercase tracking-widest text-[#A3A3A3] font-mono mb-3">Body Placement</span>
            <div className="flex flex-wrap gap-2">
              {placementFilters.map((placement) => {
                const isActive = selectedPlacement === placement;
                return (
                  <button
                    key={placement}
                    onClick={() => {
                      setSelectedPlacement(placement);
                      setActiveLightboxIndex(null);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-[#D97706] focus:ring-offset-2 focus:ring-offset-[#0D0D0D] ${
                      isActive 
                        ? 'bg-[#D97706] text-[#0D0D0D]' 
                        : 'bg-[#262626] text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#333333]'
                    }`}
                  >
                    {placement}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 2.3: Portfolio Gallery Grid */}
        <motion.div 
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setActiveLightboxIndex(index)}
                className="group relative bg-[#171717] rounded-lg overflow-hidden border border-[#262626] cursor-pointer hover:border-[#D97706]/50 transition-colors duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.altText}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Dark gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
                </div>

                {/* Static card metadata footer */}
                <div className="p-5 border-t border-[#262626] flex flex-col justify-between h-28">
                  <div>
                    <h3 className="text-lg font-semibold text-[#F5F5F5] group-hover:text-[#D97706] transition-colors duration-200 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#A3A3A3] font-mono mt-1">
                      {item.categories.join(' / ')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#262626]/50 text-xs text-[#737373]">
                    <span>{item.placementGroup}</span>
                    <span className="text-[#D97706] font-medium">View Details →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 border border-dashed border-[#262626] rounded-lg">
            <p className="text-[#A3A3A3] font-sans">No pieces match the selected combination of filters.</p>
            <button 
              onClick={() => { setSelectedCategory('All Work'); setSelectedPlacement('All Placements'); }}
              className="mt-4 text-[#D97706] text-sm hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Section 2.4: Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <div 
              className="relative w-full max-w-6xl bg-[#0D0D0D] border border-[#262626] rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 max-h-[90vh] md:max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 text-[#F5F5F5] hover:text-[#D97706] transition-colors hover:bg-black/80 border border-[#262626]"
                aria-label="Close Lightbox"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation Left */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 text-[#F5F5F5] hover:text-[#D97706] transition-colors hover:bg-black/80 border border-[#262626]"
                aria-label="Previous artwork"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Navigation Right */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 text-[#F5F5F5] hover:text-[#D97706] transition-colors hover:bg-black/80 border border-[#262626]"
                aria-label="Next artwork"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image Column */}
              <div className="lg:col-span-7 bg-black flex items-center justify-center relative overflow-hidden h-[40vh] sm:h-[50vh] lg:h-full min-h-[300px]">
                <img
                  src={filteredItems[activeLightboxIndex].imageUrl}
                  alt={filteredItems[activeLightboxIndex].altText}
                  className="w-full h-full object-contain max-h-[85vh]"
                />
              </div>

              {/* Details Column */}
              <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-[#0D0D0D] border-t lg:border-t-0 lg:border-l border-[#262626]">
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#D97706] font-mono">Portfolio Archive</span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight lowercase font-serif text-[#F5F5F5] mt-1">
                      {filteredItems[activeLightboxIndex].title}
                    </h3>
                  </div>

                  <p className="text-[#A3A3A3] text-sm md:text-base leading-relaxed font-sans">
                    {filteredItems[activeLightboxIndex].description}
                  </p>

                  <div className="border-t border-b border-[#262626] py-4 space-y-3 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#737373]">Style / Technique:</span>
                      <span className="text-[#F5F5F5] text-right">{filteredItems[activeLightboxIndex].categories.join(' & ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#737373]">Placement Area:</span>
                      <span className="text-[#F5F5F5] text-right">{filteredItems[activeLightboxIndex].placementGroup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#737373]">Session Duration:</span>
                      <span className="text-[#F5F5F5] text-right">~{filteredItems[activeLightboxIndex].sessionTime} Hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#737373]">Healing Protocol:</span>
                      <span className="text-[#F5F5F5] text-right">{filteredItems[activeLightboxIndex].healingMethod} Method</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 lg:mt-0">
                  <a
                    href="#booking-request-form"
                    onClick={() => setActiveLightboxIndex(null)}
                    className="block w-full text-center bg-[#D97706] text-[#0D0D0D] py-3 px-6 rounded font-semibold text-sm hover:bg-[#F5F5F5] transition-colors duration-200 outline-none focus:ring-2 focus:ring-[#D97706] focus:ring-offset-2 focus:ring-offset-[#0D0D0D]"
                  >
                    Inquire About a Similar Design
                  </a>
                  <p className="text-[10px] text-center text-[#737373] mt-2 font-mono uppercase tracking-wider">
                    Custom adaptations unique to your anatomy
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}