"use client";

import { Instagram, MapPin, Phone, Mail, Linkedin } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');
    const tNav = useTranslations('Navbar');

    return (
        <footer id="contact" className="bg-stone-900 text-stone-300 py-16">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-start">

                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="w-24 h-24 mb-4">
                            <img src="/logo.png" alt="Dawar Al Saada Logo" className="object-contain w-full h-full" />
                        </div>
                        <p className="text-stone-400 leading-relaxed mb-6">
                            {t('slogan')}
                        </p>
                        <div className="flex gap-4 justify-start">
                            <a href="https://www.instagram.com/dawar_sa/" className="bg-stone-800 p-2 rounded-full hover:bg-brand hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="https://x.com/dawar_sa1" className="bg-stone-800 p-2 rounded-full hover:bg-brand hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                </svg>
                            </a>
                            <a href="https://www.tiktok.com/@dawar_sa" className="bg-stone-800 p-2 rounded-full hover:bg-brand hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 22a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.02z" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/company/dawar-al-saadah/" className="bg-stone-800 p-2 rounded-full hover:bg-brand hover:text-white transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6">{t('quick_links')}</h4>
                        <ul className="space-y-3">
                            <li><a href="#hero" className="hover:text-brand transition-colors">{tNav('home')}</a></li>
                            <li><a href="#about" className="hover:text-brand transition-colors">{tNav('about')}</a></li>
                            {/* <li><a href="#menu" className="hover:text-brand transition-colors">قائمة الطعام</a></li> */}
                            <li><a href="#branches" className="hover:text-brand transition-colors">{tNav('branches')}</a></li>
                            <li><a href="#franchise" className="hover:text-brand transition-colors">{tNav('franchise')}</a></li>
                            <li><a href="#careers" className="hover:text-brand transition-colors">{tNav('careers')}</a></li>
                            {/* <li><a href="#contact" className="hover:text-brand transition-colors">{tNav('contact')}</a></li> */}
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6">{t('hours_title')}</h4>
                        <ul className="space-y-3">

                            <li className="flex justify-between">
                                <span>{t('daily')}</span>
                                <span className="text-white">{t('daily_time')}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>{t('customer_service')}</span>
                                <span className="text-white">{t('cs_time')}</span>
                            </li>
                        </ul>
                    </div>
                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6">{t('contact_us')}</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 justify-start">
                                <MapPin className="text-brand mt-1 shrink-0" size={20} />
                                <span>{t('address')}</span>
                            </li>
                            <li className="flex items-center gap-3 justify-start">
                                <Phone className="text-brand shrink-0" size={20} />
                                <span dir="ltr">+966 50 000 0000</span>

                            </li>
                            <li className="flex items-center gap-3 justify-start">
                                <Mail className="text-brand shrink-0" size={20} />
                                <span>info@dawaralsaada.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-stone-800 mt-16 pt-8 text-center text-stone-500 text-sm">
                    <p>{t('copyright', { year: new Date().getFullYear() })}</p>
                </div>
            </div>
        </footer>
    );
}
