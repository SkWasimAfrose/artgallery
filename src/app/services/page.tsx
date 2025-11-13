import Link from "next/link";
import Image from "next/image";
import { ServiceCard } from "@/components/cards/service-card";
import { BookingCTA } from "@/components/cta/booking-cta";

const services = [
  {
    title: "Signature Wedding Weekend",
    description:
      "Comprehensive coverage across welcome soirées, ceremonies, and finales with dedicated photography, cinematography, and on-site editing teams.",
    priceFrom: "₹4.8L",
    features: [
      "3-day coverage with 6-8 artists",
      "48-hour highlight preview",
      "Heirloom album & fine-art prints",
    ],
    highlight: true,
  },
  {
    title: "Destination Elopements",
    description:
      "Intimately crafted storytelling for couples celebrating in idyllic destinations around the globe.",
    priceFrom: "₹2.1L",
    features: ["Full-day editorial coverage", "Film + digital capture", "Travel concierge"],
  },
  {
    title: "Luxury Events & Galas",
    description:
      "High-profile celebrations centered on guest experience, immersive décor, and captivating editorial imagery.",
    priceFrom: "₹3.6L",
    features: ["Dual lead photographers", "Same-week cinematic reel", "24-hour on-site editor"],
  },
  {
    title: "Cinematic Film Production",
    description:
      "Documentary-style wedding films with original sound design, aerial coverage, and color-graded finishing.",
    priceFrom: "₹2.8L",
    features: ["Storyboarding workshops", "4K multi-cam team", "Custom score licensing"],
  },
  {
    title: "Fine-art Album Design",
    description:
      "Bespoke album collections with museum-grade printing, handcrafted covers, and archival presentation boxes.",
    priceFrom: "₹95K",
    features: ["Italian leather & silk options", "Parent album suites", "White-glove delivery"],
  },
  {
    title: "Editorial Portrait Sessions",
    description:
      "Fashion-forward portraiture for engagements, anniversaries, and personal milestones with couture styling.",
    priceFrom: "₹1.2L",
    features: ["Creative direction & styling", "Studio or on-location", "Look book delivery"],
  },
];

const productionPillars = [
  {
    title: "Concierge Planning",
    description:
      "Dedicated producers orchestrate vendor collaboration, shot lists, and travel logistics for seamless experiences.",
  },
  {
    title: "Creative Direction",
    description:
      "Story-driven moodboards, couture styling partnerships, and lighting design to elevate every frame.",
  },
  {
    title: "Artisanal Delivery",
    description:
      "Hand-edited galleries, cinematic films, and heirloom albums curated to relive your celebration for generations.",
  },
];

const trustedPartners = [
  "Event Producers",
  "Couture Stylists",
  "Floristry Houses",
  "Cinematographers",
  "Sound Designers",
  "Travel Managers",
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-24 pb-32">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,156,109,0.22),transparent_55%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-28 pt-24 sm:px-6 lg:flex-row lg:items-center lg:px-8 lg:py-32">
          <div className="max-w-2xl space-y-8 text-ivory">
            <span className="inline-flex items-center rounded-full border border-gold/40 bg-charcoal/50 px-4 py-2 text-xs uppercase tracking-[0.35em] text-gold/80">
              Services
            </span>
            <h1 className="text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Curated photography experiences for celebrations with soul.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-ivory/80">
              Every Lumina Atelier commission is built around your story. From multi-day destination weddings to couture portrait sessions, our team tailors production, creative direction, and delivery to reflect your legacy.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-charcoal shadow-xl shadow-gold/30 transition hover:bg-gold-light"
              >
                Reserve Your Date
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-6 py-3 text-sm uppercase tracking-[0.24em] text-ivory transition hover:border-gold hover:text-gold"
              >
                View Portfolio
              </Link>
            </div>
          </div>
          <div className="flex flex-1 justify-center lg:justify-end">
            <div className="relative h-[420px] w-[320px] overflow-hidden rounded-4xl border border-ivory/10 bg-charcoal/50 shadow-[0_50px_120px_-70px_rgba(198,156,109,0.6)]">
              <Image
                src="https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_640,h_960,c_fill,g_auto:subject/photography/services_hero.jpg"
                alt="Wedding couple photographed on a terrace"
                fill
                sizes="(min-width: 1024px) 320px, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 space-y-1 text-sm uppercase tracking-[0.3em] text-ivory/70">
                <span>Production</span>
                <span>Direction</span>
                <span>Legacy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-padding mx-auto max-w-7xl space-y-12">
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold/70">Signature Offerings</span>
          <h2 className="max-w-3xl font-display text-4xl text-ivory">
            Bespoke collections crafted for celebrations across India and destinations worldwide.
          </h2>
          <p className="max-w-2xl text-lg text-ivory/70">
            Each commission includes concierge planning, shot list curation, and luxury post-production. Explore our core experiences below, then schedule a consultation for a tailored proposal.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section className="container-padding mx-auto max-w-6xl rounded-4xl border border-ivory/15 bg-charcoal/30 p-10 lg:p-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-gold/30 px-3 py-1 text-xs uppercase tracking-[0.3em] text-gold/80">
              Production Pillars
            </span>
            <h2 className="font-display text-3xl text-ivory sm:text-4xl">
              White-glove storytelling, from the first moodboard to the final delivery.
            </h2>
            <p className="text-ivory/70">
              Our multi-disciplinary collective blends documentary authenticity with editorial sophistication. Dedicated producers, photographers, filmmakers, and editors collaborate to ensure timeless heirlooms.
            </p>
            <ul className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-ivory/40">
              {trustedPartners.map((partner) => (
                <li key={partner} className="rounded-full border border-ivory/15 px-3 py-1">
                  {partner}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-6">
            {productionPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-4xl border border-ivory/15 bg-charcoal/45 p-6 text-ivory/80"
              >
                <h3 className="text-lg font-semibold text-ivory">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BookingCTA className="container-padding mx-auto max-w-6xl" />
    </div>
  );
}
