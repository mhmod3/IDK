'use client';

import React, { ReactNode } from 'react';

interface MathTextProps {
  children: ReactNode;
  className?: string;
  dir?: 'ltr' | 'rtl';
}

/**
 * High-precision scientific mathematical typesetter.
 * Renders variables with dedicated mathematical italics,
 * numbers with monospace tabular numerals, and Arabic explanatory text in Arabic sans.
 */
export function MathText({ children, className = '', dir = 'ltr' }: MathTextProps) {
  const text =
    typeof children === 'string'
      ? children
      : Array.isArray(children)
      ? children.join('')
      : String(children ?? '');

  // Split by Arabic parenthetical or word sequences to preserve Arabic font
  // e.g., "(نحو الأسفل ↓)" or notes
  const segments = text.split(/([\u0600-\u06FF\s]+|[↓↑])/g);

  return (
    <span className={`inline-flex items-baseline gap-1 ${className}`} dir={dir}>
      {segments.map((seg, idx) => {
        if (!seg) return null;
        if (/[\u0600-\u06FF]/.test(seg) || seg === '↓' || seg === '↑') {
          return (
            <span key={idx} className="font-arabic text-[0.9em] text-slate-300 font-normal">
              {seg}
            </span>
          );
        }
        return <MathSegment key={idx} raw={seg} />;
      })}
    </span>
  );
}

function MathSegment({ raw }: { raw: string }) {
  // Regex to match math components:
  // 1. Variable with subscript: v_f, v_i, a_x
  // 2. Greek delta variable: Δy, \Delta y
  // 3. Superscripts: ^2, ^3, ², ³
  // 4. Fractions: ½, ¼
  // 5. Units: m/s^2, m/s², m/s, m, s
  // 6. Scientific operators: ⟹, ·, ×, =, +, −, -, |
  // 7. Numbers: -10, 45, 30, 0, 1, 2, 3
  const tokenRegex =
    /([a-zA-Z])_([a-zA-Z0-9]+)|(Δ[a-zA-Z])|([a-zA-Z\d\)])(\^|\²|\³)(\d?)|(½)|(m\/s\^?2|m\/s²|m\/s|m|s)|(\b\d+(?:\.\d+)?\b)|(⟹|·|×|=|\+|−|-|\||\(|\))/g;

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = tokenRegex.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={key++} className="font-math-normal text-slate-300">
          {raw.slice(lastIndex, match.index)}
        </span>
      );
    }

    if (match[1] && match[2]) {
      // Subscript variable: e.g. v_f, v_i
      parts.push(
        <span key={key++} className="inline-block">
          <span className="font-math text-[1.08em] tracking-tight">{match[1]}</span>
          <sub className="font-math text-[0.72em] -bottom-0.5 tracking-tighter text-slate-400">
            {match[2]}
          </sub>
        </span>
      );
    } else if (match[3]) {
      // Delta variable: Δy
      parts.push(
        <span key={key++} className="inline-block tracking-tight">
          <span className="font-math-normal text-[0.98em]">Δ</span>
          <span className="font-math text-[1.05em]">{match[3].slice(1)}</span>
        </span>
      );
    } else if (match[4]) {
      // Superscript: t^2 or t²
      const base = match[4];
      const sup = match[6] || (match[5] === '²' ? '2' : match[5] === '³' ? '3' : '');
      parts.push(
        <span key={key++} className="inline-block">
          <span className="font-math">{base}</span>
          <sup className="font-telemetry text-[0.7em] -top-1.5 text-slate-300">{sup}</sup>
        </span>
      );
    } else if (match[7]) {
      // Fraction ½
      parts.push(
        <span key={key++} className="font-math-normal text-[0.98em] text-slate-200">
          ½
        </span>
      );
    } else if (match[8]) {
      // Physical units: m/s², m/s, m, s (normalize ^2 to ²)
      const unit = match[8].replace(/\^2/g, '²');
      parts.push(
        <span key={key++} className="font-mono text-[0.88em] text-slate-400 font-normal ml-0.5">
          {unit}
        </span>
      );
    } else if (match[9]) {
      // Numbers: tabular nums
      parts.push(
        <span key={key++} className="font-telemetry text-[0.98em] font-medium text-slate-200">
          {match[9]}
        </span>
      );
    } else if (match[10]) {
      // Operators
      const op = match[10];
      const isArrow = op === '⟹';
      parts.push(
        <span
          key={key++}
          className={`font-math-normal text-slate-400 ${
            isArrow ? 'px-1 text-sky-400' : op === '=' ? 'px-0.5' : 'px-0.5'
          }`}
        >
          {op === '-' ? '−' : op}
        </span>
      );
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < raw.length) {
    const remainder = raw.slice(lastIndex);
    // Plain single variables like t, g, h
    if (/^[a-zA-Z]$/.test(remainder.trim())) {
      parts.push(
        <span key={key++} className="font-math text-[1.05em]">
          {remainder}
        </span>
      );
    } else {
      parts.push(
        <span key={key++} className="font-math-normal text-slate-300">
          {remainder}
        </span>
      );
    }
  }

  return <>{parts.length > 0 ? parts : raw}</>;
}
