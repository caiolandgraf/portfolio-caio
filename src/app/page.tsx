import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { OpenSource } from "@/components/sections/open-source";
import { BlogPreview } from "@/components/sections/blog-preview";
import { YouTubeSection } from "@/components/sections/youtube";
import { Talks } from "@/components/sections/talks";
import { AnimatedTitle } from "@/components/seo/animated-title";
import { createPageMetadata } from "@/lib/seo";
import { seo } from "@content/seo";

export const metadata = {
  ...createPageMetadata({ path: "/" }),
  title: seo.tabTitle,
};

export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <AnimatedTitle />
      <Hero />
      <About />
      <Experience />
      <OpenSource />
      <BlogPreview />
      <YouTubeSection />
      <Talks />
    </>
  );
}
