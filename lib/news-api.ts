import { cacheData, getCachedData } from './redis';
import { withRetry } from './retry';
import config from './config';

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

  const cacheKey = `${config.cache.news.prefix}${category || 'all'}:${q || 'none'}:${pageSize}:${page}:${language}:${sortBy}`;

  // Try to get from cache first
  const cached = await getCachedData<NewsResponse>(cacheKey);
  if (cached) return cached;

  const fetchWithRetry = () => withRetry(async () => {
    const queryParams = new URLSearchParams({
      apiKey: config.newsApi.apiKey || '',
      pageSize: pageSize.toString(),
      page: page.toString(),
      language,
      sortBy,
    });

    if (category) queryParams.append('category', category);
    if (q) queryParams.append('q', q);

    const endpoint = category ? 'top-headlines' : 'everything';
    const url = `${config.newsApi.baseUrl}/${endpoint}?${queryParams.toString()}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': `${config.app.name}/${process.env.npm_package_version || '1.0.0'}`
      },
      next: { revalidate: config.cache.news.ttl }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Failed to fetch news: ${response.statusText}`);
    }

    return response.json() as Promise<NewsResponse>;
  }, {
    maxAttempts: 3,
    shouldRetry: (error) => {
      // Retry on network errors or API rate limits
      if (error instanceof Error) {
        return error.message.includes('network') ||
               error.message.includes('timeout') ||
               error.message.includes('429') || // Too Many Requests
               error.message.includes('503') || // Service Unavailable
               error.message.includes('504');   // Gateway Timeout
      }
      return false;
    }
  });

  try {
    const data = await fetchWithRetry();
    
    if (data.status === 'error') {
      throw new Error(data.message || 'News API returned an error');
    }

    // Cache successful responses
    await cacheData(cacheKey, data, config.cache.news.ttl);
    
    return data;
  } catch (error) {
    console.error('News API Error:', error);
    // Transform error for client consumption
    const clientError = new Error(
      error instanceof Error 
        ? error.message.includes('429') 
          ? 'Rate limit exceeded. Please try again later.'
          : error.message
        : 'Failed to fetch news'
    );
    throw clientError;
  }
}