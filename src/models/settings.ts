import { Schema, model, models } from "mongoose";
import type { Settings } from "@/types";

const testimonialSchema = new Schema(
  {
    quote: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String },
  },
  { _id: false },
);

const socialSchema = new Schema(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
  },
  { _id: false },
);

const settingsSchema = new Schema<Settings>(
  {
    heroTagline: { type: String, required: true },
    heroDescription: { type: String, required: true },
    servicesCopy: { type: String, required: true },
    testimonials: { type: [testimonialSchema], default: [] },
    socials: { type: [socialSchema], default: [] },
  },
  {
    timestamps: true,
    collection: "settings",
  },
);

export const SettingsModel = models.Settings || model<Settings>("Settings", settingsSchema);

export default SettingsModel;
