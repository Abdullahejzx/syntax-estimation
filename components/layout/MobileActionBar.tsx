"use client";

import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { quoteHref } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Sticky Call / Get a Quote bar on phones. Hidden on the quote page,
 * which has its own fixed Back/Next buttons.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/get-a-quote")) return null;

  return (
    <>
      {/* Spacer so the fixed bar never covers the end of the footer */}
      <div aria-hidden="true" className="h-[4.75rem] md:hidden" />
      <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 shadow-[0_-4px_16px_rgba(11,37,69,0.08)] backdrop-blur md:hidden">
        <div className="grid grid-cols-2 gap-3 px-4 py-3">
          <ButtonLink href={siteConfig.phoneHref} variant="outline" aria-label={`Call ${siteConfig.phone}`}>
            <Phone aria-hidden="true" className="size-4" />
            Call
          </ButtonLink>
          <ButtonLink href={quoteHref}>Get a Quote</ButtonLink>
        </div>
      </div>
    </>
  );
}
