import Link from "next/link";
import { ExternalLink, Github, Star } from "lucide-react";
import type { Project } from "@content/types";
import { SkillPill } from "@/components/shared/skill-pill";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-border/80",
        className,
      )}
    >
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium text-primary">{project.name}</h3>
          {project.stars !== undefined && project.stars > 0 && (
            <span className="flex items-center gap-1 font-mono text-xs text-secondary">
              <Star size={12} />
              {project.stars}
            </span>
          )}
        </div>
        <p className="line-clamp-2 text-sm text-secondary leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <SkillPill key={tech} name={tech} size="sm" />
        ))}
      </div>

      <div className="mt-auto flex items-center gap-4 pt-0.5">
        {project.github && (
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-secondary transition-colors hover:text-primary"
          >
            <Github size={14} />
            Source
          </Link>
        )}
        {project.demo && (
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-secondary transition-colors hover:text-primary"
          >
            <ExternalLink size={14} />
            Demo
          </Link>
        )}
      </div>
    </article>
  );
}
