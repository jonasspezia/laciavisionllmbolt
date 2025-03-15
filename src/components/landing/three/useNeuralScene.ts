import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { createNeuralNetwork } from './neuralNetwork';
import { setupSceneAnimation } from './sceneAnimation';

export const useNeuralScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create neural network with trails
    const { particlesMesh, connectionLines, particlesMaterial, connectionsMaterial, trails, trailsGeometry } = createNeuralNetwork();
    scene.add(particlesMesh);
    scene.add(connectionLines);
    scene.add(trails);

    // Position camera
    camera.position.z = 20;

    // Setup animation and controls
    const cleanup = setupSceneAnimation({
      scene,
      camera,
      renderer,
      particlesMesh,
      connectionLines,
      particlesMaterial,
      connectionsMaterial,
      trails,
      trailsGeometry,
    });

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cleanup();
      window.removeEventListener('resize', handleResize);
      scene.remove(particlesMesh);
      scene.remove(connectionLines);
      scene.remove(trails);
      renderer.dispose();
    };
  }, []);

  return { containerRef, canvasRef };
};
