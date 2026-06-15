import { kafka } from "../config/kafka.js";
import { ClickEvents } from "../models/ClickEvent.js";
import logger from "../utils/logger.js";

export const consumer = kafka.consumer({
  groupId: "analytics-group",
});

export const startConsumer = async (): Promise<void> => {
  await consumer.connect();

  logger.info("Kafka consumer connected");

  await consumer.subscribe({
    topic: "url-clicks",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // logger.info({
      //   topic,
      //   partition,
      //   offset: message.offset,
      //   value: message.value?.toString(),
      // });
      const payload = JSON.parse(message.value?.toString() || "{}");

      if (!payload.shortCode || !payload.clickedAt) {
        logger.warn("Skipping malformed event");

        return;
      }

      await ClickEvents.create(payload);

      logger.info(`Analytics saved for ${payload.shortCode}`);
    },
  });
};
