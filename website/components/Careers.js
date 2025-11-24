"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Send, CheckCircle, Briefcase, Award, TrendingUp } from "lucide-react";

export default function Careers() {
    const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus("submitting");
        // Simulate API call
        setTimeout(() => {
            setFormStatus("success");
        }, 1500);
    };

    return (
        <section id="careers" className="py-20 relative overflow-hidden bg-stone-900">
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 mb-4"
                    >
                        <Briefcase className="text-brand" size={24} />
                        <h2 className="text-brand font-bold text-lg tracking-wide">انضم إلينا</h2>
                    </motion.div>
                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        اصنع <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-amber-400">مستقبلك</span> معنا
                    </h3>
                    <p className="text-stone-400 mt-4 max-w-2xl mx-auto text-lg">
                        نبحث دائماً عن المواهب الشغوفة لتنضم إلى عائلة دوار السعادة. إذا كنت تمتلك الشغف والطموح، مكانك معنا.
                    </p>
                </div>

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        {/* Image/Info Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="md:w-1/2 w-full"
                        >
                            <div className="bg-stone-100 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                                <div className="relative z-10">
                                    <h4 className="text-2xl font-bold text-stone-800 mb-6">لماذا العمل معنا؟</h4>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3">
                                            <div className="bg-brand/10 p-2 rounded-full text-brand">
                                                <CheckCircle size={20} />
                                            </div>
                                            <span className="text-stone-700">بيئة عمل محفزة وداعمة</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="bg-brand/10 p-2 rounded-full text-brand">
                                                <CheckCircle size={20} />
                                            </div>
                                            <span className="text-stone-700">فرص للتطور والنمو الوظيفي</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="bg-brand/10 p-2 rounded-full text-brand">
                                                <CheckCircle size={20} />
                                            </div>
                                            <span className="text-stone-700">رواتب ومكافآت مجزية</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="bg-brand/10 p-2 rounded-full text-brand">
                                                <CheckCircle size={20} />
                                            </div>
                                            <span className="text-stone-700">تدريب مستمر وتطوير مهارات</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Decorative Circle */}
                                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand/5 rounded-full blur-3xl"></div>
                            </div>
                        </motion.div>

                        {/* Form Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="md:w-1/2 w-full"
                        >
                            {formStatus === "success" ? (
                                <div className="bg-green-50 border border-green-200 rounded-3xl p-12 text-center">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h4 className="text-2xl font-bold text-stone-800 mb-2">تم استلام طلبك بنجاح!</h4>
                                    <p className="text-stone-600">شكراً لاهتمامك بالانضمام إلينا. سنقوم بمراجعة طلبك والتواصل معك قريباً.</p>
                                    <button
                                        onClick={() => setFormStatus("idle")}
                                        className="mt-8 text-brand font-bold hover:underline"
                                    >
                                        إرسال طلب آخر
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-stone-700 font-medium">الاسم الكامل</label>
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                                                placeholder="محمد أحمد"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="text-stone-700 font-medium">رقم الجوال</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                required
                                                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                                                placeholder="05xxxxxxxx"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-stone-700 font-medium">البريد الإلكتروني</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                                            placeholder="name@example.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="position" className="text-stone-700 font-medium">الوظيفة المطلوبة</label>
                                        <select
                                            id="position"
                                            className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all appearance-none"
                                        >
                                            <option value="">اختر الوظيفة...</option>
                                            <option value="chef">طاهي / مساعد طاهي</option>
                                            <option value="waiter">مقدم طعام</option>
                                            <option value="manager">مدير فرع</option>
                                            <option value="cashier">كاشير</option>
                                            <option value="other">أخرى</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-stone-700 font-medium">السيرة الذاتية</label>
                                        <div className="border-2 border-dashed border-stone-300 rounded-xl p-8 text-center hover:border-brand hover:bg-brand/5 transition-colors cursor-pointer group">
                                            <Upload className="mx-auto text-stone-400 group-hover:text-brand mb-2 transition-colors" />
                                            <p className="text-sm text-stone-500 group-hover:text-brand transition-colors">
                                                اضغط لرفع الملف أو اسحب الملف هنا
                                            </p>
                                            <p className="text-xs text-stone-400 mt-1">PDF, DOCX (Max 5MB)</p>
                                            <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={formStatus === "submitting"}
                                        className="w-full bg-brand hover:bg-brand/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {formStatus === "submitting" ? (
                                            "جاري الإرسال..."
                                        ) : (
                                            <>
                                                <span>إرسال الطلب</span>
                                                <Send size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section >
    );
}
