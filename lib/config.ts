const config = {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
  newsApi: {
    baseUrl: 'https://newsapi.org/v2',
    apiKey: process.env.NEWS_API_KEY,
    pageSize: 10,
    defaultLanguage: 'en',
    cacheTime: 900, // 15 minutes in seconds
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/newsagg',
  },
  auth0: {
    domain: process.env.AUTH0_DOMAIN || '',
    clientId: process.env.AUTH0_CLIENT_ID || '',
    clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
    audience: process.env.AUTH0_AUDIENCE || '',
  },
  app: {
    name: 'News Aggregator',
    description: 'Your one-stop destination for latest news and podcasts',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    environment: process.env.NODE_ENV || 'development',
  },
  cache: {
    news: {
      ttl: 900, // 15 minutes
      prefix: 'news:',
    },
    podcasts: {
      ttl: 3600, // 1 hour
      prefix: 'podcasts:',
    },
    user: {
      ttl: 7200, // 2 hours
      prefix: 'user:',
    },
  },
} as const;

export type Config = typeof config;
export default config;