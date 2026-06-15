import { kafka } from "../config/kafka.js";
import logger from "../utils/logger.js";

export const createTopics = async (): Promise<void> => {
  const admin = kafka.admin();

  try {
    await admin.connect();

    const topics = await admin.listTopics();

    if (!topics.includes("url-clicks")) {
      await admin.createTopics({
        topics: [
          {
            topic: "url-clicks",
            numPartitions: 1,
            replicationFactor: 1,
          },
        ],
      });

      logger.info("Topic created: url-clicks");
    } else {
      logger.info("Topics already exists: url-clicks");
    }

    await admin.disconnect();
  } catch (error) {
    logger.error(error, "Failed creating topics");
    throw error;
  }
};
