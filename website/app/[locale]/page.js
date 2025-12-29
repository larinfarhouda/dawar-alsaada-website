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
      orderBy: { city_ar: 'asc' }
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


export default async function Home({ params }) {
  const { locale } = await params;

  const [menuItemsResult, branchesResult, citiesResult, heroMedia, appPromoResult] = await Promise.all([
    getMenuItems(),
    getBranches(),
    getCities(),
    getActiveHeroMedia(),
    getAppPromo()
  ]);

  const isEn = locale === 'en';

  const menuItems = menuItemsResult.map(item => ({
    ...item,
    name: isEn ? (item.name_en || item.name_ar) : item.name_ar,
    description: isEn ? (item.description_en || item.description_ar) : item.description_ar
  }));

  const branches = branchesResult.map(branch => ({
    ...branch,
    city: isEn ? (branch.city_en || branch.city_ar) : branch.city_ar,
    name: isEn ? (branch.name_en || branch.name_ar) : branch.name_ar,
    address: isEn ? (branch.address_en || branch.address_ar) : branch.address_ar
  }));

  const cities = citiesResult.map(city => ({
    ...city,
    name: isEn ? (city.name_en || city.name_ar) : city.name_ar
  }));

  let appPromo = appPromoResult.success ? appPromoResult.data : null;
  if (appPromo) {
    appPromo = {
      ...appPromo,
      title: isEn ? (appPromo.title_en || appPromo.title_ar) : appPromo.title_ar,
      subtitle: isEn ? (appPromo.subtitle_en || appPromo.subtitle_ar) : appPromo.subtitle_ar,
      description: isEn ? (appPromo.description_en || appPromo.description_ar) : appPromo.description_ar
    };
  }

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
      <Footer currentYear={new Date().getFullYear()} />
    </main>
  );
}
