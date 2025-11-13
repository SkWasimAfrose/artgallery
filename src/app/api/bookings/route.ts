import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import BookingModel from "@/models/booking";
import { bookingSchema } from "@/lib/validation";
import { sendEmail } from "@/lib/email";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import { addMockBooking } from "@/data/mock-data";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);

  if (!json) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const parseResult = bookingSchema.safeParse(json);

  if (!parseResult.success) {
    const issues = parseResult.error.flatten();
    return NextResponse.json({ error: "Validation failed.", issues }, { status: 422 });
  }

  const data = parseResult.data;

  try {
    await connectToDatabase();

    const bookingDoc = await BookingModel.create({
      coupleName: data.coupleName,
      email: data.email,
      phone: data.phone,
      eventDate: new Date(data.eventDate),
      eventLocation: data.eventLocation,
      servicesInterested: data.servicesInterested,
      message: data.message,
      status: "new",
    });

    await sendEmail({
      to: siteConfig.contactEmail,
      subject: `New booking enquiry from ${data.coupleName}`,
      replyTo: data.email,
      text: createPlainTextMessage(data),
      html: createHtmlMessage(data),
    });

    const whatsappLink = buildWhatsAppLink({
      phoneNumberE164: siteConfig.whatsappNumber,
      message: `Hi Lumina Atelier, ${data.coupleName} submitted a booking enquiry for ${data.eventDate}.`,
    });

    return NextResponse.json({
      data: {
        id: bookingDoc._id.toString(),
        whatsappLink,
      },
    });
  } catch (error) {
    console.error("Failed to persist booking. Falling back to mock store.", error);

    const mockBooking = await addMockBooking({
      coupleName: data.coupleName,
      email: data.email,
      phone: data.phone,
      eventDate: new Date(data.eventDate),
      eventLocation: data.eventLocation,
      servicesInterested: data.servicesInterested,
      message: data.message,
      status: "new",
    });

    return NextResponse.json(
      {
        data: {
          id: mockBooking.email,
          fallback: true,
        },
      },
      { status: 202 },
    );
  }
}

function createPlainTextMessage(data: {
  coupleName: string;
  email: string;
  phone?: string;
  eventDate: string;
  eventLocation: string;
  servicesInterested: string[];
  message?: string;
}) {
  return `New booking enquiry\n\nCouple: ${data.coupleName}\nEmail: ${data.email}\nPhone: ${
    data.phone ?? "N/A"
  }\nEvent Date: ${data.eventDate}\nEvent Location: ${data.eventLocation}\nServices Interested: ${
    data.servicesInterested.join(", ")
  }\n\nMessage:\n${data.message ?? "(none)"}`;
}

function createHtmlMessage(data: {
  coupleName: string;
  email: string;
  phone?: string;
  eventDate: string;
  eventLocation: string;
  servicesInterested: string[];
  message?: string;
}) {
  return `
    <h2 style="font-family: 'Helvetica Neue', Arial, sans-serif;">New booking enquiry</h2>
    <p><strong>Couple:</strong> ${data.coupleName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone ?? "N/A"}</p>
    <p><strong>Event Date:</strong> ${data.eventDate}</p>
    <p><strong>Event Location:</strong> ${data.eventLocation}</p>
    <p><strong>Services Interested:</strong> ${data.servicesInterested.join(", ")}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message ? data.message.replace(/\n/g, "<br/>") : "(none)"}</p>
  `;
}
