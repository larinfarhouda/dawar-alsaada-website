"use client";

import { useState, useEffect } from "react";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
    { name: "الرئيسية", href: "#hero" },
    { name: "من نحن", href: "#about" },
    // { name: "قائمة الطعام", href: "#menu" },
    { name: "الفروع", href: "#branches" },
    // { name: "الامتياز التجاري", href: "#franchise" },
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
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center relative">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-22 h-22">
                        <img src="/logo.png" alt="Dawar Al Saada Logo" className="object-contain w-full h-full" />
                    </div>
                    {/* <span className={`text-2xl font-bold ${scrolled ? "text-stone-800" : "text-stone-800 md:text-white"} transition-colors`}>
                        دوار السعاده
                    </span> */}
                </Link>

                {/* Desktop Menu - Centered Links */}
                <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
                </div>

                {/* Desktop Menu - Action Button */}
                <div className="hidden md:block">
                    <Link href="#franchise" className="bg-brand hover:bg-brand/90 text-white px-6 py-2 rounded-full font-bold transition-transform hover:scale-105 shadow-lg">
                        الامتياز التجاري
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-stone-800"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} className={scrolled ? "text-stone-800" : "text-stone-800 md:text-white"} />}
                </button>
            </div>

            {/* Mobile Menu */}
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
                        <a
                            key={link.name}
                            href={link.href}
                            className="block px-4 py-3 text-stone-700 hover:text-brand hover:bg-brand/5 rounded-xl transition-all font-medium text-base"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <Link
                        href="#franchise"
                        className="bg-brand hover:bg-brand/90 text-white px-8 py-3 rounded-full font-bold shadow-md w-full mt-4 block text-center"
                        onClick={() => setIsOpen(false)}
                    >
                        الامتياز التجاري
                    </Link>
                </div>
            </motion.div>
        </nav>
    );
}
