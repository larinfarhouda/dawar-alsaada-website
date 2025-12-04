import dynamic from 'next/dynamic';
import prisma from '@/lib/prisma';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export const dynamic = 'force-dynamic';

// Lazy load components that can be server rendered
const About = dynamic(() => import("@/components/About"), { ssr: true });
const MenuHighlights = dynamic(() => import("@/components/MenuHighlights"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

// Client components (must be imported directly)
import Branches from "@/components/Branches";
import Franchise from "@/components/Franchise";
import Careers from "@/components/Careers";

async function getMenuItems() {
  try {
    const items = await prisma.menuItem.findMany({
      take: 6,
      orderBy: [
        { popular: 'desc' },
        { rating: 'desc' }
      ]
    });
    return items;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
}

async function getBranches() {
  try {
    const branches = await prisma.branch.findMany({
      orderBy: { city: 'asc' }
    });
    return branches;
  } catch (error) {
    console.error("Error fetching branches:", error);
    return [];
  }
}

async function getCities() {
  try {
    const cities = await prisma.city.findMany({
      orderBy: { createdAt: 'asc' }
    });
    return cities;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}

async function getActiveHeroMedia() {
  try {
    const media = await prisma.heroMedia.findFirst({
      where: { isActive: true }
    });
    return media;
  } catch (error) {
    console.error("Error fetching hero media:", error);
    return null;
  }
}


export default async function Home() {
  const [menuItems, branches, cities, heroMedia] = await Promise.all([
    getMenuItems(),
    getBranches(),
    getCities(),
    getActiveHeroMedia()
  ]);

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      <Hero media={heroMedia} />
      <About />
      <MenuHighlights items={menuItems} />
      <Branches branches={branches} cities={cities} />
      <Franchise />
      <Careers />
      <Footer />
    </main>
  );
}
