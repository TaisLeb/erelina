import { Cormorant_Garamond, Jost, Allura, Space_Mono } from "next/font/google";
import "./globals.css";
import "./sections.css";
import "./product.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import { CartProvider } from "@/components/CartContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const allura = Allura({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://erelina.vercel.app"),
  title: "Erelina — Organic Luxury That Feeds Your Skin",
  description:
    "Erelina is biodynamic, organic skincare. Cold-pressed botanicals, brightening serums and creams crafted on a small farm in Tahoe, California.",
  keywords: [
    "organic skincare",
    "biodynamic beauty",
    "brightening serum",
    "fig serum",
    "natural cosmetics",
  ],
  openGraph: {
    title: "Erelina — Organic Luxury That Feeds Your Skin",
    description:
      "Biodynamic, organic skincare crafted from cold-pressed botanicals.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#ece4d7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${allura.variable} ${spaceMono.variable}`}
    >
      <body className="is-loading">
        <CartProvider>
          <Preloader />
          <Cursor />
          <SmoothScroll>{children}</SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
