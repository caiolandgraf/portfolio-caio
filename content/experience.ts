import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    id: "rocketseat-ambassador",
    company: "Rocketseat",
    role: "Ambassador",
    period: "2026 — Present",
    location: "Remote",
    description:
      "Rocketseat Ambassador, representing the platform in the developer community and promoting high-quality education in modern software engineering.",
    highlights: [
      "Represent Rocketseat in the Brazilian developer ecosystem",
      "Share technical content and advocate for continuous learning in software engineering",
      "Support developers advancing their careers through Rocketseat's education ecosystem",
    ],
    technologies: ["Community", "Mentorship"],
    current: true,
  },
  {
    id: "google-cloud",
    company: "Google",
    role: "Senior Software Engineer (L5), Google Cloud",
    period: "2022 — Present",
    location: "Remote",
    description:
      "Senior engineer on Google Cloud, building internal applications with a focus on low-level observability and backend integration solutions for cloud infrastructure. Work spans high-performance services in Go, Rust, and Ruby, with emphasis on scalability and production reliability.",
    highlights: [
      "Develop internal tooling and services for low-level observability across cloud systems",
      "Design and ship backend integration solutions for Google Cloud at scale",
      "Build performance-critical services in Go, Rust, and Ruby for distributed environments",
    ],
    technologies: [
      "Go",
      "Rust",
      "Ruby",
      "GCP",
      "Kubernetes",
      "gRPC",
      "Distributed Systems",
    ],
    current: true,
  },
  {
    id: "confidential",
    company: "",
    role: "[...]",
    period: "",
    description: "",
    highlights: [],
    technologies: [],
    redacted: true,
  },
  {
    id: "eicode",
    company: "EiCode",
    role: "Founder, CTO & Tech Lead",
    period: "2017 — Present",
    location: "Brazil / Remote",
    description:
      "Founded EiCode, a digital agency focused on custom software development for web and mobile applications. As CTO and Tech Lead, drive engineering strategy, architecture decisions, and delivery for clients worldwide.",
    highlights: [
      "Built and shipped production systems using PHP, Laravel, Ruby, Vue, React, and Node.js",
      "Led engineering teams as Tech Lead, establishing clean architecture and code review practices",
      "Designed data layers and backends with PostgreSQL and MySQL at production scale",
      "Developed internal tooling and open-source libraries adopted by the community",
    ],
    technologies: [
      "PHP",
      "Laravel",
      "Ruby",
      "Go",
      "TypeScript",
      "Vue",
      "React",
      "PostgreSQL",
      "MySQL",
      "AWS",
      "Docker",
      "Tech Lead",
    ],
    current: true,
  },
  {
    id: "programadores-br",
    company: "Programadores BR",
    role: "Community Manager",
    period: "2022 — 2025",
    location: "Remote",
    description:
      "Manage the Programadores BR developer community on Discord, fostering knowledge sharing, mentorship, and technical discussions among Brazilian developers.",
    highlights: [
      "Moderate and grow an active developer community",
      "Organize discussions on software engineering best practices",
      "Support developers entering and advancing in the tech industry",
    ],
    technologies: ["Community", "Mentorship"],
    current: false,
  },
  {
    id: "confidential-early",
    company: "",
    role: "[...]",
    period: "2012 — 2017",
    description: "",
    highlights: [],
    technologies: [],
    redacted: true,
  },
];

export const timeline = experience.map((item) => ({
  id: item.id,
  year: item.period.split("—")[0]?.trim() ?? item.period,
  title: item.role,
  company: item.company,
  description: item.description,
}));
