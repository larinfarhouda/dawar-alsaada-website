'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getApplications() {
    try {
        return await prisma.jobApplication.findMany({
            orderBy: { createdAt: 'desc' },
        });
    } catch (error) {
        console.error("Failed to fetch applications:", error);
        return [];
    }
}

export async function updateApplicationStatus(id, status) {
    try {
        await prisma.jobApplication.update({
            where: { id },
            data: { status },
        });
        revalidatePath('/dashboard/applications');
        return { success: true };
    } catch (error) {
        console.error("Failed to update application status:", error);
        return { success: false, error: "Failed to update status" };
    }
}

export async function createApplication(formData) {
    // This is for the public facing form
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const position = formData.get('position');
    // File upload handling would go here, for now we skip or assume URL if handled by client upload
    // But the form in Careers.js doesn't actually upload yet.

    try {
        await prisma.jobApplication.create({
            data: {
                name,
                phone,
                email,
                position,
                status: 'New'
            }
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to create application:", error);
        return { success: false };
    }
}
