"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createCity, deleteCity, updateCity } from '@/app/actions/cities';
import { Plus, Trash2, Edit2, X, MapPin } from 'lucide-react';

export default function CitiesManager({ initialCities }) {
    const [cities, setCities] = useState(initialCities);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCity, setEditingCity] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setCities(initialCities);
    }, [initialCities]);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);

        let result;
        if (editingCity) {
            result = await updateCity(editingCity.id, formData);
        } else {
            result = await createCity(formData);
        }

        if (result.success) {
            setIsModalOpen(false);
            setEditingCity(null);
            router.refresh();
        } else {
            alert(result.error || "Error saving city");
        }
        setIsLoading(false);
    }

    async function handleDelete(id) {
        if (!confirm("هل أنت متأكد من الحذف؟")) return;

        const result = await deleteCity(id);
        if (result.success) {
            router.refresh();
        } else {
            alert(result.error || "Error deleting city");
        }
    }

    function openEdit(city) {
        setEditingCity(city);
        setIsModalOpen(true);
    }

    function openNew() {
        setEditingCity(null);
        setIsModalOpen(true);
    }


    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-stone-900">إدارة المدن</h2>
                <button
                    onClick={openNew}
                    className="bg-brand text-white px-6 py-3 rounded-xl font-bold hover:bg-brand/90 transition-all flex items-center gap-2 shadow-lg shadow-brand/20"
                >
                    <Plus size={20} />
                    <span>إضافة مدينة</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cities.map((city) => (
                    <div key={city.id} className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-all">
                        <div className="flex justify-between items-center mb-4">
                            <div className="bg-stone-100 p-3 rounded-xl text-brand">
                                <MapPin size={24} />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEdit(city)}
                                    className="p-2 text-stone-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-colors"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(city.id)}
                                    className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-stone-900 mb-1">{city.name_ar}</h3>
                        <p className="text-stone-500 text-sm ltr">{city.name_en}</p>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-stone-900">
                                {editingCity ? 'تعديل مدينة' : 'إضافة مدينة جديدة'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">اسم المدينة (عربي)</label>
                                <input
                                    name="name_ar"
                                    defaultValue={editingCity?.name_ar}
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">City Name (English)</label>
                                <input
                                    name="name_en"
                                    defaultValue={editingCity?.name_en}
                                    className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                    dir="ltr"
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
