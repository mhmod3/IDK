// ============================================================
// QuestionCard — عرض نص السؤال كاملاً من المثال 3
// يظهر في كل التبويبات كمرجع ثابت للطالب
// ============================================================

'use client';

import { Card } from '@/components/ui/card';
import { MathText } from './MathText';
import { FileQuestion } from 'lucide-react';
import { G, T_TOTAL, VI } from '@/lib/constants';

export function QuestionCard() {
  return (
    <Card className="p-4 bg-gradient-to-br from-sky-50 to-white shadow-sm border-sky-200">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-sky-200">
        <FileQuestion className="w-4 h-4 text-sky-600" />
        <h3 className="text-sm font-bold text-sky-900">نص المسألة</h3>
        <span className="text-[10px] text-sky-600 bg-sky-100 px-2 py-0.5 rounded-full mr-auto">
          المثال 3 — صفحة 42
        </span>
      </div>

      {/* نص السؤال */}
      <div className="text-sm text-slate-800 leading-relaxed mb-3">
        سقطت كرة سقوطاً حراً من أعلى بناية، واستغرقت في سقوطها{' '}
        <strong className="text-sky-700">3 ثوانٍ</strong> حتى اصطدمت بسطح الأرض.
      </div>

      {/* المطلوب */}
      <div className="mb-3">
        <div className="text-xs font-bold text-slate-700 mb-1.5">المطلوب احسب:</div>
        <ol className="space-y-1 pr-4 text-sm text-slate-800 list-decimal">
          <li>ارتفاع البناية.</li>
          <li>سرعة الكرة لحظة الاصطدام واتجاهها.</li>
          <li>سرعة الكرة وارتفاعها بعد مرور ثانية واحدة من سقوطها.</li>
        </ol>
      </div>

      {/* المعطيات */}
      <div className="bg-white/70 rounded-lg p-3 border border-sky-100">
        <div className="text-xs font-bold text-slate-700 mb-2">المعطيات:</div>
        <div className="grid grid-cols-3 gap-2 text-center" dir="ltr">
          <div className="bg-slate-50 rounded p-2">
            <div className="text-xs text-slate-500">زمن السقوط</div>
            <div className="font-bold text-slate-800">
              <MathText>{`t = ${T_TOTAL} s`}</MathText>
            </div>
          </div>
          <div className="bg-blue-50 rounded p-2">
            <div className="text-xs text-slate-500">التعجيل</div>
            <div className="font-bold text-blue-700">
              <MathText>{`g = ${G} m/s^2`}</MathText>
            </div>
          </div>
          <div className="bg-amber-50 rounded p-2">
            <div className="text-xs text-slate-500">السرعة الابتدائية</div>
            <div className="font-bold text-amber-700">
              <MathText>{`v_i = ${VI}`}</MathText>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
