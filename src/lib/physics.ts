// ============================================================
// النواة الفيزيائية — السقوط الحر (المثال 3)
// المرجع: كتاب الفيزياء، الصف الخامس العلمي، الفصل الثاني، صفحة 42
//
// المعادلات المنهجية:
//   (1) Δy = vᵢ·t + ½·g·t²  ⟹  Δy = ½·g·t²     (لأن vᵢ = 0 في هذا المثال)
//   (2) v_f = vᵢ + g·t       ⟹  v_f = g·t        (لأن vᵢ = 0)
//   (3) v_f² = vᵢ² + 2·g·Δy  ⟹  v_f² = 2·g·Δy
//
// اصطلاح الإشارات:
//   المحور الرأسي (+y ↑) للأعلى:
//   - التعجيل g = -10 m/s² (نحو الأسفل)
//   - الإزاحة Δy سالبة لأنها هبوط نحو الأسفل
//   - السرعة المتجهة vf سالبة لأنها موجهة نحو الأسفل
//   - مقدار السرعة (الانطلاق) |vf| موجب دائماً
//   - ارتفاع البناية الكلي H = |Δy(t_total)| موجب دائماً
//   - الارتفاع الحالي عن الأرض h = H + Δy موجب دائماً (بين 0 و 45m)
// ============================================================

import { G, H_INITIAL, T_TOTAL, VI } from './constants';

/**
 * الإزاحة الرأسية من نقطة الإطلاق (Δy) — كمية متجهة (سالبة نحو الأسفل)
 * القانون العام: Δy = vᵢ·t + ½·g·t²
 * في هذا المثال (vᵢ = 0): Δy = 0 + ½·(−10)·t² = −5·t²
 */
export const displacement = (t: number, vi: number = VI, g: number = G): number => {
  return vi * t + 0.5 * g * t * t;
};

/**
 * السرعة المتجهة الرأسية (v_f) — كمية متجهة (سالبة نحو الأسفل)
 * القانون العام: v_f = vᵢ + g·t
 * في هذا المثال (vᵢ = 0): v_f = 0 + (−10)·t = −10·t
 */
export const velocity = (t: number, vi: number = VI, g: number = G): number => {
  return vi * g !== undefined ? vi + g * t : g * t;
};

/**
 * مقدار السرعة (الانطلاق / Speed) — كمية قياسية موجبة دائماً
 * |v_f| = |velocity(t)|
 */
export const speed = (t: number, vi: number = VI, g: number = G): number => {
  return Math.abs(velocity(t, vi, g));
};

/**
 * المسافة الرأسية المقطوعة هبوطاً (كمية قياسية موجبة)
 * distance = |Δy|
 */
export const distanceFallen = (t: number, vi: number = VI, g: number = G): number => {
  return Math.abs(displacement(t, vi, g));
};

/**
 * الارتفاع المتبقي فوق سطح الأرض (h) — مسافة موجبة فوق الأرض
 * h(t) = H_total + Δy(t) = H_total − |Δy(t)|
 */
export const heightAboveGround = (
  t: number,
  hTotal: number = H_INITIAL,
  vi: number = VI,
  g: number = G
): number => {
  const dy = displacement(t, vi, g);
  return Math.max(0, hTotal + dy);
};

/**
 * موضع الكرة في الفضاء ثلاثي الأبعاد (y رأسي)
 */
export const ballY = (t: number): number => heightAboveGround(t);

/**
 * التحقق من نطاق الزمن الصالح
 */
export const clampTime = (t: number, maxT: number = T_TOTAL): number => {
  if (t < 0) return 0;
  if (t > maxT) return maxT;
  return t;
};

/**
 * التحقق من أن الكرة قد اصطدمت بالأرض
 */
export const hasImpacted = (t: number, maxT: number = T_TOTAL): boolean => {
  return t >= maxT;
};

/**
 * دالة التحقق من القيم المرجعية للمثال 3 وفق نص الكتاب (ص 42)
 */
export const verifyReferencePoints = () => ({
  // المطلب 1: عند t = 3s
  displacementAt3: displacement(3),       // -45 m
  buildingHeight: Math.abs(displacement(3)), // +45 m
  
  // المطلب 2: عند t = 3s
  velocityAt3: velocity(3),               // -30 m/s
  speedAt3: speed(3),                     // +30 m/s

  // المطلب 3: عند t = 1s
  velocityAt1: velocity(1),               // -10 m/s
  speedAt1: speed(1),                     // +10 m/s
  displacementAt1: displacement(1),       // -5 m
  distanceFallenAt1: distanceFallen(1),   // 5 m
  heightAboveGroundAt1: heightAboveGround(1), // 40 m
});
