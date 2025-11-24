import { Cairo } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans antialiased bg-stone-50 text-stone-900`}>
        {children}
      </body>
    </html>
  );
}
