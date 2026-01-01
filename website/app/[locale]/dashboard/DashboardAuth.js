"use client";

import { useEffect } from 'react';
import { useRouter } from '@/navigation';

export default function DashboardAuth({ children }) {
    const router = useRouter();

    useEffect(() => {
        // Check authentication
        const isAuthenticated = localStorage.getItem('isAuthenticated');

        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [router]);

    return <>{children}</>;
}
