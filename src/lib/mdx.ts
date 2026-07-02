import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { ReactElement } from "react";
import { mdxComponents } from "@/components/blog/mdx-components";

const prettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: true,
};

export async function compilePost(source: string): Promise<ReactElement> {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, prettyCodeOptions],
        ],
      },
    },
  });

  return content;
}
