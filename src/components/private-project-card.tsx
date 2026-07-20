"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type PrivateProjectCardProps = {
  name: string;
  subtitle: string;
  dates?: string;
  bullets: string[];
  linkLabel?: string;
  screenshots: string[];
};

export default function PrivateProjectCard({
  name,
  subtitle,
  dates,
  bullets,
  linkLabel,
  screenshots,
}: PrivateProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const canUseDOM = typeof document !== "undefined";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="pixel-card block w-full rounded-sm border border-white/15 bg-black/30 p-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-pixel text-sm text-white">{name}</h3>
            <p className="text-xs text-zinc-400">{subtitle}</p>
          </div>
          {dates ? <span className="text-xs text-cyan-200">{dates}</span> : null}
        </div>
        <ul className="mt-4 space-y-2 text-sm text-zinc-200">
          {bullets.map((bullet) => (
            <li key={bullet} className="list-[square] pl-5">
              {bullet}
            </li>
          ))}
        </ul>
        <div className="mt-4 text-xs text-cyan-200 underline decoration-dotted underline-offset-4">
          {linkLabel ?? "Private build"} • View
        </div>
      </button>

      {isOpen && canUseDOM
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
              role="dialog"
              aria-modal="true"
              aria-label={`${name} screenshots`}
              onClick={() => setIsOpen(false)}
            >
              <div
                className="pixel-card relative w-full max-w-5xl rounded-sm border border-white/20 bg-black/90 p-4"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="pixel-card absolute right-4 top-4 rounded-sm border border-white/20 bg-black/70 px-3 py-1 text-xs text-cyan-100"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
                <h4 className="mt-10 font-pixel text-xs text-cyan-200">{name}</h4>
                <p className="mt-2 text-xs text-zinc-300">
                  Private project screenshots
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {screenshots.map((screenshot, index) => (
                    <div
                      key={screenshot}
                      className="overflow-hidden rounded-sm border border-white/20 bg-black/60"
                    >
                      <div className="relative aspect-video w-full">
                        <Image
                          src={screenshot}
                          alt={`${name} screenshot ${index + 1}`}
                          fill
                          sizes="(min-width: 640px) 45vw, 90vw"
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
