import { kafka } from "../config/kafka.js";
import logger from "../utils/logger.js";

export const consumer2 = kafka.consumer({
  groupId: "audit-group",
});

export const startConsumer2 = async (): Promise<void> => {
  await consumer2.connect();

  await consumer2.subscribe({
    topic: "url-clicks",
    fromBeginning: true,
  });

  await consumer2.run({
    eachMessage: async ({ topic, partition, message }) => {
    //   logger.info(`Consumer-2: ${message.value?.toString()}`);
    logger.info({
        topic,
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
    },
  });
};
