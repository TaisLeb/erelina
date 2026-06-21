"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scoped reveal helper. Returns a ref to attach to a section.
 * Inside it:
 *   [data-reveal]       -> fade + rise into view (staggered by [data-reveal-order])
 *   [data-reveal="img"] -> clip-path image reveal with subtle scale
 *   [data-parallax]     -> vertical parallax (value = strength, e.g. "-12")
 */
export function useReveal() {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-reveal]", { opacity: 1, clearProps: "all" });
        return;
      }

      // Text / block reveals
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        const mode = el.getAttribute("data-reveal");
        if (mode === "img") {
          gsap.fromTo(
            el,
            { clipPath: "inset(12% 6% 12% 6% round 6px)", scale: 1.12 },
            {
              clipPath: "inset(0% 0% 0% 0% round 6px)",
              scale: 1,
              duration: 1.3,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            }
          );
          return;
        }
        const order = parseFloat(el.getAttribute("data-reveal-order") || "0");
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: "power3.out",
            delay: order * 0.08,
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });

      // Parallax
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const strength = parseFloat(el.getAttribute("data-parallax") || "-10");
        gsap.to(el, {
          yPercent: strength,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("[data-parallax-scope]") || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return scope;
}
