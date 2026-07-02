import { ImageResponse } from "next/og";
import { getGitHubAvatarUrl } from "@/lib/github-avatar";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
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
          borderRadius: 6,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarUrl}
          alt=""
          width={28}
          height={28}
          style={{ borderRadius: 6 }}
        />
      </div>
    ),
    { ...size },
  );
}
