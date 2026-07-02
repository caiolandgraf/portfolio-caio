import { getSkillVisual } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

interface SkillPillProps {
  name: string;
  className?: string;
  size?: "sm" | "md";
}

export function SkillPill({ name, className, size = "md" }: SkillPillProps) {
  const { icon: Icon, color } = getSkillVisual(name);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-surface transition-colors hover:text-primary",
        size === "md" && "gap-1.5 px-2.5 py-1.5",
        size === "sm" && "gap-1 px-2 py-1",
        className,
      )}
    >
      <Icon
        className={cn("shrink-0", size === "md" ? "h-3.5 w-3.5" : "h-3 w-3")}
        style={{ color }}
        aria-hidden
      />
      <span className="font-mono text-xs text-secondary">{name}</span>
    </span>
  );
}
