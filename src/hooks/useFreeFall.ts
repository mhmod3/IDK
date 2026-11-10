// ============================================================
// useFreeFall — hook إدارة حالة السقوط الحر
// يربط: الزمن t، التشغيل، التبويب الحالي، إظهار الحل
// ============================================================

'use client';

import { useState, useCallback, useRef } from 'react';
import { T_TOTAL, T_PART3, G } from '@/lib/constants';
import { clampTime } from '@/lib/physics';

export type TabId = 1 | 2 | 3;

export interface FreeFallState {
  // الزمن الحالي (s) — في النطاق [0, 3]
  t: number;
  // هل الكرة في حالة سقوط؟
  isPlaying: boolean;
  // التبويب الحالي
  activeTab: TabId;
  // عدد مرات الضغط على زر «اعرض الحل» في التبويب الحالي
  solutionStep: number;
  // هل تم إعادة الضبط للتو؟
  hasReset: boolean;
}

export interface FreeFallActions {
  // تشغيل/إيقاف
  togglePlay: () => void;
  // تعيين زمن محدد (من شريط الزمن)
  setTime: (t: number) => void;
  // إعادة الضبط
  reset: () => void;
  // الانتقال للتبويب التالي
  nextTab: () => void;
  // الانتقال للتبويب السابق
  prevTab: () => void;
  // تعيين تبويب مباشرة
  setTab: (tab: TabId) => void;
  // كشف خطوة جديدة من الحل
  revealSolutionStep: () => void;
  // إعادة ضبط خطوات الحل
  resetSolution: () => void;
  // إيقاف التشغيل عند الاصطدام
  stopPlaying: () => void;
}

export function useFreeFall() {
  const [t, setTState] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabId>(1);
  const [solutionStep, setSolutionStep] = useState<number>(0);
  const [hasReset, setHasReset] = useState<boolean>(false);

  // مرجع للزمن داخل حلقة الرسم (لتجنّب إعادة التصيير في كل إطار)
  const tRef = useRef<number>(0);

  // تحديث الزمن من داخل useFrame (بدون إعادة تصيير لكل إطار)
  const setTimeFromFrame = useCallback((newT: number) => {
    const clamped = clampTime(newT);
    tRef.current = clamped;
    setTState(clamped);
  }, []);

  // تعيين زمن محدد (من شريط الزمن — يوقف التشغيل)
  const setTime = useCallback((newT: number) => {
    const clamped = clampTime(newT);
    tRef.current = clamped;
    setTState(clamped);
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    // عند بلوغ النهاية، يبدأ التشغيل من الصفر
    if (tRef.current >= T_TOTAL) {
      tRef.current = 0;
      setTState(0);
    }
    setIsPlaying((p) => !p);
  }, []);

  const reset = useCallback(() => {
    tRef.current = 0;
    setTState(0);
    setIsPlaying(false);
    setSolutionStep(0);
    setHasReset(true);
    // إعادة ضبط hasReset بعد فترة قصيرة
    setTimeout(() => setHasReset(false), 200);
  }, []);

  const nextTab = useCallback(() => {
    setActiveTab((current) => {
      const next = Math.min(3, current + 1) as TabId;
      setSolutionStep(0);
      // عند الانتقال للتبويب 3، ننتقل لـ t=1s
      if (next === 3 && tRef.current === 0) {
        tRef.current = T_PART3;
        setTState(T_PART3);
        setIsPlaying(false);
      }
      return next;
    });
  }, []);

  const prevTab = useCallback(() => {
    setActiveTab((current) => {
      const prev = Math.max(1, current - 1) as TabId;
      setSolutionStep(0);
      return prev;
    });
  }, []);

  const setTab = useCallback((tab: TabId) => {
    setActiveTab(tab);
    setSolutionStep(0);
    // في التبويب 3 نبدأ عند t=1s (السيناريو المطلوب)
    if (tab === 3 && tRef.current === 0) {
      tRef.current = T_PART3;
      setTState(T_PART3);
      setIsPlaying(false);
    }
  }, []);

  const revealSolutionStep = useCallback(() => {
    setSolutionStep((s) => s + 1);
  }, []);

  const resetSolution = useCallback(() => {
    setSolutionStep(0);
  }, []);

  const stopPlaying = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const state: FreeFallState = {
    t,
    isPlaying,
    activeTab,
    solutionStep,
    hasReset,
  };

  const actions: FreeFallActions = {
    togglePlay,
    setTime,
    reset,
    nextTab,
    prevTab,
    setTab,
    revealSolutionStep,
    resetSolution,
    stopPlaying,
  };

  return {
    state,
    actions,
    // مرجع للزمن (يُستعمل في useFrame)
    tRef,
    // دالة تحديث الزمن من حلقة الرسم
    setTimeFromFrame,
    // ثوابت مفيدة
    T_TOTAL,
    G,
    T_PART3,
  };
}
