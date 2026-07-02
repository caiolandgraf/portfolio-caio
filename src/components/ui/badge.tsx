import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 font-mono text-xs",
        variant === "default" && "bg-surface text-secondary border border-border",
        variant === "outline" && "border border-border text-secondary",
        className,
      )}
      {...props}
    />
  );
}
