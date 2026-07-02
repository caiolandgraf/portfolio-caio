import { ImageResponse } from "next/og";
import { seo } from "@content/seo";
import { siteConfig } from "@/lib/seo";

export const alt = `${siteConfig.name} Blog`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#09090B",
          padding: "64px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 24, color: "#3B82F6", marginBottom: 16 }}>
          Blog
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 600,
            color: "#FAFAFA",
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 28, color: "#A1A1AA", maxWidth: 800 }}>
          Technical writing on software engineering, architecture, and developer
          tooling.
        </div>
      </div>
    ),
    { ...size },
  );
}
