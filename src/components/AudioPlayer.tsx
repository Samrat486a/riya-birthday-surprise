import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { SectionHeading } from './SectionHeading';
import { sound } from '../utils/sound';

function formatTime(seconds = 0): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${mins}:${secs}`;
}

interface TrackProps {
  src?: string;
  title: string;
  artist?: string;
  cover: string;
  waveform?: boolean;
}

const AudioTrackItem: React.FC<TrackProps> = ({
  src,
  title,
  artist,
  cover,
  waveform = false
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  if (!src) return null;

  const togglePlay = () => {
    sound.playKeyTap();
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    sound.playKeyTap();
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const val = Number(e.target.value);
    audio.currentTime = val;
    setCurrentTime(val);
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[.035] backdrop-blur-md p-4 sm:p-5 shadow-xl">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-4">
        <img
          src={cover}
          alt="Audio cover"
          className="h-20 w-20 rounded-2xl object-cover shadow-md"
          style={{ objectPosition: siteConfig.imagePositions[cover] || '50% 25%' }}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-xl text-white">{title}</p>
          {artist && (
            <p className="mt-1 truncate text-xs text-white/40">{artist}</p>
          )}
          {waveform && (
            <div className="waveform mt-3" aria-hidden="true">
              {Array.from({ length: 28 }, (_, j) => (
                <i
                  key={j}
                  style={{
                    height: `${25 + ((j * 19) % 70)}%`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="icon-button"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <span className="w-10 text-right text-[10px] text-white/35">
          {formatTime(currentTime)}
        </span>

        <input
          aria-label="Audio progress"
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={Math.min(currentTime, duration || 0)}
          onChange={handleSeek}
          className="audio-range flex-1"
        />

        <span className="w-10 text-[10px] text-white/35">
          {formatTime(duration)}
        </span>

        <button
          onClick={toggleMute}
          className="icon-button !h-9 !w-9"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
};

export const AudioPlayer: React.FC = () => {
  const hasAudio = !!siteConfig.audio.audioFile;
  const hasVoice = !!siteConfig.voiceMessage.audioFile;

  if (!hasAudio && !hasVoice) return null;

  return (
    <section className="section-shell bg-[#100a0e]">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Soundtrack"
          title="Press play when you want the story to have a soundtrack."
          copy="Audio never starts automatically. Music and voice notes only play after you choose to start them."
        />

        <div className="mt-10 space-y-5">
          {hasAudio && (
            <AudioTrackItem
              src={siteConfig.audio.audioFile}
              title={siteConfig.audio.trackTitle}
              artist={siteConfig.audio.artistName}
              cover={siteConfig.audio.coverPhoto}
            />
          )}

          {hasVoice && (
            <AudioTrackItem
              src={siteConfig.voiceMessage.audioFile}
              title={siteConfig.voiceMessage.title}
              cover={siteConfig.voiceMessage.photo}
              waveform
            />
          )}
        </div>
      </div>
    </section>
  );
};
