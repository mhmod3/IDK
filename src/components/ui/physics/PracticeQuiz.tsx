'use client';

import React, { useState } from 'react';
import type { TabId } from '@/hooks/useFreeFall';
import { MathText } from './MathText';
import { HelpCircle, CheckCircle2, XCircle, Sparkles, RefreshCw } from 'lucide-react';

interface PracticeQuizProps {
  activeTab: TabId;
}

interface QuizItem {
  question: string;
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }>;
}

const QUIZZES: Record<TabId, QuizItem> = {
  1: {
    question:
      'تُركت كرة لتسقط من قمة بناية ووصلت الأرض بعد t = 3s بتعجيل g = −10 m/s². كيف نحسب ارتفاع البناية؟',
    options: [
      {
        id: '1a',
        text: 'نطبق Δy = ½·g·t² فنحصل على Δy = −45m، وارتفاع البناية هو H = |Δy| = 45m',
        isCorrect: true,
        feedback:
          'إجابة ممتازة وصحيحة! ✅ الإزاحة سالبة لأنها لأسفل، وارتفاع البناية هو البعد القياسي الموجب 45m.',
      },
      {
        id: '1b',
        text: 'نطبق vf = g·t فنحصل على −30m، فيكون ارتفاع البناية 30m',
        isCorrect: false,
        feedback:
          'غير صحيح. ❌ المعادلة vf = g·t تحسب السرعة النهائية بوحدة m/s، ولا تحسب الإزاحة أو الارتفاع.',
      },
      {
        id: '1c',
        text: 'نطبق Δy = g·t² = (−10)·(9) = −90m، فيكون الارتفاع 90m',
        isCorrect: false,
        feedback:
          'غير صحيح. ❌ نسيت ضرب التعجيل في النصف (½) في معادلة الإزاحة.',
      },
    ],
  },
  2: {
    question:
      'لحظة اصطدام الكرة بالأرض عند t = 3s، ما هو التعبير الدقيق عن سرعتها وفق المنهج؟',
    options: [
      {
        id: '2a',
        text: 'السرعة المتجهة vf = −30 m/s (نحو الأسفل)، ومقدار السرعة (الانطلاق) هو 30 m/s',
        isCorrect: true,
        feedback:
          'إجابة نموذجية! ✅ السالب للاتجاه لأسفل وفق المحور (+y ↑)، والمقدار موجب دائماً.',
      },
      {
        id: '2b',
        text: 'السرعة المتجهة vf = +30 m/s ومقدار السرعة هو −30 m/s',
        isCorrect: false,
        feedback:
          'غير صحيح. ❌ مقدار السرعة (الانطلاق) كمية قياسية موجبة دائماً ولا يمكن أن تكون سالبة.',
      },
      {
        id: '2c',
        text: 'السرعة تساوي صفراً لأن الكرة وصلت الأرض وتوقفت',
        isCorrect: false,
        feedback:
          'غير صحيح. ❌ المسألة تسأل عن سرعة الكرة لحظة ملامسة الأرض مباشرة قبل التوقف.',
      },
    ],
  },
  3: {
    question:
      'بعد مرور ثانية واحدة (t = 1s)، ما مقدار ما هبطته الكرة، وما ارتفاعها المتبقي عن سطح الأرض؟',
    options: [
      {
        id: '3a',
        text: 'هبطت مسافة 5m (Δy = −5m)، والارتفاع المتبقي عن الأرض هو h = 45 − 5 = 40m',
        isCorrect: true,
        feedback:
          'أحسنت! ✅ 5m هي مسافة الهبوط من القمة، و 40m هو الارتفاع المتبقي فوق سطح الأرض.',
      },
      {
        id: '3b',
        text: 'هبطت 5m وارتفاعها المتبقي عن الأرض هو 5m أيضاً',
        isCorrect: false,
        feedback:
          'غير صحيح. ❌ 5m هي المسافة التي قطعتها الكرة نزولاً، والارتفاع المتبقي يطرح من ارتفاع البناية الكلي: 45 − 5 = 40m.',
      },
      {
        id: '3c',
        text: 'هبطت 10m وارتفاعها المتبقي 35m',
        isCorrect: false,
        feedback:
          'غير صحيح. ❌ الرقم 10 m/s هو مقدار سرعة الكرة بعد ثانية وليس مسافة الإزاحة.',
      },
    ],
  },
};

export function PracticeQuiz({ activeTab }: PracticeQuizProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showBonus, setShowBonus] = useState(false);
  const [bonusAnswer, setBonusAnswer] = useState<string | null>(null);

  const quiz = QUIZZES[activeTab];

  const handleSelect = (id: string) => {
    setSelectedOption(id);
  };

  const handleReset = () => {
    setSelectedOption(null);
  };

  return (
    <div className="space-y-3.5 text-right font-arabic" dir="rtl">
      {/* Quiz Card */}
      <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
            <Sparkles className="w-4 h-4" />
            <span>سؤال التفكير والتنبؤ (المطلب {activeTab})</span>
          </div>
          {selectedOption && (
            <button
              type="button"
              onClick={handleReset}
              className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>إعادة المحاولة</span>
            </button>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
          {quiz.question}
        </p>

        {/* Options */}
        <div className="space-y-2 pt-1">
          {quiz.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const hasAnswered = selectedOption !== null;

            let optionStyle = 'border-slate-800 bg-slate-900 hover:bg-slate-800/80 text-slate-300';
            if (hasAnswered) {
              if (option.isCorrect) {
                optionStyle = 'border-emerald-600/60 bg-emerald-950/30 text-emerald-200';
              } else if (isSelected) {
                optionStyle = 'border-rose-600/60 bg-rose-950/30 text-rose-200';
              } else {
                optionStyle = 'border-slate-800/50 bg-slate-950/40 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={option.id}
                type="button"
                disabled={hasAnswered}
                onClick={() => handleSelect(option.id)}
                className={`w-full p-2.5 rounded-lg border text-right text-xs transition-all flex items-start gap-2.5 cursor-pointer ${optionStyle}`}
              >
                <span className="mt-0.5 shrink-0">
                  {hasAnswered ? (
                    option.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isSelected ? (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-700 block" />
                    )
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-600 block" />
                  )}
                </span>
                <span className="leading-relaxed">{option.text}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Banner */}
        {selectedOption && (
          <div className="pt-2 animate-in fade-in duration-200">
            {(() => {
              const opt = quiz.options.find((o) => o.id === selectedOption);
              if (!opt) return null;
              return (
                <div
                  className={`p-3 rounded-lg border text-xs leading-relaxed ${
                    opt.isCorrect
                      ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-200'
                      : 'bg-rose-950/30 border-rose-800/50 text-rose-200'
                  }`}
                >
                  {opt.feedback}
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Bonus Challenge Section */}
      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 space-y-2">
        <button
          type="button"
          onClick={() => setShowBonus(!showBonus)}
          className="flex items-center justify-between w-full text-right cursor-pointer"
        >
          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>تحدٍ إضافي: مسألة بأرقام جديدة (t = 2s)</span>
          </div>
          <span className="text-[11px] text-slate-400 font-arabic">
            {showBonus ? 'إخفاء التحدي ▲' : 'جرّب بنفسك ▼'}
          </span>
        </button>

        {showBonus && (
          <div className="pt-2 space-y-2.5 border-t border-slate-800 text-xs">
            <p className="text-slate-300 leading-relaxed">
              إذا سقطت كرة من السكون من بناية أخرى ووصلت الأرض خلال <span className="font-telemetry text-amber-300" dir="ltr">t = 2 s</span> (مع <span className="font-telemetry text-slate-300" dir="ltr">g = −10 m/s²</span>)، كم يكون ارتفاع تلك البناية وسرعة اصطدام الكرة؟
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[
                {
                  id: 'b1',
                  label: 'H = 20 m  ,  vf = −20 m/s',
                  correct: true,
                  feedback: 'صحيح تماماً! ✅ Δy = ½(−10)(2)² = −20m ⟹ H = 20m ، و vf = (−10)(2) = −20 m/s.',
                },
                {
                  id: 'b2',
                  label: 'H = 40 m  ,  vf = −10 m/s',
                  correct: false,
                  feedback: 'غير صحيح ❌. تأكد من التعويض: Δy = ½(−10)(2)² = −20m.',
                },
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBonusAnswer(b.id)}
                  className={`p-2 rounded border text-center transition-colors cursor-pointer ${
                    bonusAnswer === b.id
                      ? b.correct
                        ? 'bg-emerald-950 border-emerald-600 text-emerald-200'
                        : 'bg-rose-950 border-rose-600 text-rose-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-telemetry" dir="ltr">{b.label}</span>
                </button>
              ))}
            </div>

            {bonusAnswer && (
              <p className="text-[11px] text-amber-300/90 bg-amber-950/20 p-2 rounded border border-amber-900/40">
                {bonusAnswer === 'b1'
                  ? 'إجابة ممتازة! ✅ Δy = ½(−10)(2)² = −20m ⟹ H = 20m ، و vf = (−10)(2) = −20 m/s.'
                  : 'غير صحيح ❌. راجع القانون: Δy = ½(−10)(2)² = −20m.'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
