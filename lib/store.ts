import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IUser } from '@/models/user';

interface UserState {
  audioPlayer: {
    isVisible: boolean;
    currentEpisode?: {
      id: string;
      title: string;
      image: string;
      author: string;
      url: string;
    };
  };
  preferences: {
    categories: string[];
    darkMode: boolean;
    carbonGoal: number;
  };
  setAudioPlayer: (state: UserState['audioPlayer']) => void;
  setPreferences: (prefs: Partial<UserState['preferences']>) => void;
}

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      audioPlayer: {
        isVisible: false,
      },
      preferences: {
        categories: [],
        darkMode: false,
        carbonGoal: 0,
      },
      setAudioPlayer: (state) => set({ audioPlayer: state }),
      setPreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        })),
    }),
    {
      name: 'user-preferences',
    }
  )
);

// Audio player hook for better code organization
export const useAudioPlayerStore = () => {
  const { audioPlayer, setAudioPlayer } = useStore();
  
  const setCurrentEpisode = (episode: UserState['audioPlayer']['currentEpisode']) => {
    setAudioPlayer({
      isVisible: true,
      currentEpisode: episode,
    });
  };

  const clearCurrentEpisode = () => {
    setAudioPlayer({
      isVisible: false,
      currentEpisode: undefined,
    });
  };

  return {
    ...audioPlayer,
    setCurrentEpisode,
    clearCurrentEpisode,
  };
};

// User preferences hook
export const usePreferences = () => {
  const { preferences, setPreferences } = useStore();
  
  return {
    ...preferences,
    setPreferences,
  };
};