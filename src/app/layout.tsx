import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
      suppressHydrationWarning
    >
      <body className="antialiased bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/20 selection:text-sky-300">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

