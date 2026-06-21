"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "It all started at a small farm in Tahoe, California. Luscious soil and abundant sunshine helped the Richardson family press their organic juices and elixirs for over thirty years. The idea of organic cosmetics was the next step forward.";

export default function Story() {
  const root = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(".story__w", { opacity: 1 });
        return;
      }
      gsap.fromTo(
        ".story__w",
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.025,
          ease: "none",
          scrollTrigger: { trigger: ".story__copy", start: "top 75%", end: "bottom 70%", scrub: 1 },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="story" id="story" ref={root}>
      <div className="container">
        <p className="eyebrow story__eyebrow">Our Roots</p>
        <p className="story__copy serif">
          {TEXT.split(" ").map((w, i) => (
            <span key={i}>
              <span className="story__w">{w}</span>{" "}
            </span>
          ))}
        </p>
        <a href="/product/orange-sunset" className="btn btn--ghost story__btn" data-cursor="hover">
          Read Their Story
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
