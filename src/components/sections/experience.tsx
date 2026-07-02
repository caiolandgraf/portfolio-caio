import { experience } from "@content/experience";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SkillPill } from "@/components/shared/skill-pill";
import { AnimatedSection } from "@/components/shared/animated-section";

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      description="Professional journey building software at scale."
    >
      <Container>
        <div className="relative space-y-0">
          {experience.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.05}>
              <div className="relative grid gap-4 pb-12 md:grid-cols-[200px_1fr] md:gap-10">
                {index < experience.length - 1 && (
                  <div className="absolute left-[99px] top-8 hidden h-[calc(100%-2rem)] w-px bg-border md:block" />
                )}

                {item.redacted ? (
                  <>
                    <div className="space-y-1">
                      {item.period ? (
                        <p className="font-mono text-sm text-secondary/60">
                          {item.period}
                        </p>
                      ) : (
                        <div aria-hidden="true" />
                      )}
                    </div>
                    <p className="font-mono text-sm text-secondary/60">[...]</p>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <p className="font-mono text-sm text-secondary">
                        {item.period}
                      </p>
                      {item.current && (
                        <span className="inline-block font-mono text-xs text-accent">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-primary">
                          {item.role}
                        </h3>
                        <p className="text-secondary">
                          {item.company}
                          {item.location && (
                            <span className="text-secondary/70">
                              {" "}
                              · {item.location}
                            </span>
                          )}
                        </p>
                      </div>

                      <p className="text-sm text-secondary leading-relaxed">
                        {item.description}
                      </p>

                      <ul className="space-y-2">
                        {item.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-2 text-sm text-secondary"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-secondary" />
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <SkillPill key={tech} name={tech} />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
