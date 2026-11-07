import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { Cake3D } from '../components/Cake3D';
import { siteConfig } from '../config/siteConfig';

export const CakeSection: React.FC = () => {
  return (
    <section className="section-shell bg-[#100a0e]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Birthday ritual"
          title="Make a wish & cut the cake."
          copy="Blow out the candles, take the chef's knife, and slice the first celebratory piece!"
        />

        <div className="mt-10 overflow-hidden rounded-[32px] border border-white/10 bg-[#100a0e] p-6 sm:p-8 shadow-2xl">
          <Cake3D friendName={siteConfig.girlfriendName} />
        </div>
      </div>
    </section>
  );
};
