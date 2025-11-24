"use client";

import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// Lazy load components below the fold
const About = dynamic(() => import("@/components/About"), { ssr: true });
const MenuHighlights = dynamic(() => import("@/components/MenuHighlights"), { ssr: true });
const Branches = dynamic(() => import("@/components/Branches"), { ssr: false });
const Franchise = dynamic(() => import("@/components/Franchise"), { ssr: false });
const Careers = dynamic(() => import("@/components/Careers"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

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
