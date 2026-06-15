import { z } from "zod";
import logger from "../utils/logger.js";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(5000),

  MONGO_URI: z.string().min(1),

  REDIS_URL: z.string().min(1),

  KAFKA_CLIENT_ID: z.string().min(1),

  KAFKA_BROKER: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  logger.error(parsed.error.format(), "Invalid Environment Variables");
  process.exit(1);
}

export const env = parsed.data;
