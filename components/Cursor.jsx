"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Custom cursor: a small dot that tracks instantly and a ring that lags behind.
 * Reacts to [data-cursor="hover"] (grow) and [data-cursor="view"] (show label).
 */
export default function Cursor() {
  const root = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = root.current;
    if (!el) return;
    // Only now hide the native cursor — if this effect never runs, the
    // native pointer stays visible.
    document.body.classList.add("has-cursor");
    const xTo = gsap.quickTo(el, "x", { duration: 0.12, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.12, ease: "power3" });

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const over = (e) => {
      const t = e.target.closest("[data-cursor]");
      el.classList.remove("is-hover", "is-view");
      if (!t) return;
      const mode = t.getAttribute("data-cursor");
      if (mode === "view") {
        el.classList.add("is-view");
        if (label.current) label.current.textContent = t.getAttribute("data-cursor-label") || "View";
      } else if (mode === "hover") {
        el.classList.add("is-hover");
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <span className="cursor__ring" />
      <span className="cursor__dot" />
      <span className="cursor__label" ref={label} />
    </div>
  );
}
