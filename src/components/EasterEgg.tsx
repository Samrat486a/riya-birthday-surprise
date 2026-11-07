import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';
import { sound } from '../utils/sound';

export const EasterEgg: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    sound.playKeyTap();
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 5) {
      setIsOpen(true);
      setClickCount(0);
    }
  };

  const handleClose = () => {
    sound.playKeyTap();
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-4 right-4 z-40 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md text-[#d6a475] shadow-lg transition duration-300 hover:bg-white/[0.18] hover:border-[#d6a475]/60 hover:scale-105 active:scale-95"
        aria-label="Tiny star"
      >
        <Star size={15} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[130] grid place-items-center bg-black/80 backdrop-blur-sm p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md overflow-hidden rounded-[28px] border border-[#d6a475]/35 bg-[#1d1016]/90 backdrop-blur-2xl p-6 shadow-2xl"
            >
              <button
                onClick={handleClose}
                className="icon-button absolute right-4 top-4"
                aria-label="Close note"
              >
                <X size={18} />
              </button>

              <div className="p-3 text-center sm:p-5">
                <Star className="mx-auto mb-4 text-[#d6a475]" size={32} />
                <h3 className="font-display text-3xl text-white">
                  You found the secret message ✨
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/55">
                  Some of the nicest things are the ones you discover by accident. Keep this one.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
