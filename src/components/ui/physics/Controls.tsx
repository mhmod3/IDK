'use client';

import React from 'react';
import { Play, Pause, RotateCcw, StepForward, StepBack } from 'lucide-react';
import type { TabId } from '@/hooks/useFreeFall';

interface ControlsProps {
  isPlaying: boolean;
  activeTab: TabId;
  onTogglePlay: () => void;
  onReset: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onStepDelta?: (delta: number) => void;
  onSeek?: (time: number) => void;
}

export function Controls({
  isPlaying,
  onTogglePlay,
  onReset,
  onStepDelta,
  onSeek,
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
          className={`px-3.5 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
            isPlaying
              ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/20'
              : 'bg-sky-600/90 hover:bg-sky-600 text-white'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>إيقاف</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>تشغيل</span>
            </>
          )}
        </button>

        {/* Step back */}
        {onStepDelta && (
          <button
            type="button"
            onClick={() => onStepDelta(-0.05)}
            title="خطوة للخلف (0.05s)"
            className="p-1.5 rounded border border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors cursor-pointer"
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
            className="p-1.5 rounded border border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors cursor-pointer"
          >
            <StepForward className="w-4 h-4" />
          </button>
        )}

        {/* Reset */}
        <button
          type="button"
          onClick={onReset}
          title="إعادة البداية (t = 0)"
          className="p-1.5 rounded border border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Quick milestone jump points */}
      {onSeek && (
        <div className="flex items-center gap-1.5 text-xs" dir="rtl">
          <span className="text-slate-500 text-[11px] font-arabic">انتقال:</span>
          <div className="flex items-center gap-1" dir="ltr">
            <button
              type="button"
              onClick={() => onSeek(0)}
              className="px-2 py-0.5 rounded border border-slate-800/80 hover:border-slate-700 bg-slate-950 text-slate-400 hover:text-slate-200 cursor-pointer font-telemetry text-[11px]"
            >
              0s
            </button>
            <button
              type="button"
              onClick={() => onSeek(1.0)}
              className="px-2 py-0.5 rounded border border-slate-800/80 hover:border-slate-700 bg-slate-950 text-slate-300 hover:text-slate-100 cursor-pointer font-telemetry text-[11px]"
            >
              1.0s (م3)
            </button>
            <button
              type="button"
              onClick={() => onSeek(3.0)}
              className="px-2 py-0.5 rounded border border-slate-800/80 hover:border-slate-700 bg-slate-950 text-slate-300 hover:text-slate-100 cursor-pointer font-telemetry text-[11px]"
            >
              3.0s (اصطدام)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
