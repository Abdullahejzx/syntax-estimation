"use client";

import Link from "next/link";
import { ArrowRight, CircleCheck, Lock } from "lucide-react";
import { useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { roleOptions } from "@/content/forms";
import { quoteHref } from "@/content/navigation";
import { isEmail, isPhone, isUrl, submitForm } from "@/lib/submitForm";
import { validateFiles } from "@/lib/uploads";
import { buttonClasses } from "@/components/ui/Button";
import { Field, describedBy, inputClasses } from "./Field";
import { FileDropzone } from "./FileDropzone";
import { SmsConsent } from "./SmsConsent";

type QuickQuoteFormProps = {
  /** What the visitor was looking at, e.g. "Service: Quantity Takeoffs" */
  context: string;
  title?: string;
  subtitle?: string;
};

type Errors = Partial<Record<"name" | "email" | "phone" | "role" | "planLink" | "files" | "form", string>>;

/**
 * Compact quote request used on service and trade pages. Posts to the same
 * PHP endpoint as the full /get-a-quote form (formType=quick-quote).
 */
export function QuickQuoteForm({
  context,
  title = "Request a Fast Project Quote",
  subtitle = "Get a fixed price and delivery date for your plans.",
}: QuickQuoteFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function validate(data: FormData): Errors {
    const e: Errors = {};
    const get = (k: string) => String(data.get(k) ?? "").trim();
    if (!get("name")) e.name = "Enter your name.";
    if (!isEmail(get("email"))) e.email = "Enter a valid email address.";
    if (!isPhone(get("phone"))) e.phone = "Enter a phone number with area code.";
    if (!get("role")) e.role = "Choose the option that fits you best.";
    if (get("planLink") && !isUrl(get("planLink"))) e.planLink = "Paste the full link, starting with https://";
    const fileProblem = validateFiles(files);
    if (fileProblem) e.files = fileProblem;
    return e;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      // Move focus to the first field that needs attention
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    files.forEach((file) => data.append("files[]", file));
    setStatus("sending");
    const result = await submitForm(data);
    if (result.ok) {
      setStatus("sent");
      return;
    }
    setStatus("idle");
    setErrors({ ...(result.errors as Errors), form: result.message ?? "Something went wrong. Please try again." });
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-3 py-4">
        <CircleCheck aria-hidden="true" className="size-10 text-accent-ink" />
        <h2 className="text-headline-md font-bold">Thanks! Your request is in.</h2>
        <p className="text-body-md">
          An estimator will review your plans and email you a fixed quote and delivery date. Need it sooner? Call{" "}
          <a href={siteConfig.phoneHref} className="font-semibold text-navy underline">
            {siteConfig.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <h2 className="text-headline-md font-bold">{title}</h2>
        <p className="mt-1 text-body-sm">{subtitle}</p>
      </div>

      <input type="hidden" name="formType" value="quick-quote" />
      <input type="hidden" name="context" value={context} />
      {/* Honeypot: hidden from people, bots fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Company website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field id="qq-name" label="Full name" error={errors.name}>
        <input id="qq-name" name="name" autoComplete="name" className={inputClasses(!!errors.name)} {...describedBy("qq-name", errors.name)} />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="qq-email" label="Work email" error={errors.email}>
          <input
            id="qq-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className={inputClasses(!!errors.email)}
            {...describedBy("qq-email", errors.email)}
          />
        </Field>
        <Field id="qq-phone" label="Phone" error={errors.phone}>
          <input
            id="qq-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={inputClasses(!!errors.phone)}
            {...describedBy("qq-phone", errors.phone)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="qq-role" label="I am a…" error={errors.role}>
          <select
            id="qq-role"
            name="role"
            defaultValue=""
            className={inputClasses(!!errors.role)}
            {...describedBy("qq-role", errors.role)}
          >
            <option value="" disabled>
              Select one
            </option>
            {roleOptions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>
        <Field id="qq-bid-date" label="Bid due date" optional>
          <input id="qq-bid-date" name="bidDate" type="date" className={inputClasses()} />
        </Field>
      </div>

      <FileDropzone files={files} onChange={setFiles} error={errors.files} compact />

      <Field
        id="qq-link"
        label="Or paste a Dropbox / Google Drive link"
        optional
        error={errors.planLink}
      >
        <input
          id="qq-link"
          name="planLink"
          type="url"
          inputMode="url"
          placeholder="https://"
          className={inputClasses(!!errors.planLink)}
          {...describedBy("qq-link", errors.planLink)}
        />
      </Field>

      <SmsConsent idPrefix="qq-sms" />

      {errors.form && (
        <p role="alert" className="rounded-lg bg-[#fef3f2] p-3 text-body-sm font-medium text-[#b42318]">
          {errors.form} You can also email{" "}
          <a href={`mailto:${siteConfig.email}`} className="underline">
            {siteConfig.email}
          </a>
          .
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className={buttonClasses({ size: "lg", className: "w-full" })}>
        {status === "sending" ? "Sending…" : "Send My Plans for Review"}
        {status !== "sending" && <ArrowRight aria-hidden="true" className="size-5" />}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-caption text-body">
        <Lock aria-hidden="true" className="size-3.5" />
        Confidential. Prefer more detail?{" "}
        <Link href={quoteHref} className="font-semibold text-blueprint underline underline-offset-2">
          Use the full quote form
        </Link>
      </p>
    </form>
  );
}
