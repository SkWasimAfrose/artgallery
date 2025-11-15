"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { z } from "zod";
import { bookingSchema, type BookingFormValues } from "@/lib/validation";
import { FormFeedback } from "@/components/ui/form-feedback";
import { siteConfig } from "@/config/site";

const serviceOptions = [
  "Signature Wedding Weekend",
  "Destination Elopements",
  "Luxury Events & Galas",
  "Cinematic Film Production",
  "Fine-art Album Design",
];

const initialValues: BookingFormValues = {
  coupleName: "",
  email: "",
  phone: "",
  eventDate: "",
  eventLocation: "",
  servicesInterested: [],
  message: "",
};

type FieldErrors = Partial<Record<keyof BookingFormValues, string>>;

type SubmitState =
  | { status: "idle" }
  | { status: "success"; whatsappLink?: string }
  | { status: "error"; message: string };

export default function BookingPage() {
  const [formData, setFormData] = useState<BookingFormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [isPending, startTransition] = useTransition();

  const conciergeNumber = siteConfig.whatsappNumber;

  const isServiceSelected = useMemo(() => {
    return new Set(formData.servicesInterested);
  }, [formData.servicesInterested]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const next = new Set(prev.servicesInterested);
      if (next.has(service)) {
        next.delete(service);
      } else {
        next.add(service);
      }
      return {
        ...prev,
        servicesInterested: Array.from(next),
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});
    setSubmitState({ status: "idle" });

    const validation = bookingSchema.safeParse({
      ...formData,
      phone: formData.phone ? formData.phone.trim() : undefined,
      message: formData.message?.trim() ?? "",
    });

    if (!validation.success) {
      const issues = validation.error.flatten();
      const nextErrors: FieldErrors = {};
      Object.entries(issues.fieldErrors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          nextErrors[field as keyof BookingFormValues] = messages[0];
        }
      });
      setFieldErrors(nextErrors);
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validation.data),
        });

        const result = await response.json();

        if (!response.ok) {
          setSubmitState({
            status: "error",
            message:
              result?.error ??
              "We couldn't process your enquiry right now. Please try again in a moment.",
          });
          return;
        }

        setSubmitState({
          status: "success",
          whatsappLink: result?.data?.whatsappLink,
        });
        setFormData(initialValues);
      } catch (error) {
        console.error("Booking submission failed", error);
        setSubmitState({
          status: "error",
          message: "A connection issue occurred. Please try again shortly.",
        });
      }
    });
  };

  return (
    <div className="container-padding mx-auto max-w-6xl py-32">
      <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-8">
          <span className="inline-flex items-center rounded-full border border-gold/30 px-3 py-1 text-xs uppercase tracking-[0.3em] text-gold/80">
            Begin Your Journey
          </span>
          <h1 className="font-display text-4xl text-ivory sm:text-5xl">
            Reserve Lumina Atelier for your celebration.
          </h1>
          <p className="text-lg leading-relaxed text-ivory/70">
            Share a few details about your celebration and our concierge team will respond
            within 24 hours with a tailored photography and cinematography proposal.
          </p>
          <div className="rounded-4xl border border-ivory/10 bg-charcoal/40 p-6 text-sm text-ivory/70">
            <p>
              Every enquiry receives bespoke planning support, curated shot lists, and
              access to our trusted creative partners. Multi-day experiences include
              highlight films, luxury album design, and on-site editing suites.
            </p>
          </div>
        </section>

        <section>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-4xl border border-ivory/10 bg-charcoal/40 p-6 shadow-[0_40px_90px_-50px_rgba(198,156,109,0.45)] lg:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Couple Names"
                name="coupleName"
                type="text"
                placeholder="Ishita & Vihaan"
                value={formData.coupleName}
                onChange={handleChange}
                error={fieldErrors.coupleName}
                autoComplete="name"
              />
              <FormField
                label="Contact Email"
                name="email"
                type="email"
                placeholder="hello@example.com"
                value={formData.email}
                onChange={handleChange}
                error={fieldErrors.email}
                autoComplete="email"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="WhatsApp / Phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone ?? ""}
                onChange={handleChange}
                error={fieldErrors.phone}
                autoComplete="tel"
              />
              <FormField
                label="Celebration Date"
                name="eventDate"
                type="date"
                placeholder=""
                value={formData.eventDate}
                onChange={handleChange}
                error={fieldErrors.eventDate}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <FormField
              label="Celebration Location"
              name="eventLocation"
              type="text"
              placeholder="Lake Como, Italy"
              value={formData.eventLocation}
              onChange={handleChange}
              error={fieldErrors.eventLocation}
            />

            <fieldset className="space-y-4">
              <legend className="text-sm uppercase tracking-[0.3em] text-ivory/60">
                Services of Interest
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {serviceOptions.map((service) => {
                  const selected = isServiceSelected.has(service);
                  return (
                    <button
                      type="button"
                      key={service}
                      onClick={() => handleServiceToggle(service)}
                      className="flex items-center justify-between rounded-3xl border border-ivory/15 bg-charcoal/50 px-4 py-3 text-left text-sm text-ivory transition hover:border-gold hover:text-gold"
                      data-selected={selected}
                    >
                      <span>{service}</span>
                      <span
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-ivory/25 text-xs"
                      >
                        {selected ? "✓" : "+"}
                      </span>
                    </button>
                  );
                })}
              </div>
              {fieldErrors.servicesInterested && (
                <p className="text-sm text-gold-light">{fieldErrors.servicesInterested}</p>
              )}
            </fieldset>

            <FormField
              label="Share your vision"
              name="message"
              placeholder="Tell us about your celebration, guest count, design aesthetic, and any must-capture moments."
              value={formData.message ?? ""}
              onChange={handleChange}
              error={fieldErrors.message}
              multiline
              rows={5}
            />

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-charcoal shadow-lg shadow-gold/30 transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? "Sending..." : "Submit Booking Enquiry"}
            </button>

            {submitState.status === "success" && (
              <div className="space-y-3">
                <FormFeedback
                  variant="success"
                  title="Enquiry received"
                  message="Our concierge team will be in touch within 24 hours with a tailored proposal."
                />
                {submitState.whatsappLink && (
                  <Link
                    href={submitState.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full border border-gold/40 px-5 py-3 text-sm uppercase tracking-[0.28em] text-gold transition hover:bg-gold/10"
                  >
                    Message concierge on WhatsApp
                  </Link>
                )}
              </div>
            )}

            {submitState.status === "error" && (
              <FormFeedback variant="error" title="Submission failed" message={submitState.message} />
            )}
          </form>
        </section>
      </div>

      <aside className="mt-20 grid gap-8 rounded-4xl border border-ivory/10 bg-charcoal/30 p-8 lg:grid-cols-3">
        <div className="space-y-2">
          <h3 className="text-sm uppercase tracking-[0.3em] text-ivory/60">Concierge Hours</h3>
          <p className="text-sm text-ivory/70">Monday – Saturday · 10am to 7pm IST</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm uppercase tracking-[0.3em] text-ivory/60">Direct WhatsApp</h3>
          <Link
            href={conciergeNumber ? `https://wa.me/${conciergeNumber.replace(/\D/g, "")}` : "#"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gold transition hover:text-gold-light"
          >
            {conciergeNumber ?? "+91 00000 00000"}
          </Link>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm uppercase tracking-[0.3em] text-ivory/60">Email Concierge</h3>
          <Link
            href={`mailto:${siteConfig.contactEmail}`}
            className="inline-flex items-center gap-2 text-sm text-gold transition hover:text-gold-light"
          >
            {siteConfig.contactEmail}
          </Link>
        </div>
      </aside>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  name: keyof BookingFormValues;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  multiline?: boolean;
  rows?: number;
  min?: string;
};

function FormField({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
  multiline,
  rows = 4,
  min,
}: FormFieldProps) {
  const InputComponent = multiline ? "textarea" : "input";

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="text-sm uppercase tracking-[0.3em] text-ivory/60"
      >
        {label}
      </label>
      <InputComponent
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        suppressHydrationWarning
        className="w-full rounded-3xl border border-ivory/15 bg-charcoal/50 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
        {...(multiline ? { rows } : { type, min })}
      />
      {error && <p className="text-sm text-gold-light">{error}</p>}
    </div>
  );
}
