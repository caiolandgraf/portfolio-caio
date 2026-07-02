"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/blog/mdx-components";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose-custom max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdxComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
