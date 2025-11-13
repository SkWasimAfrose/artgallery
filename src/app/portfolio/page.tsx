import Link from "next/link";
import Image from "next/image";
import { fetchGalleries } from "@/data/portfolio";
import { GalleryCard } from "@/components/cards/gallery-card";
import { BookingCTA } from "@/components/cta/booking-cta";

export default async function PortfolioPage() {
  const galleries = await fetchGalleries();

  const featured = galleries.filter((gallery) => gallery.featured);
  const others = galleries.filter((gallery) => !gallery.featured);

  return (
    <div className="flex flex-col gap-24 pb-32">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,156,109,0.2),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.18]" aria-hidden>
          <Image
            src="https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_1600/v1728900001/photography/noise-texture.png"
            alt="Fine grain texture"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-14 px-4 pb-28 pt-24 sm:px-6 lg:flex-row lg:items-center lg:px-8 lg:py-32">
          <div className="max-w-2xl space-y-8 text-ivory">
            <span className="inline-flex items-center rounded-full border border-gold/40 bg-charcoal/50 px-4 py-2 text-xs uppercase tracking-[0.35em] text-gold/80">
              Portfolio
            </span>
            <h1 className="text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Cinematic stories captured across palaces, coastlines, and couture venues.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-ivory/80">
              Explore multi-day celebrations and editorial sessions curated by the Lumina Atelier team. Every gallery is a crafted narrative of light, rhythm, and emotion.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em] text-ivory/50">
              <span>Destination Weddings</span>
              <span>Editorial Portraiture</span>
              <span>Heritage Venues</span>
              <span>Modern Romance</span>
            </div>
          </div>
          <div className="flex flex-1 justify-center lg:justify-end">
            <div className="grid max-w-xl grid-cols-3 gap-4 sm:gap-6">
              {featured.slice(0, 3).map((gallery) => (
                <div
                  key={gallery.slug}
                  className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-ivory/10 bg-charcoal/60"
                >
                  <Image
                    src={gallery.heroImage.url}
                    alt={gallery.heroImage.alt ?? gallery.title}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 220px, 32vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-70" />
                  <span className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.25em] text-ivory/70">
                    {gallery.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-padding mx-auto max-w-7xl space-y-10">
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold/70">Featured Collections</span>
          <h2 className="font-display text-3xl text-ivory sm:text-4xl">
            Handpicked celebrations that redefined modern romance.
          </h2>
          <p className="max-w-2xl text-lg text-ivory/70">
            Discover the experiences our couples cherish most—from sunset vows in the Maldives to regal evenings in Jaipur.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {featured.length === 0 ? (
            <EmptyState message="Featured galleries will appear here soon." />
          ) : (
            featured.map((gallery) => (
              <GalleryCard
                key={gallery.slug}
                title={gallery.title}
                description={gallery.description}
                image={{ src: gallery.heroImage.url, alt: gallery.heroImage.alt ?? gallery.title }}
                href={`/portfolio/${gallery.slug}`}
                badge="Featured"
              />
            ))
          )}
        </div>
      </section>

      <section className="container-padding mx-auto max-w-7xl space-y-10">
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold/70">All Galleries</span>
          <h2 className="font-display text-3xl text-ivory sm:text-4xl">
            A living archive of celebrations across India and beyond.
          </h2>
          <p className="max-w-2xl text-lg text-ivory/70">
            Browse the full collection to spark inspiration for your celebration. Filter and search capabilities are coming soon.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {galleries.length === 0 ? (
            <EmptyState message="Our galleries are being curated. Check back soon." />
          ) : (
            [
              ...featured,
              ...others,
            ].map((gallery) => (
              <GalleryCard
                key={`all-${gallery.slug}`}
                title={gallery.title}
                description={gallery.description}
                image={{ src: gallery.heroImage.url, alt: gallery.heroImage.alt ?? gallery.title }}
                href={`/portfolio/${gallery.slug}`}
                badge={gallery.featured ? "Featured" : undefined}
              />
            ))
          )}
        </div>
      </section>

      <BookingCTA className="container-padding mx-auto max-w-6xl" />
    </div>
  );
}

type EmptyStateProps = {
  message: string;
};

function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="rounded-4xl border border-ivory/15 bg-charcoal/40 p-10 text-center text-sm text-ivory/60">
      {message}
    </div>
  );
}
