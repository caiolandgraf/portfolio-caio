import { ImageResponse } from "next/og";
import { getTabNewsPost } from "@/lib/tabnews";
import { siteConfig } from "@/lib/seo";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface ImageProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const post = await getTabNewsPost(slug);
  const title = post?.title ?? "Blog Post";

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
        <div style={{ fontSize: 24, color: "#3B82F6" }}>TabNews · Blog</div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            color: "#FAFAFA",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 24, color: "#A1A1AA" }}>{siteConfig.name}</div>
      </div>
    ),
    { ...size },
  );
}
