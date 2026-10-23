"use client";

import { CircleCheck, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { isEmail, submitForm } from "@/lib/submitForm";
import { useFormStart } from "@/components/forms/useFormStart";
import { buttonClasses } from "@/components/ui/Button";

/** Email signup for estimating tips. Posts to the shared endpoint with formType=newsletter. */
export function NewsletterForm() {
  const startedAt = useFormStart();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!isEmail(String(data.get("email") ?? ""))) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setStatus("sending");
    const result = await submitForm(data);
    if (result.ok) setStatus("sent");
    else {
      setStatus("idle");
      setError(result.message ?? "Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="mt-6 flex items-center gap-2 rounded-lg bg-white/10 p-4 font-medium text-white">
        <CircleCheck aria-hidden="true" className="size-5 text-accent" />
        You&apos;re on the list. Look out for our next email.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-3">
      <input type="hidden" name="formType" value="newsletter" />
      <input type="hidden" name="ts" value={startedAt} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Company website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label htmlFor="newsletter-email" className="text-body-sm font-medium text-white">
        Work email
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        placeholder="you@company.com"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "newsletter-error" : undefined}
        className="min-h-12 w-full rounded-lg border border-white/20 bg-white px-4 text-[1rem] text-navy placeholder:text-placeholder focus:shadow-[0_0_0_3px_rgba(242,140,40,0.35)] focus:outline-none"
      />
      {error && (
        <p id="newsletter-error" role="alert" className="text-caption font-medium text-accent">
          {error}
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className={buttonClasses({ size: "lg", className: "w-full" })}>
        {status === "sending" ? "Subscribing…" : "Subscribe"}
      </button>
      <p className="flex items-center gap-1.5 text-caption text-navy-200">
        <ShieldCheck aria-hidden="true" className="size-4 text-accent" />
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
