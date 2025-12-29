'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getMenuItems() {
    try {
        return await prisma.menuItem.findMany({
            orderBy: { createdAt: 'desc' },
            include: { category: true },
        });
    } catch (error) {
        console.error("Failed to fetch menu items:", error);
        return [];
    }
}


export async function createMenuItem(formData) {
    const name_ar = formData.get('name_ar');
    const name_en = formData.get('name_en');
    const description_ar = formData.get('description_ar');
    const description_en = formData.get('description_en');
    const price = formData.get('price');
    const image = formData.get('image');
    const rating = parseFloat(formData.get('rating') || '0');
    const popular = formData.get('popular') === 'on';
    const categoryId = formData.get('categoryId') ? parseInt(formData.get('categoryId')) : null;

    try {
        await prisma.menuItem.create({
            data: {
                name_ar,
                name_en,
                description_ar,
                description_en,
                price,
                image,
                rating,
                popular,
                categoryId,
            },
        });
        revalidatePath('/dashboard/menu');
        return { success: true };
    } catch (error) {
        console.error("Failed to create menu item:", error);
        return { success: false, error: "Failed to create item" };
    }
}

export async function deleteMenuItem(id) {
    try {
        await prisma.menuItem.delete({
            where: { id },
        });
        revalidatePath('/dashboard/menu');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete menu item:", error);
        return { success: false, error: "Failed to delete item" };
    }
}

export async function updateMenuItem(id, formData) {
    const name_ar = formData.get('name_ar');
    const name_en = formData.get('name_en');
    const description_ar = formData.get('description_ar');
    const description_en = formData.get('description_en');
    const price = formData.get('price');
    const image = formData.get('image');
    const rating = parseFloat(formData.get('rating') || '0');
    const popular = formData.get('popular') === 'on';
    const categoryId = formData.get('categoryId') ? parseInt(formData.get('categoryId')) : null;

    try {
        await prisma.menuItem.update({
            where: { id },
            data: {
                name_ar,
                name_en,
                description_ar,
                description_en,
                price,
                image,
                rating,
                popular,
                categoryId,
            },
        });
        revalidatePath('/dashboard/menu');
        return { success: true };
    } catch (error) {
        console.error("Failed to update menu item:", error);
        return { success: false, error: "Failed to update item" };
    }
}
