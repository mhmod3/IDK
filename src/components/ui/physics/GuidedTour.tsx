'use client';

import React, { useState, useEffect } from 'react';
import {
  Compass,
  Play,
  RotateCcw,
  Layers,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  HelpCircle,
  Eye,
  Sliders,
} from 'lucide-react';
import { MathText } from '@/components/ui/physics/MathText';

const STORAGE_KEY = 'free-fall-guided-tour-seen-v1';

export type TourStepId = 'intro' | 'scene3d' | 'controls' | 'curriculum' | 'telemetry';

export interface TourStep {
  id: TourStepId;
  targetId: string;
  title: string;
  tagline: string;
  description: string;
  actionTip: string;
  highlightZone: 'viewport' | 'dock' | 'tabs' | 'telemetry' | 'center';
  badge: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'intro',
    targetId: 'tour-header',
    title: 'مختبر السقوط الحر: المثال 3',
    tagline: 'كتاب الفيزياء (الصف الخامس العلمي) ص 42',
    description:
      'أهلاً بك يا بطل! تم تصميم هذا المختبر ليحول مسألة السقوط الحر من مجرد أرقام جافة إلى تجربة حية تراها وتتحكم بكل ثانية فيها.',
    actionTip: 'المسألة: سقطت كرة من قمة بناية واستغرقت 3 ثوانٍ حتى ارتطمت بالأرض.',
    highlightZone: 'center',
    badge: 'البداية',
  },
  {
    id: 'scene3d',
    targetId: 'tour-viewport-box',
    title: 'المشهد التفاعلي والمتجهات',
    tagline: 'راقب حركة الكرة وتغير المتجهات لحظياً',
    description:
      'المبنى بارتفاع 45 متراً. الكرة تسقط من السكون. السهم الأحمر يمثل متجه السرعة vf ويزداد طوله نزولاً، بينما السهم الأزرق هو تعجيل الجاذبية g الثابت نحو الأسفل.',
    actionTip: 'يمكنك تدوير الكاميرا بالماوس، وتحريكها بالزر الأيمن، والتقريب بالعجلة.',
    highlightZone: 'viewport',
    badge: 'فضاء 3D',
  },
  {
    id: 'controls',
    targetId: 'tour-transport-dock',
    title: 'غرفة التحكم والشريط الزمني',
    tagline: 'أنت المتحكم في سريان الوقت',
    description:
      'شغل السقوط لترى الحركة في الوقت الحقيقي، أو اسحب الشريط الزمني للتوقف عند أي لحظة بين 0 و 3 ثوانٍ لفحص الحالة الفيزيائية بدقة.',
    actionTip: 'جرب أزرار الإيقاف والخطوة و«إعادة الكرة للقمة» في أي وقت.',
    highlightZone: 'dock',
    badge: 'شريط الزمن',
  },
  {
    id: 'curriculum',
    targetId: 'tour-solution-studio',
    title: 'مطالب المسألة وخطوات الحل',
    tagline: 'التبويبات الثلاثة المنهجية',
    description:
      'اختر المطلب: (1) ارتفاع البناية، (2) سرعة الاصطدام، أو (3) الحالة بعد ثانية واحدة. ثم اضغط «اعرض الحل» لتكشف القانون والتعويض والناتج خطوة بخطوة.',
    actionTip: 'يكشف زر الحل التعويض الجبري بالتدريج لترسيخ خطوات الامتحان.',
    highlightZone: 'tabs',
    badge: 'خطوات الحل',
  },
  {
    id: 'telemetry',
    targetId: 'tour-telemetry-panel',
    title: 'لوحة القياسات الآنية (Telemetry)',
    tagline: 'أرقامك الحية مطابقة تماماً للمنهج',
    description:
      'راقب عدادات الزمن، الإزاحة، الارتفاع المتبقي، والسرعة اللحظية. عندما تصل الكرة إلى اللحظة المستهدفة للمطلب، ستضيء الخانة باللون الأخضر تأكيداً للحل.',
    actionTip: 'لاحظ كيف تظل السرعة سالبة لأن اتجاهها نحو الأسفل.',
    highlightZone: 'telemetry',
    badge: 'العدادات اللحظية',
  },
];

interface GuidedTourProps {
  isOpen: boolean;
  onClose: () => void;
  onHighlightChange?: (zone: TourStep['highlightZone']) => void;
}

export function GuidedTour({ isOpen, onClose, onHighlightChange }: GuidedTourProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const step = TOUR_STEPS[currentIdx];
  const isFirst = currentIdx === 0;
  const isLast = currentIdx === TOUR_STEPS.length - 1;

  useEffect(() => {
    if (isOpen && onHighlightChange) {
      onHighlightChange(step.highlightZone);
    }
  }, [isOpen, currentIdx, step.highlightZone, onHighlightChange]);

  const handleNext = () => {
    if (isLast) {
      handleComplete();
    } else {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore
    }
    onClose();
  };

  const handleJumpToStep = (index: number) => {
    setCurrentIdx(index);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm transition-all"
      dir="rtl"
      onClick={handleComplete}
    >
      {/* Interactive Card */}
      <div
        className="relative max-w-xl w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Band */}
        <div className="h-1 bg-gradient-to-r from-sky-500 via-amber-400 to-rose-500" />

        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-slate-800/80 bg-slate-950/90 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400">
                جولة إرشادية للمختبر
              </span>
              <span className="text-slate-600 mx-1.5">•</span>
              <span className="text-[11px] font-semibold text-sky-400 font-mono">
                {currentIdx + 1} / {TOUR_STEPS.length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300">
              {step.badge}
            </span>
            <button
              onClick={handleComplete}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800/60 transition-colors cursor-pointer"
              title="إغلاق والتخطي"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Step Title & Tagline */}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white font-arabic tracking-tight mb-1">
              {step.title}
            </h2>
            <p className="text-xs text-sky-400/90 font-arabic">
              {step.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-arabic">
            {step.description}
          </p>

          {/* Action Tip Pill Box */}
          <div className="bg-slate-950 border border-slate-800/90 rounded-lg p-3 text-xs flex items-start gap-2.5 text-slate-300 font-arabic">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <div className="leading-relaxed">
              <strong className="text-amber-300 font-medium ml-1">تلميح فيزيائي:</strong>
              <span>{step.actionTip}</span>
            </div>
          </div>

          {/* Step Pill Navigator Dots */}
          <div className="flex items-center justify-center gap-2 pt-2" dir="ltr">
            {TOUR_STEPS.map((s, idx) => {
              const active = idx === currentIdx;
              const visited = idx < currentIdx;
              return (
                <button
                  key={s.id}
                  onClick={() => handleJumpToStep(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    active
                      ? 'w-7 bg-sky-400'
                      : visited
                      ? 'w-2 bg-sky-800/80 hover:bg-sky-700'
                      : 'w-2 bg-slate-800 hover:bg-slate-700'
                  }`}
                  title={s.title}
                />
              );
            })}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded border transition-colors cursor-pointer ${
              isFirst
                ? 'opacity-30 border-transparent text-slate-600 pointer-events-none'
                : 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700'
            }`}
          >
            <ChevronRight className="w-3.5 h-3.5" />
            <span>السابق</span>
          </button>

          <button
            onClick={handleComplete}
            className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer font-arabic"
          >
            تخطي الجولة واستكشف بنفسك
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-sm transition-all cursor-pointer"
          >
            {isLast ? (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>ابدأ التجربة</span>
              </>
            ) : (
              <>
                <span>التالي</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Onboarding Trigger Button for the Header Bar
 */
export function GuidedTourButton({ onTrigger }: { onTrigger: () => void }) {
  return (
    <button
      onClick={onTrigger}
      type="button"
      className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 rounded transition-colors cursor-pointer font-arabic"
      title="جولة إرشادية سريعة في المختبر"
    >
      <Compass className="w-3.5 h-3.5 text-sky-400" />
      <span>جولة المختبر</span>
    </button>
  );
}
