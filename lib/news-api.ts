import { cacheData, getCachedData } from './redis';

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: Array<{
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
    content: string;
  }>;
}

export async function fetchNews(params: {
  category?: string;
  q?: string;
  page?: number;
  pageSize?: number;
}) {
  const { category, q, page = 1, pageSize = 10 } = params;
  const cacheKey = `news:${category || 'all'}:${q || 'latest'}:${page}:${pageSize}`;

  // Try to get from cache first
  const cached = await getCachedData<NewsAPIResponse>(cacheKey);
  if (cached) return cached;

  // If not in cache, fetch from API
  const queryParams = new URLSearchParams({
    apiKey: NEWS_API_KEY!,
    page: page.toString(),
    pageSize: pageSize.toString(),
    language: 'en',
    ...(category && { category }),
    ...(q && { q }),
  });

  try {
    const response = await fetch(`${BASE_URL}/top-headlines?${queryParams}`);
    if (!response.ok) throw new Error('News API request failed');
    
    const data: NewsAPIResponse = await response.json();
    
    // Cache the results for 15 minutes
    await cacheData(cacheKey, data, 900);
    
    return data;
  } catch (error) {
    console.error('News API Error:', error);
    throw error;
  }
}

export async function searchNews(query: string) {
  const cacheKey = `news:search:${query}`;
  
  // Try to get from cache first
  const cached = await getCachedData<NewsAPIResponse>(cacheKey);
  if (cached) return cached;

  const queryParams = new URLSearchParams({
    apiKey: NEWS_API_KEY!,
    q: query,
    language: 'en',
    pageSize: '10',
  });

  try {
    const response = await fetch(`${BASE_URL}/everything?${queryParams}`);
    if (!response.ok) throw new Error('News API search request failed');
    
    const data: NewsAPIResponse = await response.json();
    
    // Cache search results for 5 minutes
    await cacheData(cacheKey, data, 300);
    
    return data;
  } catch (error) {
    console.error('News API Search Error:', error);
    throw error;
  }
}