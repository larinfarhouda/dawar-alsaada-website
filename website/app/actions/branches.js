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
    const city = formData.get('city');
    const name = formData.get('name');
    const address = formData.get('address');
    const link = formData.get('link');
    const phone = formData.get('phone');

    try {
        await prisma.branch.create({
            data: {
                city,
                name,
                address,
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
    const city = formData.get('city');
    const name = formData.get('name');
    const address = formData.get('address');
    const link = formData.get('link');
    const phone = formData.get('phone');

    try {
        await prisma.branch.update({
            where: { id },
            data: {
                city,
                name,
                address,
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
