import { cacheData, getCachedData } from './redis';

// Supported audio formats
const SUPPORTED_AUDIO_FORMATS = ['mp3', 'wav', 'aac', 'm4a', 'ogg'] as const;
type AudioFormat = typeof SUPPORTED_AUDIO_FORMATS[number];

const isValidAudioUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const extension = parsedUrl.pathname.split('.').pop()?.toLowerCase();
    return extension ? SUPPORTED_AUDIO_FORMATS.includes(extension as AudioFormat) : false;
  } catch {
    return false;
  }
};

const formatAudioUrl = (url: string, format: AudioFormat = 'mp3'): string => {
  try {
    const parsedUrl = new URL(url);
    const extension = parsedUrl.pathname.split('.').pop()?.toLowerCase();
    
    // If URL already has a valid audio format, return as is
    if (extension && SUPPORTED_AUDIO_FORMATS.includes(extension as AudioFormat)) {
      return url;
    }

    // Add or replace extension
    const baseUrl = url.replace(/\.[^/.]+$/, ''); // Remove existing extension if any
    return `${baseUrl}.${format}`;
  } catch {
    // For invalid URLs, return a standardized format
    return `${url.replace(/\.[^/.]+$/, '')}.${format}`;
  }
};

export interface Podcast {
  id: string;
  title: string;
  author: string;
  image: string;
  category: string;
  description: string;
  episodes: number;
  duration: string;
  subscribers: string;
  rating: number;
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  audioUrl: string;
  format?: AudioFormat;
}

export interface PodcastsResponse {
  podcasts: Podcast[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PodcastEpisodesResponse {
  episodes: Episode[];
  total: number;
  page: number;
  pageSize: number;
}

export async function fetchPodcasts(params: {
  sort?: 'popular' | 'new' | 'trending';
  category?: string;
  page?: number;
  pageSize?: number;
}) {
  const { sort = 'popular', category, page = 1, pageSize = 12 } = params;
  const cacheKey = `podcasts:${sort}:${category || 'all'}:${page}:${pageSize}`;

  // Try to get from cache first
  const cached = await getCachedData<PodcastsResponse>(cacheKey);
  if (cached) return cached.podcasts;

  // For now, return mock data - in production, this would be a real API call
  const mockPodcasts: Podcast[] = [
    {
      id: "tech-talks",
      title: "Tech Talks Daily",
      author: "Neil Matthews",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop&q=80",
      category: "Technology",
      description: "Daily insights into the latest technology trends and innovations.",
      episodes: 156,
      duration: "45-60 min",
      subscribers: "250K",
      rating: 4.8,
    },
    {
      id: "eco-consciousness",
      title: "Eco Consciousness",
      author: "Sarah Chen",
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop&q=80",
      category: "Environment",
      description: "Weekly discussions about environmental issues and sustainable living.",
      episodes: 89,
      duration: "30-45 min",
      subscribers: "120K",
      rating: 4.7,
    },
    // Add more mock podcasts as needed
  ];

  // Sort podcasts based on the parameter
  const sortedPodcasts = [...mockPodcasts].sort((a, b) => {
    if (sort === 'new') {
      return b.episodes - a.episodes;
    } else if (sort === 'trending') {
      return b.rating - a.rating;
    }
    // Default to popular (by subscribers)
    return parseInt(b.subscribers.replace('K', '000')) - parseInt(a.subscribers.replace('K', '000'));
  });

  // Filter by category if provided
  const filteredPodcasts = category
    ? sortedPodcasts.filter(p => p.category.toLowerCase() === category.toLowerCase())
    : sortedPodcasts;

  const response: PodcastsResponse = {
    podcasts: filteredPodcasts,
    total: filteredPodcasts.length,
    page,
    pageSize,
  };

  // Cache the results for 15 minutes
  await cacheData(cacheKey, response, 900);

  return filteredPodcasts;
}

export async function fetchPodcastDetails(id: string) {
  const cacheKey = `podcast:${id}`;

  // Try to get from cache first
  const cached = await getCachedData<Podcast>(cacheKey);
  if (cached) return cached;

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // For now, return mock data - in production, this would be a real API call
  const podcast = mockPodcasts.find(p => p.id === id);
  if (!podcast) throw new Error('Podcast not found');

  // Cache the results for 1 hour
  await cacheData(cacheKey, podcast, 3600);

  return podcast;
}

export async function fetchPodcastEpisodes(id: string, params: {
  page?: number;
  pageSize?: number;
  search?: string;
}) {
  const { page = 1, pageSize = 10, search } = params;
  const cacheKey = `podcast:${id}:episodes:${page}:${pageSize}:${search || 'all'}`;

  // Try to get from cache first
  const cached = await getCachedData<PodcastEpisodesResponse>(cacheKey);
  if (cached) return cached.episodes;

  // For now, return mock data - in production, this would be a real API call
  const mockEpisodes: Episode[] = [
    {
      id: "e1",
      title: "The Future of AI",
      description: "Exploring the latest developments in artificial intelligence and their impact on society.",
      date: "2024-02-20",
      duration: "45:30",
      audioUrl: formatAudioUrl("https://example.com/podcasts/tech-talks/e1", "mp3"),
      format: "mp3",
    },
    {
      id: "e2",
      title: "Sustainable Living Tips",
      description: "Practical advice for reducing your carbon footprint and living more sustainably.",
      date: "2024-02-13",
      duration: "38:15",
      audioUrl: formatAudioUrl("https://example.com/podcasts/eco-consciousness/e2", "m4a"),
      format: "m4a",
    },
    // Add more mock episodes as needed
  ].map(episode => ({
    ...episode,
    audioUrl: isValidAudioUrl(episode.audioUrl) ? episode.audioUrl : formatAudioUrl(episode.audioUrl),
  }));

  let filteredEpisodes = [...mockEpisodes];
  if (search) {
    const searchLower = search.toLowerCase();
    filteredEpisodes = filteredEpisodes.filter(
      e => e.title.toLowerCase().includes(searchLower) || 
           e.description.toLowerCase().includes(searchLower)
    );
  }

  const response: PodcastEpisodesResponse = {
    episodes: filteredEpisodes,
    total: filteredEpisodes.length,
    page,
    pageSize,
  };

  // Cache the results for 15 minutes
  await cacheData(cacheKey, response, 900);

  return filteredEpisodes;
}