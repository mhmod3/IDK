'use client';

import React from 'react';
import type { TabId } from '@/hooks/useFreeFall';
import { MathText } from './MathText';
import { CheckCircle2, HelpCircle } from 'lucide-react';

interface TabsProps {
  activeTab: TabId;
  solutionStep?: number;
  onTabChange: (tab: TabId) => void;
}

interface TabDef {
  id: TabId;
  stepNum: string;
  label: string;
  targetSymbol: string;
  solvedExpr: string;
  maxStep: number;
}

const TABS: TabDef[] = [
  {
    id: 1,
    stepNum: 'المطلب الأول',
    label: 'ارتفاع البناية',
    targetSymbol: 'H = ؟',
    solvedExpr: 'H = +45 m',
    maxStep: 3,
  },
  {
    id: 2,
    stepNum: 'المطلب الثاني',
    label: 'سرعة الاصطدام',
    targetSymbol: 'v_f = ؟',
    solvedExpr: 'v_f = −30 m/s',
    maxStep: 3,
  },
  {
    id: 3,
    stepNum: 'المطلب الثالث',
    label: 'الحالة بعد مرور 1s',
    targetSymbol: 'v_f , h = ؟',
    solvedExpr: 'v_f = −10, h = 40',
    maxStep: 4,
  },
];

export function Tabs({ activeTab, solutionStep = 0, onTabChange }: TabsProps) {
  return (
    <nav
      aria-label="مطالب المسألة"
      className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900 border border-slate-800/80 rounded-lg"
      dir="rtl"
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const isSolved = isActive && solutionStep >= tab.maxStep;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-start text-right p-2.5 rounded transition-colors duration-150 cursor-pointer ${
              isActive
                ? 'bg-slate-800/90 border border-slate-700/80 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 border border-transparent'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-[10px] font-mono tracking-wider text-slate-400">
                {tab.stepNum}
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded border font-telemetry flex items-center gap-1 ${
                  isSolved
                    ? 'border-emerald-500/40 text-emerald-300 bg-emerald-950/30'
                    : isActive
                    ? 'border-sky-500/30 text-sky-300 bg-sky-950/30'
                    : 'border-slate-800 text-slate-400 bg-slate-950/60'
                }`}
                dir="ltr"
              >
                {isSolved ? (
                  <>
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                    <MathText>{tab.solvedExpr}</MathText>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-2.5 h-2.5 text-sky-400/70" />
                    <MathText>{tab.targetSymbol}</MathText>
                  </>
                )}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-200">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
