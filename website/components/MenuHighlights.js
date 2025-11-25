"use client";

import { motion } from "framer-motion";
import { Star, ArrowLeft } from "lucide-react";

const dishes = [
    {
        id: 1,
        name: "فطيرة الكبدة بالجبن الشهيرة",
        description: "وصفة أصلية وجبن مذاب، طعم لا يُنسى",
        price: "٢٢ ر.س",
        image: "https://d.dawar.sa/wp-content/uploads/2025/07/%D9%83%D8%A8%D8%AF%D8%A9-%D8%A8%D8%A7%D9%84%D8%AC%D8%A8%D9%86-1.png",
        rating: 4.9,
        popular: true
    },
    {
        id: 2,
        name: "بوكس كرك ومراهيف",
        description: "استمتع بألذ مراهيف مع شاي الكرك الأصلي",
        price: "٤٥ ر.س",
        image: "https://d.dawar.sa/wp-content/uploads/2025/07/%D8%A8%D9%88%D9%83%D8%B3-%D9%83%D8%B1%D9%83-%D9%88%D9%85%D8%B1%D8%A7%D9%87%D9%8A%D9%81.png",
        rating: 4.8,
        popular: false
    },
    {
        id: 3,
        name: "شكشوكة جبن",
        description: "بيض طازج مع الطماطم والجبن السائل",
        price: "١٨ ر.س",
        image: "https://d.dawar.sa/wp-content/uploads/2025/07/%D8%B4%D9%83%D8%B4%D9%88%D9%83%D8%A9-%D8%A8%D8%A7%D9%84%D8%AC%D8%A8%D9%86.png",
        rating: 4.7,
        popular: false
    },
];

export default function MenuHighlights() {
    return (
        <section id="menu" className="py-12 md:py-24 bg-stone-100 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/food.png')] pointer-events-none"></div>

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
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full justify-between"
                        >
                            {dish.popular && (
                                <div className="absolute top-6 left-6 z-20 bg-brand text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                    الأكثر طلباً
                                </div>
                            )}

                            <div className="h-48 md:h-72 overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10"></div>
                                <img
                                    src={dish.image}
                                    alt={dish.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl font-bold text-stone-900 shadow-lg flex items-center gap-1">
                                    <Star size={16} className="text-amber-400 fill-amber-400" />
                                    <span>{dish.rating}</span>
                                </div>
                            </div>

                            <div className="p-4 md:p-8 text-center md:text-right relative">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-2xl font-bold text-stone-800 group-hover:text-brand transition-colors">{dish.name}</h4>
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
