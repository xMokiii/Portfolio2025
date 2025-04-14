import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import waterVertexShader from '../shaders/water.vert';  // Import the vertex shader
import waterFragmentShader from '../shaders/water.frag';  // Import the fragment shader

const WaterEffect = ({ resolution = 512, environmentMap }) => {
  const waterRef = useRef();

  const uniforms = {
    uTime: { value: 0 },
    uOpacity: { value: 0.8 },
    uEnvironmentMap: { value: environmentMap },
    uWavesAmplitude: { value: 0.025 },
    uWavesFrequency: { value: 1.07 },
    uWavesPersistence: { value: 0.3 },
    uWavesLacunarity: { value: 2.18 },
    uWavesIterations: { value: 8 },
    uWavesSpeed: { value: 0.4 },
    uTroughColor: { value: new THREE.Color('#63b6fd') },
    uPeakThreshold: { value: 0.08 },
    uPeakTransition: { value: 0.05 },
    uTroughThreshold: { value: -0.01 },
    uTroughTransition: { value: 0.15 },
    uFresnelScale: { value: 0.8 },
    uFresnelPower: { value: 0.5 },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,  // Use the imported vertex shader
    fragmentShader: waterFragmentShader,  // Use the imported fragment shader
    uniforms,
    transparent: true,
    depthTest: true,
    side: THREE.DoubleSide,
  });

  const geometry = new THREE.PlaneGeometry(110, 110, resolution, resolution);

  useFrame(({ clock }) => {
    if (waterRef.current) {
      uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return <mesh ref={waterRef} material={material} geometry={geometry} position={[0,-1.02,0]} rotation-x={-Math.PI / 2} />;
};

export default WaterEffect;
