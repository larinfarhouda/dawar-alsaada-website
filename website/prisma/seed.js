const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Seed Menu Items
    console.log('📋 Creating menu items...');
    await prisma.menuItem.createMany({
        data: [
            {
                name: 'فطيرة الكبدة بالجبن الشهيرة',
                description: 'وصفة أصلية وجبن مذاب، طعم لا يُنسى',
                price: '٢٢ ر.س',
                image: 'https://d.dawar.sa/wp-content/uploads/2025/07/%D9%83%D8%A8%D8%AF%D8%A9-%D8%A8%D8%A7%D9%84%D8%AC%D8%A8%D9%86-1.png',
                rating: 4.9,
                popular: true,
            },
            {
                name: 'بوكس كرك ومراهيف',
                description: 'استمتع بألذ مراهيف مع شاي الكرك الأصلي',
                price: '٤٥ ر.س',
                image: 'https://d.dawar.sa/wp-content/uploads/2025/07/%D8%A8%D9%88%D9%83%D8%B3-%D9%83%D8%B1%D9%83-%D9%88%D9%85%D8%B1%D8%A7%D9%87%D9%8A%D9%81.png',
                rating: 4.8,
                popular: false,
            },
            {
                name: 'شكشوكة جبن',
                description: 'بيض طازج مع الطماطم والجبن السائل',
                price: '١٨ ر.س',
                image: 'https://d.dawar.sa/wp-content/uploads/2025/07/%D8%B4%D9%83%D8%B4%D9%88%D9%83%D8%A9-%D8%A8%D8%A7%D9%84%D8%AC%D8%A8%D9%86.png',
                rating: 4.7,
                popular: false,
            },
        ],
    });

    // Seed Branches
    console.log('📍 Creating branches...');
    await prisma.branch.createMany({
        data: [
            { city: 'الرياض', name: 'فرع الملقا', address: 'طريق أنس بن مالك، حي الملقا', link: 'https://maps.google.com', phone: '920000000' },
            { city: 'الرياض', name: 'فرع العقيق', address: 'طريق الملك فهد، حي العقيق', link: 'https://maps.google.com', phone: '920000000' },
            { city: 'الرياض', name: 'فرع قرطبة', address: 'طريق سعيد بن زيد، حي قرطبة', link: 'https://maps.google.com', phone: '920000000' },
            { city: 'جدة', name: 'فرع الروضة', address: 'شارع الأمير سلطان، حي الروضة', link: 'https://maps.google.com', phone: '920000000' },
            { city: 'جدة', name: 'فرع الصفا', address: 'شارع الأربعين، حي الصفا', link: 'https://maps.google.com', phone: '920000000' },
            { city: 'الدمام والخبر', name: 'فرع الشاطئ', address: 'طريق الأمير محمد بن فهد، حي الشاطئ', link: 'https://maps.google.com', phone: '920000000' },
        ],
    });

    // Seed Sample Job Applications
    console.log('💼 Creating sample job applications...');
    await prisma.jobApplication.createMany({
        data: [
            {
                name: 'أحمد محمد',
                phone: '0501234567',
                email: 'ahmed@example.com',
                position: 'طاهي / مساعد طاهي',
                status: 'New',
            },
            {
                name: 'فاطمة علي',
                phone: '0509876543',
                email: 'fatima@example.com',
                position: 'مدير فرع',
                status: 'Reviewed',
            },
        ],
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
