const config = {
  mongodb: {
    uri: process.env.MONGODB_URI!,
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
  apis: {
    news: {
      key: process.env.NEWS_API_KEY!,
      baseUrl: 'https://newsapi.org/v2',
    },
    openaq: {
      key: process.env.OPENAQ_API_KEY!,
      baseUrl: 'https://api.openaq.org/v2',
    },
  },
  auth0: {
    domain: process.env.AUTH0_DOMAIN!,
    clientId: process.env.AUTH0_CLIENT_ID!,
    clientSecret: process.env.AUTH0_CLIENT_SECRET!,
    audience: process.env.AUTH0_AUDIENCE!,
  },
  app: {
    port: parseInt(process.env.PORT || '3000'),
    nodeEnv: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
};

export type Config = typeof config;

// Validation
const requiredEnvVars = [
  'MONGODB_URI',
  'NEWS_API_KEY',
  'OPENAQ_API_KEY',
  'AUTH0_DOMAIN',
  'AUTH0_CLIENT_ID',
  'AUTH0_CLIENT_SECRET',
  'AUTH0_AUDIENCE',
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export default config;