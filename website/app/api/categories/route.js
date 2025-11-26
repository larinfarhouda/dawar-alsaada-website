import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { name } = await request.json();
        const category = await prisma.category.create({
            data: { name },
        });
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating category' }, { status: 500 });
    }
}
