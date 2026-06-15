import { Document, model, Schema } from "mongoose";

export interface IClickEvent extends Document {
  shortCode: string;
  clickedAt: Date;
  userAgent?: string;
  ipAddress?: string;
}

const clickEventSchema = new Schema<IClickEvent>(
  {
    shortCode: {
      type: String,
      required: true,
      index: true,
    },
    clickedAt: {
      type: Date,
      required: true,
    },

    userAgent: {
      type: String,
    },

    ipAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const ClickEvents = model<IClickEvent>("ClickEvent", clickEventSchema);
