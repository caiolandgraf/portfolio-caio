"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
import { navigation, profile, socialLinks } from "@content/profile";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface NavbarProps {
  avatarUrl: string;
}

const githubUrl =
  socialLinks.find((link) => link.id === "github")?.href ??
  "https://github.com/caiolandgraf";

export function Navbar({ avatarUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="relative h-7 w-7 overflow-hidden rounded-md border border-border">
            <Image
              src={avatarUrl}
              alt={profile.name}
              fill
              className="object-cover"
              sizes="28px"
            />
          </div>
          <span className="font-mono text-sm text-primary">
            {profile.name.split(" ")[0].toLowerCase()}.
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm text-secondary transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <kbd className="hidden rounded border border-border px-2 py-0.5 font-mono text-xs text-secondary lg:inline-block">
            ⌘K
          </kbd>
          <Button variant="outline" size="sm" asChild>
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={14} />
              GitHub
            </Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}
