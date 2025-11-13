import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendEmail } from "@/lib/email";
import { siteConfig } from "@/config/site";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);

  if (!json) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const parseResult = contactSchema.safeParse(json);

  if (!parseResult.success) {
    const issues = parseResult.error.flatten();
    return NextResponse.json({ error: "Validation failed.", issues }, { status: 422 });
  }

  const data = parseResult.data;

  try {
    await sendEmail({
      to: siteConfig.contactEmail,
      subject: `Contact enquiry from ${data.name}`,
      replyTo: data.email,
      text: createPlainTextMessage(data),
      html: createHtmlMessage(data),
    });

    return NextResponse.json({ message: "Enquiry sent successfully." });
  } catch (error) {
    console.error("Failed to send contact enquiry email.", error);
    return NextResponse.json(
      {
        error: "Unable to send enquiry at this time. Please try again later.",
      },
      { status: 503 },
    );
  }
}

function createPlainTextMessage(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  return `New contact enquiry\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone ?? "N/A"}\n\nMessage:\n${data.message}`;
}

function createHtmlMessage(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  return `
    <h2 style="font-family: 'Helvetica Neue', Arial, sans-serif;">New contact enquiry</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone ?? "N/A"}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, "<br/>")}</p>
  `;
}
