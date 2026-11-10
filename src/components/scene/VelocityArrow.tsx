// ============================================================
// VelocityArrow — سهم متجه السرعة v
// أحمر، اتجاهه دائماً نحو الأسفل، طوله = |v| / 10 وحدات بصرية
// ============================================================

'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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

export function VelocityArrow({ tRef, ballYRef, visible, scale = 0.1 }: VelocityArrowProps) {
  const groupRef = useRef<THREE.Group>(null);
  const shaftRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    const t = tRef.current;
    // السرعة vf = g·t (سالب لأنه نحو الأسفل) → المقدار = |g·t|
    const speed = Math.abs(-10 * t); // |vf| = 10·t
    const arrowLength = Math.max(0.01, speed * scale);

    // موضع الكرة الحالي
    const ballY = ballYRef.current;

    // السهم يبدأ من الكرة وينزل لأسفل
    groupRef.current.position.set(0, ballY, 0);

    // تحديث طول العمود
    if (shaftRef.current) {
      shaftRef.current.scale.y = arrowLength;
      shaftRef.current.position.y = -arrowLength / 2;
    }

    // موضع رأس السهم (المخروط) في نهاية العمود
    const cone = groupRef.current.children[1] as THREE.Mesh;
    if (cone) {
      cone.position.y = -arrowLength - 0.4;
    }

    // إظهار/إخفاء
    groupRef.current.visible = visible && speed > 0.01;
  });

  return (
    <group ref={groupRef}>
      {/* عمود السهم */}
      <mesh ref={shaftRef}>
        <cylinderGeometry args={[0.08, 0.08, 1, 16]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#dc2626"
          emissiveIntensity={0.3}
          roughness={0.4}
        />
      </mesh>
      {/* رأس السهم (مخروط) */}
      <mesh>
        <coneGeometry args={[0.25, 0.8, 16]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#dc2626"
          emissiveIntensity={0.4}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}
