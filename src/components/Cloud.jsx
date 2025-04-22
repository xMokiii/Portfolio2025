import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CloudSprite = ({ position, rotationSpeed, scale }) => {
  const ref = useRef();
  const texture = useMemo(() => new THREE.TextureLoader().load("cloud.png"), []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += rotationSpeed;
    }
  });

  return (
    <sprite ref={ref} position={position} scale={scale}>
      <spriteMaterial attach="material" map={texture} transparent opacity={0.7} />
    </sprite>
  );
};

const CloudGroup = ({ count = 10 }) => {
  const clouds = useMemo(() => {
    return new Array(count).fill().map(() => {
      const x = THREE.MathUtils.randFloatSpread(100);
      const y = THREE.MathUtils.randFloat(10, 20);
      const z = THREE.MathUtils.randFloatSpread(80);
      const scale = [5 + Math.random() * 3, 5 + Math.random() * 3, 1];
      const rotationSpeed = Math.random() * 0.01;
      return { position: [x, y, z], rotationSpeed, scale };
    });
  }, [count]);

  return (
    <>
      {clouds.map((cloud, index) => (
        <CloudSprite key={index} {...cloud} />
      ))}
    </>
  );
};

export default CloudGroup;
