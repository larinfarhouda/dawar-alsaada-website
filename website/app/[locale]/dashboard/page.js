import prisma from '@/lib/prisma';
import { LayoutDashboard, Menu, MapPin, FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getStats() {
    try {
        const [menuCount, branchCount, applicationCount] = await Promise.all([
            prisma.menuItem.count(),
            prisma.branch.count(),
            prisma.jobApplication.count({ where: { status: 'New' } }),
        ]);

        return { menuCount, branchCount, applicationCount };
    } catch (error) {
        console.error("Database Error:", error);
        return { menuCount: 0, branchCount: 0, applicationCount: 0 };
    }
}

export default async function DashboardPage() {
    const stats = await getStats();

    return (
        <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-8">نظرة عامة</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Menu Stats */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex items-center gap-4">
                    <div className="bg-orange-100 p-4 rounded-2xl text-orange-600">
                        <Menu size={32} />
                    </div>
                    <div>
                        <p className="text-stone-500 text-sm font-medium">عناصر القائمة</p>
                        <h3 className="text-3xl font-bold text-stone-900">{stats.menuCount}</h3>
                    </div>
                </div>

                {/* Branches Stats */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex items-center gap-4">
                    <div className="bg-blue-100 p-4 rounded-2xl text-blue-600">
                        <MapPin size={32} />
                    </div>
                    <div>
                        <p className="text-stone-500 text-sm font-medium">عدد الفروع</p>
                        <h3 className="text-3xl font-bold text-stone-900">{stats.branchCount}</h3>
                    </div>
                </div>

                {/* Applications Stats */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex items-center gap-4">
                    <div className="bg-green-100 p-4 rounded-2xl text-green-600">
                        <FileText size={32} />
                    </div>
                    <div>
                        <p className="text-stone-500 text-sm font-medium">طلبات توظيف جديدة</p>
                        <h3 className="text-3xl font-bold text-stone-900">{stats.applicationCount}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
