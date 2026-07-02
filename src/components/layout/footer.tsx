import Link from "next/link";
import { profile } from "@content/profile";
import { Container } from "@/components/layout/container";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium text-primary">{profile.name}</p>
            <p className="font-mono text-xs text-secondary">
              © {year} · Built with Next.js
            </p>
          </div>
          <Link
            href="/blog"
            className="font-mono text-xs text-secondary transition-colors hover:text-primary"
          >
            RSS Feed
          </Link>
        </div>
      </Container>
    </footer>
  );
}
