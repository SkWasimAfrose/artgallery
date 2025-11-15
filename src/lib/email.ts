import nodemailer from "nodemailer";

const { GMAIL_USER, GMAIL_APP_PASSWORD, GMAIL_SMTP_HOST, GMAIL_SMTP_PORT } = process.env;

if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  throw new Error("Missing Gmail SMTP credentials for email sending.");
}

const smtpHost = GMAIL_SMTP_HOST ?? "smtp.gmail.com";
const smtpPort = Number(GMAIL_SMTP_PORT ?? "465");
const useSecureConnection = smtpPort === 465;

export type SendEmailOptions = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export async function sendEmail(options: SendEmailOptions) {
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: useSecureConnection,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `Lumina Atelier <${GMAIL_USER}>`,
    ...options,
  });
}
