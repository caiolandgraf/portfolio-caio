export function isPlaceholder(value: string | undefined): boolean {
  return !value || value.includes("[PLACEHOLDER");
}

export function isNavigableHref(href: string): boolean {
  if (isPlaceholder(href)) return false;
  return (
    href.startsWith("/") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:")
  );
}
