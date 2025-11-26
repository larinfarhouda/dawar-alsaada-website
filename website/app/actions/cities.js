'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getCities() {
    try {
        const cities = await prisma.city.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        })
        return cities
    } catch (error) {
        console.error('Error fetching cities:', error)
        return []
    }
}

export async function createCity(formData) {
    try {
        const name = formData.get('name')

        await prisma.city.create({
            data: {
                name,
            },
        })

        revalidatePath('/dashboard/cities')
        revalidatePath('/dashboard/branches')
        return { success: true }
    } catch (error) {
        console.error('Error creating city:', error)
        return { success: false, error: error.message }
    }
}

export async function updateCity(id, formData) {
    try {
        const name = formData.get('name')

        await prisma.city.update({
            where: { id },
            data: {
                name,
            },
        })

        revalidatePath('/dashboard/cities')
        revalidatePath('/dashboard/branches')
        return { success: true }
    } catch (error) {
        console.error('Error updating city:', error)
        return { success: false, error: error.message }
    }
}

export async function deleteCity(id) {
    try {
        await prisma.city.delete({
            where: { id },
        })

        revalidatePath('/dashboard/cities')
        revalidatePath('/dashboard/branches')
        return { success: true }
    } catch (error) {
        console.error('Error deleting city:', error)
        return { success: false, error: error.message }
    }
}
