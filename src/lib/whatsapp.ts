type WhatsAppLinkOptions = {
  phoneNumberE164: string;
  message?: string;
};

const DEFAULT_WHATSAPP_MESSAGE =
  "Hi Lumina Atelier! We're excited to inquire about photography services.";

export function buildWhatsAppLink({
  phoneNumberE164,
  message = DEFAULT_WHATSAPP_MESSAGE,
}: WhatsAppLinkOptions) {
  if (!phoneNumberE164.startsWith("+")) {
    throw new Error("WhatsApp phone numbers must be in E.164 format (start with '+').");
  }

  const digitsOnly = phoneNumberE164.replace(/\D/g, "");
  const searchParams = new URLSearchParams({
    text: message,
  });

  return `https://wa.me/${digitsOnly}?${searchParams.toString()}`;
}
