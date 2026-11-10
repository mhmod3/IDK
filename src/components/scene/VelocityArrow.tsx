// ============================================================
// VelocityArrow — سهم متجه السرعة v
// أحمر، اتجاهه دائماً نحو الأسفل، طوله = |v| / 10 وحدات بصرية
// ============================================================

'use client';

import { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BALL_X, BALL_Z } from '@/lib/constants';

interface VelocityArrowProps {
  // الزمن الحالي
  tRef: React.MutableRefObject<number>;
  // موضع الكرة y الحالي
  ballYRef: React.MutableRefObject<number>;
  // إظهار/إخفاء السهم
  visible: boolean;
  // مقياس طول السهم (1 وحدة = 1 m/s / 10)
  scale?: number;
}

function VelocityArrowImpl({ tRef, ballYRef, visible, scale = 0.12 }: VelocityArrowProps) {
  const groupRef = useRef<THREE.Group>(null);
  const shaftRef = useRef<THREE.Mesh>(null);
  const coneRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    const t = tRef.current;
    // السرعة vf = g·t (سالب لأنه نحو الأسفل) → المقدار = |g·t|
    const speed = Math.abs(-10 * t); // |vf| = 10·t
    const arrowLength = Math.max(0.2, speed * scale);

    // موضع الكرة الحالي
    const ballY = ballYRef.current;

    // يبدأ السهم تحت محيط الكرة مباشرة (BALL_RADIUS = 0.6)
    // نضع أصل المجموعة أسفل الكرة مباشرة
    const startY = ballY - 0.7;
    groupRef.current.position.set(BALL_X, startY, BALL_Z);

    const headLength = 0.6;
    const shaftLength = Math.max(0.05, arrowLength);

    // تحديث طول وموضع العمود
    if (shaftRef.current) {
      shaftRef.current.scale.set(1, shaftLength, 1);
      shaftRef.current.position.y = -shaftLength / 2;
    }

    // تحديث موضع رأس السهم (المخروط مقلوب ليشير لأسفل شاقولياً)
    if (coneRef.current) {
      coneRef.current.position.y = -shaftLength - (headLength / 2);
    }

    // إظهار/إخفاء
    groupRef.current.visible = visible && speed > 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* عمود السهم */}
      <mesh ref={shaftRef}>
        <cylinderGeometry args={[0.07, 0.07, 1, 16]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#dc2626"
          emissiveIntensity={0.4}
          roughness={0.3}
        />
      </mesh>
      {/* رأس السهم (مخروط مقلوب الرأس لأسفل: rotation.x = Math.PI) */}
      <mesh ref={coneRef} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.24, 0.6, 20]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#b91c1c"
          emissiveIntensity={0.5}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

export const VelocityArrow = memo(VelocityArrowImpl);
