## ملاحظة مهمة جدا جدا:
<details>
<summary>اضغط</summary>

اريد درجات

</details>

## التشغيل محلياً

```bash
# تثبيت الحزم
npm install

# تشغيل خادم التطوير
npm run dev

# فتح المتصفح على http://localhost:3000
```

## النشر على Cloudflare Pages

الموقع يدعم **النشر الثابت** (static export) على Cloudflare Pages خارج الصندوق،
دون أي محوّلات (adapters) مثل `@cloudflare/next-on-pages` أو `@opennextjs/cloudflare`.
كل ما في التطبيق يعمل بالكامل على العميل (مشهد three.js + React 19)،
لذلك لا حاجة لخادم Node.js أثناء التشغيل.

### الطريقة 1: النشر التلقائي عبر GitHub Actions (موصى بها)

1. أنشئ مشروع Cloudflare Pages باسم `idk-free-fall` (أو أي اسم تريده) من لوحة Cloudflare.
2. احصل على **API Token** بصلاحية `Cloudflare Pages: Edit` من
   [Cloudflare Dashboard → My Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens).
3. في مستودع GitHub: **Settings → Secrets and variables → Actions**، أضف:

   | Secret | القيمة |
   |---|---|
   | `CLOUDFLARE_API_TOKEN` | رمز الوصول من الخطوة 2 |
   | `CLOUDFLARE_ACCOUNT_ID` | معرّف حسابك (تجده في يمين لوحة Cloudflare) |

4. (اختياري) إذا اخترت اسماً غير `idk-free-fall`، أضف **variable** (وليس secret) باسم
   `CLOUDFLARE_PAGES_PROJECT` وقيمته اسم مشروعك.

5. ادفع أي commit إلى `main` — سيقوم [workflow](.github/workflows/cloudflare-pages.yml)
   بالبناء والنشر تلقائياً. عند فتح PR ستحصل على **رابط معاينة** مؤقت.

### الطريقة 2: النشر اليدوي عبر Wrangler

```bash
# تسجيل دخول مرة واحدة
npx wrangler login

# بناء نسخة ثابتة + رفعها إلى Cloudflare Pages
npm run pages:deploy

# أو معاينة محلية قبل الرفع
npm run pages:preview
```

### الطريقة 3: ربط المستودع من لوحة Cloudflare Pages

1. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**
2. اختر مستودع `mhmod3/IDK` والفرع `main`.
3. في **Build settings** اضبط:

   | الإعداد | القيمة |
   |---|---|
   | Framework preset | `Next.js (Static HTML Export)` |
   | Build command | `npm run build:pages` |
   | Build output directory | `out` |
   | Environment variables | `DEPLOY_TARGET` = `pages` |

4. اضغط **Save and Deploy**.

> **ملاحظة:** الوضع الافتراضي للبناء (`npm run build`) يبقى كما هو (`output: 'standalone'`)
> للاستخدام على VPS / Docker عبر `bun .next/standalone/server.js`. وضع Pages يُفعَّل فقط عند ضبط
> `DEPLOY_TARGET=pages` أو استخدام سكربت `npm run build:pages`.


# المثال 3 — السقوط الحر | موقع تفاعلي ثلاثي الأبعاد

موقع تعليمي تفاعلي ثلاثي الأبعاد لشرح **المثال 3** (السقوط الحر) من الفصل الثاني (الحركة الخطية) في كتاب الفيزياء للصف الخامس العلمي، صفحة 42.

## المثال

سقطت كرة سقوطاً حراً من أعلى بناية، واستغرقت 3 ثوانٍ حتى اصطدمت بالأرض.
احسب:
1. ارتفاع البناية.
2. سرعة الكرة لحظة الاصطدام واتجاهها.
3. سرعة الكرة وارتفاعها بعد مرور ثانية واحدة من سقوطها.

## الحلول

| الجزء | المعادلة | التعويض | النتيجة |
|---|---|---|---|
| 1 | Δy = ½·g·t² | ½·(−10)·(3)² | Δy = −45 m ⟹ h = +45 m |
| 2 | vf = vᵢ + g·t | 0 + (−10)·(3) | vf = −30 m/s (نحو الأسفل ↓) |
| 3-أ | vf = vᵢ + g·t | 0 + (−10)·(1) | vf = −10 m/s |
| 3-ب | Δy = ½·g·t² | ½·(−10)·(1)² | Δy = −5 m |
| 3-ج | h = H − \|Δy\| | 45 − 5 | h = +40 m |

## التقنيات المستعملة

- **Next.js 16** مع App Router
- **React 19** + **TypeScript 5**
- **Three.js** + **@react-three/fiber** + **@react-three/drei** للمشهد ثلاثي الأبعاد
- **Tailwind CSS v4** + **shadcn/ui** للواجهة
- **SVG مخصّص** للرسوم البيانية المتزامنة
- **خط Cairo** من Google Fonts للنصوص العربية

## الميزات

- مشهد ثلاثي الأبعاد واقعي: مبنى بارتفاع 45م، سماء، أرض، كرة ساقطة
- متجهات ملوّنة: سهم السرعة (أحمر) وسهم التعجيل g (أزرق)
- مسطرة جانبية تُظهر الارتفاع الحي
- أثر مسار الكرة أثناء السقوط
- لوحة قيم رقمية لحظية (t, vᵢ, vf, Δy, h, g)
- رسومان بيانيان متزامنان: Δy–t و vf–t مع نقطة متحركة
- شريط زمني قابل للسحب من 0 إلى 3s
- أزرار تحكم: تشغيل/إيقاف، إعادة الضبط، السابق/التالي
- زر «اعرض الحل» يكشف التعويضات خطوة بخطوة
- دعم كامل لـ RTL مع النصوص العربية، والمعادلات بـ LTR

## حدود المنهج (مُلتزم بها)

- **g = −10 m/s²** ثابتة (قيمة المنهج)
- **vᵢ = 0** مفروضة دائماً (شرط السقوط الحر)
- المعادلات الثلاث فقط: `vf = g·t`, `Δy = ½·g·t²`, `vf = √(2·g·Δy)`
- لا توجد إشارة لمقاومة الهواء أو القذف المائل أو F=ma
- نتوقف عند لحظة الاصطدام (لا ارتداد)



## البنية

```
src/
├── app/
│   ├── layout.tsx              # جذر RTL + خط Cairo
│   ├── page.tsx                # الصفحة الرئيسية
│   └── globals.css             # Tailwind + متغيرات اللون
├── components/
│   ├── scene/                  # مكونات المشهد ثلاثي الأبعاد
│   │   ├── FreeFallCanvas.tsx
│   │   ├── Building.tsx
│   │   ├── Ground.tsx
│   │   ├── Sky.tsx
│   │   ├── Ball.tsx
│   │   ├── VelocityArrow.tsx
│   │   ├── GravityArrow.tsx
│   │   ├── HeightRuler.tsx
│   │   ├── TraceLine.tsx
│   │   └── SceneLabels.tsx
│   ├── ui/physics/             # مكونات لوحة الشرح
│   │   ├── Tabs.tsx
│   │   ├── StepPanel.tsx
│   │   ├── ValuePanel.tsx
│   │   ├── EquationPanel.tsx
│   │   ├── MiniGraph.tsx
│   │   ├── Controls.tsx
│   │   └── Timeline.tsx
│   └── FreeFallApp.tsx         # المكوّن الجامع
├── lib/
│   ├── physics.ts              # الدوال الحركية
│   ├── constants.ts            # ثوابت المنهج
│   └── equations.ts            # نصوص المعادلات
└── hooks/
    └── useFreeFall.ts          # إدارة الحالة
```

## المرجع

- كتاب الفيزياء، الصف الخامس علمي، الفصل الثاني (الحركة الخطية)، صفحة 42 — المثال 3.
