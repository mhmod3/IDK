'use client';

import React from 'react';

export function QuestionCard() {
  return (
    <div className="bg-slate-900 border border-slate-800/80 rounded-lg p-3 text-right" dir="rtl">
      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-arabic">
        <span className="font-medium text-slate-100 ml-1">المسألة:</span>
        سقطت كرة سقوطاً حراً من قمة بناية ووصلت سطح الأرض خلال{' '}
        <span className="font-telemetry font-medium text-slate-100" dir="ltr">
          t = 3 s
        </span>
        . اختر المطلب من التبويبات لمتابعة خطوات الحل والتحليل الفيزيائي.
      </p>
    </div>
  );
}
