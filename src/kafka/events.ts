import { producer } from "./producer.js";

export const publishClickEvent = async (payload: {
  shortCode: string;
  clickedAt: Date;
  userAgent?: string;
  ipAddress?: string;
}) => {
  await producer.send({
    topic: "url-clicks",
    messages: [{ value: JSON.stringify(payload) }],
  });
};
