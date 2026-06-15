import { Router } from "express";
import { producer } from "../kafka/producer.js";
import logger from "../utils/logger.js";

const router = Router();

router.post("/produce", async (_, res) => {
  const result = await producer.send({
    topic: "url-clicks",
    messages: [
      {
        value: JSON.stringify({
          message: "hello kafka",
          timestamp: new Date(),
        }),
      },
    ],
  });
  
  logger.info(result)

  return res.status(200).json({
    success: true,
    message: "Message published",
  });
});

export default router;