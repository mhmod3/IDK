// ============================================================
// Ground — سطح الأرض
// مستوى دائري نصف قطر 60، في y = 0
// ============================================================

'use client';

import { useRef } from 'react';
import * as THREE from 'three';

export function Ground() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <group>
      {/* سطح الأرض الأساسي */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[60, 64]} />
        <meshStandardMaterial color="#86a361" roughness={0.95} />
      </mesh>

      {/* خطوط شبكية خفيفة للمساعدة في الإدراك العمقي */}
      <gridHelper
        args={[120, 60, '#6b8f4a', '#7a9b5c']}
        position={[0, 0.01, 0]}
      />

      {/* بقعة دائرية أغمق تحت المبنى */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[8, 32]} />
        <meshStandardMaterial color="#5d7d44" roughness={0.95} />
      </mesh>
    </group>
  );
}
