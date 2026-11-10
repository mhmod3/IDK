// ============================================================
// Building — المبنى (صندوق بارتفاع 45م)
// خرسانية رمادية فاتحة مع نوافذ مضيئة
// ============================================================

'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BUILDING_WIDTH, BUILDING_DEPTH, BUILDING_HEIGHT } from '@/lib/constants';

interface BuildingProps {
  // هل يتم تظليل المبنى (تركيز على التبويب 1)؟
  highlight?: boolean;
}

export function Building({ highlight = false }: BuildingProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // نقاط النوافذ (شبكة منتظمة على الواجهة الأمامية)
  const windowRows = 9;   // عدد الطوابق التي تحتوي نوافذ
  const windowCols = 3;   // عدد النوافذ في كل طابق
  const windows: Array<{ x: number; y: number; z: number }> = [];

  for (let row = 0; row < windowRows; row++) {
    for (let col = 0; col < windowCols; col++) {
      const x = (col - 1) * 1.8;
      const y = 4 + row * 4.2;
      windows.push({ x, y, z: BUILDING_DEPTH / 2 + 0.01 });
    }
  }

  return (
    <group>
      {/* جسم المبنى */}
      <mesh
        ref={meshRef}
        position={[0, BUILDING_HEIGHT / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[BUILDING_WIDTH, BUILDING_HEIGHT, BUILDING_DEPTH]} />
        <meshStandardMaterial
          color={highlight ? '#cbd5e1' : '#94a3b8'}
          roughness={0.85}
          metalness={0.05}
          emissive={highlight ? '#1e293b' : '#000000'}
          emissiveIntensity={highlight ? 0.15 : 0}
        />
      </mesh>

      {/* السطح العلوي (سقف) */}
      <mesh position={[0, BUILDING_HEIGHT + 0.05, 0]} receiveShadow>
        <boxGeometry args={[BUILDING_WIDTH + 0.4, 0.1, BUILDING_DEPTH + 0.4]} />
        <meshStandardMaterial color="#475569" roughness={0.9} />
      </mesh>

      {/* حافة السقف (درابزين) */}
      {[-1, 1].map((sx) => (
        <mesh key={`edge-x-${sx}`} position={[sx * (BUILDING_WIDTH / 2 - 0.05), BUILDING_HEIGHT + 0.4, 0]}>
          <boxGeometry args={[0.1, 0.7, BUILDING_DEPTH]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
      ))}
      {[-1, 1].map((sz) => (
        <mesh key={`edge-z-${sz}`} position={[0, BUILDING_HEIGHT + 0.4, sz * (BUILDING_DEPTH / 2 - 0.05)]}>
          <boxGeometry args={[BUILDING_WIDTH, 0.7, 0.1]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
      ))}

      {/* النوافذ — مستويات صغيرة مضيئة */}
      {windows.map((w, i) => (
        <mesh key={`win-${i}`} position={[w.x, w.y, w.z]}>
          <planeGeometry args={[0.9, 1.3]} />
          <meshStandardMaterial
            color="#fef9c3"
            emissive="#fde68a"
            emissiveIntensity={0.6}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* باب في الأسفل */}
      <mesh position={[0, 1.4, BUILDING_DEPTH / 2 + 0.02]}>
        <planeGeometry args={[1.6, 2.8]} />
        <meshStandardMaterial color="#451a03" roughness={0.7} />
      </mesh>

      {/* شريط أرضي للمبنى */}
      <mesh position={[0, 0.1, BUILDING_DEPTH / 2 + 0.03]}>
        <boxGeometry args={[BUILDING_WIDTH + 0.6, 0.2, 0.1]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  );
}
