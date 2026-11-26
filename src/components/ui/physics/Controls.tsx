'use client';

import React from 'react';
import { Play, Pause, RotateCcw, StepForward, StepBack, Clock } from 'lucide-react';
import type { TabId } from '@/hooks/useFreeFall';

interface ControlsProps {
  isPlaying: boolean;
  activeTab: TabId;
  onTogglePlay: () => void;
  onReset: () => void;
  onStepDelta?: (delta: number) => void;
  onSeek?: (time: number) => void;
  onJumpToTabTarget?: () => void;
}

export function Controls({
  isPlaying,
  activeTab,
  onTogglePlay,
  onReset,
  onStepDelta,
  onSeek,
  onJumpToTabTarget,
}: ControlsProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/60"
      dir="rtl"
    >
      {/* Primary playback & stepping transport */}
      <div className="flex items-center gap-1.5" dir="ltr">
        {/* Play/Pause */}
        <button
          type="button"
          onClick={onTogglePlay}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
            isPlaying
              ? 'bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold'
              : 'bg-sky-600 hover:bg-sky-500 text-white'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>إيقاف مؤقت</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>تشغيل السقوط</span>
            </>
          )}
        </button>

        {/* Step back */}
        {onStepDelta && (
          <button
            type="button"
            onClick={() => onStepDelta(-0.05)}
            title="خطوة للخلف (0.05s)"
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            <StepBack className="w-4 h-4" />
          </button>
        )}

        {/* Step forward */}
        {onStepDelta && (
          <button
            type="button"
            onClick={() => onStepDelta(0.05)}
            title="خطوة للأمام (0.05s)"
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            <StepForward className="w-4 h-4" />
          </button>
        )}

        {/* Reset */}
        <button
          type="button"
          onClick={onReset}
          title="إعادة الكرة للقمة (t = 0)"
          className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Quick milestone jump points */}
      {onSeek && (
        <div className="flex items-center gap-1.5 text-xs" dir="rtl">
          <span className="text-slate-400 text-[11px] font-arabic">انتقال سريع:</span>
          <div className="flex items-center gap-1" dir="ltr">
            <button
              type="button"
              onClick={() => onSeek(0)}
              className="px-2 py-0.5 rounded border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700 cursor-pointer font-telemetry text-[11px]"
              title="البداية من السكون"
            >
              0s
            </button>
            <button
              type="button"
              onClick={() => onSeek(1.0)}
              className={`px-2 py-0.5 rounded border cursor-pointer font-telemetry text-[11px] ${
                activeTab === 3
                  ? 'border-sky-500/60 bg-sky-950/40 text-sky-300 font-bold'
                  : 'border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
              title="اللحظة المستهدفة في المطلب الثالث"
            >
              1.0s (م3)
            </button>
            <button
              type="button"
              onClick={() => onSeek(3.0)}
              className={`px-2 py-0.5 rounded border cursor-pointer font-telemetry text-[11px] ${
                activeTab === 2 || activeTab === 1
                  ? 'border-sky-500/60 bg-sky-950/40 text-sky-300 font-bold'
                  : 'border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
              title="لحظة الاصطدام بالأرض (المطلب 1 و 2)"
            >
              3.0s (اصطدام)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
