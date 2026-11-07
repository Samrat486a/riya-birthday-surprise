import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { SectionHeading } from '../components/SectionHeading';

export const StoryTimeline: React.FC = () => {
  return (
    <section className="section-shell bg-[#100a0e]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Chapter 01 · The beginning"
          title="The memories that quietly became important."
          copy="A few chapters, a few photographs, and the kind of small moments that are easy to miss until you look back."
        />

        <div className="relative mt-16 md:mt-24">
          {/* Vertical Timeline Spine */}
          <div className="absolute bottom-0 left-[14px] top-0 w-px bg-gradient-to-b from-[#d6a475]/40 via-white/10 to-transparent md:left-1/2" />

          {siteConfig.memories.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 55 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className={`memory-card relative mb-14 grid items-center gap-7 pl-10 md:mb-24 md:grid-cols-2 md:pl-0 ${
                idx % 2 ? 'md:[&>div:first-child]:order-2' : ''
              }`}
            >
              {/* Photo Box */}
              <div className={`relative ${idx % 2 ? 'md:pl-12' : 'md:pr-12'}`}>
                <span className="absolute -left-[31px] top-5 h-3 w-3 rounded-full border-2 border-[#d6a475] bg-[#100a0e] md:left-auto md:right-[-7px] md:top-1/2 md:-translate-y-1/2" />
                <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-2">
                  <img
                    src={item.photo}
                    alt={item.title}
                    loading="lazy"
                    className="aspect-[4/5] w-full rounded-[22px] object-cover"
                    style={{ objectPosition: siteConfig.imagePositions[item.photo] || '50% 25%' }}
                  />
                </div>
              </div>

              {/* Text Description */}
              <div className={`${idx % 2 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <p className="text-[10px] uppercase tracking-[.36em] text-[#d6a475]">
                  {String(idx + 1).padStart(2, '0')} · {item.date}
                </p>
                <h3 className="mt-3 font-display text-3xl text-white sm:text-4xl">
                  {item.title}
                </h3>
                <p
                  className={`mt-4 max-w-md text-sm leading-7 text-white/55 ${
                    idx % 2 ? 'md:ml-auto' : ''
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
