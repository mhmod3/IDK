// ============================================================
// MathText — مكوّن لعرض النصوص الرياضية برموز صحيحة
// يحوّل الترقيم البسيط إلى رموز HTML صحيحة:
//   v_f  →  v مع f صغيرة (subscript)
//   v_i  →  v مع i صغيرة (subscript)
//   ^2   →  ² (superscript)
// مثال: "v_f = v_i + g · t" → "vf = vi + g · t" برموز صحيحة
// ============================================================

'use client';

import { ReactNode } from 'react';

interface MathTextProps {
  children: ReactNode;
  className?: string;
  dir?: 'ltr' | 'rtl';
}

export function MathText({ children, className, dir = 'ltr' }: MathTextProps) {
  // تحويل الأطفال إلى نص واحد (قد تكون مصفوفة من React لعناصر مختلطة)
  const text = typeof children === 'string'
    ? children
    : Array.isArray(children)
    ? children.join('')
    : String(children);

  const parts: ReactNode[] = [];
  let key = 0;

  // نبحث عن:
  // 1. حرف_حرف → subscript: v_f → v<sub>f</sub>
  // 2. حرف^رقم → superscript: t^2 → t<sup>2</sup>
  const regex = /([a-zA-Z])_([a-zA-Z])|([a-zA-Z\d\)])\^(\d)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // النص قبل المطابقة
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      // subscript: v_f
      parts.push(
        <span key={key++}>
          {match[1]}
          <sub style={{ fontSize: '0.7em' }}>{match[2]}</sub>
        </span>
      );
    } else if (match[3] && match[4]) {
      // superscript: t^2
      parts.push(
        <span key={key++}>
          {match[3]}
          <sup style={{ fontSize: '0.7em' }}>{match[4]}</sup>
        </span>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // النص المتبقي بعد آخر مطابقة
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return (
    <span className={className} dir={dir} style={{ fontFamily: '"Computer Modern Serif", "Times New Roman", serif' }}>
      {parts.length > 0 ? parts : text}
    </span>
  );
}
