'use client';

import React from 'react';
import type { TabId } from '@/hooks/useFreeFall';
import {
  SOLUTION_TAB_1,
  SOLUTION_TAB_2,
  SOLUTION_TAB_3,
  DerivationStep,
} from '@/lib/equations';
import { MathText } from './MathText';
import { CheckCircle2, ChevronLeft, RotateCcw, Sparkles } from 'lucide-react';

interface EquationPanelProps {
  activeTab: TabId;
  solutionStep: number;
  onReveal: () => void;
  onRevealAll?: () => void;
  onReset: () => void;
}

const TAB_MODELS = {
  1: SOLUTION_TAB_1,
  2: SOLUTION_TAB_2,
  3: SOLUTION_TAB_3,
};

export function EquationPanel({
  activeTab,
  solutionStep,
  onReveal,
  onRevealAll,
  onReset,
}: EquationPanelProps) {
  const model = TAB_MODELS[activeTab];
  const totalSteps = model.steps.length;
  const isCompleted = solutionStep >= totalSteps;

  return (
    <div className="space-y-3" dir="rtl">
      {/* Header with step counter & reset */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <h4 className="text-xs sm:text-sm font-bold text-slate-100 font-arabic">
            خطوات الحل الرياضي والاشتقاق:
          </h4>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-sky-400">
            {Math.min(solutionStep, totalSteps)} / {totalSteps}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {solutionStep > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer px-2 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>إعادة البدء</span>
            </button>
          )}
        </div>
      </div>

      {/* Progressive Step Cards */}
      <div className="space-y-3">
        {model.steps.map((step, idx) => {
          const isRevealed = solutionStep > idx;
          const isCurrent = solutionStep === idx + 1;

          if (!isRevealed) {
            return (
              <div
                key={idx}
                className="p-3 rounded-lg border border-dashed border-slate-800/80 bg-slate-950/40 text-slate-500 flex items-center justify-between text-xs"
              >
                <span className="font-arabic">{step.title}</span>
                <span className="text-[11px] font-mono text-slate-600">خطوة {idx + 1}</span>
              </div>
            );
          }

          return (
            <StepCard
              key={idx}
              stepIndex={idx + 1}
              step={step}
              isCurrent={isCurrent}
              isLast={idx === totalSteps - 1}
            />
          );
        })}
      </div>

      {/* Final Summary Card when all steps are completed */}
      {isCompleted && (
        <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-900/50 space-y-2 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-arabic">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>خلاصة وتفسير النتيجة الفيزيائية:</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-arabic">
            {model.finalSummary}
          </p>
          <p className="text-[11px] text-emerald-300/80 leading-relaxed font-arabic pt-1 border-t border-emerald-900/30">
            {model.coordinateNote}
          </p>
        </div>
      )}

      {/* Progression Action Buttons */}
      {!isCompleted && (
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={onReveal}
            className="flex-1 py-2.5 px-4 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>
              {solutionStep === 0
                ? 'ابدأ بالخطوة الأولى'
                : `اعرض الخطوة التالية (${solutionStep + 1} من ${totalSteps})`}
            </span>
            <ChevronLeft className="w-4 h-4" />
          </button>

          {onRevealAll && solutionStep > 0 && (
            <button
              type="button"
              onClick={onRevealAll}
              className="py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer border border-slate-700 flex items-center gap-1.5"
              title="كشف جميع الخطوات مباشرة"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>كشف الكل</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function StepCard({
  stepIndex,
  step,
  isCurrent,
  isLast,
}: {
  stepIndex: number;
  step: DerivationStep;
  isCurrent: boolean;
  isLast: boolean;
}) {
  return (
    <div
      className={`p-3.5 rounded-lg border space-y-2.5 transition-all duration-200 ${
        isCurrent
          ? 'bg-slate-950 border-sky-600/50 ring-1 ring-sky-500/20'
          : 'bg-slate-950/70 border-slate-800/80'
      }`}
    >
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
        <span className="text-xs font-bold text-slate-200 font-arabic">
          {step.title}
        </span>
        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-900 border border-slate-800 text-sky-400">
          خطوة {stepIndex}
        </span>
      </div>

      <div className="space-y-1.5 font-telemetry" dir="ltr">
        {/* General Formula */}
        <div className="p-2 rounded bg-slate-900/90 border border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-[10px] font-mono text-slate-400 shrink-0 font-arabic" dir="rtl">
            الصيغة:
          </span>
          <div className="text-xs sm:text-sm text-slate-200">
            <MathText>{step.general}</MathText>
          </div>
        </div>

        {/* Substitution */}
        <div className="p-2 rounded bg-slate-900/90 border border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-[10px] font-mono text-slate-400 shrink-0 font-arabic" dir="rtl">
            التعويض:
          </span>
          <div className="text-xs sm:text-sm text-sky-300">
            <MathText>{step.substitution}</MathText>
          </div>
        </div>

        {/* Result */}
        <div className="p-2.5 rounded bg-sky-950/30 border border-sky-900/50 flex items-center justify-between text-xs sm:text-sm">
          <span className="text-[10px] font-mono text-sky-400 shrink-0 font-arabic" dir="rtl">
            الناتج:
          </span>
          <div className="text-xs sm:text-sm font-semibold text-emerald-300">
            <MathText>{step.result}</MathText>
          </div>
        </div>
      </div>

      {/* Physics explanation text */}
      <p className="text-xs text-slate-300 leading-relaxed font-arabic pt-1">
        {step.explanation}
      </p>
    </div>
  );
}
