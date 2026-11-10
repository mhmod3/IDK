// ============================================================
// Controls — أزرار التحكم الرئيسية
// السابق/التالي، تشغيل/إيقاف، إعادة الضبط، اعرض الحل
// ============================================================

'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import type { TabId } from '@/hooks/useFreeFall';

interface ControlsProps {
  isPlaying: boolean;
  activeTab: TabId;
  onTogglePlay: () => void;
  onReset: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Controls({
  isPlaying,
  activeTab,
  onTogglePlay,
  onReset,
  onNext,
  onPrev,
}: ControlsProps) {
  return (
    <Card className="p-3 bg-white shadow-sm">
      <div className="flex items-center justify-center gap-2" dir="rtl">
        {/* السابق (في RTL = التبويب الأيسر) */}
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={activeTab === 1}
          className="flex items-center gap-1"
        >
          <ChevronRight className="w-4 h-4" />
          السابق
        </Button>

        {/* تشغيل/إيقاف */}
        <Button
          onClick={onTogglePlay}
          size="sm"
          className={`flex items-center gap-1.5 ${
            isPlaying
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              إيقاف
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              تشغيل
            </>
          )}
        </Button>

        {/* إعادة الضبط */}
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="flex items-center gap-1"
        >
          <RotateCcw className="w-4 h-4" />
          إعادة الضبط
        </Button>

        {/* التالي */}
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={activeTab === 3}
          className="flex items-center gap-1"
        >
          التالي
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
