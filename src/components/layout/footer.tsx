import Link from "next/link";
import { siteConfig } from "@/config/site";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative mt-24 bg-charcoal-light/40 backdrop-blur">
      <div className="absolute inset-x-0 -top-10 flex justify-center">
        <div className="h-20 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
      </div>
      <div className="container-padding mx-auto max-w-7xl py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-6 text-ivory/80">
            <div className="space-y-2">
              <span className="inline-flex items-center rounded-full border border-gold/30 px-3 py-1 text-xs uppercase tracking-[0.3em] text-gold/80">
                Est. {currentYear - 8}
              </span>
              <h2 className="font-display text-3xl text-ivory">
                {siteConfig.name}
              </h2>
              <p className="max-w-lg text-sm leading-relaxed text-ivory/70">
                Cinematic wedding and event photography with bespoke albums,
                concierge planning, and immersive storytelling across India &
                destinations worldwide.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-ivory/50">
              <span>luxury weddings</span>
              <span>editorial portraits</span>
              <span>destination events</span>
              <span>fine-art albums</span>
            </div>
          </div>

          <div className="space-y-6 text-sm text-ivory/80">
            <div>
              <h3 className="text-xs uppercase tracking-[0.3em] text-gold/80">
                Studio
              </h3>
              <address className="mt-3 not-italic leading-relaxed text-ivory/70">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}, {siteConfig.address.region}
                <br />
                {siteConfig.address.postalCode}, {siteConfig.address.country}
              </address>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-[0.3em] text-gold/80">
                Contact
              </h3>
              <div className="flex flex-col gap-1">
                <Link
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="transition hover:text-gold"
                >
                  {siteConfig.contactEmail}
                </Link>
                <Link
                  href={`tel:${siteConfig.studioPhone}`}
                  className="transition hover:text-gold"
                >
                  {siteConfig.studioPhone}
                </Link>
                <Link
                  href="/booking"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-charcoal shadow-lg shadow-gold/30 transition hover:bg-gold-light"
                >
                  Book Your Date
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-sm text-ivory/80">
            <div>
              <h3 className="text-xs uppercase tracking-[0.3em] text-gold/80">
                Follow
              </h3>
              <ul className="mt-3 space-y-2">
                {siteConfig.social.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-between gap-4 rounded-full border border-ivory/10 px-4 py-2 transition hover:border-gold hover:text-gold"
                    >
                      <span>{item.label}</span>
                      <span className="text-xs uppercase tracking-[0.3em] text-ivory/40">
                        @luminaatelier
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {siteConfig.whatsappNumber && (
              <div className="rounded-3xl border border-gold/20 bg-charcoal/40 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-gold/80">
                  Concierge WhatsApp
                </p>
                <Link
                  href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm text-ivory transition hover:text-gold"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold">
                    WA
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-xs uppercase tracking-[0.2em] text-ivory/50">
                      Available 10am - 7pm IST
                    </span>
                    <span className="font-medium">
                      Say hello on WhatsApp
                    </span>
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-ivory/40 sm:flex-row">
          <span>
            © {currentYear} {siteConfig.name}. Crafted for the modern romantic.
          </span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-gold">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
