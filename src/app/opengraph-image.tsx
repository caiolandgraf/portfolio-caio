import { ImageResponse } from "next/og";
import { profile } from "@content/profile";
import { seo } from "@content/seo";
import { getGitHubAvatarUrl } from "@/lib/github-avatar";

export const alt = seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const avatarUrl = await getGitHubAvatarUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090B",
          padding: "64px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                fontSize: 56,
                fontWeight: 600,
                color: "#FAFAFA",
                letterSpacing: "-0.02em",
              }}
            >
              {profile.name}
            </div>
            <div style={{ fontSize: 28, color: "#A1A1AA" }}>{profile.title}</div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarUrl}
            alt=""
            width={120}
            height={120}
            style={{
              borderRadius: 16,
              border: "2px solid #27272A",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {seo.ogTechnologies.map((tech) => (
            <div
              key={tech}
              style={{
                padding: "10px 18px",
                borderRadius: 8,
                border: "1px solid #27272A",
                background: "#111113",
                color: "#A1A1AA",
                fontSize: 22,
                fontFamily: "monospace",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
