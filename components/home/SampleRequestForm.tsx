"use client";

import { CircleCheck } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { submitForm } from "@/lib/submitForm";
import { useFormStart } from "@/components/forms/useFormStart";
import { buttonClasses } from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Email capture for the sample estimate. Posts to the shared PHP endpoint
 * (public/api/quote.php) with formType=sample-request.
 */
export function SampleRequestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const startedAt = useFormStart();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const result = await submitForm(new FormData(e.currentTarget));
    setStatus(result.ok ? "sent" : "error");
  }

  if (status === "sent") {
    return (
      <p role="status" className="flex items-center gap-2 rounded-lg bg-white p-4 text-body-md font-medium text-navy shadow-card">
        <CircleCheck aria-hidden="true" className="size-5 text-accent-ink" />
        Thanks! The sample estimate is on its way to your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-lg" noValidate={false}>
      <input type="hidden" name="formType" value="sample-request" />
      <input type="hidden" name="ts" value={startedAt} />
      {/* Honeypot: hidden from people, bots fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label htmlFor="sample-email" className="sr-only">
        Work email
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="sample-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your work email"
          className="min-h-12 flex-1 rounded-lg border border-line bg-white px-4 text-[1rem] text-navy shadow-card placeholder:text-placeholder focus:border-blueprint focus:shadow-[0_0_0_3px_rgba(47,111,219,0.15)] focus:outline-none"
        />
        <button type="submit" disabled={status === "sending"} className={buttonClasses({ className: "min-h-12" })}>
          {status === "sending" ? "Sending…" : "Email Me the Sample"}
        </button>
      </div>
      <p role={status === "error" ? "alert" : undefined} className="mt-2 text-caption text-body">
        {status === "error" ? (
          <span className="font-semibold text-[#b42318]">
            Something went wrong. Please email{" "}
            <a className="underline" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>{" "}
            and we&apos;ll send it over.
          </span>
        ) : (
          "Sample PDF and Excel file sent to your inbox. No sales calls."
        )}
      </p>
    </form>
  );
}
