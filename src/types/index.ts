export interface MemoryItem {
  date: string;
  title: string;
  description: string;
  photo: string;
}

export interface AppreciationItem {
  title: string;
  text: string;
}

export interface QuizItem {
  question: string;
  photo: string;
  options: string[];
  answer: number;
}

export interface AudioConfig {
  trackTitle: string;
  artistName: string;
  audioFile: string;
  coverPhoto: string;
}

export interface VoiceConfig {
  title: string;
  audioFile: string;
  photo: string;
}

export interface SiteConfig {
  girlfriendName: string;
  birthdayDate: string;
  pin: string;
  senderName: string;
  heroMessage: string;
  introLines: string[];
  finalMessage: string;
  letter: string[];
  photos: {
    lockScreen: string;
    intro: string;
    hero: string;
    letter: string;
    gift: string;
    scratch: string;
    music: string;
    finale: string;
    timeline: string[];
    gallery: string[];
    desk: string[];
  };
  imagePositions: Record<string, string>;
  memories: MemoryItem[];
  appreciations: AppreciationItem[];
  quiz: QuizItem[];
  scratchMessage: string;
  giftMessage: string;
  audio: AudioConfig;
  voiceMessage: VoiceConfig;
}
