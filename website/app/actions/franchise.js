'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getFranchiseRequests() {
    try {
        return await prisma.franchiseRequest.findMany({
            orderBy: { createdAt: 'desc' },
        });
    } catch (error) {
        console.error("Failed to fetch franchise requests:", error);
        return [];
    }
}

export async function updateFranchiseStatus(id, status) {
    try {
        await prisma.franchiseRequest.update({
            where: { id },
            data: { status },
        });
        revalidatePath('/dashboard/franchise');
        return { success: true };
    } catch (error) {
        console.error("Failed to update franchise status:", error);
        return { success: false, error: "Failed to update status" };
    }
}

export async function createFranchiseRequest(formData) {
    try {
        const name = formData.get('name');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const city = formData.get('city');
        const budget = formData.get('budget');
        const hasExperience = formData.get('experience') === 'yes';

        await prisma.franchiseRequest.create({
            data: {
                name,
                phone,
                email,
                city,
                budget,
                hasExperience,
                status: 'New'
            }
        });

        revalidatePath('/dashboard/franchise');
        return { success: true };
    } catch (error) {
        console.error("Failed to create franchise request:", error);
        return { success: false, error: error.message };
    }
}

export async function deleteFranchiseRequest(id) {
    try {
        await prisma.franchiseRequest.delete({
            where: { id },
        });
        revalidatePath('/dashboard/franchise');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete franchise request:", error);
        return { success: false, error: "Failed to delete franchise request" };
    }
}
