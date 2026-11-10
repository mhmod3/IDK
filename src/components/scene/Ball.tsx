// ============================================================
// Ball — الكرة الساقطة
// كرة نصف قطرها 0.6، موضعها يُحدّث كل إطار وفق y(t)
// تأثير اصطدام بسيط عند بلوغ الأرض (اهتزاز + وميض)
// ============================================================

'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BALL_RADIUS, H_INITIAL, T_TOTAL, G } from '@/lib/constants';

interface BallProps {
  // الزمن الحالي (s)
  t: number;
  // هل الكرة في حالة سقوط نشط؟
  isPlaying: boolean;
  // مرجع للزمن الداخلي (يُحدّث داخل useFrame)
  tRef: React.MutableRefObject<number>;
  // دالة تحديث الزمن للحالة
  onTimeUpdate: (t: number) => void;
  // دالة تُستدعى عند بلوغ الاصطدام
  onImpact?: () => void;
  // هل تمت إعادة الضبط؟ (لإعادة الكرة للقمة فوراً)
  hasReset: boolean;
}

export function Ball({ t: initialT, isPlaying, tRef, onTimeUpdate, onImpact, hasReset }: BallProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const impactRef = useRef<THREE.PointLight>(null);
  const [impactPhase, setImpactPhase] = useState<number>(0);

  // موضع الكرة x = 0, z = 0 (ن落ち عمودياً)
  // y(t) = 45 + ½·g·t² = 45 - 5·t²
  const ballPosition = (time: number): number => H_INITIAL + 0.5 * G * time * time;

  // عند إعادة الضبط، نُصفّر الزمن
  useEffect(() => {
    if (hasReset) {
      tRef.current = 0;
      if (meshRef.current) {
        meshRef.current.position.y = H_INITIAL;
      }
    }
  }, [hasReset, tRef]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // عند إعادة الضبط نضع الكرة في القمة
    if (hasReset) {
      meshRef.current.position.y = H_INITIAL;
      return;
    }

    if (isPlaying) {
      tRef.current += delta;
      if (tRef.current >= T_TOTAL) {
        tRef.current = T_TOTAL;
        // توقف عند الاصطدام
        onTimeUpdate(T_TOTAL);
        if (onImpact) onImpact();
      } else {
        onTimeUpdate(tRef.current);
      }
    }

    const currentT = tRef.current;
    const newY = ballPosition(currentT);

    // اهتزاز بسيط عند الاصطدام
    if (currentT >= T_TOTAL && impactPhase < 1) {
      setImpactPhase((p) => Math.min(1, p + delta * 4));
    } else if (currentT < T_TOTAL && impactPhase > 0) {
      setImpactPhase(0);
    }

    // إزاحة بصرية صغيرة للاهتزاز
    const shake = impactPhase > 0 && impactPhase < 1
      ? Math.sin(impactPhase * Math.PI * 12) * 0.15 * (1 - impactPhase)
      : 0;

    meshRef.current.position.x = shake;
    meshRef.current.position.y = Math.max(BALL_RADIUS, newY);

    // وميض ضوء الاصطدام
    if (impactRef.current) {
      impactRef.current.intensity = impactPhase > 0 && impactPhase < 1
        ? (1 - impactPhase) * 8
        : 0;
    }
  });

  return (
    <group>
      {/* الكرة */}
      <mesh
        ref={meshRef}
        position={[0, H_INITIAL, 0]}
        castShadow
      >
        <sphereGeometry args={[BALL_RADIUS, 32, 32]} />
        <meshStandardMaterial
          color="#f97316"
          roughness={0.3}
          metalness={0.4}
          emissive="#ea580c"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* ضوء اصطدام */}
      <pointLight
        ref={impactRef}
        position={[0, BALL_RADIUS + 0.5, 0]}
        color="#fef3c7"
        intensity={0}
        distance={10}
        decay={2}
      />
    </group>
  );
}
