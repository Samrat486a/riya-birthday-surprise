import React, { useRef, useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';

export const ScratchCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      grad.addColorStop(0, '#b98a67');
      grad.addColorStop(0.5, '#e0b991');
      grad.addColorStop(1, '#8a5e4e');

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.font = '600 12px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SCRATCH TO REVEAL', rect.width / 2, rect.height / 2);
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    return () => window.removeEventListener('resize', setupCanvas);
  }, []);

  const handleScratch = (e: React.PointerEvent<HTMLCanvasElement> | PointerEvent) => {
    if (!isDrawing.current || isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    // Check scratch percentage
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparentCount = 0;
    const step = 80;
    for (let i = 3; i < imgData.length; i += step) {
      if (imgData[i] === 0) {
        transparentCount++;
      }
    }
    const sampleSize = imgData.length / step;
    if (transparentCount / sampleSize > 0.42) {
      setIsRevealed(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-[28px] border border-white/10 bg-[#1a0f15] shadow-2xl">
      <img
        src={siteConfig.photos.scratch}
        alt="Hidden birthday memory"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: siteConfig.imagePositions[siteConfig.photos.scratch] || '50% 25%' }}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-6 pt-20">
        <p className="font-display text-2xl text-white">
          {siteConfig.scratchMessage}
        </p>
      </div>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full touch-none transition-opacity duration-500 ${
          isRevealed ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
        onPointerDown={(e) => {
          isDrawing.current = true;
          handleScratch(e);
        }}
        onPointerMove={handleScratch}
        onPointerUp={() => {
          isDrawing.current = false;
        }}
        onPointerCancel={() => {
          isDrawing.current = false;
        }}
      />
    </div>
  );
};
