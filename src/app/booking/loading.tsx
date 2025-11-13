import { Skeleton } from "@/components/ui/skeleton";

export default function BookingLoading() {
  return (
    <div className="container-padding mx-auto max-w-6xl py-32">
      <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-6">
          <Skeleton className="h-8 w-40 bg-gold/30" />
          <Skeleton className="h-24 w-full max-w-xl bg-ivory/15" />
          <Skeleton className="h-20 w-full max-w-2xl bg-ivory/15" />
          <Skeleton className="h-32 w-full max-w-xl bg-charcoal-light/30" />
        </section>

        <section className="space-y-6 rounded-4xl border border-ivory/10 bg-charcoal/40 p-6 shadow-[0_40px_90px_-50px_rgba(198,156,109,0.45)] lg:p-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full bg-charcoal-light/40" />
          ))}
          <Skeleton className="h-24 w-full bg-charcoal-light/40" />
          <Skeleton className="h-12 w-full bg-gold/40" />
        </section>
      </div>
    </div>
  );
}
