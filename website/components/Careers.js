"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Send, CheckCircle, Briefcase } from "lucide-react";
import { createApplication } from "@/app/actions/applications";
import { saudiCities } from "@/lib/saudiCities";
import { useTranslations, useLocale } from 'next-intl';

export default function Careers() {
    const t = useTranslations('Careers');
    const locale = useLocale();
    const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert(t('file_size_error'));
                e.target.value = "";
                setSelectedFile(null);
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus("submitting");
        setErrorMessage("");

        const formData = new FormData(e.target);

        const result = await createApplication(formData);

        if (result.success) {
            setFormStatus("success");
            setSelectedFile(null);
        } else {
            setFormStatus("error");
            setErrorMessage(result.error || t('something_went_wrong'));
        }
    };

    const resetForm = () => {
        setFormStatus("idle");
        setErrorMessage("");
        setSelectedFile(null);
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
                        <h2 className="text-brand font-bold text-lg tracking-wide">{t('badge')}</h2>
                    </motion.div>
                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        {t('title_part1')} <span className="text-brand">{t('title_part2')}</span> {t('title_part3')}
                    </h3>
                    <p className="text-stone-400 mt-4 max-w-2xl mx-auto text-lg">
                        {t('description')}
                    </p>
                </div>

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row gap-12 items-stretch">
                        {/* Image/Info Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="md:w-1/2 w-full"
                        >
                            <div className="bg-stone-100 rounded-3xl p-8 md:p-12 relative overflow-hidden h-full">
                                <div className="relative z-10">
                                    <h4 className="text-2xl font-bold text-stone-800 mb-6">{t('why_us_title')}</h4>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3">
                                            <div className="bg-brand/10 p-2 rounded-full text-brand">
                                                <CheckCircle size={20} />
                                            </div>
                                            <span className="text-stone-700">{t('feature_1')}</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="bg-brand/10 p-2 rounded-full text-brand">
                                                <CheckCircle size={20} />
                                            </div>
                                            <span className="text-stone-700">{t('feature_2')}</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="bg-brand/10 p-2 rounded-full text-brand">
                                                <CheckCircle size={20} />
                                            </div>
                                            <span className="text-stone-700">{t('feature_3')}</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="bg-brand/10 p-2 rounded-full text-brand">
                                                <CheckCircle size={20} />
                                            </div>
                                            <span className="text-stone-700">{t('feature_4')}</span>
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
                                    <h4 className="text-2xl font-bold text-stone-800 mb-2">{t('success_title')}</h4>
                                    <p className="text-stone-600">{t('success_msg')}</p>
                                    <button
                                        onClick={resetForm}
                                        className="mt-8 text-brand font-bold hover:underline"
                                    >
                                        {t('another_request_btn')}
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {formStatus === "error" && (
                                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-stone-700 font-medium">{t('form_name')}</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                                                placeholder={t('form_name_placeholder')}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="text-stone-700 font-medium">{t('form_phone')}</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                required
                                                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                                                placeholder="05xxxxxxxx"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="city" className="text-stone-700 font-medium">{t('form_city')}</label>
                                            <select
                                                id="city"
                                                name="city"
                                                required
                                                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all appearance-none"
                                            >
                                                <option value="">{t('city_placeholder')}</option>
                                                {saudiCities.map((city) => (
                                                    <option key={city.en} value={city.ar}>
                                                        {locale === 'en' ? city.en : city.ar}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-stone-700 font-medium">{t('form_email')}</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                                                placeholder="name@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="position" className="text-stone-700 font-medium">{t('form_position')}</label>
                                        <select
                                            id="position"
                                            name="position"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all appearance-none"
                                        >
                                            <option value="">{t('pos_placeholder')}</option>
                                            <option value="chef">{t('pos_chef')}</option>
                                            <option value="waiter">{t('pos_waiter')}</option>
                                            <option value="manager">{t('pos_manager')}</option>
                                            <option value="cashier">{t('pos_cashier')}</option>
                                            <option value="other">{t('pos_other')}</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-stone-700 font-medium">{t('cv_label')}</label>
                                        <label className="border-2 border-dashed border-stone-300 rounded-xl p-8 text-center hover:border-brand hover:bg-brand/5 transition-colors cursor-pointer group block">
                                            <Upload className="mx-auto text-stone-400 group-hover:text-brand mb-2 transition-colors" />
                                            <p className="text-sm text-stone-500 group-hover:text-brand transition-colors">
                                                {selectedFile ? selectedFile.name : t('cv_placeholder')}
                                            </p>
                                            <p className="text-xs text-stone-400 mt-1">PDF, DOCX (Max 5MB)</p>
                                            <input
                                                type="file"
                                                name="cv"
                                                className="hidden"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={formStatus === "submitting"}
                                        className="w-full bg-brand hover:bg-brand/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {formStatus === "submitting" ? (
                                            t('submitting_btn')
                                        ) : (
                                            <>
                                                <span>{t('submit_btn')}</span>
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
        </section>
    );
}
