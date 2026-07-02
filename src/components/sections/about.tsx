import { profile } from "@content/profile";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";

export function About() {
  const paragraphs = profile.bio.long.split("\n\n");

  return (
    <Section id="about" title="About">
      <Container>
        <AnimatedSection>
          <div className="max-w-3xl space-y-5">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-secondary leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
