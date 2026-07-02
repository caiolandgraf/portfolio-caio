import { ImageResponse } from "next/og";
import {
  Github,
  Linkedin,
  Youtube,
  Instagram,
  Mail,
  MapPin,
} from "lucide-react";
import { profile, socialLinks } from "@content/profile";
import { heroSkills } from "@content/skills";
import { seo } from "@content/seo";
import { getSkillVisual } from "@/lib/skill-icons";
import { getOgAvatarSrc } from "@/lib/og-avatar";

export const alt = seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

const BG = "#09090B";
const SURFACE = "#18181B";
const BORDER = "#27272A";
const PRIMARY = "#FAFAFA";
const SECONDARY = "#A1A1AA";

const socialIconMap = {
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
  email: Mail,
} as const;

function XGlyph({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={SECONDARY}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default async function Image() {
  const avatarSrc = await getOgAvatarSrc();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "64px 72px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 48,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                fontSize: 62,
                fontWeight: 700,
                color: PRIMARY,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {profile.name}
            </div>
            <div
              style={{
                fontSize: 30,
                color: PRIMARY,
                letterSpacing: "-0.01em",
              }}
            >
              {profile.title}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                marginTop: 6,
                maxWidth: 720,
              }}
            >
              {profile.subtitles.map((subtitle) => (
                <span
                  key={subtitle}
                  style={{ fontSize: 20, color: SECONDARY }}
                >
                  {subtitle}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 6,
                color: SECONDARY,
              }}
            >
              <MapPin size={20} color={SECONDARY} />
              <span style={{ fontSize: 20 }}>{profile.location}</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexShrink: 0,
              padding: 5,
              borderRadius: 26,
              background: "linear-gradient(135deg, #27272A 0%, #3F3F46 100%)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarSrc}
              alt=""
              width={200}
              height={200}
              style={{ borderRadius: 22, objectFit: "cover" }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            maxWidth: 1056,
          }}
        >
          {heroSkills.map((skill) => {
            const { icon: Icon, color } = getSkillVisual(skill);
            return (
              <div
                key={skill}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: `1px solid ${BORDER}`,
                  background: SURFACE,
                }}
              >
                <Icon size={20} color={color} />
                <span style={{ fontSize: 20, color: SECONDARY }}>{skill}</span>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {socialLinks.map((link) => {
            if (link.icon === "x") {
              return <XGlyph key={link.id} />;
            }
            const Icon =
              socialIconMap[link.icon as keyof typeof socialIconMap];
            return Icon ? (
              <Icon key={link.id} size={26} color={SECONDARY} />
            ) : null;
          })}
        </div>
      </div>
    ),
    { ...size },
  );
}
