// ============================================================
// نصوص المعادلات لكل تبويب — تُعرض في واجهة المستخدم
// الصيغة العامة → التعويض الرمزي → النتيجة العددية
// كل النصوص الرياضية بـ LTR، الشرح العربي بـ RTL
// ============================================================

export interface EquationLayer {
  // الصيغة العامة (تظهر دائماً)
  general: string;
  // التعويض الرمزي (يظهر بعد الضغط الأول)
  substitution: string;
  // النتيجة العددية (تظهر بعد الضغط الثاني)
  result: string;
  // ملاحظة المنهج
  note: string;
}

// التبويب 1: ارتفاع سطح البناية
export const EQUATION_TAB_1: EquationLayer = {
  general: 'Δy = ½ · g · t²',
  substitution: 'Δy = ½ · (−10) · (3)²',
  result: 'Δy = −45 m   ⟹   h = +45 m',
  note: 'الإشارة السالبة للإزاحة تعني اتجاهها نحو الأسفل؛ لذلك يكون ارتفاع البناية موجباً. في السقوط الحر تكون v_i = 0 دائماً.',
};

// التبويب 2: سرعة الكرة لحظة الاصطدام
export const EQUATION_TAB_2: EquationLayer = {
  general: 'v_f = v_i + g · t',
  substitution: 'v_f = 0 + (−10) · (3)',
  result: 'v_f = −30 m/s   (نحو الأسفل ↓)',
  note: 'الإشارة السالبة لـ v_f تعني أن اتجاه السرعة نحو الأسفل، وهو الاتجاه نفسه لتعجيل الجاذبية g.',
};

// التبويب 3: السرعة والارتفاع بعد مرور 1 ثانية
export interface EquationLayerMulti {
  parts: Array<{
    label: string;       // (أ)، (ب)، (ج)
    general: string;
    substitution: string;
    result: string;
  }>;
  note: string;
}

export const EQUATION_TAB_3: EquationLayerMulti = {
  parts: [
    {
      label: '(أ)',
      general: 'v_f = v_i + g · t',
      substitution: 'v_f = 0 + (−10) · (1)',
      result: 'v_f = −10 m/s',
    },
    {
      label: '(ب)',
      general: 'Δy = ½ · g · t²',
      substitution: 'Δy = ½ · (−10) · (1)²',
      result: 'Δy = −5 m',
    },
    {
      label: '(ج)',
      general: 'h = H − |Δy|',
      substitution: 'h = 45 − 5',
      result: 'h = +40 m',
    },
  ],
  note: 'نحسب أولاً الإزاحة خلال الثانية الأولى، ثم نطرحها من ارتفاع البناية لنحصل على الارتفاع فوق سطح الأرض.',
};

// نصوص المعادلات الثلاث للسقوط الحر (للمرجعية)
export const FREE_FALL_EQUATIONS = [
  { id: 'eq1', formula: 'v_f = g · t', note: 'العلاقة بين السرعة اللحظية والزمن' },
  { id: 'eq2', formula: 'Δy = ½ · g · t^2', note: 'العلاقة بين الإزاحة والزمن' },
  { id: 'eq3', formula: 'v_f = √(2 · g · Δy)', note: 'العلاقة بين السرعة والإزاحة' },
];
