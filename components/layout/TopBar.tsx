import { Clock, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "./SocialLinks";

/** Thin navy utility bar above the main nav. Desktop/tablet only; it scrolls away. */
export function TopBar() {
  return (
    <div className="hidden border-b border-white/10 bg-navy text-navy-200 md:block">
      <Container className="flex h-10 items-center justify-between text-caption">
        <div className="flex items-center gap-4">
          <a href={siteConfig.phoneHref} className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
            <Phone aria-hidden="true" className="size-3.5 text-accent" />
            {siteConfig.phone}
          </a>
          <span aria-hidden="true" className="text-navy-300/50">
            |
          </span>
          <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
            <Mail aria-hidden="true" className="size-3.5 text-accent" />
            {siteConfig.email}
          </a>
        </div>
        <div className="hidden items-center gap-1.5 text-navy-300 lg:flex">
          <Clock aria-hidden="true" className="size-3.5 text-accent" />
          <span>{siteConfig.hours}</span>
        </div>
        <SocialLinks className="-mr-2 gap-0.5" iconClassName="size-3.5" />
      </Container>
    </div>
  );
}
