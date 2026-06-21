"use client";

import Link from "next/link";
import Logo from "./Logo";

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__touch">— get in touch with us —</div>
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p className="mono" style={{ marginTop: "1.2rem", color: "var(--mocha)", maxWidth: "22ch" }}>
              Biodynamic skincare, grown &amp; pressed in Tahoe, California.
            </p>
          </div>

          <div className="footer__col">
            <h4>Explore</h4>
            <ul>
              <li><Link href="/product/orange-sunset" className="link-underline" data-cursor="hover">Shop</Link></li>
              <li><a href="/#ingredients" className="link-underline" data-cursor="hover">Ingredients</a></li>
              <li><a href="/#story" className="link-underline" data-cursor="hover">About</a></li>
              <li><a href="#" className="link-underline" data-cursor="hover">Legal</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+15305554311" data-cursor="hover">+1 530 555 4311</a></li>
              <li><a href="mailto:hello@erelina.com" className="link-underline" data-cursor="hover">hello@erelina.com</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Subscribe to the news</h4>
            <form className="footer__sub" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="your e-mail" aria-label="Email address" />
              <button type="submit" data-cursor="hover" aria-label="Subscribe">
                <Icon d="M3 12h16M13 6l6 6-6 6" />
              </button>
            </form>
            <div className="footer__social">
              <a href="#" data-cursor="hover" aria-label="Instagram">
                <Icon d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5-1.5h.01" />
              </a>
              <a href="#" data-cursor="hover" aria-label="X">
                <Icon d="M4 4l16 16M20 4L4 20" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bar">
          <span>© 2026 Erelina Cosmetics. All rights reserved.</span>
          <span>Crafted with care · Tahoe, CA</span>
        </div>
      </div>
      <div className="footer__monogram" aria-hidden="true">E</div>
    </footer>
  );
}
