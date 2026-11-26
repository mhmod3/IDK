'use client';

import React, { useState } from 'react';
import { Compass, Info, ArrowUp, ArrowDown, ChevronDown, ChevronUp } from 'lucide-react';

export function CoordinateCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800/80 rounded-lg overflow-hidden transition-all" dir="rtl">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2.5 px-3 flex items-center justify-between text-right hover:bg-slate-800/40 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-sky-950 border border-sky-800/60 flex items-center justify-center text-sky-400">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-200 block">
              نظام المحاور وتفسير الإشارات السالبة
            </span>
            <span className="text-[10px] text-slate-400 font-arabic">
              لماذا ظهرت الإشارات السالبة في الإزاحة والسرعة والتعجيل؟
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-sky-300" dir="ltr">
            +y ↑ | −y ↓
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-3.5 pt-2 border-t border-slate-800/80 bg-slate-950/60 space-y-3 text-xs leading-relaxed text-slate-300 font-arabic">
          {/* Axis Diagram */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-around gap-3">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-sky-400 font-telemetry font-bold text-xs">
                  <ArrowUp className="w-4 h-4" />
                  <span>+y (الأعلى موجب)</span>
                </div>
                <div className="w-0.5 h-12 bg-gradient-to-b from-sky-500 via-slate-600 to-rose-500 my-1" />
                <div className="flex items-center gap-1 text-rose-400 font-telemetry font-bold text-xs">
                  <ArrowDown className="w-4 h-4" />
                  <span>−y (الأسفل سالب)</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                <span><strong>التعجيل g:</strong> موجه دائماً نحو الأسفل نحو مركز الأرض ⟵ <span className="font-telemetry text-sky-300" dir="ltr">g = −10 m/s²</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                <span><strong>السرعة vf:</strong> الكرة تسقط نحو الأسفل ⟵ <span className="font-telemetry text-rose-300" dir="ltr">vf &lt; 0</span> (سالبة)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span><strong>الإزاحة Δy:</strong> حركة هبوط من القمة للأسفل ⟵ <span className="font-telemetry text-amber-300" dir="ltr">Δy &lt; 0</span> (سالبة)</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p>
              <strong>القاعدة الفيزيائية:</strong> إشارة السالب ليست صفة ذاتية للجاذبية أو السرعة، بل هي ناتجة عن <strong>اختيارنا للاتجاه نحو الأعلى ليكون هو الاتجاه الموجب (+y)</strong>.
            </p>
            <p className="text-slate-400 text-[11px]">
              • لو اخترنا المحور نحو الأسفل موجباً (+y لأسفل)، لكانت <span className="font-telemetry" dir="ltr">g = +10 m/s²</span> و <span className="font-telemetry" dir="ltr">Δy = +45 m</span> و <span className="font-telemetry" dir="ltr">vf = +30 m/s</span>، مع بقاء نفس المعنى الفيزيائي تماماً.
            </p>
            <p className="text-amber-300/90 text-[11px] bg-amber-950/20 p-2 rounded border border-amber-900/40">
              💡 <strong>الفرق بين المقدار والاتجاه:</strong> مقدار السرعة (الانطلاق) ومقدار الارتفاع كميات قياسية موجبة دائماً (<span className="font-telemetry" dir="ltr">H = 45m</span> و <span className="font-telemetry" dir="ltr">|v| = 30 m/s</span>)، أما الإشارة السالبة فتخبرنا فقط بأن المتجه يشير نحو الأسفل.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
