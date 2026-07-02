import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { TabNewsPost } from "@/lib/tabnews";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BlogPostCardProps {
  post: TabNewsPost;
  heading?: "h2" | "h3";
  className?: string;
}

export function BlogPostCard({
  post,
  heading = "h3",
  className,
}: BlogPostCardProps) {
  const TitleTag = heading;

  return (
    <article
      className={cn(
        "group rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent/30",
        className,
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Link href={`/blog/${post.slug}`} className="block space-y-2">
            <TitleTag className="font-medium text-primary group-hover:text-accent transition-colors">
              {post.title}
            </TitleTag>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>TabNews</Badge>
            {post.tabcoins > 0 && (
              <span className="font-mono text-xs text-secondary">
                {post.tabcoins} tabcoins
              </span>
            )}
          </div>
        </div>

        <div className="shrink-0 space-y-1 text-right">
          <p className="font-mono text-xs text-secondary">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          {post.readingTime && (
            <p className="font-mono text-xs text-secondary">
              {post.readingTime}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm text-secondary transition-colors hover:text-primary"
        >
          Read article
        </Link>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-secondary transition-colors hover:text-primary"
        >
          <ExternalLink size={14} />
          TabNews
        </a>
      </div>
    </article>
  );
}
