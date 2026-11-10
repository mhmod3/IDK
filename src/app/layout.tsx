import type { Metadata } from "next";
import { Cairo, IBM_Plex_Sans_Arabic, JetBrains_Mono, STIX_Two_Text } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const stixMath = STIX_Two_Text({
  variable: "--font-stix-math",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "المثال 3 - السقوط الحر | فيزياء الصف الخامس علمي",
  description:
    "منظومة تعليمية تفاعلية ثلاثية الأبعاد لشرح وحساب مسائل السقوط الحر من كتاب الفيزياء للصف الخامس العلمي، الفصل الثاني، صفحة 42.",
  keywords: [
    "فيزياء",
    "السقوط الحر",
    "الحركة الخطية",
    "تعجيل الجاذبية",
    "الصف الخامس علمي",
    "العراق",
    "محاكاة علمية",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${ibmPlexArabic.variable} ${jetbrainsMono.variable} ${stixMath.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/20 selection:text-sky-300">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
