"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { contactSchema, type ContactFormValues } from "@/lib/validation";
import { FormFeedback } from "@/components/ui/form-feedback";
import { siteConfig } from "@/config/site";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

type SubmitState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [isPending, startTransition] = useTransition();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});
    setSubmitState({ status: "idle" });

    const validation = contactSchema.safeParse({
      ...formData,
      phone: formData.phone ? formData.phone.trim() : undefined,
      message: formData.message?.trim() ?? "",
    });

    if (!validation.success) {
      const issues = validation.error.flatten();
      const nextErrors: FieldErrors = {};
      Object.entries(issues.fieldErrors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          nextErrors[field as keyof ContactFormValues] = messages[0];
        }
      });
      setFieldErrors(nextErrors);
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
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
              "We couldn't send your message right now. Please try again shortly.",
          });
          return;
        }

        setSubmitState({ status: "success" });
        setFormData(initialValues);
      } catch (error) {
        console.error("Contact submission failed", error);
        setSubmitState({
          status: "error",
          message: "A connection issue occurred. Please try again shortly.",
        });
      }
    });
  };

  return (
    <div className="container-padding mx-auto max-w-6xl py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <section className="space-y-8">
          <span className="inline-flex items-center rounded-full border border-gold/30 px-3 py-1 text-xs uppercase tracking-[0.3em] text-gold/80">
            Concierge Team
          </span>
          <h1 className="font-display text-4xl text-ivory sm:text-5xl">
            Let's curate your celebration experience.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-ivory/70">
            Whether you're planning a multi-day destination wedding or an intimate
            editorial session, our team is here to craft an experience that feels cinematic
            and deeply personal. Share a few details and we'll arrange a discovery call.
          </p>
          <div className="space-y-6 rounded-4xl border border-ivory/10 bg-charcoal/35 p-6">
            <div>
              <h2 className="text-sm uppercase tracking-[0.3em] text-ivory/60">Studio</h2>
              <address className="mt-2 text-sm not-italic leading-relaxed text-ivory/70">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}, {siteConfig.address.region} {" "}
                {siteConfig.address.postalCode}
                <br />
                {siteConfig.address.country}
              </address>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-[0.3em] text-ivory/60">Direct</h2>
              <ul className="mt-2 space-y-2 text-sm text-ivory/70">
                <li>
                  <Link
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-gold transition hover:text-gold-light"
                  >
                    {siteConfig.contactEmail}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`tel:${siteConfig.studioPhone}`}
                    className="text-gold transition hover:text-gold-light"
                  >
                    {siteConfig.studioPhone}
                  </Link>
                </li>
                {siteConfig.whatsappNumber && (
                  <li>
                    <Link
                      href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gold transition hover:text-gold-light"
                    >
                      WhatsApp concierge
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-[0.3em] text-ivory/60">Office Hours</h2>
              <p className="mt-2 text-sm text-ivory/70">
                Monday – Saturday · 10am – 7pm IST
              </p>
            </div>
          </div>
        </section>

        <section>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-4xl border border-ivory/10 bg-charcoal/40 p-6 shadow-[0_40px_90px_-50px_rgba(198,156,109,0.45)] lg:p-8"
          >
            <FormField
              label="Full Name"
              name="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              error={fieldErrors.name}
              autoComplete="name"
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="hello@example.com"
              value={formData.email}
              onChange={handleChange}
              error={fieldErrors.email}
              autoComplete="email"
            />
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
              label="How can we help?"
              name="message"
              placeholder="Share your celebration vision, guest count, venue, and any notes."
              value={formData.message}
              onChange={handleChange}
              error={fieldErrors.message}
              multiline
              rows={6}
            />

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-charcoal shadow-lg shadow-gold/30 transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? "Sending..." : "Send Message"}
            </button>

            {submitState.status === "success" && (
              <FormFeedback
                variant="success"
                title="Message sent"
                message="Thank you for reaching out. Our concierge team will reply within 24 hours."
              />
            )}

            {submitState.status === "error" && (
              <FormFeedback variant="error" title="Submission failed" message={submitState.message} />
            )}
          </form>
        </section>
      </div>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  name: keyof ContactFormValues;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  multiline?: boolean;
  rows?: number;
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
        {...(multiline ? { rows } : { type })}
      />
      {error && <p className="text-sm text-gold-light">{error}</p>}
    </div>
  );
}
