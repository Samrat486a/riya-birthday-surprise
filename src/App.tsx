import React, { useState, useCallback, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './sections/LoadingScreen';
import { LockScreen } from './sections/LockScreen';
import { CinematicIntro } from './sections/CinematicIntro';
import { HeroSection } from './sections/HeroSection';
import { StoryTimeline } from './sections/StoryTimeline';
import { GallerySection } from './sections/GallerySection';
import { MemoryDesk } from './components/MemoryDesk';
import { AppreciationCards } from './sections/AppreciationCards';
import { MemoryQuiz } from './components/MemoryQuiz';
import { SurprisesSection } from './sections/SurprisesSection';
import { BirthdayLetter } from './components/BirthdayLetter';
import { AudioPlayer } from './components/AudioPlayer';
import { FinalSurpriseSection } from './sections/FinalSurpriseSection';
import { EasterEgg } from './components/EasterEgg';

const CakeSection = lazy(() =>
  import('./sections/CakeSection').then((m) => ({ default: m.CakeSection }))
);

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  // Always start locked so that on every browser refresh the lock screen MUST show
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isBegun, setIsBegun] = useState(false);

  const handleLoadingDone = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleBegin = () => {
    setIsBegun(true);
    setTimeout(() => {
      document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  return (
    <div className="min-h-screen bg-[#100a0e] text-white selection:bg-[#d6a475]/30 selection:text-[#f7efe8]">
      {!isLoaded && <LoadingScreen onDone={handleLoadingDone} />}

      <AnimatePresence>
        {isLoaded && !isUnlocked && (
          <LockScreen onUnlock={handleUnlock} key="lock" />
        )}
      </AnimatePresence>

      {isLoaded && isUnlocked && !isBegun && (
        <CinematicIntro onBegin={handleBegin} />
      )}

      {isLoaded && isUnlocked && isBegun && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <HeroSection />
          <StoryTimeline />
          <div id="gallery">
            <GallerySection />
          </div>
          <MemoryDesk />
          <AppreciationCards />
          <MemoryQuiz />
          <SurprisesSection />
          <BirthdayLetter />
          <AudioPlayer />
          <Suspense
            fallback={
              <div className="grid h-96 place-items-center bg-[#100a0e] text-[#d6a475]">
                Loading cake celebration...
              </div>
            }
          >
            <CakeSection />
          </Suspense>
          <FinalSurpriseSection />
          <EasterEgg />
        </motion.main>
      )}
    </div>
  );
}

export default App;
