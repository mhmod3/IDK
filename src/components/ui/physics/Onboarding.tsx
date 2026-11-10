'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Building2,
  MousePointerClick,
  Eye,
  PlayCircle,
  GraduationCap,
  HelpCircle,
} from 'lucide-react';

const STORAGE_KEY = 'free-fall-onboarding-completed';

interface Slide {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
}

const slides: Slide[] = [
  {
    icon: <GraduationCap className="w-10 h-10 text-sky-400" />,
    title: 'منظومة السقوط الحر التفاعلية',
    body: (
      <div className="space-y-3 text-slate-300 leading-relaxed text-xs sm:text-sm">
        <p>
          تم تصميم هذه المنظومة لشرح <strong>المثال 3</strong> من الفصل الثاني
          (الحركة الخطية) في كتاب الفيزياء للصف الخامس العلمي، صفحة 42.
        </p>
        <div className="bg-slate-950 border border-slate-800 p-3 rounded text-xs space-y-1.5">
          <strong className="text-sky-400">المسألة المقررة:</strong> سقطت كرة سقوطا حرا
          من أعلى بناية، واستغرقت <span dir="ltr" className="font-telemetry font-bold text-sky-300">3 s</span> حتى
          اصطدمت بالأرض. يتم استخراج:
          <ol className="mt-2 space-y-1 pr-4 text-slate-300">
            <li>1. ارتفاع البناية h = 45 m</li>
            <li>2. سرعة الاصطدام vf = -30 m/s</li>
            <li>3. السرعة والارتفاع بعد مرور ثانية واحدة vf = -10 m/s, h = 40 m</li>
          </ol>
        </div>
      </div>
    ),
  },
  {
    icon: <Building2 className="w-10 h-10 text-amber-400" />,
    title: 'المحاكاة ثلاثية الأبعاد',
    body: (
      <div className="space-y-2.5 text-slate-300 leading-relaxed text-xs sm:text-sm">
        <p>عناصر المشهد الفيزيائي:</p>
        <ul className="space-y-2 pr-2 text-xs">
          <li className="flex items-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500 mt-1 shrink-0" />
            <span><strong>المبنى:</strong> بارتفاع 45 مترا مع شبكة قياس أرضية.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0" />
            <span><strong>الكرة:</strong> تسقط سقوطا حرا من السكون (vi = 0).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1 shrink-0" />
            <span><strong>المتجه الأحمر:</strong> متجه السرعة اللحظية vf (يزداد طوله مع النزول).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 mt-1 shrink-0" />
            <span><strong>المتجه الأزرق:</strong> متجه تعجيل الجاذبية g (ثابت المقدار والاتجاه = -10).</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    icon: <MousePointerClick className="w-10 h-10 text-purple-400" />,
    title: 'التحكم بالكاميرا',
    body: (
      <div className="space-y-2.5 text-slate-300 leading-relaxed text-xs sm:text-sm">
        <p>آلية استكشاف المشهد الفراغي:</p>
        <div className="space-y-2 text-xs">
          <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
            <strong className="text-slate-100">الزر الأيسر:</strong> تدوير زاوية المشهد ثلاثي الأبعاد بحرية.
          </div>
          <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
            <strong className="text-slate-100">الزر الأيمن:</strong> تحريك موضع الكاميرا أفقيا ورأسيا (Pan).
          </div>
          <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
            <strong className="text-slate-100">عجلة التمرير:</strong> التقريب والتبعيد نحو موضع المؤشر.
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: <Eye className="w-10 h-10 text-emerald-400" />,
    title: 'مطالب المسألة الثلاثة',
    body: (
      <div className="space-y-2.5 text-slate-300 leading-relaxed text-xs sm:text-sm">
        <p>التبويبات العلوية تنقلك بين مطالب المنهج:</p>
        <div className="space-y-1.5 text-xs">
          <div className="p-2 rounded bg-slate-950 border border-slate-800">
            <strong className="text-amber-300">المطلب 1:</strong> حساب ارتفاع البناية h من علاقة الإزاحة Delta y = 0.5 * g * t^2.
          </div>
          <div className="p-2 rounded bg-slate-950 border border-slate-800">
            <strong className="text-rose-300">المطلب 2:</strong> حساب سرعة الاصطدام vf = g * t عند t = 3s.
          </div>
          <div className="p-2 rounded bg-slate-950 border border-slate-800">
            <strong className="text-sky-300">المطلب 3:</strong> حساب vf و h عند اللحظة الزمنية t = 1s.
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: <PlayCircle className="w-10 h-10 text-rose-400" />,
    title: 'طريقة التشغيل والتحقق',
    body: (
      <div className="space-y-2.5 text-slate-300 leading-relaxed text-xs sm:text-sm">
        <ul className="space-y-2 pr-2 text-xs">
          <li className="flex items-start gap-2">
            <span className="font-mono text-sky-400">[1]</span>
            <span>اضغط <strong>تشغيل المحاكاة</strong> لمراقبة السقوط وتغير المتجهات المتزامن.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono text-sky-400">[2]</span>
            <span>اسحب <strong>شريط الزمن</strong> للتوقف عند أي لحظة وفحص القيم الحركية.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono text-sky-400">[3]</span>
            <span>اضغط <strong>اعرض التعويض العددي</strong> لكشف خطوات الحل الجبري تدريجيا.</span>
          </li>
        </ul>
      </div>
    ),
  },
];

export function Onboarding() {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    try {
      return !localStorage.getItem(STORAGE_KEY);
    } catch {
      return false;
    }
  });
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore
    }
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((s) => s + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((s) => s - 1);
    }
  };

  const slide = slides[currentSlide];
  const isLast = currentSlide === slides.length - 1;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={handleClose}
      dir="rtl"
    >
      <div
        className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-sky-600/30 border border-sky-500/50 flex items-center justify-center text-sky-300 font-mono text-xs font-bold">
              {currentSlide + 1}
            </span>
            <span className="text-xs font-mono text-slate-400">
              خطوة {currentSlide + 1} من {slides.length}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
            title="إغلاق الدليل"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Slide Body */}
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
              {slide.icon}
            </div>
            <h2 className="text-base font-bold text-slate-100 mb-3">
              {slide.title}
            </h2>
            <div className="text-right w-full">
              {slide.body}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-2" dir="ltr">
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i === currentSlide
                    ? 'w-8 bg-sky-500'
                    : i < currentSlide
                    ? 'w-2 bg-sky-800'
                    : 'w-2 bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between p-3.5 border-t border-slate-800 bg-slate-950">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className="flex items-center gap-1 text-slate-400 hover:text-white"
          >
            <ChevronRight className="w-4 h-4" />
            السابق
          </Button>

          <button
            onClick={handleClose}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            تخطي
          </button>

          <Button
            onClick={handleNext}
            size="sm"
            className="flex items-center gap-1 bg-sky-600 hover:bg-sky-500 text-white"
          >
            {isLast ? (
              <span>ابدأ الآن</span>
            ) : (
              <>
                التالي
                <ChevronLeft className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function OnboardingTriggerButton({ onTrigger }: { onTrigger: () => void }) {
  return (
    <button
      onClick={onTrigger}
      type="button"
      className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded transition-colors cursor-pointer"
      title="دليل الاستخدام والتشغيل"
    >
      <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
      <span>دليل الاستخدام</span>
    </button>
  );
}
