
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export interface NewsArticle {
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
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
  message?: string; // For error responses
}

export async function fetchNews(params: {
  category?: string;
  q?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
}): Promise<NewsAPIResponse> {
  const { category, q, page = 1, pageSize = 10, sortBy = 'publishedAt' } = params;
  
  // Build query parameters for our internal API
  const queryParams = new URLSearchParams();
  if (category) queryParams.append('category', category);
  if (q) queryParams.append('q', q);
  queryParams.append('page', page.toString());
  queryParams.append('pageSize', pageSize.toString());
  queryParams.append('sortBy', sortBy);
  
  try {
    // Use our internal API route instead of calling News API directly
    const response = await fetch(`/api/news?${queryParams}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch news: ${response.status}`);
    }
    
    const data: NewsAPIResponse = await response.json();
    return data;
  } catch (error) {
    console.error('News API Error:', error);
    throw error;
  }
}

export async function searchNews(query: string, page = 1, pageSize = 10): Promise<NewsAPIResponse> {
  return fetchNews({ q: query, page, pageSize });
}