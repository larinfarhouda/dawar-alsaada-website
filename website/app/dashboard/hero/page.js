'use client';

import { useState, useEffect } from 'react';
import { uploadHeroMedia, deleteHeroMedia, setActiveHeroMedia, getHeroMedia } from '@/app/actions/hero';
import { X } from 'lucide-react';

export default function HeroMediaPage() {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [viewingMedia, setViewingMedia] = useState(null);

    useEffect(() => {
        loadMedia();
    }, []);

    async function loadMedia() {
        setLoading(true);
        const result = await getHeroMedia();
        if (result.success) {
            setMedia(result.data);
        }
        setLoading(false);
    }

    async function handleUpload(e) {
        e.preventDefault();
        setUploading(true);
        setMessage({ type: '', text: '' });

        const formData = new FormData(e.target);
        const file = formData.get('file');

        // Auto-detect file type
        if (file) {
            const fileType = file.type.startsWith('video/') ? 'video' : 'image';
            formData.set('type', fileType);
        }

        const result = await uploadHeroMedia(formData);

        if (result.success) {
            setMessage({ type: 'success', text: 'تم رفع الملف بنجاح' });
            e.target.reset();
            loadMedia();
        } else {
            setMessage({ type: 'error', text: result.error || 'حدث خطأ أثناء رفع الملف' });
        }

        setUploading(false);
    }

    async function handleDelete(id) {
        if (!confirm('هل أنت متأكد من حذف هذا الملف؟')) return;

        const result = await deleteHeroMedia(id);
        if (result.success) {
            setMessage({ type: 'success', text: 'تم حذف الملف بنجاح' });
            loadMedia();
        } else {
            setMessage({ type: 'error', text: result.error || 'حدث خطأ أثناء حذف الملف' });
        }
    }

    async function handleSetActive(id) {
        const result = await setActiveHeroMedia(id);
        if (result.success) {
            setMessage({ type: 'success', text: 'تم تفعيل الملف بنجاح' });
            loadMedia();
        } else {
            setMessage({ type: 'error', text: result.error || 'حدث خطأ أثناء تفعيل الملف' });
        }
    }

    function openMediaViewer(item) {
        setViewingMedia(item);
    }

    function closeMediaViewer() {
        setViewingMedia(null);
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-stone-800 mb-6">إدارة خلفية الصفحة الرئيسية</h1>

            {/* Message */}
            {message.text && (
                <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message.text}
                </div>
            )}

            {/* Upload Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold text-stone-800 mb-4">رفع صورة أو فيديو جديد</h2>
                <form onSubmit={handleUpload} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                            اختر ملف (صورة أو فيديو)
                        </label>
                        <input
                            type="file"
                            name="file"
                            accept="image/*,video/*"
                            required
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                        />
                        <p className="text-sm text-stone-500 mt-1">
                            الصيغ المدعومة: JPG, PNG, WebP, MP4, WebM - سيتم اكتشاف نوع الملف تلقائياً
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full bg-brand text-white px-6 py-3 rounded-lg font-bold hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? 'جاري الرفع...' : 'رفع الملف'}
                    </button>
                </form>
            </div>

            {/* Media List */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-stone-800 mb-4">الملفات المرفوعة</h2>

                {loading ? (
                    <p className="text-center text-stone-500 py-8">جاري التحميل...</p>
                ) : media.length === 0 ? (
                    <p className="text-center text-stone-500 py-8">لا توجد ملفات مرفوعة</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {media.map((item) => (
                            <div
                                key={item.id}
                                className={`relative border-2 rounded-lg overflow-hidden ${item.isActive ? 'border-green-500' : 'border-stone-200'
                                    }`}
                            >
                                {/* Media Preview */}
                                <div
                                    className="aspect-video bg-stone-100 relative cursor-pointer hover:opacity-90 transition-opacity"
                                    onClick={() => openMediaViewer(item)}
                                >
                                    {item.type === 'video' ? (
                                        <video
                                            src={item.url}
                                            className="w-full h-full object-cover"
                                            muted
                                            loop
                                            playsInline
                                        />
                                    ) : (
                                        <img
                                            src={item.url}
                                            alt="Hero media"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    {item.isActive && (
                                        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                            نشط
                                        </div>
                                    )}
                                    {/* View indicator */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors">
                                        <span className="text-white opacity-0 hover:opacity-100 text-sm font-bold">
                                            اضغط للعرض
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="p-4 space-y-2">
                                    <div className="text-sm text-stone-600">
                                        النوع: {item.type === 'video' ? 'فيديو' : 'صورة'}
                                    </div>
                                    <div className="flex gap-2">
                                        {!item.isActive && (
                                            <button
                                                onClick={() => handleSetActive(item.id)}
                                                className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-bold"
                                            >
                                                تفعيل
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-bold"
                                        >
                                            حذف
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Media Viewer Modal */}
            {viewingMedia && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={closeMediaViewer}
                >
                    <button
                        onClick={closeMediaViewer}
                        className="absolute top-4 right-4 text-white hover:text-brand transition-colors"
                    >
                        <X size={32} />
                    </button>

                    <div
                        className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {viewingMedia.type === 'video' ? (
                            <video
                                src={viewingMedia.url}
                                controls
                                autoPlay
                                loop
                                className="max-w-full max-h-full object-contain"
                            />
                        ) : (
                            <img
                                src={viewingMedia.url}
                                alt="Hero media"
                                className="max-w-full max-h-full object-contain"
                            />
                        )}
                    </div>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
                        <p className="text-sm">
                            {viewingMedia.type === 'video' ? 'فيديو' : 'صورة'} -
                            {viewingMedia.isActive ? ' نشط' : ' غير نشط'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
