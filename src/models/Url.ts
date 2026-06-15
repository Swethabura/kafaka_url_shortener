import { Document, model, Schema } from "mongoose";

export interface IUrl extends Document {
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const urlSchema = new Schema<IUrl>(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Url = model<IUrl>("Url", urlSchema);
