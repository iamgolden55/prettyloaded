import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  CustomCaseConfig,
  PHONE_MODELS,
  CASE_COLORS,
  GLITTER_MIXES,
  Y2K_CHARMS,
  LIGHTING_PRESETS,
  PhoneModel,
  CaseColor,
  GlitterMix,
  CharmOption,
  LightingPreset,
} from '../../data/caseCustomizerData.ts';

export interface ThreePhoneCanvasRef {
  captureSnapshot: () => string;
  resetView: () => void;
  flipCase: () => void;
}

interface ThreePhoneCanvasProps {
  config: CustomCaseConfig;
  onConfigChange?: (newConfig: Partial<CustomCaseConfig>) => void;
  className?: string;
}

// Procedural rounded rectangle shape for phone body
function createRoundedRectShape(width: number, height: number, radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const w = width;
  const h = height;
  const r = Math.min(radius, w / 2, h / 2);

  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  return shape;
}

// Procedural 5-point star shape
function createStarShape(radius: number, innerRadius: number, points: number = 5): THREE.Shape {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / (points * 2);

  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? radius : innerRadius;
    const angle = i * step - Math.PI / 2;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

// Procedural heart shape
function createHeartShape(size: number): THREE.Shape {
  const shape = new THREE.Shape();
  const s = size * 0.7;
  shape.moveTo(0, s * 0.35);
  shape.bezierCurveTo(0, s * 0.8, -s * 0.9, s * 0.9, -s * 0.9, s * 0.25);
  shape.bezierCurveTo(-s * 0.9, -s * 0.3, 0, -s * 0.7, 0, -s);
  shape.bezierCurveTo(0, -s * 0.7, s * 0.9, -s * 0.3, s * 0.9, s * 0.25);
  shape.bezierCurveTo(s * 0.9, s * 0.9, 0, s * 0.8, 0, s * 0.35);
  return shape;
}

export const ThreePhoneCanvas = forwardRef<ThreePhoneCanvasRef, ThreePhoneCanvasProps>(
  ({ config, className = '' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const phoneGroupRef = useRef<THREE.Group | null>(null);
    const caseMeshRef = useRef<THREE.Mesh | null>(null);
    const glitterParticlesRef = useRef<THREE.Points | null>(null);
    const charmsGroupRef = useRef<THREE.Group | null>(null);
    const monogramMeshRef = useRef<THREE.Mesh | null>(null);
    const monogramTextureRef = useRef<THREE.CanvasTexture | null>(null);
    const lightsRef = useRef<{
      keyLight: THREE.DirectionalLight;
      fillLight: THREE.DirectionalLight;
      rimLight: THREE.DirectionalLight;
      ambientLight: THREE.AmbientLight;
    } | null>(null);

    const [isInteracting, setIsInteracting] = useState(false);
    const [viewSide, setViewSide] = useState<'back' | 'front' | 'side'>('back');

    // Expose imperative API for snapshots and controls
    useImperativeHandle(ref, () => ({
      captureSnapshot: () => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return '';
        // Render current scene synchronously before reading buffer
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        return rendererRef.current.domElement.toDataURL('image/png');
      },
      resetView: () => {
        if (!cameraRef.current || !controlsRef.current) return;
        cameraRef.current.position.set(0, 0, 8.5);
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
        setViewSide('back');
      },
      flipCase: () => {
        if (!cameraRef.current || !controlsRef.current) return;
        const currentZ = cameraRef.current.position.z;
        const targetZ = currentZ > 0 ? -8.5 : 8.5;
        cameraRef.current.position.set(0, 0, targetZ);
        controlsRef.current.update();
        setViewSide(targetZ > 0 ? 'back' : 'front');
      },
    }));

    // Initialize Three.js Scene
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth || 600;
      const height = container.clientHeight || 650;

      // 1. Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // 2. Camera
      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(0, 0, 8.5);
      cameraRef.current = camera;

      // 3. Renderer with color pipeline
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // 4. Studio Environment for high-specular chrome reflections
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      const roomEnv = new RoomEnvironment();
      const envTexture = pmremGenerator.fromScene(roomEnv, 0.04).texture;
      scene.environment = envTexture;
      pmremGenerator.dispose();

      // 5. Lighting Rig
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
      keyLight.position.set(4, 6, 6);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xffd1eb, 1.2);
      fillLight.position.set(-5, -2, 4);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xff4db8, 1.8);
      rimLight.position.set(0, 5, -6);
      scene.add(rimLight);

      lightsRef.current = { keyLight, fillLight, rimLight, ambientLight };

      // 6. Ground contact shadow plane
      const shadowGeo = new THREE.PlaneGeometry(8, 8);
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
        gradient.addColorStop(0, 'rgba(255, 77, 184, 0.35)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.18)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
      }
      const shadowTex = new THREE.CanvasTexture(canvas);
      const shadowMat = new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false,
      });
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.position.y = -3.8;
      shadowMesh.rotation.x = -Math.PI / 2;
      scene.add(shadowMesh);

      // 7. Phone Master Group
      const phoneGroup = new THREE.Group();
      scene.add(phoneGroup);
      phoneGroupRef.current = phoneGroup;

      // 8. Orbit Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.minDistance = 4.5;
      controls.maxDistance = 14;
      controls.maxPolarAngle = Math.PI - 0.1;
      controls.minPolarAngle = 0.1;
      controlsRef.current = controls;

      controls.addEventListener('start', () => setIsInteracting(true));
      controls.addEventListener('end', () => setIsInteracting(false));

      // 9. Resize Observer
      const handleResize = () => {
        if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      // 10. Animation Loop
      let animationFrameId: number;
      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        controls.update();

        // Gentle floating wobble when idle
        if (phoneGroupRef.current) {
          const ctrlState = (controls as unknown as { state?: number }).state;
          if (ctrlState === undefined || ctrlState === -1) {
            phoneGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.06;
            phoneGroupRef.current.rotation.y = Math.sin(elapsedTime * 0.8) * 0.08;
          }
        }

        // Animate dynamic sparkles in glitter layer
        if (glitterParticlesRef.current) {
          const positions = glitterParticlesRef.current.geometry.attributes.position;
          const count = positions.count;
          // Subtle shimmer wave
          const time = elapsedTime * 3.0;
          const colors = glitterParticlesRef.current.geometry.attributes.color;
          if (colors) {
            for (let i = 0; i < count; i++) {
              const sparkle = (Math.sin(time + i * 0.3) + 1.0) * 0.5;
              const r = colors.getX(i);
              const g = colors.getY(i);
              const b = colors.getZ(i);
              // Twinkle effect by modulating brightness
              colors.setXYZ(i, Math.min(1.0, r * (0.8 + sparkle * 0.4)), Math.min(1.0, g * (0.8 + sparkle * 0.4)), Math.min(1.0, b * (0.8 + sparkle * 0.4)));
            }
            colors.needsUpdate = true;
          }
        }

        // Dangling charm physics simulation
        if (charmsGroupRef.current) {
          const locket = charmsGroupRef.current.getObjectByName('locket-pendant');
          if (locket) {
            locket.rotation.z = Math.sin(elapsedTime * 3.2) * 0.15;
            locket.rotation.x = Math.cos(elapsedTime * 2.5) * 0.1;
          }
        }

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        controls.dispose();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }, []);

    // Build & Update 3D Phone Geometry & Customizer Details
    useEffect(() => {
      const scene = sceneRef.current;
      const phoneGroup = phoneGroupRef.current;
      if (!scene || !phoneGroup) return;

      // Clear existing phone components
      while (phoneGroup.children.length > 0) {
        const child = phoneGroup.children[0];
        phoneGroup.remove(child);
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
          else child.material.dispose();
        }
      }

      // Find current configurations
      const model = PHONE_MODELS.find((m) => m.id === config.phoneModelId) || PHONE_MODELS[0];
      const caseColor = CASE_COLORS.find((c) => c.id === config.colorId) || CASE_COLORS[0];
      const glitter = GLITTER_MIXES.find((g) => g.id === config.glitterMixId) || GLITTER_MIXES[0];
      const lighting = LIGHTING_PRESETS.find((l) => l.id === config.lightingPresetId) || LIGHTING_PRESETS[0];

      // Update Lighting Colors from Preset
      if (lightsRef.current) {
        lightsRef.current.keyLight.color.set(lighting.keyColor);
        lightsRef.current.fillLight.color.set(lighting.fillColor);
        lightsRef.current.rimLight.color.set(lighting.rimColor);
        lightsRef.current.keyLight.intensity = lighting.intensity;
      }

      const { width, height, depth, cornerRadius } = model.dimensions;

      // ─── 1. Inner Phone Core Chassis (Titanium / Aluminum Rails) ───
      const innerWidth = width - 0.12;
      const innerHeight = height - 0.12;
      const innerDepth = depth - 0.08;
      const innerShape = createRoundedRectShape(innerWidth, innerHeight, cornerRadius - 0.05);

      const innerExtrudeSettings: THREE.ExtrudeGeometryOptions = {
        depth: innerDepth,
        bevelEnabled: true,
        bevelSegments: 6,
        steps: 1,
        bevelSize: 0.05,
        bevelThickness: 0.05,
      };
      const innerGeo = new THREE.ExtrudeGeometry(innerShape, innerExtrudeSettings);
      innerGeo.center();

      const titaniumColor = model.brand === 'Apple' ? 0x2A2A2E : model.brand === 'Samsung' ? 0x1E2024 : 0x36383D;
      const innerMat = new THREE.MeshStandardMaterial({
        color: titaniumColor,
        metalness: 0.9,
        roughness: 0.2,
      });
      const phoneInner = new THREE.Mesh(innerGeo, innerMat);
      phoneInner.castShadow = true;
      phoneGroup.add(phoneInner);

      // ─── 2. Front Screen (Display & Bezel) ───
      const screenShape = createRoundedRectShape(innerWidth - 0.1, innerHeight - 0.1, cornerRadius - 0.08);
      const screenGeo = new THREE.ShapeGeometry(screenShape);

      // Generate stylish phone lockscreen canvas
      const screenCanvas = document.createElement('canvas');
      screenCanvas.width = 512;
      screenCanvas.height = 1024;
      const sCtx = screenCanvas.getContext('2d');
      if (sCtx) {
        // Pretty Loaded gradient wallpaper
        const grad = sCtx.createLinearGradient(0, 0, 512, 1024);
        grad.addColorStop(0, '#FF4DB8');
        grad.addColorStop(0.5, '#FF80CC');
        grad.addColorStop(1, '#FFCFE6');
        sCtx.fillStyle = grad;
        sCtx.fillRect(0, 0, 512, 1024);

        // Clock & Status
        sCtx.fillStyle = '#FFFFFF';
        sCtx.font = '800 92px Outfit, sans-serif';
        sCtx.textAlign = 'center';
        sCtx.fillText('10:54', 256, 260);

        sCtx.font = '600 28px Plus Jakarta Sans, sans-serif';
        sCtx.fillText('Thursday, November 12', 256, 310);

        // Pretty Loaded branding on lockscreen
        sCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        sCtx.font = '800 36px Outfit, sans-serif';
        sCtx.fillText('♡ PRETTY LOADED ♡', 256, 880);
      }
      const screenTex = new THREE.CanvasTexture(screenCanvas);
      screenTex.colorSpace = THREE.SRGBColorSpace;

      const screenMat = new THREE.MeshPhysicalMaterial({
        map: screenTex,
        roughness: 0.05,
        metalness: 0.1,
        clearcoat: 1.0,
      });
      const screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.position.z = -innerDepth / 2 - 0.06;
      screenMesh.rotation.y = Math.PI; // Face outwards to front
      phoneGroup.add(screenMesh);

      // ─── 3. Outer Protective Custom Case (Back & Edge Bumper) ───
      const caseShape = createRoundedRectShape(width, height, cornerRadius);
      const caseExtrudeSettings: THREE.ExtrudeGeometryOptions = {
        depth: depth,
        bevelEnabled: true,
        bevelSegments: 8,
        steps: 1,
        bevelSize: 0.08,
        bevelThickness: 0.08,
      };
      const caseGeo = new THREE.ExtrudeGeometry(caseShape, caseExtrudeSettings);
      caseGeo.center();

      // Case Material with Real PBR (Gloss / Metallic / Translucent Clear)
      const caseMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(caseColor.hex),
        metalness: caseColor.metalness,
        roughness: caseColor.roughness,
        transmission: caseColor.transmission,
        opacity: caseColor.opacity,
        transparent: caseColor.opacity < 1 || caseColor.transmission > 0,
        ior: 1.52,
        reflectivity: 0.9,
        clearcoat: config.finishType === 'glossy' ? 1.0 : 0.2,
        clearcoatRoughness: config.finishType === 'glossy' ? 0.05 : 0.4,
      });

      const caseMesh = new THREE.Mesh(caseGeo, caseMat);
      caseMesh.castShadow = true;
      caseMesh.receiveShadow = true;
      phoneGroup.add(caseMesh);
      caseMeshRef.current = caseMesh;

      // ─── 4. Camera Island & Lenses ───
      const { x: camX, y: camY, width: camW, height: camH } = model.cameraOffset;
      const camZ = depth / 2 + 0.09;

      if (model.cameraType === 'iphone-pro' || model.cameraType === 'iphone-dual') {
        // iPhone Rounded Square Camera Bump
        const camPlateShape = createRoundedRectShape(camW, camH, 0.35);
        const camPlateGeo = new THREE.ExtrudeGeometry(camPlateShape, {
          depth: 0.14,
          bevelEnabled: true,
          bevelSize: 0.04,
          bevelThickness: 0.04,
          bevelSegments: 4,
        });
        camPlateGeo.center();
        const camPlateMat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(caseColor.hex).offsetHSL(0, 0, -0.05),
          metalness: 0.8,
          roughness: 0.15,
          clearcoat: 1.0,
        });
        const camPlate = new THREE.Mesh(camPlateGeo, camPlateMat);
        camPlate.position.set(camX, camY, camZ);
        phoneGroup.add(camPlate);

        // Lenses
        const lensCount = model.cameraType === 'iphone-pro' ? 3 : 2;
        const lensPositions =
          lensCount === 3
            ? [
                { x: camX - 0.32, y: camY + 0.35 },
                { x: camX - 0.32, y: camY - 0.35 },
                { x: camX + 0.32, y: camY },
              ]
            : [
                { x: camX, y: camY + 0.38 },
                { x: camX, y: camY - 0.38 },
              ];

        lensPositions.forEach((pos) => {
          // Lens Ring (Chrome / Dark Titanium)
          const ringGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.18, 32);
          ringGeo.rotateX(Math.PI / 2);
          const ringMat = new THREE.MeshStandardMaterial({
            color: 0xC0C0C0,
            metalness: 0.95,
            roughness: 0.1,
          });
          const ringMesh = new THREE.Mesh(ringGeo, ringMat);
          ringMesh.position.set(pos.x, pos.y, camZ + 0.12);
          phoneGroup.add(ringMesh);

          // Glass Lens Element
          const glassGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.19, 32);
          glassGeo.rotateX(Math.PI / 2);
          const glassMat = new THREE.MeshPhysicalMaterial({
            color: 0x0A0F1D,
            metalness: 0.9,
            roughness: 0.05,
            clearcoat: 1.0,
          });
          const glassMesh = new THREE.Mesh(glassGeo, glassMat);
          glassMesh.position.set(pos.x, pos.y, camZ + 0.13);
          phoneGroup.add(glassMesh);
        });

        // Flash and LiDAR Sensor
        const flashGeo = new THREE.CircleGeometry(0.09, 16);
        const flashMat = new THREE.MeshBasicMaterial({ color: 0xFFFEE0 });
        const flashMesh = new THREE.Mesh(flashGeo, flashMat);
        flashMesh.position.set(camX + 0.32, camY + 0.42, camZ + 0.14);
        phoneGroup.add(flashMesh);
      } else if (model.cameraType === 'samsung-ultra' || model.cameraType === 'samsung-triple') {
        // Samsung Floating Camera Rings
        const count = model.cameraType === 'samsung-ultra' ? 4 : 3;
        for (let i = 0; i < count; i++) {
          const ly = camY + 0.65 - i * 0.58;
          const lx = camX;

          const ringGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.15, 32);
          ringGeo.rotateX(Math.PI / 2);
          const ringMat = new THREE.MeshStandardMaterial({ color: 0xD4D4D8, metalness: 0.95, roughness: 0.1 });
          const ring = new THREE.Mesh(ringGeo, ringMat);
          ring.position.set(lx, ly, camZ + 0.08);
          phoneGroup.add(ring);

          const glassGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.16, 32);
          glassGeo.rotateX(Math.PI / 2);
          const glass = new THREE.Mesh(glassGeo, new THREE.MeshPhysicalMaterial({ color: 0x050711, roughness: 0.05, metalness: 0.9 }));
          glass.position.set(lx, ly, camZ + 0.09);
          phoneGroup.add(glass);
        }
      } else if (model.cameraType === 'pixel-visor') {
        // Google Pixel Horizontal Visor Bar
        const visorShape = createRoundedRectShape(camW, camH, 0.3);
        const visorGeo = new THREE.ExtrudeGeometry(visorShape, { depth: 0.16, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04 });
        visorGeo.center();
        const visorMat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0, metalness: 0.9, roughness: 0.15 });
        const visor = new THREE.Mesh(visorGeo, visorMat);
        visor.position.set(camX, camY, camZ);
        phoneGroup.add(visor);

        // Glass pill cutout inside visor
        const pillShape = createRoundedRectShape(1.8, 0.45, 0.22);
        const pillGeo = new THREE.ShapeGeometry(pillShape);
        pillGeo.center();
        const pillMat = new THREE.MeshPhysicalMaterial({ color: 0x050711, roughness: 0.05, metalness: 0.9, clearcoat: 1.0 });
        const pill = new THREE.Mesh(pillGeo, pillMat);
        pill.position.set(camX, camY, camZ + 0.17);
        phoneGroup.add(pill);
      }

      // ─── 5. Layered Dynamic Glitter Particles ───
      const particleCount = Math.floor(650 * config.glitterDensity);
      const glitterGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      const colorPalette = glitter.colors.map((c) => new THREE.Color(c));

      let validParticles = 0;
      for (let i = 0; i < particleCount; i++) {
        // Distribute on phone backplate avoiding camera bump
        const px = (Math.random() - 0.5) * (width - 0.35);
        const py = (Math.random() - 0.5) * (height - 0.4);

        // Skip camera zone
        const inCamX = px > camX - camW / 2 - 0.15 && px < camX + camW / 2 + 0.15;
        const inCamY = py > camY - camH / 2 - 0.15 && py < camY + camH / 2 + 0.15;
        if (inCamX && inCamY) continue;

        const pz = depth / 2 + 0.09 + (Math.random() * 0.02 - 0.01);

        positions[validParticles * 3] = px;
        positions[validParticles * 3 + 1] = py;
        positions[validParticles * 3 + 2] = pz;

        const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[validParticles * 3] = chosenColor.r;
        colors[validParticles * 3 + 1] = chosenColor.g;
        colors[validParticles * 3 + 2] = chosenColor.b;

        // Size variety depending on particle type
        if (glitter.particleType === 'chunky' || glitter.particleType === 'holographic') {
          sizes[validParticles] = Math.random() * 0.12 + 0.05;
        } else if (glitter.particleType === 'stars') {
          sizes[validParticles] = Math.random() * 0.16 + 0.06;
        } else {
          sizes[validParticles] = Math.random() * 0.05 + 0.02;
        }

        validParticles++;
      }

      glitterGeo.setAttribute('position', new THREE.BufferAttribute(positions.slice(0, validParticles * 3), 3));
      glitterGeo.setAttribute('color', new THREE.BufferAttribute(colors.slice(0, validParticles * 3), 3));
      glitterGeo.setAttribute('size', new THREE.BufferAttribute(sizes.slice(0, validParticles), 1));

      // Procedural sparkle glint texture
      const glintCanvas = document.createElement('canvas');
      glintCanvas.width = 64;
      glintCanvas.height = 64;
      const gCtx = glintCanvas.getContext('2d');
      if (gCtx) {
        const radGrad = gCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
        radGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        radGrad.addColorStop(0.2, 'rgba(255, 220, 245, 0.9)');
        radGrad.addColorStop(0.5, 'rgba(255, 77, 184, 0.4)');
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        gCtx.fillStyle = radGrad;
        gCtx.fillRect(0, 0, 64, 64);

        // Cross sparkle spikes
        gCtx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        gCtx.lineWidth = 2;
        gCtx.beginPath();
        gCtx.moveTo(32, 4);
        gCtx.lineTo(32, 60);
        gCtx.moveTo(4, 32);
        gCtx.lineTo(60, 32);
        gCtx.stroke();
      }
      const glintTex = new THREE.CanvasTexture(glintCanvas);

      const glitterMat = new THREE.PointsMaterial({
        size: 0.12,
        map: glintTex,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const glitterPoints = new THREE.Points(glitterGeo, glitterMat);
      phoneGroup.add(glitterPoints);
      glitterParticlesRef.current = glitterPoints;

      // ─── 6. Y2K 3D Charms & Accessories ───
      const charmsGroup = new THREE.Group();
      phoneGroup.add(charmsGroup);
      charmsGroupRef.current = charmsGroup;

      config.activeCharms.forEach((charmId) => {
        const charmDef = Y2K_CHARMS.find((c) => c.id === charmId);
        if (!charmDef) return;

        const cz = depth / 2 + 0.15;

        if (charmId === 'ribbon-bow-locket') {
          // 3D Metallic Pink Ribbon Bow with Hanging Locket
          const bowGroup = new THREE.Group();
          bowGroup.position.set(0.65, -0.4, cz);

          // Left loop
          const loopGeo = new THREE.TorusGeometry(0.35, 0.12, 16, 32, Math.PI * 1.5);
          const bowMat = new THREE.MeshStandardMaterial({
            color: 0xFF4DB8,
            metalness: 0.85,
            roughness: 0.12,
          });
          const leftLoop = new THREE.Mesh(loopGeo, bowMat);
          leftLoop.position.set(-0.35, 0.1, 0.05);
          leftLoop.rotation.z = Math.PI * 0.25;
          bowGroup.add(leftLoop);

          // Right loop
          const rightLoop = new THREE.Mesh(loopGeo, bowMat);
          rightLoop.position.set(0.35, 0.1, 0.05);
          rightLoop.rotation.z = -Math.PI * 0.25;
          rightLoop.rotation.y = Math.PI;
          bowGroup.add(rightLoop);

          // Center knot
          const knotGeo = new THREE.SphereGeometry(0.16, 24, 24);
          const knotMesh = new THREE.Mesh(knotGeo, new THREE.MeshStandardMaterial({ color: 0xFF1493, metalness: 0.9, roughness: 0.1 }));
          knotMesh.position.set(0, 0.1, 0.12);
          bowGroup.add(knotMesh);

          // Hanging Crystal Heart Locket
          const locketPendant = new THREE.Group();
          locketPendant.name = 'locket-pendant';
          locketPendant.position.set(0, -0.05, 0.1);

          // Chain link
          const chainGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.35, 12);
          const chainMat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0, metalness: 0.95, roughness: 0.1 });
          const chain = new THREE.Mesh(chainGeo, chainMat);
          chain.position.y = -0.15;
          locketPendant.add(chain);

          // Heart Locket
          const heartShape = createHeartShape(0.32);
          const heartGeo = new THREE.ExtrudeGeometry(heartShape, { depth: 0.08, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04 });
          heartGeo.center();
          const heartMat = new THREE.MeshPhysicalMaterial({
            color: 0xFF007F,
            metalness: 0.85,
            roughness: 0.08,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05,
          });
          const locketMesh = new THREE.Mesh(heartGeo, heartMat);
          locketMesh.position.y = -0.42;
          locketPendant.add(locketMesh);

          bowGroup.add(locketPendant);
          charmsGroup.add(bowGroup);
        } else if (charmId === 'chrome-star') {
          // Puffed 5-Point Metallic Chrome Star
          const starShape = createStarShape(0.48, 0.22, 5);
          const starGeo = new THREE.ExtrudeGeometry(starShape, { depth: 0.08, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04 });
          starGeo.center();
          const starMat = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, metalness: 0.95, roughness: 0.08 });
          const starMesh = new THREE.Mesh(starGeo, starMat);
          starMesh.position.set(0.68, 0.85, cz);
          starMesh.rotation.z = 0.25;
          charmsGroup.add(starMesh);
        } else if (charmId === 'ruby-heart') {
          // 3D Faceted Crystal Ruby Gem
          const rubyShape = createHeartShape(0.45);
          const rubyGeo = new THREE.ExtrudeGeometry(rubyShape, { depth: 0.12, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05 });
          rubyGeo.center();
          const rubyMat = new THREE.MeshPhysicalMaterial({
            color: 0xE11D48,
            metalness: 0.6,
            roughness: 0.05,
            clearcoat: 1.0,
            transmission: 0.35,
          });
          const rubyMesh = new THREE.Mesh(rubyGeo, rubyMat);
          rubyMesh.position.set(0, -0.15, cz);
          charmsGroup.add(rubyMesh);
        } else if (charmId === 'orbit-ring') {
          // Chrome Y2K Planetary Swoosh Ring
          const orbitGeo = new THREE.TorusGeometry(0.9, 0.07, 16, 64);
          const orbitMat = new THREE.MeshStandardMaterial({ color: 0xD4D4D8, metalness: 0.98, roughness: 0.08 });
          const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
          orbitMesh.position.set(0, -0.65, cz);
          orbitMesh.rotation.x = Math.PI * 0.38;
          orbitMesh.rotation.y = -Math.PI * 0.15;
          charmsGroup.add(orbitMesh);
        } else if (charmId === 'beaded-wristlet') {
          // Acrylic Pearl and Candy Wristlet Strap
          const strapGroup = new THREE.Group();
          const beadCount = 14;
          const strapCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-width / 2 - 0.08, -1.8, 0),
            new THREE.Vector3(-width / 2 - 0.45, -2.4, 0.2),
            new THREE.Vector3(-width / 2 - 0.7, -3.1, 0.1),
            new THREE.Vector3(-width / 2 - 0.4, -3.8, -0.1),
            new THREE.Vector3(-width / 2 - 0.1, -4.2, 0),
          ]);

          const points = strapCurve.getPoints(beadCount);
          points.forEach((pt, idx) => {
            const isStar = idx % 3 === 0;
            const beadGeo = isStar
              ? new THREE.ExtrudeGeometry(createStarShape(0.16, 0.08, 5), { depth: 0.08, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02 })
              : new THREE.SphereGeometry(0.12, 16, 16);
            if (isStar) beadGeo.center();

            const beadMat = new THREE.MeshStandardMaterial({
              color: idx % 2 === 0 ? 0xFFCFE6 : 0xFFFFFF,
              metalness: 0.3,
              roughness: 0.15,
            });
            const bead = new THREE.Mesh(beadGeo, beadMat);
            bead.position.copy(pt);
            strapGroup.add(bead);
          });
          charmsGroup.add(strapGroup);
        }
      });

      // ─── 7. Custom Debossed Chrome Monogram / Name ───
      if (config.monogramText.trim().length > 0) {
        const textCanvas = document.createElement('canvas');
        textCanvas.width = 512;
        textCanvas.height = 256;
        const tCtx = textCanvas.getContext('2d');
        if (tCtx) {
          tCtx.clearRect(0, 0, 512, 256);

          // Chrome / Foil gradient
          const foilGrad = tCtx.createLinearGradient(0, 0, 512, 256);
          if (config.monogramColor === '#FF4DB8') {
            foilGrad.addColorStop(0, '#FFFFFF');
            foilGrad.addColorStop(0.3, '#FF4DB8');
            foilGrad.addColorStop(0.7, '#D91A8D');
            foilGrad.addColorStop(1, '#FFFFFF');
          } else {
            foilGrad.addColorStop(0, '#FFFFFF');
            foilGrad.addColorStop(0.3, '#E2E8F0');
            foilGrad.addColorStop(0.5, '#94A3B8');
            foilGrad.addColorStop(0.8, '#F8FAFC');
            foilGrad.addColorStop(1, '#CBD5E1');
          }

          tCtx.fillStyle = foilGrad;
          tCtx.shadowColor = 'rgba(0, 0, 0, 0.45)';
          tCtx.shadowBlur = 8;
          tCtx.shadowOffsetX = 2;
          tCtx.shadowOffsetY = 4;

          const fontFace = config.monogramFont === 'cursive' ? 'Playfair Display, serif' : 'Outfit, sans-serif';
          tCtx.font = `900 ${config.monogramText.length > 6 ? 64 : 78}px ${fontFace}`;
          tCtx.textAlign = 'center';
          tCtx.textBaseline = 'middle';
          tCtx.fillText(config.monogramText.toUpperCase(), 256, 128);

          // Foil border outline
          tCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          tCtx.lineWidth = 3;
          tCtx.strokeText(config.monogramText.toUpperCase(), 256, 128);
        }

        const monoTex = new THREE.CanvasTexture(textCanvas);
        monoTex.colorSpace = THREE.SRGBColorSpace;
        monogramTextureRef.current = monoTex;

        const monoGeo = new THREE.PlaneGeometry(2.3, 1.15);
        const monoMat = new THREE.MeshBasicMaterial({
          map: monoTex,
          transparent: true,
          depthWrite: false,
        });
        const monoMesh = new THREE.Mesh(monoGeo, monoMat);
        monoMesh.position.set(0, -1.8, depth / 2 + 0.12);
        phoneGroup.add(monoMesh);
        monogramMeshRef.current = monoMesh;
      }
    }, [config]);

    return (
      <div className={`relative w-full h-full select-none overflow-hidden ${className}`}>
        {/* 3D Canvas Mount Point */}
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Viewport Floating Controls */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-pink-200/80 shadow-sm text-xs font-semibold text-slate-800">
            <span className="w-2 h-2 rounded-full bg-pink-500" />
            <span>Interactive 3D Preview</span>
          </div>

          <button
            onClick={() => {
              if (cameraRef.current && controlsRef.current) {
                cameraRef.current.position.set(0, 0, 8.5);
                controlsRef.current.target.set(0, 0, 0);
                controlsRef.current.update();
                setViewSide('back');
              }
            }}
            className="px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-xs font-medium text-slate-700 hover:text-pink-600 hover:border-pink-300 transition-colors shadow-sm"
          >
            Reset
          </button>

          <button
            onClick={() => {
              if (cameraRef.current && controlsRef.current) {
                const currentZ = cameraRef.current.position.z;
                const targetZ = currentZ > 0 ? -8.5 : 8.5;
                cameraRef.current.position.set(0, 0, targetZ);
                controlsRef.current.update();
                setViewSide(targetZ > 0 ? 'back' : 'front');
              }
            }}
            className="px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-xs font-medium text-slate-700 hover:text-pink-600 hover:border-pink-300 transition-colors shadow-sm"
          >
            Flip to {viewSide === 'back' ? 'Screen' : 'Back'}
          </button>
        </div>

        {/* Hint banner at bottom of canvas */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium tracking-wide">
          ✨ Drag to rotate 360° · Pinch or scroll to zoom · Click charms to personalize
        </div>
      </div>
    );
  }
);

ThreePhoneCanvas.displayName = 'ThreePhoneCanvas';
