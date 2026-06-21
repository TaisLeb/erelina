"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const root = useRef(null);
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("is-loading");

    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.set(".preloader__mark", { y: 30 });
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove("is-loading");
          window.__erelinaLoaded = true;
          window.dispatchEvent(new Event("erelina:loaded"));
          setGone(true);
        },
      });

      tl.to(".preloader__mark", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0.1)
        .to(".preloader__tag", { opacity: 1, duration: 0.7 }, 0.4)
        .to(".preloader__bar i", { scaleX: 1, duration: reduce ? 0.3 : 1.6, ease: "power2.inOut" }, 0.3)
        .to(counter, {
          v: 100,
          duration: reduce ? 0.3 : 1.6,
          ease: "power2.inOut",
          onUpdate: () => setPct(Math.round(counter.v)),
        }, 0.3)
        .to(".preloader__inner", { opacity: 0, y: -20, duration: 0.6, ease: "power2.in" }, "+=0.25")
        .to(root.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "<0.1");
    }, root);

    return () => ctx.revert();
  }, []);

  if (gone) return null;

  return (
    <div className="preloader" ref={root}>
      <div className="preloader__inner">
        <div className="preloader__mark">Erelina</div>
        <div className="preloader__tag">Organic · Biodynamic · Skincare</div>
        <div className="preloader__bar">
          <i />
        </div>
        <div className="preloader__pct">{pct}%</div>
      </div>
    </div>
  );
}
