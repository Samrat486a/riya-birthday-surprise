import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { SectionHeading } from './SectionHeading';
import { sound } from '../utils/sound';

export const BirthdayLetter: React.FC = () => {
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
    <section className="section-shell bg-[#160c12]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="A note for you"
          title="Some things are better written slowly."
          copy="Open the envelope when you are ready."
        />

        <div className="mt-12">
          <div className="mx-auto max-w-5xl">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.article
                  key="letter"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6 }}
                  className="grid overflow-hidden rounded-[32px] border border-white/15 bg-[#f4eadf] text-[#2a1720] shadow-2xl lg:grid-cols-[.9fr_1.1fr]"
                >
                  <div className="relative min-h-[420px]">
                    <img
                      src={siteConfig.photos.letter}
                      alt="Portrait beside birthday letter"
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ objectPosition: siteConfig.imagePositions[siteConfig.photos.letter] || '50% 25%' }}
                    />
                  </div>

                  <div className="max-h-[72svh] overflow-y-auto p-7 sm:p-10 lg:max-h-none lg:p-12">
                    <p className="mb-7 text-[10px] uppercase tracking-[.4em] text-[#8b5760]">
                      For {siteConfig.girlfriendName}
                    </p>
                    {siteConfig.letter.map((line, idx) => (
                      <p
                        key={idx}
                        className={`mb-5 leading-8 ${
                          idx === 0
                            ? 'font-display text-4xl'
                            : 'text-[15px] text-[#4e3940]'
                        }`}
                      >
                        {line}
                      </p>
                    ))}
                    <p className="mt-9 font-display text-2xl text-[#2a1720]">
                      — {siteConfig.senderName}
                    </p>
                    <button
                      className="glass-pill mt-9 text-xs !border-[#8b5760]/30 !bg-[#8b5760]/10 !text-[#8b5760] hover:!bg-[#8b5760]/20 hover:!border-[#8b5760]/60"
                      onClick={handleClose}
                    >
                      Fold letter
                    </button>
                  </div>
                </motion.article>
              ) : (
                <motion.button
                  key="envelope"
                  onClick={handleOpen}
                  className="mx-auto block w-full max-w-xl rounded-[30px] border border-[#d6a475]/30 bg-white/[0.03] backdrop-blur-xl p-8 text-center shadow-2xl transition duration-300 hover:border-[#d6a475]/60 hover:bg-white/[0.06]"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="relative mx-auto mb-6 h-44 w-64 max-w-full overflow-hidden rounded-xl bg-[#d3aa83] shadow-xl">
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,transparent_49%,rgba(91,42,49,.18)_50%)]" />
                    <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#6e293a] text-[#f6e8d9] shadow-md">
                      <MailOpen size={20} />
                    </div>
                  </div>
                  <p className="font-display text-3xl text-white">
                    I wrote something for you.
                  </p>
                  <p className="mt-2 text-sm text-white/40">
                    Tap the envelope to open it.
                  </p>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
