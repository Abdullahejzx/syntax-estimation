"use client";

import { Building2, ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";
import { fullAddress, siteConfig } from "@/config/site";

/**
 * Office map that only loads Google Maps after a click, so the page stays fast and
 * no third-party cookies are set until the visitor asks for the map.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  const query = encodeURIComponent(`${siteConfig.name}, ${fullAddress}`);
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  return (
    <div className="bg-blueprint-grid relative h-80 overflow-hidden rounded-xl border border-line bg-blue-50 shadow-lift sm:h-96">
      {loaded ? (
        <iframe
          title={`Map of ${siteConfig.name} office`}
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span aria-hidden="true" className="absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blueprint/10" />
          <MapPin aria-hidden="true" className="relative size-10 text-accent-ink" />
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="absolute top-4 right-4 min-h-11 rounded-lg border border-line bg-white px-4 text-body-sm font-semibold text-navy shadow-card hover:border-blueprint"
          >
            Show interactive map
          </button>
        </div>
      )}
      <div className="absolute right-4 bottom-4 left-4 max-w-md rounded-xl border border-line bg-white/95 p-4 shadow-lift backdrop-blur sm:right-auto">
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-navy">
            <Building2 className="size-5" />
          </span>
          <div>
            <p className="inline-block rounded bg-blue-50 px-1.5 py-0.5 text-[0.6875rem] font-semibold text-blueprint">Headquarters</p>
            <p className="mt-1 font-display font-bold text-navy">{siteConfig.name}</p>
            <address className="text-caption not-italic text-body">{fullAddress}</address>
            <a
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-9 items-center gap-1 text-caption font-semibold text-accent-ink hover:underline"
            >
              Get directions <ExternalLink aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
