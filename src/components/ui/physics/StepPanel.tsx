// ============================================================
// StepPanel — لوحة شرح كل تبويب
// نص الشرح + المعطيات + الهدف
// ============================================================

'use client';

import { Card } from '@/components/ui/card';
import { Target, BookOpen } from 'lucide-react';
import type { TabId } from '@/hooks/useFreeFall';

interface StepPanelProps {
  activeTab: TabId;
}

const TAB_CONTENT: Record<TabId, {
  title: string;
  goal: string;
  given: string[];
  explanation: string;
  concept: string;
}> = {
  1: {
    title: 'الجزء الأول: حساب ارتفاع البناية',
    goal: 'إيجاد ارتفاع البناية h انطلاقاً من مدة السقوط الكلية t = 3 s',
    given: [
      'مدة السقوط الكلية: t = 3 s',
      'تعجيل الجاذبية: g = −10 m/s²',
      'السرعة الابتدائية: vᵢ = 0 (سقوط حر)',
    ],
    explanation:
      'في السقوط الحر تكون vᵢ = 0 دائماً. نستعمل معادلة الإزاحة-الزمن لإيجاد الإزاحة الكلية Δy خلال 3 ثوانٍ. الإشارة السالبة للإزاحة تعني اتجاهها نحو الأسفل، لذلك يكون ارتفاع البناية موجباً ويساوي القيمة المطلقة للإزاحة.',
    concept: 'معادلة الإزاحة في السقوط الحر: Δy = ½·g·t²',
  },
  2: {
    title: 'الجزء الثاني: سرعة الكرة لحظة الاصطدام',
    goal: 'إيجاد السرعة اللحظية vf عند لحظة اصطدام الكرة بالأرض واتجاهها',
    given: [
      'مدة السقوط الكلية: t = 3 s',
      'تعجيل الجاذبية: g = −10 m/s²',
      'السرعة الابتدائية: vᵢ = 0',
    ],
    explanation:
      'نستعمل معادلة السرعة-الزمن لإيجاد vf عند t = 3 s. الإشارة السالبة لـ vf تعني أن اتجاه السرعة نحو الأسفل، وهو الاتجاه نفسه لتعجيل الجاذبية g. هذا يوضح أن السرعة تزداد خطياً مع الزمن لأن g ثابت.',
    concept: 'معادلة السرعة في السقوط الحر: vf = g·t (لأن vᵢ = 0)',
  },
  3: {
    title: 'الجزء الثالث: السرعة والارتفاع بعد 1 ثانية',
    goal: 'عند t = 1 s، إيجاد vf و h (الارتفاع فوق سطح الأرض)',
    given: [
      'اللحظة الزمنية: t = 1 s',
      'تعجيل الجاذبية: g = −10 m/s²',
      'السرعة الابتدائية: vᵢ = 0',
      'ارتفاع البناية: h = 45 m (من الجزء الأول)',
    ],
    explanation:
      'نحسب أولاً السرعة اللحظية vf عند t = 1 s، ثم نحسب الإزاحة Δy خلال الثانية الأولى. بعد ذلك نطرح الإزاحة من ارتفاع البناية لنحصل على الارتفاع فوق سطح الأرض في تلك اللحظة. لاحظ أن الكرة قطعت 5 m فقط في الثانية الأولى، لكنها ستقطع 25 m في الثانية الثالثة — السرعة تزداد مع الزمن.',
    concept: 'حل جزأين متتابعين: السرعة، ثم الإزاحة، ثم الارتفاع المتبقي.',
  },
};

export function StepPanel({ activeTab }: StepPanelProps) {
  const content = TAB_CONTENT[activeTab];

  return (
    <Card className="p-4 bg-white shadow-sm">
      <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2 border-b pb-2">
        <BookOpen className="w-4 h-4 text-sky-600" />
        {content.title}
      </h3>

      {/* الهدف */}
      <div className="mb-3 p-2.5 bg-sky-50 border-r-4 border-sky-500 rounded text-xs text-slate-700 leading-relaxed flex items-start gap-2">
        <Target className="w-3.5 h-3.5 text-sky-600 mt-0.5 shrink-0" />
        <span><strong className="text-sky-700">الهدف:</strong> {content.goal}</span>
      </div>

      {/* المعطيات */}
      <div className="mb-3">
        <div className="text-xs font-bold text-slate-600 mb-1.5">المعطيات:</div>
        <ul className="space-y-1" dir="rtl">
          {content.given.map((g, i) => (
            <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
              <span className="text-sky-600 font-bold">•</span>
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* الشرح */}
      <div className="mb-3 p-2.5 bg-slate-50 rounded text-xs text-slate-700 leading-relaxed">
        {content.explanation}
      </div>

      {/* المفهوم */}
      <div className="p-2.5 bg-amber-50 border-r-4 border-amber-400 rounded">
        <div className="text-[11px] font-bold text-amber-700 mb-1">المفهوم المستعمل:</div>
        <div className="text-sm text-slate-800 font-mono" dir="ltr">
          {content.concept}
        </div>
      </div>
    </Card>
  );
}
