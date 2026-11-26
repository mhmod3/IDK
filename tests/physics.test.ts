import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  displacement,
  velocity,
  speed,
  heightAboveGround,
  distanceFallen,
  clampTime,
  hasImpacted,
  verifyReferencePoints,
} from '../src/lib/physics';
import { G, H_INITIAL, T_TOTAL, VI } from '../src/lib/constants';

describe('Physics Engine: Free Fall Example 3 (p. 42)', () => {
  it('should initialize with correct textbook constants', () => {
    assert.equal(G, -10, 'g must be -10 m/s^2 (downward in +y up axis)');
    assert.equal(VI, 0, 'vi must be 0 m/s (dropped from rest)');
    assert.equal(T_TOTAL, 3, 'Total time must be 3 seconds');
    assert.equal(H_INITIAL, 45, 'Initial height / building height must be 45 meters');
  });

  it('should calculate initial state at t = 0 s', () => {
    assert.equal(displacement(0), 0);
    assert.equal(velocity(0), 0);
    assert.equal(speed(0), 0);
    assert.equal(heightAboveGround(0), 45);
    assert.equal(distanceFallen(0), 0);
  });

  it('should calculate Tab 3 values at t = 1 s (Requirement 3: vf=-10 m/s, dy=-5m, h=40m)', () => {
    // 1. Velocity after 1s: vf = vi + gt = 0 + (-10)(1) = -10 m/s
    assert.equal(velocity(1), -10);
    // Speed magnitude: |vf| = 10 m/s
    assert.equal(speed(1), 10);
    // 2. Displacement during 1s: dy = 1/2 * g * t^2 = 1/2 * (-10) * 1 = -5 m
    assert.equal(displacement(1), -5);
    assert.equal(distanceFallen(1), 5);
    // 3. Height remaining above ground: h = H + dy = 45 - 5 = 40 m
    assert.equal(heightAboveGround(1), 40);
  });

  it('should calculate intermediate state at t = 2 s', () => {
    assert.equal(velocity(2), -20);
    assert.equal(speed(2), 20);
    assert.equal(displacement(2), -20);
    assert.equal(distanceFallen(2), 20);
    assert.equal(heightAboveGround(2), 25);
  });

  it('should calculate impact state at t = 3 s (Requirements 1 & 2: dy=-45m -> H=45m, vf=-30 m/s)', () => {
    // 1. Displacement at impact: dy = 1/2 * (-10) * (3)^2 = -45 m
    assert.equal(displacement(3), -45);
    // Building height: H = |dy| = 45 m
    assert.equal(Math.abs(displacement(3)), 45);
    // 2. Impact velocity: vf = 0 + (-10)(3) = -30 m/s
    assert.equal(velocity(3), -30);
    assert.equal(speed(3), 30);
    // Height at ground: h = 0 m
    assert.equal(heightAboveGround(3), 0);
    assert.equal(hasImpacted(3), true);
  });

  it('should clamp time within valid [0, 3] range', () => {
    assert.equal(clampTime(-1), 0);
    assert.equal(clampTime(1.5), 1.5);
    assert.equal(clampTime(4), 3);
  });

  it('should pass all reference verification points', () => {
    const refs = verifyReferencePoints();
    assert.equal(refs.displacementAt3, -45);
    assert.equal(refs.buildingHeight, 45);
    assert.equal(refs.velocityAt3, -30);
    assert.equal(refs.speedAt3, 30);
    assert.equal(refs.velocityAt1, -10);
    assert.equal(refs.speedAt1, 10);
    assert.equal(refs.displacementAt1, -5);
    assert.equal(refs.distanceFallenAt1, 5);
    assert.equal(refs.heightAboveGroundAt1, 40);
  });
});
