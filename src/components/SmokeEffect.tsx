import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function SmokeEffect() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const getViewportMetrics = () => ({
      width: mountRef.current?.clientWidth || 1,
      height: mountRef.current?.clientHeight || 1,
    });

    // Container dimensions
    const { width, height } = getViewportMetrics();
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
    camera.position.z = 1050;

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.95));
    const lightLeft = new THREE.DirectionalLight(0xffffff, 0.95);
    lightLeft.position.set(-1, 0.2, 1);
    scene.add(lightLeft);
    const lightRight = new THREE.DirectionalLight(0xf7f7ff, 0.45);
    lightRight.position.set(1, -0.1, 1);
    scene.add(lightRight);

    const smokeParticles: THREE.Mesh[] = [];
    const baseColor = new THREE.Color('#f7f8ff');

    const loader = new THREE.TextureLoader();
    const smokeGeo = new THREE.PlaneGeometry(720, 720);

    loader.load('/img/Smoke-Element.png', (texture) => {
      const smokeMaterial = new THREE.MeshLambertMaterial({
        color: baseColor,
        map: texture,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.NormalBlending
      });

      for (let p = 0; p < 56; p++) {
        const particle = new THREE.Mesh(smokeGeo, smokeMaterial.clone());
        particle.userData = { lifeProgress: { val: 0 } };

        resetParticle(particle, true);
        scene.add(particle);
        smokeParticles.push(particle);
        animateParticle(particle);
      }
    });

    const resetParticle = (p: THREE.Mesh, isInitial: boolean) => {
      const { width: currentWidth, height: currentHeight } = getViewportMetrics();
      const horizontalRange = currentWidth * 0.95;
      const spawnY = isInitial
        ? -currentHeight * (0.18 + Math.random() * 0.2)
        : -currentHeight * (0.42 + Math.random() * 0.14);

      p.position.set(
        Math.random() * horizontalRange - horizontalRange / 2,
        spawnY,
        Math.random() * 400
      );
      p.rotation.z = Math.random() * Math.PI * 2;
      const scale = 0.75 + Math.random() * 0.45;
      p.scale.set(scale, scale, 1);
      p.userData.lifeProgress.val = 0;
      (p.material as THREE.Material).opacity = 0;
    };

    const animateParticle = (p: THREE.Mesh) => {
      const { height: currentHeight } = getViewportMetrics();
      const duration = 22 + Math.random() * 10;
      gsap.to(p.position, {
        y: currentHeight * (0.34 + Math.random() * 0.12),
        x: p.position.x + (Math.random() * 160 - 80),
        duration: duration,
        ease: 'none',
        onComplete: () => {
          resetParticle(p, false);
          animateParticle(p);
        }
      });

      const tl = gsap.timeline({
        onUpdate: () => {
          (p.material as THREE.Material).opacity = p.userData.lifeProgress.val * 1.15;
        }
      });
      tl.to(p.userData.lifeProgress, { val: 1, duration: duration * 0.45, ease: 'sine.inOut' })
        .to(p.userData.lifeProgress, { val: 0, duration: duration * 0.55, ease: 'sine.in' });
    };

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      smokeParticles.forEach(p => {
        // Slowly rotate particles for extra realism
        p.rotation.z += 0.002;
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const { width: newWidth, height: newHeight } = getViewportMetrics();
      if (newWidth <= 1 || newHeight <= 1) return; // Don't resize if hidden
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Initial check set to delay slightly to catch post-render layout
    setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      smokeParticles.forEach(p => gsap.killTweensOf(p));
      smokeParticles.forEach(p => gsap.killTweensOf(p.position));
      smokeParticles.forEach(p => gsap.killTweensOf(p.userData.lifeProgress));
    };
  }, []);

  return <div ref={mountRef} className="smoke-three-container" />;
}
