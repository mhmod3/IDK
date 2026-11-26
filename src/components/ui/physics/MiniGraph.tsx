'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, LineChart, Info } from 'lucide-react';
import { T_TOTAL } from '@/lib/constants';
import { velocity, displacement, speed } from '@/lib/physics';
import { MathText } from './MathText';

interface MiniGraphProps {
  t: number;
}

const WIDTH = 340;
const HEIGHT = 145;
const PADDING = { top: 18, right: 16, bottom: 26, left: 44 };

export function MiniGraph({ t }: MiniGraphProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800/80 rounded-lg p-3 space-y-2.5 transition-all" dir="rtl">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-right cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-sky-950 border border-sky-800/60 flex items-center justify-center text-sky-400">
            <LineChart className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
              الرسوم البيانية الحركية (الإزاحة Δy والسرعة المتجهة vf)
            </h3>
            <span className="text-[10px] text-slate-400 font-arabic">
              تحليل ميل المنحنى والعلاقة مع الزمن
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-telemetry text-slate-400" dir="ltr">
            t = {t.toFixed(2)}s
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="space-y-3 pt-2 border-t border-slate-800/60 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" dir="ltr">
            <DisplacementGraph t={t} />
            <VelocityGraph t={t} />
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-300 font-arabic leading-relaxed flex items-start gap-2" dir="rtl">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <strong>ملاحظة فيزيائية على الرسمين:</strong> المنحنيان يقعان تحت محور الصفر (في النطاق السالب) لأننا اخترنا الأعلى موجباً (+y ↑)، وبالتالي كل إزاحة وسرعة لأسفل تظهر سالبة. ميل منحنى السرعة المتجهة يساوي تماماً تعجيل الجاذبية <span className="font-telemetry" dir="ltr">g = −10 m/s²</span>.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DisplacementGraph({ t }: { t: number }) {
  const yMin = -45;
  const yMax = 0;

  const plotX = (time: number) =>
    PADDING.left + (time / T_TOTAL) * (WIDTH - PADDING.left - PADDING.right);

  const plotY = (val: number) => {
    const range = yMax - yMin;
    const norm = (yMax - val) / range;
    return PADDING.top + norm * (HEIGHT - PADDING.top - PADDING.bottom);
  };

  const points: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const time = (i / 60) * T_TOTAL;
    const val = displacement(time);
    points.push(`${plotX(time).toFixed(1)},${plotY(val).toFixed(1)}`);
  }
  const pathData = `M ${points.join(' L ')}`;
  const currentDy = displacement(t);
  const dotX = plotX(t);
  const dotY = plotY(currentDy);

  return (
    <div className="space-y-1.5 p-2 rounded-lg bg-slate-950 border border-slate-800">
      <div className="flex items-center justify-between mb-1 text-xs px-1">
        <div className="font-bold text-slate-200">
          <MathText>Δy - t</MathText>
          <span className="text-[10px] text-slate-400 font-arabic ml-1">(منحنى الإزاحة الرأسية)</span>
        </div>
        <div className="font-telemetry text-xs font-semibold text-amber-400">
          Δy = {currentDy.toFixed(1)} m
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto">
        {/* Horizontal grid lines */}
        {[0, -15, -30, -45].map((v) => (
          <g key={`y-grid-${v}`}>
            <line
              x1={PADDING.left}
              y1={plotY(v)}
              x2={WIDTH - PADDING.right}
              y2={plotY(v)}
              stroke="#1e293b"
              strokeDasharray="2 2"
              strokeWidth={1}
            />
            <text
              x={PADDING.left - 6}
              y={plotY(v) + 3}
              textAnchor="end"
              fill="#64748b"
              fontSize="9"
              fontFamily="monospace"
            >
              {v}m
            </text>
          </g>
        ))}

        {/* Vertical time grid */}
        {[0, 1, 2, 3].map((tick) => (
          <g key={`t-grid-${tick}`}>
            <line
              x1={plotX(tick)}
              y1={PADDING.top}
              x2={plotX(tick)}
              y2={HEIGHT - PADDING.bottom}
              stroke="#1e293b"
              strokeDasharray="2 2"
              strokeWidth={1}
            />
            <text
              x={plotX(tick)}
              y={HEIGHT - PADDING.bottom + 14}
              textAnchor="middle"
              fill="#64748b"
              fontSize="9"
              fontFamily="monospace"
            >
              {tick}s
            </text>
          </g>
        ))}

        {/* Parabola curve */}
        <path d={pathData} fill="none" stroke="#f59e0b" strokeWidth={2} />

        {/* Real-time Tracking Crosshair */}
        <line
          x1={dotX}
          y1={PADDING.top}
          x2={dotX}
          y2={HEIGHT - PADDING.bottom}
          stroke="#f59e0b"
          strokeOpacity={0.3}
          strokeWidth={1}
        />
        <line
          x1={PADDING.left}
          y1={dotY}
          x2={WIDTH - PADDING.right}
          y2={dotY}
          stroke="#f59e0b"
          strokeOpacity={0.3}
          strokeWidth={1}
        />

        {/* Tracking Dot */}
        <circle cx={dotX} cy={dotY} r={4.5} fill="#f59e0b" stroke="#020617" strokeWidth={1.5} />
      </svg>
    </div>
  );
}

function VelocityGraph({ t }: { t: number }) {
  const vMin = -30;
  const vMax = 0;

  const plotX = (time: number) =>
    PADDING.left + (time / T_TOTAL) * (WIDTH - PADDING.left - PADDING.right);

  const plotY = (val: number) => {
    const range = vMax - vMin;
    const norm = (vMax - val) / range;
    return PADDING.top + norm * (HEIGHT - PADDING.top - PADDING.bottom);
  };

  const lineStartX = plotX(0);
  const lineStartY = plotY(0);
  const lineEndX = plotX(T_TOTAL);
  const lineEndY = plotY(velocity(T_TOTAL));

  const currentV = velocity(t);
  const currentSpeed = speed(t);
  const dotX = plotX(t);
  const dotY = plotY(currentV);

  return (
    <div className="space-y-1.5 p-2 rounded-lg bg-slate-950 border border-slate-800">
      <div className="flex items-center justify-between mb-1 text-xs px-1">
        <div className="font-bold text-slate-200">
          <MathText>v_f - t</MathText>
          <span className="text-[10px] text-slate-400 font-arabic ml-1">(منحنى السرعة المتجهة)</span>
        </div>
        <div className="font-telemetry text-xs font-semibold text-rose-400">
          vf = {currentV.toFixed(1)} m/s (|v| = {currentSpeed.toFixed(0)})
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto">
        {/* Horizontal grid lines */}
        {[0, -10, -20, -30].map((v) => (
          <g key={`v-grid-${v}`}>
            <line
              x1={PADDING.left}
              y1={plotY(v)}
              x2={WIDTH - PADDING.right}
              y2={plotY(v)}
              stroke="#1e293b"
              strokeDasharray="2 2"
              strokeWidth={1}
            />
            <text
              x={PADDING.left - 6}
              y={plotY(v) + 3}
              textAnchor="end"
              fill="#64748b"
              fontSize="9"
              fontFamily="monospace"
            >
              {v}
            </text>
          </g>
        ))}

        {/* Vertical time grid */}
        {[0, 1, 2, 3].map((tick) => (
          <g key={`vt-grid-${tick}`}>
            <line
              x1={plotX(tick)}
              y1={PADDING.top}
              x2={plotX(tick)}
              y2={HEIGHT - PADDING.bottom}
              stroke="#1e293b"
              strokeDasharray="2 2"
              strokeWidth={1}
            />
            <text
              x={plotX(tick)}
              y={HEIGHT - PADDING.bottom + 14}
              textAnchor="middle"
              fill="#64748b"
              fontSize="9"
              fontFamily="monospace"
            >
              {tick}s
            </text>
          </g>
        ))}

        {/* Linear velocity line: slope = g = -10 */}
        <line
          x1={lineStartX}
          y1={lineStartY}
          x2={lineEndX}
          y2={lineEndY}
          stroke="#f43f5e"
          strokeWidth={2}
        />

        {/* Real-time Tracking Crosshair */}
        <line
          x1={dotX}
          y1={PADDING.top}
          x2={dotX}
          y2={HEIGHT - PADDING.bottom}
          stroke="#f43f5e"
          strokeOpacity={0.3}
          strokeWidth={1}
        />
        <line
          x1={PADDING.left}
          y1={dotY}
          x2={WIDTH - PADDING.right}
          y2={dotY}
          stroke="#f43f5e"
          strokeOpacity={0.3}
          strokeWidth={1}
        />

        {/* Tracking Dot */}
        <circle cx={dotX} cy={dotY} r={4.5} fill="#f43f5e" stroke="#020617" strokeWidth={1.5} />
      </svg>
    </div>
  );
}
