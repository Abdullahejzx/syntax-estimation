import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

// Lucide no longer ships brand logos, so these are minimal inline marks.
const icons = {
  linkedin: {
    label: "LinkedIn",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.03-3.06-1.86-3.06-1.87 0-2.15 1.46-2.15 2.96V21H9z",
  },
  facebook: {
    label: "Facebook",
    path: "M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z",
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
