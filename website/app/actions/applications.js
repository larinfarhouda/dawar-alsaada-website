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
        const city = formData.get('city');
        const position = formData.get('position');
        const cvFile = formData.get('cv');

        let cvUrl = null;

        // Handle CV file upload if provided
        let cvBuffer = null;

        // Handle CV file upload if provided
        if (cvFile && cvFile.size > 0) {
            const bytes = await cvFile.arrayBuffer();
            cvBuffer = Buffer.from(bytes);

            // Only save to local filesystem in development
            if (process.env.NODE_ENV === 'development') {
                const buffer = cvBuffer;

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
        }

        await prisma.jobApplication.create({
            data: {
                name,
                phone,
                email,
                city,
                position,
                cvUrl,
                status: 'New'
            }
        });

        // Sync to Odoo
        const { createOdooRecord, createOdooAttachment, searchOdooRecord } = await import('@/lib/odoo');

        let jobId = false;
        let stateId = false;

        // 1. Find Job ID
        const POSITION_MAPPING = {
            'chef': 'طاهي / مساعد طاهي',
            'waiter': 'مقدم طعام',
            'manager': 'مدير فرع',
            'cashier': 'كاشير',
            'other': 'اخري'
        };
        const jobName = POSITION_MAPPING[position];

        if (jobName) {
            const jobs = await searchOdooRecord('hr.job', [['name', '=', jobName]], { limit: 1, fields: ['id'] });
            if (jobs && jobs.length > 0) {
                jobId = jobs[0].id;
            }
        }

        // 2. Find City ID (mapped to res.country.state in x_studio_city)
        // 2. Find City ID (mapped to res.country.state in x_studio_city)
        if (city) {
            // My form sends city in Arabic (value={city.ar}), but Odoo likely has English names for states.
            // We need to find the English name from our list first.
            const { saudiCities } = await import('@/lib/saudiCities');
            const cityObj = saudiCities.find(c => c.ar === city || c.en === city);
            const searchName = cityObj ? cityObj.en : city;

            // Search Odoo using the English name (or whatever we resolved)
            const states = await searchOdooRecord('res.country.state', [['name', 'ilike', searchName]], { limit: 1, fields: ['id'] });
            if (states && states.length > 0) {
                stateId = states[0].id;
            }
        }

        const odooId = await createOdooRecord('hr.applicant', {
            partner_name: name,
            partner_phone: phone,
            email_from: email,
            job_id: jobId,
            x_studio_city: stateId,
            //             applicant_notes: `
            // <p><strong>الاسم:</strong> ${name}</p>
            // <p><strong>المنصب:</strong> ${position}</p>
            // <p><strong>المدينة:</strong> ${city}</p>
            // <p><strong>الجوال:</strong> ${phone}</p>
            //             `.trim(),
        });


        // File uploaded to Odoo
        if (odooId && cvBuffer) {
            const base64Content = cvBuffer.toString('base64');
            await createOdooAttachment('hr.applicant', odooId, cvFile.name, base64Content);
        }

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
