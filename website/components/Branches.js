"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Phone, Clock } from "lucide-react";

export default function Branches({ branches = [], cities = [] }) {
    // Group branches by city
    const grouped = branches.reduce((acc, branch) => {
        if (!acc[branch.city]) acc[branch.city] = [];
        acc[branch.city].push(branch);
        return acc;
    }, {});

    // Use DB cities if available, otherwise fallback to derived cities
    const cityNames = cities.length > 0
        ? cities.map(c => c.name)
        : Object.keys(grouped);

    const [activeCity, setActiveCity] = useState(cityNames[0] || "");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <section id="branches" className="py-24 bg-gradient-to-b from-white to-stone-50 relative overflow-hidden">
            {/* Decorative Map Background */}
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] pointer-events-none" />

            {/* Gradient Orbs */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 mb-4"
                    >
                        <span className="w-12 h-1 bg-brand rounded-full" />
                        <h2 className="text-brand font-bold text-lg tracking-wide">فروعنا</h2>
                        <span className="w-12 h-1 bg-brand rounded-full" />
                    </motion.div>
                    <h3 className="text-4xl md:text-6xl font-bold text-stone-900 mb-4">
                        أقرب مما <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-amber-500">تتخيل</span>
                    </h3>
                    <p className="text-stone-500 text-lg max-w-2xl mx-auto">
                        نقدم لكم السعادة في أكثر من <span className="text-brand font-bold">١٣٣ فرع</span> حول المملكة
                    </p>
                </div>

                {/* City Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {cityNames.map((city, index) => (
                        <motion.button
                            key={city}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setActiveCity(city)}
                            className={`relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden ${activeCity === city ? "text-white shadow-xl shadow-brand/30 scale-105" : "bg-white text-stone-600 hover:bg-stone-50 hover:text-brand shadow-md"}`}
                        >
                            {activeCity === city && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-gradient-to-r from-brand to-amber-500"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{city}</span>
                        </motion.button>
                    ))}
                </div>

                {/* Branches Grid */}
                <div className="min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCity}
                            initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={isMobile ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {grouped[activeCity]?.map((branch, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-stone-100 hover:border-brand/20 hover:-translate-y-2"
                                >
                                    {/* Decorative Corner */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-brand/10 to-transparent rounded-bl-3xl rounded-tr-3xl" />

                                    <div className="flex items-start justify-between mb-6 relative z-10">
                                        <div className="bg-gradient-to-br from-brand to-amber-500 p-4 rounded-2xl text-white shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform">
                                            <MapPin size={28} />
                                        </div>
                                        <a
                                            href={branch.link}
                                            className="flex items-center gap-2 px-4 py-2 bg-stone-50 hover:bg-brand hover:text-white text-stone-600 rounded-xl transition-all font-medium text-sm group/btn"
                                        >
                                            <span>اتجاهات</span>
                                            <Navigation size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </a>
                                    </div>

                                    <h4 className="text-2xl font-bold text-stone-900 mb-3 group-hover:text-brand transition-colors">
                                        {branch.name}
                                    </h4>

                                    <div className="space-y-3 text-stone-600">
                                        <div className="flex items-start gap-3">
                                            <MapPin size={18} className="text-brand mt-1 shrink-0" />
                                            <p className="text-sm leading-relaxed">{branch.address}</p>
                                        </div>
                                        <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
                                            <Phone size={18} className="text-brand shrink-0" />
                                            <a href={`tel:${branch.phone}`} className="text-sm font-medium hover:text-brand transition-colors">
                                                {branch.phone}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock size={18} className="text-brand shrink-0" />
                                            <span className="text-sm">يومياً من ٤:٠٠ فجراً</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
