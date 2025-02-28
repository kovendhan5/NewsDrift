// Add this utility to debug API requests
export async function debugApiEndpoint(url: string) {
  console.log(`Testing API endpoint: ${url}`);
  try {
    const start = performance.now();
    const response = await fetch(url);
    const end = performance.now();
    
    console.log(`Response status: ${response.status}`);
    console.log(`Response time: ${Math.round(end - start)}ms`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Response data:', data);
      return { success: true, data };
    } else {
      const error = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
      console.error('API error:', error);
      return { success: false, error };
    }
  } catch (error) {
    console.error('API request failed:', error);
    return { success: false, error };
  }
}

// Use this in your browser console to test the news API:
// debugApiEndpoint('/api/news?category=technology') 