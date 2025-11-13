import Link from "next/link";
import { clsx } from "clsx";

export type ServiceCardProps = {
  title: string;
  description: string;
  priceFrom?: string;
  features?: string[];
  href?: string;
  highlight?: boolean;
  className?: string;
};

export function ServiceCard({
  title,
  description,
  priceFrom,
  features,
  href,
  highlight,
  className,
}: ServiceCardProps) {
  const card = (
    <article
      className={clsx(
        "relative flex h-full flex-col gap-6 rounded-4xl border border-ivory/10 bg-charcoal-light/20 p-8 text-ivory shadow-[0_30px_70px_-60px_rgba(255,255,255,0.5)] transition hover:border-gold/40",
        highlight && "border-gold/50 bg-charcoal/40",
        className,
      )}
    >
      {highlight && (
        <span className="absolute right-8 top-8 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-gold">
          Signature
        </span>
      )}
      <div className="space-y-3">
        <h3 className="font-display text-2xl">{title}</h3>
        <p className="text-sm leading-relaxed text-ivory/70">{description}</p>
      </div>
      {priceFrom && (
        <div className="text-xs uppercase tracking-[0.3em] text-gold/80">
          From {priceFrom}
        </div>
      )}
      {features?.length ? (
        <ul className="space-y-2 text-sm text-ivory/70">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {href && (
        <div className="mt-auto">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold transition group-hover:text-gold-light">
            Explore Offering
          </span>
        </div>
      )}
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="h-full">
        {card}
      </Link>
    );
  }

  return card;
}

export default ServiceCard;
