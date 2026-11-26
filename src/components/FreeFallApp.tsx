'use client';

import React, { useState, useEffect } from 'react';
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
import { CoordinateCard } from '@/components/ui/physics/CoordinateCard';
import { PracticeQuiz } from '@/components/ui/physics/PracticeQuiz';
import { PhysicsGlossaryButton } from '@/components/ui/physics/PhysicsGlossary';
import { GuidedTourButton, TourStep } from '@/components/ui/physics/GuidedTour';
import { G, T_TOTAL, VI } from '@/lib/constants';
import { Compass, Sparkles, BookOpen, Presentation, CheckCircle2 } from 'lucide-react';

const GuidedTourModal = dynamic(
  () => import('@/components/ui/physics/GuidedTour').then((m) => m.GuidedTour),
  { ssr: false }
);

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
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [highlightZone, setHighlightZone] = useState<TourStep['highlightZone']>('center');
  const [isLargeTextMode, setIsLargeTextMode] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    try {
      const seen = localStorage.getItem('free-fall-guided-tour-seen-v2');
      if (!seen) {
        timer = setTimeout(() => {
          setIsTourOpen(true);
        }, 200);
      }
    } catch {
      // ignore
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleStepDelta = (delta: number) => {
    actions.setTime(state.t + delta);
  };

  const handleSeek = (targetTime: number) => {
    actions.setTime(targetTime);
  };

  return (
    <div
      className={`min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-sky-500/30 selection:text-sky-200 ${
        isLargeTextMode ? 'text-base' : 'text-sm'
      }`}
      dir="rtl"
    >
      {/* Interactive Guided Tour */}
      <GuidedTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onHighlightChange={(zone) => setHighlightZone(zone)}
      />

      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-[1720px] mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Identity & Textbook Metadata */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-800/60 flex items-center justify-center text-sky-400 font-math text-lg font-bold">
              g
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold tracking-tight text-white font-arabic">
                  محاكاة السقوط الحر
                </h1>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-sky-300 font-mono border border-slate-800">
                  المثال 3 (ص 42)
                </span>
              </div>
              <p className="text-xs text-slate-400 font-arabic">
                الفيزياء للصف الخامس العلمي : الفصل الثاني (الحركة الخطية)
              </p>
            </div>
          </div>

          {/* Center: Textbook Givens (Explicitly showing givens only, without spoiling H) */}
          <div className="hidden md:flex items-center gap-2 text-xs font-telemetry bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-lg text-slate-300" dir="ltr">
            <span className="text-slate-400 font-arabic text-[11px]" dir="rtl">معطيات المسألة:</span>
            <span>vᵢ = {VI} m/s</span>
            <span className="text-slate-600">•</span>
            <span>g = {G} m/s² (↓)</span>
            <span className="text-slate-600">•</span>
            <span>t_total = {T_TOTAL} s</span>
          </div>

          {/* Action Tools & Mode Switcher */}
          <div className="flex items-center gap-2">
            {/* Mode Switcher */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5" dir="rtl">
              <button
                type="button"
                onClick={() => actions.setMode('explore')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                  state.mode === 'explore'
                    ? 'bg-sky-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>استكشاف الحل</span>
              </button>

              <button
                type="button"
                onClick={() => actions.setMode('practice')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                  state.mode === 'practice'
                    ? 'bg-amber-600 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>حاول بنفسك</span>
              </button>
            </div>

            <PhysicsGlossaryButton />
            <GuidedTourButton onTrigger={() => setIsTourOpen(true)} />

            {/* Large text / Projector mode toggle */}
            <button
              type="button"
              onClick={() => setIsLargeTextMode(!isLargeTextMode)}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isLargeTextMode
                  ? 'border-sky-500 bg-sky-950/40 text-sky-300'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
              title="تكبير الخط لوضع العرض والشاشات الكبيرة"
            >
              <Presentation className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Workstation */}
      <main className="max-w-[1720px] mx-auto p-3 sm:p-4 w-full flex-1 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_490px] xl:grid-cols-[1fr_530px] gap-3.5 flex-1">
          {/* Left Column: 3D Simulation Viewport + Controls + Axis + Graphs */}
          <div className="flex flex-col gap-3 order-2 lg:order-1">
            {/* 3D Viewport Box */}
            <div
              className={`relative h-[48vh] sm:h-[54vh] lg:h-[56vh] min-h-[380px] rounded-lg overflow-hidden border bg-slate-950 shadow-inner transition-all duration-300 ${
                isTourOpen && highlightZone === 'viewport'
                  ? 'border-sky-400 ring-2 ring-sky-400/30'
                  : 'border-slate-800/80'
              }`}
            >
              <FreeFallCanvas
                t={state.t}
                isPlaying={state.isPlaying}
                tRef={tRef}
                onTimeUpdate={setTimeFromFrame}
                onImpact={actions.stopPlaying}
                hasReset={state.hasReset}
                activeTab={state.activeTab}
                solutionStep={state.solutionStep}
              />

              {/* Viewport Overlay: Coordinate System Indicator */}
              <div
                className="absolute top-3 left-3 bg-slate-950/85 border border-slate-800/90 backdrop-blur px-2.5 py-1.5 rounded-lg text-xs font-telemetry text-slate-300 pointer-events-none flex flex-col items-center gap-0.5 shadow-md"
                dir="ltr"
              >
                <span className="text-[10px] text-sky-400 font-bold">+y ↑ (أعلى)</span>
                <span className="w-4 h-px bg-slate-700" />
                <span className="text-[10px] text-rose-400 font-bold">−y ↓ (أسفل)</span>
              </div>

              {/* Viewport Overlay: Vector Legend */}
              <div
                className="absolute top-3 right-3 bg-slate-950/85 border border-slate-800/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs text-slate-300 pointer-events-none flex items-center gap-3 font-arabic shadow-md"
                dir="rtl"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  <span className="text-slate-200">السرعة vf (↓)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                  <span className="text-slate-200">التعجيل g (↓)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span className="text-slate-200">الارتفاع h</span>
                </div>
              </div>

              {/* Viewport Overlay: Camera Navigation Hint */}
              <div
                className="absolute bottom-3 right-3 bg-slate-950/80 border border-slate-800/70 backdrop-blur px-2.5 py-1 rounded text-[11px] text-slate-400 pointer-events-none font-arabic"
                dir="rtl"
              >
                الكاميرا: تدوير بالماوس • تحريك بالزر الأيمن • تقريب بالعجلة
              </div>
            </div>

            {/* Unified Simulation Transport Dock */}
            <div
              className={`bg-slate-900 border rounded-lg p-3 space-y-2 transition-all duration-300 ${
                isTourOpen && highlightZone === 'dock'
                  ? 'border-sky-400 ring-2 ring-sky-400/30'
                  : 'border-slate-800/80'
              }`}
            >
              <Timeline t={state.t} onTimeChange={actions.setTime} />
              <Controls
                isPlaying={state.isPlaying}
                activeTab={state.activeTab}
                onTogglePlay={actions.togglePlay}
                onReset={actions.reset}
                onStepDelta={handleStepDelta}
                onSeek={handleSeek}
                onJumpToTabTarget={actions.jumpToTabTargetTime}
              />
            </div>

            {/* Coordinate System & Negative Sign Explanation Card */}
            <CoordinateCard />

            {/* Synchronized Kinematics Graphs */}
            <MiniGraph t={state.t} />
          </div>

          {/* Right Column: Problem Statement + Tabs + Derivation/Quiz + Telemetry */}
          <div className="flex flex-col gap-3 order-1 lg:order-2">
            {/* Textbook Problem Banner */}
            <QuestionCard />

            {/* Curriculum Step Tabs */}
            <Tabs
              activeTab={state.activeTab}
              solutionStep={state.solutionStep}
              onTabChange={actions.setTab}
            />

            {/* Solution Studio: Either Practice Quiz or Step-by-Step Derivation */}
            <div
              className={`bg-slate-900 border rounded-lg p-3.5 space-y-3 transition-all duration-300 ${
                isTourOpen && highlightZone === 'tabs'
                  ? 'border-sky-400 ring-2 ring-sky-400/30'
                  : 'border-slate-800/80'
              }`}
            >
              {state.mode === 'practice' ? (
                <div className="space-y-3">
                  <PracticeQuiz activeTab={state.activeTab} />
                  <div className="border-t border-slate-800/60 pt-3">
                    <button
                      type="button"
                      onClick={() => actions.setMode('explore')}
                      className="w-full py-2 px-3 rounded-lg bg-slate-950 hover:bg-slate-800 text-sky-400 border border-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>الانتقال إلى خطوات الاشتقاق التفصيلية للمنهج</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <StepPanel activeTab={state.activeTab} />
                  <div className="border-t border-slate-800/60 pt-3">
                    <EquationPanel
                      activeTab={state.activeTab}
                      solutionStep={state.solutionStep}
                      onReveal={actions.revealSolutionStep}
                      onRevealAll={actions.revealAllSteps}
                      onReset={actions.resetSolution}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Real-time Telemetry Readout */}
            <div
              className={`rounded-lg transition-all duration-300 ${
                isTourOpen && highlightZone === 'telemetry'
                  ? 'ring-2 ring-sky-400/40'
                  : ''
              }`}
            >
              <ValuePanel
                t={state.t}
                activeTab={state.activeTab}
                onSeek={handleSeek}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
