import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { getTabNewsPosts } from "@/lib/tabnews";
import { tabnewsConfig } from "@content/tabnews";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { AnimatedSection } from "@/components/shared/animated-section";

export async function BlogPreview() {
  const posts = (await getTabNewsPosts()).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <Section
      id="blog-preview"
      title="Blog"
      description="Technical writing published on TabNews."
    >
      <Container>
        <div className="space-y-4">
          {posts.map((post, index) => (
            <AnimatedSection key={post.id} delay={index * 0.05}>
              <BlogPostCard post={post} />
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-primary"
          >
            View all posts
            <ArrowRight size={14} />
          </Link>
          <a
            href={tabnewsConfig.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-primary"
          >
            TabNews profile
            <ExternalLink size={14} />
          </a>
        </div>
      </Container>
    </Section>
  );
}
