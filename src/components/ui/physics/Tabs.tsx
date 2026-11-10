// ============================================================
// Tabs — التبويبات الثلاثة
// التبويب 1: ارتفاع البناية
// التبويب 2: سرعة الاصطدام
// التبويب 3: السرعة والارتفاع بعد 1s
// ============================================================

'use client';

import { Card } from '@/components/ui/card';
import { Building2, Zap, Timer } from 'lucide-react';
import type { TabId } from '@/hooks/useFreeFall';

interface TabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS: Array<{ id: TabId; label: string; icon: React.ReactNode; subtitle: string }> = [
  {
    id: 1,
    label: 'ارتفاع البناية',
    icon: <Building2 className="w-4 h-4" />,
    subtitle: 'h = +45 m',
  },
  {
    id: 2,
    label: 'سرعة الاصطدام',
    icon: <Zap className="w-4 h-4" />,
    subtitle: 'vf = −30 m/s',
  },
  {
    id: 3,
    label: 'بعد 1 ثانية',
    icon: <Timer className="w-4 h-4" />,
    subtitle: 'vf = −10, h = 40',
  },
];

export function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <Card className="p-2 bg-white shadow-sm">
      <div className="grid grid-cols-3 gap-1" dir="rtl">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {tab.icon}
                <span className="text-xs font-bold">{tab.label}</span>
              </div>
              <span
                className={`text-[10px] font-mono ${
                  isActive ? 'text-sky-100' : 'text-slate-500'
                }`}
                dir="ltr"
              >
                {tab.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
