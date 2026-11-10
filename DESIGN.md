---
name: Free Fall 3D
description: Interactive 3D Physics Simulation and Kinematics Solver for Iraqi 5th Scientific Grade Curriculum
colors:
  primary: "#0ea5e9"
  primary-hover: "#38bdf8"
  velocity: "#f43f5e"
  gravity: "#0ea5e9"
  displacement: "#f59e0b"
  surface-canvas: "#020617"
  surface-panel: "#0f172a"
  surface-subpanel: "#020617"
  surface-border: "#1e293b"
  text-primary: "#f8fafc"
  text-secondary: "#94a3b8"
  text-muted: "#64748b"
  match-success: "#10b981"
typography:
  display:
    fontFamily: "IBM Plex Sans Arabic, Cairo, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
  headline:
    fontFamily: "IBM Plex Sans Arabic, Cairo, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
  title:
    fontFamily: "IBM Plex Sans Arabic, Cairo, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "IBM Plex Sans Arabic, Cairo, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "IBM Plex Sans Arabic, Cairo, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
  micro:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 500
    lineHeight: 1.4
  math:
    fontFamily: "STIX Two Text, Cambria Math, Times New Roman, serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
  telemetry:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#020617"
    rounded: "{rounded.sm}"
    padding: "6px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  card-workstation:
    backgroundColor: "{colors.surface-panel}"
    rounded: "{rounded.lg}"
    padding: "16px"
---

# Design System: Free Fall 3D

## Overview

**Creative North Star: "Precision Laboratory Instrument and Modern Scientific Editorial"**

A high-density, rigorous educational physics workstation designed for secondary students and educators studying linear kinematics and free fall under the Iraqi curriculum. It repudiates decorative AI tropes (such as generic glassmorphism, floating drop-shadowed cards, and pastel gradients) in favor of crisp architectural framing, calibrated contrast, and functional chromatic clarity.

The workstation balances real-time 3D simulation with algebraic rigor. Space is organized so that visual 3D vector cues (instantaneous velocity, gravitational acceleration, height) correspond directly with live numerical telemetry and three-tier step-by-step mathematical deductions.

**Key Characteristics:**
- Dark laboratory workstation aesthetic rooted in deep slate and obsidian neutrals (`#020617` and `#0f172a`).
- Chromatic separation of physical roles: Velocity in Rose (`#f43f5e`), Gravity in Sky (`#0ea5e9`), and Displacement/Height in Amber (`#f59e0b`).
- Tri-font typographic architecture: Arabic UI and explanations in IBM Plex Sans Arabic / Cairo, variables and equations in STIX Two Text mathematical italics, and measurements in JetBrains Mono tabular figures.
- Dual-rate cognitive synchronization: Visual 3D kinematics driven at 60fps via mutable reference while React UI updates are throttled to 15Hz to maintain readability and eliminate render thrashing.

## Colors

The palette is strictly functional: saturated chromatic accents are reserved exclusively for directional physics vectors and telemetry variables against a deep slate neutral bedrock.

### Primary
- **Scientific Sky Accent** (`#0ea5e9`): Primary interactive state, time controls, and gravitational acceleration vector indicator (g = -10 m/s^2).

### Secondary
- **Kinematic Velocity Rose** (`#f43f5e`): Instantaneous velocity vector (vf), impact velocity state, and velocity-time linear graph curve.
- **Displacement Amber** (`#f59e0b`): Vertical displacement (Delta y), remaining altitude above ground (h), and displacement-time parabolic curve.

### Neutral
- **Obsidian Viewport Ground** (`#020617`): 3D canvas backdrop and sub-panel recessed wells.
- **Deep Slate Panel** (`#0f172a`): Workstation cards, navigation bars, and derivation containers.
- **Structural Grid Border** (`#1e293b`): 1px razor-sharp dividers defining all workstation compartments.
- **Primary Text** (`#f8fafc`): High-contrast titles, values, and formula terms.
- **Muted Text** (`#94a3b8` / `#64748b`): Labels, unit symbols, and metadata footnotes.
- **Match Indicator Green** (`#10b981`): Dynamic status highlight when numerical values reach milestone solution targets.

### Named Rules
**The Single-Role Color Rule.** Never use Rose, Sky, or Amber for decorative flair. Rose is only velocity; Sky is only gravity/time; Amber is only height/displacement. Their physical consistency across 3D vectors, 2D graphs, and telemetry cards is the entire cognitive bridge.

## Typography

**Display and Body Font:** IBM Plex Sans Arabic and Cairo (Arabic subsets, weights 400, 500, 600, 700).
**Mathematical Font:** STIX Two Text (italic Latin math symbols and variables: vf, vi, Delta y, g, t, h).
**Telemetry and Numeric Font:** JetBrains Mono (with `tabular-nums` and `font-feature-settings: "tnum" 1`).

**Character:** The typography pairs authoritative Middle-Eastern editorial clarity with international mathematical rigor and precision digital instrumentation.

### Hierarchy
- **Display** (Bold 700, 1.25rem, line-height 1.3): Application title and primary modal headers.
- **Headline** (SemiBold 600, 1.0rem, line-height 1.4): Curriculum problem step headings and major section labels.
- **Title** (SemiBold 600, 0.875rem, line-height 1.4): Tab titles and derivation stages.
- **Body** (Regular 400, 0.8125rem, line-height 1.5): Pedagogical explanations and textbook problem statement (measure: 50-65ch).
- **Caption** (Medium 500, 0.6875rem / 11px, line-height 1.4): Metadata subtitles, textbook citations, and secondary telemetry badges.
- **Micro** (Medium 500, 0.625rem / 10px, tabular figures): Minimalist HUD status labels, unit decorators, and grid coordinate indicators.
- **Label / Mono** (Medium 500, 0.75rem - 0.8125rem, tabular figures): Live telemetry readouts, slider tick marks, and graph coordinates.
- **Math Variable** (Italic 400, 0.875rem - 1.05rem, serif): Algebraic letters and subscript/superscript pairs.

### Named Rules
**The Strict Tabular Rule.** Every variable that updates over time must use `font-variant-numeric: tabular-nums` in JetBrains Mono. Numbers must never shift or jitter horizontally during playback.
**The Language Boundary Rule.** UI labels and explanations are strictly Right-to-Left (RTL) Arabic. Mathematical equations, numbers, units, and graph axes are strictly Left-to-Right (LTR) inside isolated containers.

## Layout

The workstation adopts a unified widescreen split topology:
- **Header Dock:** Fixed top navigation bar containing textbook reference metadata and pinned curriculum constants (g = -10 m/s^2, vi = 0, H = 45m, t = 3.0s).
- **Primary Pedagogical Deck (Right Column in RTL, 470px to 510px width):** Houses the problem tabs, step-specific briefing, three-layer derivation reveal, and live telemetry grid.
- **Simulation and Kinematics Deck (Left Column in RTL, flexible 1fr):** Houses the 3D physics viewport, precision transport controls, scrubbable timeline with milestone markers, and dual synchronized SVG graphs.
- **Responsive Stacking:** On viewports below 1024px, the layout gracefully collapses into a vertical single-column sequence prioritizing the interactive 3D viewport followed by controls and mathematical derivation.

## Elevation & Depth

This system avoids blurred drop shadows and elevated floating cards. Depth is established purely through tonal stepping and structural borders:
- Level 0 (Ground): `#020617` (Deepest backdrop)
- Level 1 (Workstation Cards): `#0f172a` bordered by `#1e293b`
- Level 2 (Recessed Telemetry Wells): `#020617` with subtle `#1e293b` border
- Level 3 (Active Focus / Target Match): Inset or 1px hairline ring in Emerald (`#10b981/50`) or Sky (`#0ea5e9/50`).

### Named Rules
**The Flat-By-Default Rule.** All surfaces sit flat at rest. Depth is expressed by high-contrast contrast steps, never ambient blur halos.

## Shapes

- Containers and panels use a restrained 8px radius (`rounded-lg`).
- Buttons, chips, and small telemetry badges use a 4px radius (`rounded`).
- Vectors, graph points, and status dots are pure geometric circles with 2px borders.
- 1px hairline borders (`border-slate-800`) cleanly demarcate all structural zones.

## Components

### Buttons
- **Shape:** 4px radius (`rounded`), compact padding (6px 16px).
- **Primary (Play/Pause):** Solid `#0ea5e9` (or `#f59e0b` when active), text `#020617`, font-weight 600.
- **Secondary (Step / Jump):** Background `#020617`, border `#1e293b`, text `#cbd5e1`, hover border `#334155`.
- **Ghost (Hide / Reset):** Borderless or subtle hairline, text `#94a3b8`, hover text `#f8fafc`.

### Segmented Problem Tabs
- Segmented container in `#0f172a` holding three tabs (Part 1: Height, Part 2: Impact Velocity, Part 3: State at 1s).
- Active tab uses `#1e293b` with a fine `#0ea5e9` ring and bright white title.
- Each tab displays a compact target badge displaying the mathematical goal in LTR math (`h = +45 m`, `vf = -30 m/s`, `vf = -10 m/s`).

### Three-Layer Derivation Accordion
- **Layer 1 (Formula):** Governing equation in STIX Two Text.
- **Layer 2 (Substitution):** Numerical substitution with signed parameters highlighted in Sky or Rose.
- **Layer 3 (Result):** Evaluated answer highlighted in Emerald with physical sign interpretation footnote.

### Live Telemetry HUD
- 6-cell data matrix displaying current t, vi, vf, Delta y, h, and g.
- Values rendered in 18px JetBrains Mono tabular numerals.
- Auto-triggers green ring highlight upon matching the active tab's physical milestone.

### Synchronized Kinematics Graphs
- Dual SVG plots (Displacement Parabola and Velocity Line).
- Clean Cartesian grid lines with monospace axis ticks.
- Dynamic crosshair and coordinate dot tracking the exact instantaneous state.

## Do's and Don'ts

### Do:
- **Do** isolate all mathematical formulas and numbers in `<span dir="ltr">` using `MathText`.
- **Do** keep g = -10 m/s^2, vi = 0, and t = 3.0s completely immutable across all views.
- **Do** throttle UI React re-renders to 15Hz while running Three.js canvas at 60fps via `tRef`.
- **Do** encode instantaneous velocity exclusively in Rose and gravity exclusively in Sky.

### Don't:
- **Don't** use emojis anywhere in the interface or scene overlays.
- **Don't** use pastel gradients, floating pill badges, or glassmorphic blur effects.
- **Don't** introduce air resistance, parabolic projectile math, or bouncing mechanics outside textbook Example 3.
- **Don't** use standard proportional fonts for numbers that change dynamically during simulation playback.
