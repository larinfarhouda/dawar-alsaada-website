"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Building2, TrendingUp, Users } from "lucide-react";

export default function Franchise() {
    const [formStatus, setFormStatus] = useState("idle");

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus("submitting");
        // Simulate API call
        setTimeout(() => {
            setFormStatus("success");
        }, 1500);
    };

    return (
        <section id="franchise" className="py-20 bg-stone-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-brand font-bold text-lg mb-2">الامتياز التجاري</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-white">كن شريكاً في النجاح</h3>
                    <p className="text-stone-400 mt-4 max-w-2xl mx-auto">
                        استثمر في علامة تجارية سعودية رائدة وحقق عوائد مجزية. انضم إلى قصة نجاح دوار السعادة.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="grid grid-cols-1 gap-8">
                            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-brand/50 transition-colors">
                                <div className="bg-brand w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-brand/20">
                                    <TrendingUp size={32} />
                                </div>
                                <h4 className="text-2xl font-bold mb-3">عائد استثماري مجزي</h4>
                                <p className="text-stone-400 leading-relaxed">
                                    نقدم نموذج عمل مثبت النجاح يضمن لك تحقيق عوائد استثمارية عالية وفترة استرداد قياسية لرأس المال.
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-brand/50 transition-colors">
                                <div className="bg-brand w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-brand/20">
                                    <Building2 size={32} />
                                </div>
                                <h4 className="text-2xl font-bold mb-3">دعم تشغيلي متكامل</h4>
                                <p className="text-stone-400 leading-relaxed">
                                    نوفر لك الدعم الكامل في اختيار الموقع، التصميم، التوظيف، التدريب، والتسويق لضمان انطلاقة قوية.
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-brand/50 transition-colors">
                                <div className="bg-brand w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-brand/20">
                                    <Users size={32} />
                                </div>
                                <h4 className="text-2xl font-bold mb-3">قاعدة عملاء واسعة</h4>
                                <p className="text-stone-400 leading-relaxed">
                                    استفد من السمعة الطيبة والشعبية الكبيرة التي تحظى بها علامتنا التجارية في السوق السعودي.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white rounded-3xl p-8 md:p-10 text-stone-800 shadow-2xl"
                    >
                        {formStatus === "success" ? (
                            <div className="text-center py-12">
                                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle size={48} />
                                </div>
                                <h4 className="text-3xl font-bold text-stone-800 mb-4">تم استلام طلبك!</h4>
                                <p className="text-stone-600 text-lg mb-8">
                                    شكراً لاهتمامك بالاستثمار معنا. سيقوم فريق الامتياز التجاري بدراسة طلبك والتواصل معك قريباً.
                                </p>
                                <button
                                    onClick={() => setFormStatus("idle")}
                                    className="text-brand font-bold hover:underline text-lg"
                                >
                                    العودة للنموذج
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <h4 className="text-2xl font-bold mb-6 text-center">طلب الامتياز التجاري</h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-stone-700">الاسم الكامل</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none" placeholder="الاسم الثلاثي" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-stone-700">رقم الجوال</label>
                                        <input type="tel" required className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none" placeholder="05xxxxxxxx" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-stone-700">البريد الإلكتروني</label>
                                    <input type="email" required className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none" placeholder="name@example.com" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-stone-700">المدينة المقترحة</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none" placeholder="الرياض، جدة..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-stone-700">الميزانية الاستثمارية</label>
                                        <select className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none">
                                            <option value="">اختر الميزانية...</option>
                                            <option value="500k-1m">٥٠٠ ألف - ١ مليون ريال</option>
                                            <option value="1m-2m">١ مليون - ٢ مليون ريال</option>
                                            <option value="2m+">أكثر من ٢ مليون ريال</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-stone-700">هل لديك خبرة سابقة في المطاعم؟</label>
                                    <div className="flex gap-6 mt-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="experience" className="w-5 h-5 text-brand focus:ring-brand" />
                                            <span>نعم</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="experience" className="w-5 h-5 text-brand focus:ring-brand" />
                                            <span>لا</span>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={formStatus === "submitting"}
                                    className="w-full bg-brand hover:bg-brand/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand/20 transition-all flex items-center justify-center gap-2 mt-4"
                                >
                                    {formStatus === "submitting" ? "جاري الإرسال..." : "إرسال طلب الامتياز"}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
