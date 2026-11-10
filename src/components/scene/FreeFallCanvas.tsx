// ============================================================
// FreeFallCanvas — الحاوية الرئيسية لمشهد ثلاثي الأبعاد
// تجمع: Canvas + الإضاءة + الكاميرا + كل العناصر
// ============================================================

'use client';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import { Building } from './Building';
import { Ground } from './Ground';
import { Sky } from './Sky';
import { Ball } from './Ball';
import { VelocityArrow } from './VelocityArrow';
import { GravityArrow } from './GravityArrow';
import { HeightRuler } from './HeightRuler';
import { TraceLine } from './TraceLine';
import { SceneLabels } from './SceneLabels';

import { CAMERA_POSITION, CAMERA_TARGET, H_INITIAL } from '@/lib/constants';
import type { TabId } from '@/hooks/useFreeFall';

interface FreeFallCanvasProps {
  t: number;
  isPlaying: boolean;
  tRef: React.MutableRefObject<number>;
  onTimeUpdate: (t: number) => void;
  onImpact?: () => void;
  hasReset: boolean;
  activeTab: TabId;
}

export function FreeFallCanvas({
  t,
  isPlaying,
  tRef,
  onTimeUpdate,
  onImpact,
  hasReset,
  activeTab,
}: FreeFallCanvasProps) {
  // مرجع لموضع الكرة (يُشارك مع الأسهم والتسميات)
  const ballYRef = useRef<number>(H_INITIAL);

  // تحديث ballYRef كل إطار من داخل Ball (يُمرَّر عبر callback)
  const handleBallPosition = (y: number) => {
    ballYRef.current = y;
  };

  // تحكم بصري حسب التبويب
  const showVelocityArrow = activeTab !== 1 || t > 0; // في التبويب 1 يظهر فقط بعد بدء الحركة
  const showGravityArrow = true;
  const showHeightRuler = true;
  const showTrace = activeTab !== 1 || t > 0;
  const showImpactLabel = activeTab === 2;

  // قيمة التمييز على المسطرة
  const rulerHighlight =
    activeTab === 1 ? 45 :
    activeTab === 3 ? 40 :
    null;

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      style={{ width: '100%', height: '100%' }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color('#cde3f5');
      }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera
          makeDefault
          position={CAMERA_POSITION}
          fov={45}
          near={0.1}
          far={1000}
        />

        <OrbitControls
          target={CAMERA_TARGET}
          enablePan
          enableZoom
          zoomToCursor
          screenSpacePanning
          minDistance={15}
          maxDistance={80}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.05}
          enableDamping
          dampingFactor={0.05}
          // الزر الأيسر = تدوير، الزر الأيمن = تحريك (pan)، العجلة = تقريب
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN,
          }}
        />

        {/* الإضاءة */}
        <ambientLight intensity={0.6} />
        <hemisphereLight
          color="#cde3f5"
          groundColor="#86a361"
          intensity={0.4}
        />
        <directionalLight
          position={[25, 40, 20]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={100}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
        />

        {/* السماء والضباب */}
        <Sky />

        {/* الأرض والمبنى */}
        <Ground />
        <Building highlight={activeTab === 1} />

        {/* الأثر */}
        <TraceLine tRef={tRef} visible={showTrace} />

        {/* الكرة */}
        <BallUpdater
          t={t}
          isPlaying={isPlaying}
          tRef={tRef}
          onTimeUpdate={onTimeUpdate}
          onImpact={onImpact}
          hasReset={hasReset}
          onBallY={handleBallPosition}
        />

        {/* الأسهم */}
        <VelocityArrow
          tRef={tRef}
          ballYRef={ballYRef}
          visible={showVelocityArrow}
        />
        <GravityArrow
          ballYRef={ballYRef}
          visible={showGravityArrow}
        />

        {/* المسطرة */}
        <HeightRuler
          tRef={tRef}
          highlightValue={rulerHighlight}
          visible={showHeightRuler}
        />

        {/* التسميات */}
        <SceneLabels
          tRef={tRef}
          ballYRef={ballYRef}
          showTime
          showVelocity={activeTab !== 1 || t > 0}
          showHeight={activeTab === 1 || activeTab === 3}
          showGravity={activeTab === 2}
          showImpactLabel={showImpactLabel}
        />
      </Suspense>
    </Canvas>
  );
}

// مكوّن داخلي لتحديث ballYRef داخل useFrame الخاص بالكرة
import { useEffect } from 'react';
import { ballY } from '@/lib/physics';

function BallUpdater({
  t,
  isPlaying,
  tRef,
  onTimeUpdate,
  onImpact,
  hasReset,
  onBallY,
}: {
  t: number;
  isPlaying: boolean;
  tRef: React.MutableRefObject<number>;
  onTimeUpdate: (t: number) => void;
  onImpact?: () => void;
  hasReset: boolean;
  onBallY: (y: number) => void;
}) {
  // تحديث ballYRef كلما تغيّر t
  useEffect(() => {
    onBallY(ballY(t));
  }, [t, onBallY]);

  return (
    <Ball
      t={t}
      isPlaying={isPlaying}
      tRef={tRef}
      onTimeUpdate={onTimeUpdate}
      onImpact={onImpact}
      hasReset={hasReset}
    />
  );
}
