"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Smartphone, Download } from "lucide-react";

export default function AppPromo({ data }) {
    if (!data) return null;

    return (
        <section className="relative py-24 overflow-hidden bg-[#F05A28]">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center mix-blend-overlay"
                    style={{ backgroundImage: `url('${data.backgroundImage}')` }}
                ></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 text-center order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white mb-6">
                            <Smartphone className="w-5 h-5" />
                            <span className="text-sm font-medium">تطبيق دوار السعادة</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {data.title} <br />
                            <span className="text-yellow-200">
                                {data.subtitle}
                            </span>
                        </h2>

                        <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-xl mx-auto">
                            {data.description}
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href={data.appStoreLink} className="flex items-center gap-3 px-6 py-3 bg-white text-stone-900 rounded-xl hover:bg-stone-100 transition-colors shadow-lg shadow-black/20">
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-stone-500">Download on the</span>
                                    <span className="text-lg font-bold leading-none">App Store</span>
                                </div>
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.72-3.06 1.61-.69.8-1.26 2.05-1.1 3.17 1.17.09 2.38-.79 3.09-1.67z" />
                                </svg>
                            </Link>

                            <Link href={data.googlePlayLink} className="flex items-center gap-3 px-6 py-3 bg-white text-stone-900 rounded-xl hover:bg-stone-100 transition-colors shadow-lg shadow-black/20">
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-stone-500">GET IT ON</span>
                                    <span className="text-lg font-bold leading-none">Google Play</span>
                                </div>
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.3,12.5L17.38,15.42L15.12,13.17L20.3,8L21.35,9.5C21.84,10.2 21.84,11.3 21.35,12L20.3,12.5M14.54,11.14L6.05,2.66L16.81,8.88L14.54,11.14Z" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Phone Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:w-1/2 relative order-1 lg:order-2 flex justify-center"
                    >
                        <div className="relative w-[280px] sm:w-[320px] aspect-[9/19]">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-brand/20 blur-3xl rounded-full transform scale-110"></div>

                            <Image
                                src={data.phoneImage}
                                alt="Dawar Al Saada App Interface"
                                fill
                                className="object-contain drop-shadow-2xl z-10"
                                sizes="(max-width: 768px) 100vw, 320px"
                            />

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -right-8 top-1/4 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl z-20 shadow-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-stone-300">تم التوصيل</p>
                                        <p className="text-sm font-bold text-white">طلبك وصل!</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -left-8 bottom-1/4 bg-white/90 backdrop-blur-md border border-white/50 p-3 rounded-2xl z-20 shadow-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="text-xs text-stone-500">نقاط الولاء</p>
                                        <p className="text-sm font-bold text-orange-600">+50 نقطة</p>
                                    </div>
                                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
