import Link from "next/link";
import type { Post } from "@content/types";
import { Badge } from "@/components/ui/badge";

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary">Related Posts</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent/30"
          >
            <h3 className="mb-2 font-medium text-primary group-hover:text-accent transition-colors">
              {post.title}
            </h3>
            <p className="mb-3 line-clamp-2 text-sm text-secondary">
              {post.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
