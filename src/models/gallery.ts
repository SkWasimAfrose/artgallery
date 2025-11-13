import { Schema, model, models } from "mongoose";
import type { Gallery } from "@/types";

const galleryImageSchema = new Schema(
  {
    publicId: { type: String, required: true },
    url: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    alt: { type: String },
    dominantColor: { type: String },
  },
  { _id: false },
);

const gallerySchema = new Schema<Gallery>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    heroImage: { type: galleryImageSchema, required: true },
    images: { type: [galleryImageSchema], default: [] },
    categories: { type: [String], default: [] },
    eventDate: { type: Date },
    location: { type: String },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "galleries",
  },
);

export const GalleryModel = models.Gallery || model<Gallery>("Gallery", gallerySchema);

export default GalleryModel;
