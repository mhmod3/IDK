# AGENTS.md - دليل المشروع

> **الهدف من هذا الملف:** مرجع سريع لأي مطور أو وكيل ذكي يريد فهم المشروع وتعديله دون قراءة كل ملف.

---

## 1. فكرة المشروع (مبسطة)

موقع **تعليمي تفاعلي ثلاثي الأبعاد** يشرح **المثال 3 (السقوط الحر)** من كتاب الفيزياء للصف الخامس العلمي - الفصل الثاني، صفحة 42.

**المسألة:** سقطت كرة سقوطا حرا من قمة بناية واستغرقت 3 ثوان للوصول للأرض.
الموقع يحل ثلاثة أجزاء:
1. ارتفاع البناية (h = 45 m)
2. سرعة الاصطدام (vf = −30 m/s)
3. السرعة والارتفاع بعد 1 ثانية (vf = −10 m/s، h = 40 m)

**التقنيات:** Next.js 16 + TypeScript + React Three Fiber + Tailwind v4 + shadcn/ui

---

## 2. بنية المشروع

```
free-fall-3d/
├── AGENTS.md                    <- هذا الملف
├── README.md                    <- وثيقة المشروع للمستخدم
├── package.json                 <- الحزم والسكربتات
├── next.config.ts               <- إعدادات Next.js
├── tsconfig.json                <- إعدادات TypeScript
├── tailwind.config.ts           <- إعدادات Tailwind v4
├── postcss.config.mjs           <- إعدادات PostCSS
├── eslint.config.mjs            <- إعدادات ESLint
├── components.json              <- إعدادات shadcn/ui
│
├── public/
│   ├── logo.svg                 <- شعار الموقع
│   └── robots.txt               <- إعدادات محركات البحث
│
└── src/
    ├── app/
    │   ├── layout.tsx           <- جذر الصفحة: RTL + خطوط IBM Plex Sans Arabic و Cairo و STIX Two Math
    │   ├── page.tsx             <- الصفحة الرئيسية (تستدعي FreeFallApp)
    │   └── globals.css          <- Tailwind + متغيرات التصميم والطباعة
    │
    ├── components/
    │   ├── FreeFallApp.tsx      <- المكون الجامع: يربط الحالة + Canvas + UI + Onboarding
    │   │
    │   ├── scene/               <- مكونات المشهد ثلاثي الأبعاد (R3F)
    │   │   ├── FreeFallCanvas.tsx   <- حاوية <Canvas> + الكاميرا + الإضاءة + OrbitControls
    │   │   ├── Building.tsx         <- المبنى (صندوق 6x6x45 + نوافذ + باب)
    │   │   ├── Ground.tsx           <- سطح الأرض (دائرة + شبكية)
    │   │   ├── Sky.tsx              <- السماء (Sky من drei + ضباب)
    │   │   ├── Ball.tsx             <- الكرة الساقطة + تأثير الاصطدام
    │   │   ├── VelocityArrow.tsx   <- سهم السرعة vf (أحمر، طول متغير، تحت الكرة مباشرة)
    │   │   ├── GravityArrow.tsx    <- سهم التعجيل g (أزرق، ثابت، جانب الكرة)
    │   │   ├── HeightRuler.tsx     <- مسطرة جانبية + خط عمودي تحت الكرة
    │   │   ├── TraceLine.tsx       <- أثر مسار الكرة (خط منقط)
    │   │   └── SceneLabels.tsx     <- تسميات Text فوق الكرة (t, vf, h, g)
    │   │
    │   ├── ui/physics/          <- مكونات لوحة الشرح (Tailwind + shadcn)
    │   │   ├── QuestionCard.tsx     <- بطاقة نص المسألة والمعطيات المنهجية
    │   │   ├── Tabs.tsx             <- التبويبات الثلاثة
    │   │   ├── StepPanel.tsx        <- لوحة شرح كل تبويب (الهدف + المعطيات + الشرح)
    │   │   ├── ValuePanel.tsx       <- جدول القياسات الآنية وتذييل الثوابت
    │   │   ├── EquationPanel.tsx    <- المعادلات + زر «اعرض الحل» (3 طبقات)
    │   │   ├── MathText.tsx         <- محرك تنضيد رياضي عالي الدقة (LaTeX/Math typography)
    │   │   ├── MiniGraph.tsx        <- رسمان SVG: Δy–t و vf–t
    │   │   ├── Controls.tsx         <- أزرار: السابق/التالي/تشغيل/إعادة الضبط
    │   │   ├── Timeline.tsx         <- شريط زمني تفاعلي (0->3s مع تحكم LTR دقيق)
    │   │   └── Onboarding.tsx       <- دليل بداية تفاعلي (5 شرائح)
    │   │
    │   └── ui/                  <- مكونات shadcn/ui القياسية (button, card, ...)
    │
    ├── hooks/
    │   ├── useFreeFall.ts       <- hook إدارة الحالة (t, isPlaying, activeTab, solutionStep)
    │   ├── use-mobile.ts        <- كشف الجوال (shadcn)
    │   └── use-toast.ts         <- toast notifications (shadcn)
    │
    └── lib/
        ├── constants.ts         <- ثوابت المنهج (g, t, h, BALL_X, BALL_Z, إعدادات الكاميرا)
        ├── physics.ts           <- الدوال الحركية (displacement, velocity, heightAboveGround)
        ├── equations.ts         <- نصوص ومعادلات الحل لكل تبويب
        └── utils.ts             <- دالة cn لدمج classes (shadcn)
```

---

## 3. شرح مختصر لكل ملف رئيسي

| الملف | الوظيفة (سطر واحد) |
|---|---|
| `constants.ts` | كل ثوابت المنهج: g=−10، t=3s، h=45m، موضع الكرة والكاميرا |
| `physics.ts` | دوال حسابية: `displacement(t)`, `velocity(t)`, `heightAboveGround(t)` |
| `equations.ts` | نصوص المعادلات المعروضة في الواجهة لكل تبويب |
| `useFreeFall.ts` | hook يدير: الزمن، التشغيل، التبويب الحالي، خطوات الحل |
| `FreeFallApp.tsx` | المكون الجامع الذي يربط كل شيء معا |
| `FreeFallCanvas.tsx` | حاوية `<Canvas>` + الإضاءة + الكاميرا + OrbitControls |
| `Ball.tsx` | الكرة الساقطة مع تأثير الاصطدام (اهتزاز + وميض) |
| `Building.tsx` | المبنى: جسم + نوافذ + باب + حافة سقف |
| `HeightRuler.tsx` | مسطرة جانبية + خط عمودي برتقالي تحت الكرة |
| `VelocityArrow.tsx` | سهم أحمر = متجه السرعة (يبدأ أسفل محيط الكرة ويشير شاقوليا للأسفل) |
| `GravityArrow.tsx` | سهم أزرق = متجه التعجيل g (ثابت، إزاحة جانبية x+1.2، يشير شاقوليا للأسفل) |
| `SceneLabels.tsx` | تسميات Text فوق الكرة: t, vf, h, g بدون ترميزات خام |
| `TraceLine.tsx` | خط أثر مسار الكرة من البداية للموضع الحالي |
| `QuestionCard.tsx` | بطاقة معطيات المسألة الأصلية والهدف الفيزيائي العام |
| `Tabs.tsx` | التبويبات الثلاثة في الأعلى لاختيار المطلوب |
| `StepPanel.tsx` | شرح كل تبويب: الهدف + المعطيات + الشرح + المفهوم |
| `ValuePanel.tsx` | جدول القيم اللحظية مع تلوين أخضر عند المطابقة وتذييل الثوابت RTL |
| `EquationPanel.tsx` | المعادلات بثلاث طبقات تكشف تباعا |
| `MathText.tsx` | محرك صياغة الرموز والمتغيرات والأرقام والمحارف السفلية ووحدات القياس |
| `MiniGraph.tsx` | رسمان SVG متزامنان (Δy–t و vf–t) |
| `Controls.tsx` | أزرار التحكم الرئيسية ومفاتيح التشغيل |
| `Timeline.tsx` | شريط زمني قابل للسحب مع LTR input منعزل لمنع الانعكاس |
| `Onboarding.tsx` | دليل بداية تفاعلي (5 شرائح، localStorage) |

---

## 4. ملاحظات مهمة

### المنهج (لا يجوز تجاوزه)
- **g = −10 m/s²** ثابتة (قيمة المنهج) - لا تغير ولا تجعل قابلة للتعديل
- **vᵢ = 0** مفروضة دائما (شرط السقوط الحر)
- المعادلات الثلاث فقط: `vf = g·t`, `Δy = ½·g·t²`, `vf = √(2·g·Δy)`
- المحور y موجب لأعلى -> g و vf سالبان (نحو الأسفل)
- لا تذكر مقاومة الهواء، القذف المائل، أو F=ma
- نتوقف عند لحظة الاصطدام (لا ارتداد)

### معايير الرموز والتنضيد الرياضي
- استخدام الرموز الصافية: $v_i$ و $v_f$ (أو $vf$)، ووحدات القياس $m/s^2$ أو $m/s²$، مع منع ظهور الرموز الخام مثل `v_i` أو `m/s^2` في الواجهة أو المشهد ثلاثي الأبعاد.
- استخدام مكون `<MathText>` لتنضيد المعادلات والوحدات العلمية، مع عزل كتل الرياضيات داخل سياق LTR صريح.
- شريط التقدم الزمني في `<Timeline>` يستعمل حاوية داخلية `dir="ltr"` لعنصر `input[type="range"]` لتفادي عكس اتجاه السحب في بيئة الصفحة العربية.

### الأداء
- `tRef` (ref) يحدث كل إطار (60fps) للمشهد 3D
- حالة React `t` تحدث بتردد أقل (~15fps) لتقليل إعادة تصيير الواجهة
- مكونات المشهد مغلفة بـ `React.memo` لمنع إعادة التصيير غير الضرورية
- `Text` من drei (بدلا من `Html`) يرسم في الفضاء 3D بدون React portals

### التحكم بالكاميرا
- **زر أيسر**: تدوير المشهد
- **زر أيمن**: تحريك (Pan) في كل الاتجاهات
- **عجلة الماوس**: تقريب/تبعيد نحو موضع المؤشر (`zoomToCursor`)

### اللغة والاتجاه
- الصفحة بـ RTL (`dir="rtl"`, `lang="ar"`)
- المعادلات والأرقام بـ LTR داخل `<span dir="ltr">` أو عبر `<MathText>`
- خطوط المشروع: IBM Plex Sans Arabic للنصوص العربية، Cairo للعناوين، STIX Two Text للرموز الرياضية، و JetBrains Mono للأرقام والوحدات

### دليل البداية (Onboarding)
- يظهر تلقائيا عند أول زيارة (localStorage)
- زر «دليل الاستخدام» في الرأس لإعادة عرضه
- يحمل بـ `ssr: false` لأنه يحتاج localStorage

---

## 5. ما يجب أن تتجنبه

### فيزياء
- لا تضف معادلات خارج المنهج (لا F=ma، لا تكامل عددي، لا طاقة حركية)
- لا تغير g عن −10 m/s² (ولا تجعلها قابلة للتعديل من المستخدم)
- لا تضف مقاومة هواء أو ارتداد الكرة بعد الاصطدام
- لا تغير المعطيات (t=3s ثابتة، لا تجعل t=5s مثلا)
- لا تستعمل رموزا غير رموز الكتاب (استعمل vᵢ و vf، وليس v₀ و v)

### تقنية
- لا تستعمل `Html` من drei داخل `useFrame` المتكرر - يسبب race condition في React portals. استعمل `Text` بدلا منها.
- لا تستدع `setTState` كل إطار (60fps) - يسبب إعادة تصيير مفرطة. استعمل `tRef` للمشهد، وحدّث الحالة بتردد أقل.
- لا تضع `t` كـ prop لمكونات المشهد التي تستعمل `tRef` في `useFrame` - يسبب إعادة تصيير غير ضرورية. استعمل `React.memo`.
- لا تستعمل `useEffect` لتحديث refs بشكل متزامن.
- لا تشغل `bun run build` في بيئة التطوير - استعمل `bun run dev` فقط.

### واجهة
- لا تخلط بين RTL و LTR - النص العربي RTL، المعادلات والأرقام LTR.
- لا تترك نصوصا أو متجهات رياضية بتنسيق خام (مثل `v_i` أو `m/s^2`).
- لا تترك عناصر بلا `aria-label` أو `alt` للوصول.

---

## 6. أوامر التشغيل

```bash
npm install          # تثبيت الحزم
npm run dev          # تشغيل خادم التطوير (http://localhost:3000)
npm run lint         # فحص الكود
npm run build        # بناء نسخة الإنتاج
```

---

## 7. المرجع

- **الكتاب:** فيزياء - الصف الخامس علمي
- **الفصل:** الثاني (الحركة الخطية)
- **الصفحة:** 42 - المثال 3 (السقوط الحر)
- **المستودع:** https://github.com/mhmod3/IDK

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
