import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { SectionHeading } from '../components/SectionHeading';

export const AppreciationCards: React.FC = () => {
  return (
    <section className="section-shell bg-[#100a0e]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Chapter 03 · The details"
          title="Things worth appreciating about you."
          copy="Not dramatic speeches — just a few simple things that make a person memorable."
        />

        <div className="mt-14 space-y-4">
          {siteConfig.appreciations.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="grid gap-4 rounded-[26px] border border-white/10 bg-white/[.025] p-6 sm:grid-cols-[90px_1fr] sm:p-8 transition-colors duration-300 hover:border-[#d6a475]/30 hover:bg-white/[.04]"
            >
              <span className="font-display text-3xl text-[#d6a475]/55">
                0{idx + 1}
              </span>
              <div>
                <h3 className="font-display text-2xl text-white sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/50">
                  {item.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
