'use client';

import React from 'react';
import type { TabId } from '@/hooks/useFreeFall';
import { EQUATION_TAB_1, EQUATION_TAB_2, EQUATION_TAB_3 } from '@/lib/equations';
import { MathText } from './MathText';

interface EquationPanelProps {
  activeTab: TabId;
  solutionStep: number;
  onReveal: () => void;
  onReset: () => void;
}

export function EquationPanel({
  activeTab,
  solutionStep,
  onReveal,
  onReset,
}: EquationPanelProps) {
  const maxSteps = activeTab === 3 ? 3 : 2;

  return (
    <div className="space-y-3" dir="rtl">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-1">
        <h4 className="text-xs font-semibold text-slate-200">
          خطوات التعويض والحل الرياضي:
        </h4>
        {solutionStep > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-slate-800 border border-slate-800"
          >
            إعادة ضبط الحل
          </button>
        )}
      </div>

      {/* Equations Content */}
      <div className="space-y-3">
        {activeTab === 1 && <Tab1Derivation step={solutionStep} />}
        {activeTab === 2 && <Tab2Derivation step={solutionStep} />}
        {activeTab === 3 && <Tab3Derivation step={solutionStep} />}
      </div>

      {/* Reveal Action Button */}
      {solutionStep < maxSteps && (
        <button
          type="button"
          onClick={onReveal}
          className="w-full py-2 px-3 rounded bg-slate-800 hover:bg-slate-700/90 text-sky-300 border border-slate-700/70 font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          <span>{solutionStep === 0 ? 'اعرض خطوة التعويض العددي' : 'اعرض الناتج النهائي والتفسير'}</span>
        </button>
      )}
    </div>
  );
}

function Tab1Derivation({ step }: { step: number }) {
  return (
    <div className="space-y-2.5">
      <DerivationRow
        stage="الصيغة العامة"
        formula={EQUATION_TAB_1.general}
        status="active"
      />
      {step >= 1 && (
        <DerivationRow
          stage="التعويض العددي"
          formula={EQUATION_TAB_1.substitution}
          status="substitution"
        />
      )}
      {step >= 2 && (
        <div className="space-y-2 pt-1">
          <DerivationRow
            stage="الناتج النهائي"
            formula={EQUATION_TAB_1.result}
            status="result"
          />
          <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
            {EQUATION_TAB_1.note}
          </div>
        </div>
      )}
    </div>
  );
}

function Tab2Derivation({ step }: { step: number }) {
  return (
    <div className="space-y-2.5">
      <DerivationRow
        stage="الصيغة العامة"
        formula={EQUATION_TAB_2.general}
        status="active"
      />
      {step >= 1 && (
        <DerivationRow
          stage="التعويض العددي"
          formula={EQUATION_TAB_2.substitution}
          status="substitution"
        />
      )}
      {step >= 2 && (
        <div className="space-y-2 pt-1">
          <DerivationRow
            stage="الناتج النهائي"
            formula={EQUATION_TAB_2.result}
            status="result"
          />
          <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
            {EQUATION_TAB_2.note}
          </div>
        </div>
      )}
    </div>
  );
}

function Tab3Derivation({ step }: { step: number }) {
  return (
    <div className="space-y-3">
      {EQUATION_TAB_3.parts.map((part, i) => (
        <div key={i} className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80 space-y-2">
          <div className="text-[11px] font-medium text-slate-400">
            الفرع {part.label}
          </div>
          <DerivationRow stage="القانون" formula={part.general} status="active" />
          {step >= i + 1 && (
            <DerivationRow
              stage="التعويض"
              formula={part.substitution}
              status="substitution"
            />
          )}
          {step >= i + 2 && (
            <DerivationRow stage="الناتج" formula={part.result} status="result" />
          )}
        </div>
      ))}
      {step >= 3 && (
        <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
          {EQUATION_TAB_3.note}
        </div>
      )}
    </div>
  );
}

function DerivationRow({
  stage,
  formula,
  status,
}: {
  stage: string;
  formula: string;
  status: 'active' | 'substitution' | 'result';
}) {
  const styles = {
    active: 'bg-slate-950 border-slate-800 text-slate-100',
    substitution: 'bg-slate-950/90 border-slate-800 text-sky-300/90 font-medium',
    result: 'bg-slate-950 border-sky-900/50 text-sky-200 font-medium',
  };

  return (
    <div
      className={`p-2.5 rounded border transition-colors flex items-center justify-between ${styles[status]}`}
    >
      <span className="text-[10px] font-mono text-slate-400 shrink-0">{stage}</span>
      <div className="text-xs sm:text-sm font-telemetry pl-2" dir="ltr">
        <MathText>{formula}</MathText>
      </div>
    </div>
  );
}
