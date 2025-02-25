import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00"

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

// API Types
export interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
}

export interface Podcast {
  id: string;
  title: string;
  author: string;
  image: string;
  category: string;
  episodes: number;
  duration: string;
}

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.newsdrift.com';

// Replace categoryImageMap with direct Unsplash URLs
const categoryImageMap = {
  Technology: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  Environment: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
  Business: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  News: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
  Science: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
  Health: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
  Politics: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",
  Entertainment: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
  Sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
  Culture: "https://images.unsplash.com/photo-1482245294234-b3f2f8d5f1a4",
  Food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  Travel: "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
  History: "https://images.unsplash.com/photo-1461360370896-922624d12aa1",
  Wellness: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
  Finance: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0",
  default: "https://images.unsplash.com/photo-1557683311-eac922347aa1"
};

function getCategoryImage(category: string, width: number, height: number): string {
  const baseUrl = categoryImageMap[category as keyof typeof categoryImageMap] || categoryImageMap.default;
  return `${baseUrl}?w=${width}&h=${height}&fit=crop&q=80`;
}

// API Utility Functions
export async function fetchArticles(options: { 
  category?: string; 
  sort?: 'latest' | 'popular' | 'trending';
  limit?: number;
} = {}) {
  try {
    // Simulated API response for now
    return new Promise<Article[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: "The Future of AI in Everyday Life",
            description: "Exploring how artificial intelligence is transforming our daily routines and what to expect in the coming years.",
            category: "Technology",
            image: getCategoryImage("Technology", 800, 600),
            date: "2024-02-24",
          },
          {
            id: 2,
            title: "Sustainable Living: Small Changes, Big Impact",
            description: "Learn about simple lifestyle changes that can help reduce your environmental footprint.",
            category: "Environment",
            image: getCategoryImage("Environment", 800, 600),
            date: "2024-02-23",
          },
          {
            id: 3,
            title: "Global Economic Trends 2024",
            description: "Analysis of emerging economic patterns and their implications for businesses and consumers.",
            category: "Business",
            image: getCategoryImage("Business", 800, 600),
            date: "2024-02-22",
          },
        ]);
      }, 1000);
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function fetchPodcasts(options: {
  category?: string;
  sort?: 'popular' | 'new' | 'trending';
  limit?: number;
} = {}) {
  try {
    // Simulated API response for now
    return new Promise<Podcast[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "tech-talks",
            title: "Tech Talks Daily",
            author: "Sarah Chen",
            image: getCategoryImage("Technology", 600, 600),
            category: "Technology",
            episodes: 156,
            duration: "45 min",
          },
          {
            id: "daily-news",
            title: "Daily News Roundup",
            author: "News Network",
            image: getCategoryImage("News", 600, 600),
            category: "News",
            episodes: 365,
            duration: "25 min",
          },
          {
            id: "science-today",
            title: "Science Today",
            author: "Dr. James Miller",
            image: getCategoryImage("Science", 600, 600),
            category: "Science",
            episodes: 89,
            duration: "30 min",
          },
          {
            id: "health-wellness",
            title: "Health & Wellness",
            author: "Dr. Anna Smith",
            image: getCategoryImage("Health", 600, 600),
            category: "Health",
            episodes: 124,
            duration: "35 min",
          },
          {
            id: "business-trends",
            title: "Business Trends",
            author: "Michael Brown",
            image: getCategoryImage("Business", 600, 600),
            category: "Business",
            episodes: 92,
            duration: "40 min",
          },
        ]);
      }, 1000);
    });
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    return [];
  }
}

export async function downloadPodcastEpisode(url: string, title: string) {
  try {
    // Sanitize filename
    const filename = title
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase() + '.' + url.split('.').pop()

    const response = await fetch(url)
    if (!response.ok) throw new Error('Network response was not ok')

    const blob = await response.blob()
    const downloadUrl = window.URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(downloadUrl)
  } catch (error) {
    console.error('Download failed:', error)
    throw error
  }
}

export function validateAudioUrl(url: string): { isValid: boolean; format?: string } {
  try {
    const extension = url.split('.').pop()?.toLowerCase()
    const supportedFormats = ['mp3', 'wav', 'aac', 'm4a', 'ogg']
    
    if (!extension || !supportedFormats.includes(extension)) {
      return { isValid: false }
    }
    
    return { isValid: true, format: extension }
  } catch {
    return { isValid: false }
  }
}

