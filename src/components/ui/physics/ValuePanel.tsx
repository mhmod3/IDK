'use client';

import React from 'react';
import { G, VI } from '@/lib/constants';
import { velocity, speed, displacement, heightAboveGround } from '@/lib/physics';
import type { TabId } from '@/hooks/useFreeFall';
import { MathText } from './MathText';
import { ArrowDown, Check, Clock, Compass, HelpCircle } from 'lucide-react';

interface ValuePanelProps {
  t: number;
  activeTab: TabId;
  onSeek?: (t: number) => void;
}

export function ValuePanel({ t, activeTab, onSeek }: ValuePanelProps) {
  const vf = velocity(t);
  const spd = speed(t);
  const dy = displacement(t);
  const h = heightAboveGround(t);

  // Tab target matching
  const tabTargets: Record<TabId, { targetTime: number; vf: number; speed: number; dy: number; h: number }> = {
    1: { targetTime: 3.0, dy: -45, speed: 30, vf: -30, h: 0 },
    2: { targetTime: 3.0, vf: -30, speed: 30, dy: -45, h: 0 },
    3: { targetTime: 1.0, vf: -10, speed: 10, dy: -5, h: 40 },
  };

  const currentTarget = tabTargets[activeTab];
  const isTimeTargetMatched = Math.abs(t - currentTarget.targetTime) < 0.08;

  const rows = [
    {
      symbol: 't',
      name: 'الزمن المنقضي',
      value: t.toFixed(2),
      unit: 's',
      color: 'slate',
      isTarget: isTimeTargetMatched,
    },
    {
      symbol: 'v_f',
      name: 'السرعة المتجهة',
      note: 'سالبة لأسفل ↓',
      value: vf.toFixed(1),
      unit: 'm/s',
      color: 'rose',
      isTarget: isTimeTargetMatched,
    },
    {
      symbol: '|v|',
      name: 'مقدار السرعة (الانطلاق)',
      note: 'موجب دائماً',
      value: spd.toFixed(1),
      unit: 'm/s',
      color: 'rose',
      isTarget: isTimeTargetMatched,
    },
    {
      symbol: 'Δy',
      name: 'الإزاحة من القمة',
      note: 'سالبة لأسفل ↓',
      value: dy.toFixed(1),
      unit: 'm',
      color: 'amber',
      isTarget: isTimeTargetMatched,
    },
    {
      symbol: 'h',
      name: 'الارتفاع عن الأرض',
      note: 'موجب فوق الأرض',
      value: h.toFixed(1),
      unit: 'm',
      color: 'emerald',
      isTarget: isTimeTargetMatched,
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800/80 rounded-lg p-3.5 space-y-3" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-100 font-arabic">
            القياسات الفيزيائية اللحظية (Telemetry)
          </h3>
          <p className="text-[11px] text-slate-400 font-arabic">
            مطابقة المتغيرات الحركية مع الزمن المختار
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-telemetry px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-sky-400" dir="ltr">
            t = {t.toFixed(2)} s
          </span>
        </div>
      </div>

      {/* Target Time Sync Banner if user is on Tab 3 or Tab 2 and time doesn't match */}
      {!isTimeTargetMatched && onSeek && (
        <div className="p-2 px-3 rounded-lg bg-sky-950/40 border border-sky-800/60 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-1.5 text-sky-300 font-arabic">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>
              المطلب {activeTab} يدرس اللحظة <span className="font-telemetry font-bold" dir="ltr">t = {currentTarget.targetTime}s</span> (أنت عند {t.toFixed(2)}s)
            </span>
          </div>
          <button
            type="button"
            onClick={() => onSeek(currentTarget.targetTime)}
            className="px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white font-medium text-[11px] cursor-pointer transition-colors shrink-0"
          >
            انتقل إلى {currentTarget.targetTime}s
          </button>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2" dir="ltr">
        {rows.map((row) => (
          <div
            key={row.symbol}
            className={`p-2.5 rounded-lg border transition-all flex flex-col justify-between min-h-[88px] ${
              row.isTarget
                ? 'bg-slate-950 border-sky-500/50 shadow-sm'
                : 'bg-slate-950/70 border-slate-800/70'
            }`}
          >
            <div className="text-right">
              <span className="text-[11px] font-bold text-slate-200 font-arabic block leading-snug" dir="rtl">
                {row.name}
              </span>
              {row.note && (
                <span className="text-[10px] text-slate-400 font-arabic block leading-none mt-0.5" dir="rtl">
                  {row.note}
                </span>
              )}
            </div>

            <div className="flex items-baseline justify-between mt-auto pt-1">
              <span className="text-[10px] px-1.5 py-0.2 rounded border border-slate-800 bg-slate-900 text-slate-400 font-telemetry">
                <MathText>{row.symbol}</MathText>
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  className={`font-telemetry text-base sm:text-lg font-bold tracking-tight ${
                    row.isTarget ? 'text-sky-300' : 'text-slate-100'
                  }`}
                >
                  {row.value}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{row.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Physics constants reference footer */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 border-t border-slate-800/60 font-arabic" dir="rtl">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-bold">الثوابت المنهجية:</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-slate-300 font-telemetry" dir="ltr">
          <div className="inline-flex items-center gap-1.5 bg-slate-950 px-2 py-0.5 rounded border border-slate-800/80">
            <MathText>v_i = 0 m/s</MathText>
            <span className="font-arabic text-[10px] text-slate-400">(من السكون)</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-slate-950 px-2 py-0.5 rounded border border-slate-800/80">
            <MathText>g = −10 m/s²</MathText>
            <span className="font-arabic text-[10px] text-slate-400">(المحور +y للأعلى)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
