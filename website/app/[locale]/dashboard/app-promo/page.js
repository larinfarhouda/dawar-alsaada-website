"use client";

import { useState, useEffect } from "react";
import { getAppPromo, updateAppPromo } from "@/app/actions/app-promo";
import { Save, Loader2, Upload, Smartphone, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function AppPromoPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState(null);
    const [message, setMessage] = useState({ type: "", text: "" });

    async function loadData() {
        setLoading(true);
        const result = await getAppPromo();
        if (result.success) {
            setData(result.data);
        } else {
            setMessage({ type: "error", text: "فشل تحميل البيانات" });
        }
        setLoading(false);
    }

    useEffect(() => {
        // eslint-disable-next-line
        loadData();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: "", text: "" });

        const formData = new FormData(e.target);
        // Append ID manually if not in form (though I'll put it in a hidden input)

        const result = await updateAppPromo(formData);

        if (result.success) {
            setMessage({ type: "success", text: "تم حفظ التغييرات بنجاح" });
            loadData(); // Reload to get new image paths if updated
        } else {
            setMessage({ type: "error", text: "حدث خطأ أثناء الحفظ" });
        }

        setSaving(false);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-brand" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-stone-800">إدارة قسم التطبيق</h1>
            </div>

            {message.text && (
                <div
                    className={`mb-6 p-4 rounded-lg ${message.type === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <input type="hidden" name="id" value={data?.id} />

                {/* Text Content */}
                <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
                    <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                        <span className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center text-brand">
                            T
                        </span>
                        النصوص والمحتوى
                    </h2>


                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Arabic Content */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-stone-600 border-b pb-2">المحتوى العربي</h3>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">
                                    العنوان الرئيسي (بالعربي)
                                </label>
                                <input
                                    type="text"
                                    name="title_ar"
                                    defaultValue={data?.title_ar}
                                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                                    required
                                    dir="rtl"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">
                                    العنوان الفرعي (بالعربي - أصفر)
                                </label>
                                <input
                                    type="text"
                                    name="subtitle_ar"
                                    defaultValue={data?.subtitle_ar}
                                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                                    required
                                    dir="rtl"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">
                                    الوصف (بالعربي)
                                </label>
                                <textarea
                                    name="description_ar"
                                    defaultValue={data?.description_ar}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent resize-none"
                                    required
                                    dir="rtl"
                                />
                            </div>
                        </div>

                        {/* English Content */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-stone-600 border-b pb-2">المحتوى الإنجليزي (English)</h3>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">
                                    Main Title (English)
                                </label>
                                <input
                                    type="text"
                                    name="title_en"
                                    defaultValue={data?.title_en}
                                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                                    dir="ltr"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">
                                    Subtitle (English - Yellow)
                                </label>
                                <input
                                    type="text"
                                    name="subtitle_en"
                                    defaultValue={data?.subtitle_en}
                                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                                    dir="ltr"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">
                                    Description (English)
                                </label>
                                <textarea
                                    name="description_en"
                                    defaultValue={data?.description_en}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent resize-none"
                                    dir="ltr"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Links */}
                <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
                    <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                            🔗
                        </span>
                        الروابط
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1">
                                رابط App Store
                            </label>
                            <input
                                type="text"
                                name="appStoreLink"
                                defaultValue={data?.appStoreLink}
                                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                                dir="ltr"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1">
                                رابط Google Play
                            </label>
                            <input
                                type="text"
                                name="googlePlayLink"
                                defaultValue={data?.googlePlayLink}
                                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                                dir="ltr"
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Phone Image */}
                    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
                        <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                                <Smartphone size={20} />
                            </span>
                            صورة الهاتف
                        </h2>

                        <div className="space-y-4">
                            <div className="aspect-[9/16] bg-stone-100 rounded-lg overflow-hidden relative border-2 border-dashed border-stone-300 flex items-center justify-center">
                                {data?.phoneImage ? (
                                    <Image
                                        src={data.phoneImage}
                                        alt="Phone Preview"
                                        fill
                                        className="object-contain p-4"
                                    />
                                ) : (
                                    <span className="text-stone-400">لا توجد صورة</span>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-2">
                                    تغيير الصورة
                                </label>
                                <input
                                    type="file"
                                    name="phoneImageFile"
                                    accept="image/*"
                                    className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand/10 file:text-brand hover:file:bg-brand/20"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Background Image */}
                    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
                        <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                                <ImageIcon size={20} />
                            </span>
                            صورة الخلفية
                        </h2>

                        <div className="space-y-4">
                            <div className="aspect-video bg-stone-100 rounded-lg overflow-hidden relative border-2 border-dashed border-stone-300 flex items-center justify-center">
                                {data?.backgroundImage ? (
                                    <Image
                                        src={data.backgroundImage}
                                        alt="Background Preview"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <span className="text-stone-400">لا توجد صورة</span>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-2">
                                    تغيير الصورة
                                </label>
                                <input
                                    type="file"
                                    name="backgroundImageFile"
                                    accept="image/*"
                                    className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand/10 file:text-brand hover:file:bg-brand/20"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-brand text-white px-8 py-3 rounded-xl font-bold hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand/20"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                جاري الحفظ...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                حفظ التغييرات
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
