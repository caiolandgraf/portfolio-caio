"use client";

import { useEffect } from "react";
import { profile } from "@content/profile";

const TEXT = profile.name;
const TYPE_MS = 220;
const HOLD_MS = 2000;

export function AnimatedTitle() {
  useEffect(() => {
    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      index += 1;

      if (index > TEXT.length) {
        document.title = TEXT;
        timeout = setTimeout(() => {
          index = 0;
          tick();
        }, HOLD_MS);
        return;
      }

      document.title = `${TEXT.slice(0, index)}\u2588`;
      timeout = setTimeout(tick, TYPE_MS);
    };

    tick();

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
