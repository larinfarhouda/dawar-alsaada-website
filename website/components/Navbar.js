"use client";

import { useState, useEffect } from "react";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
    { name: "الرئيسية", href: "#hero" },
    { name: "من نحن", href: "#about" },
    { name: "قائمة الطعام", href: "#menu" },
    { name: "الفروع", href: "#branches" },
    { name: "الامتياز التجاري", href: "#franchise" },
    { name: "وظائف", href: "#careers" },
    { name: "تواصل معنا", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-white/80 backdrop-blur-md shadow-md py-4"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-12 h-12">
                        <img src="/logo.png" alt="Dawar Al Saada Logo" className="object-contain w-full h-full" />
                    </div>
                    <span className={`text-2xl font-bold ${scrolled ? "text-stone-800" : "text-stone-800 md:text-white"} transition-colors`}>
                        دوار السعاده
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-lg font-medium hover:text-brand transition-colors ${scrolled ? "text-stone-700" : "text-white"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button className="bg-brand hover:bg-brand/90 text-white px-6 py-2 rounded-full font-bold transition-transform hover:scale-105 shadow-lg">
                        احجز الآن
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-stone-800"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} className={scrolled ? "text-stone-800" : "text-stone-800 md:text-white"} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden flex flex-col items-center py-8 gap-6 border-t border-stone-100"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-xl font-medium text-stone-700 hover:text-brand"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button className="bg-brand hover:bg-brand/90 text-white px-8 py-3 rounded-full font-bold shadow-md w-3/4">
                            احجز الآن
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
