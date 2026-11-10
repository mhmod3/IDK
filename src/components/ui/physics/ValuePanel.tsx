'use client';

import React from 'react';
import { G } from '@/lib/constants';
import { velocity, displacement, heightAboveGround } from '@/lib/physics';
import type { TabId } from '@/hooks/useFreeFall';
import { MathText } from './MathText';

interface ValuePanelProps {
  t: number;
  activeTab: TabId;
}

interface TelemetryRow {
  symbol: string;
  name: string;
  value: string;
  unit: string;
  colorRole: 'rose' | 'sky' | 'amber' | 'slate';
  targetValue?: number;
  currentNum?: number;
}

export function ValuePanel({ t, activeTab }: ValuePanelProps) {
  const vf = velocity(t);
  const dy = displacement(t);
  const h = heightAboveGround(t);

  // Targets per tab for contextual matching
  const tabTargets: Record<TabId, { vf?: number; dy?: number; h?: number }> = {
    1: { dy: -45, h: 45 },
    2: { vf: -30 },
    3: { vf: -10, h: 40, dy: -5 },
  };

  const currentTargets = tabTargets[activeTab];

  const dynamicRows: TelemetryRow[] = [
    {
      symbol: 't',
      name: 'الزمن',
      value: t.toFixed(2),
      unit: 's',
      colorRole: 'slate',
    },
    {
      symbol: 'h',
      name: 'الارتفاع عن الأرض',
      value: h.toFixed(1),
      unit: 'm',
      colorRole: 'amber',
      targetValue: currentTargets.h,
      currentNum: h,
    },
    {
      symbol: 'v_f',
      name: 'السرعة اللحظية',
      value: vf.toFixed(1),
      unit: 'm/s',
      colorRole: 'rose',
      targetValue: currentTargets.vf,
      currentNum: vf,
    },
    {
      symbol: 'Δy',
      name: 'الإزاحة من القمة',
      value: dy.toFixed(1),
      unit: 'm',
      colorRole: 'amber',
      targetValue: currentTargets.dy,
      currentNum: dy,
    },
  ];

  const isMatched = (row: TelemetryRow): boolean => {
    if (row.targetValue === undefined || row.currentNum === undefined) return false;
    return Math.abs(row.currentNum - row.targetValue) < 0.08;
  };

  const roleStyles = {
    rose: {
      badge: 'border-rose-500/30 text-rose-300/80 bg-rose-950/20',
      num: 'text-slate-100',
    },
    sky: {
      badge: 'border-sky-500/30 text-sky-300/80 bg-sky-950/20',
      num: 'text-slate-100',
    },
    amber: {
      badge: 'border-amber-500/30 text-amber-300/80 bg-amber-950/20',
      num: 'text-slate-100',
    },
    slate: {
      badge: 'border-slate-800 text-slate-400 bg-slate-900',
      num: 'text-slate-100',
    },
  };

  return (
    <div className="bg-slate-900 border border-slate-800/80 rounded-lg p-3.5 space-y-3" dir="rtl">
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">
            التحقق من المحاكاة الحية
          </h3>
          <p className="text-[11px] text-slate-400 font-arabic">
            مطابقة نتائج الحل مع القياسات اللحظية
          </p>
        </div>
        <span className="text-[11px] text-slate-400 font-telemetry" dir="ltr">
          t = {t.toFixed(2)}s
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" dir="ltr">
        {dynamicRows.map((row) => {
          const matched = isMatched(row);
          const style = roleStyles[row.colorRole];

          return (
            <div
              key={row.symbol}
              className={`p-2.5 rounded border transition-colors duration-150 flex flex-col justify-between min-h-[82px] ${
                matched
                  ? 'bg-slate-950 border-sky-500/40'
                  : 'bg-slate-950/70 border-slate-800/70'
              }`}
            >
              <div className="text-right mb-1">
                <span className="text-[11px] text-slate-300 font-arabic leading-snug block">
                  {row.name}
                </span>
              </div>

              <div className="flex items-center justify-between mt-auto pt-1">
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded border font-telemetry shrink-0 ${
                    matched
                      ? 'border-sky-500/40 text-sky-300 bg-sky-950/30'
                      : style.badge
                  }`}
                >
                  <MathText>{row.symbol}</MathText>
                </span>
                <div className="flex items-baseline gap-1" dir="ltr">
                  <span
                    className={`font-telemetry text-base sm:text-lg font-semibold tracking-tight ${
                      matched ? 'text-sky-300' : 'text-slate-100'
                    }`}
                  >
                    {row.value}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {row.unit}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Physics constants reference footer */}
      <div className="pt-1.5 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60" dir="rtl">
        <div className="flex items-center gap-1.5">
          <span className="font-arabic text-slate-400 font-medium">الثوابت:</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300 font-telemetry">
          <div className="inline-flex items-center gap-1">
            <MathText dir="ltr">v_i = 0 m/s</MathText>
            <span className="font-arabic text-[10px] text-slate-500">(سقوط حر)</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="inline-flex items-center gap-1">
            <MathText dir="ltr">g = −10 m/s²</MathText>
            <span className="font-arabic text-[10px] text-slate-500">(نحو الأسفل)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
