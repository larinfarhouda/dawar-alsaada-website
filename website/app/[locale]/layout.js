import { Cairo } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

export const metadata = {
  title: "دوار السعاده | Dawar Al Saada",
  description: "أشهى المأكولات في المملكة العربية السعودية - Authentic Saudi Cuisine",
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>

      <body className={`${cairo.variable} font-sans antialiased bg-stone-50 text-stone-900`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
