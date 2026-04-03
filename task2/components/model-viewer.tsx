'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export default function ModelViewer() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadTime, setLoadTime] = useState(0);

  useEffect(() => {
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrame: number | null = null;
    let model: THREE.Group | null = null;

    const initScene = () => {

      // Initialize scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0a0a);

      // Camera
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.set(3, 3, 5);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      if (canvasRef.current) {
        canvasRef.current.appendChild(renderer.domElement);
      }

      // Lights
      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(5, 10, 7.5);
      scene.add(ambient, dirLight);

      // DRACO Loader
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(
        'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'
      );

      // GLTF Loader
      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      const start = performance.now();

      // Load the sample duck model
      loader.load(
        '/assets/3d/duck.glb',
        (gltf) => {
          model = gltf.scene;

          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          // Center model
          model.position.sub(center);

          // 🔥 FIX: lift model to visual center
          model.position.y += size.y / 2;

          // Scale
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2 / maxDim * 4;
          model.scale.setScalar(scale);

          scene!.add(model);

          // Camera
          const distance = maxDim * 4;

          camera!.position.set(0, 0, distance);
          camera!.lookAt(0, 0, 0);
          camera!.updateProjectionMatrix();

          const loadTimeMs = performance.now() - start;
          setLoadTime(Math.round(loadTimeMs));

          // ⏳ Add 3-second delay before marking as loaded
          setTimeout(() => {
            setModelLoaded(true);
          }, 3000);
        },
        (xhr) => {
          if (xhr.total) {
            const progress = Math.round((xhr.loaded / xhr.total) * 100);
            setLoadingProgress(progress);
            console.log(`[v0] Loading progress: ${progress}%`);
          }
        },
        (error) => {
          console.error('[v0] Error loading model:', error);
        }
      );

      const animate = () => {
        animationFrame = requestAnimationFrame(animate);
        if (model) {
          model.rotation.y += 0.005;
        }
        renderer!.render(scene!, camera!);
      };
      animate();

      const handleResize = () => {
        camera!.aspect = window.innerWidth / window.innerHeight;
        camera!.updateProjectionMatrix();
        renderer!.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrame !== null) {
          cancelAnimationFrame(animationFrame);
        }
        // Proper cleanup to prevent memory leaks
        if (renderer) {
          if (canvasRef.current && renderer.domElement.parentNode === canvasRef.current) {
            canvasRef.current.removeChild(renderer.domElement);
          }
          renderer.dispose();
        }
        if (scene) {
          scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry?.dispose();
              if (Array.isArray(child.material)) {
                child.material.forEach(m => m.dispose());
              } else {
                child.material?.dispose();
              }
            }
          });
          scene.clear();
        }
      };
    };

    initScene();
  }, []);

  return (
    <div className="relative w-full h-screen bg-gray-950">
      {!modelLoaded && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/80 z-50">
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-block">
                <div className="w-16 h-16 border-4 border-blue-900 border-t-blue-400 rounded-full animate-spin"></div>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Loading 3D Model</h2>
            <p className="text-gray-300 mb-4">{loadingProgress}%</p>
            <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {modelLoaded && (
        <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-sm border border-gray-800 rounded-lg p-4 text-white">
          <p className="text-sm text-gray-400">Load Time</p>
          <p className="text-2xl font-bold text-blue-400">{loadTime}ms</p>
        </div>
      )}

      <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-sm border border-gray-800 rounded-lg p-4 text-white max-w-xs">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Controls</h3>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• Model rotates automatically</li>
          <li>• Scroll to zoom</li>
          <li>• Right-click + drag to pan</li>
        </ul>
      </div>

      <div ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
