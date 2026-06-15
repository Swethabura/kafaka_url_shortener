import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getAnalyticsByShortCode } from "../services/analytics.service.js";
import { sendResponse } from "../utils/ApiResponse.js";

export const getAnalytics = asyncHandler(
  async (req: Request, res: Response) => {
    const { shortCode } = req.params;

    const analytics = await getAnalyticsByShortCode(shortCode);

    return sendResponse({
      res,
      success: true,
      statusCode: 200,
      message: "Analytics fetched successfully",
      data: analytics,
    });
  },
);
