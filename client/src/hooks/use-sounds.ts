import { useState, useEffect, useRef } from 'react';

export function useSoundEffects() {
  const playSound = (type: 'correct' | 'incorrect' | 'click') => {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.play().catch(e => console.log('Audio play blocked:', e));
  };

  return { playSound };
}

export function useBackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/sounds/bg-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Audio play blocked:', e));
    }
    setIsPlaying(!isPlaying);
  };

  return { isPlaying, toggleMusic };
}
