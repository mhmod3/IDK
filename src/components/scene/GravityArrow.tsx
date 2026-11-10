// ============================================================
// GravityArrow — سهم متجه التعجيل g
// أزرق، ثابت الطول (= 1.5 وحدة)، دائماً نحو الأسفل
// ============================================================

'use client';

import { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BALL_X, BALL_Z } from '@/lib/constants';

interface GravityArrowProps {
  // موضع الكرة y الحالي (السهم يتبع الكرة)
  ballYRef: React.MutableRefObject<number>;
  // إظهار/إخفاء السهم
  visible: boolean;
}

const ARROW_SHAFT_LENGTH = 1.5;
const ARROW_HEAD_LENGTH = 0.55;

function GravityArrowImpl({ ballYRef, visible }: GravityArrowProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // السهم موضوع جانباً بوضوح (إزاحة جانبية x + 1.2)، ويبدأ من نفس مستوى قاع الكرة
    const startY = ballYRef.current - 0.7;
    groupRef.current.position.set(BALL_X + 1.2, startY, BALL_Z);
    groupRef.current.visible = visible;
  });

  return (
    <group ref={groupRef}>
      {/* عمود السهم الأزرق */}
      <mesh position={[0, -ARROW_SHAFT_LENGTH / 2, 0]}>
        <cylinderGeometry args={[0.065, 0.065, ARROW_SHAFT_LENGTH, 16]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.4}
          roughness={0.3}
        />
      </mesh>
      {/* رأس السهم (مخروط مقلوب الرأس لأسفل: rotation.x = Math.PI) */}
      <mesh
        position={[0, -ARROW_SHAFT_LENGTH - ARROW_HEAD_LENGTH / 2, 0]}
        rotation={[Math.PI, 0, 0]}
      >
        <coneGeometry args={[0.22, ARROW_HEAD_LENGTH, 20]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0369a1"
          emissiveIntensity={0.5}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

export const GravityArrow = memo(GravityArrowImpl);
