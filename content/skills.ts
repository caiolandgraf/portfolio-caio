import type { SkillCategory } from "./types";

export const skills: SkillCategory[] = [
  {
    id: "languages",
    name: "Languages",
    skills: ["PHP", "Go", "Rust", "Ruby", "TypeScript", "JavaScript", "SQL"],
  },
  {
    id: "backend",
    name: "Backend",
    skills: ["Laravel", "Ruby on Rails", "Node", "REST", "gRPC", "Queues"],
  },
  {
    id: "architecture",
    name: "Architecture",
    skills: [
      "Software Architecture",
      "Tech Lead",
      "DDD",
      "SOLID",
      "Clean Architecture",
      "Microservices",
    ],
  },
  {
    id: "cloud",
    name: "Cloud",
    skills: [
      "AWS",
      "Google Cloud",
      "Cloud Engineer",
      "DevOps",
      "Docker",
      "Linux",
      "Kubernetes",
      "Terraform",
    ],
  },
  {
    id: "database",
    name: "Database",
    skills: ["MySQL", "PostgreSQL", "Redis", "MongoDB"],
  },
  {
    id: "frontend",
    name: "Frontend",
    skills: ["Vue", "React", "TailwindCSS", "Inertia"],
  },
];

/** Flat list shown in the hero — edit here to change what appears at the top. */
export const heroSkills = [
  "Go",
  "Rust",
  "Ruby",
  "Ruby on Rails",
  "TypeScript",
  "PHP",
  "Laravel",
  "DevOps",
  "Cloud Engineer",
  "GCP",
  "AWS",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "MySQL",
  "SQL",
  "Redis",
  "Tech Lead",
  "Software Architecture",
];
