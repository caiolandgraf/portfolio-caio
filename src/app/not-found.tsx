import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Page not found",
  description: "The page you are looking for does not exist or has been moved.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center pt-28">
      <Container>
        <div className="space-y-6 text-center">
          <p className="font-mono text-6xl font-semibold text-border">404</p>
          <h1 className="text-2xl font-semibold text-primary">Page not found</h1>
          <p className="text-secondary">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Button asChild>
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
