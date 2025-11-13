import Link from "next/link";
import { siteConfig } from "@/config/site";

export type BookingCTAProps = {
  title?: string;
  description?: string;
  className?: string;
};

export function BookingCTA({
  title = "Reserve your celebration",
  description = "Share your vision with our concierge team and receive a tailored photography proposal within 24 hours.",
  className,
}: BookingCTAProps) {
  const whatsappHref = siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hi Lumina Atelier, we're excited to inquire about photography!",
      )}`
    : undefined;

  return (
    <section
      className={`relative overflow-hidden rounded-4xl border border-gold/25 bg-gradient-to-br from-charcoal-light/60 via-charcoal to-charcoal-light/80 p-10 shadow-[0_60px_120px_-60px_rgba(198,156,109,0.45)] lg:p-16 ${className ?? ""}`}
    >
      <div className="absolute inset-0 opacity-[0.12]" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(198,156,109,0.45),transparent_55%)]" />
      </div>
      <div className="relative flex flex-col gap-8 text-ivory lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex items-center rounded-full border border-gold/30 px-3 py-1 text-xs uppercase tracking-[0.3em] text-gold/80">
            Bespoke enquiries only
          </span>
          <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
          <p className="max-w-xl text-base leading-relaxed text-ivory/75">{description}</p>
        </div>
        <div className="flex flex-col gap-4 text-sm uppercase tracking-[0.24em]">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-gold px-8 py-3 font-semibold text-charcoal shadow-xl shadow-gold/30 transition hover:bg-gold-light"
          >
            Book Your Consultation
          </Link>
          {whatsappHref && (
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-ivory/20 px-8 py-3 text-ivory transition hover:border-gold hover:text-gold"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-gold">
                WA
              </span>
              WhatsApp Concierge
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default BookingCTA;
