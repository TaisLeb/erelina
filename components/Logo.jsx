"use client";

import Link from "next/link";

/**
 * Erelina wordmark — script type with a hand-drawn gold underline swash.
 * Generated in-house (SVG underline) per the brand boards.
 */
export default function Logo({ href = "/", className = "" }) {
  return (
    <Link
      href={href}
      className={`logo ${className}`}
      data-cursor="hover"
      aria-label="Erelina — home"
    >
      Erelina<sup>®</sup>
      <svg viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
        <path d="M2 7 C 18 11, 34 11, 50 7 S 82 2, 98 6" />
      </svg>
    </Link>
  );
}
