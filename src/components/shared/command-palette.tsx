"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { navigation, profile } from "@content/profile";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

interface CommandPaletteProps {
  posts: { slug: string; title: string }[];
}

export function CommandPalette({ posts }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const runCommand = useCallback(
    (command: () => void) => {
      setOpen(false);
      command();
    },
    [],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Command Palette</DialogTitle>
        <Command>
          <CommandInput placeholder="Search pages, posts..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              {navigation.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() =>
                    runCommand(() => {
                      if (item.href.startsWith("#")) {
                        document
                          .querySelector(item.href)
                          ?.scrollIntoView({ behavior: "smooth" });
                      } else {
                        router.push(item.href);
                      }
                    })
                  }
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
            {posts.length > 0 && (
              <CommandGroup heading="Blog">
                {posts.map((post) => (
                  <CommandItem
                    key={post.slug}
                    onSelect={() =>
                      runCommand(() => router.push(`/blog/${post.slug}`))
                    }
                  >
                    {post.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <CommandGroup heading="Actions">
              <CommandItem
                onSelect={() =>
                  runCommand(() => window.open(profile.resumeUrl, "_blank"))
                }
              >
                Download Resume
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
