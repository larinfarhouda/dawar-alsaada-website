"use client";

import { motion } from "framer-motion";
import { Star, ArrowLeft } from "lucide-react";

export default function MenuHighlights({ items = [] }) {
    // Use database items or fallback to empty array
    const dishes = items.length > 0 ? items : [];

    if (dishes.length === 0) {
        return (
            <section id="menu" className="py-12 md:py-24 bg-stone-100 relative">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <p className="text-stone-500">لا توجد عناصر قائمة حالياً.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="menu" className="py-12 md:py-24 bg-stone-100 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/food.png')] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block bg-white px-6 py-2 rounded-full shadow-sm mb-4"
                    >
                        <span className="text-brand font-bold tracking-wide">قائمة الطعام</span>
                    </motion.div>
                    <h3 className="text-4xl md:text-6xl font-bold text-stone-900 mb-4">فطورنا… سر السعادة</h3>
                    <p className="text-stone-500 text-lg max-w-2xl mx-auto">
                        نقدم لكم تشكيلة مختارة من ألذ الأطباق السعودية المحضرة بحب واهتمام
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
                    {dishes.map((dish, index) => (
                        <motion.div
                            key={dish.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg md:hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full justify-between"
                        >
                            {dish.popular && (
                                <div className="absolute top-6 left-6 z-20 bg-brand text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                    الأكثر طلباً
                                </div>
                            )}

                            <div className="h-48 md:h-72 overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/20 md:group-hover:bg-black/0 transition-colors z-10" />
                                <img
                                    src={dish.image}
                                    alt={dish.name}
                                    className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute bottom-4 right-4 z-20 bg-white px-4 py-2 rounded-xl font-bold text-stone-900 shadow-md flex items-center gap-1">
                                    <Star size={16} className="text-amber-400 fill-amber-400" />
                                    <span>{dish.rating}</span>
                                </div>
                            </div>

                            <div className="p-4 md:p-8 text-center md:text-right relative">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-2xl font-bold text-stone-800 md:group-hover:text-brand transition-colors">
                                        {dish.name}
                                    </h4>
                                    <span className="text-brand font-bold text-lg">{dish.price}</span>
                                </div>
                                <p className="text-stone-500 mb-8 line-clamp-2">{dish.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <button className="bg-stone-900 text-white px-12 py-5 rounded-full font-bold hover:bg-stone-800 transition-all hover:scale-105 shadow-xl flex items-center gap-3 mx-auto">
                        <span>عرض القائمة الكاملة</span>
                        <ArrowLeft size={20} className="rotate-180" />
                    </button>
                </div>
            </div>
        </section>
    );
}
