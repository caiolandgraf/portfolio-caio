import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandPaletteWrapper } from "@/components/shared/command-palette-wrapper";
import { BackToTop } from "@/components/shared/back-to-top";
import { JsonLd } from "@/components/seo/json-ld";
import { getGitHubAvatarUrl } from "@/lib/github-avatar";
import {
  createRootMetadata,
  createPersonJsonLd,
  createWebSiteJsonLd,
  createOrganizationJsonLd,
} from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = createRootMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const avatarUrl = await getGitHubAvatarUrl();

  const structuredData = [
    createPersonJsonLd(avatarUrl),
    createWebSiteJsonLd(),
    createOrganizationJsonLd(),
  ];

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full`}
    >
      <head>
        <JsonLd data={structuredData} />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Navbar avatarUrl={avatarUrl} />
        <main className="flex-1">{children}</main>
        <Footer />
        <CommandPaletteWrapper />
        <BackToTop />
      </body>
    </html>
  );
}
