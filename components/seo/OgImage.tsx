import { siteConfig } from "@/config/site";
import type { OgCard } from "@/lib/og";

/*
 * Layout for the 1200×630 share images. Rendered by next/og (Satori), which supports
 * only inline styles and flexbox, so this does not use Tailwind classes.
 */

const navy = "#0b2545";
const accent = "#f28c28";
const blueprint = "#2f6fdb";
const grid = "rgba(47, 111, 219, 0.16)";

const titleSize = (title: string) => (title.length <= 32 ? 76 : title.length <= 56 ? 64 : 54);

/** Faint drafting sketch on the right: a plan outline with dimension lines. */
function PlanSketch() {
  return (
    <svg width="460" height="460" viewBox="0 0 460 460" style={{ position: "absolute", right: -90, top: 110, opacity: 0.45 }}>
      <g fill="none" stroke={blueprint} strokeWidth="2">
        <rect x="60" y="60" width="340" height="300" />
        <path d="M60 200h170v160M230 200V60M300 200h100" />
        <path d="M290 60v60M330 360v-70" strokeDasharray="6 6" />
      </g>
      <g fill="none" stroke={accent} strokeWidth="2">
        <path d="M60 400h340M60 392v16M400 392v16" />
        <path d="M20 60v300M12 60h16M12 360h16" />
      </g>
      <circle cx="230" cy="200" r="7" fill={accent} />
    </svg>
  );
}

export function OgImage({ eyebrow, title, subtitle }: OgCard) {
  const domain = new URL(siteConfig.url).hostname.replace(/^www\./, "");
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        padding: "60px 72px 52px",
        backgroundColor: navy,
        backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        fontFamily: "Inter",
        color: "#ffffff",
      }}
    >
      {/* Fades the grid toward the text side */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          backgroundImage: `linear-gradient(90deg, ${navy} 0%, rgba(11, 37, 69, 0.85) 55%, rgba(11, 37, 69, 0.2) 100%)`,
        }}
      />
      <PlanSketch />
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 10, display: "flex", backgroundColor: accent }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="60" height="60" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="7" fill="#ffffff" />
            <path d="M23 10.5H9.5v5.5h13v5.5H9" fill="none" stroke={navy} strokeWidth="2.4" strokeLinecap="square" />
            <circle cx="23" cy="21.5" r="2.2" fill={accent} />
          </svg>
          <div style={{ display: "flex", fontFamily: "Manrope", fontSize: 34, fontWeight: 800, letterSpacing: -0.5 }}>
            Syntax<span style={{ fontWeight: 600, marginLeft: 9 }}>Estimation</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "9px 18px",
            borderRadius: 6,
            backgroundColor: accent,
            color: navy,
            fontFamily: "Manrope",
            fontSize: 19,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, maxWidth: 800 }}>
        <div style={{ display: "flex", width: 96, height: 6, borderRadius: 3, backgroundColor: accent, marginBottom: 28 }} />
        <div
          style={{
            display: "flex",
            fontFamily: "Manrope",
            fontSize: titleSize(title),
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 28, lineHeight: 1.4, color: "#c9d5e8", maxWidth: 760 }}>{subtitle}</div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 24,
          borderTop: "1px solid rgba(255, 255, 255, 0.16)",
          fontSize: 22,
        }}
      >
        <div style={{ display: "flex", fontWeight: 600 }}>{domain}</div>
        <div style={{ display: "flex", color: accent, fontWeight: 600 }}>Estimates & takeoffs · All 50 states</div>
      </div>
    </div>
  );
}
