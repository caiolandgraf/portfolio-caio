import { skills } from "@content/skills";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SkillPill } from "@/components/shared/skill-pill";

export function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      description="Technologies and practices I work with daily."
    >
      <Container>
        <div className="grid gap-8 sm:grid-cols-2">
          {skills.map((category, index) => (
            <AnimatedSection key={category.id} delay={index * 0.05}>
              <div className="space-y-3">
                <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-secondary">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <SkillPill key={skill} name={skill} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
