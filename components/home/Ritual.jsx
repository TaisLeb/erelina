"use client";

import { useReveal } from "../useReveal";

const CARDS = [
  {
    key: "cleanse",
    label: "Cleanse",
    img: "/assets/hero-face.jpg",
    alt: "Model with fresh, clean skin",
    pos: "50% 30%",
    badge: "badge--sage",
  },
  {
    key: "nourish",
    label: "Nourish",
    img: "/assets/tile-nourish.jpg",
    alt: "Dewy nourished skin under soft light",
    pos: "50% 30%",
    baked: true, // label is part of the image
  },
  {
    key: "brighten",
    label: "Brighten",
    img: "/assets/serum-open.jpg",
    alt: "Brightening serum applied to the skin",
    pos: "50% 40%",
    badge: "badge--cream",
  },
];

export default function Ritual() {
  const scope = useReveal();

  return (
    <section className="ritual" ref={scope}>
      <div className="container">
        <div className="ritual__head">
          <p className="eyebrow" data-reveal>The Daily Ritual</p>
          <h2 className="ritual__title serif" data-reveal data-reveal-order="1">
            Three steps to skin that <em className="script">glows</em>
          </h2>
        </div>

        <div className="ritual__grid">
          {CARDS.map((c, i) => (
            <article
              className={`ritual__card ${i === 1 ? "is-tall" : ""}`}
              key={c.key}
              data-cursor="hover"
            >
              <div className="ritual__media">
                <img data-reveal="img" src={c.img} alt={c.alt} style={{ objectPosition: c.pos }} />
              </div>
              {!c.baked && (
                <span className={`ritual__badge ${c.badge} script`}>{c.label}</span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
