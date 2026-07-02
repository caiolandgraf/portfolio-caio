import { getTabNewsPosts } from "@/lib/tabnews";
import { CommandPalette } from "./command-palette";

export async function CommandPaletteWrapper() {
  const posts = (await getTabNewsPosts()).map(({ slug, title }) => ({
    slug,
    title,
  }));
  return <CommandPalette posts={posts} />;
}
