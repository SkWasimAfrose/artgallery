"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FormFeedback } from "@/components/ui/form-feedback";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingCTA } from "@/components/cta/booking-cta";

type BookingStatus = "new" | "viewed" | "in_progress" | "confirmed" | "archived";

type AdminBooking = {
  _id: string;
  coupleName: string;
  email: string;
  phone?: string;
  eventDate: string;
  eventLocation: string;
  servicesInterested: string[];
  status: BookingStatus;
  createdAt?: string;
  updatedAt?: string;
};

type BookingsResponse = {
  data: AdminBooking[];
  fallback?: boolean;
};

const STATUSES: { value: BookingStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "viewed", label: "Viewed" },
  { value: "in_progress", label: "In progress" },
  { value: "confirmed", label: "Confirmed" },
  { value: "archived", label: "Archived" },
];

export default function AdminGatePage() {
  const [secret, setSecret] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<AdminBooking[] | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isUpdating, startUpdate] = useTransition();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedSecret = sessionStorage.getItem("lumina-admin-secret");
    if (storedSecret) {
      setSecret(storedSecret);
      setIsAuthorized(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    let isMounted = true;

    const loadBookings = async () => {
      setFetchError(null);
      setBookings(null);

      try {
        const response = await fetch("/api/bookings/admin", {
          headers: buildAuthHeaders(secret),
        });

        if (!response.ok) {
          throw new Error(`Failed to load bookings (${response.status})`);
        }

        const result: BookingsResponse = await response.json();

        if (!isMounted) return;

        setBookings(result.data ?? []);
        setIsFallback(Boolean(result.fallback));
      } catch (err) {
        console.error("Failed to load bookings", err);
        if (!isMounted) return;
        setFetchError("Unable to load bookings. Please verify the admin secret and try again.");
      }
    };

    loadBookings();

    return () => {
      isMounted = false;
    };
  }, [isAuthorized, secret]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!secret.trim()) {
      setError("Please enter the admin secret.");
      return;
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem("lumina-admin-secret", secret.trim());
    }

    setIsAuthorized(true);
  };

  const handleStatusChange = (id: string, status: BookingStatus) => {
    startUpdate(async () => {
      try {
        const response = await fetch("/api/bookings/admin", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...buildAuthHeaders(secret),
          },
          body: JSON.stringify({ id, status }),
        });

        if (!response.ok) {
          throw new Error(`Failed to update booking (${response.status})`);
        }

        const result: { data: AdminBooking } = await response.json();
        setBookings((prev) =>
          prev?.map((booking) => (booking._id === id ? { ...booking, ...result.data } : booking)) ??
          prev,
        );
      } catch (err) {
        console.error("Failed to update booking", err);
        setError("Unable to update booking status. Please try again.");
      }
    });
  };

  const handleGenerateSignature = async () => {
    setError(null);

    try {
      const response = await fetch("/api/cloudinary-sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...buildAuthHeaders(secret),
        },
        body: JSON.stringify({ folder: "lumina/uploads" }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate signature (${response.status})`);
      }

      const result = await response.json();
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(JSON.stringify(result.data, null, 2));
      }
      setError("Cloudinary signature copied to clipboard.");
    } catch (err) {
      console.error("Failed to generate Cloudinary signature", err);
      setError("Unable to generate Cloudinary signature. Verify secret and try again.");
    }
  };

  const sortedBookings = useMemo(() => {
    if (!bookings) return [];
    return [...bookings].sort((a, b) => (a.createdAt ?? "") < (b.createdAt ?? "") ? 1 : -1);
  }, [bookings]);

  if (!isAuthorized) {
    return (
      <div className="container-padding mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center gap-10 py-24">
        <div className="space-y-3 text-center">
          <h1 className="font-display text-4xl text-ivory">Admin Access</h1>
          <p className="text-ivory/70">
            Enter the secret provided to Lumina Atelier staff to unlock booking and media
            management tools.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="admin-secret" className="text-sm uppercase tracking-[0.3em] text-ivory/60">
              Admin Secret
            </label>
            <input
              id="admin-secret"
              type="password"
              required
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
              className="w-full rounded-3xl border border-ivory/15 bg-charcoal/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
              placeholder="Enter secret"
            />
          </div>
          {error && <FormFeedback variant="error" message={error} />}
          <button
            type="submit"
            className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-charcoal shadow-lg shadow-gold/30 transition hover:bg-gold-light"
          >
            Unlock admin
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container-padding mx-auto flex flex-col gap-12 pb-32 pt-16">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <h1 className="font-display text-4xl text-ivory">Lumina Atelier Admin</h1>
          <p className="text-ivory/70">
            Manage bookings, generate Cloudinary upload signatures, and access concierge quick
            links. All API requests require the admin secret in the
            <code className="mx-2 rounded bg-charcoal/60 px-1.5 py-0.5 text-xs">x-admin-secret</code>
            header or <code className="rounded bg-charcoal/60 px-1.5 py-0.5 text-xs">Authorization</code> bearer token.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full border border-ivory/20 px-4 py-2 text-sm text-ivory transition hover:border-gold hover:text-gold"
          >
            Back to site
          </Link>
          <button
            type="button"
            onClick={handleGenerateSignature}
            className="rounded-full border border-gold/40 px-4 py-2 text-sm text-gold transition hover:bg-gold/10"
          >
            Copy Cloudinary signature
          </button>
        </div>
      </header>

      {error && <FormFeedback variant="info" message={error} />}
      {fetchError && <FormFeedback variant="error" message={fetchError} />}
      {isFallback && (
        <FormFeedback
          variant="info"
          message="Showing mock data fallback. Connect MongoDB to view live bookings."
        />
      )}

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-ivory">Bookings</h2>
          {isUpdating && <span className="text-sm text-gold">Updating…</span>}
        </div>

        {!bookings && !fetchError ? (
          <BookingsSkeleton />
        ) : sortedBookings.length === 0 ? (
          <div className="rounded-4xl border border-ivory/15 bg-charcoal/35 p-6 text-sm text-ivory/70">
            No bookings found yet. Once enquiries arrive they will appear here.
          </div>
        ) : (
          <div className="overflow-hidden rounded-4xl border border-ivory/15">
            <table className="min-w-full divide-y divide-ivory/10">
              <thead className="bg-charcoal/60 text-xs uppercase tracking-[0.3em] text-ivory/60">
                <tr>
                  <th className="px-5 py-3 text-left">Couple</th>
                  <th className="px-5 py-3 text-left">Event</th>
                  <th className="px-5 py-3 text-left">Services</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory/10 text-sm text-ivory/80">
                {sortedBookings.map((booking) => (
                  <tr key={booking._id} className="bg-charcoal/40">
                    <td className="px-5 py-4">
                      <div className="font-medium text-ivory">{booking.coupleName}</div>
                      <div className="text-xs text-ivory/50">{booking.email}</div>
                      {booking.phone && (
                        <div className="text-xs text-ivory/50">{booking.phone}</div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div>{booking.eventLocation}</div>
                      <div className="text-xs text-ivory/50">
                        {new Date(booking.eventDate).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <ul className="space-y-1">
                        {booking.servicesInterested.map((service) => (
                          <li key={service} className="text-xs text-ivory/60">
                            {service}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center rounded-full border border-ivory/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-ivory/60">
                        {STATUSES.find((item) => item.value === booking.status)?.label ?? booking.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        className="w-full rounded-3xl border border-ivory/15 bg-charcoal/60 px-3 py-2 text-xs uppercase tracking-[0.3em] text-ivory/60 focus:border-gold focus:outline-none"
                        value={booking.status}
                        onChange={(event) => handleStatusChange(booking._id, event.target.value as BookingStatus)}
                      >
                        {STATUSES.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="space-y-4 rounded-4xl border border-ivory/15 bg-charcoal/35 p-6">
        <h2 className="font-display text-2xl text-ivory">API Reference</h2>
        <ul className="space-y-3 text-sm text-ivory/70">
          <li>
            <code className="rounded bg-charcoal/60 px-2 py-1 text-xs">GET /api/bookings/admin</code>
            <p className="mt-1 text-xs text-ivory/50">List bookings (requires admin secret)</p>
          </li>
          <li>
            <code className="rounded bg-charcoal/60 px-2 py-1 text-xs">PATCH /api/bookings/admin</code>
            <p className="mt-1 text-xs text-ivory/50">Update booking status</p>
          </li>
          <li>
            <code className="rounded bg-charcoal/60 px-2 py-1 text-xs">POST /api/cloudinary-sign</code>
            <p className="mt-1 text-xs text-ivory/50">Generate upload signature for Cloudinary</p>
          </li>
        </ul>
      </section>

      <BookingCTA className="max-w-4xl" />
    </div>
  );
}

function buildAuthHeaders(secret: string): Record<string, string> {
  const trimmed = secret.trim();
  const headers: Record<string, string> = {};
  if (trimmed) {
    headers["x-admin-secret"] = trimmed;
  }
  return headers;
}

function BookingsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="grid gap-3 rounded-4xl border border-ivory/15 bg-charcoal/40 p-6 lg:grid-cols-4">
          <Skeleton className="h-14 bg-charcoal-light/40" />
          <Skeleton className="h-14 bg-charcoal-light/40" />
          <Skeleton className="h-14 bg-charcoal-light/40" />
          <Skeleton className="h-14 bg-charcoal-light/40" />
        </div>
      ))}
    </div>
  );
}
