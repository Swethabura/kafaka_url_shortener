import { Kafka } from "kafkajs";
import { env } from "./env.js";
import logger from "../utils/logger.js";

export const kafka = new Kafka({
  clientId: env.KAFKA_CLIENT_ID,
  brokers: [env.KAFKA_BROKER],
});

// console.log(env.KAFKA_BROKER);

export const connectKafka = async (): Promise<void> => {
  const admin = kafka.admin();

  try {
    await admin.connect();

    logger.info("Kafka connected successfully");

    await admin.disconnect();
  } catch (error) {
    logger.error(error, "Kafka connection failed");

    process.exit(1);
  }
};
