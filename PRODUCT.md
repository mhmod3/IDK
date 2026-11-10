# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Primary: Iraqi 5th Scientific secondary school students (طلاب الصف الخامس العلمي) studying Chapter 2 (Linear Motion) in the physics curriculum.
- Secondary: Physics teachers delivering classroom demonstrations or supplementary visual explanations of textbook Example 3.

## Product Purpose

- Interactive 3D visualization and step-by-step problem solver for Example 3 (Free Fall, page 42) of the Iraqi 5th Scientific physics textbook.
- Eliminates cognitive abstraction by bridging textbook kinematic formulas with real-time 3D motion, synchronized live telemetry, and step-by-step substitution disclosures.
- Success criteria: Students understand why g = -10 m/s^2 is negative downward, why initial velocity vi = 0, how displacement and velocity evolve over time, and can independently solve each question of the textbook problem.

## Positioning

- Unlike generic physics sandbox simulators (such as PhET), this product is purpose-built and strictly aligned with the Iraqi physics textbook curriculum: identical problem parameters (t = 3 s, h = 45 m, g = -10 m/s^2), identical notation (vi, vf, Delta y), and zero out-of-curriculum noise (no air resistance, no bouncing, no F=ma).

## Operating Context

- Devices: Modern desktop and mobile web browsers with WebGL support.
- Environment: Iraqi high school physics classrooms (via projector/smartboard) and home study / homework self-review.
- Directionality: Right-to-Left (RTL) interface for Arabic explanations and navigation, with Left-to-Right (LTR) inline scientific formulas and telemetry values.

## Capabilities and Constraints

- Confirmed capabilities:
  - 3D interactive physics canvas (React Three Fiber / Three.js) featuring a 45m building, ground grid, falling ball, dynamically scaling velocity vector (vf), static gravity vector (g), dynamic height ruler, and trajectory trace.
  - Interactive playback controls: Play/Pause, Reset, Step-by-Step, and a scrubbable 0 to 3s timeline slider.
  - Synchronized real-time 2D SVG graphs (Delta y - t and vf - t) with tracking point indicator.
  - 3 structured curriculum tabs matching the problem parts: Part 1 (Building Height, h = 45 m), Part 2 (Impact Velocity, vf = -30 m/s), Part 3 (Velocity and Height at t = 1 s, vf = -10 m/s, h = 40 m).
  - 3-layer step-by-step solution disclosure: Formula -> Numerical substitution -> Final result with physical interpretation.
  - Interactive first-run onboarding walkthrough (5 steps, persisted via localStorage).
- Confirmed constraints:
  - Strictly bound to official curriculum parameters: g = -10 m/s^2 (fixed, non-customizable), vi = 0 m/s (initial velocity), t = 3 s total fall duration, building height H = 45 m.
  - Strictly only the 3 textbook equations: vf = vi + g*t, Delta y = 0.5*g*t^2, vf^2 = vi^2 + 2*g*Delta y.
  - Coordinate system convention: upward is positive, downward is negative (g and vf are negative).
  - Physics stops upon ground impact (t = 3 s); no bouncing, elasticity, or air resistance.
  - Rendering performance architecture: 3D scene driven at 60fps via tRef without React re-renders; React UI state throttled to ~15fps.

## Brand Commitments

- Typography: Cairo font (Google Fonts) for Arabic text, standard monospace/sans for mathematical notations.
- Palette: Sky, Amber, and Rose accents; strictly no blue/indigo primary thematic color.
- Vectors: Red arrow for instantaneous velocity vf (length proportional to |vf|/10), blue arrow for gravitational acceleration g (fixed length).
- Voice: Precise, authoritative, didactic educational Arabic matching the Iraqi Ministry of Education textbook terminology.

## Evidence on Hand

- Textbook source: Physics for Fifth Scientific Grade, Chapter 2 (Linear Motion), Page 42, Example 3 (السقوط الحر).
- Repository codebase: Complete working implementation at current project root.
- Architectural guide: AGENTS.md and README.md.
- No speculative, fabricated, or unverified claims.

## Product Principles

- Curriculum fidelity over generic simulation: Every parameter, equation, and sign convention strictly mirrors the Iraqi textbook.
- Dual-rate cognitive synchronization: Visual 3D kinematics run at 60fps while numerical telemetry updates steadily to aid student digestion without overwhelming re-renders.
- Progressive disclosure of rigor: Move from visual intuition (3D canvas) to empirical curves (SVG graphs) to formal mathematical derivation (3-tier equation reveal).
- Native Arabic educational ergonomics: Fluid RTL layout with crystal-clear LTR mathematical typesetting and zero layout shift.

## Accessibility & Inclusion

- Dual color and positional encoding for directional vectors and state indicators.
- Full keyboard/mouse/touch scrubbability for timeline and camera navigation.
- High-contrast text and numerical readouts against dark/elevated surfaces.
- ARIA labeling for all interactive controls and graph points.
