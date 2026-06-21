import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductView from "@/components/product/ProductView";

export const metadata = {
  title: "‘Orange Sunset’ Brightening Cream — Erelina",
  description:
    "Organic brightening cream infused with orange peel, vanilla bean and rosemary. Evens skin tone while deeply hydrating. 100 ml / 3.4 oz.",
};

export default function ProductPage() {
  return (
    <>
      <Nav />
      <main>
        <ProductView />
      </main>
      <Footer />
    </>
  );
}
