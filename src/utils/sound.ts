/**
 * Synthesizes audio using native Web Audio API.
 * Provides crisp tactile tap sound effects, soft relaxing acoustic chords,
 * candle blow whoosh, and knife cake-slice sounds.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientInterval: number | null = null;
  private isAmbientPlaying: boolean = false;
  private ambientGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Separate SFX Gain and Ambient Gain
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.sfxGain.connect(this.ctx.destination);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      this.ambientGain.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ctx) {
      if (this.sfxGain) {
        this.sfxGain.gain.setValueAtTime(muted ? 0 : 0.18, this.ctx.currentTime);
      }
      if (this.ambientGain) {
        this.ambientGain.gain.setValueAtTime(muted ? 0 : 0.04, this.ctx.currentTime);
      }
    }
  }

  /**
   * Crisp, satisfying, tactile tap sound effect (like modern iOS/tactile UI)
   */
  public playKeyTap() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Gentle high-to-mid frequency drop for a clean tactile "pop"
    osc.frequency.setValueAtTime(620, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(360, this.ctx.currentTime + 0.045);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.045);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.045);
  }

  public playWrongPin() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.setValueAtTime(130, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  public playUnlockSuccess() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + idx * 0.09;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.16, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  public playCandleBlow() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const bufferSize = this.ctx.sampleRate * 0.35;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(650, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start();
  }

  public playCakeSlice() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    // Realistic cake slicing sound: rich downward draw
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(720, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(190, this.ctx.currentTime + 0.45);

    gain.gain.setValueAtTime(0.16, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.45);
  }

  /**
   * Delicate porcelain/gold plate contact clink when the knife reaches the base
   */
  public playPlateClink() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(920, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.11, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  /**
   * Generates a warm, peaceful, relaxing acoustic chord progression
   * (Fmaj7 - G6 - Em7 - Am7) with soft piano-style harmonics
   */
  public startAmbientHarmony() {
    if (this.isAmbientPlaying) return;
    this.initCtx();
    if (!this.ctx || !this.ambientGain) return;

    const chords = [
      [174.61, 220.00, 261.63, 329.63], // Fmaj7 (F, A, C, E)
      [196.00, 246.94, 293.66, 392.00], // G (G, B, D, G)
      [164.81, 196.00, 246.94, 329.63], // Em7 (E, G, B, E)
      [220.00, 261.63, 329.63, 440.00], // Am7 (A, C, E, A)
    ];

    let chordIdx = 0;

    const playChord = () => {
      if (!this.ctx || !this.ambientGain || !this.isAmbientPlaying) return;
      const notes = chords[chordIdx];
      chordIdx = (chordIdx + 1) % chords.length;

      notes.forEach((freq, noteIdx) => {
        if (!this.ctx || !this.ambientGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteStart = this.ctx.currentTime + noteIdx * 0.12;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.035, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 3.2);

        osc.connect(gain);
        gain.connect(this.ambientGain);

        osc.start(noteStart);
        osc.stop(noteStart + 3.2);
      });
    };

    this.isAmbientPlaying = true;
    playChord();
    this.ambientInterval = window.setInterval(playChord, 3600);
  }

  public stopAmbientHarmony() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    this.isAmbientPlaying = false;
  }

  public toggleAmbient() {
    if (this.isAmbientPlaying) {
      this.stopAmbientHarmony();
      return false;
    } else {
      this.startAmbientHarmony();
      return true;
    }
  }

  public getIsPlaying() {
    return this.isAmbientPlaying;
  }
}

export const sound = new SoundEngine();
