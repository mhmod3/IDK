// ============================================================
// النواة الفيزيائية — السقوط الحر (المثال 3)
// كل الحسابات هنا داخل إطار المنهج فقط:
//   (1) Δy = ½·g·t²
//   (2) vf = g·t       (لأن vi = 0 في السقوط الحر)
//   (3) vf² = 2·g·Δy   (المقدار)
// لا توجد معادلات خارجية (لا F=ma، لا تكامل عددي، لا مقاومة هواء)
// ============================================================

import { G, H_INITIAL, T_TOTAL, VI } from './constants';

// الإزاحة من نقطة الإطلاق (Δy) — سالبة لأنها نحو الأسفل
// الصيغة: Δy = vᵢ·t + ½·g·t² = 0 + ½·g·t²
export const displacement = (t: number): number => VI * t + 0.5 * G * t * t;

// السرعة اللحظية (vf) — سالبة لأنها نحو الأسفل
// الصيغة: vf = vᵢ + g·t = g·t (لأن vi = 0)
export const velocity = (t: number): number => VI + G * t;

// الارتفاع فوق سطح الأرض = الارتفاع الابتدائي + الإزاحة (السالب)
export const heightAboveGround = (t: number): number => H_INITIAL + displacement(t);

// موضع الكرة في الفضاء ثلاثي الأبعاد (y رأسي)
export const ballY = (t: number): number => H_INITIAL + displacement(t);

// المقدار المطلق للسرعة (للعرض البصري)
export const speed = (t: number): number => Math.abs(velocity(t));

// التحقق من نطاق الزمن الصالح
export const clampTime = (t: number): number => {
  if (t < 0) return 0;
  if (t > T_TOTAL) return T_TOTAL;
  return t;
};

// التحقق من أن الكرة قد اصطدمت بالأرض
export const hasImpacted = (t: number): boolean => t >= T_TOTAL;

// التحقق من النقاط المرجعية (لاختبارات داخلية)
export const verifyReferencePoints = () => ({
  displacementAt3: displacement(3),        // -45
  velocityAt3: velocity(3),                // -30
  heightAt1: heightAboveGround(1),         // 40
  velocityAt1: velocity(1),                // -10
});
