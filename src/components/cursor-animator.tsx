"use client";

import { useEffect } from "react";

const defaultFrames = [
  "/cursor/dark/arrow-1.png",
  "/cursor/dark/arrow-2.png",
  "/cursor/dark/arrow-3.png",
  "/cursor/dark/arrow-4.png",
];

const pointerFrames = [
  "/cursor/light/hand-1.png",
  "/cursor/light/hand-2.png",
  "/cursor/light/hand-3.png",
];

export default function CursorAnimator() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const root = document.documentElement;
      root.style.setProperty(
        "--cursor-default",
        `url("${defaultFrames[0]}") 0 0, auto`,
      );
      root.style.setProperty(
        "--cursor-pointer",
        `url("${pointerFrames[0]}") 0 0, pointer`,
      );
      return;
    }

    let index = 0;
    const root = document.documentElement;

    const tick = () => {
      const frame = defaultFrames[index % defaultFrames.length];
      const pointer = pointerFrames[index % pointerFrames.length];
      root.style.setProperty("--cursor-default", `url("${frame}") 0 0, auto`);
      root.style.setProperty(
        "--cursor-pointer",
        `url("${pointer}") 0 0, pointer`,
      );
      index += 1;
    };

    tick();
    const interval = window.setInterval(tick, 220);
    return () => window.clearInterval(interval);
  }, []);

  return null;
}
