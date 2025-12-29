'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getBranches() {
    try {
        return await prisma.branch.findMany({
            orderBy: { createdAt: 'desc' },
        });
    } catch (error) {
        console.error("Failed to fetch branches:", error);
        return [];
    }
}


export async function createBranch(formData) {
    const city_ar = formData.get('city_ar');
    const city_en = formData.get('city_en');
    const name_ar = formData.get('name_ar');
    const name_en = formData.get('name_en');
    const address_ar = formData.get('address_ar');
    const address_en = formData.get('address_en');
    const link = formData.get('link');
    const phone = formData.get('phone');

    try {
        await prisma.branch.create({
            data: {
                city_ar,
                city_en,
                name_ar,
                name_en,
                address_ar,
                address_en,
                link,
                phone,
            },
        });
        revalidatePath('/dashboard/branches');
        return { success: true };
    } catch (error) {
        console.error("Failed to create branch:", error);
        return { success: false, error: "Failed to create branch" };
    }
}

export async function deleteBranch(id) {
    try {
        await prisma.branch.delete({
            where: { id },
        });
        revalidatePath('/dashboard/branches');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete branch:", error);
        return { success: false, error: "Failed to delete branch" };
    }
}

export async function updateBranch(id, formData) {
    const city_ar = formData.get('city_ar');
    const city_en = formData.get('city_en');
    const name_ar = formData.get('name_ar');
    const name_en = formData.get('name_en');
    const address_ar = formData.get('address_ar');
    const address_en = formData.get('address_en');
    const link = formData.get('link');
    const phone = formData.get('phone');

    try {
        await prisma.branch.update({
            where: { id },
            data: {
                city_ar,
                city_en,
                name_ar,
                name_en,
                address_ar,
                address_en,
                link,
                phone,
            },
        });
        revalidatePath('/dashboard/branches');
        return { success: true };
    } catch (error) {
        console.error("Failed to update branch:", error);
        return { success: false, error: "Failed to update branch" };
    }
}
