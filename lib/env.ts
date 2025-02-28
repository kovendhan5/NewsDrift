// Helper to safely access environment variables with fallbacks
export const env = {
  NEWS_API_KEY: process.env.NEWS_API_KEY || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT || '6379',
  
  // Check if required variables are present
  isValid: () => {
    const required = ['NEWS_API_KEY'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      console.error(`Missing required environment variables: ${missing.join(', ')}`);
      return false;
    }
    
    return true;
  }
};

// Use this in your API routes to validate environment variables
// if (!env.isValid()) {
//   return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
// } 