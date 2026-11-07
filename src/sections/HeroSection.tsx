import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { FloatingParticles } from '../components/FloatingParticles';

export const HeroSection: React.FC = () => {
  return (
    <section id="story" className="relative min-h-[100svh] overflow-hidden bg-[#100a0e]">
      <motion.img
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.2, 0.8, 0.2, 1] }}
        viewport={{ once: true }}
        src={siteConfig.photos.hero}
        alt={`Birthday portrait of ${siteConfig.girlfriendName}`}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: siteConfig.imagePositions[siteConfig.photos.hero] || '50% 25%' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#100a0e] via-black/10 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#100a0e]/50 via-transparent to-transparent" />
      <FloatingParticles count={13} />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-12 sm:px-8 md:pb-16 lg:px-12">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-[10px] uppercase tracking-[.45em] text-[#f0c99f]"
          >
            A birthday story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-display text-5xl leading-[.95] text-white sm:text-7xl lg:text-8xl"
          >
            Happy Birthday,
            <br />
            <span className="text-[#f0c99f]">{siteConfig.girlfriendName}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="mt-6 max-w-lg text-sm leading-7 text-white/70 sm:text-base"
          >
            {siteConfig.heroMessage}
          </motion.p>
        </div>

        <div className="mt-12 flex items-center gap-3 text-[10px] uppercase tracking-[.35em] text-white/35">
          <ChevronDown size={15} /> Scroll to continue
        </div>
      </div>
    </section>
  );
};
