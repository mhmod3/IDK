'use client';

import React from 'react';
import type { TabId } from '@/hooks/useFreeFall';
import { MathText } from './MathText';

interface StepPanelProps {
  activeTab: TabId;
}

const TAB_DATA: Record<
  TabId,
  {
    title: string;
    goal: string;
    targetVar: string;
    given: Array<{ label: string; math: string; note?: string }>;
    explanation: string;
    physicsLaw: string;
  }
> = {
  1: {
    title: 'الجزء الأول: حساب ارتفاع البناية',
    goal: 'حساب الارتفاع الكلي للبناية (H) انطلاقاً من زمن السقوط الحر للأرض.',
    targetVar: 'h = +45 m',
    given: [
      { label: 'زمن السقوط الكلي', math: 't = 3 s' },
      { label: 'تعجيل الجاذبية', math: 'g = −10 m/s²' },
      { label: 'السرعة الابتدائية', math: 'v_i = 0 m/s', note: 'سقوط حر من السكون' },
    ],
    explanation:
      'نطبق معادلة الإزاحة بدلالة الزمن. الإشارة السالبة للإزاحة الناتجة (Δy = −45 m) تدل على أن الحركة باتجاه الأسفل، وبما أن الارتفاع مقدار قياسي موجب، فإن ارتفاع البناية h يساوي القيمة المطلقة للإزاحة: h = |Δy| = 45 m.',
    physicsLaw: 'Δy = v_i · t + ½ · g · t²  ⟹  Δy = ½ · g · t²',
  },
  2: {
    title: 'الجزء الثاني: سرعة الكرة لحظة الاصطدام',
    goal: 'حساب مقدار واتجاه السرعة النهائية (vf) للكرة عند ارتطامها بالأرض.',
    targetVar: 'v_f = −30 m/s',
    given: [
      { label: 'زمن السقوط الكلي', math: 't = 3 s' },
      { label: 'تعجيل الجاذبية', math: 'g = −10 m/s²' },
      { label: 'السرعة الابتدائية', math: 'v_i = 0 m/s' },
    ],
    explanation:
      'نطبق معادلة السرعة بدلالة الزمن. تزداد السرعة بمعدل ثابت مقداره 10 m/s في كل ثانية لأن التعجيل منتظم. الإشارة السالبة للناتج تؤكد فيزيائياً أن متجه السرعة موجه شاقولياً نحو الأسفل باتجاه الأرض.',
    physicsLaw: 'v_f = v_i + g · t  ⟹  v_f = g · t',
  },
  3: {
    title: 'الجزء الثالث: السرعة والارتفاع بعد مرور ثانية واحدة',
    goal: 'حساب السرعة اللحظية vf والارتفاع المتبقي h فوق سطح الأرض عند اللحظة t = 1 s.',
    targetVar: 'v_f = −10 m/s , h = 40 m',
    given: [
      { label: 'اللحظة الزمنية المستهدفة', math: 't = 1 s' },
      { label: 'تعجيل الجاذبية', math: 'g = −10 m/s²' },
      { label: 'ارتفاع البناية الكلي', math: 'H = 45 m' },
    ],
    explanation:
      'نحسب السرعة اللحظية عند t = 1 s فتكون −10 m/s. ثم نحسب الإزاحة المقطوعة خلال هذه الثانية الأولى فتكون Δy = −5 m فقط. نطرح مقدار هذه الإزاحة من الارتفاع الكلي للبناية لنحصل على الارتفاع الحالي فوق الأرض: h = 45 − 5 = 40 m.',
    physicsLaw: 'v_f = g · t  ,  Δy = ½ · g · t²  ,  h = H − |Δy|',
  },
};

export function StepPanel({ activeTab }: StepPanelProps) {
  const content = TAB_DATA[activeTab];

  return (
    <div className="space-y-2.5 text-right" dir="rtl">
      {/* Title & Target */}
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
        <h3 className="text-sm font-semibold text-slate-100">{content.title}</h3>
        <span className="text-xs font-telemetry px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300" dir="ltr">
          <MathText>{content.targetVar}</MathText>
        </span>
      </div>

      {/* Given values inline row */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-medium">المعطيات:</span>
        <div className="flex flex-wrap items-center gap-1.5" dir="ltr">
          {content.given.map((item, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800/80 text-[11px] font-telemetry text-slate-300"
            >
              <span className="text-slate-400 mr-1.5 font-arabic" dir="rtl">
                {item.label}:
              </span>
              <MathText>{item.math}</MathText>
            </span>
          ))}
        </div>
      </div>

      {/* Explanation text */}
      <p className="text-xs text-slate-300 leading-relaxed font-arabic">
        {content.explanation}
      </p>
    </div>
  );
}
