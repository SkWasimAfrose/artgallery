import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";

export type GalleryCardProps = {
  title: string;
  description: string;
  image: {
    src: string;
    alt?: string;
  };
  href?: string;
  badge?: string;
  className?: string;
};

export function GalleryCard({
  title,
  description,
  image,
  href,
  badge,
  className,
}: GalleryCardProps) {
  const content = (
    <div
      className={clsx(
        "group relative flex h-full flex-col overflow-hidden rounded-4xl border border-ivory/10 bg-charcoal-light/20",
        className,
      )}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt ?? title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 90vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
        {badge && (
          <span className="absolute left-5 top-5 rounded-full border border-gold/30 bg-charcoal/50 px-3 py-1 text-xs uppercase tracking-[0.3em] text-gold/80">
            {badge}
          </span>
        )}
      </div>
      <div className="relative flex flex-1 flex-col space-y-3 p-6">
        <h3 className="font-display text-2xl text-ivory">{title}</h3>
        <p className="text-sm leading-relaxed text-ivory/70">{description}</p>
        {href && (
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold transition group-hover:text-gold-light">
            View Story
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="h-full">
        {content}
      </Link>
    );
  }

  return content;
}

export default GalleryCard;
