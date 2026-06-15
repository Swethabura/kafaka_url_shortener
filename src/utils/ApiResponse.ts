import { Response } from "express";
import { success } from "zod";

type SendResponseProps<T> = {
  res: Response;
  statusCode?: number;
  success: boolean;
  message: string;
  data?: T;
};

export const sendResponse = <T>({
  res,
  statusCode = 200,
  success,
  message,
  data,
}: SendResponseProps<T>) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};
