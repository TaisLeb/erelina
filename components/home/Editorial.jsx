"use client";

import Link from "next/link";
import { useReveal } from "../useReveal";

function ArrowCircle() {
  return (
    <span className="arrow-btn" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M6 18L18 6M9 6h9v9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function Editorial() {
  const scope = useReveal();

  return (
    <section className="editorial" id="serum" ref={scope} data-parallax-scope>
      <div className="container editorial__grid">
        <Link href="/product/orange-sunset" className="ed-card ed-card--serum" data-cursor="view" data-cursor-label="View">
          <div className="ed-card__media">
            <video
              data-reveal="img"
              data-parallax="-6"
              poster="/assets/serum-open.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Erelina brightening serum being dispensed from a glass dropper"
            >
              <source src="/assets/serum-video.webm" type="video/webm" />
              <source src="/assets/serum-video.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="ed-card__foot">
            <div>
              <p className="eyebrow" data-reveal data-reveal-order="0">Serum</p>
              <h3 data-reveal data-reveal-order="1">
                Brightening Serum<br /><em className="script">&lsquo;Fig in Blossom&rsquo;</em>
              </h3>
              <p className="ed-card__desc mono" data-reveal data-reveal-order="2">
                Infused with fig pulp, oat and floral essence.
              </p>
            </div>
            <ArrowCircle />
          </div>
        </Link>

        <Link href="/#ingredients" className="ed-card ed-card--figs" data-cursor="view" data-cursor-label="Explore">
          <div className="ed-card__media">
            <img data-reveal="img" data-parallax="-9" src="/assets/figs.jpg" alt="Halved fresh figs in warm light" />
          </div>
          <div className="ed-card__foot">
            <div>
              <h3 className="script ed-card__script" data-reveal data-reveal-order="1">Pure</h3>
              <p className="ed-card__desc mono" data-reveal data-reveal-order="2">
                Organic cold-pressed fig juice.
              </p>
            </div>
            <ArrowCircle />
          </div>
        </Link>
      </div>
    </section>
  );
}
