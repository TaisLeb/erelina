"use client";

import { useReveal } from "../useReveal";

const LOGOS = [
  { src: "/assets/logo-womenshealth.png", alt: "Women's Health", h: 26 },
  { src: "/assets/logo-elle.png", alt: "Elle", h: 22 },
  { src: "/assets/logo-oprah.png", alt: "The Oprah Magazine", h: 30 },
];

export default function Press() {
  const scope = useReveal();
  return (
    <section className="press" ref={scope}>
      <div className="container">
        <p className="eyebrow press__eyebrow" data-reveal>As featured in</p>
        <div className="press__row">
          {LOGOS.map((l, i) => (
            <img
              key={l.alt}
              src={l.src}
              alt={l.alt}
              style={{ height: l.h }}
              data-reveal
              data-reveal-order={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
