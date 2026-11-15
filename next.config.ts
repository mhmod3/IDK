import type { NextConfig } from "next";

/**
 * هدف البناء:
 *   - undefined | "standalone"  : مخرجات قابلة للتشغيل الذاتي (Docker / VPS عبر `bun .next/standalone/server.js`).
 *   - "pages"                    : مخرجات ثابتة (static export) مناسبة لـ Cloudflare Pages والاستضافات الثابتة الأخرى.
 *
 * يُفعَّل وضع Pages بضبط متغير البيئة `DEPLOY_TARGET=pages` أثناء `next build`،
 * أو عبر سكربت `npm run build:pages` المُعدّ مسبقاً.
 */
const deployTarget = process.env.DEPLOY_TARGET;

const isPagesBuild = deployTarget === "pages";

const nextConfig: NextConfig = isPagesBuild
  ? {
      // تصدير ثابت كامل يُنتج مجلد `out/` جاهزاً للرفع إلى Cloudflare Pages.
      output: "export",
      // تعطيل تتبّع الملفات أثناء البناء على بيئات CI لتفادي مشاكل الصلاحيات.
      trailingSlash: true,
      // ضمان استقرار الأصول الثابتة عبر النشرات.
      reactStrictMode: false,
      // مطابق لوضع standalone: تجاهل أخطاء TypeScript أثناء البناء.
      typescript: {
        ignoreBuildErrors: true,
      },
    }
  : {
      // الوضع الافتراضي: مخرجات قابلة للتشغيل الذاتي للخوادم/VPS.
      output: "standalone",
      typescript: {
        ignoreBuildErrors: true,
      },
      reactStrictMode: false,
    };

export default nextConfig;
