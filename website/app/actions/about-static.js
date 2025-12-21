'use server';

import prisma from '@/lib/prisma';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function uploadAboutStaticImage(formData) {
    try {
        const file = formData.get('file');
        const position = parseInt(formData.get('position'));

        if (!file || !position) {
            return { success: false, error: 'Missing file or position' };
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const timestamp = Date.now();
        const ext = path.extname(file.name);
        const filename = `about-static-${position}-${timestamp}${ext}`;
        const filepath = path.join(process.cwd(), 'public', filename);

        // Check if image exists for this position
        const existingImage = await prisma.aboutStaticImage.findUnique({
            where: { position }
        });

        if (existingImage) {
            // Delete old file
            const oldFilepath = path.join(process.cwd(), 'public', existingImage.image);
            try {
                await unlink(oldFilepath);
            } catch (error) {
                console.error('Old file deletion error:', error);
            }

            // Save new file
            await writeFile(filepath, buffer);

            // Update database
            const updated = await prisma.aboutStaticImage.update({
                where: { position },
                data: { image: `/${filename}` }
            });

            revalidatePath('/dashboard/about-carousel');
            revalidatePath('/');
            return { success: true, data: updated };
        } else {
            // Save new file
            await writeFile(filepath, buffer);

            // Create database entry
            const created = await prisma.aboutStaticImage.create({
                data: {
                    image: `/${filename}`,
                    position
                }
            });

            revalidatePath('/dashboard/about-carousel');
            revalidatePath('/');
            return { success: true, data: created };
        }

    } catch (error) {
        console.error('Upload error:', error);
        return { success: false, error: error.message };
    }
}

export async function getAboutStaticImages() {
    try {
        const items = await prisma.aboutStaticImage.findMany({
            orderBy: { position: 'asc' }
        });
        return { success: true, data: items };
    } catch (error) {
        console.error('Fetch error:', error);
        return { success: false, error: error.message };
    }
}
