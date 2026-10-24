'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  scrollProgress: number;
  currentSection: number;
}

export default function ThreeCanvas({ scrollProgress, currentSection }: ThreeCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  
  // 3D Objects
  const ribbonMeshRef = useRef<THREE.Mesh | null>(null);
  const cascadeRibbonRef = useRef<THREE.Mesh | null>(null);
  const beansGroupRef = useRef<THREE.Group | null>(null);
  const iceCubesGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);
    cameraRef.current = camera;

    // 3. Renderer with ACES Filmic Tone Mapping for cinematic coffee sheen
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting setup (Warm Golden Cafe Lighting)
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffecd2, 3.0);
    keyLight.position.set(6, 10, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe88f38, 4.0);
    rimLight.position.set(-8, -4, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xd49b5c, 2.5, 30);
    fillLight.position.set(0, -1, 6);
    scene.add(fillLight);

    // 5. Caramel & Espresso Materials
    const caramelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc47e33,
      emissive: 0x421c05,
      roughness: 0.12,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
      transmission: 0.18,
      ior: 1.48,
    });

    const richCaramelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xa95e20,
      emissive: 0x3d1704,
      roughness: 0.14,
      metalness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    // 6. Section 1 & 2: Swirling Funnel Spiral Curve
    class VortexSpiralCurve extends THREE.Curve<THREE.Vector3> {
      scale: number;
      constructor(scale = 1) {
        super();
        this.scale = scale;
      }
      getPoint(t: number, optionalTarget = new THREE.Vector3()) {
        const angle = t * Math.PI * 6.0;
        // Funnel shape: wider at top, tight in center, expands at bottom
        const radius = (2.2 + Math.cos(t * Math.PI * 2) * 1.2) * this.scale;
        const x = Math.cos(angle) * radius;
        const y = (0.5 - t) * 11.0 * this.scale;
        const z = Math.sin(angle) * radius * 1.15;
        return optionalTarget.set(x, y, z);
      }
    }

    const vortexPath = new VortexSpiralCurve(1.15);
    const vortexGeo = new THREE.TubeGeometry(vortexPath, 180, 0.32, 22, false);
    const ribbonMesh = new THREE.Mesh(vortexGeo, caramelMaterial);
    scene.add(ribbonMesh);
    ribbonMeshRef.current = ribbonMesh;

    // 7. Section 3: Cascading Continuous Liquid Ribbon flowing from top to bottom
    // Flows continuously down over the cup and off the screen
    class CascadeCurve extends THREE.Curve<THREE.Vector3> {
      scale: number;
      constructor(scale = 1) {
        super();
        this.scale = scale;
      }
      getPoint(t: number, optionalTarget = new THREE.Vector3()) {
        const angle = t * Math.PI * 5.2;
        const radius = (2.8 - Math.sin(t * Math.PI) * 0.7) * this.scale;
        const x = Math.sin(angle) * radius;
        const y = (1.0 - t * 2.2) * 8.5 * this.scale;
        const z = Math.cos(angle) * radius * 0.95;
        return optionalTarget.set(x, y, z);
      }
    }

    const cascadePath = new CascadeCurve(1.2);
    const cascadeGeo = new THREE.TubeGeometry(cascadePath, 200, 0.34, 24, false);
    const cascadeRibbon = new THREE.Mesh(cascadeGeo, richCaramelMaterial);
    cascadeRibbon.position.set(0, 0, 0);
    cascadeRibbon.scale.set(0.001, 0.001, 0.001); // starts hidden
    scene.add(cascadeRibbon);
    cascadeRibbonRef.current = cascadeRibbon;

    // 8. Floating 3D Roasted Coffee Beans
    const beansGroup = new THREE.Group();
    scene.add(beansGroup);
    beansGroupRef.current = beansGroup;

    const beanGeo = new THREE.SphereGeometry(0.24, 18, 14);
    beanGeo.scale(1.5, 0.9, 0.75); // Coffee bean shape
    const beanMat = new THREE.MeshStandardMaterial({
      color: 0x2b1509,
      roughness: 0.38,
      metalness: 0.15,
    });

    const beanCount = 36;
    const beanItems: { mesh: THREE.Mesh; rotSpeed: THREE.Vector3; initialPos: THREE.Vector3; orbitSpeed: number }[] = [];

    for (let i = 0; i < beanCount; i++) {
      const bean = new THREE.Mesh(beanGeo, beanMat);
      const angle = (i / beanCount) * Math.PI * 2;
      const radius = 3.2 + (i % 5) * 0.9;
      const posX = Math.cos(angle) * radius;
      const posY = ((i % 12) - 6) * 1.5;
      const posZ = Math.sin(angle) * radius * 0.6;

      bean.position.set(posX, posY, posZ);
      bean.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const s = 0.7 + Math.random() * 0.55;
      bean.scale.set(s, s, s);

      beansGroup.add(bean);
      beanItems.push({
        mesh: bean,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03
        ),
        initialPos: new THREE.Vector3(posX, posY, posZ),
        orbitSpeed: 0.008 + (i % 3) * 0.005,
      });
    }

    // 9. Floating Crystal 3D Ice Cubes
    const iceCubesGroup = new THREE.Group();
    scene.add(iceCubesGroup);
    iceCubesGroupRef.current = iceCubesGroup;

    const iceGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const iceMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.88,
      opacity: 0.92,
      transparent: true,
      roughness: 0.1,
      ior: 1.31,
      reflectivity: 0.95,
      clearcoat: 1.0,
    });

    const iceCount = 14;
    const iceItems: { mesh: THREE.Mesh; rotSpeed: THREE.Vector3; initialPos: THREE.Vector3 }[] = [];

    for (let i = 0; i < iceCount; i++) {
      const ice = new THREE.Mesh(iceGeo, iceMat);
      const angle = (i / iceCount) * Math.PI * 2;
      const radius = 3.6 + (i % 3) * 1.2;
      const posX = Math.cos(angle) * radius;
      const posY = ((i % 8) - 4) * 2.2;
      const posZ = Math.sin(angle) * radius * 0.8;

      ice.position.set(posX, posY, posZ);
      ice.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const s = 0.8 + Math.random() * 0.5;
      ice.scale.set(s, s, s);

      iceCubesGroup.add(ice);
      iceItems.push({
        mesh: ice,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
        initialPos: new THREE.Vector3(posX, posY, posZ),
      });
    }

    // 10. Golden Aroma Specks & Droplets
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 18;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      particleSpeeds.push(0.008 + Math.random() * 0.02);
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xefad64,
      size: 0.14,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 11. Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 12. Resize
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 13. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const progress = scrollRef.current; // 0 to 1

      // Mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Parallax camera tilt
      camera.position.x = mouseRef.current.x * 0.85;
      camera.position.y = -mouseRef.current.y * 0.85;
      camera.lookAt(0, 0, 0);

      // --- SECTION 1 & 2: Primary Vortex Ribbon Dynamics ---
      if (ribbonMeshRef.current) {
        if (progress < 0.62) {
          // Continuous dynamic spin + accelerated scroll spin
          ribbonMeshRef.current.rotation.y = elapsedTime * 0.45 + progress * Math.PI * 5;
          ribbonMeshRef.current.rotation.x = Math.sin(elapsedTime * 0.6) * 0.2 + mouseRef.current.y * 0.25;
          ribbonMeshRef.current.rotation.z = Math.cos(elapsedTime * 0.5) * 0.15 + mouseRef.current.x * 0.25;

          // As scroll moves from Stage 1 to Stage 2: Vortex tightens & spins faster
          if (progress < 0.28) {
            // Stage 1: Floating wide ribbon around ingredients
            ribbonMeshRef.current.scale.setScalar(1.05);
            ribbonMeshRef.current.position.y = progress * 1.5;
          } else {
            // Stage 2: Whirlpool convergence
            const stage2Progress = (progress - 0.28) / 0.34; // 0 to 1
            const pulse = 1.05 + Math.sin(stage2Progress * Math.PI) * 0.3;
            ribbonMeshRef.current.scale.setScalar(pulse);
            ribbonMeshRef.current.position.y = Math.sin(elapsedTime * 1.2) * 0.4;
          }
        } else {
          // Smoothly scale down and give way to Stage 3 cascade
          const fadeOut = Math.max(0.001, 1 - (progress - 0.62) * 5);
          ribbonMeshRef.current.scale.setScalar(fadeOut);
        }
      }

      // --- SECTION 3: Cascading Ribbon Flowing Continuously from Top around the Cup ---
      if (cascadeRibbonRef.current) {
        if (progress >= 0.5) {
          const stage3Progress = Math.min((progress - 0.5) / 0.45, 1); // 0 to 1
          const scale = Math.sin(stage3Progress * Math.PI * 0.5) * 1.25;
          cascadeRibbonRef.current.scale.setScalar(Math.max(0.001, scale));
          
          // Continuous cascading downward flow
          cascadeRibbonRef.current.rotation.y = elapsedTime * 0.5 + stage3Progress * Math.PI * 3;
          cascadeRibbonRef.current.rotation.x = 0.2 + Math.sin(elapsedTime * 0.7) * 0.15;
          cascadeRibbonRef.current.position.y = -stage3Progress * 0.5 + Math.sin(elapsedTime * 0.8) * 0.2;
        } else {
          cascadeRibbonRef.current.scale.setScalar(0.001);
        }
      }

      // --- Floating Beans Dynamics ---
      beanItems.forEach((item, idx) => {
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.rotation.z += item.rotSpeed.z;

        // In Stage 2 (0.28 - 0.62), beans get sucked inward toward vortex center
        if (progress >= 0.25 && progress <= 0.65) {
          const suction = 0.75 + Math.sin(((progress - 0.25) / 0.4) * Math.PI) * 0.5;
          item.mesh.position.x = item.initialPos.x * (1 / suction);
          item.mesh.position.y = item.initialPos.y + Math.sin(elapsedTime * 2.5 + idx) * 0.4;
        } else {
          item.mesh.position.x = item.initialPos.x + Math.sin(elapsedTime * 0.8 + idx) * 0.3;
          item.mesh.position.y = item.initialPos.y + Math.cos(elapsedTime * 0.8 + idx) * 0.3;
        }
      });

      // --- Floating Ice Cubes Dynamics ---
      iceItems.forEach((item, idx) => {
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.rotation.z += item.rotSpeed.z;
        item.mesh.position.y = item.initialPos.y + Math.sin(elapsedTime * 0.6 + idx) * 0.35;
      });

      // --- Golden Aroma Specks ---
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += particleSpeeds[i];
          if (positions[i * 3 + 1] > 8) {
            positions[i * 3 + 1] = -8;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
        particlesRef.current.rotation.y = elapsedTime * 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-15 w-full h-full overflow-hidden"
      style={{ opacity: 0.96 }}
    />
  );
}
