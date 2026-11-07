import React, { useMemo } from 'react';

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 18,
  className = ''
}) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, n) => ({
        id: n,
        left: `${(n * 47) % 100}%`,
        top: `${(n * 71) % 100}%`,
        delay: `${(n % 8) * 0.45}s`,
        duration: `${5 + (n % 5)}s`,
        size: `${2 + (n % 3)}px`
      })),
    [count]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size
          }}
        />
      ))}
    </div>
  );
};
