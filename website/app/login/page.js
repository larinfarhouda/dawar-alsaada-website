"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simple authentication - in production, use proper auth
        if (username === 'admin' && password === 'admin123') {
            // Store auth token (in production, use proper session management)
            localStorage.setItem('isAuthenticated', 'true');
            router.push('/dashboard');
        } else {
            setError('اسم المستخدم أو كلمة المرور غير صحيحة');
        }

        setIsLoading(false);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-brand flex items-center justify-center p-4" dir="rtl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-block bg-white p-6 rounded-3xl shadow-2xl mb-6">
                        <h1 className="text-4xl font-bold text-brand">دوار السعادة</h1>
                    </div>
                    <h2 className="text-white text-2xl font-bold mb-2">لوحة التحكم</h2>
                    <p className="text-stone-300">قم بتسجيل الدخول للوصول إلى لوحة التحكم</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-stone-700">اسم المستخدم</label>
                            <div className="relative">
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full pr-12 pl-4 py-3 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                                    placeholder="أدخل اسم المستخدم"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-stone-700">كلمة المرور</label>
                            <div className="relative">
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pr-12 pl-4 py-3 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                                    placeholder="أدخل كلمة المرور"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-brand to-amber-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand/30 hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <span>{isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}</span>
                            <ArrowLeft size={20} className="rotate-180" />
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-stone-100 text-center">
                        <p className="text-stone-500 text-sm">
                            بيانات تجريبية: <span className="font-mono text-stone-700">admin / admin123</span>
                        </p>
                    </div>
                </div>

                {/* Back to Website */}
                <div className="text-center mt-6">
                    <a href="/" className="text-white hover:text-brand transition-colors inline-flex items-center gap-2 font-medium">
                        <ArrowLeft size={18} />
                        <span>العودة إلى الموقع</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
