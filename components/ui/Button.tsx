import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  // Navy text on orange: 6.3:1 contrast (white on this orange is only 2.5:1)
  primary: "bg-accent text-navy shadow-sm hover:bg-accent-hover",
  secondary: "border border-line bg-white text-navy shadow-sm hover:border-line-strong hover:bg-mist",
  // For use on navy backgrounds
  outlineLight: "border border-white/40 text-white hover:border-white hover:bg-white/10",
  outline: "border border-navy text-navy hover:bg-navy hover:text-white",
  ghost: "text-accent-ink hover:text-navy",
} as const;

const sizes = {
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-13 px-6 text-headline-sm",
} as const;

export type ButtonVariant = keyof typeof variants;

type StyleOptions = {
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  /** Full width below 640px, as the mobile rules require */
  fullOnMobile?: boolean;
  className?: string;
};

export function buttonClasses({ variant = "primary", size = "md", fullOnMobile, className }: StyleOptions = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-display font-semibold whitespace-nowrap",
    "transition-colors duration-150 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    variant !== "ghost" && sizes[size],
    fullOnMobile && "w-full sm:w-auto",
    className,
  );
}

type ButtonLinkProps = StyleOptions & {
  href: string;
  children: React.ReactNode;
  "aria-label"?: string;
};

export function ButtonLink({ href, children, variant, size, fullOnMobile, className, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, fullOnMobile, className });
  // tel:/mailto:/external links skip client-side routing
  if (/^(tel:|mailto:|https?:)/.test(href)) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
