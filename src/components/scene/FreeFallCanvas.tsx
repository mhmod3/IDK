// ============================================================
// FreeFallCanvas — الحاوية الرئيسية لمشهد السقوط الحر ثلاثي الأبعاد
// ============================================================

'use client';

import { Suspense, useRef, useEffect } from 'react';
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
import { ballY } from '@/lib/physics';
import type { TabId } from '@/hooks/useFreeFall';

interface FreeFallCanvasProps {
  t: number;
  isPlaying: boolean;
  tRef: React.MutableRefObject<number>;
  onTimeUpdate: (t: number) => void;
  onImpact?: () => void;
  hasReset: boolean;
  activeTab: TabId;
  solutionStep: number;
}

export function FreeFallCanvas({
  t,
  isPlaying,
  tRef,
  onTimeUpdate,
  onImpact,
  hasReset,
  activeTab,
  solutionStep,
}: FreeFallCanvasProps) {
  const ballYRef = useRef<number>(H_INITIAL);

  const handleBallPosition = (y: number) => {
    ballYRef.current = y;
  };

  const showVelocityArrow = true;
  const showGravityArrow = true;
  const showHeightRuler = true;
  const showTrace = true;
  const showImpactLabel = activeTab === 2;

  // Ruler highlight only when solution is revealed or in active target time
  const rulerHighlight =
    activeTab === 1 && solutionStep >= 3 ? 45 :
    activeTab === 3 && solutionStep >= 3 ? 40 :
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
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN,
          }}
        />

        {/* Lighting */}
        <ambientLight intensity={0.65} />
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

        {/* Sky & Fog */}
        <Sky />

        {/* Ground & Building */}
        <Ground />
        <Building highlight={activeTab === 1} />

        {/* Fall trajectory trace */}
        <TraceLine tRef={tRef} visible={showTrace} />

        {/* Ball */}
        <BallUpdater
          t={t}
          isPlaying={isPlaying}
          tRef={tRef}
          onTimeUpdate={onTimeUpdate}
          onImpact={onImpact}
          hasReset={hasReset}
          onBallY={handleBallPosition}
        />

        {/* Vectors */}
        <VelocityArrow
          tRef={tRef}
          ballYRef={ballYRef}
          visible={showVelocityArrow}
        />
        <GravityArrow
          ballYRef={ballYRef}
          visible={showGravityArrow}
        />

        {/* Height ruler */}
        <HeightRuler
          tRef={tRef}
          highlightValue={rulerHighlight}
          visible={showHeightRuler}
        />

        {/* 3D Scene HUD Labels */}
        <SceneLabels
          tRef={tRef}
          ballYRef={ballYRef}
          showTime
          showVelocity
          showHeight
          showGravity
          showImpactLabel={showImpactLabel}
        />
      </Suspense>
    </Canvas>
  );
}

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
