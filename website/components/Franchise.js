"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Building2, TrendingUp, Users } from "lucide-react";
import { createFranchiseRequest } from "@/app/actions/franchise";

export default function Franchise() {
    const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState("");
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        profession: "",
        age: "",
        city: "",
        investmentSource: "",
        companyName: "",
        companyActivity: "",
        locationLink: "",
        experience: "",
        readiness: "",
        additionalInfo: "",
        questions: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus("submitting");
        setErrorMessage("");

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        const result = await createFranchiseRequest(data);

        if (result.success) {
            setFormStatus("success");
        } else {
            setFormStatus("error");
            setErrorMessage(result.error || "حدث خطأ أثناء إرسال الطلب");
        }
    };

    const resetForm = () => {
        setFormStatus("idle");
        setErrorMessage("");
        setStep(1);
        setFormData({
            name: "",
            phone: "",
            email: "",
            profession: "",
            age: "",
            city: "",
            investmentSource: "",
            companyName: "",
            companyActivity: "",
            locationLink: "",
            experience: "",
            readiness: "",
            additionalInfo: "",
            questions: ""
        });
    };

    return (
        <section id="franchise" className="py-20 bg-stone-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-brand font-bold text-lg mb-6">الامتياز التجاري</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-white">كن شريكاً في النجاح</h3>
                    <p className="text-stone-400 mt-4 max-w-2xl mx-auto">
                        استثمر في علامة تجارية سعودية رائدة وحقق عوائد مجزية. انضم إلى قصة نجاح دوار السعادة.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="h-full"
                    >
                        <div className="h-full flex flex-col gap-6">
                            <div className="flex-1 bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 hover:border-brand/50 transition-colors flex items-center gap-5">
                                <div className="bg-brand w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand/20">
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">عائد استثماري مجزي</h4>
                                    <p className="text-stone-400 leading-relaxed text-sm">
                                        نقدم نموذج عمل مثبت النجاح يضمن لك تحقيق عوائد استثمارية عالية وفترة استرداد قياسية لرأس المال.
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 hover:border-brand/50 transition-colors flex items-center gap-5">
                                <div className="bg-brand w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand/20">
                                    <Building2 size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">دعم تشغيلي متكامل</h4>
                                    <p className="text-stone-400 leading-relaxed text-sm">
                                        نوفر لك الدعم الكامل في اختيار الموقع، التصميم، التوظيف، التدريب، والتسويق لضمان انطلاقة قوية.
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 hover:border-brand/50 transition-colors flex items-center gap-5">
                                <div className="bg-brand w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand/20">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">قاعدة عملاء واسعة</h4>
                                    <p className="text-stone-400 leading-relaxed text-sm">
                                        استفد من السمعة الطيبة والشعبية الكبيرة التي تحظى بها علامتنا التجارية في السوق السعودي.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white rounded-3xl p-8 md:p-10 text-stone-800 shadow-2xl h-full flex flex-col justify-center"
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
                                    onClick={resetForm}
                                    className="text-brand font-bold hover:underline text-lg"
                                >
                                    العودة للنموذج
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <h4 className="text-2xl font-bold mb-6 text-center">طلب الامتياز التجاري</h4>

                                {formStatus === "error" && (
                                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800">
                                        {errorMessage}
                                    </div>
                                )}

                                {/* Step 1: Personal Information */}
                                {step === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-5"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-stone-700">الاسم الكامل</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                                    placeholder="الاسم الثلاثي"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-stone-700">رقم الجوال</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                                    placeholder="05xxxxxxxx"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-stone-700">البريد الإلكتروني</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                                placeholder="name@example.com"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-stone-700">المهنة</label>
                                                <input
                                                    type="text"
                                                    name="profession"
                                                    value={formData.profession}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-stone-700">العمر</label>
                                                <input
                                                    type="number"
                                                    name="age"
                                                    value={formData.age}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-stone-700">المدينة المقترحة</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                                placeholder="الرياض، جدة..."
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="w-full bg-brand hover:bg-brand/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand/20 transition-all flex items-center justify-center gap-2 mt-4"
                                        >
                                            التالي
                                        </button>
                                    </motion.div>
                                )}

                                {/* Step 2: Business Information */}
                                {step === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-5"
                                    >
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-stone-700">مصدر الاستثمار</label>
                                            <select
                                                name="investmentSource"
                                                value={formData.investmentSource}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                            >
                                                <option value="">اختر المصدر...</option>
                                                <option value="مدخرات شخصية">مدخرات شخصية</option>
                                                <option value="استثمارات تجارية">استثمارات تجارية</option>
                                                <option value="تمويل بنكي">تمويل بنكي</option>
                                                <option value="أخرى:">أخرى</option>
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-stone-700">اسم الشركة (إن وجدت)</label>
                                                <input
                                                    type="text"
                                                    name="companyName"
                                                    value={formData.companyName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-stone-700">نشاط الشركة (إن وجد)</label>
                                                <input
                                                    type="text"
                                                    name="companyActivity"
                                                    value={formData.companyActivity}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-stone-700">هل لديك موقع جاهز؟ (رابط قوقل ماب)</label>
                                            <input
                                                type="text"
                                                name="locationLink"
                                                value={formData.locationLink}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                                placeholder="https://maps.google.com/..."
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-stone-700">الخبرة في المطاعم/المقاهي</label>
                                                <select
                                                    name="experience"
                                                    value={formData.experience}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                                >
                                                    <option value="">اختر الخبرة...</option>
                                                    <option value="مالك مطعم">مالك مطعم</option>
                                                    <option value="ممنوح فرانشايز">ممنوح فرانشايز</option>
                                                    <option value="مانح فرانشايز">مانح فرانشايز</option>
                                                    <option value="عملت كموظف">عملت كموظف</option>
                                                    <option value="أخرى:">أخرى</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-stone-700">متى تكون جاهز؟</label>
                                                <select
                                                    name="readiness"
                                                    value={formData.readiness}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                                >
                                                    <option value="">اختر الفترة...</option>
                                                    <option value="في الحال">في الحال</option>
                                                    <option value="٣ أشهر الى ٦ أشهر">٣ أشهر الى ٦ أشهر</option>
                                                    <option value="٦ أشهر الى سنة">٦ أشهر الى سنة</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-stone-700">معلومات إضافية</label>
                                                <textarea
                                                    name="additionalInfo"
                                                    value={formData.additionalInfo}
                                                    onChange={handleInputChange}
                                                    rows="2"
                                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none resize-none"
                                                ></textarea>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-stone-700">أسئلة أو استفسارات</label>
                                                <textarea
                                                    name="questions"
                                                    value={formData.questions}
                                                    onChange={handleInputChange}
                                                    rows="2"
                                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none resize-none"
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="w-1/3 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold py-4 rounded-xl transition-all"
                                            >
                                                السابق
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={formStatus === "submitting"}
                                                className="w-2/3 bg-brand hover:bg-brand/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {formStatus === "submitting" ? "جاري الإرسال..." : "إرسال طلب الامتياز"}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
