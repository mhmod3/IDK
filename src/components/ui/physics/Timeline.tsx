// ============================================================
// Timeline — شريط زمني قابل للسحب (0 → 3s)
// ============================================================

'use client';

import { Card } from '@/components/ui/card';
import { T_TOTAL } from '@/lib/constants';

interface TimelineProps {
  t: number;
  onTimeChange: (t: number) => void;
}

export function Timeline({ t, onTimeChange }: TimelineProps) {
  const percentage = (t / T_TOTAL) * 100;

  return (
    <Card className="p-3 bg-white shadow-sm">
      <div className="flex items-center gap-3" dir="ltr">
        <span className="text-xs font-mono text-slate-600 w-12 text-right">0.00 s</span>
        <div className="flex-1 relative">
          {/* الخط */}
          <div className="h-2 bg-slate-200 rounded-full relative">
            {/* المنجز */}
            <div
              className="absolute top-0 left-0 h-full bg-sky-500 rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
            {/* علامات مرجعية عند t = 1, 2, 3 */}
            {[1, 2, 3].map((tt) => (
              <div
                key={`mark-${tt}`}
                className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 bg-slate-400"
                style={{ left: `${(tt / T_TOTAL) * 100}%` }}
              />
            ))}
          </div>
          {/* مقبض السحب */}
          <input
            type="range"
            min={0}
            max={T_TOTAL}
            step={0.01}
            value={t}
            onChange={(e) => onTimeChange(parseFloat(e.target.value))}
            className="absolute top-1/2 -translate-y-1/2 w-full h-2 opacity-0 cursor-pointer"
            style={{ direction: 'ltr' }}
          />
          {/* نقطة المقبض البصرية */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-sky-600 border-2 border-white rounded-full shadow pointer-events-none"
            style={{ left: `${percentage}%` }}
          />
        </div>
        <span className="text-xs font-mono text-slate-600 w-12">{T_TOTAL.toFixed(2)} s</span>
        <div className="w-24 text-right">
          <span className="text-sm font-mono font-bold text-sky-700">
            {t.toFixed(2)} / {T_TOTAL.toFixed(2)} s
          </span>
        </div>
      </div>
    </Card>
  );
}
