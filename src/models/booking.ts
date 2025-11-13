import { Schema, model, models } from "mongoose";
import type { Booking } from "@/types";

const bookingSchema = new Schema<Booking>(
  {
    coupleName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    eventDate: { type: Date, required: true },
    eventLocation: { type: String, required: true },
    servicesInterested: { type: [String], default: [] },
    message: { type: String },
    status: {
      type: String,
      enum: ["new", "viewed", "in_progress", "confirmed", "archived"],
      default: "new",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "bookings",
  },
);

export const BookingModel = models.Booking || model<Booking>("Booking", bookingSchema);

export default BookingModel;
