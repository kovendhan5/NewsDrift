import { cacheData, getCachedData } from './redis';
import { withRetry } from './retry';
import config from './config';

// Base URL for podcast API
const PODCAST_API_URL = 'https://podcast-api.example.com/api/v1';

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

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  imageUrl: string | null;
  duration: number;
  publishDate: string;
  fileSize?: number;
  fileType?: string;
}

export interface Podcast {
  id: string;
  title: string;
  author: string;
  description?: string;
  image: string;
  category: string;
  episodes: number;
  duration: string;
  website?: string;
  rss?: string;
  episodesList?: PodcastEpisode[];
}

export interface PodcastsResponse {
  podcasts: Podcast[];
  total: number;
}

interface PodcastAPIParams {
  category?: string;
  sort?: 'popular' | 'new' | 'trending';
  page?: number;
  pageSize?: number;
  search?: string;
}

// Since we don't have a real podcast API yet, use mock data
import { getCategoryImage } from './utils';

// Mock podcast data
const mockPodcasts: Podcast[] = [
  {
    id: "tech-talks",
    title: "Tech Talks Daily",
    author: "Sarah Chen",
    description: "Daily discussions about the latest in technology, innovation, and digital transformation.",
    image: getCategoryImage("Technology", 600, 600),
    category: "Technology",
    episodes: 156,
    duration: "45 min",
    website: "https://techtalks.example.com",
    episodesList: [
      {
        id: "tech-talks-ep156",
        title: "The Future of AI in 2024",
        description: "Exploring the cutting-edge developments in artificial intelligence and what to expect this year.",
        audioUrl: "https://example.com/podcasts/tech-talks/ep156.mp3",
        imageUrl: getCategoryImage("Technology", 400, 400),
        duration: 2700, // 45 minutes in seconds
        publishDate: "2024-05-01",
        fileSize: 52428800, // 50MB
        fileType: "audio/mpeg"
      },
      {
        id: "tech-talks-ep155",
        title: "Quantum Computing Explained",
        description: "A beginner-friendly exploration of quantum computing principles.",
        audioUrl: "https://example.com/podcasts/tech-talks/ep155.mp3",
        imageUrl: getCategoryImage("Technology", 400, 400),
        duration: 2400, // 40 minutes in seconds
        publishDate: "2024-04-24",
        fileType: "audio/mpeg"
      }
    ]
  },
  {
    id: "daily-news",
    title: "Daily News Roundup",
    author: "News Network",
    description: "Get your daily dose of the most important headlines from around the world in just 25 minutes.",
    image: getCategoryImage("News", 600, 600),
    category: "News",
    episodes: 365,
    duration: "25 min",
    rss: "https://feeds.example.com/daily-news",
    episodesList: [
      {
        id: "daily-news-ep365",
        title: "Headlines for May 5, 2024",
        description: "Top stories from around the world for today.",
        audioUrl: "https://example.com/podcasts/daily-news/ep365.mp3",
        imageUrl: getCategoryImage("News", 400, 400),
        duration: 1500, // 25 minutes in seconds
        publishDate: "2024-05-05",
        fileType: "audio/mpeg"
      }
    ]
  },
  {
    id: "science-today",
    title: "Science Today",
    author: "Dr. James Miller",
    description: "The latest scientific breakthroughs and research explained in an accessible way.",
    image: getCategoryImage("Science", 600, 600),
    category: "Science",
    episodes: 89,
    duration: "30 min",
    website: "https://sciencetoday.example.org"
  },
  {
    id: "health-wellness",
    title: "Health & Wellness",
    author: "Dr. Anna Smith",
    description: "Expert advice on maintaining your physical and mental health in today's busy world.",
    image: getCategoryImage("Health", 600, 600),
    category: "Health",
    episodes: 124,
    duration: "35 min"
  },
  {
    id: "business-trends",
    title: "Business Trends",
    author: "Michael Brown",
    description: "Analysis of emerging business trends, markets, and entrepreneurship strategies.",
    image: getCategoryImage("Business", 600, 600),
    category: "Business",
    episodes: 92,
    duration: "40 min",
    rss: "https://feeds.example.com/business-trends"
  },
  {
    id: "mind-matters",
    title: "Mind Matters",
    author: "Dr. Emily Johnson",
    description: "Exploring psychology, neuroscience, and understanding our complex minds.",
    image: getCategoryImage("Science", 600, 600),
    category: "Science",
    episodes: 76,
    duration: "50 min"
  },
  {
    id: "planet-earth",
    title: "Planet Earth",
    author: "David Wilson",
    description: "Environmental issues, climate change, and our relationship with the natural world.",
    image: getCategoryImage("Environment", 600, 600),
    category: "Environment",
    episodes: 112,
    duration: "45 min"
  },
  {
    id: "startup-stories",
    title: "Startup Stories",
    author: "Lisa Zhang",
    description: "Interviews with founders and entrepreneurs about their journey and lessons learned.",
    image: getCategoryImage("Business", 600, 600),
    category: "Business",
    episodes: 68,
    duration: "60 min"
  }
];

export async function fetchPodcasts(params: PodcastAPIParams = {}): Promise<Podcast[]> {
  const {
    category,
    sort = 'popular',
    page = 1,
    pageSize = 10,
    search
  } = params;
  
  // Create cache key
  const cacheKey = `${config.cache.podcasts.prefix}${category || 'all'}:${sort}:${page}:${pageSize}:${search || 'none'}`;
  
  // Try to get from cache first
  const cached = await getCachedData<Podcast[]>(cacheKey);
  if (cached) return cached;

  // Simulate API request with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter by category if needed
      let filteredPodcasts = mockPodcasts;
      
      if (category) {
        filteredPodcasts = mockPodcasts.filter(podcast => 
          podcast.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      // Filter by search term if provided
      if (search) {
        const searchLower = search.toLowerCase();
        filteredPodcasts = filteredPodcasts.filter(podcast =>
          podcast.title.toLowerCase().includes(searchLower) ||
          podcast.author.toLowerCase().includes(searchLower) ||
          podcast.description?.toLowerCase().includes(searchLower)
        );
      }
      
      // Sort podcasts
      if (sort === 'popular') {
        filteredPodcasts.sort((a, b) => b.episodes - a.episodes);
      } else if (sort === 'new') {
        // For mock data, just randomize for "new"
        filteredPodcasts.sort(() => Math.random() - 0.5);
      } else if (sort === 'trending') {
        // For mock data, another randomization for "trending"
        filteredPodcasts.sort(() => Math.random() - 0.5);
      }
      
      // Paginate
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedPodcasts = filteredPodcasts.slice(start, end);
      
      // Cache the results
      cacheData(cacheKey, paginatedPodcasts, config.cache.podcasts.ttl);
      
      resolve(paginatedPodcasts);
    }, 500); // Simulate network delay
  });
}

export async function fetchPodcastById(id: string): Promise<Podcast | null> {
  const cacheKey = `${config.cache.podcasts.prefix}podcast:${id}`;
  
  // Try to get from cache first
  const cached = await getCachedData<Podcast>(cacheKey);
  if (cached) return cached;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const podcast = mockPodcasts.find(p => p.id === id) || null;
      
      if (podcast) {
        // Cache the result
        cacheData(cacheKey, podcast, config.cache.podcasts.ttl);
      }
      
      resolve(podcast);
    }, 300);
  });
}

export async function fetchPodcastEpisodes(podcastId: string): Promise<PodcastEpisode[]> {
  const cacheKey = `${config.cache.podcasts.prefix}podcast:${podcastId}:episodes`;
  
  // Try to get from cache first
  const cached = await getCachedData<PodcastEpisode[]>(cacheKey);
  if (cached) return cached;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const podcast = mockPodcasts.find(p => p.id === podcastId);
      
      if (podcast && podcast.episodesList) {
        // Cache the result
        cacheData(cacheKey, podcast.episodesList, config.cache.podcasts.ttl);
        resolve(podcast.episodesList);
      } else {
        // Return empty array if podcast not found or has no episodes
        resolve([]);
      }
    }, 300);
  });
}