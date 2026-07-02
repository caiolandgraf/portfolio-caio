import { talks } from "@content/talks";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { isNavigableHref } from "@/lib/content";
import { ExternalLink } from "lucide-react";

export function Talks() {
  return (
    <Section
      id="talks"
      title="Talks"
      description="Conference talks, podcasts, and community appearances."
    >
      <Container>
        <div className="space-y-4">
          {talks.map((talk, index) => (
            <AnimatedSection key={talk.id} delay={index * 0.05}>
              <div className="rounded-lg border border-border bg-surface p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-primary">{talk.title}</h3>
                    <p className="text-sm text-secondary">{talk.event}</p>
                    <p className="text-sm text-secondary leading-relaxed">
                      {talk.description}
                    </p>
                    <p className="font-mono text-xs text-secondary">
                      {talk.date}
                    </p>
                  </div>
                  {talk.link && isNavigableHref(talk.link) && (
                    <a
                      href={talk.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-secondary hover:text-primary"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
