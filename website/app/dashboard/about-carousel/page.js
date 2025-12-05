'use client';

import { useState, useEffect } from 'react';
import { uploadAboutCarouselImage, deleteAboutCarouselImage, getAboutCarouselImages } from '@/app/actions/about-carousel';
import { X, Trash2 } from 'lucide-react';

export default function AboutCarouselPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [viewingImage, setViewingImage] = useState(null);

    useEffect(() => {
        loadImages();
    }, []);

    async function loadImages() {
        setLoading(true);
        const result = await getAboutCarouselImages();
        if (result.success) {
            setImages(result.data);
        }
        setLoading(false);
    }

    async function handleUpload(e) {
        e.preventDefault();
        setUploading(true);
        setMessage({ type: '', text: '' });

        const formData = new FormData(e.target);

        const result = await uploadAboutCarouselImage(formData);

        if (result.success) {
            setMessage({ type: 'success', text: 'تم رفع الصورة بنجاح' });
            e.target.reset();
            loadImages();
        } else {
            setMessage({ type: 'error', text: result.error || 'حدث خطأ أثناء رفع الصورة' });
        }

        setUploading(false);
    }

    async function handleDelete(id) {
        if (!confirm('هل أنت متأكد من حذف هذه الصورة؟')) return;

        const result = await deleteAboutCarouselImage(id);
        if (result.success) {
            setMessage({ type: 'success', text: 'تم حذف الصورة بنجاح' });
            loadImages();
        } else {
            setMessage({ type: 'error', text: result.error || 'حدث خطأ أثناء حذف الصورة' });
        }
    }

    function openImageViewer(image) {
        setViewingImage(image);
    }

    function closeImageViewer() {
        setViewingImage(null);
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-stone-800 mb-6">إدارة صور "عن دوار السعادة"</h1>

            {/* Message */}
            {message.text && (
                <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message.text}
                </div>
            )}

            {/* Upload Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold text-stone-800 mb-4">رفع صورة جديدة</h2>
                <form onSubmit={handleUpload} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                            اختر صورة
                        </label>
                        <input
                            type="file"
                            name="file"
                            accept="image/*"
                            required
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                        />
                        <p className="text-sm text-stone-500 mt-1">
                            الصيغ المدعومة: JPG, PNG, WebP
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full bg-brand text-white px-6 py-3 rounded-lg font-bold hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? 'جاري الرفع...' : 'رفع الصورة'}
                    </button>
                </form>
            </div>

            {/* Images List */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-stone-800 mb-4">الصور المرفوعة</h2>

                {loading ? (
                    <p className="text-center text-stone-500 py-8">جاري التحميل...</p>
                ) : images.length === 0 ? (
                    <p className="text-center text-stone-500 py-8">لا توجد صور مرفوعة</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((item) => (
                            <div
                                key={item.id}
                                className="relative border-2 border-stone-200 rounded-lg overflow-hidden group"
                            >
                                {/* Image Preview */}
                                <div
                                    className="aspect-square bg-stone-100 relative cursor-pointer"
                                    onClick={() => openImageViewer(item)}
                                >
                                    <img
                                        src={item.image}
                                        alt="About carousel"
                                        className="w-full h-full object-cover"
                                    />

                                    {/* View indicator */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                                        <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-bold">
                                            اضغط للعرض
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(item.id);
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-md opacity-0 group-hover:opacity-100"
                                    title="حذف"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Image Viewer Modal */}
            {viewingImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={closeImageViewer}
                >
                    <button
                        onClick={closeImageViewer}
                        className="absolute top-4 right-4 text-white hover:text-brand transition-colors"
                    >
                        <X size={32} />
                    </button>

                    <div
                        className="max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={viewingImage.image}
                            alt="About carousel"
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
