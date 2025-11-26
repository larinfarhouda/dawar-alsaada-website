"use client";

import { useState, useMemo } from 'react';
import { updateApplicationStatus, deleteApplication } from '@/app/actions/applications';
import { FileText, Phone, Mail, User, Clock, CheckCircle, XCircle, AlertCircle, Download, Search, Filter, Trash2, ArrowUpDown } from 'lucide-react';

export default function ApplicationsList({ initialApplications }) {
    const [applications, setApplications] = useState(initialApplications);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date-desc');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    async function handleStatusChange(id, newStatus) {
        const result = await updateApplicationStatus(id, newStatus);
        if (result.success) {
            setApplications(prev =>
                prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
            );
        } else {
            alert("Error updating status");
        }
    }

    async function handleDelete(id) {
        if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;

        const result = await deleteApplication(id);
        if (result.success) {
            setApplications(prev => prev.filter(app => app.id !== id));
        } else {
            alert("Error deleting application");
        }
    }

    // Format date to Gregorian
    const formatGregorianDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Filter and sort applications
    const filteredAndSortedApplications = useMemo(() => {
        let filtered = applications;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(app =>
                app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.phone.includes(searchTerm) ||
                app.position.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(app => app.status === statusFilter);
        }

        // Date range filter
        if (dateFrom) {
            filtered = filtered.filter(app => new Date(app.createdAt) >= new Date(dateFrom));
        }
        if (dateTo) {
            const endDate = new Date(dateTo);
            endDate.setHours(23, 59, 59, 999);
            filtered = filtered.filter(app => new Date(app.createdAt) <= endDate);
        }

        // Sorting
        const sorted = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'date-desc':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'date-asc':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'name-asc':
                    return a.name.localeCompare(b.name, 'ar');
                case 'name-desc':
                    return b.name.localeCompare(a.name, 'ar');
                case 'position-asc':
                    return a.position.localeCompare(b.position, 'ar');
                case 'position-desc':
                    return b.position.localeCompare(a.position, 'ar');
                default:
                    return 0;
            }
        });

        return sorted;
    }, [applications, searchTerm, statusFilter, sortBy, dateFrom, dateTo]);

    const statusColors = {
        'New': 'bg-blue-100 text-blue-700',
        'Reviewed': 'bg-yellow-100 text-yellow-700',
        'Contacted': 'bg-purple-100 text-purple-700',
        'Rejected': 'bg-red-100 text-red-700',
        'Hired': 'bg-green-100 text-green-700',
    };

    const statusLabels = {
        'New': 'جديد',
        'Reviewed': 'تمت المراجعة',
        'Contacted': 'تم التواصل',
        'Rejected': 'مرفوض',
        'Hired': 'تم التوظيف',
    };

    return (
        <div className="space-y-6" dir="rtl">
            <h2 className="text-3xl font-bold text-stone-900">طلبات التوظيف</h2>

            {/* Search and Filter Controls */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
                {/* Top Row: Search and Sort */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={18} />
                        <input
                            type="text"
                            placeholder="بحث (الاسم، البريد، الهاتف، الوظيفة)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pr-12 pl-4 py-3 border border-stone-300 rounded-xl outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-right bg-white"
                        />
                    </div>

                    {/* Sort */}
                    <div className="relative">
                        <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={18} />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full pr-12 pl-4 py-3 border border-stone-300 rounded-xl outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all appearance-none bg-white cursor-pointer text-right"
                        >
                            <option value="date-desc">الأحدث أولاً</option>
                            <option value="date-asc">الأقدم أولاً</option>
                            <option value="name-asc">الاسم (أ-ي)</option>
                            <option value="name-desc">الاسم (ي-أ)</option>
                            <option value="position-asc">الوظيفة (أ-ي)</option>
                            <option value="position-desc">الوظيفة (ي-أ)</option>
                        </select>
                    </div>
                </div>

                {/* Bottom Row: Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={18} />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full pr-12 pl-4 py-3 border border-stone-300 rounded-xl outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all appearance-none bg-white cursor-pointer text-right"
                        >
                            <option value="all">جميع الحالات</option>
                            <option value="New">جديد</option>
                            <option value="Reviewed">تمت المراجعة</option>
                            <option value="Contacted">تم التواصل</option>
                            <option value="Hired">تم التوظيف</option>
                            <option value="Rejected">مرفوض</option>
                        </select>
                    </div>

                    {/* Date Range */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <div className="flex gap-2">
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                placeholder="من تاريخ"
                                className="flex-1 px-4 py-3 border border-stone-300 rounded-xl outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                            />
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                placeholder="إلى تاريخ"
                                className="flex-1 px-4 py-3 border border-stone-300 rounded-xl outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Results count */}
                <div className="mt-5 pt-5 border-t border-stone-200 text-sm text-stone-600 font-medium">
                    عرض <span className="font-bold text-brand">{filteredAndSortedApplications.length}</span> من أصل <span className="font-bold">{applications.length}</span> طلب
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-stone-50 border-b-2 border-stone-200">
                            <tr>
                                <th className="px-6 py-4 text-right font-bold text-stone-700 text-sm">المتقدم</th>
                                <th className="px-6 py-4 text-right font-bold text-stone-700 text-sm">الوظيفة</th>
                                <th className="px-6 py-4 text-right font-bold text-stone-700 text-sm">معلومات الاتصال</th>
                                <th className="px-6 py-4 text-right font-bold text-stone-700 text-sm">السيرة الذاتية</th>
                                <th className="px-6 py-4 text-right font-bold text-stone-700 text-sm">تاريخ التقديم</th>
                                <th className="px-6 py-4 text-right font-bold text-stone-700 text-sm">الحالة</th>
                                <th className="px-6 py-4 text-right font-bold text-stone-700 text-sm">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {filteredAndSortedApplications.map((app) => (
                                <tr key={app.id} className="hover:bg-stone-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-brand/10 p-2.5 rounded-xl text-brand flex-shrink-0">
                                                <User size={18} />
                                            </div>
                                            <span className="font-semibold text-stone-900 text-sm">{app.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-stone-700 text-sm">{app.position}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1.5 text-xs text-stone-600">
                                            <div className="flex items-center gap-2">
                                                <Phone size={14} className="text-stone-400 flex-shrink-0" />
                                                <span dir="ltr" className="font-medium">{app.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail size={14} className="text-stone-400 flex-shrink-0" />
                                                <span className="truncate max-w-[200px]" title={app.email}>{app.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {app.cvUrl ? (
                                            <a
                                                href={app.cvUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-brand hover:text-brand/80 transition-colors"
                                            >
                                                <Download size={15} />
                                                <span className="text-xs font-medium">تحميل</span>
                                            </a>
                                        ) : (
                                            <span className="text-stone-400 text-xs">لا يوجد</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-stone-500 text-xs font-mono" dir="ltr">
                                            {formatGregorianDateTime(app.createdAt)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${statusColors[app.status] || 'bg-gray-100 text-gray-700'}`}>
                                            {statusLabels[app.status] || app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={app.status}
                                                onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                                className="bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all cursor-pointer"
                                            >
                                                <option value="New">جديد</option>
                                                <option value="Reviewed">تمت المراجعة</option>
                                                <option value="Contacted">تم التواصل</option>
                                                <option value="Hired">تم التوظيف</option>
                                                <option value="Rejected">مرفوض</option>
                                            </select>
                                            <button
                                                onClick={() => handleDelete(app.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                                title="حذف"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredAndSortedApplications.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="bg-stone-100 p-4 rounded-full">
                                                <Search className="text-stone-400" size={32} />
                                            </div>
                                            <p className="text-stone-500 font-medium">
                                                {searchTerm || statusFilter !== 'all' || dateFrom || dateTo
                                                    ? 'لا توجد نتائج تطابق البحث'
                                                    : 'لا توجد طلبات توظيف حالياً'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
