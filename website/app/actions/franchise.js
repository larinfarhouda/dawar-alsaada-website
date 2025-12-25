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

        if (!name || !phone || !email || !city) {
            throw new Error("Missing required fields: name, phone, email, or city.");
        }

        // New Fields
        const profession = formData.get('profession');
        const age = formData.get('age');
        const investmentSource = formData.get('investmentSource');
        const companyName = formData.get('companyName');
        const companyActivity = formData.get('companyActivity');
        const locationLink = formData.get('locationLink');
        const experience = formData.get('experience');
        const readiness = formData.get('readiness');
        const additionalInfo = formData.get('additionalInfo');
        const questions = formData.get('questions');

        // Save to local DB (Prisma) - We might need to update schema later, but for now we can store extra info in existing fields or skip
        // For now, let's just store the basics in Prisma to avoid breaking if schema isn't updated yet
        // Ideally we should update the schema, but user asked to update form and Odoo sync first.
        await prisma.franchiseRequest.create({
            data: {
                name,
                phone,
                email,
                city,
                budget: investmentSource, // Mapping investment source to budget field for now
                hasExperience: experience !== 'no' && experience !== '', // Simple boolean mapping
                status: 'New'
            }
        });

        // Sync to Odoo
        const { createOdooRecord, searchOdooRecord } = await import('@/lib/odoo');

        // 1. Find the "Franchise" approval category
        // Search for the specific Arabic name seen in the screenshot, or fallback to "Franchise"
        const categories = await searchOdooRecord('approval.category', ['|', ['name', 'ilike', 'طلب فرنشايز دوّار السّعادة'], ['name', 'ilike', 'Franchise']], { limit: 1 });

        if (categories && categories.length > 0) {
            const categoryId = categories[0].id;

            // 2. Create Approval Request
            const newRequestId = await createOdooRecord('approval.request', {
                name: `طلب فرنشايز: ${name}`,
                category_id: categoryId,

                // Custom Fields Mapping
                x_studio_char_field_h8_1jd32i8q5: name, // الإسم الثلاثي
                x_studio_char_field_3s0_1jd32l3h6: phone, // رقم الجوال
                x_studio_: email, // الإيميل
                x_studio_char_field_6uc_1jd333vru: city, // تستهدف اي مدينة ؟

                x_studio_char_field_7mj_1jd32jbet: profession, // المهنة
                x_studio_float_field_3j2_1jd32kd5e: parseFloat(age) || 0, // العمر

                x_studio_selection_field_91l_1jd32uu49: investmentSource, // ماذا سيكون مصدر استثمارك

                x_studio_char_field_l4_1jd32p162: companyName, // اسم الشركة
                x_studio_char_field_268_1jd32ph43: companyActivity, // نشاط الشركة

                x_studio_char_field_5pj_1jd331ceb: locationLink, // رابط الموقع

                x_studio_selection_field_327_1jd32q42b: experience, // الخبرة
                x_studio_selection_field_6b_1jd332n35: readiness, // متى تكون جاهز

                x_studio_char_field_656_1jd334ktm: additionalInfo, // معلومات اضافية
                x_studio_char_field_988_1jd334rge: questions, // أسئلة

                reason: `
الاسم: ${name}
رقم الجوال: ${phone}
البريد الإلكتروني: ${email}
المهنة: ${profession}
العمر: ${age}
المدينة: ${city}
مصدر الاستثمار: ${investmentSource}
اسم الشركة: ${companyName || '-'}
نشاط الشركة: ${companyActivity || '-'}
رابط الموقع: ${locationLink || '-'}
الخبرة: ${experience}
الجاهزية: ${readiness}
معلومات إضافية: ${additionalInfo || '-'}
أسئلة: ${questions || '-'}
                `.trim()
            });
            console.log("Odoo Approval Request Created ID:", newRequestId);
        } else {
            // Fallback to CRM Lead if no approval category found
            console.warn("Franchise approval category not found, falling back to CRM Lead.");
            await createOdooRecord('crm.lead', {
                name: `Franchise Request: ${name}`,
                contact_name: name,
                phone: phone,
                email_from: email,
                city: city,
                description: `Budget: ${budget}\nHas Experience: ${hasExperience ? 'Yes' : 'No'}`,
                type: 'lead'
            });
        }

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
