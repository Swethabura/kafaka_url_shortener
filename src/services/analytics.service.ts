import { ClickEvents } from "../models/ClickEvent.js";

export const getAnalyticsByShortCode = async (shortCode: string) => {
  const totalClicks = await ClickEvents.countDocuments({ shortCode });

  const uniqueVisitors = await ClickEvents.distinct("ipAddress", { shortCode });

  const lastClick = await ClickEvents.findOne({ shortCode })
    .sort({ clickedAt: -1 })
    .lean();

  return {
    shortCode,
    totalClicks,
    uniqueVisitors: uniqueVisitors.length,
    lastClickedAt: lastClick?.clickedAt ?? null,
  };
};
