"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShaderField from "../ShaderField";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function OrganicLuxury() {
  const root = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.fromTo(
        ".ol__word",
        { opacity: 0.14, y: 18 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".ol__title", start: "top 82%", end: "bottom 62%", scrub: 1 },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const words = ["Organic", "Luxury", "That", "Feeds", "Your", "Skin", "With", "Every", "Drop"];

  return (
    <section className="ol" ref={root}>
      <ShaderField className="ol__bg" intensity={1} />
      <div className="ol__grain" aria-hidden="true" />

      <div className="container ol__inner">
        <p className="eyebrow ol__eyebrow">Every Drop</p>
        <h2 className="ol__title">
          {words.map((w, i) => (
            <span key={i}>
              <span className="ol__word">
                {i === 1 ? <em className="script">{w}</em> : w}
              </span>{" "}
            </span>
          ))}
        </h2>
      </div>

      <img className="ol__product" src="/assets/serum-hand.png" alt="Hand holding Erelina serum dropper" />
    </section>
  );
}
