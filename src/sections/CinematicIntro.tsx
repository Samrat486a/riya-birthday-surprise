import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { FloatingParticles } from '../components/FloatingParticles';
import { sound } from '../utils/sound';

interface CinematicIntroProps {
  onBegin: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onBegin }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  // Slides sequence:
  // 0: "Today isn't just another day…"
  // 1: "Because someone genuinely special was born."
  // 2: "Happy Birthday Riya" + "Begin the Story" button
  const introTexts = [
    ...siteConfig.introLines,
    `Happy Birthday ${siteConfig.girlfriendName}`
  ];

  const isFinalSlide = slideIndex === introTexts.length - 1;

  useEffect(() => {
    if (isFinalSlide) return;
    // 4200ms delay gives comfortable, relaxed time to read out each quote
    const timer = setTimeout(() => {
      setSlideIndex((prev) => prev + 1);
    }, 4200);
    return () => clearTimeout(timer);
  }, [slideIndex, isFinalSlide]);

  const handleNextSlide = () => {
    if (!isFinalSlide) {
      sound.playKeyTap();
      setSlideIndex((prev) => prev + 1);
    }
  };

  const handleStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playKeyTap();
    onBegin();
  };

  return (
    <section
      onClick={handleNextSlide}
      className="relative min-h-[100svh] overflow-hidden bg-[#100a0e] cursor-pointer select-none"
    >
      <img
        src={siteConfig.photos.intro}
        alt="Cinematic birthday portrait"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: siteConfig.imagePositions[siteConfig.photos.intro] || '50% 25%' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#100a0e] via-[#100a0e]/25 to-black/20" />
      <FloatingParticles count={22} />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          {!isFinalSlide ? (
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="max-w-2xl font-display text-3xl sm:text-5xl text-white leading-relaxed drop-shadow-md"
            >
              {introTexts[slideIndex]}

              <p className="mt-8 text-[11px] uppercase tracking-[0.35em] text-[#d6a475]/60">
                Tap anywhere to advance · {slideIndex + 1} / {introTexts.length - 1}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="final-celebration"
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex flex-col items-center"
            >
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-white leading-[1.05]">
                Happy Birthday
                <br />
                <span className="text-[#f0c99f] drop-shadow-md">
                  {siteConfig.girlfriendName}
                </span>
              </h1>

              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                onClick={handleStart}
                className="premium-button mt-10"
              >
                Begin the Story <ArrowDown size={16} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
