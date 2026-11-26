// ============================================================
// useFreeFall — hook إدارة حالة محاكاة السقوط الحر والمسار التعليمي
// ============================================================

'use client';

import { useState, useCallback, useRef } from 'react';
import { T_TOTAL, T_PART3, G, H_INITIAL } from '@/lib/constants';
import { clampTime } from '@/lib/physics';

export type TabId = 1 | 2 | 3;
export type AppMode = 'explore' | 'practice';

export interface FreeFallState {
  // الزمن الحالي (s) — في النطاق [0, 3]
  t: number;
  // هل الكرة في حالة سقوط نشط؟
  isPlaying: boolean;
  // التبويب الحالي (المطلب 1، 2، أو 3)
  activeTab: TabId;
  // عدد خطوات الحل المكشوفة في التبويب الحالي
  solutionStep: number;
  // الوضع التعليمي الحالي: استكشاف تفاعلي أو اختبار ذاتي
  mode: AppMode;
  // هل تم إعادة الضبط للتو؟
  hasReset: boolean;
  // اللحظة الزمنية المستهدفة للمطلب الحالي
  targetTime: number;
  // هل الزمن الحالي مطابق للحظة المستهدفة للمطلب؟
  isTimeAtTarget: boolean;
}

export interface FreeFallActions {
  // تشغيل/إيقاف
  togglePlay: () => void;
  // تعيين زمن محدد (من شريط الزمن أو الأزرار)
  setTime: (t: number) => void;
  // الانتقال للحظة المستهدفة للتبويب الحالي
  jumpToTabTargetTime: () => void;
  // إعادة الضبط للبداية (t = 0)
  reset: () => void;
  // الانتقال للتبويب التالي
  nextTab: () => void;
  // الانتقال للتبويب السابق
  prevTab: () => void;
  // تعيين تبويب مباشرة مع مزامنة الزمن المناسب
  setTab: (tab: TabId) => void;
  // كشف خطوة جديدة من خطوات الحل
  revealSolutionStep: () => void;
  // كشف جميع خطوات الحل دفعة واحدة
  revealAllSteps: () => void;
  // إعادة ضبط خطوات الحل
  resetSolution: () => void;
  // تغيير الوضع التعليمي (استكشاف / اختبار)
  setMode: (mode: AppMode) => void;
  // إيقاف التشغيل عند الاصطدام
  stopPlaying: () => void;
}

const TAB_TARGET_TIMES: Record<TabId, number> = {
  1: T_TOTAL, // 3s
  2: T_TOTAL, // 3s
  3: T_PART3, // 1s
};

export function useFreeFall() {
  const [t, setTState] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabId>(1);
  const [solutionStep, setSolutionStep] = useState<number>(0);
  const [mode, setModeState] = useState<AppMode>('explore');
  const [hasReset, setHasReset] = useState<boolean>(false);

  // مرجع للزمن داخل حلقة الرسم useFrame
  const tRef = useRef<number>(0);
  const lastUiUpdate = useRef<number>(0);

  // تحديث الزمن من داخل useFrame بتردد سلس للواجهة
  const setTimeFromFrame = useCallback((newT: number) => {
    const clamped = clampTime(newT);
    tRef.current = clamped;
    if (Math.abs(lastUiUpdate.current - clamped) >= 0.05 || clamped >= T_TOTAL || clamped === 0) {
      lastUiUpdate.current = clamped;
      setTState(clamped);
    }
  }, []);

  // تعيين زمن محدد
  const setTime = useCallback((newT: number) => {
    const clamped = clampTime(newT);
    tRef.current = clamped;
    lastUiUpdate.current = clamped;
    setTState(clamped);
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    // عند بلوغ النهاية، يبدأ التشغيل من الصفر
    if (tRef.current >= T_TOTAL) {
      tRef.current = 0;
      lastUiUpdate.current = 0;
      setTState(0);
    }
    setIsPlaying((p) => !p);
  }, []);

  const reset = useCallback(() => {
    tRef.current = 0;
    lastUiUpdate.current = 0;
    setTState(0);
    setIsPlaying(false);
    setSolutionStep(0);
    setHasReset(true);
    setTimeout(() => setHasReset(false), 200);
  }, []);

  const syncTimeForTab = useCallback((targetTab: TabId) => {
    if (targetTab === 3) {
      // المطلب الثالث يدرس دائماً t = 1.0s
      tRef.current = T_PART3;
      lastUiUpdate.current = T_PART3;
      setTState(T_PART3);
      setIsPlaying(false);
    }
  }, []);

  const setTab = useCallback((tab: TabId) => {
    setActiveTab(tab);
    setSolutionStep(0);
    syncTimeForTab(tab);
  }, [syncTimeForTab]);

  const nextTab = useCallback(() => {
    setActiveTab((current) => {
      const next = Math.min(3, current + 1) as TabId;
      setSolutionStep(0);
      syncTimeForTab(next);
      return next;
    });
  }, [syncTimeForTab]);

  const prevTab = useCallback(() => {
    setActiveTab((current) => {
      const prev = Math.max(1, current - 1) as TabId;
      setSolutionStep(0);
      syncTimeForTab(prev);
      return prev;
    });
  }, [syncTimeForTab]);

  const jumpToTabTargetTime = useCallback(() => {
    const target = TAB_TARGET_TIMES[activeTab];
    setTime(target);
  }, [activeTab, setTime]);

  const revealSolutionStep = useCallback(() => {
    setSolutionStep((s) => s + 1);
  }, []);

  const revealAllSteps = useCallback(() => {
    setSolutionStep(activeTab === 3 ? 4 : 3);
  }, [activeTab]);

  const resetSolution = useCallback(() => {
    setSolutionStep(0);
  }, []);

  const setMode = useCallback((newMode: AppMode) => {
    setModeState(newMode);
    setSolutionStep(0);
  }, []);

  const stopPlaying = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const currentTargetTime = TAB_TARGET_TIMES[activeTab];
  const isTimeAtTarget = Math.abs(t - currentTargetTime) < 0.08;

  const state: FreeFallState = {
    t,
    isPlaying,
    activeTab,
    solutionStep,
    mode,
    hasReset,
    targetTime: currentTargetTime,
    isTimeAtTarget,
  };

  const actions: FreeFallActions = {
    togglePlay,
    setTime,
    jumpToTabTargetTime,
    reset,
    nextTab,
    prevTab,
    setTab,
    revealSolutionStep,
    revealAllSteps,
    resetSolution,
    setMode,
    stopPlaying,
  };

  return {
    state,
    actions,
    tRef,
    setTimeFromFrame,
    T_TOTAL,
    G,
    T_PART3,
    H_INITIAL,
  };
}
