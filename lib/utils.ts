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

// API Utility Functions
export async function fetchArticles(options: { 
  category?: string; 
  sort?: 'latest' | 'popular' | 'trending';
  limit?: number;
} = {}) {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/articles`);
    // const data = await response.json();
    // return data;
    
    // Simulated API response for now
    return new Promise<Article[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: "The Future of AI in Everyday Life",
            description: "Exploring how artificial intelligence is transforming our daily routines and what to expect in the coming years.",
            category: "Technology",
            image: "https://source.unsplash.com/800x600/?technology,ai",
            date: "2024-02-24",
          },
          {
            id: 2,
            title: "Sustainable Living: Small Changes, Big Impact",
            description: "Learn about simple lifestyle changes that can help reduce your environmental footprint.",
            category: "Environment",
            image: "https://source.unsplash.com/800x600/?environment,sustainability",
            date: "2024-02-23",
          },
          {
            id: 3,
            title: "Global Economic Trends 2024",
            description: "Analysis of emerging economic patterns and their implications for businesses and consumers.",
            category: "Business",
            image: "https://source.unsplash.com/800x600/?business,economy",
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
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/podcasts`);
    // const data = await response.json();
    // return data;
    
    // Simulated API response for now
    return new Promise<Podcast[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "tech-talks",
            title: "Tech Talks Daily",
            author: "Sarah Chen",
            image: "https://source.unsplash.com/600x600/?technology,podcast",
            category: "Technology",
            episodes: 156,
            duration: "45 min",
          },
          {
            id: "daily-news",
            title: "Daily News Roundup",
            author: "News Network",
            image: "https://source.unsplash.com/600x600/?news,radio",
            category: "News",
            episodes: 365,
            duration: "25 min",
          },
          {
            id: "science-today",
            title: "Science Today",
            author: "Dr. James Miller",
            image: "https://source.unsplash.com/600x600/?science,laboratory",
            category: "Science",
            episodes: 89,
            duration: "30 min",
          },
        ]);
      }, 1000);
    });
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    return [];
  }
}

