"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Link, usePathname } from "@/navigation";
import { useTranslations, useLocale } from "next-intl";

export default function Navbar() {
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navLinks = [
        { name: t('home'), href: "/#hero" },
        { name: t('about'), href: "/#about" },
        { name: t('branches'), href: "/#branches" },
        { name: t('careers'), href: "/#careers" },
        { name: t('contact'), href: "/#contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleLanguage = () => {
        const nextLocale = locale === 'ar' ? 'en' : 'ar';
        const label = locale === 'ar' ? 'English' : 'العربية';
        return (
            <Link
                href={pathname}
                locale={nextLocale}
                className={`flex items-center gap-2 font-medium hover:text-brand transition-colors ${scrolled ? "text-stone-700" : "text-white"}`}
            >
                <Globe size={20} />
                <span>{label}</span>
            </Link>
        );
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-white/80 backdrop-blur-md shadow-md py-4"
                : "bg-transparent py-6"
                }`}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center relative">

                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-28 h-28">
                        <img src="/logo.png" alt="Dawar Al Saada Logo" className="object-contain w-full h-full" />
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-4 lg:gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-lg font-medium hover:text-brand transition-colors whitespace-nowrap ${scrolled ? "text-stone-700" : "text-white"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link href="/#franchise" className="bg-brand hover:bg-brand/90 text-white px-6 py-2 rounded-full font-bold transition-transform hover:scale-105 shadow-lg whitespace-nowrap">
                        {t('franchise')}
                    </Link>
                </div>


                <div className="hidden md:flex items-center gap-6">
                    {toggleLanguage()}
                </div>

                <button
                    className="md:hidden text-stone-800"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} className={scrolled ? "text-stone-800" : "text-stone-800 md:text-white"} />}
                </button>
            </div>

            <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={{
                    open: { opacity: 1, height: "auto" },
                    closed: { opacity: 0, height: 0 }
                }}
                className="md:hidden overflow-hidden"
            >
                <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-md">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="block px-4 py-3 text-stone-700 hover:text-brand hover:bg-brand/5 rounded-xl transition-all font-medium text-base"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="px-4 py-2 border-t border-stone-100 mt-2">
                        <Link
                            href={pathname}
                            locale={locale === 'ar' ? 'en' : 'ar'}
                            className="flex items-center gap-2 text-stone-700 font-medium py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <Globe size={20} />
                            <span>{locale === 'ar' ? 'English' : 'العربية'}</span>
                        </Link>
                    </div>

                    <Link
                        href="/#franchise"
                        className="bg-brand hover:bg-brand/90 text-white px-8 py-3 rounded-full font-bold shadow-md w-full mt-4 block text-center"
                        onClick={() => setIsOpen(false)}
                    >
                        {t('franchise')}
                    </Link>
                </div>
            </motion.div>
        </nav>
    );
}
