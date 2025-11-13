import { Skeleton } from "@/components/ui/skeleton";

export default function PortfolioLoading() {
  return (
    <div className="flex flex-col gap-24 pb-32">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,156,109,0.2),transparent_60%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-14 px-4 pb-28 pt-24 sm:px-6 lg:flex-row lg:items-center lg:px-8 lg:py-32">
          <div className="flex-1 space-y-6 text-ivory">
            <Skeleton className="h-10 w-36 bg-gold/30" />
            <Skeleton className="h-16 w-full max-w-xl bg-ivory/20" />
            <Skeleton className="h-16 w-full max-w-2xl bg-ivory/15" />
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-32 rounded-full bg-ivory/10" />
              ))}
            </div>
          </div>
          <div className="flex flex-1 justify-center lg:justify-end">
            <div className="grid max-w-xl grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="aspect-[3/4] bg-charcoal-light/50" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-padding mx-auto max-w-7xl space-y-8">
        <Skeleton className="h-10 w-60 bg-gold/30" />
        <div className="grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-80 bg-charcoal-light/40" />
          ))}
        </div>
      </section>

      <section className="container-padding mx-auto max-w-7xl space-y-8">
        <Skeleton className="h-10 w-52 bg-gold/30" />
        <div className="grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-72 bg-charcoal-light/35" />
          ))}
        </div>
      </section>
    </div>
  );
}
