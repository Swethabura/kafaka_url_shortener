import { redisClient } from "../config/redis.js";

export const getCachedUrl = async (
  shortCode: string,
): Promise<string | null> => {
  return redisClient.get(`url:${shortCode}`);
};

export const cacheUrl = async (
  shortCode: string,
  originalUrl: string,
): Promise<void> => {
  await redisClient.set(`url:${shortCode}`, originalUrl, {
    EX: 60 * 60,
  });
};
