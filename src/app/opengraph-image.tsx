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
          background: "radial-gradient(60% 50% at 85% 15%, rgba(124,58,237,0.45), transparent 60%), radial-gradient(45% 45% at 10% 90%, rgba(79,70,229,0.4), transparent 60%), #05010f",
          color: "#f4f2ff",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 7, color: "#c4b4ff", fontFamily: "monospace" }}>{`// ${profile.role} · ${profile.location}`.toUpperCase()}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 120, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4, color: "#fff" }}>{profile.firstName}</span>
          <span style={{ marginTop: 18, fontSize: 48, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1 }}>
            {profile.headline[0]} {profile.headline[1]} <span style={{ color: "#a685ff" }}>{profile.headline[2]}</span>
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(244,242,255,0.6)" }}>
          <span>{profile.name}</span>
          <span>github.com/{profile.github.handle}</span>
        </div>
      </div>
    ),
    size,
  );
}
