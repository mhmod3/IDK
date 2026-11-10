// ============================================================
// ValuePanel — لوحة القيم الرقمية الحية
// تُحدّث لحظياً مع تقدّم الزمن
// ============================================================

'use client';

import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { G } from '@/lib/constants';
import { velocity, displacement, heightAboveGround } from '@/lib/physics';
import type { TabId } from '@/hooks/useFreeFall';
import { MathText } from './MathText';

interface ValuePanelProps {
  t: number;
  activeTab: TabId;
}

interface ValueRow {
  label: string;
  value: string;
  unit: string;
  // القيمة المرجعية للتبويب الحالي (إن وُجدت) للمطابقة
  matchValue?: number | null;
  // القيمة العددية الحالية (للمقارنة)
  currentNum?: number;
  color: 'default' | 'velocity' | 'gravity' | 'displacement' | 'height';
}

const colorMap = {
  default: { fg: 'text-slate-900', bg: 'bg-slate-50' },
  velocity: { fg: 'text-red-600', bg: 'bg-red-50' },
  gravity: { fg: 'text-blue-600', bg: 'bg-blue-50' },
  displacement: { fg: 'text-purple-700', bg: 'bg-purple-50' },
  height: { fg: 'text-amber-700', bg: 'bg-amber-50' },
};

export function ValuePanel({ t, activeTab }: ValuePanelProps) {
  const vf = velocity(t);
  const dy = displacement(t);
  const h = heightAboveGround(t);
  const vi = 0;

  // القيم المرجعية حسب التبويب
  const tabMatches: Record<TabId, { vf?: number; dy?: number; h?: number; vi?: number }> = {
    1: { dy: -45, h: 45 },
    2: { vf: -30 },
    3: { vf: -10, h: 40, dy: -5 },
  };
  const matches = tabMatches[activeTab];

  const rows: ValueRow[] = [
    {
      label: 't',
      value: t.toFixed(2),
      unit: 's',
      color: 'default',
    },
    {
      label: 'v_i',
      value: vi.toFixed(0),
      unit: 'm/s',
      matchValue: matches.vi ?? null,
      currentNum: vi,
      color: 'default',
    },
    {
      label: 'v_f',
      value: vf.toFixed(1),
      unit: 'm/s',
      matchValue: matches.vf ?? null,
      currentNum: vf,
      color: 'velocity',
    },
    {
      label: 'Δy',
      value: dy.toFixed(1),
      unit: 'm',
      matchValue: matches.dy ?? null,
      currentNum: dy,
      color: 'displacement',
    },
    {
      label: 'h',
      value: h.toFixed(1),
      unit: 'm',
      matchValue: matches.h ?? null,
      currentNum: h,
      color: 'height',
    },
    {
      label: 'g',
      value: G.toFixed(0),
      unit: 'm/s²',
      color: 'gravity',
    },
  ];

  const isMatch = (row: ValueRow): boolean => {
    if (row.matchValue === null || row.matchValue === undefined) return false;
    if (row.currentNum === undefined) return false;
    return Math.abs(row.currentNum - row.matchValue) < 0.05;
  };

  return (
    <Card className="p-4 bg-white shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-3 border-b pb-2">
        القيم اللحظية
      </h3>
      <div className="space-y-2" dir="ltr">
        {rows.map((row) => {
          const matched = isMatch(row);
          const colors = colorMap[row.color];
          return (
            <div
              key={row.label}
              className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${colors.bg} ${
                matched ? 'ring-2 ring-green-400' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`font-bold text-sm ${colors.fg}`} style={{ fontFamily: 'serif' }}>
                  <MathText>{row.label}</MathText>
                </span>
                <span className="text-slate-400 text-xs">=</span>
                <span className={`font-mono text-sm ${matched ? 'text-green-700 font-bold' : colors.fg}`}>
                  {row.value}
                </span>
                <span className="text-slate-500 text-xs">{row.unit}</span>
              </div>
              {matched && (
                <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
