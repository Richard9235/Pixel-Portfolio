"use client";

import { useEffect, useRef } from "react";

type NavLink = {
  label: string;
  id: string;
};

type NavLinksProps = {
  items: NavLink[];
};

const hourglassFrames = [
  "/cursor/light/hourglass-1-white.png",
  "/cursor/light/hourglass-2-white.png",
  "/cursor/light/hourglass-3-white.png",
];

export default function NavLinks({ items }: NavLinksProps) {
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startHourglass = () => {
    const root = document.documentElement;
    let frameIndex = 0;
    root.classList.add("cursor-hourglass");
    root.style.setProperty(
      "--cursor-hourglass",
      `url("${hourglassFrames[0]}") 0 0, wait`,
    );

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      frameIndex = (frameIndex + 1) % hourglassFrames.length;
      root.style.setProperty(
        "--cursor-hourglass",
        `url("${hourglassFrames[frameIndex]}") 0 0, wait`,
      );
    }, 180);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      root.classList.remove("cursor-hourglass");
      root.style.removeProperty("--cursor-hourglass");
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    }, 900);
  };

  return (
    <nav className="grid gap-3 text-xs text-zinc-300 sm:grid-cols-2 lg:w-64">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="pixel-card rounded-sm border border-white/15 bg-black/20 px-4 py-2 text-center transition hover:text-white"
          onClick={startHourglass}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
