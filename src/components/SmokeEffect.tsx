import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function SmokeEffect() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Container dimensions
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
    // Move camera further back to see the wide smoke
    camera.position.z = 1200;

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(-1, 0, 1);
    scene.add(light);

    const smokeParticles: THREE.Mesh[] = [];
    const baseColor = new THREE.Color(0xffffff); // Pure white for bright smoke

    const loader = new THREE.TextureLoader();
    const smokeGeo = new THREE.PlaneGeometry(600, 600);

    loader.load('/img/Smoke-Element.png', (texture) => {
      const smokeMaterial = new THREE.MeshLambertMaterial({
        color: baseColor,
        map: texture,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.NormalBlending
      });

      for (let p = 0; p < 50; p++) {
        const particle = new THREE.Mesh(smokeGeo, smokeMaterial.clone());
        particle.userData = { lifeProgress: { val: 0 } };
        
        resetParticle(particle, true);
        scene.add(particle);
        smokeParticles.push(particle);
        animateParticle(particle);
      }
    });

    const resetParticle = (p: THREE.Mesh, isInitial: boolean) => {
      p.position.set(
        Math.random() * 1800 - 900,
        isInitial ? (Math.random() * 1000 - 500) : -600, 
        Math.random() * 400
      );
      p.rotation.z = Math.random() * Math.PI * 2;
      p.scale.set(0.7, 0.7, 1);
      p.userData.lifeProgress.val = 0;
      (p.material as THREE.Material).opacity = 0;
    };

    const animateParticle = (p: THREE.Mesh) => {
      const duration = 25 + Math.random() * 15;
      gsap.to(p.position, {
        y: 800, 
        x: p.position.x + (Math.random() * 200 - 100),
        duration: duration,
        ease: 'none',
        onComplete: () => {
          resetParticle(p, false);
          animateParticle(p);
        }
      });

      const tl = gsap.timeline({
        onUpdate: () => {
          // Adjust opacity multiplier (intensity)
          (p.material as THREE.Material).opacity = p.userData.lifeProgress.val * 0.9;
        }
      });
      tl.to(p.userData.lifeProgress, { val: 1, duration: duration * 0.4, ease: 'sine.inOut' })
        .to(p.userData.lifeProgress, { val: 0, duration: duration * 0.6, ease: 'sine.in' });
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
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

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
