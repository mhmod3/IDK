'use client';

import React from 'react';
import type { TabId } from '@/hooks/useFreeFall';
import { SOLUTION_TAB_1, SOLUTION_TAB_2, SOLUTION_TAB_3 } from '@/lib/equations';
import { MathText } from './MathText';
import { Target, HelpCircle, Lightbulb, CheckCircle } from 'lucide-react';

interface StepPanelProps {
  activeTab: TabId;
}

const TAB_DATA = {
  1: SOLUTION_TAB_1,
  2: SOLUTION_TAB_2,
  3: SOLUTION_TAB_3,
};

export function StepPanel({ activeTab }: StepPanelProps) {
  const model = TAB_DATA[activeTab];

  return (
    <div className="space-y-3 text-right" dir="rtl">
      {/* Target Description */}
      <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sky-400">
            <Target className="w-4 h-4 shrink-0" />
            <span className="text-xs font-bold font-arabic">المطلوب في هذا الجزء:</span>
          </div>
          <span className="text-xs font-telemetry px-2 py-0.5 rounded bg-sky-950/40 border border-sky-800/60 text-sky-300" dir="ltr">
            <MathText>{model.targetSymbol}</MathText>
          </span>
        </div>
        <p className="text-xs text-slate-300 font-arabic leading-relaxed">
          {model.targetDescription}
        </p>
      </div>

      {/* Givens Row */}
      <div className="space-y-1.5">
        <span className="text-xs text-slate-400 font-medium">المعطيات المتوفرة في المسألة:</span>
        <div className="flex flex-wrap items-center gap-2" dir="ltr">
          {model.givens.map((item, idx) => (
            <div
              key={idx}
              className="px-2.5 py-1 rounded bg-slate-950/90 border border-slate-800 text-xs font-telemetry text-slate-200 flex items-center gap-1.5"
            >
              <span className="text-slate-400 font-arabic text-[11px]" dir="rtl">
                {item.label}:
              </span>
              <MathText>{item.math}</MathText>
              {item.note && (
                <span className="text-[10px] text-slate-500 font-arabic mr-1" dir="rtl">
                  ({item.note})
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Law Selection Reasoning */}
      <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1">
        <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold font-arabic">
          <Lightbulb className="w-3.5 h-3.5 shrink-0" />
          <span>لماذا اخترنا هذا القانون؟</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-arabic">
          {model.lawChoiceReason}
        </p>
      </div>
    </div>
  );
}
