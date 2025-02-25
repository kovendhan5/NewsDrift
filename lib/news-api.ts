import { cacheData, getCachedData } from './redis';

// NewsAPI base URL
const NEWS_API_URL = 'https://newsapi.org/v2';
const API_KEY = process.env.NEWS_API_KEY;

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

interface NewsAPIParams {
  category?: string;
  q?: string;
  pageSize?: number;
  page?: number;
  language?: string;
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
}

export async function fetchNews(params: NewsAPIParams): Promise<NewsResponse> {
  const { 
    category,
    q,
    pageSize = 10,
    page = 1,
    language = 'en',
    sortBy = 'publishedAt'
  } = params;

  // Generate cache key based on params
  const cacheKey = `news:${category || 'all'}:${q || 'none'}:${pageSize}:${page}:${language}:${sortBy}`;

  // Try to get from cache first
  const cached = await getCachedData<NewsResponse>(cacheKey);
  if (cached) return cached;

  try {
    // Build query parameters
    const queryParams = new URLSearchParams({
      apiKey: API_KEY || '',
      pageSize: pageSize.toString(),
      page: page.toString(),
      language,
      sortBy,
    });

    if (category) queryParams.append('category', category);
    if (q) queryParams.append('q', q);

    // Determine which endpoint to use
    const endpoint = category ? 'top-headlines' : 'everything';
    const url = `${NEWS_API_URL}/${endpoint}?${queryParams.toString()}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch news');
    }

    const data: NewsResponse = await response.json();

    // Cache successful responses for 15 minutes (900 seconds)
    await cacheData(cacheKey, data, 900);

    return data;
  } catch (error) {
    console.error('News API Error:', error);
    throw error;
  }
}