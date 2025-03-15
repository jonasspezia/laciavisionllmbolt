import * as THREE from 'three';

interface NeuralConnection {
  start: THREE.Vector3;
  end: THREE.Vector3;
}

export const createNeuralNetwork = () => {
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 120;
  const posArray = new Float32Array(particlesCount * 3);
  const connections: NeuralConnection[] = [];

  // Create particles in a spiral sphere pattern
  for (let i = 0; i < particlesCount; i++) {
    const t = i / particlesCount;
    const phi = Math.acos(-1 + (2 * t));
    const theta = Math.sqrt(particlesCount * Math.PI) * phi;
    
    const radius = 15 + Math.sin(theta * 2) * 2;
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    posArray[i * 3] = x;
    posArray[i * 3 + 1] = y;
    posArray[i * 3 + 2] = z;

    // Create dynamic connections
    if (i > 0) {
      const start = new THREE.Vector3(x, y, z);
      const prevX = posArray[(i - 1) * 3];
      const prevY = posArray[(i - 1) * 3 + 1];
      const prevZ = posArray[(i - 1) * 3 + 2];
      const end = new THREE.Vector3(prevX, prevY, prevZ);
      
      if (start.distanceTo(end) < 12) {
        connections.push({ start, end });
      }
    }
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  // Usar uma textura simples gerada em vez de carregar arquivo externo
  const particleTexture = createCircleTexture();
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.2,
    map: particleTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: false,
    color: new THREE.Color('#46c68f'),
    opacity: 0.8,
  });

  const connectionsMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color('#46c68f'),
    transparent: true,
    opacity: 0.12,
    blending: THREE.AdditiveBlending,
    linewidth: 1,
  });

  const connectionGeometry = new THREE.BufferGeometry();
  const connectionVertices: number[] = [];

  connections.forEach(({ start, end }) => {
    connectionVertices.push(start.x, start.y, start.z);
    connectionVertices.push(end.x, end.y, end.z);
  });

  connectionGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(connectionVertices, 3)
  );

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  const connectionLines = new THREE.LineSegments(connectionGeometry, connectionsMaterial);

  // Enhanced trails
  const trailsGeometry = new THREE.BufferGeometry();
  const trailVertices = new Float32Array(particlesCount * 3 * 2);
  trailsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(trailVertices, 3));
  
  const trailsMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color('#46c68f'),
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
  });
  
  const trails = new THREE.LineSegments(trailsGeometry, trailsMaterial);

  return {
    particlesMesh,
    connectionLines,
    particlesMaterial,
    connectionsMaterial,
    trails,
    trailsGeometry,
  };
};

// Função para criar uma textura de círculo branco programaticamente
function createCircleTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Unable to get canvas context');
  }
  
  // Limpa o canvas
  context.clearRect(0, 0, size, size);
  
  // Desenha um círculo branco com fade
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 4;
  
  // Cria um gradiente radial
  const gradient = context.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, radius * 2
  );
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  context.fillStyle = gradient;
  context.beginPath();
  context.arc(centerX, centerY, radius * 2, 0, Math.PI * 2, false);
  context.fill();
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  
  return texture;
}
