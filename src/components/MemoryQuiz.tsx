import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { SectionHeading } from './SectionHeading';
import { sound } from '../utils/sound';

export const MemoryQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isDone, setIsDone] = useState(false);

  const currentQuiz = siteConfig.quiz[currentQuestionIndex];

  const handleNext = () => {
    sound.playKeyTap();
    if (currentQuestionIndex === siteConfig.quiz.length - 1) {
      setIsDone(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleReset = () => {
    sound.playKeyTap();
    setIsDone(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
  };

  return (
    <section className="section-shell bg-[#170d13]">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Memory quiz"
          title="How well do you remember the vibe?"
          copy="Just for fun. There is no penalty for getting anything wrong — the story keeps going either way."
        />

        <div className="mt-12 overflow-hidden rounded-[30px] border border-white/10 bg-[#100a0e] p-4 sm:p-6 shadow-2xl">
          <AnimatePresence mode="wait">
            {isDone ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid min-h-[430px] place-items-center p-8 text-center"
              >
                <div>
                  <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border border-[#d6a475]/40 bg-white/[0.06] backdrop-blur-md text-[#d6a475] shadow-glow">
                    <Check size={28} />
                  </div>
                  <h3 className="font-display text-4xl text-white">
                    You know these memories pretty well :)
                  </h3>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/50">
                    The exact answers matter less than the fact that the moments are worth remembering.
                  </p>
                  <button
                    onClick={handleReset}
                    className="glass-pill mt-7"
                  >
                    Play again
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid gap-6 md:grid-cols-[.85fr_1.15fr]"
              >
                <img
                  src={currentQuiz.photo}
                  alt="Quiz memory"
                  className="aspect-[4/5] h-full max-h-[520px] w-full rounded-2xl object-cover"
                  style={{ objectPosition: siteConfig.imagePositions[currentQuiz.photo] || '50% 25%' }}
                />

                <div className="flex flex-col justify-center py-3">
                  <p className="text-[10px] uppercase tracking-[.35em] text-[#d6a475]">
                    Question {currentQuestionIndex + 1} / {siteConfig.quiz.length}
                  </p>
                  <h3 className="mt-4 font-display text-3xl leading-tight text-white sm:text-4xl">
                    {currentQuiz.question}
                  </h3>

                  <div className="mt-7 space-y-3">
                    {currentQuiz.options.map((opt, optIdx) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSelectedOption(optIdx);
                          sound.playKeyTap();
                        }}
                        className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left text-sm backdrop-blur-lg transition-all duration-300 ${
                          selectedOption === optIdx
                            ? 'border-[#d6a475]/80 bg-gradient-to-r from-[#d6a475]/25 to-white/[0.08] text-white shadow-[0_8px_24px_rgba(214,164,117,0.25)]'
                            : 'border-white/12 bg-white/[0.03] text-white/70 shadow-sm hover:border-white/25 hover:bg-white/[0.07] hover:text-white'
                        }`}
                      >
                        <span>{opt}</span>
                        {selectedOption === optIdx && (
                          <Check size={18} className="text-[#d6a475]" />
                        )}
                      </button>
                    ))}
                  </div>

                  {selectedOption !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6"
                    >
                      <button onClick={handleNext} className="premium-button">
                        {currentQuestionIndex === siteConfig.quiz.length - 1
                          ? 'See results'
                          : 'Next question'}
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
