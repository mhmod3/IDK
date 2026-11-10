// ============================================================
// SceneLabels — تسميات Html فوق الكرة
// تُظهر: t, v, h, g (محىّثة لحظياً)
// ============================================================

'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { H_INITIAL, G } from '@/lib/constants';

interface SceneLabelsProps {
  tRef: React.MutableRefObject<number>;
  ballYRef: React.MutableRefObject<number>;
  // أي التسميات تُظهر؟
  showTime?: boolean;
  showVelocity?: boolean;
  showHeight?: boolean;
  showGravity?: boolean;
  // إظهار تسمية كبيرة عند الاصطدام (vf = -30 m/s ↓)
  showImpactLabel?: boolean;
  visible?: boolean;
}

export function SceneLabels({
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
  const tLabelRef = useRef<HTMLSpanElement>(null);
  const vLabelRef = useRef<HTMLSpanElement>(null);
  const hLabelRef = useRef<HTMLSpanElement>(null);
  const impactLabelRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const t = tRef.current;
    const ballY = ballYRef.current;

    groupRef.current.position.set(0, ballY, 0);

    const vf = G * t; // السرعة (سالب)
    const h = Math.max(0, ballY);

    if (tLabelRef.current) tLabelRef.current.textContent = `t = ${t.toFixed(2)} s`;
    if (vLabelRef.current) vLabelRef.current.textContent = `vf = ${vf.toFixed(1)} m/s`;
    if (hLabelRef.current) hLabelRef.current.textContent = `h = ${h.toFixed(1)} m`;

    if (impactLabelRef.current) {
      impactLabelRef.current.style.display = (showImpactLabel && t >= 3) ? 'block' : 'none';
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      <Html position={[1.5, 1.2, 0]} center distanceFactor={10} zIndexRange={[10, 0]}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            pointerEvents: 'none',
            direction: 'ltr',
          }}
        >
          {showTime && (
            <div
              style={{
                background: 'white',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '12px',
                fontFamily: 'sans-serif',
                color: '#1e293b',
                whiteSpace: 'nowrap',
              }}
            >
              <span ref={tLabelRef}>t = …</span>
            </div>
          )}
          {showVelocity && (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #ef4444',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '12px',
                fontFamily: 'sans-serif',
                color: '#b91c1c',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
              }}
            >
              <span ref={vLabelRef}>vf = …</span>
            </div>
          )}
          {showHeight && (
            <div
              style={{
                background: '#fffbeb',
                border: '1px solid #f59e0b',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '12px',
                fontFamily: 'sans-serif',
                color: '#b45309',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
              }}
            >
              <span ref={hLabelRef}>h = …</span>
            </div>
          )}
          {showGravity && (
            <div
              style={{
                background: '#eff6ff',
                border: '1px solid #3b82f6',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '12px',
                fontFamily: 'sans-serif',
                color: '#1d4ed8',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
              }}
            >
              g = −10 m/s²
            </div>
          )}
        </div>
      </Html>

      {/* تسمية كبيرة عند الاصطدام */}
      {showImpactLabel && (
        <Html position={[0, -2.5, 0]} center distanceFactor={8}>
          <div
            ref={impactLabelRef}
            style={{
              display: 'none',
              background: '#dc2626',
              color: 'white',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
              border: '2px solid #991b1b',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              direction: 'ltr',
              whiteSpace: 'nowrap',
            }}
          >
            vf = −30 m/s ↓
          </div>
        </Html>
      )}
    </group>
  );
}
