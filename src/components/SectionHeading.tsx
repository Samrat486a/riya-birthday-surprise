import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  copy,
  align = 'left'
}) => {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className="mb-3 text-[10px] uppercase tracking-[.42em] text-[#d6a475]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl leading-[1.08] text-[#f7efe8] sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {copy && (
        <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
          {copy}
        </p>
      )}
    </div>
  );
};
