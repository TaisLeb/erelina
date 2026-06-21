"use client";

import { useState } from "react";
import Link from "next/link";
import { useReveal } from "../useReveal";
import { useCart } from "../CartContext";

const SPECS = [
  ["Texture", "thick, fast absorption, non-greasy"],
  ["Scent", "orange, rosemary, sweet vanilla hint"],
  ["Effect", "evens skin tone · deeply moisturising"],
];

const INGREDIENTS = [
  ["Purified Water", "California"],
  ["Rosemary Oil", "Amazon Rainforest"],
  ["Orange Peel Oil", "Amazon Rainforest"],
  ["Spice Extracts", "India"],
  ["Organic Fig Juice", "California"],
  ["Squalane", "United Kingdom"],
  ["Lemon Peel Powder", "India"],
  ["Vanilla Bean", "Madagascar"],
];

export default function ProductView() {
  const scope = useReveal();
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="pdp" ref={scope}>
      {/* ---- HERO / BUY ---- */}
      <section className="pdp__hero">
        <div className="pdp__gallery">
          <div className="pdp__shot">
            <img data-reveal="img" src="/assets/serum-open.jpg" alt="Erelina 'Orange Sunset' Brightening Cream" />
          </div>
          <span className="pdp__floatmark script" aria-hidden="true">Orange Sunset</span>
        </div>

        <div className="pdp__info">
          <p className="eyebrow" data-reveal>Erelina · Brightening</p>
          <h1 className="pdp__title" data-reveal data-reveal-order="1">
            <em className="script">&lsquo;Orange Sunset&rsquo;</em><br />Brightening Cream
          </h1>
          <p className="pdp__vol mono" data-reveal data-reveal-order="2">100 ml / 3.4 oz</p>
          <p className="pdp__desc" data-reveal data-reveal-order="3">
            Infused with orange peel, vanilla bean and rosemary essential oil, this
            organic cream brightens and evens skin tone while deeply hydrating even
            the driest skin.
          </p>

          <dl className="pdp__specs mono" data-reveal data-reveal-order="4">
            {SPECS.map(([k, v]) => (
              <div className="pdp__spec" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <button className="btn pdp__add" data-cursor="hover" onClick={onAdd} data-reveal data-reveal-order="5">
            {added ? "Added to Bag ✓" : "Add To Bag — $35"}
          </button>
        </div>
      </section>

      {/* ---- HOW TO APPLY ---- */}
      <section className="pdp__apply">
        <div className="pdp__apply-text">
          <p className="eyebrow" data-reveal>How To Apply</p>
          <h2 className="serif" data-reveal data-reveal-order="1">
            A <em className="script">nourishing</em>, silky texture
          </h2>
          <p data-reveal data-reveal-order="2">
            Apply twice a day on clean skin, or layer over the Brightening Serum
            &lsquo;Fig in Blossom&rsquo;.
          </p>
          <p className="pdp__tip mono" data-reveal data-reveal-order="3">
            Tip — add a few drops of &lsquo;Lemon Light&rsquo; essence, mix in palm and apply.
          </p>
        </div>
        <div className="pdp__apply-media">
          <img data-reveal="img" data-parallax="-8" src="/assets/serum-hand.png" alt="Silky cream texture held in hand" />
        </div>
      </section>

      {/* ---- INGREDIENTS ---- */}
      <section className="pdp__ing">
        <div className="pdp__ing-head">
          <p className="eyebrow" data-reveal>Full Transparency</p>
          <h2 className="serif" data-reveal data-reveal-order="1">Ingredients</h2>
        </div>
        <dl className="pdp__ing-table mono" data-reveal data-reveal-order="2">
          {INGREDIENTS.map(([name, origin]) => (
            <div className="pdp__ing-row" key={name}>
              <dt>{name}</dt>
              <dd>{origin}</dd>
            </div>
          ))}
        </dl>
        <Link href="/#ingredients" className="link-underline pdp__ing-link" data-cursor="hover" data-reveal data-reveal-order="3">
          Read About Our Ingredients →
        </Link>
      </section>
    </div>
  );
}
