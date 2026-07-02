import { featuredProjects } from "@content/projects";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/sections/project-card";
import { AnimatedSection } from "@/components/shared/animated-section";

export function Projects() {
  return (
    <Section
      id="projects"
      title="Featured Projects"
      description="Selected work spanning developer tooling, open source, and production systems."
    >
      <Container>
        <div className="grid gap-6 sm:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.05}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
