"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useIsMobile } from '@/hooks/use-mobile';

// Basic GLSL shaders for the particle system
const vertexShader = `
  uniform float uTime;
  uniform float uHoverStrength;
  uniform vec3 uMouse;
  attribute float aRandom;
  attribute vec3 aOriginalPosition;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    float distToMouse = distance(pos, uMouse);
    float hoverEffect = max(0.0, 1.0 - distToMouse * uHoverStrength);

    // Simple breathing/drifting
    pos.x += sin(uTime * 0.5 + aRandom * 10.0) * 0.01;
    pos.y += cos(uTime * 0.5 + aRandom * 10.0) * 0.01;
    pos.z += sin(uTime * 0.5 + aRandom * 10.0) * 0.01;

    // Apply hover attraction
    pos += normalize(uMouse - pos) * hoverEffect * 0.1;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 1.0 / -mvPosition.z; // Perspective-based point size
    vAlpha = 1.0 - hoverEffect * 0.5; // Make particles slightly transparent on hover
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    float r = 0.0;
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    r = dot(cxy, cxy);
    if (r > 1.0) {
      discard;
    }
    gl_FragColor = vec4(uColor, (1.0 - r) * vAlpha); // Soft circular glow
  }
`;

const RiniYadiWorldScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const uniformsRef = useRef<any>({});
  const mouseRef = useRef(new THREE.Vector3());
  const isMobile = useIsMobile();

  const animate = useCallback(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesRef.current) return;

    uniformsRef.current.uTime.value += 0.01;

    // Update particle positions for subtle movement
    const positions = (particlesRef.current.geometry as THREE.BufferGeometry).attributes.position.array as Float32Array;
    const originalPositions = (particlesRef.current.geometry as THREE.BufferGeometry).attributes.aOriginalPosition.array as Float32Array;
    const randoms = (particlesRef.current.geometry as THREE.BufferGeometry).attributes.aRandom.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const index = i / 3;
      const originalX = originalPositions[i];
      const originalY = originalPositions[i + 1];
      const originalZ = originalPositions[i + 2];
      const randomVal = randoms[index];

      // Apply breathing/drifting
      positions[i] = originalX + Math.sin(uniformsRef.current.uTime.value * 0.5 + randomVal * 10) * 0.01;
      positions[i + 1] = originalY + Math.cos(uniformsRef.current.uTime.value * 0.5 + randomVal * 10) * 0.01;
      positions[i + 2] = originalZ + Math.sin(uniformsRef.current.uTime.value * 0.5 + randomVal * 10) * 0.01;

      // Apply hover attraction (handled in shader for performance, but can be done here too)
      // For now, let's rely on the shader for hover effect
    }
    (particlesRef.current.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;


    particlesRef.current.rotation.y += 0.0005; // Slow rotation

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0a0a); // Deep midnight background
    mountRef.current.appendChild(renderer.domElement);

    // Particle geometry
    const particleCount = isMobile ? 5000 : 20000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Sphere distribution
      const r = 1; // Radius of the sphere
      const phi = Math.acos(2 * Math.random() - 1); // Azimuthal angle
      const theta = Math.random() * Math.PI * 2; // Polar angle

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];

      randoms[i] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aOriginalPosition', new THREE.BufferAttribute(originalPositions, 3));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

    // Particle material (ShaderMaterial for custom effects)
    uniformsRef.current = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0xffffff) }, // White particles
      uHoverStrength: { value: 0.0 },
      uMouse: { value: mouseRef.current },
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniformsRef.current,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;
    scene.add(particles);

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Mouse move for parallax and hover
    const onMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Parallax effect for camera
      gsap.to(camera.position, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 1,
        ease: "power2.out"
      });

      // Update mouse position for shader hover effect
      mouseRef.current.x = x * (camera.position.z * Math.tan(camera.fov / 2 * Math.PI / 180) * camera.aspect);
      mouseRef.current.y = y * (camera.position.z * Math.tan(camera.fov / 2 * Math.PI / 180));
      mouseRef.current.z = 0; // Assuming the sphere is at z=0 for simplicity

      gsap.to(uniformsRef.current.uHoverStrength, {
        value: 0.5, // Increase hover strength
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const onMouseLeave = () => {
      gsap.to(uniformsRef.current.uHoverStrength, {
        value: 0.0, // Reset hover strength
        duration: 0.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    // Click interaction
    const onClick = () => {
      if (!particlesRef.current || !cameraRef.current) return;

      const currentPositions = (particlesRef.current.geometry as THREE.BufferGeometry).attributes.position.array as Float32Array;
      const originalPositions = (particlesRef.current.geometry as THREE.BufferGeometry).attributes.aOriginalPosition.array as Float32Array;
      const tempPositions = new Float32Array(currentPositions.length);

      // Store current positions to animate from
      for (let i = 0; i < currentPositions.length; i++) {
        tempPositions[i] = currentPositions[i];
      }

      // Animate particles outward
      gsap.to(currentPositions, {
        endArray: Array.from(currentPositions).map((val, i) => {
          const originalX = originalPositions[i - (i % 3)];
          const originalY = originalPositions[i - (i % 3) + 1];
          const originalZ = originalPositions[i - (i % 3) + 2];
          const factor = 1.5; // How much they burst outward
          if (i % 3 === 0) return originalX * factor;
          if (i % 3 === 1) return originalY * factor;
          return originalZ * factor;
        }),
        duration: 1,
        ease: "power2.out",
        onUpdate: () => {
          (particlesRef.current!.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;
        },
        onComplete: () => {
          // Animate particles back to original positions
          gsap.to(currentPositions, {
            endArray: Array.from(originalPositions),
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              (particlesRef.current!.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;
            },
            onComplete: () => {
              // After re-assembly, zoom in and show text
              gsap.to(camera.position, {
                z: 0.5, // Zoom in closer
                duration: 2,
                ease: "power2.inOut",
                onComplete: () => {
                  // Placeholder for text reveal
                  const welcomeTextElement = document.getElementById('welcome-text');
                  if (welcomeTextElement) {
                    gsap.to(welcomeTextElement, {
                      opacity: 1,
                      y: 0,
                      duration: 1.5,
                      ease: "power2.out"
                    });
                  }
                }
              });
            }
          });
        }
      });
    };

    window.addEventListener('click', onClick);

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('click', onClick);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [animate, isMobile]);

  return (
    <div ref={mountRef} className="absolute inset-0 overflow-hidden">
      <div
        id="welcome-text"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl font-serif opacity-0 -translate-y-10 pointer-events-none"
        style={{ textShadow: '0 0 15px rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}
      >
        Welcome to RiniYadi World!
      </div>
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm md:text-base opacity-0 pointer-events-none"
        style={{ textShadow: '0 0 5px rgba(255,255,255,0.3)' }}
      >
        A world where moments, memories, and feelings exist quietly.
      </div>
    </div>
  );
};

export default RiniYadiWorldScene;