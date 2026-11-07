import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Wind, RotateCcw, Utensils } from 'lucide-react';
import { sound } from '../utils/sound';
import { triggerBirthdayConfetti, triggerCandleSmokeAndSparkles, triggerCakeCutSparkles } from '../utils/confetti';

interface Cake3DProps {
  friendName: string;
}

export const Cake3D: React.FC<Cake3DProps> = ({ friendName }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [candlesLit, setCandlesLit] = useState(true);
  const [isCakeCut, setIsCakeCut] = useState(false);
  const [isCutting, setIsCutting] = useState(false);

  // References for 3D elements
  const flamesRef = useRef<{ mesh: THREE.Mesh; light: THREE.PointLight; baseY: number }[]>([]);
  const knifeRef = useRef<THREE.Group | null>(null);
  const sliceGroupRef = useRef<THREE.Group | null>(null);
  const cakeGroupRef = useRef<THREE.Group | null>(null);
  const dessertDishRef = useRef<THREE.Mesh | null>(null);

  // Smooth motion tracking
  const currentRotation = useRef<number>(0);
  const cutAnimProgress = useRef<number>(0);
  const isAnimatingCut = useRef<boolean>(false);
  const isCutFinished = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();

    // Adjusted Camera for perfect proportion and centering (no clipping on any device)
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    camera.position.set(0, 3.6, 7.8);
    camera.lookAt(0, 0.7, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Main Cake Group - scaled to 0.74 to fit properly inside the frame with comfortable margins
    const cakeGroup = new THREE.Group();
    cakeGroup.scale.set(0.74, 0.74, 0.74);
    cakeGroup.position.set(0, -0.45, 0);
    cakeGroupRef.current = cakeGroup;
    scene.add(cakeGroup);

    // Three-Point Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeed6, 2.2);
    keyLight.position.set(5, 9, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd6a475, 1.2);
    fillLight.position.set(-6, 4, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfffdfa, 1.0);
    rimLight.position.set(0, 10, -2);
    scene.add(rimLight);

    // Materials
    const plateMaterial = new THREE.MeshStandardMaterial({
      color: 0x140c11,
      metalness: 0.85,
      roughness: 0.2
    });
    const bottomFrostingMaterial = new THREE.MeshStandardMaterial({
      color: 0x6b2335, // Velvet Burgundy
      roughness: 0.38
    });
    const topFrostingMaterial = new THREE.MeshStandardMaterial({
      color: 0xfdfaf3, // Silky Cream Buttercream
      roughness: 0.28
    });
    const goldLeafMaterial = new THREE.MeshStandardMaterial({
      color: 0xd6a475, // Gold caramel
      metalness: 0.95,
      roughness: 0.15
    });
    const darkSpongeMaterial = new THREE.MeshStandardMaterial({
      color: 0x422617, // Rich cocoa sponge
      roughness: 0.85
    });
    const strawberryMousseMaterial = new THREE.MeshStandardMaterial({
      color: 0x8d354a, // Berry filling
      roughness: 0.6
    });
    const vanillaSpongeMaterial = new THREE.MeshStandardMaterial({
      color: 0xd6b585, // Golden sponge
      roughness: 0.8
    });

    // 1. Serving Plate
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(2.45, 2.2, 0.12, 64), plateMaterial);
    plate.position.y = -0.06;
    plate.receiveShadow = true;
    cakeGroup.add(plate);

    const plateRim = new THREE.Mesh(new THREE.TorusGeometry(2.42, 0.035, 16, 64), goldLeafMaterial);
    plateRim.rotation.x = Math.PI / 2;
    plateRim.position.y = 0.01;
    cakeGroup.add(plateRim);

    // 2. Bottom Tier (Velvet Burgundy)
    const bottomTier = new THREE.Mesh(new THREE.CylinderGeometry(1.88, 1.88, 0.85, 64), bottomFrostingMaterial);
    bottomTier.position.y = 0.43;
    bottomTier.castShadow = true;
    bottomTier.receiveShadow = true;
    cakeGroup.add(bottomTier);

    const bottomBead = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.04, 16, 64), goldLeafMaterial);
    bottomBead.rotation.x = Math.PI / 2;
    bottomBead.position.y = 0.86;
    cakeGroup.add(bottomBead);

    // 3. Top Tier Main Body (305 degrees, leaving 55 degrees for the cut slice)
    const sliceAngle = Math.PI * (55 / 180); // 55 degrees
    const topTierMain = new THREE.Mesh(
      new THREE.CylinderGeometry(1.25, 1.25, 0.78, 48, 1, false, sliceAngle, Math.PI * 2 - sliceAngle),
      topFrostingMaterial
    );
    topTierMain.position.y = 1.25;
    topTierMain.castShadow = true;
    topTierMain.receiveShadow = true;
    cakeGroup.add(topTierMain);

    // Interior cross-section layers for main body cavity
    const createLayeredCutFace = (rotY: number, posX: number, posZ: number) => {
      const faceGroup = new THREE.Group();
      faceGroup.position.set(posX, 1.25, posZ);
      faceGroup.rotation.y = rotY;

      // Bottom sponge
      const bSponge = new THREE.Mesh(new THREE.PlaneGeometry(1.24, 0.26), darkSpongeMaterial);
      bSponge.position.set(0, -0.26, 0);
      faceGroup.add(bSponge);

      // Middle berry mousse filling
      const mMousse = new THREE.Mesh(new THREE.PlaneGeometry(1.24, 0.24), strawberryMousseMaterial);
      mMousse.position.set(0, 0, 0.001);
      faceGroup.add(mMousse);

      // Top golden sponge
      const tSponge = new THREE.Mesh(new THREE.PlaneGeometry(1.24, 0.28), vanillaSpongeMaterial);
      tSponge.position.set(0, 0.25, 0);
      faceGroup.add(tSponge);

      return faceGroup;
    };

    const cutFace1 = createLayeredCutFace(-sliceAngle + Math.PI / 2, 0.62 * Math.cos(sliceAngle), 0.62 * Math.sin(sliceAngle));
    cakeGroup.add(cutFace1);

    const cutFace2 = createLayeredCutFace(-Math.PI / 2, 0.62, 0);
    cakeGroup.add(cutFace2);

    // 4. The Separable Slice Group (Starts 100% flush, slides out cleanly when cut)
    const sliceGroup = new THREE.Group();
    sliceGroupRef.current = sliceGroup;
    cakeGroup.add(sliceGroup);

    const sliceWedge = new THREE.Mesh(
      new THREE.CylinderGeometry(1.25, 1.25, 0.78, 16, 1, false, 0, sliceAngle),
      topFrostingMaterial
    );
    sliceWedge.position.y = 1.25;
    sliceWedge.castShadow = true;
    sliceWedge.receiveShadow = true;
    sliceGroup.add(sliceWedge);

    // Slice layered interior faces
    const sliceFace1 = createLayeredCutFace(Math.PI / 2, 0.62, 0);
    sliceGroup.add(sliceFace1);

    const sliceFace2 = createLayeredCutFace(sliceAngle - Math.PI / 2, 0.62 * Math.cos(sliceAngle), 0.62 * Math.sin(sliceAngle));
    sliceGroup.add(sliceFace2);

    // Small Gold-Rimmed Dessert Server Plate that slides with the slice
    const dessertDish = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 0.75, 0.05, 32),
      plateMaterial
    );
    dessertDish.position.set(0.62 * Math.cos(sliceAngle / 2), 0.84, 0.62 * Math.sin(sliceAngle / 2));
    dessertDish.visible = false;
    dessertDishRef.current = dessertDish;
    sliceGroup.add(dessertDish);

    // Frosting Pearls around the top perimeter
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), goldLeafMaterial);
      pearl.position.set(Math.cos(angle) * 1.18, 1.67, Math.sin(angle) * 1.18);

      if (angle >= 0 && angle <= sliceAngle) {
        sliceGroup.add(pearl);
      } else {
        cakeGroup.add(pearl);
      }
    }

    // 5. Slender Candles & Flickering Flames
    flamesRef.current = [];
    const candleCount = 5;
    const candleRadius = 0.65;

    for (let i = 0; i < candleCount; i++) {
      const angle = sliceAngle + 0.38 + (i / (candleCount - 1)) * (Math.PI * 2 - sliceAngle - 0.76);
      const x = Math.cos(angle) * candleRadius;
      const z = Math.sin(angle) * candleRadius;

      // Candle Stick
      const candle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.026, 0.026, 0.58, 16),
        new THREE.MeshStandardMaterial({ color: 0xfffcf7, roughness: 0.3 })
      );
      candle.position.set(x, 1.93, z);
      candle.castShadow = true;
      cakeGroup.add(candle);

      // Wick
      const wick = new THREE.Mesh(
        new THREE.CylinderGeometry(0.008, 0.008, 0.07, 8),
        new THREE.MeshBasicMaterial({ color: 0x111111 })
      );
      wick.position.set(x, 2.24, z);
      cakeGroup.add(wick);

      // Flame
      const flame = new THREE.Mesh(
        new THREE.SphereGeometry(0.048, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xffba52 })
      );
      flame.scale.set(1, 1.9, 1);
      flame.position.set(x, 2.32, z);
      cakeGroup.add(flame);

      const flameLight = new THREE.PointLight(0xffa834, 1.4, 2.8);
      flameLight.position.set(x, 2.35, z);
      cakeGroup.add(flameLight);

      flamesRef.current.push({
        mesh: flame,
        light: flameLight,
        baseY: 2.32
      });
    }

    // 6. Professional Chef's Pastry Knife (Pure White Modern Edition)
    const knifeGroup = new THREE.Group();
    knifeRef.current = knifeGroup;
    cakeGroup.add(knifeGroup); // Embedded in cakeGroup for 100% precision alignment

    // Pure White Blade with contoured chef's profile
    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(0, -0.22); // Heel
    bladeShape.bezierCurveTo(0.45, -0.22, 0.95, -0.20, 1.35, -0.06); // Belly curve
    bladeShape.lineTo(1.48, 0.0); // Sharp pointed tip
    bladeShape.bezierCurveTo(1.35, 0.04, 1.1, 0.06, 0.9, 0.06); // Spine drop
    bladeShape.lineTo(0, 0.06); // Straight spine
    bladeShape.lineTo(0, -0.22); // Heel to bolster

    // Slender, clean blade with NO extra bevel bloat
    const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, {
      depth: 0.012,
      bevelEnabled: false
    });
    // Pristine White Material
    const whiteBladeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.22,
      metalness: 0.04
    });
    const blade = new THREE.Mesh(bladeGeo, whiteBladeMat);
    knifeGroup.add(blade);

    // Warm Gold Accent Bolster Collar
    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd6a475,
      metalness: 0.85,
      roughness: 0.2
    });
    const bolsterGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.06, 16);
    const bolster = new THREE.Mesh(bolsterGeo, goldAccentMat);
    bolster.rotation.z = Math.PI / 2;
    bolster.position.set(-0.03, -0.06, 0.006);
    knifeGroup.add(bolster);

    // Ergonomic Pure White Handle
    const handleGeo = new THREE.CylinderGeometry(0.048, 0.056, 0.58, 16);
    const whiteHandleMat = new THREE.MeshStandardMaterial({
      color: 0xf7f8fa,
      roughness: 0.25,
      metalness: 0.04
    });
    const handle = new THREE.Mesh(handleGeo, whiteHandleMat);
    handle.rotation.z = Math.PI / 2;
    handle.position.set(-0.33, -0.06, 0.006);
    handle.scale.set(1.15, 1.0, 0.75);
    knifeGroup.add(handle);

    // Warm Gold Pin Rivets
    const rivetGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.11, 12);
    [-0.18, -0.33, -0.48].forEach((xPos) => {
      const rivet = new THREE.Mesh(rivetGeo, goldAccentMat);
      rivet.position.set(xPos, -0.06, 0.006);
      knifeGroup.add(rivet);
    });

    // Warm Gold Butt Cap Pommel
    const buttCapGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.02, 16);
    const buttCap = new THREE.Mesh(buttCapGeo, goldAccentMat);
    buttCap.rotation.z = Math.PI / 2;
    buttCap.position.set(-0.62, -0.06, 0.006);
    knifeGroup.add(buttCap);

    knifeGroup.position.set(1.65, 2.65, 0.35);
    knifeGroup.rotation.set(0.1, Math.PI - 0.2, 0.28);
    knifeGroup.visible = false;

    // Animation Loop with Smooth Motion
    let animId: number;
    let prevTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = (now - prevTime) / 1000;
      prevTime = now;

      // 1. Slow, elegant rotation ONLY before cutting
      // Once cut, it NEVER resets, staying proud and showcased in front!
      if (!isAnimatingCut.current && !isCutFinished.current && cakeGroupRef.current) {
        currentRotation.current += delta * 0.18;
        cakeGroupRef.current.rotation.y = currentRotation.current;
      }

      // 2. Candle flame flickering
      flamesRef.current.forEach((item, index) => {
        if (item.mesh.visible) {
          const flicker = Math.sin(now * 0.012 + index * 1.5) * 0.15;
          const wobble = Math.cos(now * 0.008 + index) * 0.01;
          item.mesh.scale.set(1 + flicker * 0.3, 1.9 + flicker * 0.6, 1 + flicker * 0.3);
          item.mesh.position.y = item.baseY + wobble;
          item.light.intensity = 1.3 + flicker * 0.7;
        }
      });

      // 3. Realistic Cake Cutting Physics & Kinematics
      if (isAnimatingCut.current && knifeRef.current && sliceGroupRef.current) {
        const p = cutAnimProgress.current;
        const knife = knifeRef.current;
        const slice = sliceGroupRef.current;
        const bisector = sliceAngle / 2; // ~27.5 degrees (0.48 rad)

        // Phase 1: Swoop In, Aim & Hover over Cut Line (0.00 -> 0.18)
        if (p < 0.18) {
          const t = p / 0.18;
          const ease = t * t * (3 - 2 * t); // Smoothstep

          knife.position.x = 1.65 - ease * 0.35; // from 1.65 to 1.30
          knife.position.y = 2.65 - ease * 0.77; // from 2.65 down to 1.88
          knife.position.z = 0.35 - ease * 0.35; // from 0.35 to 0.0

          knife.rotation.x = 0.1 - ease * 0.1;
          knife.rotation.y = (Math.PI - 0.2) + ease * 0.2; // rotates to align with cut seam
          knife.rotation.z = 0.28 - ease * 0.06; // tip angled down at 0.22 rad (~13 deg)
        }
        // Phase 2: First Incision & Layer-by-Layer Slicing with Rocking Physics (0.18 -> 0.48)
        else if (p < 0.48) {
          const t = (p - 0.18) / 0.30; // 0 to 1
          // Downward motion with slight physical resistance curve through sponge
          const easeDown = t * t * (3 - 2 * t);
          // Realistic cutting rocking (heel and tip rock back and forth)
          const rock = Math.sin(t * Math.PI * 4) * 0.038;
          // Subtle forward-backward sawing draw motion
          const draw = Math.sin(t * Math.PI * 2) * 0.045;

          knife.position.x = 1.30 + draw;
          knife.position.y = 1.88 - easeDown * 0.80; // from 1.88 down to 1.08 (flush with base)
          knife.position.z = 0.0;

          knife.rotation.x = 0.0;
          knife.rotation.y = Math.PI;
          knife.rotation.z = (1 - t) * 0.22 + rock; // Levels out completely as it reaches base
        }
        // Phase 3: Wedge Loosening & Knife Slides Underneath as Spatula (0.48 -> 0.60)
        else if (p < 0.60) {
          const t = (p - 0.48) / 0.12; // 0 to 1
          const ease = Math.sin(t * Math.PI);

          knife.position.x = 1.30 - t * 0.15; // slides slightly inward under the wedge
          knife.position.y = 1.08 - t * 0.02; // slides flat along base plate
          knife.position.z = 0.0;

          // Gentle tilt to loosen buttercream adhesion
          knife.rotation.x = ease * 0.09;
          knife.rotation.y = Math.PI - t * 0.12;
          knife.rotation.z = 0.0;

          if (dessertDishRef.current) {
            dessertDishRef.current.visible = true;
          }
        }
        // Phase 4: Serving Lift & Glide with Settling Bounce (0.60 -> 0.86)
        else if (p < 0.86) {
          const t = (p - 0.60) / 0.26; // 0 to 1
          const easeOut = 1 - Math.pow(1 - t, 3);
          const slideDist = easeOut * 1.08;

          // Lift out of cavity, then dampening settling bounce on dessert plate
          const lift = Math.sin(t * Math.PI) * 0.065;
          const settleT = Math.max(0, (t - 0.65) / 0.35);
          const bounce = Math.exp(-settleT * 6) * Math.sin(settleT * Math.PI * 4) * 0.016;

          // Slice moves outward along bisector
          slice.position.x = Math.cos(bisector) * slideDist;
          slice.position.z = Math.sin(bisector) * slideDist;
          slice.position.y = lift + bounce;
          slice.rotation.y = easeOut * 0.14;

          // Knife moves with slice supporting it from beneath
          knife.position.x = 1.15 + Math.cos(bisector) * (slideDist * 0.95);
          knife.position.y = 1.06 + lift + bounce;
          knife.position.z = Math.sin(bisector) * (slideDist * 0.95);
          knife.rotation.set(0.04, Math.PI - 0.15, 0.0);
        }
        // Phase 5: Knife Smooth Withdrawal & Presentation Rest Position (0.86 -> 1.00)
        else {
          const t = (p - 0.86) / 0.14; // 0 to 1
          const easeWithdraw = 1 - Math.pow(1 - t, 2);

          // Slice stays locked in served presentation spot
          const slideDist = 1.08;
          slice.position.x = Math.cos(bisector) * slideDist;
          slice.position.z = Math.sin(bisector) * slideDist;
          slice.position.y = 0.0;
          slice.rotation.y = 0.14;

          // Knife slides smoothly out and rests beside the plate
          const finalX = 1.55;
          const finalY = 0.94;
          const finalZ = 0.72;

          knife.position.x = (1.15 + Math.cos(bisector) * 1.02) + easeWithdraw * (finalX - (1.15 + Math.cos(bisector) * 1.02));
          knife.position.y = 1.06 + easeWithdraw * (finalY - 1.06);
          knife.position.z = Math.sin(bisector) * 1.02 + easeWithdraw * (finalZ - Math.sin(bisector) * 1.02);

          knife.rotation.x = 0.04 - easeWithdraw * 0.22;
          knife.rotation.y = (Math.PI - 0.15) - easeWithdraw * 0.50;
          knife.rotation.z = -easeWithdraw * 0.08;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleBlowOutCandles = () => {
    sound.playKeyTap();
    sound.playCandleBlow();

    flamesRef.current.forEach((item) => {
      item.mesh.visible = false;
      item.light.intensity = 0;
    });

    setCandlesLit(false);

    setTimeout(() => {
      triggerCandleSmokeAndSparkles();
      triggerBirthdayConfetti();
      sound.playUnlockSuccess();
      if (knifeRef.current) {
        knifeRef.current.visible = true;
      }
    }, 600);
  };

  const handleCutCake = () => {
    if (isCakeCut || isCutting) return;
    sound.playKeyTap();
    setIsCutting(true);

    // Smoothly align cake rotation toward prime camera angle before cutting
    if (cakeGroupRef.current) {
      cakeGroupRef.current.rotation.y = 0.15;
      currentRotation.current = 0.15;
    }

    if (knifeRef.current) {
      knifeRef.current.visible = true;
      knifeRef.current.position.set(1.65, 2.65, 0.35);
      knifeRef.current.rotation.set(0.1, Math.PI - 0.2, 0.28);
    }

    cutAnimProgress.current = 0;
    isAnimatingCut.current = true;

    const startTime = performance.now();
    const duration = 3000; // 3.0s of realistic cake cutting physics
    let sliceAudioPlayed = false;
    let clinkAudioPlayed = false;
    let sparklesTriggered = false;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1.0);
      cutAnimProgress.current = progress;

      // Synchronized audio & haptic feedback at real-life contact moments
      if (progress >= 0.18 && !sliceAudioPlayed) {
        sliceAudioPlayed = true;
        sound.playCakeSlice();
      }
      if (progress >= 0.48 && !clinkAudioPlayed) {
        clinkAudioPlayed = true;
        sound.playPlateClink();
        if (navigator.vibrate) {
          navigator.vibrate(15);
        }
      }
      if (progress >= 0.60 && !sparklesTriggered) {
        sparklesTriggered = true;
        triggerCakeCutSparkles();
      }

      if (progress < 1.0) {
        requestAnimationFrame(tick);
      } else {
        isAnimatingCut.current = false;
        isCutFinished.current = true; // LOCKS THE POSITION: NEVER RESETS!
        setIsCakeCut(true);
        setIsCutting(false);
        triggerBirthdayConfetti();
        sound.playUnlockSuccess();
      }
    };

    requestAnimationFrame(tick);
  };

  const handleReset = () => {
    sound.playKeyTap();
    isCutFinished.current = false;
    currentRotation.current = 0;
    if (cakeGroupRef.current) {
      cakeGroupRef.current.rotation.y = 0;
    }
    flamesRef.current.forEach((item) => {
      item.mesh.visible = true;
      item.light.intensity = 1.4;
    });
    if (knifeRef.current) {
      knifeRef.current.visible = false;
      knifeRef.current.position.set(1.65, 2.65, 0.35);
      knifeRef.current.rotation.set(0.1, Math.PI - 0.2, 0.28);
    }
    if (sliceGroupRef.current) {
      sliceGroupRef.current.position.set(0, 0, 0);
      sliceGroupRef.current.rotation.set(0, 0, 0);
    }
    if (dessertDishRef.current) {
      dessertDishRef.current.visible = false;
    }
    cutAnimProgress.current = 0;
    isAnimatingCut.current = false;
    setCandlesLit(true);
    setIsCakeCut(false);
    setIsCutting(false);
  };

  return (
    <div className="relative mx-auto flex max-w-xl flex-col items-center">
      {/* 3D Canvas with Responsive Dimensions and Padding */}
      <div
        ref={containerRef}
        onClick={candlesLit ? handleBlowOutCandles : !isCakeCut ? handleCutCake : undefined}
        className="relative h-[360px] sm:h-[440px] w-full max-w-[440px] cursor-pointer touch-manipulation select-none overflow-visible"
      />

      {/* Action Controls */}
      <div className="mt-4 flex flex-col items-center text-center">
        {candlesLit ? (
          <>
            <p className="font-display text-lg text-[#f7efe8]">
              Close your eyes, make a wish, and blow out the candles!
            </p>
            <button
              onClick={handleBlowOutCandles}
              className="premium-button mt-4"
            >
              <Wind size={16} />
              <span>Blow Out the Candles</span>
            </button>
          </>
        ) : !isCakeCut ? (
          <div className="flex flex-col items-center">
            <p className="font-display text-lg text-[#f7efe8]">
              Candles extinguished! Make it official — take the first slice! 🍰
            </p>
            <button
              onClick={handleCutCake}
              disabled={isCutting}
              className="premium-button mt-4"
            >
              <Utensils size={16} />
              <span>{isCutting ? 'Slicing...' : 'Cut the Cake 🍰'}</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 rounded-full border border-[#d6a475]/40 bg-white/[0.06] backdrop-blur-xl px-7 py-3 text-sm text-[#f7efe8] shadow-[0_10px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(214,164,117,0.15)]">
              <span>The first slice is served for you, {friendName}! 🍰 Happy Birthday!</span>
            </div>
            <button
              onClick={handleReset}
              className="glass-pill mt-4 gap-2"
            >
              <RotateCcw size={14} />
              <span>Relight & slice again</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
