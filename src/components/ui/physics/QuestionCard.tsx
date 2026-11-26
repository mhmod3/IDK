'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';

export function QuestionCard() {
  return (
    <div className="bg-slate-900 border border-slate-800/80 rounded-lg p-3 text-right" dir="rtl">
      <div className="flex items-start gap-2.5">
        <div className="w-6 h-6 rounded bg-sky-950/80 border border-sky-800/60 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
          <BookOpen className="w-3.5 h-3.5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white font-arabic">
              نص المثال 3 (كتاب الفيزياء - ص 42):
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-arabic">
            سقطت كرة سقوطاً حراً من قمة بناية فوصلت سطح الأرض بعد{' '}
            <span className="font-telemetry font-bold text-sky-300" dir="ltr">
              t = 3 s
            </span>
            ، مع اعتبار{' '}
            <span className="font-telemetry font-bold text-sky-300" dir="ltr">
              g = −10 m/s²
            </span>
            . المطلوب: (1) ارتفاع البناية، (2) سرعة الاصطدام واتجاهها، (3) سرعتها وارتفاعها بعد{' '}
            <span className="font-telemetry font-bold text-sky-300" dir="ltr">
              1 s
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
