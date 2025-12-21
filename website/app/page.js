import dynamicImport from 'next/dynamic';
import prisma from '@/lib/prisma';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export const dynamic = 'force-dynamic';

// Lazy load components that can be server rendered
const About = dynamicImport(() => import("@/components/About"), { ssr: true });
const MenuHighlights = dynamicImport(() => import("@/components/MenuHighlights"), { ssr: true });
const Footer = dynamicImport(() => import("@/components/Footer"), { ssr: true });

// Client components (must be imported directly)
import Branches from "@/components/Branches";
import Franchise from "@/components/Franchise";
import Careers from "@/components/Careers";
import AppPromo from "@/components/AppPromo";

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


import { getAppPromo } from "@/app/actions/app-promo";

export default async function Home() {
  const [menuItems, branches, cities, heroMedia, appPromoResult] = await Promise.all([
    getMenuItems(),
    getBranches(),
    getCities(),
    getActiveHeroMedia(),
    getAppPromo()
  ]);

  const appPromo = appPromoResult.success ? appPromoResult.data : null;

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      <Hero media={heroMedia} />
      <About />
      {/* <MenuHighlights items={menuItems} /> */}
      <Branches branches={branches} cities={cities} />
      <Franchise />
      <Careers />
      <AppPromo data={appPromo} />
      <Footer />
    </main>
  );
}
