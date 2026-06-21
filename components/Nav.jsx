"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useCart } from "./CartContext";

export default function Nav({ light = false }) {
  const nav = useRef(null);
  const { count } = useCart();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const el = nav.current;
      if (!el) return;
      el.classList.toggle("is-scrolled", y > 40);
      // hide on scroll-down past hero, reveal on scroll-up
      if (y > 560 && y > last + 4) el.classList.add("is-hidden");
      else if (y < last - 4 || y < 560) el.classList.remove("is-hidden");
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${light ? " nav--light" : ""}`} ref={nav}>
      <button className="nav__menu" data-cursor="hover" aria-label="Menu">
        <span className="bars" aria-hidden="true">
          <i />
          <i />
        </span>
        Menu
      </button>

      <div className="nav__logo">
        <Logo />
      </div>

      <div className="nav__right">
        <nav className="nav__links" aria-label="Primary">
          <Link href="/product/orange-sunset" className="link-underline" data-cursor="hover">
            Shop
          </Link>
          <a href="/#ingredients" className="link-underline" data-cursor="hover">
            Ingredients
          </a>
          <a href="/#story" className="link-underline" data-cursor="hover">
            About
          </a>
        </nav>
        <span className="nav__bag" data-cursor="hover">
          Bag <span className="count">{count}</span>
        </span>
      </div>
    </header>
  );
}
