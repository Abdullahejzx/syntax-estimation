"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CircleCheck, ClipboardList, FileText, Lock, Mail, Phone, Timer, UserRound } from "lucide-react";
import { useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { projectTypes, quoteRoles, turnaroundOptions, usStates } from "@/content/quote";
import { services } from "@/content/services";
import { specialtyTrades } from "@/content/trades";
import { cn } from "@/lib/cn";
import { isEmail, isPhone, isUrl, submitForm } from "@/lib/submitForm";
import { validateFiles } from "@/lib/uploads";
import { buttonClasses } from "@/components/ui/Button";
import { Field, describedBy, inputClasses } from "./Field";
import { FileDropzone } from "./FileDropzone";
import { SmsConsent } from "./SmsConsent";
import { useFormStart } from "./useFormStart";

const STEPS = [
  { key: "project", label: "Project", title: "Who is submitting this project?", icon: UserRound },
  { key: "scope", label: "Scope", title: "Scope & services", icon: ClipboardList },
  { key: "plans", label: "Plans", title: "Upload your drawings", icon: FileText },
  { key: "contact", label: "Contact", title: "Where should we send your quote?", icon: Mail },
] as const;

type Errors = Record<string, string>;

const SIZE_HINT = "Square feet, units or sheet count, whatever you know.";

const str = (data: FormData, key: string) => String(data.get(key) ?? "").trim();

/** Per-step validation. Returns field name → message. */
function validateStep(step: number, data: FormData, files: File[]): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (!str(data, "role")) e.role = "Choose the option that describes you.";
    if (!str(data, "projectType")) e.projectType = "Choose a project type.";
    if (!str(data, "city")) e.city = "Enter the project city.";
    if (!str(data, "state")) e.state = "Choose the project state.";
  }
  if (step === 1) {
    if (data.getAll("services[]").length === 0) e.services = "Choose at least one service.";
  }
  if (step === 2) {
    const link = str(data, "planLink");
    if (link && !isUrl(link)) e.planLink = "Paste the full link, starting with https://";
    const fileProblem = validateFiles(files);
    if (fileProblem) e.files = fileProblem;
    if (!files.length && !link && str(data, "notes").length < 20) {
      e.files = "Upload your plans, paste a link, or describe the project in the notes (20+ characters).";
    }
  }
  if (step === 3) {
    if (!str(data, "name")) e.name = "Enter your name.";
    if (!isEmail(str(data, "email"))) e.email = "Enter a valid email address.";
    if (!isPhone(str(data, "phone"))) e.phone = "Enter a phone number with area code.";
  }
  return e;
}

/**
 * The full four-step quote request (Project → Scope → Plans → Contact) on /get-a-quote.
 * Every step stays mounted (only hidden), so values survive moving back and forth and the
 * whole form is submitted at once to public/api/quote.php.
 */
export function QuoteWizard() {
  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<Array<HTMLHeadingElement | null>>([]);
  const startedAt = useFormStart();

  const [step, setStep] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState<{ reference?: string; email: string } | null>(null);

  const last = STEPS.length - 1;

  function goTo(next: number) {
    setStep(next);
    setFurthest((f) => Math.max(f, next));
    setErrors({});
    // Bring the top of the card into view and move focus to the new step heading
    requestAnimationFrame(() => {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      headingRefs.current[next]?.focus({ preventScroll: true });
    });
  }

  function checkStep(current: number) {
    const form = formRef.current!;
    const found = validateStep(current, new FormData(form), files);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      const target = form.querySelector<HTMLElement>(`[data-field="${first}"], [name="${first}"], [name="${first}[]"]`);
      target?.focus();
      return false;
    }
    return true;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Enter key on an earlier step behaves like "Next"
    if (step < last) {
      if (checkStep(step)) goTo(step + 1);
      return;
    }
    // Re-check every step in case something was changed after moving on
    for (let i = 0; i <= last; i++) {
      const data = new FormData(formRef.current!);
      const found = validateStep(i, data, files);
      if (Object.keys(found).length) {
        if (i !== step) goTo(i);
        setErrors(found);
        return;
      }
    }

    const data = new FormData(formRef.current!);
    files.forEach((f) => data.append("files[]", f));
    setSending(true);
    setFormError(null);
    setProgress(0);
    const result = await submitForm(data, files.length ? setProgress : undefined);
    setSending(false);

    if (result.ok) {
      setDone({ reference: result.reference, email: str(data, "email") });
      requestAnimationFrame(() => cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
      return;
    }
    if (result.errors && Object.keys(result.errors).length) setErrors(result.errors);
    setFormError(result.message ?? "Something went wrong. Please try again.");
  }

  function reset() {
    formRef.current?.reset();
    setFiles([]);
    setErrors({});
    setFormError(null);
    setDone(null);
    setStep(0);
    setFurthest(0);
  }

  // ---------------------------------------------------------------------------
  // Success state
  // ---------------------------------------------------------------------------
  if (done) {
    return (
      <div ref={cardRef} className="scroll-mt-28 overflow-hidden rounded-xl border border-line bg-white shadow-float">
        <div aria-hidden="true" className="h-1 bg-accent" />
        <div role="status" className="p-6 text-center sm:p-10">
          <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-accent-50">
            <CircleCheck aria-hidden="true" className="size-9 text-accent-ink" />
          </span>
          {done.reference && (
            <p className="mt-4 text-caption font-semibold uppercase tracking-wider text-blueprint-ink">Confirmation #{done.reference}</p>
          )}
          <h2 className="mt-2 text-headline-lg-mobile font-bold sm:text-headline-lg">Thanks! Your plans are in.</h2>
          <p className="mx-auto mt-3 max-w-lg text-body-md">
            Your project has been sent to our estimating team, and we&apos;ve emailed a confirmation to{" "}
            <strong className="text-navy">{done.email}</strong>.
          </p>
          <div className="mx-auto mt-8 max-w-lg rounded-xl bg-mist p-5 text-left">
            <p className="mb-3 text-caption font-semibold uppercase tracking-wider text-body">What happens next</p>
            <ul className="space-y-3 text-body-sm text-ink">
              <li className="flex gap-3">
                <Timer aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-ink" />
                An estimator reviews your drawings for scope and completeness.
              </li>
              <li className="flex gap-3">
                <FileText aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-ink" />
                You receive a fixed quote and delivery date by email, usually the same business day.
              </li>
              <li className="flex gap-3">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-ink" />
                <span>
                  Questions? Call us at{" "}
                  <a href={siteConfig.phoneHref} className="font-semibold text-navy underline">
                    {siteConfig.phone}
                  </a>
                  .
                </span>
              </li>
            </ul>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={reset} className={buttonClasses({ variant: "secondary", fullOnMobile: true })}>
              Submit another project
            </button>
            <Link href="/" className={buttonClasses({ fullOnMobile: true })}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Form
  // ---------------------------------------------------------------------------
  const err = (name: string) => errors[name];
  const progressPct = Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <div ref={cardRef} className="scroll-mt-28 overflow-hidden rounded-xl border border-line bg-white shadow-float">
      <div aria-hidden="true" className="h-1 bg-accent" />
      <form ref={formRef} onSubmit={onSubmit} noValidate className="p-5 sm:p-8">
        <input type="hidden" name="formType" value="full-quote" />
        <input type="hidden" name="ts" value={startedAt} />
        {/* Honeypot: hidden from people, bots fill it in */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
          <label>
            Company website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {/* Progress */}
        <div className="mb-6 border-b border-line pb-6">
          <div className="mb-3 flex items-center justify-between text-caption">
            <span className="font-semibold uppercase tracking-wider text-body">Project request</span>
            <span className="font-bold text-accent-ink" aria-live="polite">
              Step {step + 1} of {STEPS.length}
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="Form progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPct}
            className="mb-4 h-1.5 overflow-hidden rounded-full bg-blue-50 sm:hidden"
          >
            <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${progressPct}%` }} />
          </div>
          <ol className="grid grid-cols-4 gap-2 sm:gap-4">
            {STEPS.map((s, i) => {
              const state = i === step ? "current" : i < step || i <= furthest ? "visited" : "upcoming";
              const canJump = i < step || (i <= furthest && i !== step);
              return (
                <li key={s.key}>
                  <button
                    type="button"
                    disabled={!canJump}
                    onClick={() => goTo(i)}
                    aria-current={i === step ? "step" : undefined}
                    className="group flex w-full flex-col gap-2 text-left disabled:cursor-default"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "inline-flex size-7 shrink-0 items-center justify-center rounded-full text-caption font-bold transition-colors",
                          state === "current" && "bg-accent text-navy",
                          state === "visited" && "bg-navy text-white",
                          state === "upcoming" && "bg-blue-50 text-body",
                        )}
                      >
                        {i < step ? <Check aria-hidden="true" className="size-4" strokeWidth={3} /> : i + 1}
                      </span>
                      <span
                        className={cn(
                          "hidden font-display text-[0.9375rem] font-semibold sm:inline",
                          state === "upcoming" ? "text-body" : "text-navy",
                          canJump && "group-hover:text-blueprint-ink",
                        )}
                      >
                        {s.label}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn("hidden h-1 rounded-full sm:block", i <= step ? "bg-accent" : "bg-blue-50")}
                    />
                    <span className="sr-only">
                      Step {i + 1}: {s.label}
                      {i < step ? " (completed)" : ""}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Step 1: Project */}
        <fieldset hidden={step !== 0} className="space-y-6">
          <StepHeading index={0} refs={headingRefs} />
          <div>
            <p id="role-label" className="mb-2 text-body-sm font-medium text-navy">
              I am a…
            </p>
            <div role="radiogroup" aria-labelledby="role-label" aria-describedby={err("role") ? "role-error" : undefined} className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {quoteRoles.map((r, i) => (
                <label
                  key={r.value}
                  className="group relative flex cursor-pointer flex-col rounded-xl border-2 border-line bg-white p-4 transition-colors hover:border-line-strong has-[:checked]:border-accent has-[:checked]:bg-accent-50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-blueprint"
                >
                  <input
                    type="radio"
                    name="role"
                    value={r.value}
                    data-field={i === 0 ? "role" : undefined}
                    className="peer sr-only"
                  />
                  <CircleCheck aria-hidden="true" className="absolute top-3 right-3 hidden size-5 text-accent-ink peer-checked:block" />
                  <r.icon aria-hidden="true" className="mb-3 size-6 text-blueprint-ink group-has-[:checked]:text-accent-ink" />
                  <span className="font-display text-[0.9375rem] font-bold text-navy">{r.title}</span>
                  <span className="text-caption text-body">{r.text}</span>
                </label>
              ))}
            </div>
            {err("role") && (
              <p id="role-error" className="mt-1.5 text-caption font-medium text-[#b42318]">
                {err("role")}
              </p>
            )}
          </div>

          <Field id="qw-project-name" label="Project name" optional>
            <input id="qw-project-name" name="projectName" placeholder="e.g. Riverside Medical Office" className={inputClasses()} />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field id="qw-type" label="Project type" error={err("projectType")}>
              <select id="qw-type" name="projectType" defaultValue="" className={inputClasses(!!err("projectType"))} {...describedBy("qw-type", err("projectType"))}>
                <option value="" disabled>
                  Select one
                </option>
                {projectTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field id="qw-city" label="Project city" error={err("city")}>
              <input id="qw-city" name="city" autoComplete="address-level2" className={inputClasses(!!err("city"))} {...describedBy("qw-city", err("city"))} />
            </Field>
            <Field id="qw-state" label="Project state" error={err("state")}>
              <select id="qw-state" name="state" defaultValue="" className={inputClasses(!!err("state"))} {...describedBy("qw-state", err("state"))}>
                <option value="" disabled>
                  Select
                </option>
                {usStates.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>
        </fieldset>

        {/* Step 2: Scope */}
        <fieldset hidden={step !== 1} className="space-y-6">
          <StepHeading index={1} refs={headingRefs} />
          <div>
            <p id="services-label" className="mb-2 text-body-sm font-medium text-navy">
              Services you need
            </p>
            <div role="group" aria-labelledby="services-label" aria-describedby={err("services") ? "services-error" : undefined} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {services.map((s, i) => (
                <label
                  key={s.slug}
                  className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-line bg-white px-3 py-2 text-body-sm font-medium text-navy hover:border-line-strong has-[:checked]:border-accent has-[:checked]:bg-accent-50"
                >
                  <input
                    type="checkbox"
                    name="services[]"
                    value={s.name}
                    data-field={i === 0 ? "services" : undefined}
                    className="size-[18px] shrink-0 accent-[var(--color-navy)]"
                  />
                  <s.icon aria-hidden="true" className="size-4 shrink-0 text-blueprint-ink" />
                  {s.name}
                </label>
              ))}
            </div>
            {err("services") && (
              <p id="services-error" className="mt-1.5 text-caption font-medium text-[#b42318]">
                {err("services")}
              </p>
            )}
          </div>

          <div>
            <p id="trades-label" className="mb-2 text-body-sm font-medium text-navy">
              Trades & divisions <span className="font-normal text-body">(optional)</span>
            </p>
            <div role="group" aria-labelledby="trades-label" className="flex flex-wrap gap-2">
              {[...specialtyTrades.map((t) => t.shortName), "Entire project (all divisions)"].map((name) => (
                <label
                  key={name}
                  className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-mist px-3 text-body-sm font-medium text-navy hover:border-line-strong has-[:checked]:border-navy has-[:checked]:bg-navy has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-blueprint"
                >
                  <input type="checkbox" name="trades[]" value={name} className="peer sr-only" />
                  <span aria-hidden="true" className="peer-checked:hidden">+</span>
                  <Check aria-hidden="true" className="hidden size-3.5 peer-checked:block" strokeWidth={3} />
                  {name}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p id="turnaround-label" className="mb-2 text-body-sm font-medium text-navy">
                Turnaround
              </p>
              <div role="radiogroup" aria-labelledby="turnaround-label" className="grid grid-cols-2 gap-2">
                {turnaroundOptions.map((t, i) => (
                  <label
                    key={t.value}
                    className="flex cursor-pointer flex-col rounded-lg border border-line px-3 py-2.5 hover:border-line-strong has-[:checked]:border-accent has-[:checked]:bg-accent-50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-blueprint"
                  >
                    <input type="radio" name="turnaround" value={t.value} defaultChecked={i === 0} className="sr-only" />
                    <span className="text-body-sm font-semibold text-navy">{t.title}</span>
                    <span className="text-caption text-body">{t.text}</span>
                  </label>
                ))}
              </div>
            </div>
            <Field id="qw-bid-date" label="Bid due date" optional>
              <input id="qw-bid-date" name="bidDate" type="date" className={inputClasses()} />
            </Field>
          </div>

          <Field id="qw-size" label="Approximate size" optional hint={SIZE_HINT}>
            <input id="qw-size" name="size" placeholder="e.g. 48,000 SF or 120 sheets" className={inputClasses()} {...describedBy("qw-size", undefined, SIZE_HINT)} />
          </Field>
        </fieldset>

        {/* Step 3: Plans */}
        <fieldset hidden={step !== 2} className="space-y-6">
          <StepHeading index={2} refs={headingRefs} />
          <div data-field="files" tabIndex={-1} className="outline-none">
            <FileDropzone files={files} onChange={setFiles} error={err("files")} label="Plans & specifications" />
          </div>
          <Field id="qw-link" label="Or paste a Dropbox, Google Drive or plan-room link" optional error={err("planLink")}>
            <input
              id="qw-link"
              name="planLink"
              type="url"
              inputMode="url"
              placeholder="https://"
              className={inputClasses(!!err("planLink"))}
              {...describedBy("qw-link", err("planLink"))}
            />
          </Field>
          <Field id="qw-notes" label="Addenda, exclusions & notes" optional>
            <textarea
              id="qw-notes"
              name="notes"
              rows={5}
              maxLength={4000}
              placeholder="Addenda numbers, scope to include or exclude, prevailing wage requirements, or how you'd like the takeoff organized."
              className={cn(inputClasses(), "min-h-32 resize-y")}
            />
          </Field>
        </fieldset>

        {/* Step 4: Contact */}
        <fieldset hidden={step !== 3} className="space-y-5">
          <StepHeading index={3} refs={headingRefs} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="qw-name" label="Full name" error={err("name")}>
              <input id="qw-name" name="name" autoComplete="name" className={inputClasses(!!err("name"))} {...describedBy("qw-name", err("name"))} />
            </Field>
            <Field id="qw-company" label="Company" optional>
              <input id="qw-company" name="company" autoComplete="organization" className={inputClasses()} />
            </Field>
            <Field id="qw-email" label="Work email (your quote is sent here)" error={err("email")}>
              <input
                id="qw-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                className={inputClasses(!!err("email"))}
                {...describedBy("qw-email", err("email"))}
              />
            </Field>
            <Field id="qw-phone" label="Direct phone" error={err("phone")}>
              <input
                id="qw-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={inputClasses(!!err("phone"))}
                {...describedBy("qw-phone", err("phone"))}
              />
            </Field>
          </div>
          <SmsConsent idPrefix="qw-sms" />
        </fieldset>

        {formError && (
          <p role="alert" className="mt-6 rounded-lg bg-[#fef3f2] p-3 text-body-sm font-medium text-[#b42318]">
            {formError} You can also email{" "}
            <a href={`mailto:${siteConfig.email}`} className="underline">
              {siteConfig.email}
            </a>
            .
          </p>
        )}

        {sending && files.length > 0 && (
          <div className="mt-6" aria-live="polite">
            <div className="mb-1 flex justify-between text-caption text-body">
              <span>Uploading {files.length} file{files.length === 1 ? "" : "s"}…</span>
              <span className="tabular">{Math.round(progress * 100)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-blue-50">
              <div className="h-full rounded-full bg-blueprint transition-[width]" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        )}

        {/* Navigation: inline from 768px, fixed to the bottom of the screen on phones */}
        <div className="mt-8 hidden items-center justify-between gap-3 border-t border-line pt-6 md:flex">
          <StepNav step={step} last={last} sending={sending} onBack={() => goTo(step - 1)} />
        </div>
        <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(11,37,69,0.08)] backdrop-blur md:hidden">
          <div className="flex items-center gap-3">
            <StepNav step={step} last={last} sending={sending} onBack={() => goTo(step - 1)} compact />
          </div>
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-caption text-body">
          <Lock aria-hidden="true" className="size-3.5" />
          Your plans and details are kept confidential.
        </p>
      </form>
    </div>
  );
}

function StepHeading({ index, refs }: { index: number; refs: React.MutableRefObject<Array<HTMLHeadingElement | null>> }) {
  const s = STEPS[index];
  return (
    <legend className="contents">
      <h2
        ref={(el) => {
          refs.current[index] = el;
        }}
        tabIndex={-1}
        className="mb-6 flex items-center gap-3 text-[1.25rem] font-bold outline-none sm:text-headline-md"
      >
        <s.icon aria-hidden="true" className="size-6 shrink-0 text-accent-ink" />
        <span>
          {index + 1}. {s.title}
        </span>
      </h2>
    </legend>
  );
}

function StepNav({
  step,
  last,
  sending,
  onBack,
  compact,
}: {
  step: number;
  last: number;
  sending: boolean;
  onBack: () => void;
  compact?: boolean;
}) {
  return (
    <>
      {step > 0 ? (
        <button type="button" onClick={onBack} disabled={sending} className={buttonClasses({ variant: "secondary", className: compact ? "flex-1" : "" })}>
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back
        </button>
      ) : (
        !compact && <span />
      )}
      <button type="submit" disabled={sending} className={buttonClasses({ size: compact ? "md" : "lg", className: compact ? "flex-[2]" : "" })}>
        {step < last ? (
          <>
            Next: {STEPS[step + 1].label}
            <ArrowRight aria-hidden="true" className="size-4" />
          </>
        ) : sending ? (
          "Sending…"
        ) : (
          <>
            Submit &amp; Get My Quote
            <ArrowRight aria-hidden="true" className="size-4" />
          </>
        )}
      </button>
    </>
  );
}
