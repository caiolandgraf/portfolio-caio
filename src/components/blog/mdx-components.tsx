import Link from "next/link";
import { cn } from "@/lib/utils";

export const mdxComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mb-6 mt-10 scroll-m-20 text-3xl font-semibold tracking-tight text-primary first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mb-4 mt-10 scroll-m-20 text-2xl font-semibold tracking-tight text-primary",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mb-3 mt-8 scroll-m-20 text-xl font-semibold text-primary",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("mb-4 text-secondary leading-relaxed", className)}
      {...props}
    />
  ),
  a: ({ className, href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http");
    const classNames = cn("text-accent underline-offset-4 hover:underline", className);
    if (isExternal) {
      return (
        <a href={href} className={classNames} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href ?? "#"} className={classNames} {...props}>
        {children}
      </Link>
    );
  },
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn("mb-4 ml-6 list-disc space-y-2 text-secondary", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn("mb-4 ml-6 list-decimal space-y-2 text-secondary", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("leading-relaxed", className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mb-4 border-l-2 border-border pl-4 italic text-secondary",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-primary",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "mb-6 overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className={cn("my-8 border-border", className)} {...props} />
  ),
};
