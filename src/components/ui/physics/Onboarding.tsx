// ============================================================
// Onboarding — دليل بداية تفاعلي للموقع
// يظهر عند أول زيارة، يشرح المثال وكيفية استخدام الموقع
// يمكن إعادة تشغيله عبر زر «المساعدة» في الرأس
// ============================================================

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
    icon: <GraduationCap className="w-12 h-12 text-sky-600" />,
    title: 'مرحباً بك في درس السقوط الحر',
    body: (
      <div className="space-y-3 text-slate-700 leading-relaxed">
        <p>
          هذا الموقع التفاعلي يشرح <strong>المثال 3</strong> من الفصل الثاني
          (الحركة الخطية) في كتاب الفيزياء للصف الخامس العلمي — صفحة 42.
        </p>
        <div className="bg-sky-50 border-r-4 border-sky-500 p-3 rounded text-sm">
          <strong className="text-sky-700">المسألة:</strong> سقطت كرة سقوطاً حراً
          من أعلى بناية، واستغرقت <span dir="ltr" className="font-mono font-bold">3 s</span> حتى
          اصطدمت بالأرض. سنحسب:
          <ol className="mt-2 space-y-1 pr-4">
            <li>1. ارتفاع البناية</li>
            <li>2. سرعة الكرة لحظة الاصطدام</li>
            <li>3. سرعة الكرة وارتفاعها بعد ثانية واحدة</li>
          </ol>
        </div>
      </div>
    ),
  },
  {
    icon: <Building2 className="w-12 h-12 text-amber-600" />,
    title: 'المشهد ثلاثي الأبعاد',
    body: (
      <div className="space-y-3 text-slate-700 leading-relaxed">
        <p>
          أمامك مشهد ثلاثي الأبعاد يحتوي على:
        </p>
        <ul className="space-y-2 pr-2">
          <li className="flex items-start gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-400 mt-1.5 shrink-0" />
            <span><strong>المبنى</strong> بارتفاع 45م مع نوافذ مضيئة</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500 mt-1.5 shrink-0" />
            <span><strong>كرة برتقالية</strong> تسقط أمام المبنى (مرئية طوال السقوط)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 mt-1.5 shrink-0" />
            <span><strong>سهم أحمر</strong> = متجه السرعة vf (يكبر مع السقوط)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 mt-1.5 shrink-0" />
            <span><strong>سهم أزرق</strong> = متجه التعجيل g (ثابت)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 mt-1.5 shrink-0" />
            <span><strong>مسطرة جانبية</strong> تُظهر الارتفاع الحي h</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    icon: <MousePointerClick className="w-12 h-12 text-purple-600" />,
    title: 'كيف تتحكم بالكاميرا',
    body: (
      <div className="space-y-3 text-slate-700 leading-relaxed">
        <p>
          يمكنك التحكم بزاوية الرؤية بحرّية:
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg">
            <MousePointerClick className="w-6 h-6 text-purple-600 shrink-0" />
            <div>
              <strong>السحب بالماوس</strong>
              <p className="text-sm text-slate-600">اسحب لتدوير المشهد يميناً ويساراً ولأعلى ولأسفل</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg">
            <span className="text-2xl">🖱️</span>
            <div>
              <strong>عجلة الماوس</strong>
              <p className="text-sm text-slate-600">للتقريب والتبعيد من المشهد</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: <Eye className="w-12 h-12 text-emerald-600" />,
    title: 'التبويبات الثلاثة',
    body: (
      <div className="space-y-3 text-slate-700 leading-relaxed">
        <p>
          استعمل التبويبات الثلاثة في الأعلى لاستكشاف أجزاء الحل الثلاثة:
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded-lg border-r-4 border-emerald-500">
            <span className="font-bold text-emerald-700 text-lg">1</span>
            <div>
              <strong>ارتفاع البناية</strong>
              <p className="text-sm text-slate-600">حساب h من معادلة Δy = ½·g·t²</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded-lg border-r-4 border-emerald-500">
            <span className="font-bold text-emerald-700 text-lg">2</span>
            <div>
              <strong>سرعة الاصطدام</strong>
              <p className="text-sm text-slate-600">حساب vf من معادلة vf = g·t</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded-lg border-r-4 border-emerald-500">
            <span className="font-bold text-emerald-700 text-lg">3</span>
            <div>
              <strong>بعد 1 ثانية</strong>
              <p className="text-sm text-slate-600">حساب vf و h عند t = 1s</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: <PlayCircle className="w-12 h-12 text-rose-600" />,
    title: 'كيف تبدأ',
    body: (
      <div className="space-y-3 text-slate-700 leading-relaxed">
        <p>للبدء، اتبع هذه الخطوات:</p>
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-rose-50 p-3 rounded-lg">
            <PlayCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong>اضغط زر «تشغيل»</strong>
              <p className="text-sm text-slate-600">لمشاهدة الكرة تسقط من قمة المبنى إلى الأرض</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-rose-50 p-3 rounded-lg">
            <Eye className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong>اضغط زر «اعرض الحل»</strong>
              <p className="text-sm text-slate-600">لكشف خطوات التعويض في المعادلة تباعاً</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-rose-50 p-3 rounded-lg">
            <span className="text-2xl shrink-0">⏱️</span>
            <div>
              <strong>اسحب شريط الزمن</strong>
              <p className="text-sm text-slate-600">للتنقل بين لحظات السقوط ورؤية القيم اللحظية</p>
            </div>
          </div>
        </div>
        <div className="bg-amber-50 border-r-4 border-amber-400 p-3 rounded text-sm mt-4">
          <strong className="text-amber-700">ملاحظة:</strong> القيم في اللوحة
          تتحوّل للون <span className="text-green-600 font-bold">الأخضر ✓</span> عندما
          تطابق قيمة الحل الصحيحة.
        </div>
      </div>
    ),
  },
];

export function Onboarding() {
  // تهيئة كسولة: تُقرأ من localStorage مرة واحدة عند التحميل
  // (المكوّن يُحمّل بـ ssr: false من FreeFallApp، لذا localStorage متاح دائماً)
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    try {
      return !localStorage.getItem(STORAGE_KEY);
    } catch {
      return true;
    }
  });
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // تجاهل
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

  const handleSkip = () => {
    handleClose();
  };

  // إعادة تشغيل الدليل
  const restart = () => {
    setCurrentSlide(0);
    setIsOpen(true);
  };

  const slide = slides[currentSlide];
  const isLast = currentSlide === slides.length - 1;

  return (
    <>
      {/* زر المساعدة — يظهر دائماً في الرأس لإعادة تشغيل الدليل */}
      <OnboardingTrigger onTrigger={restart} />

      {/* النافذة المنبثقة */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <Card
            className="max-w-2xl w-full bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* الرأس */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-l from-sky-50 to-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow">
                  {currentSlide + 1}
                </div>
                <span className="text-sm text-slate-500">
                  خطوة {currentSlide + 1} من {slides.length}
                </span>
              </div>
              <button
                onClick={handleSkip}
                className="text-slate-400 hover:text-slate-600 p-1 rounded transition-colors"
                title="تخطّي الدليل"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* المحتوى */}
            <div className="p-8 min-h-[320px]">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-2xl bg-slate-50">
                  {slide.icon}
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  {slide.title}
                </h2>
                <div className="text-right w-full">
                  {slide.body}
                </div>
              </div>
            </div>

            {/* شريط التقدّم */}
            <div className="px-8 pb-2">
              <div className="flex items-center gap-1.5">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentSlide
                        ? 'w-8 bg-sky-600'
                        : i < currentSlide
                        ? 'w-1.5 bg-sky-300'
                        : 'w-1.5 bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* أزرار التحكم */}
            <div className="flex items-center justify-between p-4 border-t border-slate-200 bg-slate-50">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrev}
                disabled={currentSlide === 0}
                className="flex items-center gap-1"
              >
                <ChevronRight className="w-4 h-4" />
                السابق
              </Button>

              <button
                onClick={handleSkip}
                className="text-xs text-slate-500 hover:text-slate-700"
              >
                تخطّي الدليل
              </button>

              <Button
                onClick={handleNext}
                size="sm"
                className="flex items-center gap-1 bg-sky-600 hover:bg-sky-700 text-white"
              >
                {isLast ? (
                  <>ابدأ التعلم</>
                ) : (
                  <>
                    التالي
                    <ChevronLeft className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

// زر المساعدة — يُدمج في الرأس
function OnboardingTrigger({ onTrigger }: { onTrigger: () => void }) {
  return (
    <button
      onClick={onTrigger}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors"
      title="إعادة عرض دليل البداية"
    >
      <HelpCircle className="w-4 h-4" />
      دليل الاستخدام
    </button>
  );
}
