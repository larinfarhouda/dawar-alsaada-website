'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { writeFile } from 'fs/promises';
import path from 'path';

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
    try {
        const name = formData.get('name');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const position = formData.get('position');
        const cvFile = formData.get('cv');

        let cvUrl = null;

        // Handle CV file upload if provided
        if (cvFile && cvFile.size > 0) {
            const bytes = await cvFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Create unique filename
            const timestamp = Date.now();
            const ext = path.extname(cvFile.name);
            const filename = `cv-${timestamp}${ext}`;
            const filepath = path.join(process.cwd(), 'public', 'cvs', filename);

            // Create directory if it doesn't exist
            const fs = require('fs');
            const dir = path.join(process.cwd(), 'public', 'cvs');
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            // Save file
            await writeFile(filepath, buffer);
            cvUrl = `/cvs/${filename}`;
        }

        await prisma.jobApplication.create({
            data: {
                name,
                phone,
                email,
                position,
                cvUrl,
                status: 'New'
            }
        });

        revalidatePath('/dashboard/applications');
        return { success: true };
    } catch (error) {
        console.error("Failed to create application:", error);
        return { success: false, error: error.message };
    }
}

export async function deleteApplication(id) {
    try {
        await prisma.jobApplication.delete({
            where: { id },
        });
        revalidatePath('/dashboard/applications');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete application:", error);
        return { success: false, error: "Failed to delete application" };
    }
}
