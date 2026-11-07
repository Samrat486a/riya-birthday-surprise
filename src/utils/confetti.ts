import confetti from 'canvas-confetti';

export const triggerBirthdayConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors: ['#e1c38a', '#d4aa5f', '#fbf7ee', '#e58e94', '#60a5fa', '#f59e0b']
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const triggerCandleSmokeAndSparkles = (x = 0.5, y = 0.5) => {
  confetti({
    particleCount: 80,
    spread: 80,
    origin: { x, y },
    colors: ['#fef3c7', '#fde68a', '#d4aa5f', '#ffffff'],
    startVelocity: 30,
    ticks: 200,
    gravity: 0.6,
    scalar: 0.9,
    zIndex: 9999
  });
};

export const triggerCakeCutSparkles = (x = 0.5, y = 0.58) => {
  confetti({
    particleCount: 45,
    spread: 60,
    origin: { x, y },
    colors: ['#d6a475', '#f7efe8', '#f3cfab', '#ffffff', '#e58e94'],
    startVelocity: 20,
    ticks: 140,
    gravity: 0.75,
    scalar: 0.75,
    zIndex: 9999
  });
};
