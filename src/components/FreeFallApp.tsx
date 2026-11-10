// ============================================================
// FreeFallApp — المكوّن الجامع
// يربط: الحالة (useFreeFall) + Canvas + UI
// ============================================================

'use client';

import dynamic from 'next/dynamic';
import { useFreeFall } from '@/hooks/useFreeFall';
import { Tabs } from '@/components/ui/physics/Tabs';
import { StepPanel } from '@/components/ui/physics/StepPanel';
import { ValuePanel } from '@/components/ui/physics/ValuePanel';
import { EquationPanel } from '@/components/ui/physics/EquationPanel';
import { MiniGraph } from '@/components/ui/physics/MiniGraph';
import { Controls } from '@/components/ui/physics/Controls';
import { Timeline } from '@/components/ui/physics/Timeline';
// تحميل Onboarding بدون SSR (يحتاج localStorage)
const Onboarding = dynamic(
  () => import('@/components/ui/physics/Onboarding').then((m) => m.Onboarding),
  { ssr: false }
);

// تحميل Canvas ديناميكياً (Three.js يعمل على العميل فقط)
const FreeFallCanvas = dynamic(
  () => import('@/components/scene/FreeFallCanvas').then((m) => m.FreeFallCanvas),
  { ssr: false, loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-sky-100 to-sky-50">
      <div className="text-slate-500 text-sm">جارٍ تحميل المشهد ثلاثي الأبعاد…</div>
    </div>
  )}
);

export function FreeFallApp() {
  const { state, actions, tRef, setTimeFromFrame } = useFreeFall();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100" dir="rtl">
      {/* دليل البداية التفاعلي */}
      <Onboarding />

      {/* الرأس */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-md">
              g
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                المثال 3 — السقوط الحر
              </h1>
              <p className="text-xs text-slate-500">
                كتاب الفيزياء — الصف الخامس علمي — الفصل الثاني — صفحة 42
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-slate-700 font-mono">g = −10 m/s²</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-slate-700 font-mono">vᵢ = 0</span>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="max-w-[1600px] mx-auto p-4">
        {/* التبويبات */}
        <div className="mb-4">
          <Tabs activeTab={state.activeTab} onTabChange={actions.setTab} />
        </div>

        {/* الشبكة الرئيسية: مشهد 3D (يسار) + لوحة جانبية (يمين في RTL) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-4">
          {/* العمود الأيمن بصرياً في RTL: المشهد 3D */}
          <div className="flex flex-col gap-3 order-2 lg:order-1">
            {/* المشهد 3D */}
            <div className="relative h-[55vh] lg:h-[65vh] rounded-xl overflow-hidden border border-slate-200 shadow-md bg-gradient-to-b from-sky-100 to-sky-50">
              <FreeFallCanvas
                t={state.t}
                isPlaying={state.isPlaying}
                tRef={tRef}
                onTimeUpdate={setTimeFromFrame}
                onImpact={actions.stopPlaying}
                hasReset={state.hasReset}
                activeTab={state.activeTab}
              />
              {/* تلميح تحكم بالكاميرا */}
              <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur px-3 py-1.5 rounded-md text-xs text-slate-600 pointer-events-none">
                🖱️ زر أيسر: تدوير • زر أيمن: تحريك • عجلة: تقريب
              </div>
              {/* تلميح التبويب */}
              <div className="absolute top-3 left-3 bg-white/80 backdrop-blur px-3 py-1.5 rounded-md text-xs text-slate-700 pointer-events-none font-bold">
                {state.activeTab === 1 && 'الجزء الأول: حساب الارتفاع'}
                {state.activeTab === 2 && 'الجزء الثاني: سرعة الاصطدام'}
                {state.activeTab === 3 && 'الجزء الثالث: عند t = 1s'}
              </div>
            </div>

            {/* شريط الزمن */}
            <Timeline t={state.t} onTimeChange={actions.setTime} />

            {/* عناصر التحكم */}
            <Controls
              isPlaying={state.isPlaying}
              activeTab={state.activeTab}
              onTogglePlay={actions.togglePlay}
              onReset={actions.reset}
              onNext={actions.nextTab}
              onPrev={actions.prevTab}
            />

            {/* الرسوم البيانية */}
            <MiniGraph t={state.t} />
          </div>

          {/* العمود الجانبي: الشرح + القيم + المعادلة */}
          <div className="flex flex-col gap-3 order-1 lg:order-2 lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto pr-1">
            {/* لوحة القيم الحية */}
            <ValuePanel t={state.t} activeTab={state.activeTab} />

            {/* لوحة الشرح */}
            <StepPanel activeTab={state.activeTab} />

            {/* لوحة المعادلات */}
            <EquationPanel
              activeTab={state.activeTab}
              solutionStep={state.solutionStep}
              onReveal={actions.revealSolutionStep}
              onReset={actions.resetSolution}
            />
          </div>
        </div>
      </main>

      {/* تذييل: ملاحظة المنهج */}
      <footer className="bg-white border-t border-slate-200 mt-4">
        <div className="max-w-[1600px] mx-auto px-4 py-3 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span>المعادلات الثلاث للسقوط الحر:</span>
            <span className="font-mono text-slate-700" dir="ltr">vf = g·t</span>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-slate-700" dir="ltr">Δy = ½·g·t²</span>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-slate-700" dir="ltr">vf = √(2·g·Δy)</span>
          </div>
          <div className="text-slate-400">
            ملاحظة: g ≈ 9.8 m/s²، يُقرّب في المسائل إلى −10 m/s²
          </div>
        </div>
      </footer>
    </div>
  );
}
