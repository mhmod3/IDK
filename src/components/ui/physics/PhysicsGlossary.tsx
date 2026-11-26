'use client';

import React, { useState } from 'react';
import { BookOpen, X, Info } from 'lucide-react';
import { MathText } from './MathText';

export function PhysicsGlossaryButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 rounded transition-colors cursor-pointer font-arabic"
        title="دليل الرموز والمفاهيم الفيزيائية"
      >
        <BookOpen className="w-3.5 h-3.5 text-amber-400" />
        <span>دليل الرموز</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm"
          dir="rtl"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm sm:text-base font-bold text-white font-arabic">
                  دليل المصطلحات والرموز الفيزيائية (المثال 3)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto space-y-3.5 text-xs text-slate-300 font-arabic leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Term 1: H vs h vs dy */}
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300">ارتفاع البناية الكلي (H)</span>
                    <span className="font-telemetry text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800" dir="ltr">H = +45 m</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    البعد العمودي الكلي بين قمة البناية وسطح الأرض. كمية قياسية موجبة دائماً تساوي مقدار الإزاحة الكلية: <span className="font-telemetry" dir="ltr">H = |Δy|</span>.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300">الإزاحة الرأسية (Δy)</span>
                    <span className="font-telemetry text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800" dir="ltr">Δy = −45 m</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    المتجه الرأسي من نقطة الإطلاق (القمة) إلى الموضع الحالي. تظهر بإشارة سالبة (−) لأن الحركة نحو الأسفل وفق المحور المختار (+y ↑).
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300">الارتفاع المتبقي عن الأرض (h)</span>
                    <span className="font-telemetry text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800" dir="ltr">h = H + Δy</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    المسافة العمودية الحالية فوق سطح الأرض. عند <span className="font-telemetry" dir="ltr">t = 1s</span> هبطت الكرة 5m فيكون الارتفاع المتبقي: <span className="font-telemetry" dir="ltr">h = 45 − 5 = 40 m</span>.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-300">السرعة المتجهة (vf) مقابل الانطلاق (|v|)</span>
                    <span className="font-telemetry text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800" dir="ltr">vf = −10, |v| = 10</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    <strong>السرعة المتجهة (Velocity):</strong> كمية متجهة بإشارة سالبة لبيان أنها لأسفل. <strong>مقدار السرعة (Speed/الانطلاق):</strong> كمية قياسية موجبة دائماً.
                  </p>
                </div>
              </div>

              {/* Free fall scientific note */}
              <div className="p-3 rounded-lg bg-sky-950/20 border border-sky-900/40 space-y-1">
                <span className="font-bold text-sky-300 flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  ملاحظة علمية: مفهوم السقوط الحر والسرعة الابتدائية
                </span>
                <p className="text-[11px] text-slate-300">
                  السقوط الحر هو حركة الجسم بتأثير قوة الجاذبية الأرضية وحدها بإهمال مقاومة الهواء. ولا يعني السقوط الحر بالضرورة أن السرعة الابتدائية تساوي صفراً في كل الحالات (فالجسم المقذوف رأسياً هو أيضاً في سقوط حر)، ولكن في هذا المثال المنهجي بالذات، <strong>تُركت الكرة لتسقط من السكون</strong> لذلك عُوّضت <span className="font-telemetry" dir="ltr">vᵢ = 0</span>.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
