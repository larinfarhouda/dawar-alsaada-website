"use client";

import { useState } from 'react';
import { createBranch, deleteBranch, updateBranch } from '@/app/actions/branches';
import { Plus, Trash2, Edit2, X, MapPin, Phone, Navigation } from 'lucide-react';

export default function BranchesManager({ initialBranches, initialCities }) {
    const [branches, setBranches] = useState(initialBranches);
    const [cities] = useState(initialCities);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBranch, setEditingBranch] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);

        let result;
        if (editingBranch) {
            result = await updateBranch(editingBranch.id, formData);
        } else {
            result = await createBranch(formData);
        }

        if (result.success) {
            setIsModalOpen(false);
            setEditingBranch(null);
            window.location.reload();
        } else {
            alert("Error saving branch");
        }
        setIsLoading(false);
    }

    async function handleDelete(id) {
        if (!confirm("هل أنت متأكد من الحذف؟")) return;

        const result = await deleteBranch(id);
        if (result.success) {
            window.location.reload();
        } else {
            alert("Error deleting branch");
        }
    }

    function openEdit(branch) {
        setEditingBranch(branch);
        setIsModalOpen(true);
    }

    function openNew() {
        setEditingBranch(null);
        setIsModalOpen(true);
    }


    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-stone-900">إدارة الفروع</h2>
                <button
                    onClick={openNew}
                    className="bg-brand text-white px-6 py-3 rounded-xl font-bold hover:bg-brand/90 transition-all flex items-center gap-2 shadow-lg shadow-brand/20"
                >
                    <Plus size={20} />
                    <span>إضافة فرع</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {branches.map((branch) => (
                    <div key={branch.id} className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-stone-100 p-3 rounded-xl text-brand">
                                <MapPin size={24} />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEdit(branch)}
                                    className="p-2 text-stone-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-colors"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(branch.id)}
                                    className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-stone-900 mb-1">{branch.name_ar}</h3>
                        <p className="text-stone-500 text-sm ltr mb-2">{branch.name_en}</p>

                        <span className="inline-block bg-stone-100 text-stone-600 text-xs font-bold px-2 py-1 rounded-lg mb-4">
                            {branch.city_ar} / {branch.city_en}
                        </span>

                        <div className="space-y-3 text-stone-500 text-sm">
                            <p className="flex items-start gap-2">
                                <MapPin size={16} className="mt-1 shrink-0" />
                                <span>{branch.address_ar}</span>
                            </p>
                            <p className="flex items-start gap-2 ltr">
                                <MapPin size={16} className="mt-1 shrink-0" />
                                <span>{branch.address_en}</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <Phone size={16} />
                                <span dir="ltr">{branch.phone}</span>
                            </p>
                            <a href={branch.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand hover:underline">
                                <Navigation size={16} />
                                <span>الموقع على الخريطة</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-stone-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-bold text-stone-900">
                                {editingBranch ? 'تعديل فرع' : 'إضافة فرع جديد'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">المدينة (عربي)</label>
                                    <select
                                        name="city_ar"
                                        defaultValue={editingBranch?.city_ar || (cities.length > 0 ? cities[0].name_ar : "")}
                                        className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                    >
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.name_ar}>
                                                {city.name_ar}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">City (English)</label>
                                    <select
                                        name="city_en"
                                        defaultValue={editingBranch?.city_en || (cities.length > 0 ? cities[0].name_en : "")}
                                        className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                        dir="ltr"
                                    >
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.name_en}>
                                                {city.name_en}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">اسم الفرع (عربي)</label>
                                    <input
                                        name="name_ar"
                                        defaultValue={editingBranch?.name_ar}
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">Branch Name (English)</label>
                                    <input
                                        name="name_en"
                                        defaultValue={editingBranch?.name_en}
                                        className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">العنوان (عربي)</label>
                                    <input
                                        name="address_ar"
                                        defaultValue={editingBranch?.address_ar}
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">Address (English)</label>
                                    <input
                                        name="address_en"
                                        defaultValue={editingBranch?.address_en}
                                        className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">رقم الهاتف</label>
                                <input
                                    name="phone"
                                    defaultValue={editingBranch?.phone}
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">رابط الخريطة (Google Maps)</label>
                                <input
                                    name="link"
                                    defaultValue={editingBranch?.link}
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-brand text-white font-bold py-3 rounded-xl hover:bg-brand/90 transition-all disabled:opacity-70"
                                >
                                    {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
