type FetchOptions = RequestInit & {
  timeout?: number;
};

export async function fetchWithTimeout<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = 10000, ...fetchOptions } = options;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Request failed with status ${response.status}`
      );
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    
    throw error;
  }
}

export function handleApiError(error: unknown): { message: string; status?: number } {
  console.error('API Error:', error);
  
  if (error instanceof Error) {
    if (error.message.includes('timed out')) {
      return { message: 'Request timed out. Please try again.', status: 504 };
    }
    
    if (error.message.includes('fetch')) {
      return { message: 'Network error. Please check your connection.', status: 503 };
    }
    
    return { message: error.message };
  }
  
  return { message: 'An unexpected error occurred' };
} 