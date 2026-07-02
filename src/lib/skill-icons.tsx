import type { IconType } from "react-icons";
import {
  SiPhp,
  SiGo,
  SiRust,
  SiRuby,
  SiRubyonrails,
  SiTypescript,
  SiJavascript,
  SiLaravel,
  SiNodedotjs,
  SiGooglecloud,
  SiDocker,
  SiLinux,
  SiKubernetes,
  SiTerraform,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiMongodb,
  SiVuedotjs,
  SiReact,
  SiTailwindcss,
  SiInertia,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import {
  Network,
  Layers,
  ListOrdered,
  Boxes,
  Shapes,
  Waypoints,
  Users,
  GraduationCap,
  Cloud,
  Database,
  Workflow,
  Building2,
  Crown,
  type LucideIcon,
} from "lucide-react";

export interface SkillVisual {
  icon: IconType | LucideIcon;
  color: string;
}

const DEFAULT_COLOR = "#a1a1aa";

const aliases: Record<string, string> = {
  gcp: "google cloud",
  "node.js": "node",
  k8s: "kubernetes",
  tailwind: "tailwindcss",
  postgres: "postgresql",
  mongo: "mongodb",
  rails: "ruby on rails",
  "software arquitecture": "software architecture",
};

const registry: Record<string, SkillVisual> = {
  php: { icon: SiPhp, color: "#8993BE" },
  go: { icon: SiGo, color: "#00ADD8" },
  rust: { icon: SiRust, color: "#DEA584" },
  ruby: { icon: SiRuby, color: "#CC342D" },
  "ruby on rails": { icon: SiRubyonrails, color: "#D30001" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  sql: { icon: Database, color: "#336791" },
  laravel: { icon: SiLaravel, color: "#FF2D20" },
  node: { icon: SiNodedotjs, color: "#5FA04E" },
  rest: { icon: Network, color: DEFAULT_COLOR },
  grpc: { icon: Waypoints, color: DEFAULT_COLOR },
  queues: { icon: ListOrdered, color: DEFAULT_COLOR },
  ddd: { icon: Shapes, color: DEFAULT_COLOR },
  solid: { icon: Layers, color: DEFAULT_COLOR },
  "clean architecture": { icon: Layers, color: DEFAULT_COLOR },
  "software architecture": { icon: Building2, color: DEFAULT_COLOR },
  microservices: { icon: Boxes, color: DEFAULT_COLOR },
  "distributed systems": { icon: Boxes, color: DEFAULT_COLOR },
  "tech lead": { icon: Crown, color: "#F59E0B" },
  aws: { icon: FaAws, color: "#FF9900" },
  "google cloud": { icon: SiGooglecloud, color: "#4285F4" },
  "cloud engineer": { icon: Cloud, color: "#4285F4" },
  devops: { icon: Workflow, color: "#2496ED" },
  docker: { icon: SiDocker, color: "#2496ED" },
  linux: { icon: SiLinux, color: "#FCC624" },
  kubernetes: { icon: SiKubernetes, color: "#326CE5" },
  terraform: { icon: SiTerraform, color: "#7B42BC" },
  mysql: { icon: SiMysql, color: "#4479A1" },
  postgresql: { icon: SiPostgresql, color: "#4169E1" },
  redis: { icon: SiRedis, color: "#FF4438" },
  mongodb: { icon: SiMongodb, color: "#47A248" },
  vue: { icon: SiVuedotjs, color: "#4FC08D" },
  react: { icon: SiReact, color: "#61DAFB" },
  tailwindcss: { icon: SiTailwindcss, color: "#06B6D4" },
  inertia: { icon: SiInertia, color: "#9553E9" },
  community: { icon: Users, color: "#5865F2" },
  mentorship: { icon: GraduationCap, color: "#10B981" },
};

function normalize(name: string): string {
  const key = name.toLowerCase().trim();
  return aliases[key] ?? key;
}

export function getSkillVisual(name: string): SkillVisual {
  const key = normalize(name);
  return registry[key] ?? { icon: Shapes, color: DEFAULT_COLOR };
}
