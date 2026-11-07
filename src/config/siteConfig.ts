import { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  girlfriendName: "Riya",
  birthdayDate: "2026-11-20T00:00:00+05:30",
  pin: "3010",
  senderName: "Your Friend, Samrat",
  heroMessage: "A small corner of the internet made just to celebrate you and the moments that deserve to be remembered.",
  introLines: [
    "Today isn't just another day…",
    "Because someone genuinely special was born."
  ],
  finalMessage: "I hope this year brings you calm days, exciting beginnings, good people, and memories you will always want to keep.",
  letter: [
    "Happy Birthday, Riya.",
    "I wanted to make something that feels a little more personal than a normal message — something you could scroll through slowly and come back to whenever you wanted.",
    "Thank you for the conversations, the random moments, the laughs, and the kind of memories that become important without announcing themselves. I hope your day feels light, happy, and completely yours.",
    "Keep being curious, confident, and wonderfully yourself. There is a lot ahead of you, and I hope this next year gives you plenty of reasons to smile."
  ],
  photos: {
    lockScreen: "/photos/lock.jpg",
    intro: "/photos/hero.jpg",
    hero: "/photos/hero.jpg",
    letter: "/photos/letter.jpg",
    gift: "/photos/scratch-reveal.jpg",
    scratch: "/photos/scratch-reveal.jpg",
    music: "/photos/gallery-1.jpg",
    finale: "/photos/finale.jpg",
    timeline: [
      "/photos/timeline-1.jpg",
      "/photos/timeline-2.jpg",
      "/photos/timeline-3.jpg",
      "/photos/timeline-4.jpg"
    ],
    gallery: [
      "/photos/gallery-1.jpg",
      "/photos/gallery-2.jpg",
      "/photos/gallery-3.jpg",
      "/photos/gallery-4.jpg",
      "/photos/gallery-5.jpg",
      "/photos/gallery-6.jpg"
    ],
    desk: [
      "/photos/gallery-1.jpg",
      "/photos/gallery-2.jpg",
      "/photos/gallery-3.jpg",
      "/photos/gallery-4.jpg",
      "/photos/gallery-5.jpg",
      "/photos/desk-6.jpg"
    ]
  },
  imagePositions: {
    "/photos/lock.jpg": "52% 38%",
    "/photos/hero.jpg": "50% 36%",
    "/photos/letter.jpg": "45% 32%",
    "/photos/scratch-reveal.jpg": "50% 25%",
    "/photos/gallery-1.jpg": "58% 25%",
    "/photos/gallery-2.jpg": "48% 30%",
    "/photos/gallery-3.jpg": "68% 32%",
    "/photos/gallery-4.jpg": "42% 35%",
    "/photos/gallery-5.jpg": "38% 30%",
    "/photos/gallery-6.jpg": "48% 38%",
    "/photos/desk-6.jpg": "48% 35%",
    "/photos/timeline-1.jpg": "55% 32%",
    "/photos/timeline-2.jpg": "46% 42%",
    "/photos/timeline-3.jpg": "48% 35%",
    "/photos/timeline-4.jpg": "48% 38%",
    "/photos/finale.jpg": "40% 38%"
  },
  memories: [
    {
      date: "A chapter worth keeping",
      title: "The Beginning",
      description: "Some memories become meaningful very quietly. They start as ordinary moments and later become the ones you remember most.",
      photo: "/photos/timeline-1.jpg"
    },
    {
      date: "One of those little moments",
      title: "The Laughs In Between",
      description: "Not every good memory needs a perfect plan. Sometimes the best ones are the random conversations and the unexpected smiles.",
      photo: "/photos/timeline-2.jpg"
    },
    {
      date: "A memory wall favorite",
      title: "Your Energy",
      description: "There is something memorable about the way you bring your own energy into a room — calm one moment, playful the next.",
      photo: "/photos/timeline-3.jpg"
    },
    {
      date: "Today",
      title: "Your Day",
      description: "A new year, a fresh chapter, and a whole collection of moments still waiting to happen.",
      photo: "/photos/timeline-4.jpg"
    }
  ],
  appreciations: [
    {
      title: "Your kindness",
      text: "The small thoughtful things matter more than people realize — and you have a way of making them feel natural."
    },
    {
      title: "Your smile",
      text: "It changes the mood of a moment without needing any explanation."
    },
    {
      title: "Your energy",
      text: "There is a calm confidence in the way you carry yourself that makes ordinary moments feel a little more memorable."
    },
    {
      title: "Your support",
      text: "Being there, listening, and caring in the little moments is something worth appreciating."
    },
    {
      title: "Your little habits",
      text: "The tiny details are often what make someone unforgettable — the things nobody else would think to notice."
    }
  ],
  quiz: [
    {
      question: "Which chapter fits this memory best?",
      photo: "/photos/timeline-1.jpg",
      options: ["The Beginning", "The Finale", "The Cake"],
      answer: 0
    },
    {
      question: "Which mood matches this photo?",
      photo: "/photos/gallery-2.jpg",
      options: ["Golden-hour calm", "Night-time magic", "Peak energy & laughs"],
      answer: 2
    },
    {
      question: "What matters most about a memory?",
      photo: "/photos/timeline-4.jpg",
      options: ["Perfect lighting", "How it made you feel", "The camera"],
      answer: 1
    }
  ],
  scratchMessage: "A little reminder: you deserve a year full of moments that feel as good as your favorite memories.",
  giftMessage: "One more wish for you: may this year surprise you in the best possible ways.",
  audio: {
    trackTitle: "Your Song",
    artistName: "Add your favorite track",
    audioFile: "",
    coverPhoto: "/photos/gallery-1.jpg"
  },
  voiceMessage: {
    title: "A message from me",
    audioFile: "",
    photo: "/photos/finale.jpg"
  }
};
