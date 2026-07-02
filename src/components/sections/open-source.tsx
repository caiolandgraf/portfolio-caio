import { pinnedProjects } from "@content/projects";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/sections/project-card";
import { AnimatedSection } from "@/components/shared/animated-section";
import { GitHubStats } from "@/components/sections/github-stats";

export function OpenSource() {
  return (
    <Section
      id="open-source"
      title="Open Source"
      description="Libraries and tools built for the developer community."
    >
      <Container className="space-y-12">
        <GitHubStats />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pinnedProjects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.05}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
