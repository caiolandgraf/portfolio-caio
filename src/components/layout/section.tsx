import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export function Section({
  id,
  children,
  className,
  title,
  description,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-20", className)}>
      {(title || description) && (
        <Container className="mb-10 space-y-2">
          {title && (
            <h2 className="text-xl font-semibold tracking-tight text-primary md:text-2xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-secondary leading-relaxed">
              {description}
            </p>
          )}
        </Container>
      )}
      {children}
    </section>
  );
}
