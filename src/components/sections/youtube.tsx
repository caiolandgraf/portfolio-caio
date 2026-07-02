import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { getYouTubeVideos } from "@/lib/youtube";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";

export async function YouTubeSection() {
  const videos = await getYouTubeVideos();

  if (videos.length === 0) return null;

  return (
    <Section
      id="youtube"
      title="YouTube"
      description="Tutorials, live coding sessions, and career insights for developers."
    >
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <AnimatedSection key={video.id} delay={Math.min(index, 6) * 0.05}>
              <Link
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-accent/30"
              >
                <div className="relative aspect-video overflow-hidden bg-background">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 224px"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <Play size={32} className="text-white" />
                  </div>
                </div>
                <div className="space-y-2 p-4">
                  <h3 className="line-clamp-2 text-sm font-medium text-primary">
                    {video.title}
                  </h3>
                  <p className="font-mono text-xs text-secondary">
                    {new Date(video.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
