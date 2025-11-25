import { NextResponse } from 'next/server';

export function middleware(request) {
    // Check if accessing dashboard routes
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        // In a real app, check for proper auth token/session
        // For now, we'll let the client-side handle it
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/dashboard/:path*',
};
