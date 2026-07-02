import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import {
  getTabNewsPost,
  getTabNewsPosts,
  getRelatedTabNewsPosts,
} from "@/lib/tabnews";
import { tabnewsConfig } from "@content/tabnews";
import {
  createPageMetadata,
  createArticleJsonLd,
  createBreadcrumbJsonLd,
  siteConfig,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { ShareButtons } from "@/components/blog/share-buttons";
import { BlogPostCard } from "@/components/blog/blog-post-card";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getTabNewsPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getTabNewsPost(slug);
  if (!post) return {};

  const description =
    post.body?.replace(/[#*`\n]/g, " ").slice(0, 160).trim() ?? post.title;

  return createPageMetadata({
    title: post.title,
    description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    tags: ["TabNews", "Software Engineering"],
  });
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getTabNewsPost(slug);
  if (!post || !post.body) notFound();

  const relatedPosts = await getRelatedTabNewsPosts(slug);
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;
  const description =
    post.body.replace(/[#*`\n]/g, " ").slice(0, 160).trim();

  const structuredData = [
    createArticleJsonLd({
      title: post.title,
      description,
      date: post.publishedAt,
      slug: post.slug,
      author: tabnewsConfig.username,
      imageUrl: `${siteConfig.url}/blog/${post.slug}/opengraph-image`,
    }),
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={structuredData} />

      <article className="pt-28 pb-20">
        <Container>
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-primary"
          >
            <ArrowLeft size={14} />
            Back to blog
          </Link>

          <header className="mb-10 space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-mono text-sm text-secondary">
                @{tabnewsConfig.username}
              </span>
              <span className="font-mono text-sm text-secondary">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {post.readingTime && (
                <span className="font-mono text-sm text-secondary">
                  {post.readingTime}
                </span>
              )}
              <Badge>TabNews</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <ShareButtons title={post.title} url={postUrl} />
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-primary"
              >
                <ExternalLink size={14} />
                Read on TabNews
              </a>
            </div>
          </header>

          <MarkdownContent content={post.body} />

          {relatedPosts.length > 0 && (
            <div className="mt-16 border-t border-border pt-12">
              <h2 className="mb-6 text-xl font-semibold text-primary">
                Related Posts
              </h2>
              <div className="space-y-4">
                {relatedPosts.map((related) => (
                  <BlogPostCard key={related.id} post={related} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </article>
    </>
  );
}
