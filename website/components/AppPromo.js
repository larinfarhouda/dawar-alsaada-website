"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { getAboutCarouselImages } from "@/app/actions/about-carousel";

export default function About() {
    const [carouselImages, setCarouselImages] = useState([]);

    useEffect(() => {
        async function loadImages() {
            try {
                const result = await getAboutCarouselImages();
                if (result.success) {
                    setCarouselImages(result.data);
                }
            } catch (error) {
                console.error("Failed to load carousel images:", error);
            }
        }
        loadImages();
    }, []);

    // 1. Prepare the base list (No doubling here, we handle doubling in the render)
    const slides = useMemo(() => {
        if (!carouselImages || carouselImages.length === 0) return [];

        const SAFE_ITEM_WIDTH = 320; // Item width + padding
        const MIN_TOTAL_WIDTH = 2000; // Ensure it covers at least a standard screen width

        const currentTotalWidth = carouselImages.length * SAFE_ITEM_WIDTH;
        let repeatCount = 1;

        if (currentTotalWidth < MIN_TOTAL_WIDTH) {
            repeatCount = Math.ceil(MIN_TOTAL_WIDTH / currentTotalWidth);
        }

        // Just fill the screen once. We will render this list twice in the JSX.
        return Array(repeatCount).fill(carouselImages).flat();
    }, [carouselImages]);

    return (
        <section id="about" className="py-16 md:py-24 bg-stone-50 relative overflow-hidden">
            {/* ... (Background, Text, and Stats sections remain exactly the same) ... */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 -right-20 w-64 h-64 md:w-96 md:h-96 bg-brand/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 -left-20 w-60 h-60 md:w-80 md:h-80 bg-amber-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10 mb-16">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 text-right order-1 lg:order-1"
                    >
                        <div className="inline-flex items-center justify-start gap-2 mb-3 sm:mb-4 w-full">
                            <h2 className="text-brand font-bold text-base sm:text-lg tracking-wide">قصتنا اللذيذة</h2>
                            <span className="w-8 sm:w-12 h-1 bg-brand rounded-full"></span>
                        </div>

                        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-6 sm:mb-8 leading-tight">
                            أكثر من مجرد مطعم، <br />
                            <span className="relative inline-block mt-1">
                                <span className="relative z-10">تجربة سعودية أصيلة</span>
                                <span className="absolute bottom-1 sm:bottom-2 left-0 w-full h-2 sm:h-3 bg-brand/20 -rotate-1"></span>
                            </span>
                        </h3>

                        <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 font-light text-stone-600">
                            في دوار السعادة، نؤمن إن الطعم يبدأ من الفكرة. منذ انطلاقتنا عام 2021، اخترنا نكون أكثر من مجرد مطعم—اخترنا نكون تجربة سعودية تمشي مع روح اليوم، وتتماشى مع رؤية 2030.
                        </p>
                        <p className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 font-light text-stone-600">
                            بنينا استراتيجيتنا على الجرأة والمرونة، واستقطبنا أفضل الكفاءات لنخلق تجربة فريدة بطابع سعودي أصيل ولمسة حديثة.
                        </p>

                        <div className="grid grid-cols-3 gap-2 sm:gap-8 border-t border-stone-200 pt-6 sm:pt-8">
                            {[
                                { number: "2021", label: "سنة التأسيس" },
                                { number: "+20", label: "صنف مميز" },
                                { number: "24/7", label: "خدمة متميزة" }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                                    className="text-center lg:text-right"
                                >
                                    <span className="block text-2xl sm:text-4xl font-bold text-brand mb-1 sm:mb-2">{stat.number}</span>
                                    <span className="text-stone-500 font-medium text-xs sm:text-base">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image Composition */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative order-2 lg:order-2 mt-8 lg:mt-0"
                    >
                        <div className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.5 }}
                                className="absolute top-0 right-0 w-[75%] md:w-3/4 h-[240px] sm:h-[300px] md:h-3/4 rounded-[2rem] overflow-hidden shadow-2xl z-20 border-4 border-white"
                            >
                                <img src="https://scontent.cdninstagram.com/v/t51.75761-15/498926087_18056457053337390_5391886226547738169_n.webp?_nc_cat=110&ig_cache_key=MzYzNTE0NTUxMDQ2NjM2OTg5Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjExNTJ4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=Ky2QnhMZlucQ7kNvwF9n1M4&_nc_oc=AdliN0aAOXKUdDNEtegyqleaJLsRnL_iUZz8xtlu415oXq67ZI7ndGUZMpjy2FhDDq4&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=N713SqSOkZfkN_f_W7wQ7Q&oh=00_AfhDa1wUpJVSe6I9ZOoMxu7JpSP2X02hwgXLsaIcWzFFXA&oe=692A77B8" alt="Food presentation" className="object-cover w-full h-full" />
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.5 }}
                                className="absolute bottom-0 left-0 w-[75%] md:w-2/3 h-[200px] sm:h-[260px] md:h-2/3 rounded-[2rem] overflow-hidden shadow-2xl z-30 border-4 border-white"
                            >
                                <img src="https://scontent.cdninstagram.com/v/t51.75761-15/491443218_18055361894337390_6726320157998689992_n.webp?stp=dst-webp_p720x720&_nc_cat=100&ig_cache_key=MzYyNzA3NTEzNTQwMDcwMTk0Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjExNTJ4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=XcuWyaJhUIQQ7kNvwHIOkvk&_nc_oc=AdnSjEE2LGhvykJ1kDglTJb2wFs3NYXCEMPUj6Efxfj-J1fHjUt9KrjozofQSD-JMJM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=N713SqSOkZfkN_f_W7wQ7Q&oh=00_Afjy3r7EyNc51eYTSCD-0YC1USPf9FVQSYfQlqG-dsg5jQ&oe=692A55A7" alt="Chef preparing food" className="object-cover w-full h-full" />
                            </motion.div>

                            <div className="absolute top-1/2 left-[15%] sm:left-1/4 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-brand rounded-full z-40 flex items-center justify-center shadow-xl animate-bounce border-2 border-white">
                                <span className="text-white font-bold text-sm sm:text-xl text-center leading-tight">+١٥٥<br />فرع </span>
                            </div>

                            <div className="absolute -bottom-4 -right-4 w-[90%] h-[90%] border-2 border-brand/20 rounded-[2.5rem] z-10 hidden sm:block"></div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Auto Scrolling Carousel */}
            {slides.length > 0 && (
                <div
                    className="w-full overflow-hidden py-8 border-t border-stone-200/50 bg-white/50 backdrop-blur-sm"
                    dir="ltr"
                >
                    <div className="flex w-max">
                        {/* LEFT TO RIGHT LOGIC:
                           We start at x: "-100%" and animate to x: "0%".
                           This makes the content slide towards the right.
                        */}
                        {[0, 1].map((i) => (
                            <motion.div
                                key={i}
                                className="flex shrink-0"
                                initial={{ x: "-100%" }} // Start shifted to the left
                                animate={{ x: "0%" }}    // Move towards the right
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 40,
                                    ease: "linear",
                                }}
                            >
                                {slides.map((item, index) => (
                                    <div
                                        key={`${i}-${item.id}-${index}`}
                                        className="relative w-64 md:w-80 h-48 md:h-60 flex-shrink-0 pr-8 rounded-xl overflow-visible group"
                                    >
                                        <div className="w-full h-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative">
                                            <img
                                                src={item.image}
                                                alt="About gallery"
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}