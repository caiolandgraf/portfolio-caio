import Link from "next/link";
import {
  Github,
  Linkedin,
  Youtube,
  Instagram,
  Mail,
  ExternalLink,
} from "lucide-react";
import type { SocialLink } from "@content/types";
import { cn } from "@/lib/utils";
import { isNavigableHref } from "@/lib/content";
import { XIcon } from "@/components/shared/x-icon";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
  email: Mail,
  website: ExternalLink,
} as const;

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  iconSize?: number;
}

export function SocialLinks({
  links,
  className,
  iconSize = 18,
}: SocialLinksProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {links.map((link) => {
        if (!isNavigableHref(link.href)) {
          return (
            <span
              key={link.id}
              aria-label={link.label}
              title="Update this link in content/profile.ts"
              className="cursor-not-allowed text-secondary/40"
            >
              {link.icon === "x" ? (
                <XIcon size={iconSize} />
              ) : (
                (() => {
                  const Icon = iconMap[link.icon as keyof typeof iconMap];
                  return Icon ? <Icon size={iconSize} /> : null;
                })()
              )}
            </span>
          );
        }

        if (link.icon === "x") {
          return (
            <Link
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-secondary transition-colors hover:text-primary"
            >
              <XIcon size={iconSize} />
            </Link>
          );
        }

        const Icon = iconMap[link.icon as keyof typeof iconMap];
        return (
          <Link
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="text-secondary transition-colors hover:text-primary"
          >
            <Icon size={iconSize} />
          </Link>
        );
      })}
    </div>
  );
}
