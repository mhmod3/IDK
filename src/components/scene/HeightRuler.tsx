// ============================================================
// HeightRuler — مسطرة جانبية تُظهر الارتفاع الحي
// علامات كل 5 أمتار، مع تسمية h الحالية
// يستعمل Text من drei (يُرسم في الفضاء 3D) بدلاً من Html
// لتجنّب race condition في React portals
// ============================================================

'use client';

import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { H_INITIAL } from '@/lib/constants';

interface HeightRulerProps {
  tRef: React.MutableRefObject<number>;
  highlightValue?: number | null;
  visible: boolean;
}

function HeightRulerImpl({ tRef, highlightValue = null, visible }: HeightRulerProps) {
  const markerRef = useRef<THREE.Group>(null);
  const labelRef = useRef<THREE.Mesh>(null);

  // حفظ علامات المسطرة في memo لتجنّب إعادة إنشاء المصفوفة
  const marks = useMemo(() => {
    const m: number[] = [];
    for (let h = 0; h <= H_INITIAL; h += 5) m.push(h);
    return m;
  }, []);

  useFrame(() => {
    if (!markerRef.current) return;
    const t = tRef.current;
    const y = H_INITIAL + 0.5 * (-10) * t * t;
    const h = Math.max(0, y);

    markerRef.current.position.y = h;

    // تحديث نص التسمية مباشرة على الميش (بدون إعادة تصيير React)
    if (labelRef.current) {
      (labelRef.current as any).text = `h = ${h.toFixed(1)} m`;
    }
  });

  if (!visible) return null;

  return (
    <group position={[-6.5, 0, 0]}>
      {/* العمود الرئيسي للمسطرة */}
      <mesh position={[0, H_INITIAL / 2, 0]}>
        <boxGeometry args={[0.15, H_INITIAL, 0.15]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.6} />
      </mesh>

      {/* علامات كل 5 أمتار */}
      {marks.map((h) => {
        const isHighlight = highlightValue !== null && Math.abs(h - highlightValue) < 0.01;
        return (
          <group key={`mark-${h}`} position={[0, h, 0]}>
            <mesh position={[0.6, 0, 0]}>
              <boxGeometry args={[1.2, 0.08, 0.08]} />
              <meshStandardMaterial
                color={isHighlight ? '#22c55e' : '#1e293b'}
                emissive={isHighlight ? '#16a34a' : '#000000'}
                emissiveIntensity={isHighlight ? 0.4 : 0}
              />
            </mesh>
            <Text
              position={[1.4, 0, 0]}
              fontSize={0.55}
              color={isHighlight ? '#ffffff' : '#1e293b'}
              backgroundColor={isHighlight ? '#22c55e' : '#ffffff'}
              backgroundPadding={[0.3, 0.18]}
              anchorX="left"
              anchorY="middle"
              outlineColor="#000000"
              outlineWidth={0}
            >
              {String(h)}
            </Text>
          </group>
        );
      })}

      {/* مؤشر الارتفاع الحالي (يتبع الكرة) */}
      <group ref={markerRef}>
        {/* سهم أفقي يلتقي بالمبنى */}
        <mesh position={[3.5, 0, 0]}>
          <boxGeometry args={[7, 0.05, 0.05]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#d97706"
            emissiveIntensity={0.5}
          />
        </mesh>
        <Text
          ref={labelRef}
          position={[-0.5, 0, 0]}
          fontSize={0.6}
          color="#ffffff"
          backgroundColor="#f59e0b"
          backgroundPadding={[0.35, 0.22]}
          anchorX="right"
          anchorY="middle"
        >
          h = ...
        </Text>
      </group>

      {/* تسمية "h (m)" في الأعلى */}
      <Text
        position={[0, H_INITIAL + 1.5, 0]}
        fontSize={0.7}
        color="#1e293b"
        anchorX="center"
        anchorY="middle"
      >
        h (m)
      </Text>
    </group>
  );
}

export const HeightRuler = memo(HeightRulerImpl);
