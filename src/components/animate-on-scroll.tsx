"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AnimateOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(
        "[data-animate='pixel-rise']",
      );

      elements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "steps(5)",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
