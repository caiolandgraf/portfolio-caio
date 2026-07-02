import type { Project } from "../types";
import { githubConfig } from "../integrations";

export const projects: Project[] = [
  {
    id: "grove",
    name: "Grove",
    description:
      "Opinionated Go CLI that scaffolds and manages production-ready applications with GORM, Fuego, and Atlas migrations.",
    technologies: ["Go", "GORM", "OpenAPI", "Atlas", "CLI"],
    github: "https://github.com/caiolandgraf/grove",
    demo: "https://caiolandgraf.github.io/grove/",
    image: "/images/projects/grove.png",
    featured: true,
    openSource: true,
    stars: 7,
  },
  {
    id: "gest",
    name: "gest",
    description:
      "A Jest-inspired testing framework for Go with beautiful output and zero dependencies.",
    technologies: ["Go", "Testing"],
    github: "https://github.com/caiolandgraf/gest",
    image: "/images/projects/gest.png",
    featured: true,
    openSource: true,
    stars: 8,
  },
  {
    id: "result-pattern",
    name: "Result Pattern",
    description:
      "A safe and elegant pattern for handling errors in TypeScript without relying on try/catch everywhere.",
    technologies: ["TypeScript", "npm"],
    github: "https://github.com/caiolandgraf/result-pattern",
    demo: "https://www.npmjs.com/package/@eicode/result-pattern",
    image: "/images/projects/result-pattern.png",
    featured: true,
    openSource: true,
    stars: 6,
  },
  {
    id: "pam",
    name: "pam",
    description:
      "Minimal CLI for managing and executing SQL queries across multiple databases, built with Go and Bubble Tea.",
    technologies: ["Go", "Bubble Tea", "SQL", "CLI"],
    github: "https://github.com/caiolandgraf/pam",
    image: "/images/projects/pam.png",
    featured: true,
    openSource: true,
    stars: 6,
  },
  {
    id: "dwight",
    name: "dwight",
    description:
      "Keyboard-first Docker TUI dashboard for security and container management.",
    technologies: ["Go", "Docker", "TUI"],
    github: "https://github.com/caiolandgraf/dwight",
    image: "/images/projects/dwight.png",
    featured: false,
    openSource: true,
    stars: 1,
  },
  {
    id: "chain",
    name: "chain",
    description:
      "A WhatsApp chain management tool for organizing and automating message flows.",
    technologies: ["TypeScript", "Node.js"],
    github: "https://github.com/caiolandgraf/chain",
    image: "/images/projects/chain.png",
    featured: false,
    openSource: true,
    stars: 3,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const openSourceProjects = projects.filter((p) => p.openSource);

export const pinnedProjects = githubConfig.pinnedRepos
  .map((repoId) => projects.find((project) => project.id === repoId))
  .filter((project): project is Project => project !== undefined);
