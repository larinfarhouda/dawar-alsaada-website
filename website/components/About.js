"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="py-24 bg-stone-50 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 -right-20 w-96 h-96 bg-brand/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 -left-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 text-right"
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <span className="w-12 h-1 bg-brand rounded-full"></span>
                            <h2 className="text-brand font-bold text-lg tracking-wide">قصتنا اللذيذة</h2>
                        </div>

                        <h3 className="text-4xl md:text-6xl font-bold text-stone-900 mb-8 leading-tight">
                            أكثر من مجرد مطعم، <br />
                            <span className="relative inline-block">
                                <span className="relative z-10">تجربة سعودية أصيلة</span>
                                <span className="absolute bottom-2 left-0 w-full h-3 bg-brand/20 -rotate-1"></span>
                            </span>
                        </h3>

                        <p className="text-stone-600 text-lg leading-relaxed mb-6 font-light">
                            في دوار السعادة، نؤمن إن الطعم يبدأ من الفكرة. منذ انطلاقتنا عام 2021، اخترنا نكون أكثر من مجرد مطعم—اخترنا نكون تجربة سعودية تمشي مع روح اليوم، وتتماشى مع رؤية 2030.
                        </p>
                        <p className="text-stone-600 text-lg leading-relaxed mb-10 font-light">
                            بنينا استراتيجيتنا على الجرأة والمرونة، واستقطبنا أفضل الكفاءات لنخلق تجربة فريدة بطابع سعودي أصيل ولمسة حديثة. انتشارنا السريع ما هو صدفة، بل نتيجة شغف بالتطوير.
                        </p>

                        <div className="grid grid-cols-3 gap-8 border-t border-stone-200 pt-8">
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
                                    <span className="block text-4xl font-bold text-brand mb-2">{stat.number}</span>
                                    <span className="text-stone-500 font-medium">{stat.label}</span>
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
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative h-[600px] w-full">
                            {/* Main Image */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.5 }}
                                className="absolute top-0 right-0 w-3/4 h-3/4 rounded-[2rem] overflow-hidden shadow-2xl z-20 border-4 border-white"
                            >
                                <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000&auto=format&fit=crop" alt="Food 1" className="object-cover w-full h-full" />
                            </motion.div>

                            {/* Secondary Image */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.5 }}
                                className="absolute bottom-0 left-0 w-2/3 h-2/3 rounded-[2rem] overflow-hidden shadow-2xl z-30 border-4 border-white"
                            >
                                <img src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1000&auto=format&fit=crop" alt="Chef" className="object-cover w-full h-full" />
                            </motion.div>

                            {/* Decorative Elements */}
                            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-brand rounded-full z-40 flex items-center justify-center shadow-xl animate-bounce">
                                <span className="text-white font-bold text-xl">منذ ٢٠٢١</span>
                            </div>

                            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-brand/20 rounded-[2.5rem] z-10"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
