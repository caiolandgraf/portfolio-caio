"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("");
  const [headings, setHeadings] = useState<TocItem[]>([]);

  useEffect(() => {
    const matches = content.match(/^#{2,3}\s+(.+)$/gm) ?? [];
    const items: TocItem[] = matches.map((match) => {
      const level = match.match(/^#+/)?.[0].length ?? 2;
      const text = match.replace(/^#+\s+/, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return { id, text, level };
    });
    setHeadings(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -80% 0px" },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 hidden lg:block">
      <p className="mb-4 font-mono text-xs font-medium text-secondary">
        On this page
      </p>
      <ul className="space-y-2 border-l border-border">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block border-l-2 py-1 pl-4 text-sm transition-colors",
                heading.level === 3 && "pl-6",
                activeId === heading.id
                  ? "border-accent text-primary"
                  : "border-transparent text-secondary hover:text-primary",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
