'use server';

import prisma from '@/lib/prisma';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function uploadHeroMedia(formData) {
    try {
        const file = formData.get('file');
        const type = formData.get('type');

        if (!file) {
            return { success: false, error: 'No file provided' };
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const timestamp = Date.now();
        const ext = path.extname(file.name);
        const filename = `hero-${timestamp}${ext}`;
        const filepath = path.join(process.cwd(), 'public', filename);

        // Save file
        await writeFile(filepath, buffer);

        // Create database entry
        const heroMedia = await prisma.heroMedia.create({
            data: {
                url: `/${filename}`,
                type: type || (file.type.startsWith('video/') ? 'video' : 'image'),
                isActive: false
            }
        });

        revalidatePath('/dashboard/hero');
        return { success: true, data: heroMedia };
    } catch (error) {
        console.error('Upload error:', error);
        return { success: false, error: error.message };
    }
}

export async function deleteHeroMedia(id) {
    try {
        const media = await prisma.heroMedia.findUnique({
            where: { id }
        });

        if (!media) {
            return { success: false, error: 'Media not found' };
        }

        // Delete file from filesystem
        const filepath = path.join(process.cwd(), 'public', media.url);
        try {
            await unlink(filepath);
        } catch (error) {
            console.error('File deletion error:', error);
        }

        // Delete from database
        await prisma.heroMedia.delete({
            where: { id }
        });

        revalidatePath('/dashboard/hero');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Delete error:', error);
        return { success: false, error: error.message };
    }
}

export async function setActiveHeroMedia(id) {
    try {
        // Deactivate all media
        await prisma.heroMedia.updateMany({
            data: { isActive: false }
        });

        // Activate selected media
        const media = await prisma.heroMedia.update({
            where: { id },
            data: { isActive: true }
        });

        revalidatePath('/dashboard/hero');
        revalidatePath('/');
        return { success: true, data: media };
    } catch (error) {
        console.error('Activation error:', error);
        return { success: false, error: error.message };
    }
}

export async function getHeroMedia() {
    try {
        const media = await prisma.heroMedia.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return { success: true, data: media };
    } catch (error) {
        console.error('Fetch error:', error);
        return { success: false, error: error.message };
    }
}

export async function getActiveHeroMedia() {
    try {
        const media = await prisma.heroMedia.findFirst({
            where: { isActive: true }
        });
        return media;
    } catch (error) {
        console.error('Fetch active media error:', error);
        return null;
    }
}
