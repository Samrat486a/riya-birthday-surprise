import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockKeyhole, Delete, Check, Sparkles } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { sound } from '../utils/sound';
import { FloatingParticles } from '../components/FloatingParticles';

interface LockScreenProps {
  onUnlock: () => void;
}

const KEYPAD_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'delete'];

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [isError, setIsError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleKeyPress = (key: string) => {
    if (isUnlocked) return;
    sound.playKeyTap();

    if (key === 'clear') {
      setPin('');
      return;
    }
    if (key === 'delete') {
      setPin((prev) => prev.slice(0, -1));
      return;
    }
    if (pin.length >= 4) return;

    const newPin = pin + key;
    setPin(newPin);

    if (newPin.length === 4) {
      setTimeout(() => {
        if (newPin === siteConfig.pin) {
          setIsUnlocked(true);
          sound.playUnlockSuccess();
          if (navigator.vibrate) {
            navigator.vibrate([20, 40, 20]);
          }
          setTimeout(onUnlock, 850);
        } else {
          setIsError(true);
          sound.playWrongPin();
          if (navigator.vibrate) {
            navigator.vibrate(50);
          }
          setTimeout(() => {
            setIsError(false);
            setPin('');
          }, 480);
        }
      }, 130);
    }
  };

  return (
    <motion.section
      className="fixed inset-0 z-[90] overflow-y-auto overflow-x-hidden bg-[#100a0e]"
      exit={{ opacity: 0, scale: 1.02 }}
    >
      <div className="grid min-h-[100svh] md:grid-cols-[1.15fr_.85fr]">
        {/* Left / Top photo panel - generous portrait framing on phone, full height on desktop */}
        <div className="relative h-[43svh] sm:h-[46svh] md:min-h-[100svh] w-full overflow-hidden">
          <img
            src={siteConfig.photos.lockScreen}
            alt="Birthday portrait"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out"
            style={{ objectPosition: siteConfig.imagePositions[siteConfig.photos.lockScreen] || '52% 34%' }}
            fetchPriority="high"
          />
          {/* Subtle cinematic gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#100a0e] via-[#100a0e]/25 to-black/35 md:bg-gradient-to-r md:from-transparent md:via-[#100a0e]/25 md:to-[#100a0e]" />

          {/* Delicate gold accent divider line on mobile */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d6a475]/40 to-transparent md:hidden" />

          {/* Floating title badge */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 md:bottom-14 md:left-12 max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <span className="mb-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-[#d6a475]/40 text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[#f3cfab] shadow-sm">
                <Sparkles size={11} className="text-[#d6a475]" /> Special Edition
              </span>
              <h1 className="font-display text-xl sm:text-2xl md:text-5xl leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
                A little surprise is waiting for you.
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Right / Bottom PIN panel with ambient particles & glowing frosted glass card */}
        <div className="relative flex flex-col items-center justify-center px-4 py-3 sm:py-6 md:p-10 my-auto z-10 w-full overflow-hidden">
          {/* Floating gold dust particles */}
          <FloatingParticles count={14} className="opacity-50" />

          {/* Warm ambient golden glow behind the keypad card */}
          <div className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full bg-[#d6a475]/12 blur-[80px] pointer-events-none" />

          {/* Unlocked overlay */}
          <AnimatePresence>
            {isUnlocked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-30 grid place-items-center bg-[#100a0e]/95 backdrop-blur-2xl"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.5, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full border border-[#d6a475] bg-[#d6a475]/20 text-[#d6a475] shadow-[0_0_30px_rgba(214,164,117,0.5)]"
                  >
                    <Check size={28} />
                  </motion.div>
                  <p className="font-display text-2xl sm:text-3xl text-white">Unlocked</p>
                  <p className="mt-1 text-xs text-[#d6a475] uppercase tracking-widest">Welcome, Riya</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Frosted Glass Vault Card */}
          <motion.div
            animate={isError ? { x: [0, -12, 12, -8, 8, 0] } : { x: 0 }}
            className="relative w-full max-w-[280px] sm:max-w-[310px] md:max-w-sm rounded-[28px] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] backdrop-blur-2xl border border-white/[0.14] p-4 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.65),inset_0_1px_1.5px_rgba(255,255,255,0.2)]"
          >
            {/* Header with Glowing Gold Lock */}
            <div className="mb-2 sm:mb-4 text-center">
              <div className="mx-auto mb-1.5 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-[#d6a475]/40 bg-[#d6a475]/15 text-[#d6a475] shadow-[0_0_18px_rgba(214,164,117,0.3)]">
                <LockKeyhole size={17} />
              </div>
              <p className="font-display text-base sm:text-xl text-[#f7efe8] tracking-wide">Enter Secret Code</p>
              <p className="mt-0.5 text-[10px] sm:text-xs text-white/45 tracking-wide">Four digits. You know the one.</p>
            </div>

            {/* Glowing Jewel PIN Dots */}
            <div
              className="my-2.5 sm:my-4 flex justify-center gap-2.5 sm:gap-3"
              aria-label={`${pin.length} of 4 digits entered`}
            >
              {Array.from({ length: 4 }).map((_, idx) => {
                const isFilled = idx < pin.length;
                return (
                  <span
                    key={idx}
                    className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border transition-all duration-200 ${
                      isFilled
                        ? 'scale-125 border-[#d6a475] bg-gradient-to-br from-[#f3cfab] to-[#d6a475] shadow-[0_0_12px_rgba(214,164,117,0.9)]'
                        : 'border-white/25 bg-white/5'
                    }`}
                  />
                );
              })}
            </div>

            {/* Circular Frosted Glass Keypad Grid */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 place-items-center max-w-[210px] sm:max-w-[240px] mx-auto">
              {KEYPAD_KEYS.map((key) => {
                if (key === 'clear') {
                  return (
                    <button
                      key={key}
                      onClick={() => handleKeyPress(key)}
                      className="keypad-circle w-11 h-11 sm:w-13 sm:h-13 text-[10px] sm:text-xs uppercase tracking-wider text-white/50 hover:text-white"
                    >
                      Clear
                    </button>
                  );
                }
                if (key === 'delete') {
                  return (
                    <button
                      key={key}
                      aria-label="Delete digit"
                      onClick={() => handleKeyPress(key)}
                      className="keypad-circle w-11 h-11 sm:w-13 sm:h-13 text-white/70 hover:text-white"
                    >
                      <Delete size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                  );
                }
                return (
                  <button
                    key={key}
                    onClick={() => handleKeyPress(key)}
                    className="keypad-circle w-11 h-11 sm:w-13 sm:h-13 font-display text-lg sm:text-xl md:text-2xl font-light text-[#f7efe8]"
                  >
                    {key}
                  </button>
                );
              })}
            </div>

            {isError && (
              <p className="mt-2.5 text-center text-[10px] sm:text-xs uppercase tracking-[.2em] text-[#e798a7]">
                Not quite — try again
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
