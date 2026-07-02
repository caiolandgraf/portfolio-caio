import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getTabNewsPosts } from "@/lib/tabnews";
import { tabnewsConfig } from "@content/tabnews";
import { createPageMetadata, createBlogJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/layout/container";
import { BlogPostCard } from "@/components/blog/blog-post-card";

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Technical writing on software engineering, architecture, and developer tooling published on TabNews.",
  path: "/blog",
});

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getTabNewsPosts();

  return (
    <>
      <JsonLd data={createBlogJsonLd()} />

      <div className="pt-28 pb-20">
        <Container>
          <div className="mb-12 space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-primary">
              Blog
            </h1>
            <p className="max-w-2xl text-secondary leading-relaxed">
              Articles synced from my{" "}
              <a
                href={tabnewsConfig.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                TabNews
              </a>{" "}
              profile.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-secondary">No posts found.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} heading="h2" />
              ))}
            </div>
          )}

          <div className="mt-10">
            <a
              href={tabnewsConfig.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-primary"
            >
              View on TabNews
              <ExternalLink size={14} />
            </a>
          </div>
        </Container>
      </div>
    </>
  );
}
