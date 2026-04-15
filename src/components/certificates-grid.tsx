"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type Certificate = {
  title: string;
  image: string;
};

type CertificatesGridProps = {
  certificates: Certificate[];
};

export default function CertificatesGrid({
  certificates,
}: CertificatesGridProps) {
  const [active, setActive] = useState<Certificate | null>(null);
  const canUseDOM = typeof document !== "undefined";

  useEffect(() => {
    if (!active) {
      return;
    }

    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <button
            key={cert.title}
            type="button"
            className="pixel-card overflow-hidden rounded-sm border border-white/15 bg-black/30 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
            onClick={() => setActive(cert)}
          >
            <div className="relative h-40">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="p-4 text-xs text-zinc-200">{cert.title}</div>
          </button>
        ))}
      </div>

      {active && canUseDOM
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
              role="dialog"
              aria-modal="true"
              onClick={() => setActive(null)}
            >
              <div
                className="pixel-card relative w-full max-w-4xl rounded-sm border border-white/20 bg-black/90 p-4"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="pixel-card absolute right-4 top-4 rounded-sm border border-white/20 bg-black/70 px-3 py-1 text-xs text-cyan-100"
                  onClick={() => setActive(null)}
                >
                  Close
                </button>
                <div className="relative mt-10 aspect-[4/3] w-full">
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>
                <p className="mt-4 text-sm text-zinc-200">{active.title}</p>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
