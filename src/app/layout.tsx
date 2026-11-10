import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "المثال 3 — السقوط الحر | فيزياء الصف الخامس علمي",
  description:
    "موقع تفاعلي ثلاثي الأبعاد لشرح المثال 3 (السقوط الحر) من الفصل الثاني — الحركة الخطية، كتاب الفيزياء للصف الخامس العلمي، صفحة 42.",
  keywords: [
    "فيزياء",
    "السقوط الحر",
    "الحركة الخطية",
    "تعجيل الجاذبية",
    "الصف الخامس علمي",
    "تفاعلي",
    "ثلاثي الأبعاد",
  ],
  authors: [{ name: "Physics 3D" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: 'var(--font-cairo), "Segoe UI", sans-serif' }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
