import type { Metric, SocialLink } from "./types";

export const profile = {
  name: "Caio Landgraf",
  title: "Senior Staff+ Infrastructure Engineer, Anthropic",
  subtitles: [
    "Cluster Infrastructure",
    "AI",
    "Claude",
    "AWS",
    "Go Developer",
    "Rust Developer",
  ],
  location: "Seattle, WA · Born in Brazil",
  avatar: "/images/avatar.jpg",
  avatarFallback: "https://avatars.githubusercontent.com/u/46607462?v=4",
  resumeUrl: "/resume.pdf",
  email: "eu.caiolandgraf@gmail.com",
  siteUrl: "https://caiolandgraf.dev",
  bio: {
    short:
      "Software engineer focused on backend systems, cloud infrastructure, and developer tooling.",
    long: `I'm a software engineer with over fourteen years of experience building backend systems, cloud infrastructure, and developer tools — since 2012. My work spans distributed systems, API design, and production-grade tooling in Go, PHP, and TypeScript.

I'm a Senior Staff+ Infrastructure Engineer on Cluster Infrastructure at Anthropic. Previously, I was a Senior Software Engineer (L5) at Google Cloud, focused on low-level observability and backend integrations at scale.

I'm also the founder of EiCode, where I lead engineering for custom software solutions for clients worldwide. My open-source work includes Grove, an opinionated Go CLI for scaffolding production-ready applications, and gest, a Jest-inspired testing framework for Go.

Beyond writing code, I create technical content on YouTube, contribute to the Brazilian developer community, and publish articles on software architecture, clean code, and modern backend practices.

I'm passionate about software architecture, domain-driven design, and building systems that are simple, observable, and maintainable at scale.`,
  },
} as const;

export const metrics: Metric[] = [
  { id: "years", label: "Years Experience", value: 14 },
  { id: "projects", label: "Projects", value: 73 },
  { id: "articles", label: "Articles", value: 12 },
  { id: "open-source", label: "Open Source", value: 8 },
  { id: "talks", label: "Talks", value: 2 },
];

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/caiolandgraf",
    icon: "github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/caiolandgraf",
    icon: "linkedin",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@caiolandgraf",
    icon: "youtube",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/eu.caiolandgraf",
    icon: "instagram",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/eicajo",
    icon: "x",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:eu.caiolandgraf@gmail.com",
    icon: "email",
  },
];

export const navigation = [
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#open-source" },
  { id: "blog", label: "Blog", href: "/blog" },
] as const;
