# Pretty Loaded engineering audit

Audit date: 2026-11-12
Branch: `main` at the time of review

## Current application

- Vite + React 19 + TypeScript.
- Three.js is used directly in `src/components/studio/ThreePhoneCanvas.tsx`.
- Product customisation state and pricing are centralised in `src/data/caseCustomizerData.ts`.
- The page is currently a front-end prototype. There is no verified payment or order backend in this repository.

## Findings and recommended order

### P0 — Product representation and device accuracy

1. No downloadable phone/case GLB or glTF models are currently present in `public/`.
2. The phone chassis, display, case and camera assemblies are procedurally generated from rounded rectangles and a small set of camera-type branches.
3. The model records use approximate dimensions and manually-entered camera offsets; no source/provenance for those measurements is recorded.
4. The current geometry visually layers camera rings and camera plates on top of the case rather than representing a validated device-specific case opening.
5. Before adding more devices, source licensed, dimension-accurate phone and case assets and validate the case-to-device fit. Do not present approximate geometry as manufacturing-ready.

### P1 — Three.js lifecycle and performance

1. The scene-building effect depends on the entire `config` object, so a colour, charm, text or lighting change rebuilds the entire phone scene.
2. Cleanup only disposes geometry/materials when a direct child is a `THREE.Mesh`. Nested meshes inside charm groups are removed without disposing their GPU resources.
3. Glitter uses a `size` buffer attribute, but `THREE.PointsMaterial` uses a single fixed point size; the per-particle size values are therefore not applied.
4. The animation loop reads and multiplies the already-modified colour values on every frame. Sparkle brightness should be derived from immutable base colours or a shader uniform, not accumulated.
5. Resizing listens to the window resize event rather than observing the actual canvas container. A `ResizeObserver` would be more reliable for responsive layouts.
6. Rework the renderer into focused model, material, accessory and lighting layers; update only the layer affected by a user selection.

### P1 — Checkout and customer trust

1. Checkout was a timer-driven success simulation and did not perform a payment transaction. This branch removes the fake success state and visibly disables checkout until a real provider is integrated.
2. The newsletter was showing a local success state without sending an address to a mailing-list provider. This branch removes the simulated signup form.
3. Remove or verify product claims about drop certification, resin longevity, MagSafe and protection before publishing. This branch softens claims that had no supporting evidence in the repository.
4. Before launch, implement server-side price calculation, order creation, payment verification/webhooks, and an order confirmation flow.

### P2 — Application structure and UX

1. `App.tsx` owns configurator state, cart state, snapshot handling, pricing and navigation. Extract pricing and feature-specific state as the application grows.
2. Review mobile viewport sizing and add touch-friendly camera controls, keyboard support and accessible labels.
3. Replace emoji-only product cues with consistent product imagery or designed swatches where these improve product recognition.
4. Establish a small design-token layer for typography, surfaces, spacing, borders, focus states and responsive breakpoints.

## Suggested PR sequence

1. Foundation and honest prototype states — this branch.
2. Model catalogue and realistic device/case GLB assets.
3. Renderer lifecycle, geometry/material separation and glitter performance.
4. Customiser UX, responsive layouts and accessibility.
5. Payment, order management, shipping and mailing-list integrations.

## Verification note

The GitHub repository was inspected through the GitHub integration. A local dependency install and `npm run build` / `npm run lint` could not be run in the review environment because direct network access to clone the repository was unavailable. These checks should run in CI before merging.
