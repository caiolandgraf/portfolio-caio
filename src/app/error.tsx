"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center pt-28">
      <Container>
        <div className="space-y-6 text-center">
          <p className="font-mono text-6xl font-semibold text-border">500</p>
          <h1 className="text-2xl font-semibold text-primary">
            Something went wrong
          </h1>
          <p className="text-secondary">
            An unexpected error occurred. Please try again.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button onClick={reset}>Try again</Button>
            <Button variant="outline" asChild>
              <Link href="/">Go home</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
