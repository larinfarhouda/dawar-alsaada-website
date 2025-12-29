'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}


export async function createCategory(formData) {
    try {
        const name_ar = formData.get('name_ar');
        const name_en = formData.get('name_en');

        // Check if category already exists
        const existing = await prisma.category.findUnique({
            where: { name_ar }
        });

        if (existing) {
            return { success: false, error: 'هذا التصنيف موجود مسبقاً' };
        }

        await prisma.category.create({
            data: { name_ar, name_en },
        });

        revalidatePath('/dashboard/categories');
        return { success: true };
    } catch (error) {
        console.error('Error creating category:', error);
        return { success: false, error: 'حدث خطأ أثناء إنشاء التصنيف' };
    }
}

export async function updateCategory(id, formData) {
    try {
        const name_ar = formData.get('name_ar');
        const name_en = formData.get('name_en');

        // Check if name is taken by another category
        const existing = await prisma.category.findFirst({
            where: {
                name_ar,
                NOT: { id }
            }
        });

        if (existing) {
            return { success: false, error: 'هذا الاسم مستخدم لتصنيف آخر' };
        }

        await prisma.category.update({
            where: { id },
            data: { name_ar, name_en },
        });

        revalidatePath('/dashboard/categories');
        return { success: true };
    } catch (error) {
        console.error('Error updating category:', error);
        return { success: false, error: 'حدث خطأ أثناء تحديث التصنيف' };
    }
}

export async function deleteCategory(id) {
    try {
        await prisma.category.delete({
            where: { id },
        });

        revalidatePath('/dashboard/categories');
        return { success: true };
    } catch (error) {
        console.error('Error deleting category:', error);
        return { success: false, error: 'حدث خطأ أثناء حذف التصنيف' };
    }
}
