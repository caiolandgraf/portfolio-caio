import { ImageResponse } from "next/og";
import { getGitHubAvatarUrl } from "@/lib/github-avatar";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const avatarUrl = await getGitHubAvatarUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090B",
          borderRadius: 32,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarUrl}
          alt=""
          width={160}
          height={160}
          style={{ borderRadius: 32 }}
        />
      </div>
    ),
    { ...size },
  );
}
