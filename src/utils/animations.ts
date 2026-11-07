import anime from 'animejs';

export const animFadeIn = (target: string | HTMLElement | HTMLElement[], delay = 0, duration = 800) => {
  return anime({
    targets: target,
    opacity: [0, 1],
    easing: 'easeOutCubic',
    duration,
    delay
  });
};

export const animSlideUp = (target: string | HTMLElement | HTMLElement[], delay = 0, duration = 800) => {
  return anime({
    targets: target,
    translateY: [40, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration,
    delay
  });
};

export const animPopIn = (target: string | HTMLElement | HTMLElement[], delay = 0) => {
  return anime({
    targets: target,
    scale: [0.75, 1],
    opacity: [0, 1],
    easing: 'easeOutElastic(1, .8)',
    duration: 900,
    delay
  });
};

export const animShake = (target: string | HTMLElement) => {
  return anime({
    targets: target,
    translateX: [
      { value: -12, duration: 60 },
      { value: 12, duration: 60 },
      { value: -8, duration: 60 },
      { value: 8, duration: 60 },
      { value: -4, duration: 60 },
      { value: 0, duration: 60 }
    ],
    easing: 'easeInOutSine'
  });
};

export const animStaggerList = (targets: string | HTMLElement[], delay = 100) => {
  return anime({
    targets,
    translateY: [30, 0],
    opacity: [0, 1],
    delay: anime.stagger(delay, { start: 200 }),
    easing: 'easeOutQuad',
    duration: 700
  });
};
