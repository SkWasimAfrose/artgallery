import { z } from "zod";

export const bookingSchema = z.object({
  coupleName: z.string().min(2, "Please provide full names."),
  email: z.string().email("Enter a valid email address."),
  phone: z
    .string()
    .optional()
    .refine((value) => !value || value.replace(/\D/g, "").length >= 10, {
      message: "Provide a valid phone number.",
    }),
  eventDate: z.string().min(1, "Event date is required."),
  eventLocation: z.string().min(3, "Location must be at least 3 characters."),
  servicesInterested: z.array(z.string()).min(1, "Select at least one service."),
  message: z
    .string()
    .max(1500, "Message is too long (max 1500 characters).")
    .optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z
    .string()
    .optional()
    .refine((value) => !value || value.replace(/\D/g, "").length >= 10, {
      message: "Provide a valid phone number.",
    }),
  message: z.string().min(10, "Please share a few details about your enquiry."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
