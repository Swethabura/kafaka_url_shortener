import { createClient } from "redis";
import { env } from "./env.js";
import logger from "../utils/logger.js";

export const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on("error", (err) => {
  logger.error(err, "Redis error");
});

export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();

    logger.info("Redis connected successfully");
  } catch (error) {
    logger.error(error, "Redis connection failed");

    process.exit(1);
  }
};
