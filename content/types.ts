export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: "github" | "linkedin" | "youtube" | "instagram" | "x" | "email" | "website";
}

export interface Metric {
  id: string;
  label: string;
  value: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string;
  highlights: string[];
  technologies: string[];
  current?: boolean;
  redacted?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image: string;
  featured?: boolean;
  openSource?: boolean;
  stars?: number;
}

export interface Talk {
  id: string;
  title: string;
  event: string;
  date: string;
  description: string;
  link?: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  platform: string;
  date: string;
  tags: string[];
}

export interface PostFrontmatter {
  title: string;
  slug: string;
  description: string;
  cover?: string;
  date: string;
  tags: string[];
  author: string;
  published: boolean;
}

export interface Post extends PostFrontmatter {
  content: string;
  readingTime: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}
