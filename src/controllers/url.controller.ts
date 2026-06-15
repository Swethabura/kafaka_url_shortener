import { asyncHandler } from "../utils/asyncHandler.js";
import { Request, Response } from "express";
import { createUrlSchema } from "../validators/url.validator.js";
import { ApiError } from "../utils/ApiError.js";
import { createShortUrl, getUrlByShortCode } from "../services/url.service.js";
import { sendResponse } from "../utils/ApiResponse.js";
import logger from "../utils/logger.js";
import { Url } from "../models/Url.js";
import { publishClickEvent } from "../kafka/events.js";

export const createUrl = asyncHandler(async (req: Request, res: Response) => {
  const validation = createUrlSchema.safeParse(req.body);

  if (!validation.success) {
    throw new ApiError(
      400,
      validation.error.issues[0]?.message || "Invalid request",
    );
  }

  const url = await createShortUrl(validation.data.url);

  return sendResponse({
    res,
    success: true,
    statusCode: 201,
    message: "Short Url created Successfully",
    data: {
      id: url._id,
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
    },
  });
});

export const redirectToOriginalUrl = asyncHandler(
  async (req: Request, res: Response) => {
    const { shortCode } = req.params;

    const url = await getUrlByShortCode(shortCode);
    if (!url) {
      throw new ApiError(404, "Short Url not found");
    }

    logger.info(`Redirect served from ${url.source}`);

    await publishClickEvent({
      shortCode,
      clickedAt: new Date(),
      userAgent: req.get("user-agent"),
      ipAddress: req.ip
    });

    return res.redirect(url.originalUrl);
  },
);
