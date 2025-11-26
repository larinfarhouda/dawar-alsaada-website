import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { name } = await request.json();
        const category = await prisma.category.update({
            where: { id: parseInt(id) },
            data: { name },
        });
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: 'Error updating category' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        await prisma.category.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({ message: 'Category deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting category' }, { status: 500 });
    }
}
