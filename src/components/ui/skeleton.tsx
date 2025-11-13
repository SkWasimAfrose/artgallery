import { clsx } from "clsx";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-3xl bg-charcoal-light/40",
        className,
      )}
    />
  );
}

export default Skeleton;
