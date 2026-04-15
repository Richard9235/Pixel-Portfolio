"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    const minDuration = 1800;

    const tick = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 94) {
          return value;
        }
        return value + Math.floor(Math.random() * 6) + 2;
      });
    }, 140);

    const finish = () => {
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(minDuration - elapsed, 0);
      window.setTimeout(() => {
        setProgress(100);
        setFading(true);
        window.setTimeout(() => setHidden(true), 450);
      }, remaining);
    };

    if (document.readyState === "complete") {
      finish();
      window.clearInterval(tick);
      return;
    }

    window.addEventListener("load", finish);
    return () => {
      window.removeEventListener("load", finish);
      window.clearInterval(tick);
    };
  }, []);

  if (hidden) {
    return null;
  }

  return (
    <div className={`page-loader ${fading ? "page-loader--hide" : ""}`}>
      <div className="page-loader__panel pixel-card rounded-sm border border-white/20 bg-black/70">
        <Image
          src="/icons/pxlkit-loading-spinner.svg"
          alt="Loading"
          width={48}
          height={48}
          className="page-loader__icon"
          priority
        />
        <p className="font-pixel text-xs text-cyan-100">
          Booting Portfolio OS
        </p>
        <div className="page-loader__icons">
          <Image
            src="/icons/pxlkit/trophy.svg"
            alt="Achievements"
            width={20}
            height={20}
          />
          <Image
            src="/icons/pxlkit/scroll.svg"
            alt="Education"
            width={20}
            height={20}
          />
          <Image
            src="/icons/pxlkit/badge.svg"
            alt="Certificates"
            width={20}
            height={20}
          />
        </div>
        <div className="page-loader__bar">
          <div
            className="page-loader__bar-fill"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-[10px] text-zinc-400">
          Loading achievements, quests, and skill trees •{" "}
          {Math.min(progress, 100)}%
        </p>
      </div>
    </div>
  );
}
