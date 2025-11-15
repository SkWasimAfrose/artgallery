import Image from "next/image";
import Link from "next/link";
import { BookingCTA } from "@/components/cta/booking-cta";
import { siteConfig } from "@/config/site";

const timeline = [
  {
    year: "2015",
    title: "The Atelier Begins",
    description:
      "Lumina Atelier is founded in Mumbai, blending editorial fashion aesthetics with heartfelt wedding storytelling.",
  },
  {
    year: "2018",
    title: "Destination Expansion",
    description:
      "Our collective expands across India and the Middle East, capturing palace celebrations and desert soirées.",
  },
  {
    year: "2021",
    title: "Cinematic Studio",
    description:
      "We launch an in-house cinematic film division, complete with sound design, color grading, and aerial coverage.",
  },
  {
    year: "2024",
    title: "Global Collective",
    description:
      "With teams across Europe and Southeast Asia, Lumina Atelier crafts heirlooms for modern romantics worldwide.",
  },
];

const teamHighlights = [
  {
    role: "Creative Director",
    name: "Aarav Sharma",
    description:
      "Visionary behind the atelier's editorial aesthetic. Aarav choreographs light, movement, and couture styling for each celebration.",
  },
  {
    role: "Lead Storyteller",
    name: "Mira Kapoor",
    description:
      "Documentary photographer capturing intimate, candid moments with a poetic approach to composition and color.",
  },
  {
    role: "Cinematic Producer",
    name: "Farah Siddiqui",
    description:
      "Orchestrates multi-camera film productions, ensuring immersive soundscapes and artful storytelling.",
  },
];

const values = [
  {
    title: "Artistry",
    description:
      "We frame every celebration with the language of cinema—intentional light, couture styling, and nuanced storytelling.",
  },
  {
    title: "Concierge Service",
    description:
      "From vendor liaison to travel logistics, our team curates seamless experiences for couples and their guests.",
  },
  {
    title: "Legacy",
    description:
      "Heirloom albums, archival prints, and films crafted to be relived for generations, preserving every emotion in artful detail.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-24 pb-32">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,156,109,0.22),transparent_60%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-28 pt-24 sm:px-6 lg:flex-row lg:items-center lg:px-8 lg:py-32">
          <div className="max-w-2xl space-y-8 text-ivory">
            <span className="inline-flex items-center rounded-full border border-gold/40 bg-charcoal/50 px-4 py-2 text-xs uppercase tracking-[0.35em] text-gold/80">
              Our Story
            </span>
            <h1 className="text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Crafting cinematic heirlooms for the modern romantic.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-ivory/80">
              Lumina Atelier is a collective of photographers, filmmakers, and designers devoted to capturing celebrations with refined artistry. We blend editorial direction with documentary sincerity, ensuring every frame feels luminous, intentional, and timeless.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-charcoal shadow-xl shadow-gold/30 transition hover:bg-gold-light"
              >
                View Our Work
              </Link>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-6 py-3 text-sm uppercase tracking-[0.24em] text-ivory transition hover:border-gold hover:text-gold"
              >
                Reserve Your Date
              </Link>
            </div>
          </div>
          <div className="flex flex-1 justify-center lg:justify-end">
            <div className="relative h-[420px] w-[320px] overflow-hidden rounded-4xl border border-ivory/10 bg-charcoal/50 shadow-[0_50px_120px_-70px_rgba(198,156,109,0.6)]">
              <Image
                src="https://res.cloudinary.com/bae2g/image/upload/f_auto,q_auto,w_640,h_960,c_fill,g_auto:subject/v1763187700/IMG_20240126_161009_706_hsbotn.webp"
                alt="Lumina Atelier team at work"
                fill
                sizes="(min-width: 1024px) 320px, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 space-y-1 text-xs uppercase tracking-[0.3em] text-ivory/70">
                <span>Creative</span>
                <span>Concierge</span>
                <span>Collective</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-padding mx-auto max-w-6xl space-y-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]"><div className="space-y-6">
            <h2 className="font-display text-3xl text-ivory sm:text-4xl">Our Philosophy</h2>
            <p className="text-lg leading-relaxed text-ivory/75">
              We believe luxury is felt through intention. The Lumina Atelier experience is rooted in deep listening, artful direction, and seamless production. From the first discovery call to the final album reveal, we nurture trust, anticipate needs, and curate each detail around your story.
            </p>
            <p className="text-lg leading-relaxed text-ivory/75">
              Collaborating with celebrated planners, florists, and stylists, we orchestrate imagery that feels cinematic while remaining true to the energy of each celebration. Our clients value the balance of editorial polish and heartfelt authenticity.
            </p>
          </div>
          <div className="space-y-6 rounded-4xl border border-ivory/15 bg-charcoal/35 p-6">
            <h3 className="text-sm uppercase tracking-[0.3em] text-ivory/60">In Numbers</h3>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-ivory/50">Celebrations Documented</dt>
                <dd className="font-display text-3xl text-gold">120+</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-ivory/50">Countries Visited</dt>
                <dd className="font-display text-3xl text-gold">14</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-ivory/50">Creative Partners</dt>
                <dd className="font-display text-3xl text-gold">35+</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-ivory/50">Average Turnaround</dt>
                <dd className="font-display text-3xl text-gold">4 weeks</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="container-padding mx-auto max-w-6xl space-y-10">
        <h2 className="font-display text-3xl text-ivory sm:text-4xl">Timeline</h2>
        <div className="grid gap-6 lg:grid-cols-4">
          {timeline.map((milestone) => (
            <article
              key={milestone.year}
              className="rounded-4xl border border-ivory/15 bg-charcoal/40 p-6 text-ivory"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-gold/80">{milestone.year}</span>
              <h3 className="mt-2 text-lg font-semibold">{milestone.title}</h3>
              <p className="mt-3 text-sm text-ivory/70">{milestone.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-padding mx-auto max-w-6xl space-y-10">
        <h2 className="font-display text-3xl text-ivory sm:text-4xl">Leadership Collective</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {teamHighlights.map((leader) => (
            <article
              key={leader.name}
              className="rounded-4xl border border-ivory/15 bg-charcoal/40 p-6 text-ivory"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-gold/80">{leader.role}</span>
              <h3 className="mt-2 text-xl font-semibold">{leader.name}</h3>
              <p className="mt-3 text-sm text-ivory/70">{leader.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-padding mx-auto max-w-6xl space-y-10">
        <h2 className="font-display text-3xl text-ivory sm:text-4xl">What Guides Us</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-4xl border border-ivory/15 bg-charcoal/35 p-6 text-ivory/80"
            >
              <h3 className="text-lg font-semibold text-ivory">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed">{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-padding mx-auto max-w-6xl space-y-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-ivory sm:text-4xl">
              Ready to begin your Lumina Atelier experience?
            </h2>
            <p className="text-ivory/70">
              Our concierge team will curate a bespoke proposal that reflects your celebration's vision, timeline, and desired deliverables.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/booking"
              className="rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-charcoal shadow-lg shadow-gold/30 transition hover:bg-gold-light"
            >
              Book a Consultation
            </Link>
            <Link
              href={`mailto:${siteConfig.contactEmail}`}
              className="rounded-full border border-ivory/20 px-6 py-3 text-sm uppercase tracking-[0.3em] text-ivory transition hover:border-gold hover:text-gold"
            >
              Email Concierge
            </Link>
          </div>
        </div>
      </section>

      <BookingCTA className="container-padding mx-auto max-w-6xl" />
    </div>
  );
}
