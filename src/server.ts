import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { connectKafka } from "./config/kafka.js";
import { connectRedis } from "./config/redis.js";
import { createTopics } from "./kafka/admin.js";
import { startConsumer } from "./kafka/consumer.js";
import { startConsumer2 } from "./kafka/consumer2.js";
import { producer } from "./kafka/producer.js";
import logger from "./utils/logger.js";

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    await connectRedis();

    await connectKafka();

    await createTopics();

    await producer.connect();

    await startConsumer();

    await startConsumer2();

    logger.info("Kafka producer connected");

    app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error(error, "Failed to start server");

    process.exit(1);
  }
};

startServer();
