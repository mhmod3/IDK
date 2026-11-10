'use client';

import React from 'react';
import { T_TOTAL } from '@/lib/constants';

interface TimelineProps {
  t: number;
  onTimeChange: (t: number) => void;
}

export function Timeline({ t, onTimeChange }: TimelineProps) {
  const percentage = Math.min(100, Math.max(0, (t / T_TOTAL) * 100));

  return (
    <div className="space-y-1.5" dir="ltr">
      <div className="flex items-center justify-between text-xs" dir="rtl">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">الزمن:</span>
          <span className="text-slate-100 font-medium text-xs font-telemetry" dir="ltr">
            {t.toFixed(2)} / {T_TOTAL.toFixed(2)} s
          </span>
        </div>
      </div>

      <div className="relative py-1">
        {/* Track Container */}
        <div className="h-2 bg-slate-950 border border-slate-800/80 rounded-full relative overflow-hidden">
          {/* Active progress fill */}
          <div
            className="absolute top-0 left-0 h-full bg-sky-500/70 rounded-full transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Milestone Tick Lines */}
        {[0, 1, 2, 3].map((tick) => {
          const tickPct = (tick / T_TOTAL) * 100;
          return (
            <div
              key={`tick-${tick}`}
              className="absolute top-0 -translate-x-1/2 flex flex-col items-center pointer-events-none"
              style={{ left: `${tickPct}%` }}
            >
              <div className="w-px h-3.5 bg-slate-700" />
              <span className="text-[10px] font-mono text-slate-500 mt-1">
                {tick}s
              </span>
            </div>
          );
        })}

        {/* Real HTML Range Slider for smooth drag & touch interactions */}
        <input
          type="range"
          min={0}
          max={T_TOTAL}
          step={0.01}
          value={t}
          aria-label="الزمن المنقضي بالثواني"
          onChange={(e) => onTimeChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {/* Visual Playhead Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-slate-200 border-2 border-slate-950 rounded-full pointer-events-none z-0"
          style={{ left: `${percentage}%` }}
        />
      </div>

      {/* Spacing for tick labels below track */}
      <div className="h-2" />
    </div>
  );
}
