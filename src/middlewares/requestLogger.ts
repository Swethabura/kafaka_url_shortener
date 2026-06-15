import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger.js";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info({
      method: req.method,
      url: req.originalUrl,
      path: req.path,
      statusCode: res.statusCode,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });
  });

  next();
};
