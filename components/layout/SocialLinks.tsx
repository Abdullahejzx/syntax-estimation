import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

// Lucide no longer ships brand logos, so these are minimal inline marks.
const icons = {
  linkedin: {
    label: "LinkedIn",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.03-3.06-1.86-3.06-1.87 0-2.15 1.46-2.15 2.96V21H9z",
  },
  x: {
    label: "X (Twitter)",
    path: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25H8.08l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z",
  },
  youtube: {
    label: "YouTube",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6z",
  },
} as const;

/** Social profile icons; any network with an empty URL in siteConfig is hidden. */
export function SocialLinks({ className, iconClassName }: { className?: string; iconClassName?: string }) {
  const entries = (Object.keys(icons) as Array<keyof typeof icons>).filter((k) => siteConfig.social[k]);
  return (
    <ul className={cn("flex items-center", className)}>
      {entries.map((key) => (
        <li key={key}>
          <a
            href={siteConfig.social[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.name} on ${icons[key].label}`}
            className="inline-flex size-9 items-center justify-center rounded-md transition-colors hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className={cn("size-4", iconClassName)} fill="currentColor" aria-hidden="true">
              <path d={icons[key].path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
