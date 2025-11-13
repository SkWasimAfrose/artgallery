import type { Types } from "mongoose";

export type GalleryImage = {
  publicId: string;
  url: string;
  width: number;
  height: number;
  alt?: string;
  dominantColor?: string;
};

export type Gallery = {
  _id?: Types.ObjectId;
  slug: string;
  title: string;
  description: string;
  heroImage: GalleryImage;
  images: GalleryImage[];
  categories: string[];
  eventDate?: Date;
  location?: string;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type BookingStatus = "new" | "viewed" | "in_progress" | "confirmed" | "archived";

export type Booking = {
  _id?: Types.ObjectId;
  coupleName: string;
  email: string;
  phone?: string;
  eventDate: Date;
  eventLocation: string;
  servicesInterested: string[];
  message?: string;
  status: BookingStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ContactSubmission = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export type Settings = {
  _id?: Types.ObjectId;
  heroTagline: string;
  heroDescription: string;
  servicesCopy: string;
  testimonials: {
    quote: string;
    name: string;
    location?: string;
  }[];
  socials: {
    label: string;
    href: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
};
