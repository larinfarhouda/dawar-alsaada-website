"use client";

import { useState, useMemo } from 'react';
import { updateFranchiseStatus, deleteFranchiseRequest } from '@/app/actions/franchise';
import { Phone, Mail, User, MapPin, DollarSign, Briefcase, Search, Filter, Trash2, ArrowUpDown, Calendar } from 'lucide-react';

export default function FranchiseRequestsList({ initialRequests }) {
    const [requests, setRequests] = useState(initialRequests);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [experienceFilter, setExperienceFilter] = useState('all');
    const [budgetFilter, setBudgetFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date-desc');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    async function handleStatusChange(id, newStatus) {
        const result = await updateFranchiseStatus(id, newStatus);
        if (result.success) {
            setRequests(prev =>
                prev.map(req => req.id === id ? { ...req, status: newStatus } : req)
            );
        } else {
            alert("Error updating status");
        }
    }

    async function handleDelete(id) {
        if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;

        const result = await deleteFranchiseRequest(id);
        if (result.success) {
            setRequests(prev => prev.filter(req => req.id !== id));
        } else {
            alert("Error deleting request");
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

    // Filter and sort requests
    const filteredAndSortedRequests = useMemo(() => {
        let filtered = requests;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(req =>
                req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.phone.includes(searchTerm) ||
                req.city.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(req => req.status === statusFilter);
        }

        // Experience filter
        if (experienceFilter !== 'all') {
            const hasExp = experienceFilter === 'yes';
            filtered = filtered.filter(req => req.hasExperience === hasExp);
        }

        // Budget filter
        if (budgetFilter !== 'all') {
            filtered = filtered.filter(req => req.budget === budgetFilter);
        }

        // Date range filter
        if (dateFrom) {
            filtered = filtered.filter(req => new Date(req.createdAt) >= new Date(dateFrom));
        }
        if (dateTo) {
            const endDate = new Date(dateTo);
            endDate.setHours(23, 59, 59, 999);
            filtered = filtered.filter(req => new Date(req.createdAt) <= endDate);
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
                case 'city-asc':
                    return a.city.localeCompare(b.city, 'ar');
                case 'city-desc':
                    return b.city.localeCompare(a.city, 'ar');
                default:
                    return 0;
            }
        });

        return sorted;
    }, [requests, searchTerm, statusFilter, experienceFilter, budgetFilter, sortBy, dateFrom, dateTo]);

    const statusColors = {
        'New': 'bg-blue-50 text-blue-700 border border-blue-200',
        'Reviewed': 'bg-yellow-50 text-yellow-700 border border-yellow-200',
        'Contacted': 'bg-purple-50 text-purple-700 border border-purple-200',
        'Rejected': 'bg-red-50 text-red-700 border border-red-200',
        'Approved': 'bg-green-50 text-green-700 border border-green-200',
    };

    const statusLabels = {
        'New': 'جديد',
        'Reviewed': 'تمت المراجعة',
        'Contacted': 'تم التواصل',
        'Rejected': 'مرفوض',
        'Approved': 'تمت الموافقة',
    };

    const budgetLabels = {
        '500k-1m': '٥٠٠ ألف - ١ مليون ريال',
        '1m-2m': '١ مليون - ٢ مليون ريال',
        '2m+': 'أكثر من ٢ مليون ريال',
    };

    return (
        <div className="space-y-6 font-sans" dir="rtl">
            <h2 className="text-3xl font-bold text-gray-900">طلبات الامتياز التجاري</h2>

            {/* Search and Filter Container */}
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-5">

                {/* Top Row: Search (Wide) and Sort (Narrow) */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    {/* Sort */}
                    <div className="relative w-full md:w-1/4 lg:w-1/5">
                        <ArrowUpDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full pr-10 pl-4 py-2.5 h-11 border border-gray-200 rounded-lg outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all appearance-none bg-white cursor-pointer text-right text-sm text-gray-700"
                        >
                            <option value="date-desc">الأحدث أولاً</option>
                            <option value="date-asc">الأقدم أولاً</option>
                            <option value="name-asc">الاسم (أ-ي)</option>
                            <option value="name-desc">الاسم (ي-أ)</option>
                        </select>
                    </div>

                    {/* Search - Takes remaining space */}
                    <div className="relative flex-1">
                        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                        <input
                            type="text"
                            placeholder="بحث (الاسم، البريد، الهاتف، المدينة)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pr-10 pl-4 py-2.5 h-11 border border-gray-200 rounded-lg outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-right bg-white text-sm"
                        />
                    </div>
                </div>

                {/* Bottom Row: Filters - Equal Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full pr-10 pl-4 py-2.5 h-11 border border-gray-200 rounded-lg outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all appearance-none bg-white cursor-pointer text-right text-sm text-gray-700"
                        >
                            <option value="all">جميع الحالات</option>
                            <option value="New">جديد</option>
                            <option value="Reviewed">تمت المراجعة</option>
                            <option value="Contacted">تم التواصل</option>
                            <option value="Approved">تمت الموافقة</option>
                            <option value="Rejected">مرفوض</option>
                        </select>
                    </div>

                    {/* Experience Filter */}
                    <div className="relative">
                        <Briefcase className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                        <select
                            value={experienceFilter}
                            onChange={(e) => setExperienceFilter(e.target.value)}
                            className="w-full pr-10 pl-4 py-2.5 h-11 border border-gray-200 rounded-lg outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all appearance-none bg-white cursor-pointer text-right text-sm text-gray-700"
                        >
                            <option value="all">جميع الخبرات</option>
                            <option value="yes">لديه خبرة</option>
                            <option value="no">بدون خبرة</option>
                        </select>
                    </div>

                    {/* Budget Filter */}
                    <div className="relative">
                        <DollarSign className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                        <select
                            value={budgetFilter}
                            onChange={(e) => setBudgetFilter(e.target.value)}
                            className="w-full pr-10 pl-4 py-2.5 h-11 border border-gray-200 rounded-lg outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all appearance-none bg-white cursor-pointer text-right text-sm text-gray-700"
                        >
                            <option value="all">جميع الميزانيات</option>
                            <option value="500k-1m">٥٠٠ ألف - ١ مليون</option>
                            <option value="1m-2m">١ مليون - ٢ مليون</option>
                            <option value="2m+">أكثر من ٢ مليون</option>
                        </select>
                    </div>

                    {/* Date Range - Side by Side */}
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="date" // Using date for better browser support, text type in image
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="w-full px-2 py-2.5 h-11 border border-gray-200 rounded-lg outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-xs text-gray-600 text-center"
                            />
                        </div>
                        <div className="relative flex-1">
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="w-full px-2 py-2.5 h-11 border border-gray-200 rounded-lg outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-xs text-gray-600 text-center"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Counts */}
                <div className="mt-5 pt-4 border-t border-gray-100 text-sm text-gray-500 font-medium flex justify-end">
                    <span>
                        عرض <span className="font-bold text-gray-900">{filteredAndSortedRequests.length}</span> من أصل <span className="font-bold text-gray-900">{requests.length}</span> طلب
                    </span>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-right font-bold text-gray-600 text-xs uppercase tracking-wider">المتقدم</th>
                                <th className="px-6 py-4 text-right font-bold text-gray-600 text-xs uppercase tracking-wider">معلومات الاتصال</th>
                                <th className="px-6 py-4 text-right font-bold text-gray-600 text-xs uppercase tracking-wider">المدينة</th>
                                <th className="px-6 py-4 text-right font-bold text-gray-600 text-xs uppercase tracking-wider">الميزانية</th>
                                <th className="px-6 py-4 text-right font-bold text-gray-600 text-xs uppercase tracking-wider">الخبرة</th>
                                <th className="px-6 py-4 text-right font-bold text-gray-600 text-xs uppercase tracking-wider">تاريخ التقديم</th>
                                <th className="px-6 py-4 text-right font-bold text-gray-600 text-xs uppercase tracking-wider">الحالة</th>
                                <th className="px-6 py-4 text-right font-bold text-gray-600 text-xs uppercase tracking-wider">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredAndSortedRequests.map((request) => (
                                <tr key={request.id} className="hover:bg-gray-50/80 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-gray-100 p-2 rounded-lg text-gray-600 flex-shrink-0">
                                                <User size={16} />
                                            </div>
                                            <span className="font-semibold text-gray-900 text-sm">{request.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1.5 text-xs text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Phone size={14} className="text-gray-400 flex-shrink-0" />
                                                <span dir="ltr" className="font-medium hover:text-gray-700">{request.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail size={14} className="text-gray-400 flex-shrink-0" />
                                                <span className="truncate max-w-[180px] hover:text-gray-700" title={request.email}>{request.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                                            <span className="font-medium text-sm">{request.city}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <DollarSign size={16} className="text-gray-400 flex-shrink-0" />
                                            <span className="text-xs font-medium">{budgetLabels[request.budget] || request.budget}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${request.hasExperience ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' : 'bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10'}`}>
                                            {request.hasExperience ? 'نعم' : 'لا'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-500 text-xs font-medium" dir="ltr">
                                            {formatGregorianDateTime(request.createdAt)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${statusColors[request.status] || 'bg-gray-100 text-gray-700'}`}>
                                            {statusLabels[request.status] || request.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={request.status}
                                                onChange={(e) => handleStatusChange(request.id, e.target.value)}
                                                className="bg-white border border-gray-200 rounded-md px-2 py-1.5 text-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all cursor-pointer text-gray-600 hover:border-gray-300"
                                            >
                                                <option value="New">جديد</option>
                                                <option value="Reviewed">تمت المراجعة</option>
                                                <option value="Contacted">تم التواصل</option>
                                                <option value="Approved">تمت الموافقة</option>
                                                <option value="Rejected">مرفوض</option>
                                            </select>
                                            <button
                                                onClick={() => handleDelete(request.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all flex-shrink-0"
                                                title="حذف"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredAndSortedRequests.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="bg-gray-50 p-4 rounded-full">
                                                <Search className="text-gray-400" size={24} />
                                            </div>
                                            <p className="text-gray-500 font-medium text-sm">
                                                {searchTerm || statusFilter !== 'all' || experienceFilter !== 'all' || budgetFilter !== 'all' || dateFrom || dateTo
                                                    ? 'لا توجد نتائج تطابق البحث'
                                                    : 'لا توجد طلبات امتياز حالياً'}
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