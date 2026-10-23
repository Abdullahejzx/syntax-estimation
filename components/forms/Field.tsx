import { cn } from "@/lib/cn";

/** Shared input styling from the design system: 44px+ tall, 8px radius, blue focus ring. */
export const inputClasses = (invalid?: boolean) =>
  cn(
    "block min-h-11 w-full rounded-lg border bg-white px-3.5 py-2.5 text-[1rem] text-navy shadow-none transition-[border-color,box-shadow]",
    "placeholder:text-placeholder focus:outline-none focus:ring-0",
    invalid
      ? "border-[#b42318] focus:shadow-[0_0_0_3px_rgba(180,35,24,0.15)]"
      : "border-line hover:border-line-strong focus:border-blueprint focus:shadow-[0_0_0_3px_rgba(47,111,219,0.15)]",
  );

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
};

/** Label + control + hint/error, with ids wired for screen readers via `${id}-error` / `${id}-hint`. */
export function Field({ id, label, error, hint, optional, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-body-sm font-medium text-navy">
        {label}
        {optional && <span className="font-normal text-body"> (optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-caption font-medium text-[#b42318]">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="text-caption text-body">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

/** aria props for a control inside <Field>. */
export const describedBy = (id: string, error?: string, hint?: string) => ({
  "aria-invalid": error ? (true as const) : undefined,
  "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
});
