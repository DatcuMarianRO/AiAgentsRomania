import Redis from 'ioredis';
import logger from './logger';

// Configure Redis client
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = new Redis(redisUrl, {
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

// Handle Redis errors
redisClient.on('error', (err) => {
  logger.error('Redis error', { error: err.message });
});

// Handle successful connection
redisClient.on('connect', () => {
  logger.info('Connected to Redis');
});

/**
 * Set a key with value and optional expiration
 * @param key Cache key
 * @param value Value to cache
 * @param expiryInSeconds Expiration time in seconds
 */
export const setCache = async (key: string, value: any, expiryInSeconds?: number): Promise<void> => {
  try {
    const serializedValue = JSON.stringify(value);
    
    if (expiryInSeconds) {
      await redisClient.set(key, serializedValue, 'EX', expiryInSeconds);
    } else {
      await redisClient.set(key, serializedValue);
    }
  } catch (error) {
    logger.error('Error setting cache', { key, error });
  }
};

/**
 * Get a value from cache by key
 * @param key Cache key
 * @returns Cached value or null if not found
 */
export const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    const cachedValue = await redisClient.get(key);
    if (!cachedValue) return null;
    
    return JSON.parse(cachedValue) as T;
  } catch (error) {
    logger.error('Error getting from cache', { key, error });
    return null;
  }
};

/**
 * Remove a key from cache
 * @param key Cache key
 */
export const deleteCache = async (key: string): Promise<void> => {
  try {
    await redisClient.del(key);
  } catch (error) {
    logger.error('Error deleting from cache', { key, error });
  }
};

/**
 * Remove keys matching a pattern
 * @param pattern Pattern to match (e.g., "user:*")
 */
export const deleteCachePattern = async (pattern: string): Promise<void> => {
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(...keys);
    }
  } catch (error) {
    logger.error('Error deleting cache pattern', { pattern, error });
  }
};

/**
 * Get or set cache with callback function
 * @param key Cache key
 * @param callback Function to call if cache miss
 * @param expiryInSeconds Expiration time in seconds
 * @returns Cached or fresh value
 */
export const getOrSetCache = async <T>(
  key: string, 
  callback: () => Promise<T>,
  expiryInSeconds = 3600
): Promise<T> => {
  try {
    // Try to get from cache first
    const cachedValue = await getCache<T>(key);
    if (cachedValue !== null) {
      return cachedValue;
    }

    // If not in cache, get fresh value
    const freshValue = await callback();
    
    // Cache the fresh value
    await setCache(key, freshValue, expiryInSeconds);
    
    return freshValue;
  } catch (error) {
    logger.error('Error in getOrSetCache', { key, error });
    // If caching fails, still return the fresh value from callback
    return callback();
  }
};

export default redisClient;