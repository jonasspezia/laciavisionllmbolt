import * as THREE from 'three';

interface SceneAnimationProps {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  particlesMesh: THREE.Points;
  connectionLines: THREE.LineSegments;
  particlesMaterial: THREE.PointsMaterial;
  connectionsMaterial: THREE.LineBasicMaterial;
  trails: THREE.LineSegments;
  trailsGeometry: THREE.BufferGeometry;
}

export const setupSceneAnimation = ({
  scene,
  camera,
  renderer,
  particlesMesh,
  connectionLines,
  particlesMaterial,
  connectionsMaterial,
  trails,
  trailsGeometry,
}: SceneAnimationProps) => {
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let pulseTime = 0;
  let waveTime = 0;

  const handleMouseMove = (event: MouseEvent) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 0.3;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 0.3;
  };

  window.addEventListener('mousemove', handleMouseMove);

  function animate() {
    requestAnimationFrame(animate);

    pulseTime += 0.005;
    waveTime += 0.002;

    // Enhanced smooth rotation
    targetRotationX += (mouseY * 0.03 - targetRotationX) * 0.03;
    targetRotationY += (mouseX * 0.03 - targetRotationY) * 0.03;

    particlesMesh.rotation.x = targetRotationX;
    particlesMesh.rotation.y = targetRotationY;
    connectionLines.rotation.x = targetRotationX;
    connectionLines.rotation.y = targetRotationY;
    trails.rotation.x = targetRotationX;
    trails.rotation.y = targetRotationY;

    // Continuous smooth rotation
    particlesMesh.rotation.y += 0.001;
    connectionLines.rotation.y += 0.001;
    trails.rotation.y += 0.001;

    // Dynamic wave movement
    const positions = particlesMesh.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const originalY = positions[i + 1];
      const wave = Math.sin(waveTime + positions[i] * 0.1) * 0.2;
      positions[i + 1] = originalY + wave;
    }
    particlesMesh.geometry.attributes.position.needsUpdate = true;

    // Enhanced pulsing effect
    const pulseOpacity = Math.sin(pulseTime) * 0.15 + 0.85;
    particlesMaterial.opacity = pulseOpacity * 0.8;
    connectionsMaterial.opacity = pulseOpacity * 0.15;

    // Improved dynamic trail effect
    const trailPositions = trailsGeometry.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const particlePos = new THREE.Vector3(
        positions[i],
        positions[i + 1],
        positions[i + 2]
      );
      
      particlePos.applyEuler(particlesMesh.rotation);
      
      const trailLength = 0.3 + Math.sin(waveTime + i * 0.1) * 0.1;
      
      trailPositions[i * 2] = particlePos.x;
      trailPositions[i * 2 + 1] = particlePos.y;
      trailPositions[i * 2 + 2] = particlePos.z;
      
      trailPositions[i * 2 + 3] = particlePos.x - trailLength;
      trailPositions[i * 2 + 4] = particlePos.y - trailLength;
      trailPositions[i * 2 + 5] = particlePos.z - trailLength;
    }
    
    trailsGeometry.attributes.position.needsUpdate = true;

    // Dynamic color variation
    const hue = (Math.sin(pulseTime * 0.2) * 0.05) + 0.5;
    particlesMaterial.color.setHSL(hue, 0.8, 0.6);

    renderer.render(scene, camera);
  }

  animate();

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
};
