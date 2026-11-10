'use client';

import React from 'react';
import type { TabId } from '@/hooks/useFreeFall';
import { MathText } from './MathText';

interface TabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS: Array<{
  id: TabId;
  stepNum: string;
  label: string;
  targetExpr: string;
}> = [
  {
    id: 1,
    stepNum: 'المطلب الأول',
    label: 'ارتفاع البناية',
    targetExpr: 'h = +45 m',
  },
  {
    id: 2,
    stepNum: 'المطلب الثاني',
    label: 'سرعة الاصطدام',
    targetExpr: 'v_f = −30 m/s',
  },
  {
    id: 3,
    stepNum: 'المطلب الثالث',
    label: 'السرعة والارتفاع بعد 1s',
    targetExpr: 'v_f = −10 m/s',
  },
];

export function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <nav
      aria-label="مطالب المسألة"
      className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900 border border-slate-800/80 rounded-lg"
      dir="rtl"
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-start text-right p-2.5 rounded transition-colors duration-150 cursor-pointer ${
              isActive
                ? 'bg-slate-800/90 border border-slate-700/80 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 border border-transparent'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-[10px] font-mono tracking-wider text-slate-400">
                {tab.stepNum}
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded border font-telemetry ${
                  isActive
                    ? 'border-sky-500/30 text-sky-300 bg-sky-950/30'
                    : 'border-slate-800 text-slate-400 bg-slate-950/60'
                }`}
                dir="ltr"
              >
                <MathText>{tab.targetExpr}</MathText>
              </span>
            </div>
            <span className="text-xs font-medium text-slate-200">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
