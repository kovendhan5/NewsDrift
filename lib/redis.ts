import { Redis } from 'ioredis';
import config from './config';

class RedisClient {
  private static instance: Redis | null = null;
  private static retryCount = 0;
  private static readonly MAX_RETRIES = 5;

  static getInstance(): Redis {
    if (!this.instance) {
      this.instance = new Redis({
        host: config.redis.host,
        port: config.redis.port,
        maxRetriesPerRequest: 3,
        retryStrategy: (times) => {
          this.retryCount = times;
          if (times > this.MAX_RETRIES) {
            console.error('Max Redis reconnection attempts reached');
            return null; // Stop retrying
          }
          const delay = Math.min(times * 500, 2000);
          console.log(`Retrying Redis connection in ${delay}ms...`);
          return delay;
        },
        reconnectOnError: (err) => {
          const targetError = 'READONLY';
          if (err.message.includes(targetError)) {
            return true; // Only reconnect if error contains "READONLY"
          }
          return false;
        },
      });

      this.instance.on('error', (err) => {
        console.error('Redis Client Error:', err);
        if (this.retryCount >= this.MAX_RETRIES) {
          console.error('Redis connection failed, falling back to in-memory cache');
        }
      });

      this.instance.on('connect', () => {
        console.log('Redis Client Connected');
        this.retryCount = 0;
      });
    }

    return this.instance;
  }
}

// Initialize Redis client
const redisClient = RedisClient.getInstance();

// In-memory fallback cache for when Redis is unavailable
const memoryCache = new Map<string, { data: any; expiry: number }>();

export async function cacheData(key: string, data: any, expireTime = 3600): Promise<boolean> {
  try {
    await redisClient.setex(key, expireTime, JSON.stringify(data));
    return true;
  } catch (error) {
    console.warn('Redis cache failed, using memory cache:', error);
    // Fallback to in-memory cache
    memoryCache.set(key, {
      data,
      expiry: Date.now() + (expireTime * 1000),
    });
    return true;
  }
}

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.warn('Redis get failed, checking memory cache:', error);
    // Check in-memory cache
    const cached = memoryCache.get(key);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }
    if (cached) {
      memoryCache.delete(key); // Clean up expired cache
    }
    return null;
  }
}

// Clean up expired memory cache periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of memoryCache.entries()) {
    if (value.expiry <= now) {
      memoryCache.delete(key);
    }
  }
}, 60000); // Clean up every minute

export default redisClient;