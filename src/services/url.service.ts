import { nanoid } from "nanoid";
import { Url } from "../models/Url.js";
import { cacheUrl, getCachedUrl } from "./cache.service.js";

export const createShortUrl = async (originalUrl: string) => {
  const shortCode = nanoid(7);

  const url = await Url.create({
    originalUrl,
    shortCode,
  });

  return url;
};

export const getUrlByShortCode = async (shortCode: string) => {
  const cachedUrl = await getCachedUrl(shortCode);
  if (cachedUrl) {
    return {
      originalUrl: cachedUrl,
      source: "redis",
    };
  }
  const url = await Url.findOne({ shortCode });

  if (!url) {
    return null;
  }

  await cacheUrl(shortCode, url.originalUrl);

  return {
    originalUrl: url.originalUrl,
    source: "mongodb",
  };
};
