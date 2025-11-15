import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { siteConfig } from "@/config/site";
import { GalleryCard } from "@/components/cards/gallery-card";
import { ServiceCard } from "@/components/cards/service-card";
import { BookingCTA } from "@/components/cta/booking-cta";

const heroImages = [
  {
    src: "https://res.cloudinary.com/bae2g/image/upload/f_auto,q_auto,w_640,h_800,c_fill,g_auto:subject/v1763238998/R_mokuo8.jpg",
    alt: "Bride and groom dancing under a canopy of lights",
  },
  {
    src: "https://res.cloudinary.com/bae2g/image/upload/f_auto,q_auto,w_640,h_800,c_fill,g_auto:subject/v1763232902/a3e4fbea4e1dd46e2a19ad7111cc7de0_vccgr8.jpg",
    alt: "Editorial couple portrait posed in a regal hallway",
  },
  {
    src: "https://res.cloudinary.com/bae2g/image/upload/f_auto,q_auto,w_640,h_800,c_fill,g_auto:subject/v1763239101/sangeet_ecxlya.jpg",
    alt: "Sangeet celebration captured with vibrant motion blur",
  },
];

const testimonials = [
  {
    quote:
      "Every frame is a work of art. They orchestrated the wedding day with such grace and left us with heirlooms we'll cherish forever.",
    name: "Ishita & Vihaan",
    location: "Udaipur, India",
  },
  {
    quote:
      "From the planning calls to the final album, the experience was pure luxury. The cinematic film brought our families to tears.",
    name: "Nadia & Omar",
    location: "Doha, Qatar",
  },
];

const galleryHighlights = [
  {
    title: "Royal Jaipur Palace",
    description: "A three-day celebration with couture fashion and candlelit soirées.",
    image:
      "https://res.cloudinary.com/bae2g/image/upload/f_auto,q_auto,w_680,h_520,c_fill,g_auto:subject/v1763239276/jaipur_yuuwwc.webp",
    href: "/portfolio/royal-jaipur-palace",
    badge: "Featured",
  },
  {
    title: "Maldives Sunrise Vows",
    description: "An intimate beachfront ceremony with champagne sail-away brunch.",
    image:
      "https://res.cloudinary.com/bae2g/image/upload/f_auto,q_auto,w_680,h_520,c_fill,g_auto:subject/v1763239354/Maldives_nwmsox.webp",
    href: "/portfolio/maldives-sunrise-vows",
  },
  {
    title: "Lake Como Editorial",
    description: "A couture editorial framed by Italian villas and classic Riva boats.",
    image:
      "https://res.cloudinary.com/bae2g/image/upload/f_auto,q_auto,w_680,h_520,c_fill,g_auto:subject/v1763239490/italians_x42ast.jpg",
    href: "/portfolio/lake-como-editorial",
  },
];

const stats = [
  { label: "Destination Celebrations", value: "120+" },
  { label: "Years Crafting Stories", value: "9" },
  { label: "Average Team Size", value: "6" },
  { label: "Delivery Timeline", value: "4 Weeks" },
];

const services = [
  {
    title: "Signature Wedding Weekend",
    description:
      "Comprehensive coverage across multi-day celebrations with dedicated photography, cinematography, and styling teams.",
    priceFrom: "₹4.8L",
    features: [
      "3-day coverage with 6 artists",
      "48-hour highlight preview",
      "Leather-bound fine-art album",
    ],
    href: "/services#signature-weekend",
    highlight: true,
  },
  {
    title: "Destination Elopements",
    description:
      "Intimate storytelling crafted for couples celebrating across idyllic landscapes worldwide.",
    priceFrom: "₹2.1L",
    features: ["Full-day editorial coverage", "Fine-art film scans", "Travel concierge"],
    href: "/services#destination-elopements",
  },
  {
    title: "Luxury Events & Galas",
    description:
      "High-profile celebrations with emphasis on guest experience, décor, and captivating editorial moments.",
    priceFrom: "₹3.6L",
    features: ["Dual lead photographers", "Same-week cinematic reel", "24-hour on-site editor"],
    href: "/services#luxury-events",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-28">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8efe4] via-[#f2dcc3] to-[#f9f3ea]" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(210,160,110,0.28),transparent_55%),radial-gradient(circle_at_85%_5%,rgba(255,236,210,0.24),transparent_58%),linear-gradient(195deg,rgba(30,24,20,0.45),rgba(30,24,20,0.05) 55%,rgba(255,255,255,0))]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute right-12 top-28 h-56 w-56 rounded-full bg-ivory/20 blur-3xl" />
          <div className="absolute left-1/2 bottom-16 h-44 w-44 -translate-x-1/2 rounded-full border border-gold/25 opacity-70" />
          <div className="absolute left-[18%] top-1/3 h-28 w-28 rounded-full border border-ivory/20 opacity-70" />
          <div className="absolute right-[22%] bottom-28 h-20 w-20 rounded-full border border-ivory/25 opacity-60" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-24 pt-24 sm:px-6 lg:flex-row lg:items-center lg:px-8 lg:py-32">
          <div className="max-w-2xl space-y-8 text-ivory">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-charcoal/50 px-4 py-2 text-xs uppercase tracking-[0.35em] text-gold/80">
              <span>Wedding Cinema</span>
              <span className="h-1 w-1 rounded-full bg-gold/80" />
              <span>Editorial Portraiture</span>
            </div>
            <h1 className="text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Cinematic wedding & event storytelling for the modern romantic.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-ivory/80">
              {siteConfig.description} Our bespoke team crafts immersive visual narratives across destination weddings, multi-day celebrations, and couture editorials.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-charcoal shadow-xl shadow-gold/30 transition hover:bg-gold-light"
              >
                Begin Your Journey
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-6 py-3 text-sm uppercase tracking-[0.24em] text-ivory transition hover:border-gold hover:text-gold"
              >
                View Portfolio
              </Link>
            </div>

            <dl className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <Fragment key={stat.label}>
                  <dt className="text-xs uppercase tracking-[0.3em] text-ivory/50">
                    {stat.label}
                  </dt>
                  <dd className="text-3xl font-display text-gold">
                    {stat.value}
                  </dd>
                </Fragment>
              ))}
            </dl>
          </div>

          <div className="flex flex-1 justify-center lg:justify-end">
            <div className="grid max-w-xl grid-cols-3 gap-4 sm:gap-6">
              {heroImages.map(({ src, alt }) => (
                <div
                  key={src}
                  className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-ivory/10 bg-charcoal/60"
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 220px, 30vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-70" />
                  <span className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.25em] text-ivory/70">
                    Lumina Atelier
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-padding mx-auto max-w-6xl">
        <div className="rounded-4xl border border-gold/15 bg-charcoal-light/30 p-10 shadow-[0_40px_100px_-60px_rgba(255,255,255,0.5)] lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full border border-gold/30 px-3 py-1 text-xs uppercase tracking-[0.3em] text-gold/80">
                Revered by couples worldwide
              </span>
              <h2 className="font-display text-3xl text-ivory sm:text-4xl">
                "They preserved the laughter, the tears, and the soul of our celebration."
              </h2>
              <p className="text-ivory/70">
                From palace weddings in Rajasthan to private islands in the Maldives, Lumina Atelier captures authentic emotion with a refined editorial aesthetic.
              </p>
              <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-ivory/40">
                <span>Full production team</span>
                <span>Same-week preview gallery</span>
                <span>Bespoke fine-art albums</span>
              </div>
            </div>

            <div className="grid gap-6">
              {testimonials.map((testimonial) => (
                <blockquote
                  key={testimonial.name}
                  className="rounded-3xl border border-ivory/10 bg-charcoal/40 p-6 text-ivory shadow-lg shadow-black/20"
                >
                  <p className="text-lg leading-relaxed text-ivory/80">
                    “{testimonial.quote}”
                  </p>
                  <footer className="mt-4 text-sm uppercase tracking-[0.25em] text-gold/80">
                    {testimonial.name} — {testimonial.location}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-padding mx-auto max-w-7xl pb-24">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.3em] text-gold/70">
              Featured Galleries
            </span>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="max-w-2xl font-display text-4xl text-ivory">
                Immerse yourself in multi-day celebrations curated for legacy.
              </h2>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-6 py-3 text-xs uppercase tracking-[0.3em] text-ivory transition hover:border-gold hover:text-gold"
              >
                Explore Collection
              </Link>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {galleryHighlights.map((gallery) => (
              <GalleryCard
                key={gallery.title}
                title={gallery.title}
                description={gallery.description}
                image={{ src: gallery.image, alt: gallery.title }}
                href={gallery.href}
                badge={gallery.badge}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="container-padding mx-auto max-w-7xl pb-24">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.3em] text-gold/70">
              Signature Offerings
            </span>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="max-w-2xl font-display text-4xl text-ivory">
                Tailored experiences designed for uncompromising celebrations.
              </h2>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-6 py-3 text-xs uppercase tracking-[0.3em] text-ivory transition hover:border-gold hover:text-gold"
              >
                View All Services
              </Link>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                priceFrom={service.priceFrom}
                features={service.features}
                href={service.href}
                highlight={service.highlight}
              />
            ))}
          </div>
        </div>
      </section>

      <BookingCTA className="container-padding mx-auto mb-32 max-w-6xl" />
    </div>
  );
}
