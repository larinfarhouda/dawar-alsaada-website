'use server';

import prisma from '@/lib/prisma';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function uploadAboutCarouselImage(formData) {
    try {
        const file = formData.get('file');

        if (!file) {
            return { success: false, error: 'No file provided' };
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const timestamp = Date.now();
        const ext = path.extname(file.name);
        const filename = `about-carousel-${timestamp}${ext}`;
        const filepath = path.join(process.cwd(), 'public', filename);

        // Save file
        await writeFile(filepath, buffer);

        // Create database entry
        const item = await prisma.aboutCarousel.create({
            data: {
                image: `/${filename}`,
            }
        });

        revalidatePath('/dashboard/about-carousel');
        revalidatePath('/');
        return { success: true, data: item };
    } catch (error) {
        console.error('Upload error:', error);
        return { success: false, error: error.message };
    }
}

export async function deleteAboutCarouselImage(id) {
    try {
        const item = await prisma.aboutCarousel.findUnique({
            where: { id }
        });

        if (!item) {
            return { success: false, error: 'Item not found' };
        }

        // Delete file from filesystem
        const filepath = path.join(process.cwd(), 'public', item.image);
        try {
            await unlink(filepath);
        } catch (error) {
            console.error('File deletion error:', error);
        }

        // Delete from database
        await prisma.aboutCarousel.delete({
            where: { id }
        });

        revalidatePath('/dashboard/about-carousel');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Delete error:', error);
        return { success: false, error: error.message };
    }
}

export async function getAboutCarouselImages() {
    try {
        const items = await prisma.aboutCarousel.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return { success: true, data: items };
    } catch (error) {
        console.error('Fetch error:', error);
        return { success: false, error: error.message };
    }
}
