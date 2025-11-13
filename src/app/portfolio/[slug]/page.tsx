import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchGalleryBySlug } from "@/data/portfolio";
import type { GalleryImage } from "@/types";
import { BookingCTA } from "@/components/cta/booking-cta";

function formatEventDate(date?: Date) {
  if (!date) return undefined;
  try {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return undefined;
  }
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const gallery = await fetchGalleryBySlug(params.slug);

  if (!gallery) {
    notFound();
  }

  const eventDate = formatEventDate(gallery.eventDate);

  return (
    <div className="flex flex-col gap-24 pb-32">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,156,109,0.24),transparent_60%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 pb-28 pt-24 sm:px-6 lg:flex-row lg:items-end lg:px-8 lg:py-32">
          <div className="max-w-3xl space-y-6 text-ivory">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-charcoal/50 px-4 py-2 text-xs uppercase tracking-[0.35em] text-gold/80">
              <span>Gallery</span>
              {gallery.featured && <span className="h-1 w-1 rounded-full bg-gold" />}
              {gallery.featured ? <span>Featured</span> : null}
            </span>
            <h1 className="text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {gallery.title}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-ivory/80">
              {gallery.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em] text-ivory/50">
              {eventDate && <span>{eventDate}</span>}
              {gallery.location && <span>{gallery.location}</span>}
              {gallery.categories?.map((category) => (
                <span key={category} className="rounded-full border border-ivory/20 px-3 py-1">
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-1 justify-center lg:justify-end">
            <div className="relative h-[340px] w-[260px] overflow-hidden rounded-4xl border border-ivory/10 bg-charcoal/60 shadow-[0_40px_120px_-70px_rgba(198,156,109,0.55)]">
              <Image
                src={gallery.heroImage.url}
                alt={gallery.heroImage.alt ?? gallery.title}
                fill
                sizes="(min-width: 1024px) 260px, 60vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-padding mx-auto max-w-6xl space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <article className="space-y-6 text-base leading-relaxed text-ivory/75">
            <h2 className="font-display text-3xl text-ivory">Narrative Highlights</h2>
            <p>
              From the first light filtering through couture silks to the final sparkler exit,
              this celebration unfolded with immersive energy. Our team collaborated closely
              with planners, stylists, and lighting designers to choreograph moments
              alongside documentary candor.
            </p>
            <p>
              Cinematic sequences captured dancing reflections across palace mirrors,
              bespoke tablescapes with hand-crafted florals, and the heartfelt exchange of
              vows overlooking sweeping vistas. Editorial portraits, crafted with soft box
              lighting and medium format film, added a fashion-forward dimension to the
              gallery.
            </p>
            <p>
              Deliverables included a curated gallery, 4-minute highlight film, and a
              hand-bound fine-art album featuring letterpress typography and velvet inset
              framing.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-5 py-2 text-xs uppercase tracking-[0.3em] text-ivory transition hover:border-gold hover:text-gold"
            >
              Explore our services
            </Link>
          </article>

          <div className="grid gap-6">
            <div className="rounded-4xl border border-ivory/15 bg-charcoal/35 p-6 text-sm text-ivory/70">
              <h3 className="text-sm uppercase tracking-[0.3em] text-ivory/60">Production Team</h3>
              <ul className="mt-3 space-y-2">
                <li>2 lead photographers · 1 cinematography crew</li>
                <li>On-site editor for same-day preview</li>
                <li>Stylist liaison & lighting designer</li>
              </ul>
            </div>
            <div className="rounded-4xl border border-ivory/15 bg-charcoal/35 p-6 text-sm text-ivory/70">
              <h3 className="text-sm uppercase tracking-[0.3em] text-ivory/60">Services Included</h3>
              <ul className="mt-3 space-y-2">
                <li>Signature Wedding Weekend coverage</li>
                <li>Cinematic highlight film</li>
                <li>Fine-art album suite</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {gallery.images?.length ? (
        <section className="container-padding mx-auto max-w-7xl space-y-8">
          <h2 className="font-display text-3xl text-ivory">Gallery Selections</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.images.map((image: GalleryImage) => (
              <figure
                key={image.publicId}
                className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-ivory/10 bg-charcoal/50"
              >
                <Image
                  src={image.url}
                  alt={image.alt ?? gallery.title}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 45vw, 95vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-80 transition group-hover:opacity-60" />
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <BookingCTA className="container-padding mx-auto max-w-6xl" />
    </div>
  );
}
