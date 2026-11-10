// ============================================================
// TraceLine — أثر مسار الكرة
// خط منقط من نقطة البداية إلى الموضع الحالي
// ============================================================

'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { H_INITIAL, G } from '@/lib/constants';

interface TraceLineProps {
  tRef: React.MutableRefObject<number>;
  visible: boolean;
}

export function TraceLine({ tRef, visible }: TraceLineProps) {
  const lineRef = useRef<THREE.Line>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  // ذاكرة للمواضع السابقة (لرسم الأثر)
  const tracePoints = useRef<THREE.Vector3[]>([]);
  const maxPoints = 200;
  const lastT = useRef<number>(-1);

  useFrame(() => {
    if (!geometryRef.current) return;

    const t = tRef.current;

    // عند إعادة الضبط (t === 0) نُفرغ الأثر
    if (t === 0 && lastT.current !== 0) {
      tracePoints.current = [];
      // تفريغ الـ geometry
      const emptyPos = new Float32Array(0);
      geometryRef.current.setAttribute('position', new THREE.BufferAttribute(emptyPos, 3));
      geometryRef.current.computeBoundingSphere();
      lastT.current = 0;
      return;
    }

    const y = H_INITIAL + 0.5 * G * t * t;

    // أضف النقطة الحالية إذا كانت جديدة
    const lastPoint = tracePoints.current[tracePoints.current.length - 1];
    if (!lastPoint || Math.abs(lastPoint.y - y) > 0.05) {
      tracePoints.current.push(new THREE.Vector3(0, Math.max(0.6, y), 0));
      if (tracePoints.current.length > maxPoints) {
        tracePoints.current.shift();
      }

      // تحديث الـ BufferGeometry
      const positions = new Float32Array(tracePoints.current.length * 3);
      tracePoints.current.forEach((p, i) => {
        positions[i * 3] = p.x;
        positions[i * 3 + 1] = p.y;
        positions[i * 3 + 2] = p.z;
      });
      geometryRef.current.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
      geometryRef.current.computeBoundingSphere();
    }

    lastT.current = t;
  });

  if (!visible) return null;

  return (
    <line ref={lineRef}>
      <bufferGeometry ref={geometryRef} />
      <lineBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.6}
        linewidth={2}
      />
    </line>
  );
}
