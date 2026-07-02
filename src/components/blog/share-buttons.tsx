"use client";

import { Twitter, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      label: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs text-secondary">Share</span>
      {shareLinks.map((link) => (
        <Button key={link.label} variant="ghost" size="icon" asChild>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.label}`}
          >
            <link.icon size={16} />
          </a>
        </Button>
      ))}
      <Button variant="ghost" size="icon" onClick={copyLink} aria-label="Copy link">
        {copied ? <Check size={16} /> : <Link2 size={16} />}
      </Button>
    </div>
  );
}
