"use client";

import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer id="contact" className="bg-stone-900 text-stone-300 py-16">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-right">

                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="w-24 h-24 mb-4 ml-auto md:ml-0">
                            <img src="/logo.png" alt="Dawar Al Saada Logo" className="object-contain w-full h-full" />
                        </div>
                        <p className="text-stone-400 leading-relaxed mb-6">
                            اللي يحبه قلبك.. من زان فطوره زانت اموره.
                        </p>
                        <div className="flex gap-4 justify-end md:justify-start">
                            <a href="#" className="bg-stone-800 p-2 rounded-full hover:bg-brand hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="bg-stone-800 p-2 rounded-full hover:bg-brand hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="bg-stone-800 p-2 rounded-full hover:bg-brand hover:text-white transition-colors"><Facebook size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6">روابط سريعة</h4>
                        <ul className="space-y-3">
                            <li><a href="#hero" className="hover:text-brand transition-colors">الرئيسية</a></li>
                            <li><a href="#about" className="hover:text-brand transition-colors">من نحن</a></li>
                            <li><a href="#menu" className="hover:text-brand transition-colors">قائمة الطعام</a></li>
                            <li><a href="#branches" className="hover:text-brand transition-colors">الفروع</a></li>
                            <li><a href="#franchise" className="hover:text-brand transition-colors">الامتياز التجاري</a></li>
                            <li><a href="#careers" className="hover:text-brand transition-colors">وظائف</a></li>
                            <li><a href="#contact" className="hover:text-brand transition-colors">تواصل معنا</a></li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6">ساعات السعادة</h4>
                        <ul className="space-y-3">
                            <li className="flex justify-between">
                                <span>يومياً</span>
                                <span className="text-white">من ٤:٠٠ فجراً</span>
                            </li>
                            <li className="flex justify-between">
                                <span>خدمة العملاء</span>
                                <span className="text-white">٨:٠٠ ص - ٥:٠٠ م</span>
                            </li>
                        </ul>
                    </div>
                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6">تواصل معنا</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 justify-end md:justify-start">
                                <span className="text-right">الرياض، المملكة العربية السعودية</span>
                                <MapPin className="text-brand mt-1 shrink-0" size={20} />
                            </li>
                            <li className="flex items-center gap-3 justify-end md:justify-start">
                                <span dir="ltr">+966 50 000 0000</span>
                                <Phone className="text-brand shrink-0" size={20} />
                            </li>
                            <li className="flex items-center gap-3 justify-end md:justify-start">
                                <span>info@dawaralsaada.com</span>
                                <Mail className="text-brand shrink-0" size={20} />
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-stone-800 mt-16 pt-8 text-center text-stone-500 text-sm">
                    <p>© {new Date().getFullYear()} دوار السعاده. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    );
}
