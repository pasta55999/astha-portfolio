import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0f",
          color: "#f4f1ea",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 4, color: "#d4ff3f", fontFamily: "monospace" }}>
          <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
            <path d="M6 27 16 5l10 22" stroke="#d4ff3f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.5 19h11" stroke="#d4ff3f" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          {profile.eyebrow.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 0.95, letterSpacing: -3 }}>
          <span>{profile.headline[0]}</span>
          <span>
            <span style={{ color: "#b9b6ae", fontStyle: "italic" }}>Built to</span> make things <span style={{ color: "#d4ff3f" }}>happen.</span>
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#b9b6ae", fontFamily: "monospace" }}>
          <span>{profile.name}</span>
          <span>github.com/{profile.github.handle}</span>
        </div>
      </div>
    ),
    size,
  );
}
