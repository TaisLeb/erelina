"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReveal } from "../useReveal";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const ICONS = [
  { src: "/assets/icon-fig.png", name: "Fig", x: "10%", y: "52%", size: 130, p: -16 },
  { src: "/assets/icon-honey.png", name: "Honey", x: "30%", y: "26%", size: 120, p: -28 },
  { src: "/assets/icon-almond.png", name: "Almond", x: "50%", y: "60%", size: 120, p: -12 },
  { src: "/assets/icon-vanilla.png", name: "Vanilla", x: "70%", y: "28%", size: 140, p: -24 },
  { src: "/assets/icon-orange.png", name: "Orange", x: "88%", y: "56%", size: 120, p: -18 },
];

export default function Ingredients() {
  const scope = useReveal();
  const path = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // Draw the winding line as the section scrolls through.
      const p = path.current;
      if (p) {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: reduce ? 0 : len });
        if (!reduce) {
          gsap.to(p, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: scope.current, start: "top 70%", end: "bottom 80%", scrub: 1 },
          });
        }
      }

      // Icons pop in + idle float
      gsap.utils.toArray(".ing__icon").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.4, rotate: -8 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1,
            ease: "back.out(1.6)",
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
        if (!reduce) {
          gsap.to(el, {
            y: "+=14",
            duration: 2.6 + i * 0.3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.2,
          });
          const drift = parseFloat(el.dataset.p || "-14");
          gsap.to(el, {
            yPercent: drift,
            ease: "none",
            scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });
    }, scope);
    return () => ctx.revert();
  }, [scope]);

  return (
    <section className="ingredients" id="ingredients" ref={scope}>
      <div className="ingredients__field" aria-hidden="true">
        <svg className="ing__line" viewBox="0 0 1200 600" preserveAspectRatio="none" fill="none">
          <path
            ref={path}
            d="M-20 330 C 160 220, 260 200, 360 300 S 520 470, 620 360 S 800 180, 900 300 S 1080 430, 1240 300"
            stroke="var(--gold)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>

        {ICONS.map((ic) => (
          <img
            key={ic.name}
            className="ing__icon"
            src={ic.src}
            alt=""
            data-p={ic.p}
            style={{ left: ic.x, top: ic.y, width: ic.size }}
          />
        ))}
      </div>

      <div className="container ingredients__copy">
        <p className="eyebrow" data-reveal>Sourced with intention</p>
        <h2 className="ingredients__title serif" data-reveal data-reveal-order="1">
          At Erelina we only use <em className="script">biodynamic</em> &amp;
          organic ingredients.
        </h2>
        <a href="#story" className="ingredients__link link-underline" data-cursor="hover" data-reveal data-reveal-order="2">
          Read About Our Ingredients
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
