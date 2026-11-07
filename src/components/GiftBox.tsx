import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { sound } from '../utils/sound';

export const GiftBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    sound.playKeyTap();
    setIsOpen(true);
  };

  const handleClose = () => {
    sound.playKeyTap();
    setIsOpen(false);
  };

  return (
    <div className="relative mx-auto grid min-h-[420px] max-w-xl place-items-center overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-br from-[#211219]/90 to-[#100a0e]/95 backdrop-blur-xl p-6 shadow-2xl">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="reveal"
            className="grid items-center gap-6 sm:grid-cols-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <img
                src={siteConfig.photos.gift}
                alt="Gift memory"
                className="h-full w-full object-cover"
                style={{ objectPosition: siteConfig.imagePositions[siteConfig.photos.gift] || '50% 25%' }}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>

            <div>
              <p className="font-display text-3xl leading-tight text-white">
                {siteConfig.giftMessage}
              </p>
              <button
                className="glass-pill mt-6"
                onClick={handleClose}
              >
                Close gift
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="gift"
            onClick={handleOpen}
            className="group text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileTap={{ scale: 0.96 }}
            viewport={{ once: true }}
            aria-label="Open surprise gift"
          >
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, -2, 2, 0] }}
              transition={{ repeat: Infinity, duration: 3.4, ease: 'easeInOut' }}
              className="mx-auto grid h-36 w-36 place-items-center rounded-[32px] border border-[#d6a475]/40 bg-gradient-to-br from-[#6a263a]/50 to-[#2a121d]/70 backdrop-blur-md shadow-glow hover:border-[#d6a475]/80 transition-all duration-300"
            >
              <Gift size={58} strokeWidth={1.2} className="text-[#f3cfab]" />
            </motion.div>
            <p className="mt-6 font-display text-3xl text-white">One more thing…</p>
            <p className="mt-2 text-sm text-white/40">Tap the gift</p>
          </motion.button>
        )}
      </AnimatePresence>

      {isOpen && (
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <i key={i} style={{ ['--i' as string]: i } as React.CSSProperties} />
          ))}
        </div>
      )}
    </div>
  );
};
