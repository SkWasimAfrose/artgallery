import { Skeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <div className="container-padding mx-auto max-w-6xl py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <section className="space-y-6">
          <Skeleton className="h-8 w-32 bg-gold/30" />
          <Skeleton className="h-24 w-full max-w-xl bg-ivory/15" />
          <Skeleton className="h-20 w-full max-w-2xl bg-ivory/15" />
          <div className="space-y-4 rounded-4xl border border-ivory/10 bg-charcoal/35 p-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-16 w-full bg-charcoal-light/30" />
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-4xl border border-ivory/10 bg-charcoal/40 p-6 shadow-[0_40px_90px_-50px_rgba(198,156,109,0.45)] lg:p-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full bg-charcoal-light/40" />
          ))}
          <Skeleton className="h-24 w-full bg-charcoal-light/40" />
          <Skeleton className="h-12 w-full bg-gold/40" />
        </section>
      </div>
    </div>
  );
}
