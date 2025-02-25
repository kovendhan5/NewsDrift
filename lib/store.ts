import { create } from 'zustand';

interface AudioPlayerState {
  isVisible: boolean;
  currentEpisode: {
    title: string;
    source: string;
    image: string;
    audio: string;
  } | null;
  setIsVisible: (isVisible: boolean) => void;
  setCurrentEpisode: (episode: AudioPlayerState['currentEpisode']) => void;
}

export const useAudioPlayerStore = create<AudioPlayerState>((set) => ({
  isVisible: false,
  currentEpisode: null,
  setIsVisible: (isVisible) => set({ isVisible }),
  setCurrentEpisode: (episode) => set({ currentEpisode: episode, isVisible: true }),
}));