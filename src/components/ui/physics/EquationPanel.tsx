// ============================================================
// EquationPanel — عرض المعادلات مع التعويض اللحظي
// ثلاث طبقات تُكشف تباعاً عند الضغط على «اعرض الحل»
// ============================================================

'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, RotateCcw } from 'lucide-react';
import type { TabId } from '@/hooks/useFreeFall';
import { EQUATION_TAB_1, EQUATION_TAB_2, EQUATION_TAB_3 } from '@/lib/equations';
import { MathText } from './MathText';

interface EquationPanelProps {
  activeTab: TabId;
  solutionStep: number;
  onReveal: () => void;
  onReset: () => void;
}

export function EquationPanel({ activeTab, solutionStep, onReveal, onReset }: EquationPanelProps) {
  // أقصى عدد خطوات لكشف الحل
  const maxSteps =
    activeTab === 3 ? 3 :  // التبويب 3: 3 أجزاء
    2;                     // التبويب 1 و2: صيغة → تعويض → نتيجة (خطوتان)

  return (
    <Card className="p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-3 border-b pb-2">
        <h3 className="text-sm font-bold text-slate-800">المعادلة والحل</h3>
        {solutionStep > 0 && (
          <button
            onClick={onReset}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
            title="إخفاء الحل"
          >
            <RotateCcw className="w-3 h-3" />
            إخفاء
          </button>
        )}
      </div>

      <div className="space-y-3">
        {activeTab === 1 && <Tab1Equation step={solutionStep} />}
        {activeTab === 2 && <Tab2Equation step={solutionStep} />}
        {activeTab === 3 && <Tab3Equation step={solutionStep} />}
      </div>

      {solutionStep < maxSteps && (
        <Button
          onClick={onReveal}
          className="w-full mt-4 bg-sky-600 hover:bg-sky-700 text-white"
          size="sm"
        >
          <Eye className="w-4 h-4 mr-1" />
          {solutionStep === 0 ? 'اعرض الحل' : 'اعرض الخطوة التالية'}
        </Button>
      )}
    </Card>
  );
}

// ============= التبويب 1 =============
function Tab1Equation({ step }: { step: number }) {
  return (
    <div className="space-y-2">
      <EquationLine
        text={EQUATION_TAB_1.general}
        visible
        emphasized
      />
      {step >= 1 && (
        <EquationLine
          text={EQUATION_TAB_1.substitution}
          visible
          faded
        />
      )}
      {step >= 2 && (
        <>
          <EquationLine
            text={EQUATION_TAB_1.result}
            visible
            success
          />
          <div className="mt-3 p-3 bg-amber-50 border-r-4 border-amber-400 rounded text-xs text-slate-700 leading-relaxed" dir="rtl">
            {EQUATION_TAB_1.note}
          </div>
        </>
      )}
    </div>
  );
}

// ============= التبويب 2 =============
function Tab2Equation({ step }: { step: number }) {
  return (
    <div className="space-y-2">
      <EquationLine text={EQUATION_TAB_2.general} visible emphasized />
      {step >= 1 && (
        <EquationLine text={EQUATION_TAB_2.substitution} visible faded />
      )}
      {step >= 2 && (
        <>
          <EquationLine text={EQUATION_TAB_2.result} visible success />
          <div className="mt-3 p-3 bg-blue-50 border-r-4 border-blue-500 rounded text-xs text-slate-700 leading-relaxed" dir="rtl">
            {EQUATION_TAB_2.note}
          </div>
        </>
      )}
    </div>
  );
}

// ============= التبويب 3 =============
function Tab3Equation({ step }: { step: number }) {
  return (
    <div className="space-y-3">
      {EQUATION_TAB_3.parts.map((part, i) => (
        <div key={i} className="space-y-1 border-b border-slate-100 pb-2 last:border-b-0">
          <div className="text-xs font-bold text-slate-600 mb-1" dir="rtl">
            الجزء {part.label}
          </div>
          <EquationLine text={part.general} visible emphasized />
          {step >= i + 1 && (
            <EquationLine text={part.substitution} visible faded />
          )}
          {step >= i + 2 && (
            <EquationLine text={part.result} visible success />
          )}
        </div>
      ))}
      {step >= 3 && (
        <div className="mt-3 p-3 bg-purple-50 border-r-4 border-purple-500 rounded text-xs text-slate-700 leading-relaxed" dir="rtl">
          {EQUATION_TAB_3.note}
        </div>
      )}
    </div>
  );
}

// ============= سطر معادلة =============
function EquationLine({
  text,
  visible,
  emphasized = false,
  faded = false,
  success = false,
}: {
  text: string;
  visible: boolean;
  emphasized?: boolean;
  faded?: boolean;
  success?: boolean;
}) {
  if (!visible) return null;
  return (
    <div
      className={`font-mono text-sm py-1.5 px-3 rounded transition-all ${
        success
          ? 'bg-green-50 text-green-700 font-bold ring-1 ring-green-300'
          : emphasized
          ? 'bg-slate-100 text-slate-900 font-semibold'
          : faded
          ? 'bg-slate-50 text-slate-600'
          : 'text-slate-800'
      }`}
      dir="ltr"
      style={{ fontFamily: '"Computer Modern Serif", "Times New Roman", serif' }}
    >
      <MathText>{text}</MathText>
    </div>
  );
}
