import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Editorial from "@/components/home/Editorial";
import OrganicLuxury from "@/components/home/OrganicLuxury";
import Ritual from "@/components/home/Ritual";
import Ingredients from "@/components/home/Ingredients";
import Press from "@/components/home/Press";
import Story from "@/components/home/Story";

export default function Home() {
  return (
    <>
      <Nav light />
      <main>
        <Hero />
        <Editorial />
        <OrganicLuxury />
        <Ritual />
        <Ingredients />
        <Press />
        <Story />
      </main>
      <Footer />
    </>
  );
}
