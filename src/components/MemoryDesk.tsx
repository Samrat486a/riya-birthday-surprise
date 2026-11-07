import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { SectionHeading } from './SectionHeading';
import { sound } from '../utils/sound';

const ROTATIONS = [-2.5, 1.8, -1.2, 2.2, -1.8, 2.5, -2, 1.5];

export const MemoryDesk: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Exactly 6 cards - ending with Golden-Hour Yellow Tee Selfie as requested
  const photos = siteConfig.photos.desk;

  const handleScroll = (direction: 'left' | 'right') => {
    sound.playKeyTap();
    if (!scrollRef.current) return;
    const scrollAmount = 340;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="section-shell overflow-hidden bg-[#eadfce] text-[#2a1720]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="[&_h2]:!text-[#2a1720] [&_p]:!text-[#6a555c]">
            <SectionHeading
              eyebrow="Memory desk"
              title="A few moments you can move through."
              copy="Scroll horizontally to explore each candid snapshot, or swipe across on your phone."
            />
          </div>

          {/* Desktop Arrow Controls */}
          <div className="hidden sm:flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => handleScroll('left')}
              className="grid h-11 w-11 place-items-center rounded-full border border-[#2a1720]/20 bg-white/50 backdrop-blur-md text-[#2a1720] shadow-sm transition hover:bg-white/80 hover:scale-105 active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="grid h-11 w-11 place-items-center rounded-full border border-[#2a1720]/20 bg-white/50 backdrop-blur-md text-[#2a1720] shadow-sm transition hover:bg-white/80 hover:scale-105 active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={scrollRef}
          className="mt-12 flex gap-6 overflow-x-auto pb-6 pt-4 px-2 sm:px-4 snap-x snap-mandatory scrollbar-none cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {photos.map((photo, idx) => {
            const rot = ROTATIONS[idx % ROTATIONS.length];

            return (
              <motion.div
                key={photo + idx}
                className="shrink-0 snap-center w-[75vw] max-w-[280px] sm:w-[270px] md:w-[280px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (idx % 4) * 0.08 }}
              >
                <div
                  className="rounded-2xl bg-[#fffaf1] p-3 pb-8 shadow-[0_16px_40px_rgba(61,35,40,0.16)] transition-all duration-300 hover:scale-[1.03] hover:rotate-0 hover:shadow-[0_24px_55px_rgba(61,35,40,0.26)]"
                  style={{ transform: `rotate(${rot}deg)` }}
                >
                  <div className="overflow-hidden rounded-xl bg-black/5 aspect-[4/5]">
                    <img
                      src={photo}
                      alt={`Memory ${idx + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      style={{ objectPosition: siteConfig.imagePositions[photo] || '50% 25%' }}
                    />
                  </div>
                  <p className="mt-4 text-center font-display text-sm italic text-[#69535a] tracking-wide">
                    memory {String(idx + 1).padStart(2, '0')}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive "Swipe right" line & button that actually navigates */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => handleScroll('right')}
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#2a1720]/25 bg-white/60 backdrop-blur-md px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.28em] text-[#2a1720] shadow-[0_6px_20px_rgba(61,35,40,0.08)] transition-all duration-300 hover:bg-white/90 hover:scale-105 active:scale-95"
            aria-label="Swipe right to see more moments"
          >
            <span>Swipe right</span>
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
