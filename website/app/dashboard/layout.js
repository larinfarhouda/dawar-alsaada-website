"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Menu, MapPin, FileText, LogOut, Building, Image, Store, Tag, GalleryHorizontal } from 'lucide-react';
import DashboardAuth from './DashboardAuth';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();

    const navItems = [
        { name: 'نظرة عامة', href: '/dashboard', icon: LayoutDashboard },
        { name: 'خلفية الصفحة الرئيسية', href: '/dashboard/hero', icon: Image },
        { name: 'صور "عن دوار السعادة"', href: '/dashboard/about-carousel', icon: GalleryHorizontal },
        { name: 'التصنيفات', href: '/dashboard/categories', icon: Tag },
        { name: 'قائمة الطعام', href: '/dashboard/menu', icon: Menu },
        { name: 'الفروع', href: '/dashboard/branches', icon: MapPin },
        { name: 'المدن', href: '/dashboard/cities', icon: Building },
        { name: 'طلبات التوظيف', href: '/dashboard/applications', icon: FileText },
        { name: 'طلبات الامتياز', href: '/dashboard/franchise', icon: Store },
    ];



    function handleLogout() {
        localStorage.removeItem('isAuthenticated');
        router.push('/login');
    }

    return (
        <DashboardAuth>
            <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row" dir="rtl">
                {/* Sidebar */}
                <aside className="w-full md:w-64 bg-stone-900 text-white flex-shrink-0 flex flex-col h-screen sticky top-0">
                    <div className="p-6 border-b border-stone-800">
                        <h1 className="text-2xl font-bold text-brand">لوحة التحكم</h1>
                        <p className="text-stone-400 text-sm">دوار السعادة</p>
                    </div>

                    <nav className="p-4 space-y-2 flex-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? 'bg-brand text-white font-bold'
                                        : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-stone-800">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-900/20 rounded-xl transition-all"
                        >
                            <LogOut size={20} />
                            <span>تسجيل الخروج</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-8">
                        {children}
                    </div>
                </main>
            </div>
        </DashboardAuth>
    );
}
