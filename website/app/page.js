import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MenuHighlights from "@/components/MenuHighlights";
import Branches from "@/components/Branches";
import Franchise from "@/components/Franchise";
import Careers from "@/components/Careers";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      <Hero />
      <About />
      <MenuHighlights />
      <Branches />
      <Franchise />
      <Careers />
      <Footer />
    </main>
  );
}
