"use client";

import { useState } from 'react';
import { createMenuItem, deleteMenuItem, updateMenuItem } from '@/app/actions/menu';
import { Plus, Trash2, Edit2, X, Star, Image as ImageIcon } from 'lucide-react';

export default function MenuManager({ initialItems, categories }) {
    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Optimistic update could be added here, but for simplicity we'll rely on revalidation or manual state update
    // Since we are passing initialItems, we should probably just rely on the server action revalidating the page
    // and the page re-rendering with new data. But since this is a client component receiving props, 
    // we might need to refresh the router or just update local state.
    // Updating local state is faster.

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);

        let result;
        if (editingItem) {
            result = await updateMenuItem(editingItem.id, formData);
        } else {
            result = await createMenuItem(formData);
        }

        if (result.success) {
            setIsModalOpen(false);
            setEditingItem(null);
            // Refresh the page to get new data
            window.location.reload();
        } else {
            alert("Error saving item");
        }
        setIsLoading(false);
    }

    async function handleDelete(id) {
        if (!confirm("هل أنت متأكد من الحذف؟")) return;

        const result = await deleteMenuItem(id);
        if (result.success) {
            window.location.reload();
        } else {
            alert("Error deleting item");
        }
    }

    function openEdit(item) {
        setEditingItem(item);
        setIsModalOpen(true);
    }

    function openNew() {
        setEditingItem(null);
        setIsModalOpen(true);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-stone-900">إدارة القائمة</h2>
                <button
                    onClick={openNew}
                    className="bg-brand text-white px-6 py-3 rounded-xl font-bold hover:bg-brand/90 transition-all flex items-center gap-2 shadow-lg shadow-brand/20"
                >
                    <Plus size={20} />
                    <span>إضافة عنصر</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 group hover:shadow-md transition-all">
                        <div className="h-48 overflow-hidden relative bg-stone-100">
                            {item.image ? (
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-stone-300">
                                    <ImageIcon size={40} />
                                </div>
                            )}
                            {item.popular && (
                                <div className="absolute top-4 right-4 bg-brand text-white text-xs font-bold px-3 py-1 rounded-full">
                                    الأكثر طلباً
                                </div>
                            )}
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-stone-900">{item.name}</h3>
                                <div className="flex items-center gap-1 text-amber-400 font-bold text-sm bg-amber-50 px-2 py-1 rounded-lg">
                                    <Star size={14} className="fill-amber-400" />
                                    <span>{item.rating}</span>
                                </div>
                            </div>

                            {item.category && (
                                <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded-md mb-2 inline-block">
                                    {item.category.name}
                                </span>
                            )}

                            <p className="text-stone-500 text-sm mb-4 line-clamp-2 h-10">{item.description}</p>

                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-stone-100">
                                <span className="font-bold text-lg text-brand">{item.price}</span>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openEdit(item)}
                                        className="p-2 text-stone-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-colors"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-stone-900">
                                {editingItem ? 'تعديل عنصر' : 'إضافة عنصر جديد'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">اسم الطبق</label>
                                <input
                                    name="name"
                                    defaultValue={editingItem?.name}
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">التصنيف</label>
                                <select
                                    name="categoryId"
                                    defaultValue={editingItem?.categoryId || ""}
                                    className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                >
                                    <option value="">اختر تصنيف</option>
                                    {categories?.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">الوصف</label>
                                <textarea
                                    name="description"
                                    defaultValue={editingItem?.description}
                                    required
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">السعر</label>
                                    <input
                                        name="price"
                                        defaultValue={editingItem?.price}
                                        required
                                        placeholder="٢٢ ر.س"
                                        className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">التقييم</label>
                                    <input
                                        name="rating"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        defaultValue={editingItem?.rating || 5.0}
                                        className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">رابط الصورة</label>
                                <input
                                    name="image"
                                    defaultValue={editingItem?.image}
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="popular"
                                    id="popular"
                                    defaultChecked={editingItem?.popular}
                                    className="w-5 h-5 rounded text-brand focus:ring-brand"
                                />
                                <label htmlFor="popular" className="text-sm font-medium text-stone-700">منتج أكثر طلباً (Popular)</label>
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
