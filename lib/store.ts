import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IUser } from '@/models/user';
import type { NewsResponse, Article } from './news-api';

interface CurrentEpisode {
  id: string;
  title: string;
  author?: string;
  image?: string;
  url: string;
}

interface AudioPlayerState {
  isVisible: boolean;
  currentEpisode: CurrentEpisode | null;
  setCurrentEpisode: (params: { isVisible: boolean; currentEpisode: CurrentEpisode }) => void;
  setIsVisible: (isVisible: boolean) => void;
}

interface NewsState {
  searchQuery: string;
  category: string;
  sortBy: 'publishedAt' | 'popularity' | 'relevancy';
  page: number;
  pageSize: number;
  articles: Article[];
  totalResults: number;
  isLoading: boolean;
  error: string | null;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setSortBy: (sortBy: 'publishedAt' | 'popularity' | 'relevancy') => void;
  setPage: (page: number) => void;
  setArticles: (response: NewsResponse) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetState: () => void;
}

// Audio Player Store
export const useAudioPlayerStore = create<AudioPlayerState>((set) => ({
  isVisible: false,
  currentEpisode: null,
  setCurrentEpisode: ({ isVisible, currentEpisode }) => set({ isVisible, currentEpisode }),
  setIsVisible: (isVisible) => set({ isVisible }),
}));

// News Store with persistence
export const useNewsStore = create<NewsState>()(
  persist(
    (set) => ({
      searchQuery: '',
      category: 'general',
      sortBy: 'publishedAt',
      page: 1,
      pageSize: 10,
      articles: [],
      totalResults: 0,
      isLoading: false,
      error: null,
      setSearchQuery: (query) => set({ searchQuery: query, page: 1 }),
      setCategory: (category) => set({ category, page: 1 }),
      setSortBy: (sortBy) => set({ sortBy, page: 1 }),
      setPage: (page) => set({ page }),
      setArticles: (response) => set({
        articles: response.articles,
        totalResults: response.totalResults,
        error: null
      }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      resetState: () => set({
        searchQuery: '',
        category: 'general',
        sortBy: 'publishedAt',
        page: 1,
        articles: [],
        totalResults: 0,
        error: null
      }),
    }),
    {
      name: 'news-storage',
      partialize: (state) => ({
        category: state.category,
        sortBy: state.sortBy,
        pageSize: state.pageSize,
      }),
    }
  )
);

// Types for user preferences
interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

interface UserStore {
  preferences: UserPreferences;
  setPreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
  resetPreferences: () => void;
}

// Default preferences
const defaultPreferences: UserPreferences = {
  theme: 'system',
  fontSize: 'medium',
  language: 'en',
  emailNotifications: true,
  pushNotifications: true,
};

// User preferences store with persistence
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      preferences: defaultPreferences,
      setPreference: (key, value) => 
        set((state) => ({
          preferences: { ...state.preferences, [key]: value }
        })),
      resetPreferences: () => set({ preferences: defaultPreferences }),
    }),
    {
      name: 'user-preferences',
    }
  )
);