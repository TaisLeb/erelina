"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    const r = root.current;
    if (!r) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Use live element references (not scoped selectors) so the deferred
    // intro always targets the on-screen DOM, even across dev re-mounts.
    const lines = r.querySelectorAll(".hero__line > span");
    const img = r.querySelector(".hero__img");
    const eyebrow = r.querySelector(".hero__eyebrow");
    const cta = r.querySelector(".hero__cta");
    const mono = r.querySelector(".hero__mono");
    const scroll = r.querySelector(".hero__scroll");
    const fadeEls = [eyebrow, cta, mono, scroll];

    let started = false;
    let fallback;

    const intro = () => {
      if (started) return;
      started = true;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.8 }, 0)
        .to(eyebrow, { opacity: 1, duration: 0.8 }, 0.2)
        .to(lines, { yPercent: 0, duration: 1.2, stagger: 0.12 }, 0.35)
        .to(cta, { opacity: 1, y: 0, duration: 0.9 }, 0.9)
        .to(mono, { opacity: 1, duration: 1.4 }, 0.7)
        .to(scroll, { opacity: 1, duration: 0.8 }, 1.1);
    };

    if (reduce) {
      gsap.set([...lines, ...fadeEls], { opacity: 1, yPercent: 0, y: 0 });
    } else {
      gsap.set(lines, { yPercent: 110 });
      gsap.set(fadeEls, { opacity: 0 });
      if (window.__erelinaLoaded) {
        intro();
      } else {
        window.addEventListener("erelina:loaded", intro, { once: true });
        // Safety net: never leave the headline hidden if the event is missed.
        fallback = setTimeout(intro, 3600);
      }
    }

    return () => {
      clearTimeout(fallback);
      window.removeEventListener("erelina:loaded", intro);
      gsap.killTweensOf([...lines, img, ...fadeEls]);
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // Parallax drift on scroll
      if (!reduce) {
        gsap.to(".hero__img", {
          yPercent: 16,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero__content", {
          yPercent: -10,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={root} id="top">
      <div className="hero__media">
        <img
          className="hero__img"
          src="/assets/hero-face.jpg"
          alt="Close portrait of a model with luminous, freshly nourished skin"
          fetchPriority="high"
        />
        <div className="hero__veil" />
      </div>

      <div className="hero__content container">
        <p className="hero__eyebrow eyebrow">Organic · Biodynamic Skincare</p>
        <h1 className="hero__title">
          <span className="hero__line line-mask">
            <span>
              <em className="script">Treat</em> your skin
            </span>
          </span>
          <span className="hero__line line-mask">
            <span>
              with the{" "}
              <em className="script hero__swash">
                luxury
                <svg viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 8 C 22 13, 44 13, 60 7 S 86 3, 98 7" />
                </svg>
              </em>
            </span>
          </span>
          <span className="hero__line line-mask">
            <span>it deserves</span>
          </span>
        </h1>

        <div className="hero__cta">
          <Link href="/product/orange-sunset" className="btn" data-cursor="hover">
            Shop Now
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="hero__mono script" aria-hidden="true">E</div>

      <a href="/#serum" className="hero__scroll" data-cursor="hover" aria-label="Scroll to discover">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  );
}
