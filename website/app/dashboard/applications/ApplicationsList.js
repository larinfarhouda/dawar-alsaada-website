"use client";

import { useState } from 'react';
import { updateApplicationStatus } from '@/app/actions/applications';
import { FileText, Phone, Mail, User, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function ApplicationsList({ initialApplications }) {
    const [applications, setApplications] = useState(initialApplications);

    async function handleStatusChange(id, newStatus) {
        const result = await updateApplicationStatus(id, newStatus);
        if (result.success) {
            window.location.reload();
        } else {
            alert("Error updating status");
        }
    }

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
        <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-8">طلبات التوظيف</h2>

            <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-stone-50 border-b border-stone-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-stone-700">المتقدم</th>
                                <th className="px-6 py-4 font-bold text-stone-700">الوظيفة</th>
                                <th className="px-6 py-4 font-bold text-stone-700">معلومات الاتصال</th>
                                <th className="px-6 py-4 font-bold text-stone-700">تاريخ التقديم</th>
                                <th className="px-6 py-4 font-bold text-stone-700">الحالة</th>
                                <th className="px-6 py-4 font-bold text-stone-700">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {applications.map((app) => (
                                <tr key={app.id} className="hover:bg-stone-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-stone-100 p-2 rounded-full text-stone-500">
                                                <User size={20} />
                                            </div>
                                            <span className="font-bold text-stone-900">{app.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-stone-700">{app.position}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1 text-sm text-stone-500">
                                            <div className="flex items-center gap-2">
                                                <Phone size={14} />
                                                <span dir="ltr">{app.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail size={14} />
                                                <span>{app.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-stone-500 text-sm">
                                            {new Date(app.createdAt).toLocaleDateString('ar-SA')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[app.status] || 'bg-gray-100 text-gray-700'}`}>
                                            {statusLabels[app.status] || app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={app.status}
                                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                            className="bg-white border border-stone-200 rounded-lg px-3 py-1 text-sm outline-none focus:border-brand"
                                        >
                                            <option value="New">جديد</option>
                                            <option value="Reviewed">تمت المراجعة</option>
                                            <option value="Contacted">تم التواصل</option>
                                            <option value="Hired">تم التوظيف</option>
                                            <option value="Rejected">مرفوض</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            {applications.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-stone-400">
                                        لا توجد طلبات توظيف حالياً
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
