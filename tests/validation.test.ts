import { describe, expect, it } from "vitest";
import { bookingSchema, contactSchema } from "@/lib/validation";

describe("bookingSchema", () => {
  it("rejects submissions without required fields", () => {
    const result = bookingSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.coupleName).toBeDefined();
      expect(result.error.flatten().fieldErrors.eventLocation).toBeDefined();
    }
  });

  it("accepts a valid payload", () => {
    const result = bookingSchema.safeParse({
      coupleName: "Ishita & Vihaan",
      email: "hello@example.com",
      phone: "+91 98765 43210",
      eventDate: "2025-01-15",
      eventLocation: "Lake Como, Italy",
      servicesInterested: ["Signature Wedding Weekend"],
      message: "We are planning a three-day celebration.",
    });

    expect(result.success).toBe(true);
  });
});

describe("contactSchema", () => {
  it("requires a message with minimum length", () => {
    const result = contactSchema.safeParse({
      name: "Aanya",
      email: "aanya@example.com",
      message: "Too short",
    });

    expect(result.success).toBe(false);
  });

  it("accepts valid contact enquiry", () => {
    const result = contactSchema.safeParse({
      name: "Rajiv",
      email: "rajiv@example.com",
      phone: "+44 7700 900123",
      message: "We would love to learn more about destination coverage options.",
    });

    expect(result.success).toBe(true);
  });
});
