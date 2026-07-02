import { getTabNewsPosts } from "@/lib/tabnews";
import { getGitHubAvatarUrl } from "@/lib/github-avatar";
import { siteConfig } from "@/lib/seo";
import { seo } from "@content/seo";
import { profile } from "@content/profile";

export async function GET() {
  const [posts, avatarUrl] = await Promise.all([
    getTabNewsPosts(),
    getGitHubAvatarUrl(),
  ]);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteConfig.name} Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>${seo.description}</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>${profile.name}</managingEditor>
    <webMaster>${profile.name}</webMaster>
    <image>
      <url>${avatarUrl}</url>
      <title>${siteConfig.name}</title>
      <link>${siteConfig.url}</link>
    </image>
    <atom:link href="${siteConfig.url}/api/rss" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${post.url}</link>
      <guid isPermaLink="false">${post.id}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.title}]]></description>
      <author>${profile.name}</author>
      <category>TabNews</category>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
