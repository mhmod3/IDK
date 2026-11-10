// ============================================================
// HeightRuler — مسطرة جانبية تُظهر الارتفاع الحي
// علامات كل 5 أمتار، مع تسمية h الحالية
// ============================================================

'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { H_INITIAL } from '@/lib/constants';

interface HeightRulerProps {
  // الزمن الحالي (لإظهار الارتفاع الحي)
  tRef: React.MutableRefObject<number>;
  // تمييز قيمة معينة (مثلاً 45 في التبويب 1، 40 في التبويب 3)
  highlightValue?: number | null;
  // إظهار/إخفاء
  visible: boolean;
}

export function HeightRuler({ tRef, highlightValue = null, visible }: HeightRulerProps) {
  const markerRef = useRef<THREE.Group>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // علامات المسطرة كل 5m
  const marks: number[] = [];
  for (let h = 0; h <= H_INITIAL; h += 5) marks.push(h);

  useFrame(() => {
    if (!markerRef.current) return;
    // ارتفاع الكرة الحالي فوق سطح الأرض
    const t = tRef.current;
    const y = H_INITIAL + 0.5 * (-10) * t * t;
    const h = Math.max(0, y);

    markerRef.current.position.y = h;

    if (labelRef.current) {
      labelRef.current.textContent = `h = ${h.toFixed(1)} m`;
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
            <Html position={[1.3, 0, 0]} center distanceFactor={14}>
              <div
                style={{
                  background: isHighlight ? '#22c55e' : 'white',
                  color: isHighlight ? 'white' : '#1e293b',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  fontFamily: 'sans-serif',
                  border: '1px solid #cbd5e1',
                  whiteSpace: 'nowrap',
                }}
              >
                {h}
              </div>
            </Html>
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
        <Html position={[-0.8, 0, 0]} center distanceFactor={12}>
          <div
            ref={labelRef}
            style={{
              background: '#f59e0b',
              color: 'white',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
              border: '1px solid #d97706',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            h = …
          </div>
        </Html>
      </group>

      {/* تسمية "h" في الأعلى */}
      <Html position={[0, H_INITIAL + 1.5, 0]} center distanceFactor={12}>
        <div
          style={{
            color: '#1e293b',
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'serif',
            fontStyle: 'italic',
          }}
        >
          h (m)
        </div>
      </Html>
    </group>
  );
}
