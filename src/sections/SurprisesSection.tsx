import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ScratchCard } from '../components/ScratchCard';
import { GiftBox } from '../components/GiftBox';

export const SurprisesSection: React.FC = () => {
  return (
    <section className="section-shell bg-[#100a0e]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Chapter 04 · Little surprises"
          title="Two tiny interactions. No peeking."
          copy="Scratch one card, open one gift, and keep scrolling when you are ready."
        />

        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-center text-xs uppercase tracking-[.32em] text-white/35">
              Scratch to reveal
            </p>
            <ScratchCard />
          </div>

          <div>
            <p className="mb-4 text-center text-xs uppercase tracking-[.32em] text-white/35">
              Tap to open
            </p>
            <GiftBox />
          </div>
        </div>
      </div>
    </section>
  );
};
