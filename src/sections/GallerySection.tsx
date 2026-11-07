import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { SectionHeading } from '../components/SectionHeading';

interface LightboxProps {
  images: string[];
  index: number | null;
  onClose: () => void;
  onIndex: (idx: number) => void;
}

const PhotoLightbox: React.FC<LightboxProps> = ({ images, index, onClose, onIndex }) => {
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (index === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + images.length) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [index, images.length, onClose, onIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || index === null) return;
    const deltaX = (e.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) >= 45) {
      if (deltaX < 0) {
        onIndex((index + 1) % images.length);
      } else {
        onIndex((index - 1 + images.length) % images.length);
      }
    }
  };

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-[#090608]/95 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`Memory ${index + 1}`}
            className="max-h-[88svh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            style={{ objectPosition: siteConfig.imagePositions[images[index]] || '50% 25%' }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="icon-button absolute right-5 top-5"
            aria-label="Close gallery"
          >
            <X size={20} />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onIndex((index - 1 + images.length) % images.length);
            }}
            className="icon-button absolute left-3 top-1/2 -translate-y-1/2 sm:left-6"
            aria-label="Previous photo"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onIndex((index + 1) % images.length);
            }}
            className="icon-button absolute right-3 top-1/2 -translate-y-1/2 sm:right-6"
            aria-label="Next photo"
          >
            <ChevronRight size={20} />
          </button>

          {/* Counter pill */}
          <div className="absolute bottom-5 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-white/60">
            {index + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const GallerySection: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const images = siteConfig.photos.gallery;

  return (
    <section className="section-shell bg-[#130b10]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Chapter 02 · Little moments"
          title="A gallery that feels more like a memory wall."
          copy="Tap any photograph to open it full-screen. Every image stays sharp — no blurred photo backgrounds, no heavy overlays."
        />

        <div className="mt-12 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
          {images.map((imgSrc, idx) => (
            <motion.button
              key={imgSrc + idx}
              onClick={() => setActivePhotoIndex(idx)}
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/[.025] sm:mb-4 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ delay: (idx % 4) * 0.05 }}
              whileHover={{ y: -4, rotate: idx % 2 ? 0.6 : -0.6 }}
            >
              <img
                src={imgSrc}
                alt={`Gallery memory ${idx + 1}`}
                loading="lazy"
                className={`w-full object-cover transition duration-700 group-hover:scale-[1.025] ${
                  idx % 3 === 0
                    ? 'aspect-[3/4]'
                    : idx % 3 === 1
                    ? 'aspect-[4/5]'
                    : 'aspect-[2/3]'
                }`}
                style={{ objectPosition: siteConfig.imagePositions[imgSrc] || '50% 25%' }}
              />
              <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/25 text-white/75 opacity-0 transition group-hover:opacity-100">
                <Expand size={15} />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <PhotoLightbox
        images={images}
        index={activePhotoIndex}
        onClose={() => setActivePhotoIndex(null)}
        onIndex={setActivePhotoIndex}
      />
    </section>
  );
};
