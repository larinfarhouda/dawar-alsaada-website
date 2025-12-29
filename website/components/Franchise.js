"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Building2, TrendingUp, Users } from "lucide-react";
import { createFranchiseRequest } from "@/app/actions/franchise";
import { useTranslations, useLocale } from 'next-intl';
import { saudiCities } from "@/lib/saudiCities";

export default function Franchise() {
    const t = useTranslations('Franchise');
    const locale = useLocale();
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
            setErrorMessage(result.error || t('error_msg'));
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
                    <h2 className="text-brand font-bold text-lg mb-6">{t('badge')}</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-white">{t('title')}</h3>
                    <p className="text-stone-400 mt-4 max-w-2xl mx-auto">
                        {t('subtitle')}
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
                                    <h4 className="text-xl font-bold mb-2">{t('roi_title')}</h4>
                                    <p className="text-stone-400 leading-relaxed text-sm">
                                        {t('roi_desc')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 hover:border-brand/50 transition-colors flex items-center gap-5">
                                <div className="bg-brand w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand/20">
                                    <Building2 size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">{t('support_title')}</h4>
                                    <p className="text-stone-400 leading-relaxed text-sm">
                                        {t('support_desc')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 hover:border-brand/50 transition-colors flex items-center gap-5">
                                <div className="bg-brand w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand/20">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">{t('customers_title')}</h4>
                                    <p className="text-stone-400 leading-relaxed text-sm">
                                        {t('customers_desc')}
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
                                <h4 className="text-3xl font-bold text-stone-800 mb-4">{t('success_title')}</h4>
                                <p className="text-stone-600 text-lg mb-8">
                                    {t('success_msg')}
                                </p>
                                <button
                                    onClick={resetForm}
                                    className="text-brand font-bold hover:underline text-lg"
                                >
                                    {t('return_btn')}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <h4 className="text-2xl font-bold mb-6 text-center">{t('form_title')}</h4>

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
                                                <label className="text-sm font-bold text-stone-700">{t('full_name')}</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                                    placeholder={t('full_name_placeholder')}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-stone-700">{t('phone')}</label>
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
                                            <label className="text-sm font-bold text-stone-700">{t('email')}</label>
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
                                                <label className="text-sm font-bold text-stone-700">{t('profession')}</label>
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
                                                <label className="text-sm font-bold text-stone-700">{t('age')}</label>
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
                                            <label className="text-sm font-bold text-stone-700">{t('city')}</label>
                                            <select
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                            >
                                                <option value="">{t('city_placeholder')}</option>
                                                {saudiCities.map((city) => (
                                                    <option key={city.en} value={locale === 'ar' ? city.ar : city.en}>
                                                        {locale === 'ar' ? city.ar : city.en}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="w-full bg-brand hover:bg-brand/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand/20 transition-all flex items-center justify-center gap-2 mt-4"
                                        >
                                            {t('next_btn')}
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
                                            <label className="text-sm font-bold text-stone-700">{t('investment_source')}</label>
                                            <select
                                                name="investmentSource"
                                                value={formData.investmentSource}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                            >
                                                <option value="">{t('investment_placeholder')}</option>
                                                <option value="مدخرات شخصية">{t('inv_personal')}</option>
                                                <option value="استثمارات تجارية">{t('inv_business')}</option>
                                                <option value="تمويل بنكي">{t('inv_bank')}</option>
                                                <option value="أخرى:">{t('inv_other')}</option>
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-stone-700">{t('company_name')}</label>
                                                <input
                                                    type="text"
                                                    name="companyName"
                                                    value={formData.companyName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-stone-700">{t('company_activity')}</label>
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
                                            <label className="text-sm font-bold text-stone-700">{t('location_link')}</label>
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
                                                <label className="text-sm font-bold text-stone-700">{t('experience')}</label>
                                                <select
                                                    name="experience"
                                                    value={formData.experience}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                                >
                                                    <option value="">{t('exp_placeholder')}</option>
                                                    <option value="مالك مطعم">{t('exp_owner')}</option>
                                                    <option value="ممنوح فرانشايز">{t('exp_franchisee')}</option>
                                                    <option value="مانح فرانشايز">{t('exp_franchisor')}</option>
                                                    <option value="عملت كموظف">{t('exp_employee')}</option>
                                                    <option value="أخرى:">{t('exp_other')}</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-stone-700">{t('readiness')}</label>
                                                <select
                                                    name="readiness"
                                                    value={formData.readiness}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                                >
                                                    <option value="">{t('read_placeholder')}</option>
                                                    <option value="في الحال">{t('read_now')}</option>
                                                    <option value="٣ أشهر الى ٦ أشهر">{t('read_3_6')}</option>
                                                    <option value="٦ أشهر الى سنة">{t('read_6_12')}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-stone-700">{t('additional_info')}</label>
                                                <textarea
                                                    name="additionalInfo"
                                                    value={formData.additionalInfo}
                                                    onChange={handleInputChange}
                                                    rows="2"
                                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none resize-none"
                                                ></textarea>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-stone-700">{t('questions')}</label>
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
                                                {t('prev_btn')}
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={formStatus === "submitting"}
                                                className="w-2/3 bg-brand hover:bg-brand/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {formStatus === "submitting" ? t('submitting_btn') : t('submit_btn')}
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
