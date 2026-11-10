// ============================================================
// MiniGraph — رسمان بيانيان متزامنان (y–t و v–t) بـ SVG
// نقطة حمراء تتحرك على المنحنى مع تقدّم الزمن
// ============================================================

'use client';

import { Card } from '@/components/ui/card';
import { G, T_TOTAL, H_INITIAL } from '@/lib/constants';
import { velocity, displacement } from '@/lib/physics';
import { MathText } from './MathText';

interface MiniGraphProps {
  t: number;
}

const WIDTH = 280;
const HEIGHT = 160;
const PADDING = { top: 18, right: 16, bottom: 28, left: 38 };

export function MiniGraph({ t }: MiniGraphProps) {
  return (
    <Card className="p-3 bg-white shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-2 border-b pb-1.5">
        الرسوم البيانية المتزامنة
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <DisplacementGraph t={t} />
        <VelocityGraph t={t} />
      </div>
    </Card>
  );
}

// ============= رسم Δy – t =============
function DisplacementGraph({ t }: { t: number }) {
  // Δy من 0 إلى -45 عبر الزمن من 0 إلى 3s
  // الصيغة: Δy = ½·g·t² (قطع مكافئ نحو الأسفل)
  const yMin = -45;
  const yMax = 0;

  const plotX = (time: number) =>
    PADDING.left + (time / T_TOTAL) * (WIDTH - PADDING.left - PADDING.right);

  const plotY = (val: number) => {
    const range = yMax - yMin; // 45
    const norm = (yMax - val) / range; // 0..1
    return PADDING.top + norm * (HEIGHT - PADDING.top - PADDING.bottom);
  };

  // إنشاء نقاط المنحنى
  const points: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const time = (i / 60) * T_TOTAL;
    const val = displacement(time);
    points.push(`${plotX(time)},${plotY(val)}`);
  }
  const pathData = `M ${points.join(' L ')}`;

  // المنطقة تحت المنحنى (تظليل)
  const areaData = `${pathData} L ${plotX(T_TOTAL)},${plotY(0)} L ${plotX(0)},${plotY(0)} Z`;

  // النقطة المتحركة
  const currentDy = displacement(t);
  const dotX = plotX(t);
  const dotY = plotY(currentDy);

  return (
    <div>
      <div className="text-xs font-bold text-slate-700 text-center mb-1" dir="ltr">
        <MathText>Δy – t</MathText>
      </div>
      <svg width={WIDTH} height={HEIGHT} className="w-full">
        {/* الشبكة */}
        {[0, -15, -30, -45].map((v) => (
          <line
            key={`grid-${v}`}
            x1={PADDING.left}
            y1={plotY(v)}
            x2={WIDTH - PADDING.right}
            y2={plotY(v)}
            stroke="#e2e8f0"
            strokeWidth={1}
          />
        ))}
        {[0, 1, 2, 3].map((tt) => (
          <line
            key={`vgrid-${tt}`}
            x1={plotX(tt)}
            y1={PADDING.top}
            x2={plotX(tt)}
            y2={HEIGHT - PADDING.bottom}
            stroke="#e2e8f0"
            strokeWidth={1}
          />
        ))}

        {/* المنطقة تحت المنحنى */}
        <path d={areaData} fill="#a78bfa" fillOpacity={0.2} />

        {/* المنحنى */}
        <path d={pathData} fill="none" stroke="#7c3aed" strokeWidth={2} />

        {/* محور x */}
        <line
          x1={PADDING.left}
          y1={HEIGHT - PADDING.bottom}
          x2={WIDTH - PADDING.right}
          y2={HEIGHT - PADDING.bottom}
          stroke="#1e293b"
          strokeWidth={1}
        />
        {/* محور y */}
        <line
          x1={PADDING.left}
          y1={PADDING.top}
          x2={PADDING.left}
          y2={HEIGHT - PADDING.bottom}
          stroke="#1e293b"
          strokeWidth={1}
        />

        {/* تسميات محور x */}
        {[0, 1, 2, 3].map((tt) => (
          <text
            key={`xlabel-${tt}`}
            x={plotX(tt)}
            y={HEIGHT - PADDING.bottom + 14}
            textAnchor="middle"
            fontSize={9}
            fill="#475569"
          >
            {tt}
          </text>
        ))}
        {/* تسميات محور y */}
        {[0, -15, -30, -45].map((v) => (
          <text
            key={`ylabel-${v}`}
            x={PADDING.left - 6}
            y={plotY(v) + 3}
            textAnchor="end"
            fontSize={9}
            fill="#475569"
          >
            {v}
          </text>
        ))}
        {/* تسميات المحاور */}
        <text
          x={WIDTH / 2}
          y={HEIGHT - 4}
          textAnchor="middle"
          fontSize={9}
          fill="#1e293b"
          fontWeight="bold"
        >
          t (s)
        </text>
        <text
          x={8}
          y={HEIGHT / 2}
          textAnchor="middle"
          fontSize={9}
          fill="#1e293b"
          fontWeight="bold"
          transform={`rotate(-90, 8, ${HEIGHT / 2})`}
        >
          Δy (m)
        </text>

        {/* النقطة المتحركة */}
        <circle cx={dotX} cy={dotY} r={4} fill="#ef4444" stroke="white" strokeWidth={1.5} />
        {/* قيمة النقطة */}
        <text
          x={dotX + 8}
          y={dotY - 4}
          fontSize={9}
          fill="#b91c1c"
          fontWeight="bold"
        >
          ({t.toFixed(1)}, {currentDy.toFixed(1)})
        </text>
      </svg>
    </div>
  );
}

// ============= رسم vf – t =============
function VelocityGraph({ t }: { t: number }) {
  // vf من 0 إلى -30 عبر الزمن من 0 إلى 3s
  // الصيغة: vf = g·t (خط مستقيم ميله -10)
  const yMin = -30;
  const yMax = 0;

  const plotX = (time: number) =>
    PADDING.left + (time / T_TOTAL) * (WIDTH - PADDING.left - PADDING.right);

  const plotY = (val: number) => {
    const range = yMax - yMin; // 30
    const norm = (yMax - val) / range;
    return PADDING.top + norm * (HEIGHT - PADDING.top - PADDING.bottom);
  };

  // الخط المستقيم
  const x0 = plotX(0);
  const y0 = plotY(0);
  const xEnd = plotX(T_TOTAL);
  const yEnd = plotY(velocity(T_TOTAL));

  // المنطقة تحت الخط
  const areaData = `M ${x0},${y0} L ${xEnd},${yEnd} L ${xEnd},${y0} Z`;

  // النقطة المتحركة
  const currentVf = velocity(t);
  const dotX = plotX(t);
  const dotY = plotY(currentVf);

  return (
    <div>
      <div className="text-xs font-bold text-slate-700 text-center mb-1" dir="ltr">
        <MathText>v_f – t</MathText>
      </div>
      <svg width={WIDTH} height={HEIGHT} className="w-full">
        {/* الشبكة */}
        {[0, -10, -20, -30].map((v) => (
          <line
            key={`vgrid-y-${v}`}
            x1={PADDING.left}
            y1={plotY(v)}
            x2={WIDTH - PADDING.right}
            y2={plotY(v)}
            stroke="#e2e8f0"
            strokeWidth={1}
          />
        ))}
        {[0, 1, 2, 3].map((tt) => (
          <line
            key={`vgrid-x-${tt}`}
            x1={plotX(tt)}
            y1={PADDING.top}
            x2={plotX(tt)}
            y2={HEIGHT - PADDING.bottom}
            stroke="#e2e8f0"
            strokeWidth={1}
          />
        ))}

        {/* المنطقة تحت الخط */}
        <path d={areaData} fill="#ef4444" fillOpacity={0.15} />

        {/* الخط */}
        <line x1={x0} y1={y0} x2={xEnd} y2={yEnd} stroke="#dc2626" strokeWidth={2.5} />

        {/* المحاور */}
        <line
          x1={PADDING.left}
          y1={HEIGHT - PADDING.bottom}
          x2={WIDTH - PADDING.right}
          y2={HEIGHT - PADDING.bottom}
          stroke="#1e293b"
          strokeWidth={1}
        />
        <line
          x1={PADDING.left}
          y1={PADDING.top}
          x2={PADDING.left}
          y2={HEIGHT - PADDING.bottom}
          stroke="#1e293b"
          strokeWidth={1}
        />

        {/* تسميات x */}
        {[0, 1, 2, 3].map((tt) => (
          <text
            key={`vx-${tt}`}
            x={plotX(tt)}
            y={HEIGHT - PADDING.bottom + 14}
            textAnchor="middle"
            fontSize={9}
            fill="#475569"
          >
            {tt}
          </text>
        ))}
        {/* تسميات y */}
        {[0, -10, -20, -30].map((v) => (
          <text
            key={`vy-${v}`}
            x={PADDING.left - 6}
            y={plotY(v) + 3}
            textAnchor="end"
            fontSize={9}
            fill="#475569"
          >
            {v}
          </text>
        ))}

        {/* تسمية الميل */}
        <text
          x={WIDTH - PADDING.right - 8}
          y={PADDING.top + 12}
          textAnchor="end"
          fontSize={9}
          fill="#1d4ed8"
          fontWeight="bold"
        >
          الميل = g = −10 m/s²
        </text>

        {/* تسميات المحاور */}
        <text
          x={WIDTH / 2}
          y={HEIGHT - 4}
          textAnchor="middle"
          fontSize={9}
          fill="#1e293b"
          fontWeight="bold"
        >
          t (s)
        </text>
        <text
          x={8}
          y={HEIGHT / 2}
          textAnchor="middle"
          fontSize={9}
          fill="#1e293b"
          fontWeight="bold"
          transform={`rotate(-90, 8, ${HEIGHT / 2})`}
        >
            v_f (m/s)
        </text>

        {/* النقطة المتحركة */}
        <circle cx={dotX} cy={dotY} r={4} fill="#ef4444" stroke="white" strokeWidth={1.5} />
        <text
          x={dotX + 8}
          y={dotY - 4}
          fontSize={9}
          fill="#b91c1c"
          fontWeight="bold"
        >
          ({t.toFixed(1)}, {currentVf.toFixed(1)})
        </text>
      </svg>
    </div>
  );
}
