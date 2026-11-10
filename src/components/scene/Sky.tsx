// ============================================================
// Sky — خلفية السماء
// تدرّج من الأزرق الفاتح (أعلى) إلى الأبيض (الأفق)
// ============================================================

'use client';

import { Sky as DreiSky } from '@react-three/drei';

export function Sky() {
  return (
    <>
      {/* Sky من drei — تدرّج واقعي */}
      <DreiSky
        distance={450000}
        sunPosition={[30, 50, 20]}
        inclination={0.6}
        azimuth={0.25}
        turbidity={6}
        rayleigh={1.5}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      {/* ضباب خفيف لإخفاء الحواف البعيدة */}
      <fog attach="fog" args={['#cde3f5', 80, 180]} />
    </>
  );
}
