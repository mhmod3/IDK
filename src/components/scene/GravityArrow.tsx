// ============================================================
// GravityArrow — سهم متجه التعجيل g
// أزرق، ثابت الطول (= 1.5 وحدة)، دائماً نحو الأسفل
// ============================================================

'use client';

import { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GravityArrowProps {
  // موضع الكرة y الحالي (السهم يتبع الكرة)
  ballYRef: React.MutableRefObject<number>;
  // إظهار/إخفاء السهم
  visible: boolean;
}

const ARROW_LENGTH = 1.8;

function GravityArrowImpl({ ballYRef, visible }: GravityArrowProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // السهم يبدأ من الكرة (إزاحة بسيطة جانبية لتمييزه عن سهم السرعة)
    groupRef.current.position.set(1.2, ballYRef.current, 0);
    groupRef.current.visible = visible;
  });

  return (
    <group ref={groupRef}>
      {/* عمود السهم */}
      <mesh position={[0, -ARROW_LENGTH / 2, 0]}>
        <cylinderGeometry args={[0.07, 0.07, ARROW_LENGTH, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#1d4ed8"
          emissiveIntensity={0.35}
          roughness={0.4}
        />
      </mesh>
      {/* رأس السهم */}
      <mesh position={[0, -ARROW_LENGTH - 0.35, 0]}>
        <coneGeometry args={[0.22, 0.7, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#1d4ed8"
          emissiveIntensity={0.45}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

export const GravityArrow = memo(GravityArrowImpl);
