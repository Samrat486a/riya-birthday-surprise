import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Images } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { FloatingParticles } from '../components/FloatingParticles';
import { sound } from '../utils/sound';

export const FinalSurpriseSection: React.FC = () => {
  const handleReplay = () => {
    sound.playKeyTap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => window.location.reload(), 650);
  };

  const handleViewMemories = () => {
    sound.playKeyTap();
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#090609]">
      <img
        src={siteConfig.photos.finale}
        alt="Final birthday portrait"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: siteConfig.imagePositions[siteConfig.photos.finale] || '50% 25%' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090609] via-[#090609]/35 to-black/25" />
      <FloatingParticles count={30} />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-end px-5 pb-12 text-center sm:px-8 md:pb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-[.45em] text-[#f0c99f]"
        >
          One last surprise
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 font-display text-5xl leading-[.98] text-white sm:text-7xl"
        >
          Happy Birthday,
          <br />
          <span className="text-[#f0c99f]">{siteConfig.girlfriendName}.</span>
        </motion.h2>

        <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
          {siteConfig.finalMessage}
        </p>

        <p className="mt-4 text-sm text-white/45">
          Thank you for being part of these memories.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={handleReplay} className="premium-button">
            <RotateCcw size={16} /> Replay Our Story
          </button>
          <button onClick={handleViewMemories} className="ghost-button">
            <Images size={16} /> View Memories Again
          </button>
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs text-white/40">
            Made with <span className="text-[#d6a475]">♥</span> by Your Friend
          </p>
          <p className="mt-1.5 font-display text-sm tracking-wider text-[#d6a475]">
            Samrat
          </p>
        </div>
      </div>
    </section>
  );
};
