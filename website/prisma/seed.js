
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Clear existing data
    await prisma.menuItem.deleteMany({});
    await prisma.branch.deleteMany({});
    await prisma.city.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.appPromo.deleteMany({});
    await prisma.jobApplication.deleteMany({});

    // Seed Categories
    console.log('📂 Creating categories...');
    const categories = await Promise.all([
        prisma.category.create({
            data: { name_ar: 'فطور', name_en: 'Breakfast' }
        }),
        prisma.category.create({
            data: { name_ar: 'مشروبات', name_en: 'Drinks' }
        }),
        prisma.category.create({
            data: { name_ar: 'حلى', name_en: 'Desserts' }
        })
    ]);

    // Seed Menu Items
    console.log('📋 Creating menu items...');
    await prisma.menuItem.createMany({
        data: [

            {
                name_ar: 'فطيرة الكبدة بالجبن الشهيرة',
                name_en: 'Famous Cheese Liver Pie',
                description_ar: 'وصفة أصلية وجبن مذاب، طعم لا يُنسى',
                description_en: 'Original recipe with melted cheese, unforgettable taste',
                price: '22 ر.س',
                image: 'https://d.dawar.sa/wp-content/uploads/2025/07/%D9%83%D8%A8%D8%AF%D8%A9-%D8%A8%D8%A7%D9%84%D8%AC%D8%A8%D9%86-1.png',
                rating: 4.9,
                popular: true,
                categoryId: categories[0].id
            },
            {
                name_ar: 'بوكس كرك ومراهيف',
                name_en: 'Karak & Maraheef Box',
                description_ar: 'استمتع بألذ مراهيف مع شاي الكرك الأصلي',
                description_en: 'Enjoy delicious Maraheef with original Karak tea',
                price: '45 ر.س',
                image: 'https://d.dawar.sa/wp-content/uploads/2025/07/%D8%A8%D9%88%D9%83%D8%B3-%D9%83%D8%B1%D9%83-%D9%88%D9%85%D8%B1%D8%A7%D9%87%D9%8A%D9%81.png',
                rating: 4.8,
                popular: false,
                categoryId: categories[0].id
            },
            {
                name_ar: 'شكشوكة جبن',
                name_en: 'Cheese Shakshuka',
                description_ar: 'بيض طازج مع الطماطم والجبن السائل',
                description_en: 'Fresh eggs with tomatoes and liquid cheese',
                price: '18 ر.س',
                image: 'https://d.dawar.sa/wp-content/uploads/2025/07/%D8%B4%D9%83%D8%B4%D9%88%D9%83%D8%A9-%D8%A8%D8%A7%D9%84%D8%AC%D8%A8%D9%86.png',
                rating: 4.7,
                popular: false,
                categoryId: categories[0].id
            },
        ],
    });

    // Seed Cities
    console.log('🏙️ Creating cities...');
    const cities = await Promise.all([
        prisma.city.create({ data: { name_ar: 'الرياض', name_en: 'Riyadh' } }),
        prisma.city.create({ data: { name_ar: 'جدة', name_en: 'Jeddah' } }),
        prisma.city.create({ data: { name_ar: 'الدمام والخبر', name_en: 'Dammam & Khobar' } })
    ]);

    // Seed Branches
    console.log('📍 Creating branches...');
    await prisma.branch.createMany({
        data: [
            {
                city_ar: 'الرياض', city_en: 'Riyadh',
                name_ar: 'فرع الملقا', name_en: 'Al Malqa Branch',
                address_ar: 'طريق أنس بن مالك، حي الملقا', address_en: 'Anas Ibn Malik Rd, Al Malqa Dist',
                link: 'https://maps.google.com', phone: '920000000'
            },
            {
                city_ar: 'الرياض', city_en: 'Riyadh',
                name_ar: 'فرع العقيق', name_en: 'Al Aqiq Branch',
                address_ar: 'طريق الملك فهد، حي العقيق', address_en: 'King Fahd Rd, Al Aqiq Dist',
                link: 'https://maps.google.com', phone: '920000000'
            },
            {
                city_ar: 'الرياض', city_en: 'Riyadh',
                name_ar: 'فرع قرطبة', name_en: 'Qurtubah Branch',
                address_ar: 'طريق سعيد بن زيد، حي قرطبة', address_en: 'Saeed Ibn Zaid Rd, Qurtubah Dist',
                link: 'https://maps.google.com', phone: '920000000'
            },
            {
                city_ar: 'جدة', city_en: 'Jeddah',
                name_ar: 'فرع الروضة', name_en: 'Al Rawdah Branch',
                address_ar: 'شارع الأمير سلطان، حي الروضة', address_en: 'Prince Sultan St, Al Rawdah Dist',
                link: 'https://maps.google.com', phone: '920000000'
            },
            {
                city_ar: 'جدة', city_en: 'Jeddah',
                name_ar: 'فرع الصفا', name_en: 'Al Safa Branch',
                address_ar: 'شارع الأربعين، حي الصفا', address_en: 'Al Arbaeen St, Al Safa Dist',
                link: 'https://maps.google.com', phone: '920000000'
            },
            {
                city_ar: 'الدمام والخبر', city_en: 'Dammam & Khobar',
                name_ar: 'فرع الشاطئ', name_en: 'Al Shatea Branch',
                address_ar: 'طريق الأمير محمد بن فهد، حي الشاطئ', address_en: 'Prince Mohammed Bin Fahd Rd, Al Shatea Dist',
                link: 'https://maps.google.com', phone: '920000000'
            },
        ],
    });

    // Seed App Promo
    console.log('📱 Creating app promo...');
    await prisma.appPromo.create({
        data: {
            title_ar: "حمل التطبيق الآن",
            title_en: "Download App Now",
            subtitle_ar: "واستمتع بعروض حصرية",
            subtitle_en: "Enjoy Exclusive Offers",
            description_ar: "اطلب طعامك المفضل بكل سهولة، تتبع طلبك لحظة بلحظة، واحصل على نقاط ولاء مع كل طلب. تجربة طعام فريدة بين يديك.",
            description_en: "Order your favorite food easily, track your order moment by moment, and earn loyalty points with every order. A unique dining experience in your hands.",
            appStoreLink: "#",
            googlePlayLink: "#",
            phoneImage: "https://d.dawar.sa/wp-content/uploads/2025/07/app-mockup.png",
            backgroundImage: "https://d.dawar.sa/wp-content/uploads/2025/07/hero-bg.png",
        }
    });

    console.log('✅ Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
