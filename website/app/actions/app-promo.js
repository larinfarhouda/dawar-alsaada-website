"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, unlink } from "fs/promises";
import path from "path";


export async function getAppPromo() {
    try {
        let promo = await prisma.appPromo.findFirst();

        if (!promo) {
            // Create default if not exists
            promo = await prisma.appPromo.create({
                data: {
                    title_ar: "حمل التطبيق الآن",
                    subtitle_ar: "واستمتع بعروض حصرية",
                    description_ar: "اطلب طعامك المفضل بكل سهولة، تتبع طلبك لحظة بلحظة، واحصل على نقاط ولاء مع كل طلب. تجربة طعام فريدة بين يديك.",
                    appStoreLink: "#",
                    googlePlayLink: "#",
                    phoneImage: "/app-mockup.png",
                    backgroundImage: "/hero-bg.png",
                },
            });
        }

        return { success: true, data: promo };
    } catch (error) {
        console.error("Error fetching app promo:", error);
        return { success: false, error: "Failed to fetch app promo data" };
    }
}

export async function updateAppPromo(formData) {
    try {
        const id = parseInt(formData.get("id"));
        const title_ar = formData.get("title_ar");
        const title_en = formData.get("title_en");
        const subtitle_ar = formData.get("subtitle_ar");
        const subtitle_en = formData.get("subtitle_en");
        const description_ar = formData.get("description_ar");
        const description_en = formData.get("description_en");
        const appStoreLink = formData.get("appStoreLink");
        const googlePlayLink = formData.get("googlePlayLink");

        const dataToUpdate = {
            title_ar,
            title_en,
            subtitle_ar,
            subtitle_en,
            description_ar,
            description_en,
            appStoreLink,
            googlePlayLink,
        };

        // Handle Phone Image Upload
        const phoneImageFile = formData.get("phoneImageFile");
        if (phoneImageFile && phoneImageFile.size > 0) {
            const bytes = await phoneImageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const timestamp = Date.now();
            const ext = path.extname(phoneImageFile.name);
            const filename = `app-promo-phone-${timestamp}${ext}`;
            const filepath = path.join(process.cwd(), "public", filename);
            await writeFile(filepath, buffer);
            dataToUpdate.phoneImage = `/${filename}`;
        }

        // Handle Background Image Upload
        const backgroundImageFile = formData.get("backgroundImageFile");
        if (backgroundImageFile && backgroundImageFile.size > 0) {
            const bytes = await backgroundImageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const timestamp = Date.now();
            const ext = path.extname(backgroundImageFile.name);
            const filename = `app-promo-bg-${timestamp}${ext}`;
            const filepath = path.join(process.cwd(), "public", filename);
            await writeFile(filepath, buffer);
            dataToUpdate.backgroundImage = `/${filename}`;
        }

        await prisma.appPromo.update({
            where: { id },
            data: dataToUpdate,
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error updating app promo:", error);
        return { success: false, error: "Failed to update app promo data" };
    }
}
