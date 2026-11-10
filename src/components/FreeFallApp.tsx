'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useFreeFall } from '@/hooks/useFreeFall';
import { Tabs } from '@/components/ui/physics/Tabs';
import { StepPanel } from '@/components/ui/physics/StepPanel';
import { ValuePanel } from '@/components/ui/physics/ValuePanel';
import { EquationPanel } from '@/components/ui/physics/EquationPanel';
import { MiniGraph } from '@/components/ui/physics/MiniGraph';
import { Controls } from '@/components/ui/physics/Controls';
import { Timeline } from '@/components/ui/physics/Timeline';
import { QuestionCard } from '@/components/ui/physics/QuestionCard';
import { MathText } from '@/components/ui/physics/MathText';
import { Onboarding } from '@/components/ui/physics/Onboarding';
import { G, H_INITIAL, T_TOTAL, VI } from '@/lib/constants';

// Load Onboarding without SSR
const OnboardingModal = dynamic(
  () => import('@/components/ui/physics/Onboarding').then((m) => m.Onboarding),
  { ssr: false }
);

// Load 3D Canvas dynamically
const FreeFallCanvas = dynamic(
  () => import('@/components/scene/FreeFallCanvas').then((m) => m.FreeFallCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-400 gap-2 font-mono text-xs">
        <div className="w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
        <span>جارٍ تهيئة محرك الفيزياء ثلاثي الأبعاد...</span>
      </div>
    ),
  }
);

export function FreeFallApp() {
  const { state, actions, tRef, setTimeFromFrame } = useFreeFall();

  const handleStepDelta = (delta: number) => {
    actions.setTime(state.t + delta);
  };

  const handleSeek = (targetTime: number) => {
    actions.setTime(targetTime);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-sky-500/30 selection:text-sky-200" dir="rtl">
      {/* Interactive Onboarding */}
      <OnboardingModal />

      {/* Top Laboratory Station Header */}
      <header className="border-b border-slate-800/60 bg-slate-950/80 sticky top-0 z-30 backdrop-blur">
        <div className="max-w-[1720px] mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          {/* Identity & Textbook Metadata */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400/90 font-math text-base font-semibold">
              g
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold tracking-tight text-white font-arabic">
                  محاكاة السقوط الحر
                </h1>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 font-mono border border-slate-800">
                  المثال 3 (ص 42)
                </span>
              </div>
              <p className="text-xs text-slate-400 font-arabic">
                الفيزياء للصف الخامس العلمي : الفصل الثاني
              </p>
            </div>
          </div>

          {/* Curriculum Parameters Summary */}
          <div className="flex items-center gap-2 text-[11px] font-telemetry text-slate-400" dir="ltr">
            <span>g = {G} m/s²</span>
            <span className="text-slate-700">•</span>
            <span>H = {H_INITIAL} m</span>
            <span className="text-slate-700">•</span>
            <span>t = {T_TOTAL} s</span>
          </div>
        </div>
      </header>

      {/* Main Split Workstation */}
      <main className="max-w-[1720px] mx-auto p-3 sm:p-4 w-full flex-1 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_470px] xl:grid-cols-[1fr_510px] gap-3.5 flex-1">
          {/* Left Column: 3D Simulation Viewport + Controls + Graphs */}
          <div className="flex flex-col gap-3 order-2 lg:order-1">
            {/* 3D Viewport Box */}
            <div className="relative h-[48vh] sm:h-[55vh] lg:h-[58vh] min-h-[380px] rounded-lg overflow-hidden border border-slate-800/80 bg-slate-950 shadow-inner">
              <FreeFallCanvas
                t={state.t}
                isPlaying={state.isPlaying}
                tRef={tRef}
                onTimeUpdate={setTimeFromFrame}
                onImpact={actions.stopPlaying}
                hasReset={state.hasReset}
                activeTab={state.activeTab}
              />

              {/* Viewport Overlay: Streamlined Vector Legend */}
              <div
                className="absolute top-3 right-3 bg-slate-950/80 border border-slate-800/80 backdrop-blur px-2.5 py-1 rounded text-[11px] text-slate-400 pointer-events-none flex items-center gap-3 font-arabic"
                dir="rtl"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400/80 shrink-0" />
                  <span className="text-slate-300">السرعة vf</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80 shrink-0" />
                  <span className="text-slate-300">التعجيل g</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shrink-0" />
                  <span className="text-slate-300">الارتفاع h</span>
                </div>
              </div>

              {/* Viewport Overlay: Camera Navigation Hint */}
              <div
                className="absolute bottom-3 right-3 bg-slate-950/70 border border-slate-800/60 backdrop-blur px-2 py-0.5 rounded text-[10px] text-slate-500 pointer-events-none"
                dir="rtl"
              >
                الكاميرا: تدوير بالماوس • تحريك بالزر الأيمن • تقريب بالعجلة
              </div>
            </div>

            {/* Unified Simulation Transport Dock */}
            <div className="bg-slate-900 border border-slate-800/80 rounded-lg p-2.5 space-y-2">
              <Timeline t={state.t} onTimeChange={actions.setTime} />
              <Controls
                isPlaying={state.isPlaying}
                activeTab={state.activeTab}
                onTogglePlay={actions.togglePlay}
                onReset={actions.reset}
                onStepDelta={handleStepDelta}
                onSeek={handleSeek}
              />
            </div>

            {/* Synchronized Graphs */}
            <MiniGraph t={state.t} />
          </div>

          {/* Right Column: Curriculum Problem Statement + Tabs + Derivation + Telemetry */}
          <div className="flex flex-col gap-3 order-1 lg:order-2">
            {/* Textbook Problem Banner */}
            <QuestionCard />

            {/* Curriculum Step Tabs */}
            <Tabs activeTab={state.activeTab} onTabChange={actions.setTab} />

            {/* Integrated Solution Studio: Concept & Mathematical Derivation */}
            <div className="bg-slate-900 border border-slate-800/80 rounded-lg p-3.5 space-y-3">
              <StepPanel activeTab={state.activeTab} />
              <div className="border-t border-slate-800/60 pt-3">
                <EquationPanel
                  activeTab={state.activeTab}
                  solutionStep={state.solutionStep}
                  onReveal={actions.revealSolutionStep}
                  onReset={actions.resetSolution}
                />
              </div>
            </div>

            {/* Real-time Telemetry Readout */}
            <ValuePanel t={state.t} activeTab={state.activeTab} />
          </div>
        </div>
      </main>
    </div>
  );
}
