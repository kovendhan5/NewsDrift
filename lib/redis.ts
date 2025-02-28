import { Redis } from '@upstash/redis';
import { createClient } from 'redis';

let redis: Redis | any

// Add a fallback mechanism when Redis is unavailable
let redisAvailable = false;

// Try to initialize Redis client
try {
  if (process.env.REDIS_HOST && process.env.REDIS_PORT) {
    // Use standard Redis client
    redis = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    })
    
    // Set up event handlers
    redis.on('error', (err) => {
      console.error('Redis client error:', err);
      redisAvailable = false;
    });
    
    redis.on('connect', () => {
      console.log('Redis client connected');
      redisAvailable = true;
    });
    
    // Connect to Redis
    await redis.connect().catch(console.error)
  } else {
    console.warn('Redis configuration not found, caching disabled')
  }
} catch (error) {
  console.error('Failed to initialize Redis client:', error)
}

export async function cacheData<T>(key: string, data: T, ttl = 3600): Promise<void> {
  if (!redis || !redisAvailable) return
  
  try {
    await redis.set(key, JSON.stringify(data), { EX: ttl })
  } catch (error) {
    console.error('Redis caching error:', error)
    // Mark Redis as unavailable if we encounter an error
    redisAvailable = false;
  }
}

export async function getCachedData<T>(key: string): Promise<T | null> {
  if (!redis || !redisAvailable) return null
  
  try {
    const data = await redis.get(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Redis retrieval error:', error)
    // Mark Redis as unavailable if we encounter an error
    redisAvailable = false;
    return null
  }
}