import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';

interface LoadingScreenProps {
  onDone: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Extract unique image URLs to preload
    const photosList = [
      siteConfig.photos.lockScreen,
      siteConfig.photos.intro,
      siteConfig.photos.hero,
      siteConfig.photos.letter,
      siteConfig.photos.gift,
      siteConfig.photos.scratch,
      siteConfig.photos.music,
      siteConfig.photos.finale,
      ...siteConfig.photos.timeline,
      ...siteConfig.photos.gallery,
      ...siteConfig.photos.desk
    ];
    const uniquePhotos = [...new Set(photosList.filter((p): p is string => typeof p === 'string' && p.length > 0))];

    let loadedCount = 0;
    let isCancelled = false;

    const onImageFinish = () => {
      loadedCount += 1;
      const pct = Math.round((loadedCount / Math.max(1, uniquePhotos.length)) * 100);
      if (!isCancelled) {
        setProgress(pct);
      }
      if (loadedCount >= uniquePhotos.length) {
        setTimeout(() => {
          if (!isCancelled) {
            setIsVisible(false);
            setTimeout(onDone, 520);
          }
        }, 220);
      }
    };

    if (uniquePhotos.length === 0) {
      setProgress(100);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDone, 520);
      }, 300);
    } else {
      uniquePhotos.forEach((src) => {
        const img = new Image();
        img.onload = onImageFinish;
        img.onerror = onImageFinish;
        img.src = src;
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#100a0e]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-[min(82vw,420px)] text-center">
            <p className="mb-5 text-[10px] uppercase tracking-[.45em] text-[#d6a475]/70">
              Preparing something special
            </p>
            <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#d6a475] to-[#f7efe8]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>
            <p className="mt-4 font-mono text-xs tracking-widest text-white/40">
              {progress}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
