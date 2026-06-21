# Erelina — Organic Luxury Skincare

An Awwwards-style marketing site for the **Erelina** biodynamic skincare brand.
Built with **Next.js (App Router) + React 19**, animated with **GSAP + Lenis**,
with a **Three.js** flowing-gradient band. Fully responsive and
reduced-motion aware.

## Stack
- **Next.js 16** / React 19 (deploys to Vercel with zero config)
- **GSAP** + **ScrollTrigger** — scroll reveals, parallax, line-draw, word reveals
- **Lenis** — smooth scrolling
- **Three.js** — `ShaderField` warm gradient behind the "Organic Luxury" band
- `next/font` — Cormorant Garamond (display), Allura (script), Jost (UI), Space Mono (specs)

## Structure
```
app/
  layout.js                 fonts, metadata, providers
  page.js                   home (hero → editorial → organic luxury → ritual → ingredients → press → story)
  product/orange-sunset/    'Orange Sunset' Brightening Cream PDP
  globals.css / sections.css / product.css
components/
  Preloader, Cursor, SmoothScroll, Nav, Footer, Logo, CartContext
  ShaderField.jsx           Three.js gradient
  home/*                    section components
  product/ProductView.jsx
public/assets/              optimized brand photography + botanical icons
```

## Develop
```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy to Vercel
This repo needs no Vercel config — Next.js is detected automatically.

**Option A — Vercel CLI**
```bash
cd ~/Desktop/erelina-app
npx vercel --prod      # follow the one-time login prompt
```

**Option B — GitHub + dashboard**
1. Create a repo and push (`git remote add origin <url> && git push -u origin main`).
2. In the Vercel dashboard → **Add New → Project → Import** the repo.
3. Accept defaults (Framework: Next.js). Every push auto-deploys.

## Notes
- Imagery and brand copy live in `public/assets`. Swap files there to update.
- The Erelina wordmark is generated in-house (`components/Logo.jsx`, script font + SVG underline swash).
- Animations respect `prefers-reduced-motion`; the WebGL band is skipped on coarse-pointer / reduced-motion devices.
