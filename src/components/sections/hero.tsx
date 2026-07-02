import Image from "next/image";
import Link from "next/link";
import { MapPin, Github } from "lucide-react";
import { profile, metrics, socialLinks } from "@content/profile";
import { heroSkills } from "@content/skills";
import { getGitHubAvatarUrl } from "@/lib/github-avatar";
import { Container } from "@/components/layout/container";
import { SocialLinks } from "@/components/shared/social-links";
import { SkillPill } from "@/components/shared/skill-pill";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export async function Hero() {
  const avatarUrl = await getGitHubAvatarUrl();
  const githubUrl =
    socialLinks.find((link) => link.id === "github")?.href ??
    "https://github.com/caiolandgraf";

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24">
      <Container>
        <AnimatedSection>
          <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1 space-y-5">
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight text-primary md:text-3xl">
                  {profile.name}
                </h1>
                <p className="text-base text-primary">{profile.title}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {profile.subtitles.map((subtitle) => (
                    <span
                      key={subtitle}
                      className="font-mono text-sm text-secondary"
                    >
                      {subtitle}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-secondary">
                <MapPin size={14} />
                <span className="text-sm">{profile.location}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {heroSkills.map((skill) => (
                  <SkillPill key={skill} name={skill} />
                ))}
              </div>

              <SocialLinks links={socialLinks} />

              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={14} />
                    GitHub
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-border sm:h-28 sm:w-28">
              <Image
                src={avatarUrl}
                alt={profile.name}
                fill
                className="object-cover"
                priority
                sizes="112px"
                unoptimized
              />
            </div>
          </div>
        </AnimatedSection>

        <Separator className="my-10" />

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-5">
            {metrics.map((metric) => (
              <div key={metric.id} className="space-y-1">
                <p className="font-mono text-2xl font-semibold text-primary md:text-3xl">
                  {metric.value}
                </p>
                <p className="text-sm text-secondary">{metric.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
