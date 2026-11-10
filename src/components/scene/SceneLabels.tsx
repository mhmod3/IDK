// ============================================================
// SceneLabels — تسميات Text فوق الكرة
// تُظهر: t, vf, h, g (محدّثة لحظياً)
// يستعمل Text من drei (يُرسم في الفضاء 3D) بدلاً من Html
// لتجنّب race condition في React portals
// ============================================================

'use client';

import { useRef, memo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { G, BALL_X, BALL_Z } from '@/lib/constants';

interface SceneLabelsProps {
  tRef: React.MutableRefObject<number>;
  ballYRef: React.MutableRefObject<number>;
  showTime?: boolean;
  showVelocity?: boolean;
  showHeight?: boolean;
  showGravity?: boolean;
  showImpactLabel?: boolean;
  visible?: boolean;
}

function SceneLabelsImpl({
  tRef,
  ballYRef,
  showTime = true,
  showVelocity = true,
  showHeight = true,
  showGravity = false,
  showImpactLabel = false,
  visible = true,
}: SceneLabelsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const tLabelRef = useRef<THREE.Mesh>(null);
  const vLabelRef = useRef<THREE.Mesh>(null);
  const hLabelRef = useRef<THREE.Mesh>(null);
  const impactLabelRef = useRef<THREE.Mesh>(null);

  // مرجع لقيم showImpactLabel (للاستعمال داخل useFrame)
  const showImpactRef = useRef<boolean>(showImpactLabel);
  useEffect(() => {
    showImpactRef.current = showImpactLabel;
  }, [showImpactLabel]);

  useFrame(() => {
    if (!groupRef.current) return;
    const t = tRef.current;
    const ballY = ballYRef.current;

    groupRef.current.position.set(BALL_X, ballY, BALL_Z);

    const vf = G * t;
    const h = Math.max(0, ballY);

    // تحديث النصوص مباشرة على الميشات (بدون إعادة تصيير React)
    if (tLabelRef.current) {
      (tLabelRef.current as any).text = `t = ${t.toFixed(2)} s`;
    }
    if (vLabelRef.current) {
      (vLabelRef.current as any).text = `vf = ${vf.toFixed(1)} m/s`;
    }
    if (hLabelRef.current) {
      (hLabelRef.current as any).text = `h = ${h.toFixed(1)} m`;
    }
    if (impactLabelRef.current) {
      impactLabelRef.current.visible = (showImpactRef.current && t >= 3);
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {showTime && (
        <Text
          ref={tLabelRef}
          position={[1.8, 1.8, 0]}
          fontSize={0.5}
          color="#1e293b"
          backgroundColor="#ffffff"
          backgroundPadding={[0.25, 0.15]}
          anchorX="left"
          anchorY="middle"
        >
          t = ...
        </Text>
      )}
      {showVelocity && (
        <Text
          ref={vLabelRef}
          position={[1.8, 1.0, 0]}
          fontSize={0.5}
          color="#b91c1c"
          backgroundColor="#fef2f2"
          backgroundPadding={[0.25, 0.15]}
          anchorX="left"
          anchorY="middle"
        >
          vf = ...
        </Text>
      )}
      {showHeight && (
        <Text
          ref={hLabelRef}
          position={[1.8, 0.2, 0]}
          fontSize={0.5}
          color="#b45309"
          backgroundColor="#fffbeb"
          backgroundPadding={[0.25, 0.15]}
          anchorX="left"
          anchorY="middle"
        >
          h = ...
        </Text>
      )}
      {showGravity && (
        <Text
          position={[1.8, -0.6, 0]}
          fontSize={0.5}
          color="#1d4ed8"
          backgroundColor="#eff6ff"
          backgroundPadding={[0.25, 0.15]}
          anchorX="left"
          anchorY="middle"
        >
          g = -10 m/s²
        </Text>
      )}
      {showImpactLabel && (
        <Text
          ref={impactLabelRef}
          position={[0, -2.5, 0]}
          fontSize={0.9}
          color="#ffffff"
          backgroundColor="#dc2626"
          backgroundPadding={[0.4, 0.25]}
          anchorX="center"
          anchorY="middle"
          visible={false}
        >
          vf = -30 m/s (لحظة الاصطدام)
        </Text>
      )}
    </group>
  );
}

export const SceneLabels = memo(SceneLabelsImpl);
