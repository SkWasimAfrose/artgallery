import nodemailer from "nodemailer";

const {
  GMAIL_USER,
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN,
} = process.env;

if (!GMAIL_USER || !GMAIL_CLIENT_ID || !GMAIL_CLIENT_SECRET || !GMAIL_REFRESH_TOKEN) {
  throw new Error("Missing Gmail OAuth2 environment variables for email sending.");
}

export type SendEmailOptions = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export async function sendEmail(options: SendEmailOptions) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: GMAIL_USER,
      clientId: GMAIL_CLIENT_ID,
      clientSecret: GMAIL_CLIENT_SECRET,
      refreshToken: GMAIL_REFRESH_TOKEN,
    },
  });

  await transporter.sendMail({
    from: `Lumina Atelier <${GMAIL_USER}>`,
    ...options,
  });
}
